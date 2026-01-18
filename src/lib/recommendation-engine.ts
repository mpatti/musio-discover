// Musio Recommendation Engine
// Intelligent instrument combination suggestions

import { 
  Instrument, 
  instruments, 
  Mood, 
  Genre, 
  Role,
  InstrumentCategory,
  getInstrumentsByMood,
  getInstrumentsByGenre,
  getInstrumentsByRole
} from '@/data/all-instruments';

export interface ComboRequest {
  description?: string;
  moods: Mood[];
  genres: Genre[];
  ensembleSize: number;
  preferredCategories?: InstrumentCategory[];
  excludeCategories?: InstrumentCategory[];
  includePremium?: boolean;
}

export interface InstrumentWithRole extends Instrument {
  assignedRole: Role;
  matchScore: number;
  reason: string;
}

export interface Combo {
  id: string;
  name: string;
  description: string;
  instruments: InstrumentWithRole[];
  totalScore: number;
  tags: string[];
  moods: Mood[];
  genres: Genre[];
  generatedBy?: 'claude' | 'local';
}

// Role templates for different ensemble sizes (9-16 instruments)
const roleTemplates: Record<number, Role[]> = {
  9: ['lead', 'lead', 'harmony', 'harmony', 'bass', 'rhythm', 'rhythm', 'texture', 'accent'],
  10: ['lead', 'lead', 'harmony', 'harmony', 'harmony', 'bass', 'rhythm', 'rhythm', 'texture', 'accent'],
  11: ['lead', 'lead', 'harmony', 'harmony', 'harmony', 'bass', 'rhythm', 'rhythm', 'texture', 'texture', 'accent'],
  12: ['lead', 'lead', 'harmony', 'harmony', 'harmony', 'harmony', 'bass', 'rhythm', 'rhythm', 'texture', 'texture', 'accent'],
  13: ['lead', 'lead', 'lead', 'harmony', 'harmony', 'harmony', 'harmony', 'bass', 'rhythm', 'rhythm', 'texture', 'texture', 'accent'],
  14: ['lead', 'lead', 'lead', 'harmony', 'harmony', 'harmony', 'harmony', 'bass', 'rhythm', 'rhythm', 'percussion', 'texture', 'texture', 'accent'],
  15: ['lead', 'lead', 'lead', 'harmony', 'harmony', 'harmony', 'harmony', 'bass', 'bass', 'rhythm', 'rhythm', 'percussion', 'texture', 'texture', 'accent'],
  16: ['lead', 'lead', 'lead', 'harmony', 'harmony', 'harmony', 'harmony', 'harmony', 'bass', 'bass', 'rhythm', 'rhythm', 'percussion', 'texture', 'texture', 'accent'],
};

// Mood compatibility matrix (moods that work well together)
const moodCompatibility: Record<Mood, Mood[]> = {
  epic: ['triumphant', 'dark', 'aggressive', 'tense'],
  intimate: ['melancholic', 'peaceful', 'nostalgic', 'dreamy'],
  dark: ['mysterious', 'tense', 'epic', 'melancholic'],
  bright: ['playful', 'energetic', 'triumphant', 'peaceful'],
  mysterious: ['dark', 'tense', 'dreamy', 'intimate'],
  energetic: ['aggressive', 'playful', 'bright', 'triumphant'],
  melancholic: ['intimate', 'dark', 'nostalgic', 'peaceful'],
  triumphant: ['epic', 'bright', 'energetic', 'aggressive'],
  tense: ['dark', 'mysterious', 'aggressive', 'epic'],
  peaceful: ['dreamy', 'intimate', 'nostalgic', 'bright'],
  aggressive: ['energetic', 'dark', 'tense', 'epic'],
  dreamy: ['peaceful', 'mysterious', 'intimate', 'nostalgic'],
  nostalgic: ['melancholic', 'peaceful', 'intimate', 'dreamy'],
  playful: ['bright', 'energetic', 'nostalgic', 'peaceful'],
};

