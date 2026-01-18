// Detailed Musio Instruments Database
// Individual instruments within each collection

import { collectionImages } from './collection-images';

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

// DETAILED INSTRUMENTS - Individual instruments within each collection
const instrumentsData: Omit<Instrument, 'color' | 'imageUrl'>[] = [
  // ============================================
  // CINESTRINGS CORE
  // ============================================
  { id: 'cinestrings-core-violins', name: 'CineStrings Core - Violins', collection: 'CineStrings Core', collectionSlug: 'cinestrings-core', category: 'strings', moods: ['epic', 'bright', 'triumphant'], genres: ['cinematic', 'classical'], roles: ['lead', 'harmony'], isPremium: true, description: 'Lush orchestral violin section', tags: ['orchestral', 'strings', 'violins', 'legato'] },
  { id: 'cinestrings-core-violas', name: 'CineStrings Core - Violas', collection: 'CineStrings Core', collectionSlug: 'cinestrings-core', category: 'strings', moods: ['intimate', 'melancholic', 'dark'], genres: ['cinematic', 'classical'], roles: ['harmony', 'texture'], isPremium: true, description: 'Rich viola section for mid-range warmth', tags: ['orchestral', 'strings', 'violas'] },
  { id: 'cinestrings-core-cellos', name: 'CineStrings Core - Cellos', collection: 'CineStrings Core', collectionSlug: 'cinestrings-core', category: 'strings', moods: ['epic', 'dark', 'melancholic'], genres: ['cinematic', 'classical'], roles: ['lead', 'harmony', 'bass'], isPremium: true, description: 'Powerful cello section', tags: ['orchestral', 'strings', 'cellos', 'emotional'] },
  { id: 'cinestrings-core-basses', name: 'CineStrings Core - Basses', collection: 'CineStrings Core', collectionSlug: 'cinestrings-core', category: 'strings', moods: ['dark', 'tense', 'epic'], genres: ['cinematic', 'classical'], roles: ['bass'], isPremium: true, description: 'Deep orchestral bass section', tags: ['orchestral', 'strings', 'basses', 'low'] },
  
  // ============================================
  // CINESTRINGS SOLO
  // ============================================
  { id: 'cinestrings-solo-violin', name: 'CineStrings Solo - Violin', collection: 'CineStrings Solo', collectionSlug: 'cinestrings-solo', category: 'strings', moods: ['intimate', 'melancholic', 'bright'], genres: ['cinematic', 'classical'], roles: ['lead'], isPremium: true, description: 'Expressive solo violin', tags: ['solo', 'violin', 'emotional', 'legato'] },
  { id: 'cinestrings-solo-viola', name: 'CineStrings Solo - Viola', collection: 'CineStrings Solo', collectionSlug: 'cinestrings-solo', category: 'strings', moods: ['intimate', 'dark', 'mysterious'], genres: ['cinematic', 'classical'], roles: ['lead', 'harmony'], isPremium: true, description: 'Expressive solo viola', tags: ['solo', 'viola', 'emotional'] },
  { id: 'cinestrings-solo-cello', name: 'CineStrings Solo - Cello', collection: 'CineStrings Solo', collectionSlug: 'cinestrings-solo', category: 'strings', moods: ['intimate', 'melancholic', 'epic'], genres: ['cinematic', 'classical'], roles: ['lead'], isPremium: true, description: 'Expressive solo cello', tags: ['solo', 'cello', 'emotional', 'legato'] },
  { id: 'cinestrings-solo-bass', name: 'CineStrings Solo - Bass', collection: 'CineStrings Solo', collectionSlug: 'cinestrings-solo', category: 'strings', moods: ['dark', 'mysterious', 'tense'], genres: ['cinematic', 'classical', 'jazz'], roles: ['bass'], isPremium: true, description: 'Expressive solo double bass', tags: ['solo', 'bass', 'low'] },

  // ============================================
  // HYPERION STRINGS
  // ============================================
  { id: 'hyperion-strings-violins-1', name: 'Hyperion Strings - Violins I', collection: 'Hyperion Strings Core', collectionSlug: 'hyperion-strings-core', category: 'strings', moods: ['epic', 'bright', 'triumphant'], genres: ['cinematic', 'classical'], roles: ['lead'], isPremium: true, description: 'First violin section', tags: ['orchestral', 'strings', 'violins'] },
  { id: 'hyperion-strings-violins-2', name: 'Hyperion Strings - Violins II', collection: 'Hyperion Strings Core', collectionSlug: 'hyperion-strings-core', category: 'strings', moods: ['epic', 'bright'], genres: ['cinematic', 'classical'], roles: ['harmony'], isPremium: true, description: 'Second violin section', tags: ['orchestral', 'strings', 'violins'] },
  { id: 'hyperion-strings-violas', name: 'Hyperion Strings - Violas', collection: 'Hyperion Strings Core', collectionSlug: 'hyperion-strings-core', category: 'strings', moods: ['intimate', 'dark', 'melancholic'], genres: ['cinematic', 'classical'], roles: ['harmony', 'texture'], isPremium: true, description: 'Viola section', tags: ['orchestral', 'strings', 'violas'] },
  { id: 'hyperion-strings-cellos', name: 'Hyperion Strings - Cellos', collection: 'Hyperion Strings Core', collectionSlug: 'hyperion-strings-core', category: 'strings', moods: ['epic', 'melancholic', 'dark'], genres: ['cinematic', 'classical'], roles: ['lead', 'harmony'], isPremium: true, description: 'Cello section', tags: ['orchestral', 'strings', 'cellos'] },
  { id: 'hyperion-strings-basses', name: 'Hyperion Strings - Basses', collection: 'Hyperion Strings Core', collectionSlug: 'hyperion-strings-core', category: 'strings', moods: ['dark', 'tense', 'epic'], genres: ['cinematic', 'classical'], roles: ['bass'], isPremium: true, description: 'Bass section', tags: ['orchestral', 'strings', 'basses'] },

  // ============================================
  // CINEBRASS CORE
  // ============================================
  { id: 'cinebrass-core-french-horns', name: 'CineBrass Core - French Horns', collection: 'CineBrass Core', collectionSlug: 'cine-brass-core', category: 'brass', moods: ['epic', 'triumphant', 'mysterious'], genres: ['cinematic', 'classical'], roles: ['lead', 'harmony'], isPremium: true, description: 'Majestic French horn section', tags: ['orchestral', 'brass', 'horns', 'epic'] },
  { id: 'cinebrass-core-trumpets', name: 'CineBrass Core - Trumpets', collection: 'CineBrass Core', collectionSlug: 'cine-brass-core', category: 'brass', moods: ['bright', 'triumphant', 'energetic'], genres: ['cinematic', 'classical', 'jazz'], roles: ['lead', 'accent'], isPremium: true, description: 'Powerful trumpet section', tags: ['orchestral', 'brass', 'trumpets', 'fanfare'] },
  { id: 'cinebrass-core-trombones', name: 'CineBrass Core - Trombones', collection: 'CineBrass Core', collectionSlug: 'cine-brass-core', category: 'brass', moods: ['epic', 'dark', 'aggressive'], genres: ['cinematic', 'classical', 'jazz'], roles: ['harmony', 'bass'], isPremium: true, description: 'Rich trombone section', tags: ['orchestral', 'brass', 'trombones'] },
  { id: 'cinebrass-core-tuba', name: 'CineBrass Core - Tuba', collection: 'CineBrass Core', collectionSlug: 'cine-brass-core', category: 'brass', moods: ['dark', 'epic', 'tense'], genres: ['cinematic', 'classical'], roles: ['bass'], isPremium: true, description: 'Deep tuba foundation', tags: ['orchestral', 'brass', 'tuba', 'low'] },

  // ============================================
  // HYPERION BRASS
  // ============================================
  { id: 'hyperion-brass-horns', name: 'Hyperion Brass - Horns', collection: 'Hyperion Brass Core', collectionSlug: 'hyperion-brass-core', category: 'brass', moods: ['epic', 'triumphant', 'bright'], genres: ['cinematic', 'classical'], roles: ['lead', 'harmony'], isPremium: true, description: 'Modern horn section', tags: ['orchestral', 'brass', 'horns'] },
  { id: 'hyperion-brass-trumpets', name: 'Hyperion Brass - Trumpets', collection: 'Hyperion Brass Core', collectionSlug: 'hyperion-brass-core', category: 'brass', moods: ['bright', 'triumphant', 'energetic'], genres: ['cinematic', 'classical'], roles: ['lead', 'accent'], isPremium: true, description: 'Modern trumpet section', tags: ['orchestral', 'brass', 'trumpets'] },
  { id: 'hyperion-brass-trombones', name: 'Hyperion Brass - Trombones', collection: 'Hyperion Brass Core', collectionSlug: 'hyperion-brass-core', category: 'brass', moods: ['epic', 'dark', 'aggressive'], genres: ['cinematic', 'classical'], roles: ['harmony'], isPremium: true, description: 'Modern trombone section', tags: ['orchestral', 'brass', 'trombones'] },
  { id: 'hyperion-brass-tuba', name: 'Hyperion Brass - Tuba', collection: 'Hyperion Brass Core', collectionSlug: 'hyperion-brass-core', category: 'brass', moods: ['dark', 'epic'], genres: ['cinematic', 'classical'], roles: ['bass'], isPremium: true, description: 'Modern tuba', tags: ['orchestral', 'brass', 'tuba'] },

  // ============================================
  // CINEWINDS CORE
  // ============================================
  { id: 'cinewinds-core-flutes', name: 'CineWinds Core - Flutes', collection: 'CineWinds Core', collectionSlug: 'cinewinds-core', category: 'woodwinds', moods: ['bright', 'peaceful', 'playful'], genres: ['cinematic', 'classical'], roles: ['lead', 'texture'], isPremium: true, description: 'Orchestral flute section', tags: ['orchestral', 'woodwinds', 'flutes'] },
  { id: 'cinewinds-core-oboes', name: 'CineWinds Core - Oboes', collection: 'CineWinds Core', collectionSlug: 'cinewinds-core', category: 'woodwinds', moods: ['melancholic', 'intimate', 'nostalgic'], genres: ['cinematic', 'classical'], roles: ['lead', 'harmony'], isPremium: true, description: 'Expressive oboe section', tags: ['orchestral', 'woodwinds', 'oboes', 'emotional'] },
  { id: 'cinewinds-core-clarinets', name: 'CineWinds Core - Clarinets', collection: 'CineWinds Core', collectionSlug: 'cinewinds-core', category: 'woodwinds', moods: ['mysterious', 'playful', 'dark'], genres: ['cinematic', 'classical', 'jazz'], roles: ['lead', 'harmony'], isPremium: true, description: 'Versatile clarinet section', tags: ['orchestral', 'woodwinds', 'clarinets'] },
  { id: 'cinewinds-core-bassoons', name: 'CineWinds Core - Bassoons', collection: 'CineWinds Core', collectionSlug: 'cinewinds-core', category: 'woodwinds', moods: ['dark', 'mysterious', 'playful'], genres: ['cinematic', 'classical'], roles: ['bass', 'harmony'], isPremium: true, description: 'Rich bassoon section', tags: ['orchestral', 'woodwinds', 'bassoons'] },

  // ============================================
  // CINEWINDS LOW WINDS
  // ============================================
  { id: 'cinewinds-bass-flute', name: 'CineWinds Low - Bass Flute', collection: 'CineWinds Low Winds', collectionSlug: 'cinewinds-low-winds', category: 'woodwinds', moods: ['mysterious', 'dark', 'dreamy'], genres: ['cinematic', 'ambient'], roles: ['texture', 'bass'], isPremium: true, description: 'Deep bass flute', tags: ['woodwinds', 'flute', 'low'] },
  { id: 'cinewinds-contrabassoon', name: 'CineWinds Low - Contrabassoon', collection: 'CineWinds Low Winds', collectionSlug: 'cinewinds-low-winds', category: 'woodwinds', moods: ['dark', 'tense', 'mysterious'], genres: ['cinematic', 'classical'], roles: ['bass'], isPremium: true, description: 'Deep contrabassoon', tags: ['woodwinds', 'bassoon', 'low'] },
  { id: 'cinewinds-bass-clarinet', name: 'CineWinds Low - Bass Clarinet', collection: 'CineWinds Low Winds', collectionSlug: 'cinewinds-low-winds', category: 'woodwinds', moods: ['dark', 'mysterious', 'tense'], genres: ['cinematic', 'jazz'], roles: ['bass', 'texture'], isPremium: true, description: 'Deep bass clarinet', tags: ['woodwinds', 'clarinet', 'low'] },

  // ============================================
  // CINEPERC ORCHESTRAL
  // ============================================
  { id: 'cineperc-timpani', name: 'CinePerc - Timpani', collection: 'CinePerc Orchestral', collectionSlug: 'cineperc-orchestral', category: 'percussion', moods: ['epic', 'tense', 'triumphant'], genres: ['cinematic', 'classical'], roles: ['percussion', 'accent'], isPremium: true, description: 'Orchestral timpani', tags: ['orchestral', 'percussion', 'timpani', 'drums'] },
  { id: 'cineperc-snare', name: 'CinePerc - Snare Drum', collection: 'CinePerc Orchestral', collectionSlug: 'cineperc-orchestral', category: 'percussion', moods: ['energetic', 'tense', 'aggressive'], genres: ['cinematic', 'classical'], roles: ['percussion', 'rhythm'], isPremium: true, description: 'Concert snare drum', tags: ['orchestral', 'percussion', 'snare'] },
  { id: 'cineperc-bass-drum', name: 'CinePerc - Bass Drum', collection: 'CinePerc Orchestral', collectionSlug: 'cineperc-orchestral', category: 'percussion', moods: ['epic', 'dark', 'tense'], genres: ['cinematic', 'classical'], roles: ['percussion', 'bass'], isPremium: true, description: 'Concert bass drum', tags: ['orchestral', 'percussion', 'bass drum'] },
  { id: 'cineperc-cymbals', name: 'CinePerc - Cymbals', collection: 'CinePerc Orchestral', collectionSlug: 'cineperc-orchestral', category: 'percussion', moods: ['epic', 'triumphant', 'bright'], genres: ['cinematic', 'classical'], roles: ['percussion', 'accent'], isPremium: true, description: 'Orchestral cymbals', tags: ['orchestral', 'percussion', 'cymbals'] },

  // ============================================
  // CINEPERC EPIC
  // ============================================
  { id: 'cineperc-epic-taikos', name: 'CinePerc Epic - Taiko Drums', collection: 'CinePerc Epic', collectionSlug: 'cineperc-epic', category: 'percussion', moods: ['epic', 'aggressive', 'energetic'], genres: ['cinematic'], roles: ['percussion', 'rhythm'], isPremium: true, description: 'Massive taiko drums', tags: ['epic', 'percussion', 'taiko', 'asian'] },
  { id: 'cineperc-epic-ensemble', name: 'CinePerc Epic - Ensemble Hits', collection: 'CinePerc Epic', collectionSlug: 'cineperc-epic', category: 'percussion', moods: ['epic', 'triumphant', 'aggressive'], genres: ['cinematic'], roles: ['percussion', 'accent'], isPremium: true, description: 'Massive percussion ensemble', tags: ['epic', 'percussion', 'hits'] },
  
  // ============================================
  // DRUMS OF WAR
  // ============================================
  { id: 'dow1-war-drums', name: 'Drums of War - War Drums', collection: 'Drums of War 1', collectionSlug: 'drums-of-war-1', category: 'percussion', moods: ['epic', 'aggressive', 'dark'], genres: ['cinematic'], roles: ['percussion', 'rhythm'], isPremium: true, description: 'Massive war drums', tags: ['epic', 'percussion', 'war', 'drums'] },
  { id: 'dow1-battle-hits', name: 'Drums of War - Battle Hits', collection: 'Drums of War 1', collectionSlug: 'drums-of-war-1', category: 'percussion', moods: ['epic', 'aggressive', 'tense'], genres: ['cinematic'], roles: ['percussion', 'accent'], isPremium: true, description: 'Powerful battle impacts', tags: ['epic', 'percussion', 'impacts'] },
  { id: 'dow2-taikos', name: 'Drums of War II - Taikos', collection: 'Drums of War 2', collectionSlug: 'drums-of-war-2', category: 'percussion', moods: ['epic', 'aggressive', 'energetic'], genres: ['cinematic'], roles: ['percussion', 'rhythm'], isPremium: true, description: 'Extended taiko collection', tags: ['epic', 'percussion', 'taiko'] },
  { id: 'dow3-hybrid', name: 'Drums of War III - Hybrid', collection: 'Drums of War 3', collectionSlug: 'drums-of-war-3', category: 'percussion', moods: ['epic', 'aggressive', 'tense'], genres: ['cinematic', 'electronic'], roles: ['percussion', 'rhythm'], isPremium: true, description: 'Hybrid epic percussion', tags: ['epic', 'percussion', 'hybrid'] },

  // ============================================
  // PIANOS
  // ============================================
  { id: 'cinepiano-concert-grand', name: 'CinePiano - Concert Grand', collection: 'CinePiano', collectionSlug: 'cine-piano', category: 'keyboards', moods: ['intimate', 'bright', 'melancholic'], genres: ['cinematic', 'classical', 'pop'], roles: ['lead', 'harmony'], isPremium: true, description: 'Concert grand piano', tags: ['piano', 'grand', 'concert'] },
  { id: 'session-piano-steinway', name: 'Session Piano Grand - Steinway', collection: 'Session Piano Grand', collectionSlug: 'session-piano-grand', category: 'keyboards', moods: ['intimate', 'bright', 'peaceful'], genres: ['cinematic', 'classical', 'jazz', 'pop'], roles: ['lead', 'harmony'], isPremium: true, description: 'Steinway grand piano', tags: ['piano', 'grand', 'steinway'] },
  { id: 'session-piano-upright-1', name: 'Session Piano Upright', collection: 'Session Piano Upright', collectionSlug: 'session-piano-upright', category: 'keyboards', moods: ['intimate', 'nostalgic', 'playful'], genres: ['pop', 'folk', 'indie'], roles: ['lead', 'harmony', 'rhythm'], isPremium: true, description: 'Character upright piano', tags: ['piano', 'upright', 'character'] },
  { id: 'emotional-piano-main', name: 'Emotional Piano', collection: 'Emotional Piano', collectionSlug: 'emotional-piano', category: 'keyboards', moods: ['melancholic', 'intimate', 'peaceful'], genres: ['cinematic', 'ambient'], roles: ['lead', 'texture'], isPremium: true, description: 'Emotionally expressive piano', tags: ['piano', 'emotional', 'intimate'] },
  { id: 'piano-in-blue-jazz', name: 'Piano in Blue', collection: 'Piano in Blue', collectionSlug: 'piano-in-blue', category: 'keyboards', moods: ['intimate', 'melancholic', 'dreamy'], genres: ['jazz', 'cinematic'], roles: ['lead', 'harmony'], isPremium: true, description: 'Jazz-influenced piano', tags: ['piano', 'jazz', 'blue'] },

  // ============================================
  // VINTAGE SYNTHS
  // ============================================
  { id: 'prophet-5-pad', name: 'Prophet 5 - Pads', collection: 'Vintage Synth: Prophet 5', collectionSlug: 'prophet-5', category: 'synths', moods: ['dreamy', 'nostalgic', 'peaceful'], genres: ['electronic', 'ambient', 'pop'], roles: ['texture', 'harmony'], isPremium: false, description: 'Classic Prophet 5 pads', tags: ['synth', 'vintage', 'analog', 'pads'] },
  { id: 'prophet-5-lead', name: 'Prophet 5 - Lead', collection: 'Vintage Synth: Prophet 5', collectionSlug: 'prophet-5', category: 'synths', moods: ['energetic', 'bright', 'nostalgic'], genres: ['electronic', 'pop', 'rock'], roles: ['lead'], isPremium: false, description: 'Classic Prophet 5 leads', tags: ['synth', 'vintage', 'analog', 'lead'] },
  { id: 'jupiter-6-pad', name: 'Jupiter 6 - Pads', collection: 'Vintage Synth: Jupiter 6', collectionSlug: 'jupiter-6', category: 'synths', moods: ['dreamy', 'bright', 'peaceful'], genres: ['electronic', 'pop', 'ambient'], roles: ['texture', 'harmony'], isPremium: true, description: 'Roland Jupiter 6 pads', tags: ['synth', 'vintage', 'analog', 'roland'] },
  { id: 'jupiter-6-bass', name: 'Jupiter 6 - Bass', collection: 'Vintage Synth: Jupiter 6', collectionSlug: 'jupiter-6', category: 'synths', moods: ['energetic', 'dark'], genres: ['electronic', 'pop'], roles: ['bass'], isPremium: true, description: 'Roland Jupiter 6 bass', tags: ['synth', 'vintage', 'analog', 'bass'] },
  { id: 'obxa-brass', name: 'OBXa - Brass', collection: 'Vintage Synth: OBXa', collectionSlug: 'obxa', category: 'synths', moods: ['bright', 'energetic', 'nostalgic'], genres: ['electronic', 'pop', 'rock'], roles: ['lead', 'harmony'], isPremium: true, description: 'Oberheim OBXa brass', tags: ['synth', 'vintage', 'analog', 'brass'] },
  { id: 'obxa-strings', name: 'OBXa - Strings', collection: 'Vintage Synth: OBXa', collectionSlug: 'obxa', category: 'synths', moods: ['dreamy', 'nostalgic', 'peaceful'], genres: ['electronic', 'pop', 'ambient'], roles: ['texture', 'harmony'], isPremium: true, description: 'Oberheim OBXa strings', tags: ['synth', 'vintage', 'analog', 'strings'] },
  
  // ============================================
  // DRUM MACHINES
  // ============================================
  { id: 'tr808-kit', name: 'TR-808 - Full Kit', collection: 'Vintage Drum Machine: TR-808', collectionSlug: 'drum-machine-tr808', category: 'percussion', moods: ['energetic', 'dark', 'aggressive'], genres: ['electronic', 'hip-hop', 'pop'], roles: ['percussion', 'rhythm'], isPremium: true, description: 'Classic TR-808 drum kit', tags: ['drums', 'electronic', '808', 'vintage'] },
  { id: 'tr909-kit', name: 'TR-909 - Full Kit', collection: 'Vintage Drum Machine: TR-909', collectionSlug: 'drum-machine-tr909', category: 'percussion', moods: ['energetic', 'aggressive'], genres: ['electronic', 'pop'], roles: ['percussion', 'rhythm'], isPremium: true, description: 'Classic TR-909 drum kit', tags: ['drums', 'electronic', '909', 'vintage'] },
  { id: 'tr606-kit', name: 'TR-606', collection: 'Vintage Drum Machine: TR-606', collectionSlug: 'drum-machine-tr606', category: 'percussion', moods: ['energetic', 'playful', 'nostalgic'], genres: ['electronic', 'pop'], roles: ['percussion', 'rhythm'], isPremium: true, description: 'Classic Roland TR-606', tags: ['drums', 'electronic', '606', 'vintage'] },
  { id: 'cr78-kit', name: 'CR-78', collection: 'Vintage Drum Machine: CR-78', collectionSlug: 'drum-machine-cr78', category: 'percussion', moods: ['nostalgic', 'playful', 'dreamy'], genres: ['electronic', 'pop', 'rock'], roles: ['percussion', 'rhythm'], isPremium: true, description: 'Classic Roland CR-78', tags: ['drums', 'electronic', 'cr78', 'vintage'] },
  { id: 'cr8000-kit', name: 'CR-8000', collection: 'Vintage Drum Machine: CR-8000', collectionSlug: 'drum-machine-cr8000', category: 'percussion', moods: ['energetic', 'nostalgic'], genres: ['electronic', 'pop'], roles: ['percussion', 'rhythm'], isPremium: true, description: 'Roland CR-8000', tags: ['drums', 'electronic', 'cr8000', 'vintage'] },
  { id: 'dmx-kit', name: 'DMX', collection: 'Vintage Drum Machine: DMX', collectionSlug: 'drum-machine-dmx', category: 'percussion', moods: ['energetic', 'nostalgic', 'aggressive'], genres: ['electronic', 'hip-hop', 'pop'], roles: ['percussion', 'rhythm'], isPremium: true, description: 'Oberheim DMX', tags: ['drums', 'electronic', 'dmx', 'vintage'] },
  { id: 'sk1-kit', name: 'SK-1', collection: 'Vintage Drum Machine: SK-1', collectionSlug: 'drum-machine-sk1', category: 'percussion', moods: ['playful', 'nostalgic', 'dreamy'], genres: ['electronic', 'experimental'], roles: ['percussion', 'rhythm'], isPremium: true, description: 'Casio SK-1', tags: ['drums', 'electronic', 'sk1', 'vintage', 'lo-fi'] },
  { id: 'linndrum-kit', name: 'LinnDrum - Full Kit', collection: 'Vintage Drum Machine: LinnDrum', collectionSlug: 'drum-machine-linndrum', category: 'percussion', moods: ['nostalgic', 'playful', 'energetic'], genres: ['electronic', 'pop', 'rock'], roles: ['percussion', 'rhythm'], isPremium: true, description: 'Classic LinnDrum kit', tags: ['drums', 'electronic', 'linn', 'vintage'] },
  
  // ============================================
  // VOCALS
  // ============================================
  { id: 'voxos-epic-choir', name: 'Voxos - Epic Choir', collection: 'Voxos', collectionSlug: 'voxos', category: 'vocals', moods: ['epic', 'triumphant', 'dark'], genres: ['cinematic', 'classical'], roles: ['texture', 'harmony'], isPremium: true, description: 'Epic choir for cinematic scoring', tags: ['choir', 'vocals', 'epic'] },
  { id: 'voxos-whispers', name: 'Voxos - Whispers', collection: 'Voxos', collectionSlug: 'voxos', category: 'vocals', moods: ['mysterious', 'tense', 'dark'], genres: ['cinematic', 'ambient'], roles: ['texture'], isPremium: true, description: 'Atmospheric whispered vocals', tags: ['choir', 'vocals', 'whisper', 'texture'] },
  { id: 'voces8-ensemble', name: 'Voces8 - Ensemble', collection: 'Voces8', collectionSlug: 'voces8', category: 'vocals', moods: ['peaceful', 'intimate', 'bright'], genres: ['classical', 'cinematic'], roles: ['lead', 'harmony'], isPremium: true, description: 'World-renowned vocal ensemble', tags: ['choir', 'vocals', 'ensemble', 'classical'] },
  { id: 'sa-voices-full', name: 'South African Choir', collection: 'South African Voices', collectionSlug: 'south-african-voices-group', category: 'vocals', moods: ['epic', 'energetic', 'bright'], genres: ['world', 'cinematic'], roles: ['texture', 'lead'], isPremium: true, description: 'The voices of South Africa', tags: ['choir', 'vocals', 'african', 'world'] },
  { id: 'sa-voices-female', name: 'South African Female Choir', collection: 'South African Voices', collectionSlug: 'south-african-voices-female', category: 'vocals', moods: ['bright', 'energetic', 'intimate'], genres: ['world', 'cinematic'], roles: ['texture', 'lead'], isPremium: true, description: 'The voices of South Africa', tags: ['choir', 'vocals', 'african', 'world', 'female'] },
  { id: 'sa-voices-male', name: 'South African Male Choir', collection: 'South African Voices', collectionSlug: 'south-african-voices-male', category: 'vocals', moods: ['epic', 'dark', 'energetic'], genres: ['world', 'cinematic'], roles: ['texture', 'harmony'], isPremium: true, description: 'The voices of South Africa', tags: ['choir', 'vocals', 'african', 'world', 'male'] },
  { id: 'nordic-men-choir', name: 'Nordic Voices - Men', collection: 'Men of the North', collectionSlug: 'men-of-the-north-nordic-voices', category: 'vocals', moods: ['dark', 'epic', 'mysterious'], genres: ['world', 'cinematic'], roles: ['texture', 'harmony'], isPremium: true, description: 'Nordic male choir', tags: ['choir', 'vocals', 'nordic', 'men'] },
  { id: 'nordic-women-choir', name: 'Nordic Voices - Women', collection: 'Women of the North', collectionSlug: 'women-of-the-north', category: 'vocals', moods: ['dreamy', 'peaceful', 'mysterious'], genres: ['world', 'cinematic', 'ambient'], roles: ['texture', 'lead'], isPremium: true, description: 'Nordic female choir', tags: ['choir', 'vocals', 'nordic', 'women'] },

  // ============================================
  // WORLD INSTRUMENTS
  // ============================================
  { id: 'iceland-strings', name: 'Iceland - String Textures', collection: 'World Series: Iceland', collectionSlug: 'world-series-iceland', category: 'world', moods: ['dreamy', 'peaceful', 'mysterious'], genres: ['world', 'ambient', 'cinematic'], roles: ['texture'], isPremium: true, description: 'Icelandic string textures', tags: ['world', 'iceland', 'strings', 'ambient'] },
  { id: 'iceland-vocals', name: 'Iceland - Vocal Textures', collection: 'World Series: Iceland', collectionSlug: 'world-series-iceland', category: 'world', moods: ['dreamy', 'mysterious', 'peaceful'], genres: ['world', 'ambient'], roles: ['texture'], isPremium: true, description: 'Icelandic vocal textures', tags: ['world', 'iceland', 'vocals'] },
  { id: 'ireland-fiddle', name: 'Ireland - Fiddle', collection: 'World Series: Ireland', collectionSlug: 'world-series-ireland', category: 'world', moods: ['energetic', 'playful', 'nostalgic'], genres: ['world', 'folk'], roles: ['lead'], isPremium: true, description: 'Traditional Irish fiddle', tags: ['world', 'ireland', 'fiddle', 'celtic'] },
  { id: 'ireland-whistle', name: 'Ireland - Tin Whistle', collection: 'World Series: Ireland', collectionSlug: 'world-series-ireland', category: 'world', moods: ['bright', 'playful', 'nostalgic'], genres: ['world', 'folk'], roles: ['lead'], isPremium: true, description: 'Traditional Irish tin whistle', tags: ['world', 'ireland', 'whistle', 'celtic'] },
  { id: 'ireland-pipes', name: 'Ireland - Uilleann Pipes', collection: 'World Series: Ireland', collectionSlug: 'world-series-ireland', category: 'world', moods: ['melancholic', 'epic', 'nostalgic'], genres: ['world', 'folk', 'cinematic'], roles: ['lead'], isPremium: true, description: 'Traditional Irish pipes', tags: ['world', 'ireland', 'pipes', 'celtic'] },
  { id: 'scotland-bagpipes', name: 'Scotland - Bagpipes', collection: 'World Series: Scotland', collectionSlug: 'world-series-scotland', category: 'world', moods: ['epic', 'triumphant', 'melancholic'], genres: ['world', 'folk', 'cinematic'], roles: ['lead'], isPremium: true, description: 'Scottish highland bagpipes', tags: ['world', 'scotland', 'bagpipes'] },
  { id: 'africa-percussion', name: 'Africa - Percussion Ensemble', collection: 'World Series: South Africa', collectionSlug: 'world-series-africa', category: 'world', moods: ['energetic', 'playful', 'bright'], genres: ['world', 'cinematic'], roles: ['percussion', 'rhythm'], isPremium: true, description: 'South African percussion', tags: ['world', 'africa', 'percussion'] },

  // ============================================
  // HARPS
  // ============================================
  { id: 'cinelegacy-harp', name: 'CineLegacy: Harp', collection: 'CineLegacy: Harp', collectionSlug: 'cinelegacy-harp', category: 'strings', moods: ['peaceful', 'dreamy', 'nostalgic'], genres: ['cinematic', 'classical'], roles: ['lead', 'texture'], isPremium: true, description: 'The beginning of Cinesamples', tags: ['harp', 'orchestral', 'legacy', 'cinesamples'] },
  { id: 'cineharps-concert', name: 'CineHarps - Concert Harp', collection: 'CineHarps', collectionSlug: 'cineharps', category: 'strings', moods: ['peaceful', 'dreamy', 'bright'], genres: ['cinematic', 'classical'], roles: ['lead', 'texture'], isPremium: true, description: 'Orchestral concert harp', tags: ['harp', 'orchestral', 'classical'] },
  { id: 'cineharps-glissandos', name: 'CineHarps - Glissandos', collection: 'CineHarps', collectionSlug: 'cineharps', category: 'strings', moods: ['dreamy', 'playful', 'bright'], genres: ['cinematic', 'classical'], roles: ['texture', 'accent'], isPremium: true, description: 'Harp glissando collection', tags: ['harp', 'glissando', 'orchestral'] },

  // ============================================
  // GUITARS & BASS
  // ============================================
  { id: 'studio-guitars-acoustic', name: 'Studio Guitars - Acoustic', collection: 'Studio Guitars', collectionSlug: 'studio-guitars', category: 'guitars', moods: ['intimate', 'peaceful', 'nostalgic'], genres: ['folk', 'pop', 'indie'], roles: ['lead', 'rhythm'], isPremium: true, description: 'Studio acoustic guitar', tags: ['guitar', 'acoustic', 'studio'] },
  { id: 'studio-guitars-electric', name: 'Studio Guitars - Electric', collection: 'Studio Guitars', collectionSlug: 'studio-guitars', category: 'guitars', moods: ['energetic', 'aggressive', 'bright'], genres: ['rock', 'pop', 'indie'], roles: ['lead', 'rhythm'], isPremium: true, description: 'Studio electric guitar', tags: ['guitar', 'electric', 'studio'] },
  { id: 'studio-basses-electric', name: 'Studio Basses - Electric', collection: 'Studio Basses', collectionSlug: 'studio-basses', category: 'bass', moods: ['energetic', 'dark'], genres: ['rock', 'pop', 'jazz'], roles: ['bass'], isPremium: true, description: 'Studio electric bass', tags: ['bass', 'electric', 'studio'] },
  { id: 'studio-basses-upright', name: 'Studio Basses - Upright', collection: 'Studio Basses', collectionSlug: 'studio-basses', category: 'bass', moods: ['intimate', 'dark', 'nostalgic'], genres: ['jazz', 'folk', 'classical'], roles: ['bass'], isPremium: true, description: 'Studio upright bass', tags: ['bass', 'upright', 'acoustic'] },

  // ============================================
  // ARTIST SERIES
  // ============================================
  { id: 'tina-guo-cello-legato', name: 'Tina Guo - Acoustic Cello Legato', collection: 'Tina Guo Acoustic Cello', collectionSlug: 'tina-guo-acoustic-cello-legato', category: 'strings', moods: ['epic', 'melancholic', 'intimate'], genres: ['cinematic', 'classical'], roles: ['lead'], isPremium: true, description: 'Expressive cello legato by Tina Guo', tags: ['cello', 'solo', 'legato', 'artist'] },
  { id: 'tina-guo-electric', name: 'Tina Guo - Electric Cello', collection: 'Tina Guo Electric Cello', collectionSlug: 'tina-guo-electric-cello', category: 'strings', moods: ['aggressive', 'energetic', 'dark'], genres: ['cinematic', 'rock', 'electronic'], roles: ['lead'], isPremium: true, description: 'Electric cello by Tina Guo', tags: ['cello', 'electric', 'artist'] },
  { id: 'taylor-davis-violin-main', name: 'Taylor Davis - Violin', collection: 'Taylor Davis Violin', collectionSlug: 'taylor-davis-violin', category: 'strings', moods: ['bright', 'energetic', 'epic'], genres: ['cinematic', 'pop', 'rock'], roles: ['lead'], isPremium: true, description: 'Expressive violin by Taylor Davis', tags: ['violin', 'solo', 'artist'] },
  { id: 'apocalyptica-dark-cellos', name: 'Apocalyptica - Dark Cellos', collection: 'Apocalyptica Dark Cellos', collectionSlug: 'artist-series-apocalyptica', category: 'strings', moods: ['dark', 'aggressive', 'epic'], genres: ['cinematic', 'rock'], roles: ['lead', 'texture'], isPremium: true, description: 'Dark cello sounds from Apocalyptica', tags: ['cello', 'dark', 'rock', 'artist'] },
  { id: 'gina-luciani-flute', name: 'Gina Luciani - Cinema Flutes', collection: 'Gina Luciani Cinema Flutes', collectionSlug: 'gina-luciani-cinema-flutes', category: 'woodwinds', moods: ['peaceful', 'intimate', 'dreamy'], genres: ['cinematic', 'classical'], roles: ['lead'], isPremium: true, description: 'Cinematic flutes by Gina Luciani', tags: ['flute', 'solo', 'cinematic', 'artist'] },

  // ============================================
  // KEYBOARD SPECIALS
  // ============================================
  { id: 'rhodes-73', name: 'Rhodes 73 EP', collection: 'Rhodes 73 EP', collectionSlug: 'rhodes-73-ep', category: 'keyboards', moods: ['nostalgic', 'intimate', 'peaceful'], genres: ['jazz', 'pop', 'r&b'], roles: ['lead', 'harmony'], isPremium: true, description: 'Classic Rhodes electric piano', tags: ['rhodes', 'electric piano', 'vintage'] },
  { id: 'wurlitzer-ep', name: 'Wurlitzer EP', collection: 'Wurlitzer', collectionSlug: 'wurlitzer', category: 'keyboards', moods: ['nostalgic', 'playful', 'bright'], genres: ['pop', 'rock', 'r&b'], roles: ['lead', 'rhythm'], isPremium: true, description: 'Classic Wurlitzer electric piano', tags: ['wurlitzer', 'electric piano', 'vintage'] },
  { id: 'mister-rogers-celeste-main', name: "Mister Rogers' Celeste", collection: "Mister Rogers' Celeste", collectionSlug: 'mister-rogers-celeste', category: 'keyboards', moods: ['peaceful', 'nostalgic', 'dreamy'], genres: ['cinematic'], roles: ['lead', 'texture'], isPremium: true, description: "Timeless, Nostalgic Celeste", tags: ['celeste', 'nostalgic', 'unique', 'mister rogers'] },
  { id: 'forbes-organ', name: 'Forbes Pipe Organ', collection: 'Forbes Pipe Organ', collectionSlug: 'forbes-pipe-organ', category: 'keyboards', moods: ['epic', 'dark', 'triumphant'], genres: ['classical', 'cinematic'], roles: ['lead', 'texture', 'bass'], isPremium: true, description: 'Majestic pipe organ', tags: ['organ', 'pipe', 'church'] },

  // ============================================
  // FX & TEXTURES  
  // ============================================
  { id: 'soundscapes-pads', name: 'Soundscapes - Ambient Pads', collection: 'Soundscapes', collectionSlug: 'soundscapes', category: 'fx', moods: ['dreamy', 'peaceful', 'mysterious'], genres: ['ambient', 'cinematic'], roles: ['texture'], isPremium: true, description: 'Atmospheric ambient pads', tags: ['ambient', 'pads', 'texture'] },
  { id: 'soundscapes-drones', name: 'Soundscapes - Drones', collection: 'Soundscapes', collectionSlug: 'soundscapes', category: 'fx', moods: ['dark', 'tense', 'mysterious'], genres: ['ambient', 'cinematic'], roles: ['texture'], isPremium: true, description: 'Atmospheric drones', tags: ['ambient', 'drones', 'texture'] },
  { id: 'collision-impacts', name: 'Collision - Impacts', collection: 'Collision Impact Designer', collectionSlug: 'collision-impact-designer', category: 'fx', moods: ['epic', 'tense', 'aggressive'], genres: ['cinematic'], roles: ['accent', 'percussion'], isPremium: true, description: 'Cinematic impact sounds', tags: ['impacts', 'hits', 'cinematic'] },
  { id: 'collision-risers', name: 'Collision - Risers', collection: 'Collision Impact Designer', collectionSlug: 'collision-impact-designer', category: 'fx', moods: ['tense', 'energetic'], genres: ['cinematic', 'electronic'], roles: ['texture', 'accent'], isPremium: true, description: 'Cinematic riser sounds', tags: ['risers', 'tension', 'cinematic'] },
  { id: 'twisted-psaltry', name: 'Twisted Psaltry', collection: 'Twisted Psaltry', collectionSlug: 'twisted-psaltry-cinematic-fx', category: 'fx', moods: ['mysterious', 'dark', 'tense'], genres: ['cinematic', 'ambient'], roles: ['texture', 'accent'], isPremium: true, description: 'Eerie bowed Psaltry', tags: ['psaltry', 'eerie', 'bowed', 'cinematic'] },
  { id: 'ancient-bones', name: 'Ancient Bones', collection: 'Ancient Bones', collectionSlug: 'ancient-bones', category: 'woodwinds', moods: ['mysterious', 'dark', 'peaceful'], genres: ['world', 'cinematic', 'ambient'], roles: ['lead', 'texture'], isPremium: true, description: 'Woodwinds', tags: ['bones', 'ancient', 'woodwinds', 'unique'] },

  // ============================================
  // CREATE SERIES - UNIQUE INSTRUMENTS
  // ============================================
  { id: 'create-toy-xylo', name: 'Create Series: Toy Xylo', collection: 'Create Series: Toy Xylo', collectionSlug: 'create-series-toy-xylo', category: 'percussion', moods: ['playful', 'bright', 'nostalgic'], genres: ['cinematic', 'pop'], roles: ['lead', 'accent'], isPremium: true, description: 'Toy Xylophone', tags: ['xylophone', 'toy', 'playful', 'create'] },
  { id: 'create-kalimba', name: 'Kalimba', collection: 'Create Series: Kalimba', collectionSlug: 'create-series-kalimba', category: 'percussion', moods: ['peaceful', 'intimate', 'dreamy'], genres: ['world', 'ambient', 'folk'], roles: ['lead', 'texture'], isPremium: true, description: 'A beautiful, timeless sound', tags: ['kalimba', 'thumb piano', 'african', 'create'] },
  { id: 'tongue-drum', name: 'Tongue Drum', collection: 'Tongue Drum', collectionSlug: 'tongue-drum', category: 'percussion', moods: ['peaceful', 'dreamy', 'mysterious'], genres: ['ambient', 'world', 'cinematic'], roles: ['lead', 'texture'], isPremium: true, description: 'Percussive and resonant modal hand drum', tags: ['tongue drum', 'steel', 'meditation', 'resonant'] },
  { id: 'tonal-tickles', name: 'Tonal Tickles', collection: 'Tonal Tickles', collectionSlug: 'tonal-tickles', category: 'percussion', moods: ['playful', 'bright', 'peaceful'], genres: ['cinematic', 'ambient'], roles: ['texture', 'accent'], isPremium: true, description: 'Rhythmic pitched-percussion tones', tags: ['tonal', 'pitched', 'percussion', 'create'] },
  { id: 'accent-pianos', name: 'Accent Pianos', collection: 'Create Series: Accent Pianos', collectionSlug: 'accent-pianos', category: 'keyboards', moods: ['energetic', 'bright', 'aggressive'], genres: ['pop', 'rock', 'cinematic'], roles: ['lead', 'rhythm'], isPremium: true, description: 'Two powerful and punchy grand pianos', tags: ['piano', 'punchy', 'accent', 'powerful'] },
];

// Build full instruments with computed fields
export const instruments: Instrument[] = instrumentsData.map(inst => ({
  ...inst,
  color: getCategoryColor(inst.category),
  imageUrl: collectionImages[inst.collectionSlug] || null,
}));

// Helper functions
export function getInstrumentsByCategory(category: InstrumentCategory): Instrument[] {
  return instruments.filter(i => i.category === category);
}

export function getInstrumentsByCollection(collectionSlug: string): Instrument[] {
  return instruments.filter(i => i.collectionSlug === collectionSlug);
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
  totalInstruments: instruments.length,
  categories: [...new Set(instruments.map(i => i.category))].length,
  collections: [...new Set(instruments.map(i => i.collectionSlug))].length,
};

console.log(`Loaded ${instruments.length} individual instruments from ${catalogStats.collections} collections`);
