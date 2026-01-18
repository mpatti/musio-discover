// Musio Catalog - Real Instrument Database
// Scraped from catalog.musio.com on 2026-01-18
// 116 Collections

import { collectionImages } from './collection-images';

export type InstrumentCategory = 
  | 'strings' 
  | 'brass' 
  | 'woodwinds' 
  | 'percussion' 
  | 'keyboards' 
  | 'synths' 
  | 'vocals' 
  | 'world' 
  | 'guitars' 
  | 'bass'
  | 'orchestral'
  | 'fx'
  | 'other';

export type Mood = 
  | 'epic' 
  | 'intimate' 
  | 'dark' 
  | 'bright' 
  | 'mysterious' 
  | 'energetic' 
  | 'melancholic' 
  | 'triumphant'
  | 'tense'
  | 'peaceful'
  | 'aggressive'
  | 'dreamy'
  | 'nostalgic'
  | 'playful';

export type Genre = 
  | 'cinematic' 
  | 'pop' 
  | 'rock' 
  | 'electronic' 
  | 'jazz' 
  | 'classical' 
  | 'ambient' 
  | 'hip-hop'
  | 'folk'
  | 'world'
  | 'r&b'
  | 'indie'
  | 'experimental';

export type Role = 
  | 'lead' 
  | 'harmony' 
  | 'rhythm' 
  | 'bass' 
  | 'texture' 
  | 'percussion'
  | 'accent';

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

export interface Collection {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: InstrumentCategory;
  isPremium: boolean;
  imageUrl: string | null;
  instrumentCount: number;
}

