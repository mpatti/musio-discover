// Parse the Musio UUID CSV and generate TypeScript data files
const fs = require('fs');
const path = require('path');

const csvPath = '/Users/mpatti/Downloads/Jan2026 - AllMusio - collection,instrument,uuid.csv';
const outputPath = path.join(__dirname, '../src/data/instruments-with-uuids.ts');
const uuidMapPath = path.join(__dirname, '../src/data/instrument-uuids.ts');

// Read the CSV
const csvContent = fs.readFileSync(csvPath, 'utf-8');
const lines = csvContent.split('\n');

const collections = [];
let currentCollection = null;

// Collection name to slug mapping
function toSlug(name) {
  return name
    .toLowerCase()
    .replace(/[↗]/g, '')
    .replace(/:/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .trim();
}

// Category detection based on collection name
function detectCategory(name) {
  const nameLower = name.toLowerCase();
  
  if (nameLower.includes('string') || nameLower.includes('violin') || nameLower.includes('cello') || 
      nameLower.includes('viola') || nameLower.includes('fiddle') || nameLower.includes('harp') ||
      nameLower.includes('banjo') || nameLower.includes('guitar') || nameLower.includes('bass')) {
    return 'strings';
  }
  if (nameLower.includes('brass') || nameLower.includes('horn') || nameLower.includes('trumpet') ||
      nameLower.includes('trombone') || nameLower.includes('tuba')) {
    return 'brass';
  }
  if (nameLower.includes('wind') || nameLower.includes('flute') || nameLower.includes('clarinet') ||
      nameLower.includes('oboe') || nameLower.includes('pipe')) {
    return 'woodwinds';
  }
  if (nameLower.includes('perc') || nameLower.includes('drum') || nameLower.includes('marimba') ||
      nameLower.includes('mallet') || nameLower.includes('cymbal') || nameLower.includes('snare')) {
    return 'percussion';
  }
  if (nameLower.includes('piano') || nameLower.includes('key') || nameLower.includes('organ') ||
      nameLower.includes('rhodes') || nameLower.includes('wurli') || nameLower.includes('celeste') ||
      nameLower.includes('harpsichord')) {
    return 'keyboards';
  }
  if (nameLower.includes('voice') || nameLower.includes('choir') || nameLower.includes('vocal') ||
      nameLower.includes('voxos') || nameLower.includes('voces')) {
    return 'vocals';
  }
  if (nameLower.includes('synth') || nameLower.includes('tb303') || nameLower.includes('jupiter') ||
      nameLower.includes('prophet') || nameLower.includes('oberheim') || nameLower.includes('ppg') ||
      nameLower.includes('chroma') || nameLower.includes('synergy') || nameLower.includes('mono-poly') ||
      nameLower.includes('octave') || nameLower.includes('quadra') || nameLower.includes('vision')) {
    return 'synths';
  }
  if (nameLower.includes('world') || nameLower.includes('africa') || nameLower.includes('iceland') ||
      nameLower.includes('ireland') || nameLower.includes('scotland') || nameLower.includes('kalimba') ||
      nameLower.includes('dulcimer') || nameLower.includes('gamba') || nameLower.includes('hardanger')) {
    return 'world';
  }
  if (nameLower.includes('machine') || nameLower.includes('tr808') || nameLower.includes('tr909') ||
      nameLower.includes('cr78') || nameLower.includes('linndrum') || nameLower.includes('dmx')) {
    return 'electronic';
  }
  
  return 'other';
}

// Track used slugs to handle duplicates
const usedSlugs = new Set();

// Parse the CSV
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // Skip empty lines
  if (!line.trim()) continue;
  
  // Check if this is a collection header (starts with no indent and has ↗)
  if (line.includes('↗') && !line.startsWith('\t') && !line.startsWith('    ')) {
    // Save previous collection if exists
    if (currentCollection && currentCollection.instruments.length > 0) {
      collections.push(currentCollection);
    }
    
    const collectionName = line.replace('↗', '').trim();
    let slug = toSlug(collectionName);
    
    // Handle duplicate slugs by appending a number
    let slugSuffix = 1;
    while (usedSlugs.has(slug)) {
      slug = `${toSlug(collectionName)}-${slugSuffix}`;
      slugSuffix++;
    }
    usedSlugs.add(slug);
    
    currentCollection = {
      name: collectionName,
      slug: slug,
      category: detectCategory(collectionName),
      instruments: []
    };
  } else if (currentCollection && line.trim()) {
    // This is an instrument line
    // Parse the tab-separated values
    const parts = line.split('\t').filter(p => p.trim());
    
    if (parts.length >= 1) {
      // Find the UUID (32 hex characters at the end)
      const uuidMatch = line.match(/([a-f0-9]{32})/i);
      
      if (uuidMatch) {
        const uuid = uuidMatch[1];
        // Build instrument name from parts (excluding the UUID)
        const nameParts = parts.filter(p => !p.match(/^[a-f0-9]{32}$/i) && p.trim());
        const instrumentName = nameParts.join(' - ').replace(/\s+/g, ' ').trim();
        
        if (instrumentName) {
          currentCollection.instruments.push({
            name: instrumentName,
            uuid: uuid
          });
        }
      }
    }
  }
}

