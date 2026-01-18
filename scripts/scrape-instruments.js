/**
 * Scrape individual instruments from each Musio collection page
 * Run with: node scripts/scrape-instruments.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const CATALOG_URL = 'https://catalog.musio.com';

// Collection slugs to scrape
const collectionSlugs = [
  'cinestrings-core', 'cinestrings-pro', 'cinestrings-solo', 'cinestrings-runs',
  'hyperion-strings-core', 'hyperion-strings-pro', 'nashville-scoring-strings',
  'quatre', 'viola-da-gamba', 'hardanger-fiddle', 'cineharps', 'cineharpsichord',
  'cinelegacy-harp', 'dulcimer-and-zither',
  'artist-series-apocalyptica', 'taylor-davis-violin', 'tina-guo-acoustic-cello-legato',
  'tina-guo-electric-cello', 'tina-guo-solo-cello',
  'cine-brass-core', 'cinebrass-pro', 'cinebrass-sonore', 'cinebrass-deep-horns',
  'cinebrass-descant-horn', 'cinebrass-low-brass', 'hyperion-brass-core', 'hyperion-brass-pro',
  'industry-brass-core', 'industry-brass-pro',
  'cinewinds-core', 'cinewinds-pro', 'cinewinds-low-winds', 'hollywoodwinds',
  'gina-luciani-cinema-flutes',
  'cineperc-orchestral', 'cineperc-epic', 'cineperc-aux', 'cineperc-metal',
  'cineperc-wood', 'cineperc-tonal', 'cineperc-world', 'cineperc-drum-kit',
  'drums-of-war-1', 'drums-of-war-2', 'drums-of-war-3', 'apocalypse-percussion-ensemble',
  'la-modern-percussion', 'true-strike', 'sunset-drums', 'drums-in-blue',
  'village-drums', 'village-mallets', 'african-marimba', 'handbells',
  'drum-machine-tr808', 'drum-machine-tr909', 'drum-machine-tr707', 'drum-machine-tr606',
  'drum-machine-cr78', 'drum-machine-cr8000', 'drum-machine-linndrum', 'drum-machine-dmx',
  'drum-machine-sk1',
  'cine-piano', 'session-piano-grand', 'session-piano-upright', 'emotional-piano',
  'piano-in-blue', 'accent-pianos', 'forbes-pipe-organ', 'keyboard-in-blue',
  'rhodes-73-ep', 'wurlitzer', 'randy-kerber-celeste', 'randy-kerber-prepared-piano',
  'mister-rogers-celeste',
  'scoring-synths', 'vision-modern-synths', 'tb303', 'prophet-5', 'jupiter-6',
  'obxa', 'oberheim', 'mono-poly', 'arp-quadra', 'ppg-wave-2', 'rhodes-chroma',
  'synergy', 'octave-cat',
  'voxos', 'voces8', 'south-african-voices-group', 'south-african-voices-female',
  'south-african-voices-male', 'men-of-the-north-nordic-voices', 'women-of-the-north',
  'world-series-iceland', 'world-series-ireland', 'world-series-scotland', 'world-series-africa',
  'studio-guitars', 'studio-banjo', 'studio-basses',
  'cinesymphony', 'orchestral-chords',
  'collision-impact-designer', 'soundscapes', 'ancient-bones', 'colors',
  'sketchpad-monochrome', 'sew-what',
  'create-series-kalimba', 'tonal-tickles', 'tongue-drum', 'create-series-toy-xylo',
  'twisted-psaltry-cinematic-fx'
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

// Extract instrument names from the HTML
function extractInstruments(html, collectionSlug) {
  const instruments = [];
  
  // Look for instrument cards/items in the HTML
  // Pattern 1: Look for data in script tags (Next.js hydration data)
  const scriptMatch = html.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/);
  if (scriptMatch) {
    try {
      const data = JSON.parse(scriptMatch[1]);
      // Try to find instruments in the page props
      const pageProps = data?.props?.pageProps;
      if (pageProps?.instruments) {
        return pageProps.instruments.map(i => ({
          name: i.name || i.title,
          id: i.id || i.slug,
        }));
      }
      if (pageProps?.collection?.instruments) {
        return pageProps.collection.instruments.map(i => ({
          name: i.name || i.title,
          id: i.id || i.slug,
        }));
      }
    } catch (e) {
      // JSON parse failed, continue with HTML parsing
    }
  }
  
  // Pattern 2: Look for instrument names in common patterns
  // Many catalog sites list instruments in cards or list items
  const instrumentPatterns = [
    // Pattern: "instrumentName" or 'instrumentName' after common keys
    /"(?:name|title|instrumentName)":\s*"([^"]+)"/g,
    // Pattern: data attributes
    /data-instrument-name="([^"]+)"/g,
    // Pattern: Alt text on images (often contains instrument names)
    /alt="([^"]*(?:Violin|Viola|Cello|Bass|Horn|Trumpet|Trombone|Flute|Oboe|Clarinet|Bassoon|Piano|Organ|Drum|Cymbal|Timpani|Marimba|Guitar|Harp|Voice)[^"]*)"/gi,
  ];
  
  const foundNames = new Set();
  
  for (const pattern of instrumentPatterns) {
    const matches = [...html.matchAll(pattern)];
    matches.forEach(m => {
      const name = m[1].trim();
      if (name && name.length > 2 && name.length < 100) {
        foundNames.add(name);
      }
    });
  }
  
  // Convert to array
  foundNames.forEach(name => {
    instruments.push({
      name: name,
      id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    });
  });
  
  return instruments;
}

async function scrapeAllInstruments() {
  console.log('🎵 Scraping Individual Instruments from Musio Collections');
  console.log('==========================================================\n');
  
  const allInstruments = {};
  let totalFound = 0;
  
  for (let i = 0; i < collectionSlugs.length; i++) {
    const slug = collectionSlugs[i];
    process.stdout.write(`[${i + 1}/${collectionSlugs.length}] ${slug}... `);
    
    try {
      const url = `${CATALOG_URL}/${slug}`;
      const html = await fetchUrl(url);
      
      const instruments = extractInstruments(html, slug);
      
      if (instruments.length > 0) {
        allInstruments[slug] = instruments;
        totalFound += instruments.length;
        console.log(`✓ Found ${instruments.length} instruments`);
      } else {
        // If no instruments found, save HTML for debugging
        const debugPath = path.join(__dirname, `debug-${slug}.html`);
        fs.writeFileSync(debugPath, html.substring(0, 50000)); // First 50k chars
        console.log(`⚠ No instruments found (HTML saved)`);
        allInstruments[slug] = [];
      }
      
    } catch (err) {
      console.log(`✗ Error: ${err.message}`);
      allInstruments[slug] = [];
    }
    
    await sleep(300);
  }
  
  // Save raw results
  const outputPath = path.join(__dirname, '..', 'src', 'data', 'scraped-instruments.json');
  fs.writeFileSync(outputPath, JSON.stringify(allInstruments, null, 2));
  
  console.log(`\n✅ Done! Found ${totalFound} total instruments`);
  console.log(`📁 Saved to src/data/scraped-instruments.json`);
  
  return allInstruments;
}

scrapeAllInstruments();
