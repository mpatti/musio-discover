/**
 * Musio Catalog Scraper
 * 
 * This script fetches the real instrument data from catalog.musio.com
 * Run with: node scripts/scrape-catalog.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const CATALOG_URL = 'https://catalog.musio.com';

// Function to fetch a URL
function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
      res.on('error', reject);
    });
    req.on('error', reject);
    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

// Sleep helper
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

// Main scrape function
async function scrapeCatalog() {
  console.log('🎵 Musio Catalog Scraper');
  console.log('========================\n');
  
  try {
    console.log(`Fetching ${CATALOG_URL}...`);
    const html = await fetchUrl(CATALOG_URL);
    
    // Extract all collection slugs from href attributes
    const hrefPattern = /href="\/([\w-]+)"/gi;
    const matches = [...html.matchAll(hrefPattern)];
    
    // Filter to get unique collection slugs (excluding common routes)
    const excludedSlugs = ['', 'login', 'signup', 'about', 'contact', 'privacy', 'terms', 'api', 'static', 'favicon'];
    const collectionSlugs = [...new Set(
      matches
        .map(m => m[1])
        .filter(slug => !excludedSlugs.includes(slug) && !slug.startsWith('_'))
    )];
    
    console.log(`Found ${collectionSlugs.length} collections!\n`);
    
    // Store all collections data
    const collections = [];
    
    // Fetch details for each collection (with rate limiting)
    console.log('Fetching collection details...\n');
    
    for (let i = 0; i < collectionSlugs.length; i++) {
      const slug = collectionSlugs[i];
      process.stdout.write(`[${i + 1}/${collectionSlugs.length}] ${slug}... `);
      
      try {
        const collectionUrl = `${CATALOG_URL}/${slug}`;
        const collectionHtml = await fetchUrl(collectionUrl);
        
        // Try to extract collection name from title or h1
        const titleMatch = collectionHtml.match(/<title>([^<]+)<\/title>/i);
        const h1Match = collectionHtml.match(/<h1[^>]*>([^<]+)<\/h1>/i);
        
        // Try to extract instrument count
        const instrumentMatch = collectionHtml.match(/(\d+)\s*instruments?/i);
        
        // Try to extract description
        const descMatch = collectionHtml.match(/<meta name="description" content="([^"]+)"/i);
        
        // Try to extract individual instruments/patches from the page
        // Look for common patterns in instrument listings
        const instrumentNames = [];
        
        // Pattern 1: Look for instrument names in specific elements
        const instrumentPattern = /<div[^>]*class="[^"]*instrument[^"]*"[^>]*>([^<]+)/gi;
        const instMatches = [...collectionHtml.matchAll(instrumentPattern)];
        instMatches.forEach(m => instrumentNames.push(m[1].trim()));
        
        // Pattern 2: Look for data attributes or JSON
        const dataPattern = /"name"\s*:\s*"([^"]+)"/g;
        const dataMatches = [...collectionHtml.matchAll(dataPattern)];
        dataMatches.forEach(m => {
          if (m[1] && m[1].length < 100) {
            instrumentNames.push(m[1]);
          }
        });
        
        const collection = {
          slug,
          name: (h1Match?.[1] || titleMatch?.[1] || slug).replace(' | Musio Catalog', '').replace(' - Musio', '').trim(),
          instrumentCount: instrumentMatch ? parseInt(instrumentMatch[1]) : null,
          description: descMatch?.[1] || null,
          instruments: [...new Set(instrumentNames)].slice(0, 50) // Dedupe and limit
        };
        
        collections.push(collection);
        console.log(`✓ ${collection.name} (${collection.instrumentCount || '?'} instruments)`);
        
      } catch (err) {
        console.log(`✗ Error: ${err.message}`);
        collections.push({
          slug,
          name: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
          instrumentCount: null,
          description: null,
          instruments: []
        });
      }
      
      // Rate limiting - be nice to their server
      await sleep(200);
    }
    
    // Save the results
    const outputPath = path.join(__dirname, '..', 'src', 'data', 'musio-catalog.json');
    fs.writeFileSync(outputPath, JSON.stringify(collections, null, 2));
    console.log(`\n✅ Saved ${collections.length} collections to src/data/musio-catalog.json`);
    
    // Print summary
    const totalInstruments = collections.reduce((sum, c) => sum + (c.instrumentCount || 0), 0);
    console.log(`\n📊 Summary:`);
    console.log(`   Collections: ${collections.length}`);
    console.log(`   Total instruments: ${totalInstruments}+`);
    
    // Generate TypeScript data file
    generateTypeScriptData(collections);
    
  } catch (error) {
    console.error('Error scraping catalog:', error.message);
  }
}

function generateTypeScriptData(collections) {
  // Create a TypeScript file with the real data
  const tsContent = `// Auto-generated from catalog.musio.com
// Last updated: ${new Date().toISOString()}

export interface MusioCollection {
  slug: string;
  name: string;
  instrumentCount: number | null;
  description: string | null;
  category: string;
}

// Real collections from Musio Catalog
export const musioCollections: MusioCollection[] = ${JSON.stringify(
    collections.map(c => ({
      slug: c.slug,
      name: c.name,
      instrumentCount: c.instrumentCount,
      description: c.description,
      category: categorizeCollection(c.slug, c.name)
    })),
    null, 
    2
  )};

export const catalogStats = {
  totalCollections: ${collections.length},
  lastUpdated: "${new Date().toISOString()}"
};
`;

  const tsPath = path.join(__dirname, '..', 'src', 'data', 'musio-collections.ts');
  fs.writeFileSync(tsPath, tsContent);
  console.log(`✅ Generated TypeScript data file at src/data/musio-collections.ts`);
}

// Helper to categorize collections based on name/slug
function categorizeCollection(slug, name) {
  const lower = (slug + ' ' + name).toLowerCase();
  
  if (lower.includes('string') || lower.includes('violin') || lower.includes('cello') || lower.includes('viola')) return 'strings';
  if (lower.includes('brass') || lower.includes('horn') || lower.includes('trumpet') || lower.includes('trombone')) return 'brass';
  if (lower.includes('wind') || lower.includes('flute') || lower.includes('clarinet') || lower.includes('oboe')) return 'woodwinds';
  if (lower.includes('percussion') || lower.includes('drum') || lower.includes('marimba') || lower.includes('timpani')) return 'percussion';
  if (lower.includes('piano') || lower.includes('keyboard') || lower.includes('keys') || lower.includes('organ')) return 'keyboards';
  if (lower.includes('synth') || lower.includes('analog') || lower.includes('vintage synth')) return 'synths';
  if (lower.includes('voice') || lower.includes('vocal') || lower.includes('choir') || lower.includes('voces')) return 'vocals';
  if (lower.includes('guitar') || lower.includes('acoustic guitar')) return 'guitars';
  if (lower.includes('bass')) return 'bass';
  if (lower.includes('harp')) return 'strings';
  if (lower.includes('world') || lower.includes('ethnic') || lower.includes('african') || lower.includes('asian')) return 'world';
  if (lower.includes('cine') || lower.includes('orchestra')) return 'orchestral';
  
  return 'other';
}

scrapeCatalog();