// Don't forget the last collection
if (currentCollection && currentCollection.instruments.length > 0) {
  collections.push(currentCollection);
}

console.log(`Parsed ${collections.length} collections`);
let totalInstruments = 0;
collections.forEach(c => {
  totalInstruments += c.instruments.length;
  console.log(`  ${c.name}: ${c.instruments.length} instruments`);
});
console.log(`Total instruments: ${totalInstruments}`);

// Generate instruments TypeScript array entries
let instrumentsArray = [];
collections.forEach(c => {
  c.instruments.forEach((inst, idx) => {
    const id = `${c.slug}-${idx + 1}`;
    const imageUrl = `https://catalog.musio.com/images/collections/${c.slug}.jpg`;
    instrumentsArray.push(`  {
    id: "${id}",
    name: "${inst.name.replace(/"/g, '\\"')}",
    uuid: "${inst.uuid}",
    collection: "${c.name.replace(/"/g, '\\"')}",
    collectionSlug: "${c.slug}",
    category: "${c.category}",
    imageUrl: "${imageUrl}",
  }`);
  });
});

// Generate collections TypeScript array entries
let collectionsArray = collections.map(c => {
  const imageUrl = `https://catalog.musio.com/images/collections/${c.slug}.jpg`;
  return `  {
    name: "${c.name.replace(/"/g, '\\"')}",
    slug: "${c.slug}",
    category: "${c.category}",
    instrumentCount: ${c.instruments.length},
    imageUrl: "${imageUrl}",
  }`;
});

// Generate JSON data for instruments (faster parsing)
const instrumentsJson = JSON.stringify(collections.flatMap(c => 
  c.instruments.map((inst, idx) => ({
    id: `${c.slug}-${idx + 1}`,
    name: inst.name,
    uuid: inst.uuid,
    collection: c.name,
    collectionSlug: c.slug,
    category: c.category,
    imageUrl: `https://catalog.musio.com/images/collections/${c.slug}.jpg`,
  }))
), null, 2);

const collectionsJson = JSON.stringify(collections.map(c => ({
  name: c.name,
  slug: c.slug,
  category: c.category,
  instrumentCount: c.instruments.length,
  imageUrl: `https://catalog.musio.com/images/collections/${c.slug}.jpg`,
})), null, 2);