// Genre-specific instrument preferences
const genreInstrumentWeights: Record<Genre, Partial<Record<InstrumentCategory, number>>> = {
  cinematic: { orchestral: 2, strings: 2, brass: 2, percussion: 1.5, vocals: 1.5, synths: 1.2 },
  pop: { synths: 1.5, keyboards: 1.5, guitars: 1.3, bass: 1.3, percussion: 1.2 },
  rock: { guitars: 2, bass: 1.5, percussion: 1.5, keyboards: 1.2 },
  electronic: { synths: 2, keyboards: 2, bass: 1.5, percussion: 1.3 },
  jazz: { keyboards: 1.8, brass: 1.5, bass: 1.5, percussion: 1.3, woodwinds: 1.3 },
  classical: { strings: 2, woodwinds: 1.8, brass: 1.5, keyboards: 1.5, percussion: 1.2 },
  ambient: { synths: 2, strings: 1.5, vocals: 1.3, world: 1.3, fx: 1.5 },
  'hip-hop': { synths: 1.8, bass: 2, percussion: 1.5, keyboards: 1.3 },
  folk: { guitars: 2, strings: 1.5, world: 1.5, woodwinds: 1.3, percussion: 1.2 },
  world: { world: 2.5, percussion: 1.5, woodwinds: 1.5, strings: 1.3 },
  'r&b': { keyboards: 1.8, synths: 1.5, bass: 1.5, vocals: 1.3, guitars: 1.2 },
  indie: { guitars: 1.8, keyboards: 1.5, synths: 1.3, strings: 1.3 },
  experimental: { synths: 2, fx: 2, world: 1.5, percussion: 1.3 },
};

// Combo name templates
const comboNameTemplates = {
  epic: ['Epic {0}', 'Cinematic {0}', 'Heroic {0}', 'Grand {0}', 'Majestic {0}'],
  intimate: ['Intimate {0}', 'Gentle {0}', 'Whispered {0}', 'Delicate {0}'],
  dark: ['Dark {0}', 'Shadow {0}', 'Midnight {0}', 'Noir {0}'],
  bright: ['Bright {0}', 'Radiant {0}', 'Luminous {0}', 'Sparkling {0}'],
  mysterious: ['Mysterious {0}', 'Enigmatic {0}', 'Ethereal {0}', 'Arcane {0}'],
  energetic: ['Dynamic {0}', 'Vibrant {0}', 'Electric {0}', 'Pulse {0}'],
  melancholic: ['Melancholic {0}', 'Wistful {0}', 'Bittersweet {0}', 'Yearning {0}'],
  triumphant: ['Triumphant {0}', 'Victorious {0}', 'Glorious {0}', 'Anthem {0}'],
  tense: ['Tension {0}', 'Suspense {0}', 'Edge {0}', 'Razor {0}'],
  peaceful: ['Serene {0}', 'Tranquil {0}', 'Calm {0}', 'Zen {0}'],
  aggressive: ['Aggressive {0}', 'Fierce {0}', 'Savage {0}', 'Brutal {0}'],
  dreamy: ['Dreamy {0}', 'Ethereal {0}', 'Floating {0}', 'Haze {0}'],
  nostalgic: ['Nostalgic {0}', 'Vintage {0}', 'Memory {0}', 'Echo {0}'],
  playful: ['Playful {0}', 'Whimsical {0}', 'Bouncy {0}', 'Joyful {0}'],
};

const ensembleNames = ['Ensemble', 'Palette', 'Suite', 'Collection', 'Arrangement', 'Set'];

