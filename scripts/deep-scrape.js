/**
 * Deep scrape of Musio catalog - tries multiple methods to get instruments
 * Run with: node scripts/deep-scrape.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Accept': 'application/json, text/html, */*',
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ data, status: res.statusCode, headers: res.headers }));
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

async function tryApiEndpoints() {
  console.log('🔍 Trying to find API endpoints...\n');
  
  const endpoints = [
    'https://catalog.musio.com/api/collections',
    'https://catalog.musio.com/api/instruments',
    'https://catalog.musio.com/api/catalog',
    'https://api.musio.com/catalog',
    'https://api.musio.com/v1/catalog',
    'https://api.musio.com/v1/collections',
    'https://api.musio.com/v1/instruments',
    'https://catalog.musio.com/_next/data/collections.json',
    'https://assets.mus.io/catalog.json',
  ];
  
  for (const url of endpoints) {
    try {
      console.log(`Trying ${url}...`);
      const result = await fetchUrl(url);
      console.log(`  Status: ${result.status}`);
      if (result.status === 200 && result.data.length > 100) {
        console.log(`  ✓ Got data! (${result.data.length} bytes)`);
        console.log(`  Preview: ${result.data.substring(0, 200)}...`);
        
        // Try to parse as JSON
        try {
          const json = JSON.parse(result.data);
          console.log(`  ✓ Valid JSON!`);
          fs.writeFileSync(path.join(__dirname, 'api-response.json'), JSON.stringify(json, null, 2));
          return json;
        } catch (e) {
          console.log(`  Not JSON`);
        }
      }
    } catch (err) {
      console.log(`  ✗ ${err.message}`);
    }
    await sleep(200);
  }
  
  return null;
}

async function scrapeMainCatalog() {
  console.log('\n📄 Scraping main catalog page for embedded data...\n');
  
  try {
    const result = await fetchUrl('https://catalog.musio.com');
    const html = result.data;
    
    // Look for __NEXT_DATA__ script tag
    const nextDataMatch = html.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/);
    if (nextDataMatch) {
      console.log('Found __NEXT_DATA__ script tag!');
      try {
        const nextData = JSON.parse(nextDataMatch[1]);
        fs.writeFileSync(path.join(__dirname, 'next-data.json'), JSON.stringify(nextData, null, 2));
        console.log('Saved to next-data.json');
        
        // Look for collections/instruments in the data
        const pageProps = nextData?.props?.pageProps;
        if (pageProps) {
          console.log('PageProps keys:', Object.keys(pageProps));
          if (pageProps.collections) {
            console.log(`Found ${pageProps.collections.length} collections!`);
            return pageProps;
          }
          if (pageProps.instruments) {
            console.log(`Found ${pageProps.instruments.length} instruments!`);
            return pageProps;
          }
        }
      } catch (e) {
        console.log('Failed to parse __NEXT_DATA__:', e.message);
      }
    }
    
    // Look for inline JSON data
    const jsonMatches = html.match(/\{"collections":\[[\s\S]*?\]\}/g);
    if (jsonMatches) {
      console.log(`Found ${jsonMatches.length} potential JSON blocks with collections`);
    }
    
    // Look for instrument arrays
    const instrumentArrayMatch = html.match(/"instruments"\s*:\s*\[([\s\S]*?)\]/);
    if (instrumentArrayMatch) {
      console.log('Found instruments array in HTML!');
    }
    
    // Save HTML for manual inspection
    fs.writeFileSync(path.join(__dirname, 'catalog-main.html'), html);
    console.log('Saved HTML to catalog-main.html');
    
  } catch (err) {
    console.log('Error:', err.message);
  }
}

async function scrapeCollectionPage(slug) {
  try {
    const result = await fetchUrl(`https://catalog.musio.com/${slug}`);
    const html = result.data;
    
    // Look for __NEXT_DATA__
    const nextDataMatch = html.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/);
    if (nextDataMatch) {
      const nextData = JSON.parse(nextDataMatch[1]);
      const pageProps = nextData?.props?.pageProps;
      
      if (pageProps?.collection) {
        return pageProps.collection;
      }
      if (pageProps?.instruments) {
        return { instruments: pageProps.instruments };
      }
      
      // Return whatever we found
      return pageProps;
    }
    
    return null;
  } catch (err) {
    return null;
  }
}

async function scrapeAllCollections() {
  console.log('\n🎵 Scraping individual collection pages...\n');
  
  // Get collection slugs from our existing data
  const imagesFile = fs.readFileSync(
    path.join(__dirname, '..', 'src', 'data', 'collection-images.ts'), 
    'utf8'
  );
  
  const slugMatches = imagesFile.match(/'([a-z0-9-]+)':/g);
  const slugs = slugMatches ? slugMatches.map(s => s.replace(/[':]/g, '')) : [];
  
  console.log(`Found ${slugs.length} collection slugs to scrape`);
  
  const allData = {};
  let foundInstruments = 0;
  
  for (let i = 0; i < Math.min(slugs.length, 10); i++) { // Test first 10
    const slug = slugs[i];
    process.stdout.write(`[${i+1}/${slugs.length}] ${slug}... `);
    
    const data = await scrapeCollectionPage(slug);
    if (data) {
      allData[slug] = data;
      const instruments = data.instruments || data.presets || [];
      if (instruments.length > 0) {
        console.log(`✓ Found ${instruments.length} instruments`);
        foundInstruments += instruments.length;
      } else {
        console.log(`✓ Got data (keys: ${Object.keys(data).join(', ')})`);
      }
    } else {
      console.log('✗ No data found');
    }
    
    await sleep(300);
  }
  
  if (Object.keys(allData).length > 0) {
    fs.writeFileSync(
      path.join(__dirname, 'collections-data.json'), 
      JSON.stringify(allData, null, 2)
    );
    console.log(`\nSaved collection data to collections-data.json`);
    console.log(`Total instruments found: ${foundInstruments}`);
  }
  
  return allData;
}

async function main() {
  console.log('🎹 Musio Catalog Deep Scraper');
  console.log('==============================\n');
  
  // Try API endpoints first
  const apiData = await tryApiEndpoints();
  if (apiData) {
    console.log('\n✅ Found API data!');
    return;
  }
  
  // Try main catalog page
  await scrapeMainCatalog();
  
  // Try individual collection pages
  await scrapeAllCollections();
  
  console.log('\n✅ Scraping complete! Check the output files.');
}

main();