// Generate main TypeScript file
const tsContent = `// Musio Instruments with UUIDs
// Auto-generated from CSV on ${new Date().toISOString()}
// Total: ${totalInstruments} instruments across ${collections.length} collections

export type InstrumentCategory = 'strings' | 'brass' | 'woodwinds' | 'percussion' | 'keyboards' | 'vocals' | 'synths' | 'world' | 'electronic' | 'other';

export type Mood = 'epic' | 'intimate' | 'dark' | 'bright' | 'melancholic' | 'triumphant' | 'mysterious' | 'playful' | 'aggressive' | 'peaceful' | 'ethereal' | 'tension' | 'romantic' | 'nostalgic';

export type Genre = 'orchestral' | 'cinematic' | 'electronic' | 'jazz' | 'pop' | 'rock' | 'ambient' | 'world' | 'classical' | 'hybrid' | 'experimental';

export type Role = 'lead' | 'harmony' | 'rhythm' | 'bass' | 'texture' | 'percussion' | 'accent';

export interface Instrument {
  id: string;
  name: string;
  uuid: string;
  collection: string;
  collectionSlug: string;
  category: InstrumentCategory;
  imageUrl?: string;
}

export interface Collection {
  name: string;
  slug: string;
  category: InstrumentCategory;
  instrumentCount: number;
  imageUrl?: string;
}

// All instruments with their UUIDs - using type assertion for performance
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const instruments = ${instrumentsJson} as any as Instrument[];

// All collections
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const collections = ${collectionsJson} as any as Collection[];

// Stats
export const catalogStats = {
  totalInstruments: instruments.length,
  collections: collections.length,
};

// Helper to get instruments by collection
export function getInstrumentsByCollection(collectionSlug: string): Instrument[] {
  return instruments.filter(i => i.collectionSlug === collectionSlug);
}

// Helper to get a random instrument from a collection
export function getRandomFromCollection(collectionSlug: string): Instrument | undefined {
  const collectionInstruments = getInstrumentsByCollection(collectionSlug);
  if (collectionInstruments.length === 0) return undefined;
  return collectionInstruments[Math.floor(Math.random() * collectionInstruments.length)];
}
`;

fs.writeFileSync(outputPath, tsContent);
console.log(`\nGenerated: ${outputPath}`);

// Generate UUID lookup map
const uuidMapEntries = collections.map(c => {
  const instrumentEntries = c.instruments.map(inst => 
    `    { name: "${inst.name.replace(/"/g, '\\"')}", uuid: "${inst.uuid}" }`
  ).join(',\n');
  
  return `  "${c.slug}": {
    instruments: [
${instrumentEntries}
    ]
  }`;
});

const uuidMapContent = `// Instrument UUID Mappings
// Maps collection slugs to their instrument UUIDs
// Auto-generated from Musio catalog CSV on ${new Date().toISOString()}
// Total: ${totalInstruments} instruments across ${collections.length} collections

export interface InstrumentUUID {
  name: string;
  uuid: string;
}

export interface CollectionUUIDs {
  instruments: InstrumentUUID[];
}

// Map from collection slug to list of instruments with UUIDs
export const collectionInstrumentUUIDs: Record<string, CollectionUUIDs> = {
${uuidMapEntries.join(',\n')}
};

// Map from collection slug to first/default instrument UUID
export const collectionDefaultUUIDs: Record<string, string> = {
${collections.map(c => `  "${c.slug}": "${c.instruments[0]?.uuid || ''}"`).join(',\n')}
};

// Get a random UUID from a collection
export function getRandomUUID(collectionSlug: string): string | undefined {
  const collection = collectionInstrumentUUIDs[collectionSlug];
  if (!collection || collection.instruments.length === 0) return undefined;
  const randomIndex = Math.floor(Math.random() * collection.instruments.length);
  return collection.instruments[randomIndex].uuid;
}

// Get instrument UUID by collection and name (fuzzy match)
export function findInstrumentUUID(collectionSlug: string, instrumentName: string): string | undefined {
  const collection = collectionInstrumentUUIDs[collectionSlug];
  if (!collection) return undefined;
  
  const lowerName = instrumentName.toLowerCase();
  
  // Try exact match first
  const exactMatch = collection.instruments.find(i => 
    i.name.toLowerCase() === lowerName
  );
  if (exactMatch) return exactMatch.uuid;
  
  // Try contains match
  const containsMatch = collection.instruments.find(i => 
    i.name.toLowerCase().includes(lowerName) || lowerName.includes(i.name.toLowerCase())
  );
  if (containsMatch) return containsMatch.uuid;
  
  // Return first instrument as fallback
  return collection.instruments[0]?.uuid;
}

// Get all UUIDs for a collection
export function getCollectionUUIDs(collectionSlug: string): string[] {
  const collection = collectionInstrumentUUIDs[collectionSlug];
  if (!collection) return [];
  return collection.instruments.map(i => i.uuid);
}
`;

fs.writeFileSync(uuidMapPath, uuidMapContent);
console.log(`Generated: ${uuidMapPath}`);