// Parse natural language description to extract moods and genres
export function parseDescription(description: string): { moods: Mood[], genres: Genre[] } {
  const lowerDesc = description.toLowerCase();
  
  const moodKeywords: Record<string, Mood> = {
    'epic': 'epic', 'cinematic': 'epic', 'trailer': 'epic', 'massive': 'epic', 'grand': 'epic', 'heroic': 'epic',
    'intimate': 'intimate', 'personal': 'intimate', 'close': 'intimate', 'tender': 'intimate', 'gentle': 'intimate',
    'dark': 'dark', 'evil': 'dark', 'sinister': 'dark', 'gloomy': 'dark', 'shadowy': 'dark', 'ominous': 'dark',
    'bright': 'bright', 'happy': 'bright', 'uplifting': 'bright', 'joyful': 'bright', 'cheerful': 'bright',
    'mysterious': 'mysterious', 'enigmatic': 'mysterious', 'cryptic': 'mysterious', 'strange': 'mysterious',
    'energetic': 'energetic', 'upbeat': 'energetic', 'dynamic': 'energetic', 'lively': 'energetic', 'exciting': 'energetic',
    'sad': 'melancholic', 'melancholic': 'melancholic', 'sorrowful': 'melancholic', 'mournful': 'melancholic', 'emotional': 'melancholic',
    'triumphant': 'triumphant', 'victory': 'triumphant', 'winning': 'triumphant', 'glorious': 'triumphant',
    'tense': 'tense', 'suspense': 'tense', 'thriller': 'tense', 'anxiety': 'tense', 'nervous': 'tense',
    'peaceful': 'peaceful', 'calm': 'peaceful', 'serene': 'peaceful', 'relaxing': 'peaceful', 'tranquil': 'peaceful',
    'aggressive': 'aggressive', 'intense': 'aggressive', 'powerful': 'aggressive', 'fierce': 'aggressive', 'battle': 'aggressive',
    'dreamy': 'dreamy', 'ethereal': 'dreamy', 'floaty': 'dreamy', 'ambient': 'dreamy', 'spacey': 'dreamy',
    'nostalgic': 'nostalgic', 'vintage': 'nostalgic', 'retro': 'nostalgic', 'memory': 'nostalgic',
    'playful': 'playful', 'fun': 'playful', 'whimsical': 'playful', 'quirky': 'playful',
  };
  
  const genreKeywords: Record<string, Genre> = {
    'cinematic': 'cinematic', 'film': 'cinematic', 'movie': 'cinematic', 'trailer': 'cinematic', 'score': 'cinematic', 'orchestral': 'cinematic',
    'pop': 'pop', 'radio': 'pop', 'mainstream': 'pop',
    'rock': 'rock', 'guitar': 'rock', 'band': 'rock',
    'electronic': 'electronic', 'edm': 'electronic', 'synth': 'electronic', 'techno': 'electronic', 'house': 'electronic',
    'jazz': 'jazz', 'swing': 'jazz', 'bebop': 'jazz', 'smooth': 'jazz',
    'classical': 'classical', 'orchestra': 'classical', 'symphony': 'classical', 'chamber': 'classical',
    'ambient': 'ambient', 'atmospheric': 'ambient', 'soundscape': 'ambient', 'texture': 'ambient',
    'hip-hop': 'hip-hop', 'rap': 'hip-hop', 'trap': 'hip-hop', 'beat': 'hip-hop',
    'folk': 'folk', 'acoustic': 'folk', 'traditional': 'folk',
    'world': 'world', 'ethnic': 'world', 'global': 'world', 'cultural': 'world',
    'r&b': 'r&b', 'soul': 'r&b', 'rnb': 'r&b',
    'indie': 'indie', 'alternative': 'indie', 'lo-fi': 'indie',
    'experimental': 'experimental', 'avant-garde': 'experimental', 'weird': 'experimental',
  };
  
  const detectedMoods: Set<Mood> = new Set();
  const detectedGenres: Set<Genre> = new Set();
  
  for (const [keyword, mood] of Object.entries(moodKeywords)) {
    if (lowerDesc.includes(keyword)) {
      detectedMoods.add(mood);
    }
  }
  
  for (const [keyword, genre] of Object.entries(genreKeywords)) {
    if (lowerDesc.includes(keyword)) {
      detectedGenres.add(genre);
    }
  }
  
  return {
    moods: Array.from(detectedMoods),
    genres: Array.from(detectedGenres),
  };
}

