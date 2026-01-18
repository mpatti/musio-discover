/**
 * Comprehensive Musio Instrument ID Scraper
 * 
 * Extracts instrumentId and releaseId for all collections
 * Run with: node scripts/scrape-all-ids.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const CATALOG_URL = 'https://catalog.musio.com';

// All collection slugs
const collectionSlugs = [
  'african-marimba', 'ancient-bones', 'apocalypse-percussion-ensemble',
  'artist-series-apocalyptica', 'gina-luciani-cinema-flutes', 'randy-kerber-celeste',
  'randy-kerber-prepared-piano', 'taylor-davis-violin', 'tina-guo-acoustic-cello-legato',
  'tina-guo-electric-cello', 'tina-guo-solo-cello', 'voces8', 'cine-brass-core',
  'cinebrass-deep-horns', 'cinebrass-descant-horn', 'cinebrass-low-brass',
  'cinebrass-pro', 'cinebrass-sonore', 'cineharps', 'cineharpsichord',
  'cinelegacy-harp', 'cineperc-aux', 'cineperc-drum-kit', 'cineperc-epic',
  'cineperc-metal', 'cineperc-orchestral', 'cineperc-tonal', 'cineperc-wood',
  'cineperc-world', 'cine-piano', 'cinestrings-core', 'cinestrings-pro',
  'cinestrings-runs', 'cinestrings-solo', 'cinesymphony', 'cinewinds-core',
  'cinewinds-low-winds', 'cinewinds-pro', 'collision-impact-designer', 'colors',
  'accent-pianos', 'create-series-kalimba', 'tonal-tickles', 'tongue-drum',
  'create-series-toy-xylo', 'twisted-psaltry-cinematic-fx', 'drums-in-blue',
  'drums-of-war-1', 'drums-of-war-2', 'drums-of-war-3', 'dulcimer-and-zither',
  'emotional-piano', 'forbes-pipe-organ', 'handbells', 'hardanger-fiddle',
  'hollywoodwinds', 'hyperion-brass-core', 'hyperion-brass-pro',
  'hyperion-strings-core', 'hyperion-strings-pro', 'industry-brass-core',
  'industry-brass-pro', 'keyboard-in-blue', 'la-modern-percussion',
  'mister-rogers-celeste', 'nashville-scoring-strings', 'men-of-the-north-nordic-voices',
  'women-of-the-north', 'orchestral-chords', 'piano-in-blue', 'quatre',
  'rhodes-73-ep', 'scoring-synths', 'session-piano-grand', 'session-piano-upright',
  'sew-what', 'sketchpad-monochrome', 'soundscapes', 'south-african-voices-female',
  'south-african-voices-group', 'south-african-voices-male', 'studio-banjo',
  'studio-basses', 'studio-guitars', 'sunset-drums', 'true-strike', 'village-drums',
  'village-mallets', 'drum-machine-cr78', 'drum-machine-cr8000', 'drum-machine-dmx',
  'drum-machine-linndrum', 'drum-machine-sk1', 'drum-machine-tr606',
  'drum-machine-tr707', 'drum-machine-tr808', 'drum-machine-tr909', 'tb303',
  'arp-quadra', 'jupiter-6', 'mono-poly', 'obxa', 'oberheim', 'octave-cat',
  'ppg-wave-2', 'prophet-5', 'rhodes-chroma', 'synergy', 'viola-da-gamba',
  'vision-modern-synths', 'voxos', 'world-series-iceland', 'world-series-ireland',
  'world-series-scotland', 'world-series-africa', 'wurlitzer'
];

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
      res.on('error', reject);
    });
    req.on('error', reject);
    req.setTimeout(15000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

// Extract potential instrument data from HTML
function extractInstrumentData(html, slug) {
  const instruments = [];
  
  // Look for 32-char hex IDs
  const hexIds = html.match(/[a-f0-9]{32}/gi) || [];
  const uniqueIds = [...new Set(hexIds)];
  
  // Try to find JSON data with instrument info
  const jsonPatterns = [
    /"instruments"\s*:\s*\[([^\]]+)\]/gi,
    /"releases"\s*:\s*\[([^\]]+)\]/gi,
    /\{"id":"([a-f0-9-]+)"/gi,
  ];
  
  // Extract any structured data we can find
  const data = {
    slug,
    potentialIds: uniqueIds.slice(0, 10), // First 10 unique IDs
    idCount: uniqueIds.length,
  };
  
  // Try to find patterns that look like instrument definitions
  const instrumentPattern = /"(?:instrument|release)Id"\s*:\s*"([a-f0-9]+)"/gi;
  const matches = [...html.matchAll(instrumentPattern)];
  if (matches.length > 0) {
    data.foundIds = matches.map(m => m[1]);
  }
  
  return data;
}

async function scrapeAllIds() {
  console.log('🔍 Comprehensive Musio ID Scraper');
  console.log('==================================\n');
  
  const results = {};
  let found = 0;
  let notFound = 0;
  
  for (let i = 0; i < collectionSlugs.length; i++) {
    const slug = collectionSlugs[i];
    process.stdout.write(`[${i + 1}/${collectionSlugs.length}] ${slug}... `);
    
    try {
      const url = `${CATALOG_URL}/${slug}`;
      const html = await fetchUrl(url);
      
      const data = extractInstrumentData(html, slug);
      results[slug] = data;
      
      if (data.potentialIds.length > 0) {
        console.log(`✓ Found ${data.idCount} potential IDs`);
        found++;
      } else {
        console.log(`✗ No IDs found`);
        notFound++;
      }
      
    } catch (err) {
      console.log(`✗ Error: ${err.message}`);
      results[slug] = { slug, error: err.message };
      notFound++;
    }
    
    await sleep(200);
  }
  
  // Save results
  const outputPath = path.join(__dirname, '..', 'src', 'data', 'instrument-ids.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  
  console.log(`\n✅ Done!`);
  console.log(`   Found IDs for: ${found} collections`);
  console.log(`   Missing: ${notFound} collections`);
  console.log(`📁 Saved to src/data/instrument-ids.json`);
  
  // Generate a TypeScript mapping file
  generateTsMapping(results);
}

function generateTsMapping(results) {
  // Create a mapping of slug -> first potential ID pair
  // This is a best-guess mapping that would need verification
  const mappings = {};
  
  for (const [slug, data] of Object.entries(results)) {
    if (data.potentialIds && data.potentialIds.length >= 2) {
      // Assume first ID is instrumentId, second is releaseId
      // This is a guess and may need manual verification
      mappings[slug] = {
        instrumentId: data.potentialIds[0],
        releaseId: data.potentialIds[1],
      };
    }
  }
  
  const tsContent = `// Potential Musio Instrument ID Mappings
// Auto-generated - these may need verification
// Generated on ${new Date().toISOString()}

export const instrumentIdMappings: Record<string, { instrumentId: string; releaseId: string }> = ${JSON.stringify(mappings, null, 2)};
`;

  const tsPath = path.join(__dirname, '..', 'src', 'data', 'instrument-id-mappings.ts');
  fs.writeFileSync(tsPath, tsContent);
  console.log(`📁 Generated TypeScript mappings at src/data/instrument-id-mappings.ts`);
}

scrapeAllIds();