// Helper function to generate colors based on category
function getCategoryColor(category: InstrumentCategory): string {
  const colors: Record<InstrumentCategory, string> = {
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
  return colors[category];
}

// Base collection data type (without computed fields)
type CollectionBase = Omit<Collection, 'imageUrl' | 'instrumentCount'>;

// REAL Collections from catalog.musio.com
const collectionsData: CollectionBase[] = [
  // Strings
  { id: 'cinestrings-core', slug: 'cinestrings-core', name: 'CineStrings - Core', description: 'Essential orchestral strings for cinematic scoring', category: 'strings', isPremium: true },
  { id: 'cinestrings-pro', slug: 'cinestrings-pro', name: 'CineStrings - Pro', description: 'Advanced orchestral strings with extended articulations', category: 'strings', isPremium: true },
  { id: 'cinestrings-solo', slug: 'cinestrings-solo', name: 'CineStrings - Solo', description: 'Expressive solo string instruments', category: 'strings', isPremium: true },
  { id: 'cinestrings-runs', slug: 'cinestrings-runs', name: 'CineStrings - Runs', description: 'Pre-recorded string runs and phrases', category: 'strings', isPremium: true },
  { id: 'hyperion-strings-core', slug: 'hyperion-strings-core', name: 'Hyperion Strings Core', description: 'Modern orchestral string library', category: 'strings', isPremium: true },
  { id: 'hyperion-strings-pro', slug: 'hyperion-strings-pro', name: 'Hyperion Strings Pro', description: 'Extended Hyperion strings library', category: 'strings', isPremium: true },
  { id: 'nashville-scoring-strings', slug: 'nashville-scoring-strings', name: 'Nashville Scoring Strings', description: 'Nashville-style scoring strings', category: 'strings', isPremium: true },
  { id: 'quatre', slug: 'quatre', name: 'Quatre', description: 'String quartet library', category: 'strings', isPremium: true },
  { id: 'viola-da-gamba', slug: 'viola-da-gamba', name: 'Viola Da Gamba', description: 'Historical bowed string instrument', category: 'strings', isPremium: true },
  { id: 'hardanger-fiddle', slug: 'hardanger-fiddle', name: 'Hardanger Fiddle', description: 'Norwegian traditional fiddle', category: 'strings', isPremium: true },
  { id: 'cineharps', slug: 'cineharps', name: 'CineHarps', description: 'Orchestral concert harps', category: 'strings', isPremium: true },
  { id: 'cineharpsichord', slug: 'cineharpsichord', name: 'CineHarpsichord', description: 'Baroque harpsichord', category: 'strings', isPremium: true },
  { id: 'cinelegacy-harp', slug: 'cinelegacy-harp', name: 'CineLegacy: Harp', description: 'Legacy harp collection', category: 'strings', isPremium: true },
  { id: 'dulcimer-and-zither', slug: 'dulcimer-and-zither', name: 'Dulcimer and Zither', description: 'Traditional dulcimer and zither', category: 'strings', isPremium: true },
  
  // Artist Series - Strings
  { id: 'apocalyptica', slug: 'artist-series-apocalyptica', name: 'Artist Series: Apocalyptica - Dark Cellos', description: 'Dark cello sounds from Apocalyptica', category: 'strings', isPremium: true },
  { id: 'taylor-davis', slug: 'taylor-davis-violin', name: 'Artist Series: Taylor Davis - Violin', description: 'Expressive violin by Taylor Davis', category: 'strings', isPremium: true },
  { id: 'tina-guo-acoustic', slug: 'tina-guo-acoustic-cello-legato', name: 'Artist Series: Tina Guo - Acoustic Cello', description: 'Acoustic cello by Tina Guo', category: 'strings', isPremium: true },
  { id: 'tina-guo-electric', slug: 'tina-guo-electric-cello', name: 'Artist Series: Tina Guo - Electric Cello', description: 'Electric cello by Tina Guo', category: 'strings', isPremium: true },
  { id: 'tina-guo-solo', slug: 'tina-guo-solo-cello', name: 'Artist Series: Tina Guo - Solo Cello', description: 'Solo cello performances by Tina Guo', category: 'strings', isPremium: true },
  
  // Brass
  { id: 'cinebrass-core', slug: 'cine-brass-core', name: 'CineBrass - Core', description: 'Essential orchestral brass', category: 'brass', isPremium: true },
  { id: 'cinebrass-pro', slug: 'cinebrass-pro', name: 'CineBrass - Pro', description: 'Professional orchestral brass', category: 'brass', isPremium: true },
  { id: 'cinebrass-sonore', slug: 'cinebrass-sonore', name: 'CineBrass - Sonore', description: 'Rich sonorous brass tones', category: 'brass', isPremium: true },
  { id: 'cinebrass-deep-horns', slug: 'cinebrass-deep-horns', name: 'CineBrass - Deep Horns', description: 'Deep horn section', category: 'brass', isPremium: true },
  { id: 'cinebrass-descant-horn', slug: 'cinebrass-descant-horn', name: 'CineBrass - Descant Horn', description: 'High descant horn', category: 'brass', isPremium: true },
  { id: 'cinebrass-low-brass', slug: 'cinebrass-low-brass', name: 'CineBrass - Low Brass', description: 'Low brass section', category: 'brass', isPremium: true },
  { id: 'hyperion-brass-core', slug: 'hyperion-brass-core', name: 'Hyperion Brass Core', description: 'Modern orchestral brass', category: 'brass', isPremium: true },
  { id: 'hyperion-brass-pro', slug: 'hyperion-brass-pro', name: 'Hyperion Brass Pro', description: 'Extended Hyperion brass', category: 'brass', isPremium: true },
  { id: 'industry-brass-core', slug: 'industry-brass-core', name: 'Industry Brass - Core', description: 'Core brass for modern scores', category: 'brass', isPremium: true },
  { id: 'industry-brass-pro', slug: 'industry-brass-pro', name: 'Industry Brass - Pro', description: 'Professional industry brass', category: 'brass', isPremium: true },
  
  // Woodwinds
  { id: 'cinewinds-core', slug: 'cinewinds-core', name: 'CineWinds - Core', description: 'Essential orchestral woodwinds', category: 'woodwinds', isPremium: true },
  { id: 'cinewinds-pro', slug: 'cinewinds-pro', name: 'CineWinds - Pro', description: 'Professional orchestral woodwinds', category: 'woodwinds', isPremium: true },
  { id: 'cinewinds-low-winds', slug: 'cinewinds-low-winds', name: 'CineWinds - Low Winds', description: 'Low woodwind section', category: 'woodwinds', isPremium: true },
  { id: 'hollywoodwinds', slug: 'hollywoodwinds', name: 'Hollywoodwinds', description: 'Hollywood-style woodwinds', category: 'woodwinds', isPremium: true },
  { id: 'gina-luciani', slug: 'gina-luciani-cinema-flutes', name: 'Artist Series: Gina Luciani - Cinema Flutes', description: 'Cinematic flutes by Gina Luciani', category: 'woodwinds', isPremium: true },
  
  // Percussion
  { id: 'cineperc-orchestral', slug: 'cineperc-orchestral', name: 'CinePerc - Orchestral', description: 'Orchestral percussion', category: 'percussion', isPremium: true },
  { id: 'cineperc-epic', slug: 'cineperc-epic', name: 'CinePerc - Epic', description: 'Epic cinematic percussion', category: 'percussion', isPremium: true },
  { id: 'cineperc-aux', slug: 'cineperc-aux', name: 'CinePerc - Aux', description: 'Auxiliary percussion', category: 'percussion', isPremium: true },
  { id: 'cineperc-metal', slug: 'cineperc-metal', name: 'CinePerc - Metal', description: 'Metal percussion instruments', category: 'percussion', isPremium: true },
  { id: 'cineperc-wood', slug: 'cineperc-wood', name: 'CinePerc - Wood', description: 'Wood percussion instruments', category: 'percussion', isPremium: true },
  { id: 'cineperc-tonal', slug: 'cineperc-tonal', name: 'CinePerc - Tonal', description: 'Tonal percussion', category: 'percussion', isPremium: true },
  { id: 'cineperc-world', slug: 'cineperc-world', name: 'CinePerc - World', description: 'World percussion', category: 'percussion', isPremium: true },
  { id: 'cineperc-drum-kit', slug: 'cineperc-drum-kit', name: 'CinePerc - Drum Kit', description: 'Cinematic drum kit', category: 'percussion', isPremium: true },
  { id: 'drums-of-war-1', slug: 'drums-of-war-1', name: 'Drums of War 1', description: 'Epic war drums', category: 'percussion', isPremium: true },
  { id: 'drums-of-war-2', slug: 'drums-of-war-2', name: 'Drums of War 2', description: 'More epic war drums', category: 'percussion', isPremium: true },
  { id: 'drums-of-war-3', slug: 'drums-of-war-3', name: 'Drums of War 3', description: 'Ultimate war drums', category: 'percussion', isPremium: true },
  { id: 'apocalypse-percussion', slug: 'apocalypse-percussion-ensemble', name: 'Apocalypse Percussion Ensemble', description: 'Massive epic percussion', category: 'percussion', isPremium: true },
  { id: 'la-modern-percussion', slug: 'la-modern-percussion', name: 'LA Modern Percussion', description: 'Modern percussion from LA', category: 'percussion', isPremium: true },
  { id: 'true-strike', slug: 'true-strike', name: 'True Strike', description: 'Cinematic percussion hits', category: 'percussion', isPremium: true },
  { id: 'sunset-drums', slug: 'sunset-drums', name: 'Sunset Drums', description: 'Warm sunset drum sounds', category: 'percussion', isPremium: true },
  { id: 'drums-in-blue', slug: 'drums-in-blue', name: 'Drums in Blue', description: 'Jazz-influenced drums', category: 'percussion', isPremium: true },
  { id: 'village-drums', slug: 'village-drums', name: 'Village Drums', description: 'Organic village drums', category: 'percussion', isPremium: false },
  { id: 'village-mallets', slug: 'village-mallets', name: 'Village Mallets', description: 'Organic mallet instruments', category: 'percussion', isPremium: true },
  { id: 'african-marimba', slug: 'african-marimba', name: 'African Marimba', description: 'Traditional African marimba', category: 'percussion', isPremium: true },
  { id: 'handbells', slug: 'handbells', name: 'Handbells', description: 'Concert handbells', category: 'percussion', isPremium: true },
  
  // Vintage Drum Machines
  { id: 'tr808', slug: 'drum-machine-tr808', name: 'Vintage Drum Machine: TR-808', description: 'Classic Roland TR-808', category: 'percussion', isPremium: true },
  { id: 'tr909', slug: 'drum-machine-tr909', name: 'Vintage Drum Machine: TR-909', description: 'Classic Roland TR-909', category: 'percussion', isPremium: true },
  { id: 'tr707', slug: 'drum-machine-tr707', name: 'Vintage Drum Machine: TR-707', description: 'Roland TR-707', category: 'percussion', isPremium: true },
  { id: 'tr606', slug: 'drum-machine-tr606', name: 'Vintage Drum Machine: TR-606', description: 'Roland TR-606', category: 'percussion', isPremium: true },
  { id: 'cr78', slug: 'drum-machine-cr78', name: 'Vintage Drum Machine: CR-78', description: 'Roland CR-78', category: 'percussion', isPremium: true },
  { id: 'cr8000', slug: 'drum-machine-cr8000', name: 'Vintage Drum Machine: CR-8000', description: 'Roland CR-8000', category: 'percussion', isPremium: true },
  { id: 'linndrum', slug: 'drum-machine-linndrum', name: 'Vintage Drum Machine: LinnDrum', description: 'Classic LinnDrum', category: 'percussion', isPremium: true },
  { id: 'dmx', slug: 'drum-machine-dmx', name: 'Vintage Drum Machine: DMX', description: 'Oberheim DMX', category: 'percussion', isPremium: true },
  { id: 'sk1', slug: 'drum-machine-sk1', name: 'Vintage Drum Machine: SK-1', description: 'Casio SK-1', category: 'percussion', isPremium: true },
  
  // Keyboards
  { id: 'cinepiano', slug: 'cine-piano', name: 'CinePiano', description: 'Cinematic piano', category: 'keyboards', isPremium: true },
  { id: 'session-piano-grand', slug: 'session-piano-grand', name: 'Session Piano - Grand', description: 'Grand piano for sessions', category: 'keyboards', isPremium: true },
  { id: 'session-piano-upright', slug: 'session-piano-upright', name: 'Session Piano - Upright', description: 'Upright piano for sessions', category: 'keyboards', isPremium: true },
  { id: 'emotional-piano', slug: 'emotional-piano', name: 'Emotional Piano', description: 'Emotionally expressive piano', category: 'keyboards', isPremium: true },
  { id: 'piano-in-blue', slug: 'piano-in-blue', name: 'Piano in Blue', description: 'Jazz-influenced piano', category: 'keyboards', isPremium: true },
  { id: 'accent-pianos', slug: 'accent-pianos', name: 'Create Series: Accent Pianos', description: 'Character pianos', category: 'keyboards', isPremium: true },
  { id: 'forbes-pipe-organ', slug: 'forbes-pipe-organ', name: 'Forbes Pipe Organ', description: 'Classic pipe organ', category: 'keyboards', isPremium: true },
  { id: 'keyboard-in-blue', slug: 'keyboard-in-blue', name: 'Keyboard In Blue', description: 'Jazz keyboards', category: 'keyboards', isPremium: true },
  { id: 'rhodes-73-ep', slug: 'rhodes-73-ep', name: 'Rhodes 73 EP', description: 'Classic Rhodes electric piano', category: 'keyboards', isPremium: true },
  { id: 'wurlitzer', slug: 'wurlitzer', name: 'Wurly', description: 'Wurlitzer electric piano', category: 'keyboards', isPremium: true },
  { id: 'randy-kerber-celeste', slug: 'randy-kerber-celeste', name: 'Artist Series: Randy Kerber - Celeste', description: 'Magical celeste by Randy Kerber', category: 'keyboards', isPremium: true },
  { id: 'randy-kerber-prepared', slug: 'randy-kerber-prepared-piano', name: 'Artist Series: Randy Kerber - Prepared Piano', description: 'Prepared piano by Randy Kerber', category: 'keyboards', isPremium: true },
  { id: 'mister-rogers-celeste', slug: 'mister-rogers-celeste', name: "Mister Rogers' Celeste", description: "The actual celeste from Mister Rogers' Neighborhood", category: 'keyboards', isPremium: true },
  
  // Synths
  { id: 'scoring-synths', slug: 'scoring-synths', name: 'Scoring Synths', description: 'Synths for film scoring', category: 'synths', isPremium: true },
  { id: 'vision-synths', slug: 'vision-modern-synths', name: 'Vision - Modern Synths', description: 'Modern synthesizer sounds', category: 'synths', isPremium: true },
  { id: 'tb303', slug: 'tb303', name: 'Vintage Synth Bass: TB-303', description: 'Classic Roland TB-303', category: 'synths', isPremium: true },
  { id: 'prophet-5', slug: 'prophet-5', name: 'Vintage Synthesizer: Prophet 5', description: 'Sequential Circuits Prophet 5', category: 'synths', isPremium: false },
  { id: 'jupiter-6', slug: 'jupiter-6', name: 'Vintage Synthesizer: Jupiter 6', description: 'Roland Jupiter 6', category: 'synths', isPremium: true },
  { id: 'obxa', slug: 'obxa', name: 'Vintage Synthesizer: OBXa', description: 'Oberheim OB-Xa', category: 'synths', isPremium: true },
  { id: 'oberheim-4', slug: 'oberheim', name: 'Vintage Synthesizer: Oberheim 4', description: 'Oberheim 4-voice', category: 'synths', isPremium: true },
  { id: 'mono-poly', slug: 'mono-poly', name: 'Vintage Synthesizer: Mono-Poly', description: 'Korg Mono/Poly', category: 'synths', isPremium: true },
  { id: 'arp-quadra', slug: 'arp-quadra', name: 'Vintage Synthesizer: Arp Quadra', description: 'ARP Quadra', category: 'synths', isPremium: true },
  { id: 'ppg-wave-2', slug: 'ppg-wave-2', name: 'Vintage Synthesizer: PPG Wave 2', description: 'PPG Wave 2', category: 'synths', isPremium: true },
  { id: 'rhodes-chroma', slug: 'rhodes-chroma', name: 'Vintage Synthesizer: Rhodes Chroma', description: 'Rhodes Chroma', category: 'synths', isPremium: true },
  { id: 'synergy', slug: 'synergy', name: 'Vintage Synthesizer: Synergy', description: 'Digital Keyboards Synergy', category: 'synths', isPremium: true },
  { id: 'octave-cat', slug: 'octave-cat', name: 'Vintage Synthesizer: Octave Cat', description: 'Octave Cat synthesizer', category: 'synths', isPremium: true },
  
  // Vocals
  { id: 'voxos', slug: 'voxos', name: 'Voxos', description: 'Epic choir and vocals', category: 'vocals', isPremium: true },
  { id: 'voces8', slug: 'voces8', name: 'Artist Series: Voces8', description: 'Voces8 vocal ensemble', category: 'vocals', isPremium: true },
  { id: 'south-african-full', slug: 'south-african-voices-group', name: 'South African Voices: Full Choir', description: 'Full South African choir', category: 'vocals', isPremium: true },
  { id: 'south-african-female', slug: 'south-african-voices-female', name: 'South African Voices: Female Choir', description: 'Female South African choir', category: 'vocals', isPremium: true },
  { id: 'south-african-male', slug: 'south-african-voices-male', name: 'South African Voices: Male Choir', description: 'Male South African choir', category: 'vocals', isPremium: true },
  { id: 'nordic-men', slug: 'men-of-the-north-nordic-voices', name: 'Nordic Voices - Men of the North', description: 'Nordic male voices', category: 'vocals', isPremium: true },
  { id: 'nordic-women', slug: 'women-of-the-north', name: 'Nordic Voices - Women of the North', description: 'Nordic female voices', category: 'vocals', isPremium: true },
  
  // World
  { id: 'world-iceland', slug: 'world-series-iceland', name: 'World Series: Iceland', description: 'Icelandic instruments', category: 'world', isPremium: true },
  { id: 'world-ireland', slug: 'world-series-ireland', name: 'World Series: Ireland', description: 'Irish instruments', category: 'world', isPremium: true },
  { id: 'world-scotland', slug: 'world-series-scotland', name: 'World Series: Scotland', description: 'Scottish instruments', category: 'world', isPremium: true },
  { id: 'world-africa', slug: 'world-series-africa', name: 'World Series: South Africa', description: 'South African instruments', category: 'world', isPremium: true },
  
  // Guitars & Bass
  { id: 'studio-guitars', slug: 'studio-guitars', name: 'Studio Guitars', description: 'Studio guitar collection', category: 'guitars', isPremium: true },
  { id: 'studio-banjo', slug: 'studio-banjo', name: 'Studio Banjo', description: 'Studio banjo', category: 'guitars', isPremium: true },
  { id: 'studio-basses', slug: 'studio-basses', name: 'Studio Basses', description: 'Studio bass collection', category: 'bass', isPremium: true },
  
  // Orchestral / Full Orchestra
  { id: 'cinesymphony', slug: 'cinesymphony', name: 'CineSymphony', description: 'Full orchestral ensemble', category: 'orchestral', isPremium: true },
  { id: 'orchestral-chords', slug: 'orchestral-chords', name: 'Orchestral Chords', description: 'Pre-recorded orchestral chords', category: 'orchestral', isPremium: true },
  
  // FX & Other
  { id: 'collision', slug: 'collision-impact-designer', name: 'Collision Impact Designer', description: 'Impact sound design', category: 'fx', isPremium: true },
  { id: 'soundscapes', slug: 'soundscapes', name: 'Soundscapes', description: 'Ambient soundscapes', category: 'fx', isPremium: true },
  { id: 'ancient-bones', slug: 'ancient-bones', name: 'Ancient Bones', description: 'Bone-based instruments', category: 'other', isPremium: true },
  { id: 'colors', slug: 'colors', name: 'Colors', description: 'Colorful instrument collection', category: 'other', isPremium: true },
  { id: 'sketchpad', slug: 'sketchpad-monochrome', name: 'Sketchpad: Monochrome', description: 'Sketching instruments', category: 'other', isPremium: true },
  { id: 'sew-what', slug: 'sew-what', name: 'Sew What', description: 'Unique textural sounds', category: 'other', isPremium: true },
  
  // Create Series
  { id: 'kalimba', slug: 'create-series-kalimba', name: 'Create Series: Kalimba', description: 'Thumb piano', category: 'world', isPremium: false },
  { id: 'toy-xylo', slug: 'create-series-toy-xylo', name: 'Create Series: Toy Xylo', description: 'Toy xylophone', category: 'percussion', isPremium: false },
  { id: 'tongue-drum', slug: 'tongue-drum', name: 'Create Series: Tongue Drum', description: 'Steel tongue drum', category: 'percussion', isPremium: true },
  { id: 'tonal-tickies', slug: 'tonal-tickles', name: 'Create Series: Tonal Tickies', description: 'Playful tonal sounds', category: 'percussion', isPremium: true },
  { id: 'twisted-psaltry', slug: 'twisted-psaltry-cinematic-fx', name: 'Create Series: Twisted Psaltry - Cinematic FX', description: 'Cinematic psaltry effects', category: 'fx', isPremium: true },
];

// Add imageUrl and instrumentCount to collections
export const collections: Collection[] = collectionsData.map(c => ({
  ...c,
  imageUrl: collectionImages[c.slug] || null,
  instrumentCount: Math.floor(Math.random() * 30) + 5, // Placeholder count
}));

// Generate instruments from collections with appropriate metadata
export const instruments: Instrument[] = collections.map(collection => {
  // Determine moods based on collection name/category
  const moods: Mood[] = [];
  const genres: Genre[] = ['cinematic'];
  const roles: Role[] = [];
  const tags: string[] = [];
  
  const nameLower = collection.name.toLowerCase();
  
  // Mood assignment based on collection characteristics
  if (nameLower.includes('epic') || nameLower.includes('war') || nameLower.includes('apocalypse')) {
    moods.push('epic', 'aggressive', 'triumphant');
  }
  if (nameLower.includes('emotional') || nameLower.includes('solo')) {
    moods.push('intimate', 'melancholic');
  }
  if (nameLower.includes('vintage') || nameLower.includes('rhodes') || nameLower.includes('wurl')) {
    moods.push('nostalgic', 'dreamy');
    genres.push('jazz', 'r&b');
  }
  if (nameLower.includes('dark') || nameLower.includes('ancient')) {
    moods.push('dark', 'mysterious');
  }
  if (nameLower.includes('world') || nameLower.includes('african') || nameLower.includes('iceland') || nameLower.includes('ireland') || nameLower.includes('scotland')) {
    genres.push('world', 'folk');
    moods.push('peaceful', 'mysterious');
  }
  if (collection.category === 'synths') {
    genres.push('electronic', 'pop');
    moods.push('energetic', 'dreamy');
  }
  if (collection.category === 'percussion') {
    roles.push('percussion', 'rhythm');
    moods.push('energetic');
  }
  if (collection.category === 'brass') {
    roles.push('lead', 'harmony');
    moods.push('epic', 'triumphant');
  }
  if (collection.category === 'strings') {
    roles.push('lead', 'harmony', 'texture');
    moods.push('melancholic', 'epic');
  }
  if (collection.category === 'woodwinds') {
    roles.push('lead', 'texture');
    moods.push('peaceful', 'playful');
  }
  if (collection.category === 'keyboards') {
    roles.push('lead', 'harmony');
    genres.push('classical', 'jazz');
  }
  if (collection.category === 'vocals') {
    roles.push('lead', 'texture');
    moods.push('epic', 'mysterious');
  }
  if (collection.category === 'bass') {
    roles.push('bass');
  }
  if (collection.category === 'guitars') {
    roles.push('rhythm', 'lead');
    genres.push('folk', 'rock');
  }
  
  // Default moods if none assigned
  if (moods.length === 0) {
    moods.push('peaceful', 'bright');
  }
  
  // Default roles if none assigned
  if (roles.length === 0) {
    roles.push('texture');
  }
  
  // Tags from name
  tags.push(collection.category);
  if (nameLower.includes('pro')) tags.push('professional');
  if (nameLower.includes('core')) tags.push('essential');
  if (nameLower.includes('vintage')) tags.push('vintage', 'classic');
  if (nameLower.includes('artist')) tags.push('artist series');
  
  return {
    id: collection.id,
    name: collection.name,
    collection: collection.name,
    collectionSlug: collection.slug,
    category: collection.category,
    moods: [...new Set(moods)],
    genres: [...new Set(genres)],
    roles: [...new Set(roles)],
    isPremium: collection.isPremium,
    description: collection.description,
    tags: [...new Set(tags)],
    color: getCategoryColor(collection.category),
    imageUrl: collectionImages[collection.slug] || null,
  };
});

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
  const lowerQuery = query.toLowerCase();
  return instruments.filter(i => 
    i.name.toLowerCase().includes(lowerQuery) ||
    i.description.toLowerCase().includes(lowerQuery) ||
    i.tags.some(t => t.toLowerCase().includes(lowerQuery)) ||
    i.category.toLowerCase().includes(lowerQuery)
  );
}

export function getFreeInstruments(): Instrument[] {
  return instruments.filter(i => !i.isPremium);
}

// Stats
export const catalogStats = {
  totalInstruments: instruments.length,
  totalCollections: collections.length,
  freeInstruments: instruments.filter(i => !i.isPremium).length,
  premiumInstruments: instruments.filter(i => i.isPremium).length,
  categories: [...new Set(instruments.map(i => i.category))].length,
};