// Calculate how well an instrument matches the request
function calculateInstrumentScore(
  instrument: Instrument, 
  request: ComboRequest,
  targetRole: Role
): { score: number; reasons: string[] } {
  let score = 0;
  const reasons: string[] = [];
  
  // Role match (most important)
  if (instrument.roles.includes(targetRole)) {
    score += 30;
    reasons.push(`Good ${targetRole} instrument`);
  } else {
    score -= 10;
  }
  
  // Mood match
  const moodMatches = request.moods.filter(m => instrument.moods.includes(m));
  score += moodMatches.length * 15;
  if (moodMatches.length > 0) {
    reasons.push(`Matches ${moodMatches.join(', ')} mood`);
  }
  
  // Compatible moods
  for (const requestMood of request.moods) {
    const compatibleMoods = moodCompatibility[requestMood] || [];
    const compatibleMatches = compatibleMoods.filter(m => instrument.moods.includes(m));
    score += compatibleMatches.length * 5;
  }
  
  // Genre match
  const genreMatches = request.genres.filter(g => instrument.genres.includes(g));
  score += genreMatches.length * 12;
  if (genreMatches.length > 0) {
    reasons.push(`Great for ${genreMatches.join(', ')}`);
  }
  
  // Genre-specific category boost
  for (const genre of request.genres) {
    const weights = genreInstrumentWeights[genre];
    if (weights && weights[instrument.category]) {
      score *= weights[instrument.category]!;
    }
  }
  
  // Category preference
  if (request.preferredCategories?.includes(instrument.category)) {
    score += 10;
    reasons.push('Preferred category');
  }
  
  // Exclude categories
  if (request.excludeCategories?.includes(instrument.category)) {
    score -= 50;
  }
  
  // Premium filter
  if (!request.includePremium && instrument.isPremium) {
    score -= 20;
  }
  
  // Small diversity bonus for interesting combinations
  score += Math.random() * 5;
  
  return { score: Math.max(0, score), reasons };
}

