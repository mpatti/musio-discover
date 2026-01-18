/**
 * Musio Catalog Image Scraper v2
 * 
 * Extracts collection images from the main catalog page
 * Run with: node scripts/scrape-images.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const CATALOG_URL = 'https://catalog.musio.com';

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
      res.on('error', reject);
    });
    req.on('error', reject);
    req.setTimeout(30000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

async function scrapeImages() {
  console.log('🖼️  Musio Image Scraper v2');
  console.log('=========================\n');
  
  try {
    console.log('Fetching main catalog page...');
    const html = await fetchUrl(CATALOG_URL);
    console.log(`Received ${html.length} bytes\n`);
    
    // The catalog page has collection cards with images and links
    // Pattern: <a href="/slug">...<img src="https://assets.mus.io/hash.png" class="collection-card-image">...</a>
    
    // First, let's extract all the collection cards with their images
    // The structure seems to be: link to collection followed by image
    
    const imageData = {};
    
    // Find all collection links and their associated images
    // Pattern: href="/slug"...img src="https://assets.mus.io/..."
    const cardPattern = /<a[^>]*href="\/([\w-]+)"[^>]*>[\s\S]*?<img[^>]*src="(https:\/\/assets\.mus\.io\/[^"]+)"[^>]*class="collection-card-image"[^>]*>/gi;
    
    let match;
    while ((match = cardPattern.exec(html)) !== null) {
      const slug = match[1];
      const imageUrl = match[2];
      imageData[slug] = imageUrl;
      console.log(`✓ ${slug}`);
    }
    
    // If the above didn't work well, try a different approach
    // Extract all href/slug pairs and all images separately, then match by order
    if (Object.keys(imageData).length < 10) {
      console.log('\nTrying alternative extraction method...\n');
      
      // Get all collection slugs in order
      const slugPattern = /href="\/([\w-]+)"/gi;
      const slugs = [];
      const excludedSlugs = ['login', 'signup', 'about', 'contact', 'privacy', 'terms', 'api'];
      
      while ((match = slugPattern.exec(html)) !== null) {
        const slug = match[1];
        if (!excludedSlugs.includes(slug) && !slug.startsWith('_') && !slugs.includes(slug)) {
          slugs.push(slug);
        }
      }
      
      // Get all collection card images in order
      const imgPattern = /src="(https:\/\/assets\.mus\.io\/[^"]+)"/gi;
      const images = [];
      
      while ((match = imgPattern.exec(html)) !== null) {
        images.push(match[1]);
      }
      
      console.log(`Found ${slugs.length} slugs and ${images.length} images\n`);
      
      // Match them up (assuming they're in the same order)
      const minLength = Math.min(slugs.length, images.length);
      for (let i = 0; i < minLength; i++) {
        imageData[slugs[i]] = images[i];
        console.log(`✓ ${slugs[i]} -> ${images[i].substring(0, 50)}...`);
      }
    }
    
    console.log(`\n📊 Found ${Object.keys(imageData).length} collection images`);
    
    // Save JSON
    const jsonPath = path.join(__dirname, '..', 'src', 'data', 'collection-images.json');
    fs.writeFileSync(jsonPath, JSON.stringify(imageData, null, 2));
    console.log(`📁 Saved to src/data/collection-images.json`);
    
    // Generate TypeScript file
    generateTsFile(imageData);
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

function generateTsFile(imageData) {
  const entries = Object.entries(imageData)
    .map(([slug, url]) => `  '${slug}': '${url}'`)
    .join(',\n');
  
  const tsContent = `// Collection images from catalog.musio.com
// Auto-generated on ${new Date().toISOString()}
// Total: ${Object.keys(imageData).length} collections

export const collectionImages: Record<string, string> = {
${entries}
};

export function getCollectionImage(slug: string): string | null {
  return collectionImages[slug] || null;
}

// Fallback gradient backgrounds by category
export const categoryGradients: Record<string, string> = {
  strings: 'linear-gradient(135deg, #8B4513 0%, #D2691E 100%)',
  brass: 'linear-gradient(135deg, #B8860B 0%, #FFD700 100%)',
  woodwinds: 'linear-gradient(135deg, #2F4F4F 0%, #4A6B6B 100%)',
  percussion: 'linear-gradient(135deg, #8B0000 0%, #CD5C5C 100%)',
  keyboards: 'linear-gradient(135deg, #1A1A2E 0%, #0F3460 100%)',
  synths: 'linear-gradient(135deg, #4A0080 0%, #9D4EDD 100%)',
  vocals: 'linear-gradient(135deg, #FF6B35 0%, #FFAB8A 100%)',
  world: 'linear-gradient(135deg, #C4A35A 0%, #E4C16A 100%)',
  guitars: 'linear-gradient(135deg, #654321 0%, #A0522D 100%)',
  bass: 'linear-gradient(135deg, #191970 0%, #4B4B80 100%)',
  orchestral: 'linear-gradient(135deg, #2C1810 0%, #6B4030 100%)',
  fx: 'linear-gradient(135deg, #1A1A2E 0%, #3D3D5C 100%)',
  other: 'linear-gradient(135deg, #333333 0%, #666666 100%)',
};
`;

  const tsPath = path.join(__dirname, '..', 'src', 'data', 'collection-images.ts');
  fs.writeFileSync(tsPath, tsContent);
  console.log(`📁 Generated TypeScript file at src/data/collection-images.ts`);
}

scrapeImages();
