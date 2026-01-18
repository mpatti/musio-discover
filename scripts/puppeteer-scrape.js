const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Collection slugs from our existing data
const collectionSlugs = [
  'cinestrings-core', 'cinestrings-solo', 'cinestrings-runs', 'cinestrings-pro',
  'hyperion-strings-core', 'hyperion-strings-pro',
  'cine-brass-core', 'cinebrass-pro', 'cinebrass-sonore', 'cinebrass-descant-horn', 
  'cinebrass-deep-horns', 'cinebrass-low-brass',
  'hyperion-brass-core', 'hyperion-brass-pro',
  'industry-brass-core', 'industry-brass-pro',
  'cinewinds-core', 'cinewinds-pro', 'cinewinds-low-winds',
  'hollywoodwinds', 'gina-luciani-cinema-flutes',
  'cineperc', 'cineperc-epic', 'cineperc-orchestral', 'cineperc-tonal',
  'cineperc-aux', 'cineperc-drum-kit', 'cineperc-metal', 'cineperc-wood', 'cineperc-world',
  'la-modern-percussion', 'drums-of-war-1', 'drums-of-war-2', 'drums-of-war-3',
  'cineharps', 'cineharpsichord', 'cinelegacy-harp',
  'cine-piano', 'session-piano-upright', 'emotional-piano',
  'taylor-davis-violin', 'tina-guo-solo-cello', 'tina-guo-acoustic-cello-legato', 
  'tina-guo-electric-cello', 'artist-series-apocalyptica',
  'south-african-voices-group', 'south-african-voices-female', 'south-african-voices-male',
  'men-of-the-north', 'women-of-the-north', 'voces8',
  'hardanger-fiddle', 'viola-da-gamba', 'dulcimer-and-zither',
  'mister-rogers-celeste', 'randy-kerber-celeste',
  'tongue-drum', 'create-series-toy-xylo', 'create-series-kalimba',
  'drum-machine-tr808', 'drum-machine-tr909', 'drum-machine-tr606',
  'drum-machine-cr78', 'drum-machine-cr8000', 'drum-machine-dmx', 'drum-machine-sk1',
  'nashville-scoring-strings', 'quatre', 'ancient-bones', 'tonal-tickles',
  'accent-pianos', 'forbes-pipe-organ'
];

async function scrapeCollection(browser, slug) {
  const page = await browser.newPage();
  const url = `https://catalog.musio.com/${slug}`;
  
  console.log(`Scraping: ${url}`);
  
  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    
    // Wait for content to load
    await page.waitForSelector('body', { timeout: 10000 });
    
    // Wait a bit more for JavaScript to render
    await new Promise(r => setTimeout(r, 3000));
    
    // Extract all text content to find instrument names
    const data = await page.evaluate(() => {
      const result = {
        title: document.title,
        url: window.location.href,
        instruments: [],
        rawText: document.body.innerText
      };
      
      // Look for instrument/articulation elements
      // Try various selectors that might contain instrument data
      const possibleSelectors = [
        '[class*="instrument"]',
        '[class*="articulation"]',
        '[class*="preset"]',
        '[class*="patch"]',
        '[class*="sound"]',
        '[class*="item"]',
        'li',
        '[role="listitem"]',
        '[class*="card"]'
      ];
      
      possibleSelectors.forEach(selector => {
        try {
          document.querySelectorAll(selector).forEach(el => {
            const text = el.innerText?.trim();
            if (text && text.length > 2 && text.length < 100 && !result.instruments.includes(text)) {
              result.instruments.push(text);
            }
          });
        } catch (e) {}
      });
      
      // Also look for any JSON data in the page
      const scripts = document.querySelectorAll('script');
      scripts.forEach(script => {
        const content = script.textContent || '';
        if (content.includes('instruments') || content.includes('articulations') || content.includes('presets')) {
          result.scriptData = content.substring(0, 5000);
        }
      });
      
      // Look for Next.js data
      const nextData = document.getElementById('__NEXT_DATA__');
      if (nextData) {
        try {
          result.nextData = JSON.parse(nextData.textContent);
        } catch (e) {}
      }
      
      return result;
    });
    
    await page.close();
    return { slug, ...data };
    
  } catch (error) {
    console.error(`Error scraping ${slug}:`, error.message);
    await page.close();
    return { slug, error: error.message };
  }
}

async function main() {
  console.log('Starting Puppeteer scrape...');
  console.log(`Will scrape ${collectionSlugs.length} collections\n`);
  
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const results = [];
  
  // Scrape first 5 collections as a test
  const testSlugs = collectionSlugs.slice(0, 5);
  
  for (const slug of testSlugs) {
    const data = await scrapeCollection(browser, slug);
    results.push(data);
    console.log(`  Found ${data.instruments?.length || 0} potential items\n`);
  }
  
  await browser.close();
  
  // Save results
  const outputPath = path.join(__dirname, 'puppeteer-results.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  console.log(`\nResults saved to: ${outputPath}`);
  
  // Print summary
  console.log('\n=== SUMMARY ===');
  results.forEach(r => {
    console.log(`${r.slug}: ${r.instruments?.length || 0} items, ${r.nextData ? 'has Next.js data' : 'no Next.js data'}`);
  });
}

main().catch(console.error);