// Select best instrument for a role
function selectBestInstrumentForRole(
  role: Role,
  request: ComboRequest,
  usedCategories: Set<InstrumentCategory>,
  usedInstruments: Set<string>
): InstrumentWithRole | null {
  const candidates = instruments
    .filter(i => !usedInstruments.has(i.id))
    .map(i => {
      const { score, reasons } = calculateInstrumentScore(i, request, role);
      // Diversity bonus for unused categories
      const diversityBonus = usedCategories.has(i.category) ? 0 : 8;
      return {
        ...i,
        assignedRole: role,
        matchScore: score + diversityBonus,
        reason: reasons[0] || 'Versatile instrument',
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore);
  
  // Add some randomization to top candidates for variety
  const topCandidates = candidates.slice(0, Math.min(5, candidates.length));
  if (topCandidates.length === 0) return null;
  
  const randomIndex = Math.floor(Math.random() * Math.min(3, topCandidates.length));
  return topCandidates[randomIndex];
}

// Generate a single combo
function generateCombo(request: ComboRequest, comboIndex: number): Combo {
  const size = Math.min(Math.max(9, request.ensembleSize), 16);
  const roles = roleTemplates[size] || roleTemplates[12];
  
  const selectedInstruments: InstrumentWithRole[] = [];
  const usedCategories = new Set<InstrumentCategory>();
  const usedInstruments = new Set<string>();
  
  // Select instruments for each role
  for (const role of roles) {
    const selected = selectBestInstrumentForRole(role, request, usedCategories, usedInstruments);
    if (selected) {
      selectedInstruments.push(selected);
      usedCategories.add(selected.category);
      usedInstruments.add(selected.id);
    }
  }
  
  // Generate combo metadata
  const primaryMood = request.moods[0] || 'epic';
  const templates = comboNameTemplates[primaryMood] || comboNameTemplates.epic;
  const nameTemplate = templates[comboIndex % templates.length];
  const ensembleName = ensembleNames[Math.floor(Math.random() * ensembleNames.length)];
  const name = nameTemplate.replace('{0}', ensembleName);
  
  const totalScore = selectedInstruments.reduce((sum, i) => sum + i.matchScore, 0);
  
  // Collect all unique tags
  const allTags = new Set<string>();
  selectedInstruments.forEach(i => i.tags.forEach(t => allTags.add(t)));
  
  // Collect all moods and genres represented
  const allMoods = new Set<Mood>();
  const allGenres = new Set<Genre>();
  selectedInstruments.forEach(i => {
    i.moods.forEach(m => allMoods.add(m));
    i.genres.forEach(g => allGenres.add(g));
  });
  
  // Generate description
  const categoryCount: Record<string, number> = {};
  selectedInstruments.forEach(i => {
    categoryCount[i.category] = (categoryCount[i.category] || 0) + 1;
  });
  const dominantCategories = Object.entries(categoryCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([cat]) => cat);
  
  const description = `A ${request.moods.join(' and ')} ${dominantCategories.join('-')} arrangement featuring ${selectedInstruments.length} instruments perfect for ${request.genres.join(', ')} compositions.`;
  
  return {
    id: `combo-${Date.now()}-${comboIndex}`,
    name,
    description,
    instruments: selectedInstruments,
    totalScore,
    tags: Array.from(allTags).slice(0, 8),
    moods: Array.from(allMoods),
    genres: Array.from(allGenres),
  };
}

// Main recommendation function
export function generateCombos(request: ComboRequest, count: number = 5): Combo[] {
  const combos: Combo[] = [];
  
  // Ensure we have some defaults
  const normalizedRequest: ComboRequest = {
    ...request,
    moods: request.moods.length > 0 ? request.moods : ['epic'],
    genres: request.genres.length > 0 ? request.genres : ['cinematic'],
    ensembleSize: request.ensembleSize || 12,
    includePremium: request.includePremium ?? true,
  };
  
  for (let i = 0; i < count; i++) {
    combos.push(generateCombo(normalizedRequest, i));
  }
  
  // Sort by total score
  return combos.sort((a, b) => b.totalScore - a.totalScore);
}

// Quick recommendation from natural language
export function quickRecommend(description: string, ensembleSize: number = 12): Combo[] {
  const { moods, genres } = parseDescription(description);
  
  return generateCombos({
    description,
    moods: moods.length > 0 ? moods : ['epic'],
    genres: genres.length > 0 ? genres : ['cinematic'],
    ensembleSize,
    includePremium: true,
  }, 5);
}

// Get similar instruments to a given one
export function getSimilarInstruments(instrument: Instrument, count: number = 5): Instrument[] {
  return instruments
    .filter(i => i.id !== instrument.id)
    .map(i => {
      let similarity = 0;
      
      // Same category bonus
      if (i.category === instrument.category) similarity += 20;
      
      // Shared moods
      const sharedMoods = i.moods.filter(m => instrument.moods.includes(m));
      similarity += sharedMoods.length * 10;
      
      // Shared genres
      const sharedGenres = i.genres.filter(g => instrument.genres.includes(g));
      similarity += sharedGenres.length * 8;
      
      // Shared roles
      const sharedRoles = i.roles.filter(r => instrument.roles.includes(r));
      similarity += sharedRoles.length * 5;
      
      // Shared tags
      const sharedTags = i.tags.filter(t => instrument.tags.includes(t));
      similarity += sharedTags.length * 3;
      
      return { instrument: i, similarity };
    })
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, count)
    .map(({ instrument }) => instrument);
}

// Suggest instrument to add to existing selection
export function suggestAddition(
  currentInstruments: Instrument[],
  targetMoods: Mood[],
  targetGenres: Genre[]
): Instrument | null {
  const usedIds = new Set(currentInstruments.map(i => i.id));
  const usedCategories = new Set(currentInstruments.map(i => i.category));
  const usedRoles = new Set(currentInstruments.flatMap(i => i.roles));
  
  // Find roles not well covered
  const allRoles: Role[] = ['lead', 'harmony', 'bass', 'rhythm', 'texture', 'accent'];
  const missingRoles = allRoles.filter(r => !usedRoles.has(r));
  const targetRole = missingRoles[0] || 'texture';
  
  const candidates = instruments
    .filter(i => !usedIds.has(i.id))
    .map(i => {
      let score = 0;
      
      // Role coverage
      if (i.roles.includes(targetRole)) score += 20;
      
      // Mood match
      score += targetMoods.filter(m => i.moods.includes(m)).length * 10;
      
      // Genre match
      score += targetGenres.filter(g => i.genres.includes(g)).length * 8;
      
      // Category diversity bonus
      if (!usedCategories.has(i.category)) score += 15;
      
      return { instrument: i, score };
    })
    .sort((a, b) => b.score - a.score);
  
  return candidates[0]?.instrument || null;
}
