/**
 * Musio Instrument ID Scraper
 * 
 * Attempts to find the internal instrumentId and releaseId values
 * Run with: node scripts/scrape-instrument-ids.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const CATALOG_URL = 'https://catalog.musio.com';

// Sample collection slugs to check
const sampleSlugs = [
  'cinelegacy-harp',
  'session-piano-upright',
  'south-african-voices-group',
  'cinestrings-core',
  'drum-machine-tr808',
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

async function scrapeIds() {
  console.log('🔍 Searching for Musio Instrument IDs');
  console.log('=====================================\n');
  
  for (const slug of sampleSlugs) {
    console.log(`\nChecking ${slug}...`);
    
    try {
      const url = `${CATALOG_URL}/${slug}`;
      const html = await fetchUrl(url);
      
      // Look for various ID patterns
      const patterns = [
        /instrumentId['":\s]+([a-f0-9]{32})/gi,
        /releaseId['":\s]+([a-f0-9]{32})/gi,
        /"id":\s*"([a-f0-9-]{36})"/gi,
        /data-instrument-id="([^"]+)"/gi,
        /data-id="([a-f0-9]+)"/gi,
        /"instrumentId":\s*"([^"]+)"/gi,
        /"uuid":\s*"([^"]+)"/gi,
      ];
      
      for (const pattern of patterns) {
        const matches = [...html.matchAll(pattern)];
        if (matches.length > 0) {
          console.log(`  Found with pattern ${pattern.source}:`);
          matches.slice(0, 3).forEach(m => console.log(`    - ${m[1]}`));
        }
      }
      
      // Also look for any 32-char hex strings
      const hexMatches = html.match(/[a-f0-9]{32}/gi);
      if (hexMatches) {
        const unique = [...new Set(hexMatches)];
        console.log(`  Found ${unique.length} potential IDs (32-char hex):`);
        unique.slice(0, 5).forEach(id => console.log(`    - ${id}`));
      }
      
      // Save HTML for manual inspection
      const debugPath = path.join(__dirname, `debug-${slug}.html`);
      fs.writeFileSync(debugPath, html);
      console.log(`  Saved HTML to ${debugPath}`);
      
    } catch (err) {
      console.log(`  Error: ${err.message}`);
    }
    
    await sleep(500);
  }
}

scrapeIds();
