/**
 * Scrape ALL collections from catalog.musio.com
 * Creates a complete instruments database
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

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

// Category detection based on collection name/slug
function detectCategory(name, slug) {
  const n = (name + ' ' + slug).toLowerCase();
  
  if (n.includes('string') || n.includes('violin') || n.includes('viola') || n.includes('cello') || n.includes('bass') && !n.includes('drum') || n.includes('harp') || n.includes('fiddle') || n.includes('quartet')) return 'strings';
  if (n.includes('brass') || n.includes('horn') || n.includes('trumpet') || n.includes('trombone') || n.includes('tuba')) return 'brass';
  if (n.includes('wind') || n.includes('flute') || n.includes('oboe') || n.includes('clarinet') || n.includes('bassoon') || n.includes('woodwind')) return 'woodwinds';
  if (n.includes('drum') || n.includes('perc') || n.includes('timpani') || n.includes('cymbal') || n.includes('marimba') || n.includes('mallet') || n.includes('strike') || n.includes('808') || n.includes('909') || n.includes('tr-') || n.includes('cr-') || n.includes('linn') || n.includes('dmx') || n.includes('sk-1') || n.includes('kalimba') || n.includes('tongue') || n.includes('tickle') || n.includes('toy') || n.includes('handbell')) return 'percussion';
  if (n.includes('piano') || n.includes('key') || n.includes('organ') || n.includes('celeste') || n.includes('rhodes') || n.includes('wurli')) return 'keyboards';
  if (n.includes('synth') || n.includes('prophet') || n.includes('jupiter') || n.includes('oberheim') || n.includes('obx') || n.includes('mono') || n.includes('arp') || n.includes('ppg') || n.includes('chroma') || n.includes('synergy') || n.includes('octave') || n.includes('303') || n.includes('vision')) return 'synths';
  if (n.includes('voice') || n.includes('vocal') || n.includes('choir') || n.includes('vox') || n.includes('voces')) return 'vocals';
  if (n.includes('world') || n.includes('iceland') || n.includes('ireland') || n.includes('scotland') || n.includes('africa') || n.includes('nordic') || n.includes('gamba')) return 'world';
  if (n.includes('guitar') || n.includes('banjo')) return 'guitars';
  if (n.includes('bass') && !n.includes('drum')) return 'bass';
  if (n.includes('orchestra') || n.includes('symphony') || n.includes('chord')) return 'orchestral';
  if (n.includes('collision') || n.includes('soundscape') || n.includes('fx') || n.includes('impact') || n.includes('psaltry') || n.includes('bones') || n.includes('sew')) return 'fx';
  
  return 'other';
}

// Mood detection
function detectMoods(name, slug, category) {
  const moods = [];
  const n = (name + ' ' + slug).toLowerCase();
  
  if (n.includes('epic') || n.includes('war') || n.includes('apocalypse') || n.includes('massive')) moods.push('epic');
  if (n.includes('intimate') || n.includes('solo') || n.includes('session')) moods.push('intimate');
  if (n.includes('dark') || n.includes('bones') || n.includes('twisted')) moods.push('dark');
  if (n.includes('bright') || n.includes('toy') || n.includes('tickle')) moods.push('bright');
  if (n.includes('mysterious') || n.includes('ancient')) moods.push('mysterious');
  if (n.includes('emotional') || n.includes('blue')) moods.push('melancholic');
  if (category === 'percussion') moods.push('energetic');
  if (category === 'strings') moods.push('epic', 'melancholic');
  if (category === 'brass') moods.push('triumphant', 'epic');
  if (category === 'woodwinds') moods.push('peaceful', 'intimate');
  if (category === 'keyboards') moods.push('intimate', 'peaceful');
  if (category === 'synths') moods.push('dreamy', 'nostalgic');
  if (category === 'vocals') moods.push('epic', 'peaceful');
  if (category === 'world') moods.push('mysterious', 'peaceful');
  
  // Dedupe and limit
  return [...new Set(moods)].slice(0, 4);
}

// Genre detection
function detectGenres(name, slug, category) {
  const genres = ['cinematic']; // Default
  const n = (name + ' ' + slug).toLowerCase();
  
  if (n.includes('jazz') || n.includes('blue')) genres.push('jazz');
  if (n.includes('808') || n.includes('909') || n.includes('synth') || n.includes('tr-') || n.includes('303')) genres.push('electronic');
  if (category === 'world') genres.push('world');
  if (category === 'strings' || category === 'brass' || category === 'woodwinds') genres.push('classical');
  if (n.includes('pop') || n.includes('session')) genres.push('pop');
  if (n.includes('ambient') || n.includes('soundscape')) genres.push('ambient');
  
  return [...new Set(genres)].slice(0, 3);
}

// Role detection
function detectRoles(category) {
  const roleMap = {
    strings: ['lead', 'harmony', 'texture'],
    brass: ['lead', 'harmony', 'accent'],
    woodwinds: ['lead', 'texture'],
    percussion: ['percussion', 'rhythm'],
    keyboards: ['lead', 'harmony'],
    synths: ['texture', 'lead', 'bass'],
    vocals: ['texture', 'lead'],
    world: ['lead', 'texture'],
    guitars: ['lead', 'rhythm'],
    bass: ['bass'],
    orchestral: ['texture', 'harmony'],
    fx: ['texture', 'accent'],
    other: ['texture'],
  };
  return roleMap[category] || ['texture'];
}

async function scrapeAllCollections() {
  console.log('🎵 Scraping ALL collections from catalog.musio.com');
  console.log('==================================================\n');
  
  // Fetch main catalog page
  console.log('Fetching main catalog page...');
  const html = await fetchUrl('https://catalog.musio.com');
  
  // Extract all collection links and images
  const collectionRegex = /<a href="\/([a-z0-9-]+)">\s*<img src="(https:\/\/assets\.mus\.io\/[^"]+)"/g;
  const collections = [];
  let match;
  
  while ((match = collectionRegex.exec(html)) !== null) {
    const slug = match[1];
    const imageUrl = match[2];
    
    // Skip if already added (dedup)
    if (!collections.find(c => c.slug === slug)) {
      collections.push({ slug, imageUrl });
    }
  }
  
  console.log(`Found ${collections.length} unique collections\n`);
  
  // Now fetch each collection page to get the title
  console.log('Fetching collection details...\n');
  
  for (let i = 0; i < collections.length; i++) {
    const col = collections[i];
    process.stdout.write(`[${i + 1}/${collections.length}] ${col.slug}... `);
    
    try {
      const colHtml = await fetchUrl(`https://catalog.musio.com/${col.slug}`);
      
      // Try to extract title
      const titleMatch = colHtml.match(/<title>([^<]+)<\/title>/);
      if (titleMatch) {
        col.name = titleMatch[1].replace(' | Musio Catalog', '').replace(' - Musio', '').trim();
      } else {
        // Convert slug to name
        col.name = col.slug
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      }
      
      // Try to get description
      const descMatch = colHtml.match(/<meta name="description" content="([^"]+)"/);
      col.description = descMatch ? descMatch[1] : '';
      
      console.log(`✓ ${col.name}`);
    } catch (err) {
      // Fallback name from slug
      col.name = col.slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      col.description = '';
      console.log(`⚠ Using fallback name`);
    }
    
    // Add category and metadata
    col.category = detectCategory(col.name, col.slug);
    col.moods = detectMoods(col.name, col.slug, col.category);
    col.genres = detectGenres(col.name, col.slug, col.category);
    col.roles = detectRoles(col.category);
    
    // Small delay to be nice to the server
    await new Promise(r => setTimeout(r, 100));
  }
  
  console.log(`\n✅ Scraped ${collections.length} collections!`);
  
  // Generate TypeScript file
  generateInstrumentsFile(collections);
  
  return collections;
}

function generateInstrumentsFile(collections) {
  const categoryColors = {
    strings: '#C4785A',
    brass: '#D4A520',
    woodwinds: '#5A8A7A',
    percussion: '#B45A5A',
    keyboards: '#4A6A9A',
    synths: '#8A5AAA',
    vocals: '#AA6A7A',
    world: '#9A8A5A',
    guitars: '#8A6A4A',
    bass: '#4A5A7A',
    orchestral: '#6A5A4A',
    fx: '#5A6A8A',
    other: '#6A6A6A',
  };

  const instruments = collections.map(col => ({
    id: col.slug,
    name: col.name,
    collection: col.name,
    collectionSlug: col.slug,
    category: col.category,
    moods: col.moods,
    genres: col.genres,
    roles: col.roles,
    isPremium: true,
    description: col.description || `${col.name} - Musio instrument collection`,
    tags: [col.category, ...col.slug.split('-').filter(t => t.length > 2)],
    color: categoryColors[col.category] || '#6A6A6A',
    imageUrl: col.imageUrl,
  }));

  const tsContent = `// Complete Musio Instrument Catalog
// Auto-generated from catalog.musio.com
// ${collections.length} Collections | 3,433+ Instruments

export type InstrumentCategory = 
  | 'strings' | 'brass' | 'woodwinds' | 'percussion' | 'keyboards' 
  | 'synths' | 'vocals' | 'world' | 'guitars' | 'bass' | 'orchestral' | 'fx' | 'other';

export type Mood = 
  | 'epic' | 'intimate' | 'dark' | 'bright' | 'mysterious' | 'energetic' 
  | 'melancholic' | 'triumphant' | 'tense' | 'peaceful' | 'aggressive' | 'dreamy' | 'nostalgic' | 'playful';

export type Genre = 
  | 'cinematic' | 'pop' | 'rock' | 'electronic' | 'jazz' | 'classical' 
  | 'ambient' | 'hip-hop' | 'folk' | 'world' | 'r&b' | 'indie' | 'experimental';

export type Role = 'lead' | 'harmony' | 'rhythm' | 'bass' | 'texture' | 'percussion' | 'accent';

export interface Instrument {
  id: string;
  name: string;
  collection: string;
  collectionSlug: string;
  category: InstrumentCategory;
  moods: Mood[];
  genres: Genre[];
  roles: Role[];
  isPremium: boolean;
  description: string;
  tags: string[];
  color: string;
  imageUrl: string | null;
}

// ALL ${collections.length} COLLECTIONS FROM MUSIO CATALOG
export const instruments: Instrument[] = ${JSON.stringify(instruments, null, 2)};

// Helper functions
export function getInstrumentsByCategory(category: InstrumentCategory): Instrument[] {
  return instruments.filter(i => i.category === category);
}

export function getInstrumentsByMood(mood: Mood): Instrument[] {
  return instruments.filter(i => i.moods.includes(mood));
}

export function getInstrumentsByGenre(genre: Genre): Instrument[] {
  return instruments.filter(i => i.genres.includes(genre));
}

export function getInstrumentsByRole(role: Role): Instrument[] {
  return instruments.filter(i => i.roles.includes(role));
}

export function searchInstruments(query: string): Instrument[] {
  const q = query.toLowerCase();
  return instruments.filter(i => 
    i.name.toLowerCase().includes(q) ||
    i.collection.toLowerCase().includes(q) ||
    i.description.toLowerCase().includes(q) ||
    i.tags.some(t => t.toLowerCase().includes(q))
  );
}

// Catalog stats
export const catalogStats = {
  totalInstruments: 3433,
  collections: ${collections.length},
  categories: [...new Set(instruments.map(i => i.category))].length,
};
`;

  const outputPath = path.join(__dirname, '..', 'src', 'data', 'all-instruments.ts');
  fs.writeFileSync(outputPath, tsContent);
  console.log(`\n📁 Generated src/data/all-instruments.ts with ${collections.length} instruments`);
}

scrapeAllCollections().catch(console.error);
