import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';
import { instruments, Instrument } from '@/data/detailed-instruments';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Create a compact catalog for Claude (faster)
function getInstrumentCatalog(): string {
  const byCategory: Record<string, Instrument[]> = {};
  
  instruments.forEach(inst => {
    if (!byCategory[inst.category]) {
      byCategory[inst.category] = [];
    }
    byCategory[inst.category].push(inst);
  });
  
  let catalog = "INSTRUMENTS:\n";
  
  for (const [category, insts] of Object.entries(byCategory)) {
    catalog += `[${category}] ` + insts.map(i => `${i.name}(${i.id})`).join(', ') + '\n';
  }
  
  return catalog;
}

export async function POST(request: NextRequest) {
  try {
    const { prompt, ensembleSize = 12 } = await request.json();
    
    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({ error: 'ANTHROPIC_API_KEY not configured' }, { status: 500 });
    }

    const catalog = getInstrumentCatalog();
    
    const systemPrompt = `Suggest Musio instrument combos. ONLY use IDs from: ${catalog}`;

    const userPrompt = `"${prompt}" - Give 3 combos of 12 instruments each. JSON only, no markdown:
{"combos":[{"name":"","description":"","instruments":[{"id":"","role":""}],"tags":[],"moods":[]}]}`;

    const message = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 1500,
      messages: [
        {
          role: 'user',
          content: userPrompt,
        },
      ],
      system: systemPrompt,
    });

    // Extract the text content
    const textContent = message.content.find(c => c.type === 'text');
    if (!textContent || textContent.type !== 'text') {
      throw new Error('No text response from Claude');
    }

    // Parse the JSON response
    let comboData;
    try {
      // Clean up the response in case it has markdown code blocks
      let jsonStr = textContent.text.trim();
      if (jsonStr.startsWith('```')) {
        jsonStr = jsonStr.replace(/```json?\n?/g, '').replace(/```$/g, '').trim();
      }
      comboData = JSON.parse(jsonStr);
    } catch (parseError) {
      console.error('Failed to parse Claude response:', textContent.text);
      throw new Error('Failed to parse recommendation response');
    }

    // Process all combos
    const combosArray = comboData.combos || [comboData]; // Handle both formats
    
    const processedCombos = combosArray.map((singleCombo: any, index: number) => {
      // Validate and enrich the instruments with full data
      const enrichedInstruments = singleCombo.instruments.map((inst: { id: string; role: string }) => {
        const fullInstrument = instruments.find(i => i.id === inst.id);
        if (!fullInstrument) {
          // Try to find by partial match
          const partialMatch = instruments.find(i => 
            i.id.includes(inst.id) || inst.id.includes(i.id) ||
            i.name.toLowerCase().includes(inst.id.toLowerCase())
          );
          if (partialMatch) {
            return {
              ...partialMatch,
              assignedRole: inst.role,
              reason: 'AI selected',
              matchScore: 90,
            };
          }
          console.warn(`Instrument not found: ${inst.id}`);
          return null;
        }
        return {
          ...fullInstrument,
          assignedRole: inst.role,
          reason: 'AI selected',
          matchScore: 95,
        };
      }).filter(Boolean);

      return {
        id: `combo-${Date.now()}-${index}`,
        name: singleCombo.name,
        description: singleCombo.description,
        instruments: enrichedInstruments,
        totalScore: enrichedInstruments.length * 95,
        tags: singleCombo.tags || [],
        moods: singleCombo.moods || [],
        genres: [],
        generatedBy: 'claude',
      };
    }).filter((c: any) => c.instruments.length > 0);

    return NextResponse.json({ combos: processedCombos });
    
  } catch (error) {
    console.error('Error generating recommendation:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate recommendation' },
      { status: 500 }
    );
  }
}
