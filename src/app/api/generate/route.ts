import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';
import { instruments, Instrument } from '@/data/full-instruments';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Group instruments by collection for Claude (much smaller)
function getCollectionCatalog(): { catalog: string; byCollection: Record<string, Instrument[]> } {
  const byCollection: Record<string, Instrument[]> = {};
  
  instruments.forEach(inst => {
    if (!byCollection[inst.collectionSlug]) {
      byCollection[inst.collectionSlug] = [];
    }
    byCollection[inst.collectionSlug].push(inst);
  });
  
  // Create a simple list of collections with their slugs
  const collections = Object.entries(byCollection).map(([slug, insts]) => {
    const category = insts[0]?.category || 'other';
    return `${slug} (${category}, ${insts.length} sounds)`;
  });
  
  return {
    catalog: collections.join(', '),
    byCollection
  };
}

// Pick a representative articulation from a collection
function pickFromCollection(collectionSlug: string, byCollection: Record<string, Instrument[]>): Instrument | null {
  const collectionInsts = byCollection[collectionSlug];
  if (!collectionInsts || collectionInsts.length === 0) {
    // Try partial match
    const matchKey = Object.keys(byCollection).find(k => 
      k.includes(collectionSlug) || collectionSlug.includes(k)
    );
    if (matchKey) {
      const insts = byCollection[matchKey];
      return insts[Math.floor(Math.random() * insts.length)];
    }
    return null;
  }
  // Pick a random articulation from the collection
  return collectionInsts[Math.floor(Math.random() * collectionInsts.length)];
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

    const { catalog, byCollection } = getCollectionCatalog();
    
    const systemPrompt = `You are a music composition assistant. Suggest instrument combinations from the Musio catalog. Use ONLY these collection slugs: ${catalog}`;

    const userPrompt = `"${prompt}" - Suggest 3 different instrument rack combos of 12 collections each. Return ONLY valid JSON:
{"combos":[{"name":"Combo Name","description":"Brief description","instruments":[{"id":"collection-slug","role":"lead|harmony|rhythm|bass|texture|percussion|accent"}],"tags":["tag1"],"moods":["mood1"]}]}`;

    const message = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 2000,
      messages: [{ role: 'user', content: userPrompt }],
      system: systemPrompt,
    });

    const textContent = message.content.find(c => c.type === 'text');
    if (!textContent || textContent.type !== 'text') {
      throw new Error('No text response from Claude');
    }

    let comboData;
    try {
      let jsonStr = textContent.text.trim();
      if (jsonStr.startsWith('```')) {
        jsonStr = jsonStr.replace(/```json?\n?/g, '').replace(/```$/g, '').trim();
      }
      comboData = JSON.parse(jsonStr);
    } catch (parseError) {
      console.error('Failed to parse Claude response:', textContent.text);
      throw new Error('Failed to parse recommendation response');
    }

    const combosArray = comboData.combos || [comboData];
    
    const processedCombos = combosArray.map((singleCombo: any, index: number) => {
      const enrichedInstruments = singleCombo.instruments.map((inst: { id: string; role: string }) => {
        // Pick an actual articulation from the collection Claude suggested
        const fullInstrument = pickFromCollection(inst.id, byCollection);
        if (!fullInstrument) {
          console.warn(`Collection not found: ${inst.id}`);
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
