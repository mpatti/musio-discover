// Complete Musio Instrument Catalog
// Auto-generated from catalog.musio.com
// 116 Collections | 3,433+ Instruments

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

// ALL 116 COLLECTIONS FROM MUSIO CATALOG
export const instruments: Instrument[] = [
  {
    "id": "african-marimba",
    "name": "African Marimba",
    "collection": "African Marimba",
    "collectionSlug": "african-marimba",
    "category": "percussion",
    "moods": [
      "energetic"
    ],
    "genres": [
      "cinematic"
    ],
    "roles": [
      "percussion",
      "rhythm"
    ],
    "isPremium": true,
    "description": "African Marimba - Musio instrument collection",
    "tags": [
      "percussion",
      "african",
      "marimba"
    ],
    "color": "#B45A5A",
    "imageUrl": "https://assets.mus.io/77e85bfcc115a41211915c752b5e70d3e2f6069f6d28023613cdbd904a49b2b6.png"
  },
  {
    "id": "ancient-bones",
    "name": "Ancient Bones",
    "collection": "Ancient Bones",
    "collectionSlug": "ancient-bones",
    "category": "fx",
    "moods": [
      "dark",
      "mysterious"
    ],
    "genres": [
      "cinematic"
    ],
    "roles": [
      "texture",
      "accent"
    ],
    "isPremium": true,
    "description": "Ancient Bones - Musio instrument collection",
    "tags": [
      "fx",
      "ancient",
      "bones"
    ],
    "color": "#5A6A8A",
    "imageUrl": "https://assets.mus.io/ff2b6e950ff58c595a2d9291805cf3ac29ab1200ba84ee545a09b5fa8584ff6e.png"
  },
  {
    "id": "apocalypse-percussion-ensemble",
    "name": "Apocalypse Percussion Ensemble",
    "collection": "Apocalypse Percussion Ensemble",
    "collectionSlug": "apocalypse-percussion-ensemble",
    "category": "percussion",
    "moods": [
      "epic",
      "energetic"
    ],
    "genres": [
      "cinematic"
    ],
    "roles": [
      "percussion",
      "rhythm"
    ],
    "isPremium": true,
    "description": "Apocalypse Percussion Ensemble - Musio instrument collection",
    "tags": [
      "percussion",
      "apocalypse",
      "percussion",
      "ensemble"
    ],
    "color": "#B45A5A",
    "imageUrl": "https://assets.mus.io/2e375ccc64217f564c2aae76e0e8b7806bd1d961525a7fe788722461a3908d3b.png"
  },
  {
    "id": "artist-series-apocalyptica",
    "name": "Artist Series: Apocalyptica - Dark Cellos",
    "collection": "Artist Series: Apocalyptica - Dark Cellos",
    "collectionSlug": "artist-series-apocalyptica",
    "category": "strings",
    "moods": [
      "dark",
      "epic",
      "melancholic"
    ],
    "genres": [
      "cinematic",
      "classical"
    ],
    "roles": [
      "lead",
      "harmony",
      "texture"
    ],
    "isPremium": true,
    "description": "Artist Series: Apocalyptica - Dark Cellos - Musio instrument collection",
    "tags": [
      "strings",
      "artist",
      "series",
      "apocalyptica"
    ],
    "color": "#C4785A",
    "imageUrl": "https://assets.mus.io/3cf3ba54401addbb480a1828c1521d31e2743d609c60ca259bf169720c5724c6.png"
  },
  {
    "id": "gina-luciani-cinema-flutes",
    "name": "Artist Series: Gina Luciani - Cinema Flutes",
    "collection": "Artist Series: Gina Luciani - Cinema Flutes",
    "collectionSlug": "gina-luciani-cinema-flutes",
    "category": "woodwinds",
    "moods": [
      "peaceful",
      "intimate"
    ],
    "genres": [
      "cinematic",
      "classical"
    ],
    "roles": [
      "lead",
      "texture"
    ],
    "isPremium": true,
    "description": "Artist Series: Gina Luciani - Cinema Flutes - Musio instrument collection",
    "tags": [
      "woodwinds",
      "gina",
      "luciani",
      "cinema",
      "flutes"
    ],
    "color": "#5A8A7A",
    "imageUrl": "https://assets.mus.io/10f4575e0d896ce4bd71a9b951323bf90ea70a510677507a05e9ec619ad0bbb1.png"
  },
  {
    "id": "randy-kerber-celeste",
    "name": "Artist Series: Randy Kerber - Celeste",
    "collection": "Artist Series: Randy Kerber - Celeste",
    "collectionSlug": "randy-kerber-celeste",
    "category": "keyboards",
    "moods": [
      "intimate",
      "peaceful"
    ],
    "genres": [
      "cinematic"
    ],
    "roles": [
      "lead",
      "harmony"
    ],
    "isPremium": true,
    "description": "Artist Series: Randy Kerber - Celeste - Musio instrument collection",
    "tags": [
      "keyboards",
      "randy",
      "kerber",
      "celeste"
    ],
    "color": "#4A6A9A",
    "imageUrl": "https://assets.mus.io/0c16c49a0c870ab6e7ecfd338b2fd718d9e897c59aa261f9460c8879eb8c7584.png"
  },
  {
    "id": "randy-kerber-prepared-piano",
    "name": "Artist Series: Randy Kerber - Prepared Piano",
    "collection": "Artist Series: Randy Kerber - Prepared Piano",
    "collectionSlug": "randy-kerber-prepared-piano",
    "category": "keyboards",
    "moods": [
      "intimate",
      "peaceful"
    ],
    "genres": [
      "cinematic"
    ],
    "roles": [
      "lead",
      "harmony"
    ],
    "isPremium": true,
    "description": "Artist Series: Randy Kerber - Prepared Piano - Musio instrument collection",
    "tags": [
      "keyboards",
      "randy",
      "kerber",
      "prepared",
      "piano"
    ],
    "color": "#4A6A9A",
    "imageUrl": "https://assets.mus.io/c1fb0fa35f77c7ed10612aefa366211a102a67f38eceb4a9acf760acdf98c07d.png"
  },
  {
    "id": "taylor-davis-violin",
    "name": "Artist Series: Taylor Davis - Violin",
    "collection": "Artist Series: Taylor Davis - Violin",
    "collectionSlug": "taylor-davis-violin",
    "category": "strings",
    "moods": [
      "epic",
      "melancholic"
    ],
    "genres": [
      "cinematic",
      "classical"
    ],
    "roles": [
      "lead",
      "harmony",
      "texture"
    ],
    "isPremium": true,
    "description": "Artist Series: Taylor Davis - Violin - Musio instrument collection",
    "tags": [
      "strings",
      "taylor",
      "davis",
      "violin"
    ],
    "color": "#C4785A",
    "imageUrl": "https://assets.mus.io/2a768ca57374bd2ae6197563a783811aac16e5a120b4c7939215898029cc0b5f.png"
  },
  {
    "id": "tina-guo-acoustic-cello-legato",
    "name": "Artist Series: Tina Guo - Acoustic Cello",
    "collection": "Artist Series: Tina Guo - Acoustic Cello",
    "collectionSlug": "tina-guo-acoustic-cello-legato",
    "category": "strings",
    "moods": [
      "epic",
      "melancholic"
    ],
    "genres": [
      "cinematic",
      "classical"
    ],
    "roles": [
      "lead",
      "harmony",
      "texture"
    ],
    "isPremium": true,
    "description": "Artist Series: Tina Guo - Acoustic Cello - Musio instrument collection",
    "tags": [
      "strings",
      "tina",
      "guo",
      "acoustic",
      "cello",
      "legato"
    ],
    "color": "#C4785A",
    "imageUrl": "https://assets.mus.io/6105393e33c7821e0a98ed6d9521f6cf8449d2abcfadb4da75de7d620d98d30a.png"
  },
  {
    "id": "tina-guo-electric-cello",
    "name": "Artist Series: Tina Guo - Electric Cello",
    "collection": "Artist Series: Tina Guo - Electric Cello",
    "collectionSlug": "tina-guo-electric-cello",
    "category": "strings",
    "moods": [
      "epic",
      "melancholic"
    ],
    "genres": [
      "cinematic",
      "classical"
    ],
    "roles": [
      "lead",
      "harmony",
      "texture"
    ],
    "isPremium": true,
    "description": "Artist Series: Tina Guo - Electric Cello - Musio instrument collection",
    "tags": [
      "strings",
      "tina",
      "guo",
      "electric",
      "cello"
    ],
    "color": "#C4785A",
    "imageUrl": "https://assets.mus.io/e238686257fe005be13cd2f6e2aa71dc1750142b4db2443dd588134a952cabb7.png"
  },
  {
    "id": "tina-guo-solo-cello",
    "name": "Artist Series: Tina Guo - Solo Cello",
    "collection": "Artist Series: Tina Guo - Solo Cello",
    "collectionSlug": "tina-guo-solo-cello",
    "category": "strings",
    "moods": [
      "intimate",
      "epic",
      "melancholic"
    ],
    "genres": [
      "cinematic",
      "classical"
    ],
    "roles": [
      "lead",
      "harmony",
      "texture"
    ],
    "isPremium": true,
    "description": "Artist Series: Tina Guo - Solo Cello - Musio instrument collection",
    "tags": [
      "strings",
      "tina",
      "guo",
      "solo",
      "cello"
    ],
    "color": "#C4785A",
    "imageUrl": "https://assets.mus.io/95e5fb6b6a9ae843c4092bc83d7fe5f70a66dd74125a67382af77fe205927f03.png"
  },
  {
    "id": "voces8",
    "name": "Artist Series: Voces8",
    "collection": "Artist Series: Voces8",
    "collectionSlug": "voces8",
    "category": "vocals",
    "moods": [
      "epic",
      "peaceful"
    ],
    "genres": [
      "cinematic"
    ],
    "roles": [
      "texture",
      "lead"
    ],
    "isPremium": true,
    "description": "Artist Series: Voces8 - Musio instrument collection",
    "tags": [
      "vocals",
      "voces8"
    ],
    "color": "#AA6A7A",
    "imageUrl": "https://assets.mus.io/5e6678b1dfba3a7c56e67c311d19eda0e860a93eb909222cab2165c2afd3c9c5.png"
  },
  {
    "id": "cine-brass-core",
    "name": "CineBrass - Core",
    "collection": "CineBrass - Core",
    "collectionSlug": "cine-brass-core",
    "category": "brass",
    "moods": [
      "triumphant",
      "epic"
    ],
    "genres": [
      "cinematic",
      "classical"
    ],
    "roles": [
      "lead",
      "harmony",
      "accent"
    ],
    "isPremium": true,
    "description": "CineBrass - Core - Musio instrument collection",
    "tags": [
      "brass",
      "cine",
      "brass",
      "core"
    ],
    "color": "#D4A520",
    "imageUrl": "https://assets.mus.io/08a549f6c4f7fe95d908bbe6d065f02e684589e652aa6c19df24be2040c275cb.png"
  },
  {
    "id": "cinebrass-deep-horns",
    "name": "CineBrass - Deep Horns",
    "collection": "CineBrass - Deep Horns",
    "collectionSlug": "cinebrass-deep-horns",
    "category": "brass",
    "moods": [
      "triumphant",
      "epic"
    ],
    "genres": [
      "cinematic",
      "classical"
    ],
    "roles": [
      "lead",
      "harmony",
      "accent"
    ],
    "isPremium": true,
    "description": "CineBrass - Deep Horns - Musio instrument collection",
    "tags": [
      "brass",
      "cinebrass",
      "deep",
      "horns"
    ],
    "color": "#D4A520",
    "imageUrl": "https://assets.mus.io/48797ba221b09d58d38bf475f99cb7f6b0153c92b54e136e9546d91e4513088f.png"
  },
  {
    "id": "cinebrass-descant-horn",
    "name": "CineBrass - Descant Horn",
    "collection": "CineBrass - Descant Horn",
    "collectionSlug": "cinebrass-descant-horn",
    "category": "brass",
    "moods": [
      "triumphant",
      "epic"
    ],
    "genres": [
      "cinematic",
      "classical"
    ],
    "roles": [
      "lead",
      "harmony",
      "accent"
    ],
    "isPremium": true,
    "description": "CineBrass - Descant Horn - Musio instrument collection",
    "tags": [
      "brass",
      "cinebrass",
      "descant",
      "horn"
    ],
    "color": "#D4A520",
    "imageUrl": "https://assets.mus.io/da52f37f37b01530ba11fc35abf4ccc8d57994340f572295c702b2ca60be5802.png"
  },
  {
    "id": "cinebrass-low-brass",
    "name": "CineBrass - Low Brass",
    "collection": "CineBrass - Low Brass",
    "collectionSlug": "cinebrass-low-brass",
    "category": "brass",
    "moods": [
      "triumphant",
      "epic"
    ],
    "genres": [
      "cinematic",
      "classical"
    ],
    "roles": [
      "lead",
      "harmony",
      "accent"
    ],
    "isPremium": true,
    "description": "CineBrass - Low Brass - Musio instrument collection",
    "tags": [
      "brass",
      "cinebrass",
      "low",
      "brass"
    ],
    "color": "#D4A520",
    "imageUrl": "https://assets.mus.io/a1edecd3b1527a134a5fea666d68d7b0aed112fc56237a0278893a252ea6a71b.png"
  },
  {
    "id": "cinebrass-pro",
    "name": "CineBrass - Pro",
    "collection": "CineBrass - Pro",
    "collectionSlug": "cinebrass-pro",
    "category": "brass",
    "moods": [
      "triumphant",
      "epic"
    ],
    "genres": [
      "cinematic",
      "classical"
    ],
    "roles": [
      "lead",
      "harmony",
      "accent"
    ],
    "isPremium": true,
    "description": "CineBrass - Pro - Musio instrument collection",
    "tags": [
      "brass",
      "cinebrass",
      "pro"
    ],
    "color": "#D4A520",
    "imageUrl": "https://assets.mus.io/08ee708999aacf7bc421de18282a8f7ed745f0daf0c1f1790ce9126ffcbc0936.png"
  },
  {
    "id": "cinebrass-sonore",
    "name": "CineBrass - Sonore",
    "collection": "CineBrass - Sonore",
    "collectionSlug": "cinebrass-sonore",
    "category": "brass",
    "moods": [
      "triumphant",
      "epic"
    ],
    "genres": [
      "cinematic",
      "classical"
    ],
    "roles": [
      "lead",
      "harmony",
      "accent"
    ],
    "isPremium": true,
    "description": "CineBrass - Sonore - Musio instrument collection",
    "tags": [
      "brass",
      "cinebrass",
      "sonore"
    ],
    "color": "#D4A520",
    "imageUrl": "https://assets.mus.io/26972cac458fd6d676d5dcddd71582695cfa0dc446e3c3dc370f255393f7faa7.png"
  },
  {
    "id": "cineharps",
    "name": "CineHarps",
    "collection": "CineHarps",
    "collectionSlug": "cineharps",
    "category": "strings",
    "moods": [
      "epic",
      "melancholic"
    ],
    "genres": [
      "cinematic",
      "classical"
    ],
    "roles": [
      "lead",
      "harmony",
      "texture"
    ],
    "isPremium": true,
    "description": "CineHarps - Musio instrument collection",
    "tags": [
      "strings",
      "cineharps"
    ],
    "color": "#C4785A",
    "imageUrl": "https://assets.mus.io/7e72ac36e2afa1bc33259eeed45aa496a7040079b0c7f510a4ec9d62ef3d38d0.png"
  },
  {
    "id": "cineharpsichord",
    "name": "CineHarpsichord",
    "collection": "CineHarpsichord",
    "collectionSlug": "cineharpsichord",
    "category": "strings",
    "moods": [
      "epic",
      "melancholic"
    ],
    "genres": [
      "cinematic",
      "classical"
    ],
    "roles": [
      "lead",
      "harmony",
      "texture"
    ],
    "isPremium": true,
    "description": "CineHarpsichord - Musio instrument collection",
    "tags": [
      "strings",
      "cineharpsichord"
    ],
    "color": "#C4785A",
    "imageUrl": "https://assets.mus.io/bfb3deeb76562e7d1f621047229c4124b09b1173ca34184c5da07237d9ee7858.png"
  },
  {
    "id": "cinelegacy-harp",
    "name": "CineLegacy: Harp",
    "collection": "CineLegacy: Harp",
    "collectionSlug": "cinelegacy-harp",
    "category": "strings",
    "moods": [
      "epic",
      "melancholic"
    ],
    "genres": [
      "cinematic",
      "classical"
    ],
    "roles": [
      "lead",
      "harmony",
      "texture"
    ],
    "isPremium": true,
    "description": "CineLegacy: Harp - Musio instrument collection",
    "tags": [
      "strings",
      "cinelegacy",
      "harp"
    ],
    "color": "#C4785A",
    "imageUrl": "https://assets.mus.io/21191d2771156504d857619c9fafd70ca5191dc84760794d8cc99af986f79ff2.png"
  },
  {
    "id": "cineperc-aux",
    "name": "CinePerc - Aux",
    "collection": "CinePerc - Aux",
    "collectionSlug": "cineperc-aux",
    "category": "percussion",
    "moods": [
      "energetic"
    ],
    "genres": [
      "cinematic"
    ],
    "roles": [
      "percussion",
      "rhythm"
    ],
    "isPremium": true,
    "description": "CinePerc - Aux - Musio instrument collection",
    "tags": [
      "percussion",
      "cineperc",
      "aux"
    ],
    "color": "#B45A5A",
    "imageUrl": "https://assets.mus.io/d187f69b30dc6a15e9c82d570746349545459939c64ad4096b98074ac50b43aa.png"
  },
  {
    "id": "cineperc-drum-kit",
    "name": "CinePerc - Drum Kit",
    "collection": "CinePerc - Drum Kit",
    "collectionSlug": "cineperc-drum-kit",
    "category": "percussion",
    "moods": [
      "energetic"
    ],
    "genres": [
      "cinematic"
    ],
    "roles": [
      "percussion",
      "rhythm"
    ],
    "isPremium": true,
    "description": "CinePerc - Drum Kit - Musio instrument collection",
    "tags": [
      "percussion",
      "cineperc",
      "drum",
      "kit"
    ],
    "color": "#B45A5A",
    "imageUrl": "https://assets.mus.io/399f9f85d04d5183767ebb7f4bafaceccda101dfd2321a9e7cea82b47adbf810.png"
  },
  {
    "id": "cineperc-epic",
    "name": "CinePerc - Epic",
    "collection": "CinePerc - Epic",
    "collectionSlug": "cineperc-epic",
    "category": "percussion",
    "moods": [
      "epic",
      "energetic"
    ],
    "genres": [
      "cinematic"
    ],
    "roles": [
      "percussion",
      "rhythm"
    ],
    "isPremium": true,
    "description": "CinePerc - Epic - Musio instrument collection",
    "tags": [
      "percussion",
      "cineperc",
      "epic"
    ],
    "color": "#B45A5A",
    "imageUrl": "https://assets.mus.io/aa8b0bf742848152beb50e142c21112f3198d9c32c8fa08208cc1daf71c7a3d2.png"
  },
  {
    "id": "cineperc-metal",
    "name": "CinePerc - Metal",
    "collection": "CinePerc - Metal",
    "collectionSlug": "cineperc-metal",
    "category": "percussion",
    "moods": [
      "energetic"
    ],
    "genres": [
      "cinematic"
    ],
    "roles": [
      "percussion",
      "rhythm"
    ],
    "isPremium": true,
    "description": "CinePerc - Metal - Musio instrument collection",
    "tags": [
      "percussion",
      "cineperc",
      "metal"
    ],
    "color": "#B45A5A",
    "imageUrl": "https://assets.mus.io/5da86ce2c01b9a255966f6f9b099b5ad2f7890f16f202ae8cf82a596726f6586.png"
  },
  {
    "id": "cineperc-orchestral",
    "name": "CinePerc - Orchestral",
    "collection": "CinePerc - Orchestral",
    "collectionSlug": "cineperc-orchestral",
    "category": "percussion",
    "moods": [
      "energetic"
    ],
    "genres": [
      "cinematic"
    ],
    "roles": [
      "percussion",
      "rhythm"
    ],
    "isPremium": true,
    "description": "CinePerc - Orchestral - Musio instrument collection",
    "tags": [
      "percussion",
      "cineperc",
      "orchestral"
    ],
    "color": "#B45A5A",
    "imageUrl": "https://assets.mus.io/1b965071a34e813d6c11f3bfd48988f1f199359fa5274cac4086be0f47d20403.png"
  },
  {
    "id": "cineperc-tonal",
    "name": "CinePerc - Tonal",
    "collection": "CinePerc - Tonal",
    "collectionSlug": "cineperc-tonal",
    "category": "percussion",
    "moods": [
      "energetic"
    ],
    "genres": [
      "cinematic"
    ],
    "roles": [
      "percussion",
      "rhythm"
    ],
    "isPremium": true,
    "description": "CinePerc - Tonal - Musio instrument collection",
    "tags": [
      "percussion",
      "cineperc",
      "tonal"
    ],
    "color": "#B45A5A",
    "imageUrl": "https://assets.mus.io/7e6c57640ad72ad199835fa7a23cf78c059de067f02ba6eeee30d8c561d6b0d1.png"
  },
  {
    "id": "cineperc-wood",
    "name": "CinePerc - Wood",
    "collection": "CinePerc - Wood",
    "collectionSlug": "cineperc-wood",
    "category": "percussion",
    "moods": [
      "energetic"
    ],
    "genres": [
      "cinematic"
    ],
    "roles": [
      "percussion",
      "rhythm"
    ],
    "isPremium": true,
    "description": "CinePerc - Wood - Musio instrument collection",
    "tags": [
      "percussion",
      "cineperc",
      "wood"
    ],
    "color": "#B45A5A",
    "imageUrl": "https://assets.mus.io/efe31f83668090214cd484cda1397e91ffcb4e873be6a86e41f983cdc4f26e32.png"
  },
  {
    "id": "cineperc-world",
    "name": "CinePerc - World",
    "collection": "CinePerc - World",
    "collectionSlug": "cineperc-world",
    "category": "percussion",
    "moods": [
      "energetic"
    ],
    "genres": [
      "cinematic"
    ],
    "roles": [
      "percussion",
      "rhythm"
    ],
    "isPremium": true,
    "description": "CinePerc - World - Musio instrument collection",
    "tags": [
      "percussion",
      "cineperc",
      "world"
    ],
    "color": "#B45A5A",
    "imageUrl": "https://assets.mus.io/6dd3f6be31e3e3eb08fd1cfd2133f3248300901f1b67b9704b4b3698d4950898.png"
  },
  {
    "id": "cine-piano",
    "name": "CinePiano",
    "collection": "CinePiano",
    "collectionSlug": "cine-piano",
    "category": "keyboards",
    "moods": [
      "intimate",
      "peaceful"
    ],
    "genres": [
      "cinematic"
    ],
    "roles": [
      "lead",
      "harmony"
    ],
    "isPremium": true,
    "description": "CinePiano - Musio instrument collection",
    "tags": [
      "keyboards",
      "cine",
      "piano"
    ],
    "color": "#4A6A9A",
    "imageUrl": "https://assets.mus.io/90a41f2cb73ed06ec2a1e58c2521296e4b94da40a95efe8640520f5eca819bc1.png"
  },
  {
    "id": "cinestrings-core",
    "name": "CineStrings - Core",
    "collection": "CineStrings - Core",
    "collectionSlug": "cinestrings-core",
    "category": "strings",
    "moods": [
      "epic",
      "melancholic"
    ],
    "genres": [
      "cinematic",
      "classical"
    ],
    "roles": [
      "lead",
      "harmony",
      "texture"
    ],
    "isPremium": true,
    "description": "CineStrings - Core - Musio instrument collection",
    "tags": [
      "strings",
      "cinestrings",
      "core"
    ],
    "color": "#C4785A",
    "imageUrl": "https://assets.mus.io/23fcd804f834e4c282f933bc79d2aa9f04fc3f6fab7fd50818b342a4dc10d260.png"
  },
  {
    "id": "cinestrings-pro",
    "name": "CineStrings - Pro",
    "collection": "CineStrings - Pro",
    "collectionSlug": "cinestrings-pro",
    "category": "strings",
    "moods": [
      "epic",
      "melancholic"
    ],
    "genres": [
      "cinematic",
      "classical"
    ],
    "roles": [
      "lead",
      "harmony",
      "texture"
    ],
    "isPremium": true,
    "description": "CineStrings - Pro - Musio instrument collection",
    "tags": [
      "strings",
      "cinestrings",
      "pro"
    ],
    "color": "#C4785A",
    "imageUrl": "https://assets.mus.io/118368f2b9afc38ec7a4b23af9adc22329cd5d669b96a0507f2e9719302a5e5b.png"
  },
  {
    "id": "cinestrings-runs",
    "name": "CineStrings - Runs",
    "collection": "CineStrings - Runs",
    "collectionSlug": "cinestrings-runs",
    "category": "strings",
    "moods": [
      "epic",
      "melancholic"
    ],
    "genres": [
      "cinematic",
      "classical"
    ],
    "roles": [
      "lead",
      "harmony",
      "texture"
    ],
    "isPremium": true,
    "description": "CineStrings - Runs - Musio instrument collection",
    "tags": [
      "strings",
      "cinestrings",
      "runs"
    ],
    "color": "#C4785A",
    "imageUrl": "https://assets.mus.io/5b142c2f9242f1fb9f657672545f75af8efb5668eb0a39ff7364ad9a669d1f32.png"
  },
  {
    "id": "cinestrings-solo",
    "name": "CineStrings - Solo",
    "collection": "CineStrings - Solo",
    "collectionSlug": "cinestrings-solo",
    "category": "strings",
    "moods": [
      "intimate",
      "epic",
      "melancholic"
    ],
    "genres": [
      "cinematic",
      "classical"
    ],
    "roles": [
      "lead",
      "harmony",
      "texture"
    ],
    "isPremium": true,
    "description": "CineStrings - Solo - Musio instrument collection",
    "tags": [
      "strings",
      "cinestrings",
      "solo"
    ],
    "color": "#C4785A",
    "imageUrl": "https://assets.mus.io/32b69e3c5b5dd013ebf20185718a4ce472002a9e8fe04b789fa46964ff242039.png"
  },
  {
    "id": "cinesymphony",
    "name": "CineSymphony",
    "collection": "CineSymphony",
    "collectionSlug": "cinesymphony",
    "category": "orchestral",
    "moods": [],
    "genres": [
      "cinematic"
    ],
    "roles": [
      "texture",
      "harmony"
    ],
    "isPremium": true,
    "description": "CineSymphony - Musio instrument collection",
    "tags": [
      "orchestral",
      "cinesymphony"
    ],
    "color": "#6A5A4A",
    "imageUrl": "https://assets.mus.io/6d9f58cfad04a1aa64521f9630de93b56964e5181eb2a58ec4e4e0d83461d320.png"
  },
  {
    "id": "cinewinds-core",
    "name": "CineWinds - Core",
    "collection": "CineWinds - Core",
    "collectionSlug": "cinewinds-core",
    "category": "woodwinds",
    "moods": [
      "peaceful",
      "intimate"
    ],
    "genres": [
      "cinematic",
      "classical"
    ],
    "roles": [
      "lead",
      "texture"
    ],
    "isPremium": true,
    "description": "CineWinds - Core - Musio instrument collection",
    "tags": [
      "woodwinds",
      "cinewinds",
      "core"
    ],
    "color": "#5A8A7A",
    "imageUrl": "https://assets.mus.io/2b6b8faaecd9d4ea9183efde7d11c83c0d36348ff1e092fc9505a663770ec58d.png"
  },
  {
    "id": "cinewinds-low-winds",
    "name": "CineWinds - Low Winds",
    "collection": "CineWinds - Low Winds",
    "collectionSlug": "cinewinds-low-winds",
    "category": "woodwinds",
    "moods": [
      "peaceful",
      "intimate"
    ],
    "genres": [
      "cinematic",
      "classical"
    ],
    "roles": [
      "lead",
      "texture"
    ],
    "isPremium": true,
    "description": "CineWinds - Low Winds - Musio instrument collection",
    "tags": [
      "woodwinds",
      "cinewinds",
      "low",
      "winds"
    ],
    "color": "#5A8A7A",
    "imageUrl": "https://assets.mus.io/aaa82cf5a01f2efd1d2aa4c30e202077892958846b69ad6108b514cd968b8ea7.png"
  },
  {
    "id": "cinewinds-pro",
    "name": "CineWinds - Pro",
    "collection": "CineWinds - Pro",
    "collectionSlug": "cinewinds-pro",
    "category": "woodwinds",
    "moods": [
      "peaceful",
      "intimate"
    ],
    "genres": [
      "cinematic",
      "classical"
    ],
    "roles": [
      "lead",
      "texture"
    ],
    "isPremium": true,
    "description": "CineWinds - Pro - Musio instrument collection",
    "tags": [
      "woodwinds",
      "cinewinds",
      "pro"
    ],
    "color": "#5A8A7A",
    "imageUrl": "https://assets.mus.io/5320be794c0bc3ad2c634f0be6a102de14b84960a57b97d0fe692b2b25ee84aa.png"
  },
  {
    "id": "collision-impact-designer",
    "name": "Collision Impact Designer",
    "collection": "Collision Impact Designer",
    "collectionSlug": "collision-impact-designer",
    "category": "fx",
    "moods": [],
    "genres": [
      "cinematic"
    ],
    "roles": [
      "texture",
      "accent"
    ],
    "isPremium": true,
    "description": "Collision Impact Designer - Musio instrument collection",
    "tags": [
      "fx",
      "collision",
      "impact",
      "designer"
    ],
    "color": "#5A6A8A",
    "imageUrl": "https://assets.mus.io/18c8f7e6bed5f6567cd98cc3a96b53a6d73900b1015e6ddd1f853b6791c05bb8.png"
  },
  {
    "id": "colors",
    "name": "Colors",
    "collection": "Colors",
    "collectionSlug": "colors",
    "category": "other",
    "moods": [],
    "genres": [
      "cinematic"
    ],
    "roles": [
      "texture"
    ],
    "isPremium": true,
    "description": "Colors - Musio instrument collection",
    "tags": [
      "other",
      "colors"
    ],
    "color": "#6A6A6A",
    "imageUrl": "https://assets.mus.io/f7ee35e9d8f49d2726f24f6216726360f735f484839cb4301c44476cc37244b9.png"
  },
  {
    "id": "accent-pianos",
    "name": "Create Series: Accent Pianos",
    "collection": "Create Series: Accent Pianos",
    "collectionSlug": "accent-pianos",
    "category": "keyboards",
    "moods": [
      "intimate",
      "peaceful"
    ],
    "genres": [
      "cinematic"
    ],
    "roles": [
      "lead",
      "harmony"
    ],
    "isPremium": true,
    "description": "Create Series: Accent Pianos - Musio instrument collection",
    "tags": [
      "keyboards",
      "accent",
      "pianos"
    ],
    "color": "#4A6A9A",
    "imageUrl": "https://assets.mus.io/5afbeb1a9318a595a9e33ad772131f223013665e7a1e7c577e23f07103dfa287.png"
  },
  {
    "id": "create-series-kalimba",
    "name": "Create Series: Kalimba",
    "collection": "Create Series: Kalimba",
    "collectionSlug": "create-series-kalimba",
    "category": "percussion",
    "moods": [
      "energetic"
    ],
    "genres": [
      "cinematic"
    ],
    "roles": [
      "percussion",
      "rhythm"
    ],
    "isPremium": true,
    "description": "Create Series: Kalimba - Musio instrument collection",
    "tags": [
      "percussion",
      "create",
      "series",
      "kalimba"
    ],
    "color": "#B45A5A",
    "imageUrl": "https://assets.mus.io/db563a22e50153920d3303ca6c9148a6a6804aa8dd97622bf1c391338171460e.png"
  },
  {
    "id": "tonal-tickles",
    "name": "Create Series: Tonal Tickies",
    "collection": "Create Series: Tonal Tickies",
    "collectionSlug": "tonal-tickles",
    "category": "percussion",
    "moods": [
      "bright",
      "energetic"
    ],
    "genres": [
      "cinematic"
    ],
    "roles": [
      "percussion",
      "rhythm"
    ],
    "isPremium": true,
    "description": "Create Series: Tonal Tickies - Musio instrument collection",
    "tags": [
      "percussion",
      "tonal",
      "tickles"
    ],
    "color": "#B45A5A",
    "imageUrl": "https://assets.mus.io/1cdadf5f8c442b97181ff2817e98add44521345c87cb3a65391e206acbaad6d1.png"
  },
  {
    "id": "tongue-drum",
    "name": "Create Series: Tongue Drum",
    "collection": "Create Series: Tongue Drum",
    "collectionSlug": "tongue-drum",
    "category": "percussion",
    "moods": [
      "energetic"
    ],
    "genres": [
      "cinematic"
    ],
    "roles": [
      "percussion",
      "rhythm"
    ],
    "isPremium": true,
    "description": "Create Series: Tongue Drum - Musio instrument collection",
    "tags": [
      "percussion",
      "tongue",
      "drum"
    ],
    "color": "#B45A5A",
    "imageUrl": "https://assets.mus.io/57cb3bdc79b5e97eaba327e131e635d15fb9f48618412c206afaf05734fff9d7.png"
  },
  {
    "id": "create-series-toy-xylo",
    "name": "Create Series: Toy Xylo",
    "collection": "Create Series: Toy Xylo",
    "collectionSlug": "create-series-toy-xylo",
    "category": "percussion",
    "moods": [
      "bright",
      "energetic"
    ],
    "genres": [
      "cinematic"
    ],
    "roles": [
      "percussion",
      "rhythm"
    ],
    "isPremium": true,
    "description": "Create Series: Toy Xylo - Musio instrument collection",
    "tags": [
      "percussion",
      "create",
      "series",
      "toy",
      "xylo"
    ],
    "color": "#B45A5A",
    "imageUrl": "https://assets.mus.io/ae9bf6ee368a5b7fac3cbf50d2edd7797dbf2347f26a23c1ffa70c616f307b54.png"
  },
  {
    "id": "twisted-psaltry-cinematic-fx",
    "name": "Create Series: Twisted Psaltry - Cinematic FX",
    "collection": "Create Series: Twisted Psaltry - Cinematic FX",
    "collectionSlug": "twisted-psaltry-cinematic-fx",
    "category": "fx",
    "moods": [
      "dark"
    ],
    "genres": [
      "cinematic"
    ],
    "roles": [
      "texture",
      "accent"
    ],
    "isPremium": true,
    "description": "Create Series: Twisted Psaltry - Cinematic FX - Musio instrument collection",
    "tags": [
      "fx",
      "twisted",
      "psaltry",
      "cinematic"
    ],
    "color": "#5A6A8A",
    "imageUrl": "https://assets.mus.io/24a1fcd2c37b3f5b454902c5827e9267cd67927707af03be262cb519cda38ae9.png"
  },
  {
    "id": "drums-in-blue",
    "name": "Drums in Blue",
    "collection": "Drums in Blue",
    "collectionSlug": "drums-in-blue",
    "category": "percussion",
    "moods": [
      "melancholic",
      "energetic"
    ],
    "genres": [
      "cinematic",
      "jazz"
    ],
    "roles": [
      "percussion",
      "rhythm"
    ],
    "isPremium": true,
    "description": "Drums in Blue - Musio instrument collection",
    "tags": [
      "percussion",
      "drums",
      "blue"
    ],
    "color": "#B45A5A",
    "imageUrl": "https://assets.mus.io/77fc2e0cb0001bf38a46bae8cba79049ab267bf715ce80a575ca14fd0fc209f3.png"
  },
  {
    "id": "drums-of-war-1",
    "name": "Drums of War 1",
    "collection": "Drums of War 1",
    "collectionSlug": "drums-of-war-1",
    "category": "percussion",
    "moods": [
      "epic",
      "energetic"
    ],
    "genres": [
      "cinematic"
    ],
    "roles": [
      "percussion",
      "rhythm"
    ],
    "isPremium": true,
    "description": "Drums of War 1 - Musio instrument collection",
    "tags": [
      "percussion",
      "drums",
      "war"
    ],
    "color": "#B45A5A",
    "imageUrl": "https://assets.mus.io/a6f7fa7e9546392573fcb6654b4249f6ec38635924536f1664ee750177c18d98.png"
  },
  {
    "id": "drums-of-war-2",
    "name": "Drums of War 2",
    "collection": "Drums of War 2",
    "collectionSlug": "drums-of-war-2",
    "category": "percussion",
    "moods": [
      "epic",
      "energetic"
    ],
    "genres": [
      "cinematic"
    ],
    "roles": [
      "percussion",
      "rhythm"
    ],
    "isPremium": true,
    "description": "Drums of War 2 - Musio instrument collection",
    "tags": [
      "percussion",
      "drums",
      "war"
    ],
    "color": "#B45A5A",
    "imageUrl": "https://assets.mus.io/b4b5fe72e0ead131ebb7eb5d6125f74825239623d699b96cadcec1b8422722a9.png"
  },
  {
    "id": "drums-of-war-3",
    "name": "Drums of War 3",
    "collection": "Drums of War 3",
    "collectionSlug": "drums-of-war-3",
    "category": "percussion",
    "moods": [
      "epic",
      "energetic"
    ],
    "genres": [
      "cinematic"
    ],
    "roles": [
      "percussion",
      "rhythm"
    ],
    "isPremium": true,
    "description": "Drums of War 3 - Musio instrument collection",
    "tags": [
      "percussion",
      "drums",
      "war"
    ],
    "color": "#B45A5A",
    "imageUrl": "https://assets.mus.io/4e30458068981d3001782458153813727ed01f9f9ba5aee2c1ed91728f989695.png"
  },
  {
    "id": "dulcimer-and-zither",
    "name": "Dulcimer and Zither",
    "collection": "Dulcimer and Zither",
    "collectionSlug": "dulcimer-and-zither",
    "category": "other",
    "moods": [],
    "genres": [
      "cinematic"
    ],
    "roles": [
      "texture"
    ],
    "isPremium": true,
    "description": "Dulcimer and Zither - Musio instrument collection",
    "tags": [
      "other",
      "dulcimer",
      "and",
      "zither"
    ],
    "color": "#6A6A6A",
    "imageUrl": "https://assets.mus.io/c42a46e8eeeab9f24469d6e785f9bacec086e1ea7d36238a595cddceae8426d3.png"
  },
  {
    "id": "emotional-piano",
    "name": "Emotional Piano",
    "collection": "Emotional Piano",
    "collectionSlug": "emotional-piano",
    "category": "keyboards",
    "moods": [
      "melancholic",
      "intimate",
      "peaceful"
    ],
    "genres": [
      "cinematic"
    ],
    "roles": [
      "lead",
      "harmony"
    ],
    "isPremium": true,
    "description": "Emotional Piano - Musio instrument collection",
    "tags": [
      "keyboards",
      "emotional",
      "piano"
    ],
    "color": "#4A6A9A",
    "imageUrl": "https://assets.mus.io/7688fa4cf4e290d122ef0f96a206ae913c6117961b4f7fd21a5f6b7af266e0e8.png"
  },
  {
    "id": "forbes-pipe-organ",
    "name": "Forbes Pipe Organ",
    "collection": "Forbes Pipe Organ",
    "collectionSlug": "forbes-pipe-organ",
    "category": "keyboards",
    "moods": [
      "intimate",
      "peaceful"
    ],
    "genres": [
      "cinematic"
    ],
    "roles": [
      "lead",
      "harmony"
    ],
    "isPremium": true,
    "description": "Forbes Pipe Organ - Musio instrument collection",
    "tags": [
      "keyboards",
      "forbes",
      "pipe",
      "organ"
    ],
    "color": "#4A6A9A",
    "imageUrl": "https://assets.mus.io/281e4a9a1485d335271b0f84cef4125c38f38bf1355d0055cd67d10fed1d3328.png"
  },
  {
    "id": "handbells",
    "name": "Handbells",
    "collection": "Handbells",
    "collectionSlug": "handbells",
    "category": "percussion",
    "moods": [
      "energetic"
    ],
    "genres": [
      "cinematic"
    ],
    "roles": [
      "percussion",
      "rhythm"
    ],
    "isPremium": true,
    "description": "Handbells - Musio instrument collection",
    "tags": [
      "percussion",
      "handbells"
    ],
    "color": "#B45A5A",
    "imageUrl": "https://assets.mus.io/cc3a3c9d5622f83c67f1d71294af15a88709bf26bf870c6268da4bdf481eae68.png"
  },
  {
    "id": "hardanger-fiddle",
    "name": "Hardanger Fiddle",
    "collection": "Hardanger Fiddle",
    "collectionSlug": "hardanger-fiddle",
    "category": "strings",
    "moods": [
      "epic",
      "melancholic"
    ],
    "genres": [
      "cinematic",
      "classical"
    ],
    "roles": [
      "lead",
      "harmony",
      "texture"
    ],
    "isPremium": true,
    "description": "Hardanger Fiddle - Musio instrument collection",
    "tags": [
      "strings",
      "hardanger",
      "fiddle"
    ],
    "color": "#C4785A",
    "imageUrl": "https://assets.mus.io/c1835aa5dda0491559d1409a4bda2e142c29e4c818354bd07167fc2f5ca9b578.png"
  },
  {
    "id": "hollywoodwinds",
    "name": "Hollywoodwinds",
    "collection": "Hollywoodwinds",
    "collectionSlug": "hollywoodwinds",
    "category": "woodwinds",
    "moods": [
      "peaceful",
      "intimate"
    ],
    "genres": [
      "cinematic",
      "classical"
    ],
    "roles": [
      "lead",
      "texture"
    ],
    "isPremium": true,
    "description": "Hollywoodwinds - Musio instrument collection",
    "tags": [
      "woodwinds",
      "hollywoodwinds"
    ],
    "color": "#5A8A7A",
    "imageUrl": "https://assets.mus.io/dc049d46161e81ab2be170256ed09a5154cc463d624bdece3b439018ee02bd53.png"
  },
  {
    "id": "hyperion-brass-core",
    "name": "Hyperion Brass Core",
    "collection": "Hyperion Brass Core",
    "collectionSlug": "hyperion-brass-core",
    "category": "brass",
    "moods": [
      "triumphant",
      "epic"
    ],
    "genres": [
      "cinematic",
      "classical"
    ],
    "roles": [
      "lead",
      "harmony",
      "accent"
    ],
    "isPremium": true,
    "description": "Hyperion Brass Core - Musio instrument collection",
    "tags": [
      "brass",
      "hyperion",
      "brass",
      "core"
    ],
    "color": "#D4A520",
    "imageUrl": "https://assets.mus.io/932d347d762968d56c2ed9fad6fcb04e420b2603c79cb81b3baa8658b71a143b.png"
  },
  {
    "id": "hyperion-brass-pro",
    "name": "Hyperion Brass Pro",
    "collection": "Hyperion Brass Pro",
    "collectionSlug": "hyperion-brass-pro",
    "category": "brass",
    "moods": [
      "triumphant",
      "epic"
    ],
    "genres": [
      "cinematic",
      "classical"
    ],
    "roles": [
      "lead",
      "harmony",
      "accent"
    ],
    "isPremium": true,
    "description": "Hyperion Brass Pro - Musio instrument collection",
    "tags": [
      "brass",
      "hyperion",
      "brass",
      "pro"
    ],
    "color": "#D4A520",
    "imageUrl": "https://assets.mus.io/1d217a9d3e3a6b391476302610adcba94c52d22e349bf3247518bb863fb85b68.png"
  },
  {
    "id": "hyperion-strings-core",
    "name": "Hyperion Strings Core",
    "collection": "Hyperion Strings Core",
    "collectionSlug": "hyperion-strings-core",
    "category": "strings",
    "moods": [
      "epic",
      "melancholic"
    ],
    "genres": [
      "cinematic",
      "classical"
    ],
    "roles": [
      "lead",
      "harmony",
      "texture"
    ],
    "isPremium": true,
    "description": "Hyperion Strings Core - Musio instrument collection",
    "tags": [
      "strings",
      "hyperion",
      "strings",
      "core"
    ],
    "color": "#C4785A",
    "imageUrl": "https://assets.mus.io/affe4a3cf1d5ac7ee30890aa7630cc4e76197c683e12a548de8ee61483de3837.png"
  },
  {
    "id": "hyperion-strings-pro",
    "name": "Hyperion Strings Pro",
    "collection": "Hyperion Strings Pro",
    "collectionSlug": "hyperion-strings-pro",
    "category": "strings",
    "moods": [
      "epic",
      "melancholic"
    ],
    "genres": [
      "cinematic",
      "classical"
    ],
    "roles": [
      "lead",
      "harmony",
      "texture"
    ],
    "isPremium": true,
    "description": "Hyperion Strings Pro - Musio instrument collection",
    "tags": [
      "strings",
      "hyperion",
      "strings",
      "pro"
    ],
    "color": "#C4785A",
    "imageUrl": "https://assets.mus.io/ee383253de1733dd663794496786a3c381809bf67beba126012643ddb3afd77f.png"
  },
  {
    "id": "industry-brass-core",
    "name": "Industry Brass - Core",
    "collection": "Industry Brass - Core",
    "collectionSlug": "industry-brass-core",
    "category": "brass",
    "moods": [
      "triumphant",
      "epic"
    ],
    "genres": [
      "cinematic",
      "classical"
    ],
    "roles": [
      "lead",
      "harmony",
      "accent"
    ],
    "isPremium": true,
    "description": "Industry Brass - Core - Musio instrument collection",
    "tags": [
      "brass",
      "industry",
      "brass",
      "core"
    ],
    "color": "#D4A520",
    "imageUrl": "https://assets.mus.io/350b46884f8feac98beca7f4abf808f707a8a3dd490fa9b0cba2961e0fe9d183.png"
  },
  {
    "id": "industry-brass-pro",
    "name": "Industry Brass - Pro",
    "collection": "Industry Brass - Pro",
    "collectionSlug": "industry-brass-pro",
    "category": "brass",
    "moods": [
      "triumphant",
      "epic"
    ],
    "genres": [
      "cinematic",
      "classical"
    ],
    "roles": [
      "lead",
      "harmony",
      "accent"
    ],
    "isPremium": true,
    "description": "Industry Brass - Pro - Musio instrument collection",
    "tags": [
      "brass",
      "industry",
      "brass",
      "pro"
    ],
    "color": "#D4A520",
    "imageUrl": "https://assets.mus.io/9464157b60109808859d0c6285c3679d7ac84a96f5201ad6224049f2e09d7539.png"
  },
  {
    "id": "keyboard-in-blue",
    "name": "Keyboard In Blue",
    "collection": "Keyboard In Blue",
    "collectionSlug": "keyboard-in-blue",
    "category": "keyboards",
    "moods": [
      "melancholic",
      "intimate",
      "peaceful"
    ],
    "genres": [
      "cinematic",
      "jazz"
    ],
    "roles": [
      "lead",
      "harmony"
    ],
    "isPremium": true,
    "description": "Keyboard In Blue - Musio instrument collection",
    "tags": [
      "keyboards",
      "keyboard",
      "blue"
    ],
    "color": "#4A6A9A",
    "imageUrl": "https://assets.mus.io/0d357919550d738f673f24ba72b67a0ee5eeeda3819850dfe79a6ebbcedbf7d2.png"
  },
  {
    "id": "la-modern-percussion",
    "name": "LA Modern Percussion",
    "collection": "LA Modern Percussion",
    "collectionSlug": "la-modern-percussion",
    "category": "percussion",
    "moods": [
      "energetic"
    ],
    "genres": [
      "cinematic"
    ],
    "roles": [
      "percussion",
      "rhythm"
    ],
    "isPremium": true,
    "description": "LA Modern Percussion - Musio instrument collection",
    "tags": [
      "percussion",
      "modern",
      "percussion"
    ],
    "color": "#B45A5A",
    "imageUrl": "https://assets.mus.io/476a75744b43524241e85cb0fce847044eacfa483f126f69a1fe066d994fedf4.png"
  },
  {
    "id": "mister-rogers-celeste",
    "name": "Mister Rogers' Celeste",
    "collection": "Mister Rogers' Celeste",
    "collectionSlug": "mister-rogers-celeste",
    "category": "keyboards",
    "moods": [
      "intimate",
      "peaceful"
    ],
    "genres": [
      "cinematic"
    ],
    "roles": [
      "lead",
      "harmony"
    ],
    "isPremium": true,
    "description": "Mister Rogers' Celeste - Musio instrument collection",
    "tags": [
      "keyboards",
      "mister",
      "rogers",
      "celeste"
    ],
    "color": "#4A6A9A",
    "imageUrl": "https://assets.mus.io/5f64209e734559beeec5f6eb6a300a532f101a971748449d32b6e1b9104d24c1.png"
  },
  {
    "id": "nashville-scoring-strings",
    "name": "Nashville Scoring Strings",
    "collection": "Nashville Scoring Strings",
    "collectionSlug": "nashville-scoring-strings",
    "category": "strings",
    "moods": [
      "epic",
      "melancholic"
    ],
    "genres": [
      "cinematic",
      "classical"
    ],
    "roles": [
      "lead",
      "harmony",
      "texture"
    ],
    "isPremium": true,
    "description": "Nashville Scoring Strings - Musio instrument collection",
    "tags": [
      "strings",
      "nashville",
      "scoring",
      "strings"
    ],
    "color": "#C4785A",
    "imageUrl": "https://assets.mus.io/49247d0b9d0fa319170c65bbb2b608d5d4985846528e633f1ebb8942da10a2cf.png"
  },
  {
    "id": "men-of-the-north-nordic-voices",
    "name": "Nordic Voices - Men of the North",
    "collection": "Nordic Voices - Men of the North",
    "collectionSlug": "men-of-the-north-nordic-voices",
    "category": "vocals",
    "moods": [
      "epic",
      "peaceful"
    ],
    "genres": [
      "cinematic"
    ],
    "roles": [
      "texture",
      "lead"
    ],
    "isPremium": true,
    "description": "Nordic Voices - Men of the North - Musio instrument collection",
    "tags": [
      "vocals",
      "men",
      "the",
      "north",
      "nordic",
      "voices"
    ],
    "color": "#AA6A7A",
    "imageUrl": "https://assets.mus.io/2bc5073005134a3cf9b3af0dcfc56f532077a8b040ea673683b4a27447c25567.png"
  },
  {
    "id": "women-of-the-north",
    "name": "Nordic Voices - Women of the North",
    "collection": "Nordic Voices - Women of the North",
    "collectionSlug": "women-of-the-north",
    "category": "vocals",
    "moods": [
      "epic",
      "peaceful"
    ],
    "genres": [
      "cinematic"
    ],
    "roles": [
      "texture",
      "lead"
    ],
    "isPremium": true,
    "description": "Nordic Voices - Women of the North - Musio instrument collection",
    "tags": [
      "vocals",
      "women",
      "the",
      "north"
    ],
    "color": "#AA6A7A",
    "imageUrl": "https://assets.mus.io/a05e2909ce331a3eb2d2ed3784bd2709412169872b2e1b031ec14b284176b43a.png"
  },
  {
    "id": "orchestral-chords",
    "name": "Orchestral Chords",
    "collection": "Orchestral Chords",
    "collectionSlug": "orchestral-chords",
    "category": "orchestral",
    "moods": [],
    "genres": [
      "cinematic"
    ],
    "roles": [
      "texture",
      "harmony"
    ],
    "isPremium": true,
    "description": "Orchestral Chords - Musio instrument collection",
    "tags": [
      "orchestral",
      "orchestral",
      "chords"
    ],
    "color": "#6A5A4A",
    "imageUrl": "https://assets.mus.io/c8a4f93c5f4e7502a2400d250bf1cd8b08f7e9d4466b5cd0a7b3c491a82a34e3.png"
  },
  {
    "id": "piano-in-blue",
    "name": "Piano in Blue",
    "collection": "Piano in Blue",
    "collectionSlug": "piano-in-blue",
    "category": "keyboards",
    "moods": [
      "melancholic",
      "intimate",
      "peaceful"
    ],
    "genres": [
      "cinematic",
      "jazz"
    ],
    "roles": [
      "lead",
      "harmony"
    ],
    "isPremium": true,
    "description": "Piano in Blue - Musio instrument collection",
    "tags": [
      "keyboards",
      "piano",
      "blue"
    ],
    "color": "#4A6A9A",
    "imageUrl": "https://assets.mus.io/281b213745fdf1376ee40cdca079608b3f7632b2f96000f85fdb48562aa0d359.png"
  },
  {
    "id": "quatre",
    "name": "Quatre",
    "collection": "Quatre",
    "collectionSlug": "quatre",
    "category": "other",
    "moods": [],
    "genres": [
      "cinematic"
    ],
    "roles": [
      "texture"
    ],
    "isPremium": true,
    "description": "Quatre - Musio instrument collection",
    "tags": [
      "other",
      "quatre"
    ],
    "color": "#6A6A6A",
    "imageUrl": "https://assets.mus.io/b7d2db3169c0eab19f55b69ff9fac6b4239dadbf6f6ce485c90cab11414ec021.png"
  },
  {
    "id": "rhodes-73-ep",
    "name": "Rhodes 73 EP",
    "collection": "Rhodes 73 EP",
    "collectionSlug": "rhodes-73-ep",
    "category": "keyboards",
    "moods": [
      "intimate",
      "peaceful"
    ],
    "genres": [
      "cinematic"
    ],
    "roles": [
      "lead",
      "harmony"
    ],
    "isPremium": true,
    "description": "Rhodes 73 EP - Musio instrument collection",
    "tags": [
      "keyboards",
      "rhodes"
    ],
    "color": "#4A6A9A",
    "imageUrl": "https://assets.mus.io/c7f2b6686c0a2258f95a6b2cd5611e2c9de99def788f8f25f9e88718595993ce.png"
  },
  {
    "id": "scoring-synths",
    "name": "Scoring Synths",
    "collection": "Scoring Synths",
    "collectionSlug": "scoring-synths",
    "category": "synths",
    "moods": [
      "dreamy",
      "nostalgic"
    ],
    "genres": [
      "cinematic",
      "electronic"
    ],
    "roles": [
      "texture",
      "lead",
      "bass"
    ],
    "isPremium": true,
    "description": "Scoring Synths - Musio instrument collection",
    "tags": [
      "synths",
      "scoring",
      "synths"
    ],
    "color": "#8A5AAA",
    "imageUrl": "https://assets.mus.io/f8d5e9e6dfbae7a7955aaeb9c28a89f21ca8744ce163df65e3665256a5073e7b.png"
  },
  {
    "id": "session-piano-grand",
    "name": "Session Piano - Grand",
    "collection": "Session Piano - Grand",
    "collectionSlug": "session-piano-grand",
    "category": "keyboards",
    "moods": [
      "intimate",
      "peaceful"
    ],
    "genres": [
      "cinematic",
      "pop"
    ],
    "roles": [
      "lead",
      "harmony"
    ],
    "isPremium": true,
    "description": "Session Piano - Grand - Musio instrument collection",
    "tags": [
      "keyboards",
      "session",
      "piano",
      "grand"
    ],
    "color": "#4A6A9A",
    "imageUrl": "https://assets.mus.io/a73f4e81f151008b4ac2d1f5d1b2b6f8c7c1c0cbc4c875c49388b7386f60fe91.png"
  },
  {
    "id": "session-piano-upright",
    "name": "Session Piano - Upright",
    "collection": "Session Piano - Upright",
    "collectionSlug": "session-piano-upright",
    "category": "keyboards",
    "moods": [
      "intimate",
      "peaceful"
    ],
    "genres": [
      "cinematic",
      "pop"
    ],
    "roles": [
      "lead",
      "harmony"
    ],
    "isPremium": true,
    "description": "Session Piano - Upright - Musio instrument collection",
    "tags": [
      "keyboards",
      "session",
      "piano",
      "upright"
    ],
    "color": "#4A6A9A",
    "imageUrl": "https://assets.mus.io/54a7970f42264e090ba8d040f7572bf5451c71c8e40fd3e4cf1c17fbdab7b16d.png"
  },
  {
    "id": "sew-what",
    "name": "Sew What",
    "collection": "Sew What",
    "collectionSlug": "sew-what",
    "category": "fx",
    "moods": [],
    "genres": [
      "cinematic"
    ],
    "roles": [
      "texture",
      "accent"
    ],
    "isPremium": true,
    "description": "Sew What - Musio instrument collection",
    "tags": [
      "fx",
      "sew",
      "what"
    ],
    "color": "#5A6A8A",
    "imageUrl": "https://assets.mus.io/954dc7bbfd541771aca0302b4370b4cdf125bc8723e597580bb6d1be9b035d16.png"
  },
  {
    "id": "sketchpad-monochrome",
    "name": "Sketchpad: Monochrome",
    "collection": "Sketchpad: Monochrome",
    "collectionSlug": "sketchpad-monochrome",
    "category": "synths",
    "moods": [
      "dreamy",
      "nostalgic"
    ],
    "genres": [
      "cinematic"
    ],
    "roles": [
      "texture",
      "lead",
      "bass"
    ],
    "isPremium": true,
    "description": "Sketchpad: Monochrome - Musio instrument collection",
    "tags": [
      "synths",
      "sketchpad",
      "monochrome"
    ],
    "color": "#8A5AAA",
    "imageUrl": "https://assets.mus.io/364530a4b828852591dcd5a991df8d037b23f138f219a614afbb0c1657ce4206.png"
  },
  {
    "id": "soundscapes",
    "name": "Soundscapes",
    "collection": "Soundscapes",
    "collectionSlug": "soundscapes",
    "category": "fx",
    "moods": [],
    "genres": [
      "cinematic",
      "ambient"
    ],
    "roles": [
      "texture",
      "accent"
    ],
    "isPremium": true,
    "description": "Soundscapes - Musio instrument collection",
    "tags": [
      "fx",
      "soundscapes"
    ],
    "color": "#5A6A8A",
    "imageUrl": "https://assets.mus.io/79af0ea2adb51f190d1ce24da410de8bd5f0983854b547502f437da800eda226.png"
  },
  {
    "id": "south-african-voices-female",
    "name": "South African Voices: Female Choir",
    "collection": "South African Voices: Female Choir",
    "collectionSlug": "south-african-voices-female",
    "category": "vocals",
    "moods": [
      "epic",
      "peaceful"
    ],
    "genres": [
      "cinematic"
    ],
    "roles": [
      "texture",
      "lead"
    ],
    "isPremium": true,
    "description": "South African Voices: Female Choir - Musio instrument collection",
    "tags": [
      "vocals",
      "south",
      "african",
      "voices",
      "female"
    ],
    "color": "#AA6A7A",
    "imageUrl": "https://assets.mus.io/d2934ebfd43ba560a937f7937b898be2b73b80c5a27aea9e904bb8cfb28e451f.png"
  },
  {
    "id": "south-african-voices-group",
    "name": "South African Voices: Full Choir",
    "collection": "South African Voices: Full Choir",
    "collectionSlug": "south-african-voices-group",
    "category": "vocals",
    "moods": [
      "epic",
      "peaceful"
    ],
    "genres": [
      "cinematic"
    ],
    "roles": [
      "texture",
      "lead"
    ],
    "isPremium": true,
    "description": "South African Voices: Full Choir - Musio instrument collection",
    "tags": [
      "vocals",
      "south",
      "african",
      "voices",
      "group"
    ],
    "color": "#AA6A7A",
    "imageUrl": "https://assets.mus.io/0e85414eb41ca1fd0b4ead9d2dc2820839bca81aa87289ae240d54db4b05ca9c.png"
  },
  {
    "id": "south-african-voices-male",
    "name": "South African Voices: Male Choir",
    "collection": "South African Voices: Male Choir",
    "collectionSlug": "south-african-voices-male",
    "category": "vocals",
    "moods": [
      "epic",
      "peaceful"
    ],
    "genres": [
      "cinematic"
    ],
    "roles": [
      "texture",
      "lead"
    ],
    "isPremium": true,
    "description": "South African Voices: Male Choir - Musio instrument collection",
    "tags": [
      "vocals",
      "south",
      "african",
      "voices",
      "male"
    ],
    "color": "#AA6A7A",
    "imageUrl": "https://assets.mus.io/9f077ca799b8ad1177195ddcc0538bc6db943dd002a90c9f5058e9d2d3896fe1.png"
  },
  {
    "id": "studio-banjo",
    "name": "Studio Banjo",
    "collection": "Studio Banjo",
    "collectionSlug": "studio-banjo",
    "category": "guitars",
    "moods": [],
    "genres": [
      "cinematic"
    ],
    "roles": [
      "lead",
      "rhythm"
    ],
    "isPremium": true,
    "description": "Studio Banjo - Musio instrument collection",
    "tags": [
      "guitars",
      "studio",
      "banjo"
    ],
    "color": "#8A6A4A",
    "imageUrl": "https://assets.mus.io/e5502a0cd8a976a11de9dc67bac51251c7606e5059b14ae3d73b83bd211cb587.png"
  },
  {
    "id": "studio-basses",
    "name": "Studio Basses",
    "collection": "Studio Basses",
    "collectionSlug": "studio-basses",
    "category": "strings",
    "moods": [
      "epic",
      "melancholic"
    ],
    "genres": [
      "cinematic",
      "classical"
    ],
    "roles": [
      "lead",
      "harmony",
      "texture"
    ],
    "isPremium": true,
    "description": "Studio Basses - Musio instrument collection",
    "tags": [
      "strings",
      "studio",
      "basses"
    ],
    "color": "#C4785A",
    "imageUrl": "https://assets.mus.io/faf9cb539067a02deb700f5dd2e9e689a17158f029ab2f63cbddea7bd22d8c7d.png"
  },
  {
    "id": "studio-guitars",
    "name": "Studio Guitars",
    "collection": "Studio Guitars",
    "collectionSlug": "studio-guitars",
    "category": "guitars",
    "moods": [],
    "genres": [
      "cinematic"
    ],
    "roles": [
      "lead",
      "rhythm"
    ],
    "isPremium": true,
    "description": "Studio Guitars - Musio instrument collection",
    "tags": [
      "guitars",
      "studio",
      "guitars"
    ],
    "color": "#8A6A4A",
    "imageUrl": "https://assets.mus.io/c87b6f65857140fb05215c2f122d4ad908dd829c665519ab273f8cbf3698225f.png"
  },
  {
    "id": "sunset-drums",
    "name": "Sunset Drums",
    "collection": "Sunset Drums",
    "collectionSlug": "sunset-drums",
    "category": "percussion",
    "moods": [
      "energetic"
    ],
    "genres": [
      "cinematic"
    ],
    "roles": [
      "percussion",
      "rhythm"
    ],
    "isPremium": true,
    "description": "Sunset Drums - Musio instrument collection",
    "tags": [
      "percussion",
      "sunset",
      "drums"
    ],
    "color": "#B45A5A",
    "imageUrl": "https://assets.mus.io/91eb22dd09987567f022bd5d20ddeb30fe0acf6663710fac40ff5d6d4bf02b4d.png"
  },
  {
    "id": "true-strike",
    "name": "True Strike",
    "collection": "True Strike",
    "collectionSlug": "true-strike",
    "category": "percussion",
    "moods": [
      "energetic"
    ],
    "genres": [
      "cinematic"
    ],
    "roles": [
      "percussion",
      "rhythm"
    ],
    "isPremium": true,
    "description": "True Strike - Musio instrument collection",
    "tags": [
      "percussion",
      "true",
      "strike"
    ],
    "color": "#B45A5A",
    "imageUrl": "https://assets.mus.io/6425208a2d1e0603574f004ed7b0af2f20e55b4b1c36070e56bbb180c06dc507.png"
  },
  {
    "id": "village-drums",
    "name": "Village Drums",
    "collection": "Village Drums",
    "collectionSlug": "village-drums",
    "category": "percussion",
    "moods": [
      "energetic"
    ],
    "genres": [
      "cinematic"
    ],
    "roles": [
      "percussion",
      "rhythm"
    ],
    "isPremium": true,
    "description": "Village Drums - Musio instrument collection",
    "tags": [
      "percussion",
      "village",
      "drums"
    ],
    "color": "#B45A5A",
    "imageUrl": "https://assets.mus.io/ad93c98d63c5ed3248fce564d7e8eb56c0eec9650c362d45b336f283a53c4b65.png"
  },
  {
    "id": "village-mallets",
    "name": "Village Mallets",
    "collection": "Village Mallets",
    "collectionSlug": "village-mallets",
    "category": "percussion",
    "moods": [
      "energetic"
    ],
    "genres": [
      "cinematic"
    ],
    "roles": [
      "percussion",
      "rhythm"
    ],
    "isPremium": true,
    "description": "Village Mallets - Musio instrument collection",
    "tags": [
      "percussion",
      "village",
      "mallets"
    ],
    "color": "#B45A5A",
    "imageUrl": "https://assets.mus.io/54bd0cd6e5ef253d60f49a6546ba706bb6dea43b4985fd38d4288f781f28e33b.png"
  },
  {
    "id": "drum-machine-cr78",
    "name": "Vintage Drum Machine: CR-78",
    "collection": "Vintage Drum Machine: CR-78",
    "collectionSlug": "drum-machine-cr78",
    "category": "percussion",
    "moods": [
      "energetic"
    ],
    "genres": [
      "cinematic"
    ],
    "roles": [
      "percussion",
      "rhythm"
    ],
    "isPremium": true,
    "description": "Vintage Drum Machine: CR-78 - Musio instrument collection",
    "tags": [
      "percussion",
      "drum",
      "machine",
      "cr78"
    ],
    "color": "#B45A5A",
    "imageUrl": "https://assets.mus.io/79f85c7290b2829a4cd371ccc66187b55fc9c0dc6138d099a1070826b7d63bf0.png"
  },
  {
    "id": "drum-machine-cr8000",
    "name": "Vintage Drum Machine: CR-8000",
    "collection": "Vintage Drum Machine: CR-8000",
    "collectionSlug": "drum-machine-cr8000",
    "category": "percussion",
    "moods": [
      "energetic"
    ],
    "genres": [
      "cinematic"
    ],
    "roles": [
      "percussion",
      "rhythm"
    ],
    "isPremium": true,
    "description": "Vintage Drum Machine: CR-8000 - Musio instrument collection",
    "tags": [
      "percussion",
      "drum",
      "machine",
      "cr8000"
    ],
    "color": "#B45A5A",
    "imageUrl": "https://assets.mus.io/d7c286f4b37f45c52af617b9ccd6134d1b91866c5a0aab04c55dae917f3a53b8.jpg"
  },
  {
    "id": "drum-machine-dmx",
    "name": "Vintage Drum Machine: DMX",
    "collection": "Vintage Drum Machine: DMX",
    "collectionSlug": "drum-machine-dmx",
    "category": "percussion",
    "moods": [
      "energetic"
    ],
    "genres": [
      "cinematic"
    ],
    "roles": [
      "percussion",
      "rhythm"
    ],
    "isPremium": true,
    "description": "Vintage Drum Machine: DMX - Musio instrument collection",
    "tags": [
      "percussion",
      "drum",
      "machine",
      "dmx"
    ],
    "color": "#B45A5A",
    "imageUrl": "https://assets.mus.io/53aa0385f47fa30037ec19a256e5c02c1cb3cbcff7b82f2d041050b829dd6f5a.jpg"
  },
  {
    "id": "drum-machine-linndrum",
    "name": "Vintage Drum Machine: LinnDrum",
    "collection": "Vintage Drum Machine: LinnDrum",
    "collectionSlug": "drum-machine-linndrum",
    "category": "percussion",
    "moods": [
      "energetic"
    ],
    "genres": [
      "cinematic"
    ],
    "roles": [
      "percussion",
      "rhythm"
    ],
    "isPremium": true,
    "description": "Vintage Drum Machine: LinnDrum - Musio instrument collection",
    "tags": [
      "percussion",
      "drum",
      "machine",
      "linndrum"
    ],
    "color": "#B45A5A",
    "imageUrl": "https://assets.mus.io/1dc3b4dacb81d6055069258ec6a269c83cad86b713b17791481df36eb62e6cd2.png"
  },
  {
    "id": "drum-machine-sk1",
    "name": "Vintage Drum Machine: SK-1",
    "collection": "Vintage Drum Machine: SK-1",
    "collectionSlug": "drum-machine-sk1",
    "category": "percussion",
    "moods": [
      "energetic"
    ],
    "genres": [
      "cinematic"
    ],
    "roles": [
      "percussion",
      "rhythm"
    ],
    "isPremium": true,
    "description": "Vintage Drum Machine: SK-1 - Musio instrument collection",
    "tags": [
      "percussion",
      "drum",
      "machine",
      "sk1"
    ],
    "color": "#B45A5A",
    "imageUrl": "https://assets.mus.io/e02a46743b8e393a3d9a12537c8a00c1eb2ae5e1dc45133da9f0445aeeff2c6a.png"
  },
  {
    "id": "drum-machine-tr606",
    "name": "Vintage Drum Machine: TR-606",
    "collection": "Vintage Drum Machine: TR-606",
    "collectionSlug": "drum-machine-tr606",
    "category": "percussion",
    "moods": [
      "energetic"
    ],
    "genres": [
      "cinematic",
      "electronic"
    ],
    "roles": [
      "percussion",
      "rhythm"
    ],
    "isPremium": true,
    "description": "Vintage Drum Machine: TR-606 - Musio instrument collection",
    "tags": [
      "percussion",
      "drum",
      "machine",
      "tr606"
    ],
    "color": "#B45A5A",
    "imageUrl": "https://assets.mus.io/2e3a6408b0a7bad733206ba9d78b8be3958043aed8f364f8ae45e5dcb279fc5c.jpg"
  },
  {
    "id": "drum-machine-tr707",
    "name": "Vintage Drum Machine: TR-707",
    "collection": "Vintage Drum Machine: TR-707",
    "collectionSlug": "drum-machine-tr707",
    "category": "percussion",
    "moods": [
      "energetic"
    ],
    "genres": [
      "cinematic",
      "electronic"
    ],
    "roles": [
      "percussion",
      "rhythm"
    ],
    "isPremium": true,
    "description": "Vintage Drum Machine: TR-707 - Musio instrument collection",
    "tags": [
      "percussion",
      "drum",
      "machine",
      "tr707"
    ],
    "color": "#B45A5A",
    "imageUrl": "https://assets.mus.io/62597a20a1387ecff7b22d657ef6d6d8a81f560362cd8e5b384bee578e7aaba3.png"
  },
  {
    "id": "drum-machine-tr808",
    "name": "Vintage Drum Machine: TR-808",
    "collection": "Vintage Drum Machine: TR-808",
    "collectionSlug": "drum-machine-tr808",
    "category": "percussion",
    "moods": [
      "energetic"
    ],
    "genres": [
      "cinematic",
      "electronic"
    ],
    "roles": [
      "percussion",
      "rhythm"
    ],
    "isPremium": true,
    "description": "Vintage Drum Machine: TR-808 - Musio instrument collection",
    "tags": [
      "percussion",
      "drum",
      "machine",
      "tr808"
    ],
    "color": "#B45A5A",
    "imageUrl": "https://assets.mus.io/36893d32b3eba10223a21041004cfe2a52018d5f299e318b709cc3fa955a53fa.png"
  },
  {
    "id": "drum-machine-tr909",
    "name": "Vintage Drum Machine: TR-909",
    "collection": "Vintage Drum Machine: TR-909",
    "collectionSlug": "drum-machine-tr909",
    "category": "percussion",
    "moods": [
      "energetic"
    ],
    "genres": [
      "cinematic",
      "electronic"
    ],
    "roles": [
      "percussion",
      "rhythm"
    ],
    "isPremium": true,
    "description": "Vintage Drum Machine: TR-909 - Musio instrument collection",
    "tags": [
      "percussion",
      "drum",
      "machine",
      "tr909"
    ],
    "color": "#B45A5A",
    "imageUrl": "https://assets.mus.io/4c03b5984c504c0de951b88f6db8ac942b628d544a088a9565f765a16686516f.png"
  },
  {
    "id": "tb303",
    "name": "Vintage Synth Bass: TB-303",
    "collection": "Vintage Synth Bass: TB-303",
    "collectionSlug": "tb303",
    "category": "strings",
    "moods": [
      "epic",
      "melancholic"
    ],
    "genres": [
      "cinematic",
      "electronic",
      "classical"
    ],
    "roles": [
      "lead",
      "harmony",
      "texture"
    ],
    "isPremium": true,
    "description": "Vintage Synth Bass: TB-303 - Musio instrument collection",
    "tags": [
      "strings",
      "tb303"
    ],
    "color": "#C4785A",
    "imageUrl": "https://assets.mus.io/2345cfa1d3d8f7387b475730f239e5e059672a03c3a25c891bf2ce5a10c97ac9.png"
  },
  {
    "id": "arp-quadra",
    "name": "Vintage Synthesizer: Arp Quadra",
    "collection": "Vintage Synthesizer: Arp Quadra",
    "collectionSlug": "arp-quadra",
    "category": "synths",
    "moods": [
      "dreamy",
      "nostalgic"
    ],
    "genres": [
      "cinematic",
      "electronic"
    ],
    "roles": [
      "texture",
      "lead",
      "bass"
    ],
    "isPremium": true,
    "description": "Vintage Synthesizer: Arp Quadra - Musio instrument collection",
    "tags": [
      "synths",
      "arp",
      "quadra"
    ],
    "color": "#8A5AAA",
    "imageUrl": "https://assets.mus.io/45e208bbc3fc57db9012d3dfe03930f36c10036a7566bcd5450d26d62706ecf6.png"
  },
  {
    "id": "jupiter-6",
    "name": "Vintage Synthesizer: Jupiter 6",
    "collection": "Vintage Synthesizer: Jupiter 6",
    "collectionSlug": "jupiter-6",
    "category": "synths",
    "moods": [
      "dreamy",
      "nostalgic"
    ],
    "genres": [
      "cinematic",
      "electronic"
    ],
    "roles": [
      "texture",
      "lead",
      "bass"
    ],
    "isPremium": true,
    "description": "Vintage Synthesizer: Jupiter 6 - Musio instrument collection",
    "tags": [
      "synths",
      "jupiter"
    ],
    "color": "#8A5AAA",
    "imageUrl": "https://assets.mus.io/a2973085bbd4918cf0762de3e7670c508f48060a8693e3e90a5fcd5d28548df9.png"
  },
  {
    "id": "mono-poly",
    "name": "Vintage Synthesizer: Mono-Poly",
    "collection": "Vintage Synthesizer: Mono-Poly",
    "collectionSlug": "mono-poly",
    "category": "synths",
    "moods": [
      "dreamy",
      "nostalgic"
    ],
    "genres": [
      "cinematic",
      "electronic"
    ],
    "roles": [
      "texture",
      "lead",
      "bass"
    ],
    "isPremium": true,
    "description": "Vintage Synthesizer: Mono-Poly - Musio instrument collection",
    "tags": [
      "synths",
      "mono",
      "poly"
    ],
    "color": "#8A5AAA",
    "imageUrl": "https://assets.mus.io/d2c28586b8cd1acd24ad0d5810cb9e593732c6c83eceeb16e447bfbb469bbad9.png"
  },
  {
    "id": "obxa",
    "name": "Vintage Synthesizer: OBXa",
    "collection": "Vintage Synthesizer: OBXa",
    "collectionSlug": "obxa",
    "category": "synths",
    "moods": [
      "dreamy",
      "nostalgic"
    ],
    "genres": [
      "cinematic",
      "electronic"
    ],
    "roles": [
      "texture",
      "lead",
      "bass"
    ],
    "isPremium": true,
    "description": "Vintage Synthesizer: OBXa - Musio instrument collection",
    "tags": [
      "synths",
      "obxa"
    ],
    "color": "#8A5AAA",
    "imageUrl": "https://assets.mus.io/a62dcc5f3a2979a26a14dc2fa7c270b8904bda917860d1c5891fdf8bac9a410d.png"
  },
  {
    "id": "oberheim",
    "name": "Vintage Synthesizer: Oberheim 4",
    "collection": "Vintage Synthesizer: Oberheim 4",
    "collectionSlug": "oberheim",
    "category": "synths",
    "moods": [
      "dreamy",
      "nostalgic"
    ],
    "genres": [
      "cinematic",
      "electronic"
    ],
    "roles": [
      "texture",
      "lead",
      "bass"
    ],
    "isPremium": true,
    "description": "Vintage Synthesizer: Oberheim 4 - Musio instrument collection",
    "tags": [
      "synths",
      "oberheim"
    ],
    "color": "#8A5AAA",
    "imageUrl": "https://assets.mus.io/6becd3b14e87fe32b1252dd4df8d0895933fb5fac8ccf85af2efefbb7ea8e234.png"
  },
  {
    "id": "octave-cat",
    "name": "Vintage Synthesizer: Octave Cat",
    "collection": "Vintage Synthesizer: Octave Cat",
    "collectionSlug": "octave-cat",
    "category": "synths",
    "moods": [
      "dreamy",
      "nostalgic"
    ],
    "genres": [
      "cinematic",
      "electronic"
    ],
    "roles": [
      "texture",
      "lead",
      "bass"
    ],
    "isPremium": true,
    "description": "Vintage Synthesizer: Octave Cat - Musio instrument collection",
    "tags": [
      "synths",
      "octave",
      "cat"
    ],
    "color": "#8A5AAA",
    "imageUrl": "https://assets.mus.io/401360489d2c0824ea175a6a7b437e89ccf4f9882f9340b67ab5de2d7437ba1c.png"
  },
  {
    "id": "ppg-wave-2",
    "name": "Vintage Synthesizer: PPG Wave 2",
    "collection": "Vintage Synthesizer: PPG Wave 2",
    "collectionSlug": "ppg-wave-2",
    "category": "synths",
    "moods": [
      "dreamy",
      "nostalgic"
    ],
    "genres": [
      "cinematic",
      "electronic"
    ],
    "roles": [
      "texture",
      "lead",
      "bass"
    ],
    "isPremium": true,
    "description": "Vintage Synthesizer: PPG Wave 2 - Musio instrument collection",
    "tags": [
      "synths",
      "ppg",
      "wave"
    ],
    "color": "#8A5AAA",
    "imageUrl": "https://assets.mus.io/46981bd50917977d95f2be4d77285028eb8482fa20c0c8d3338d2b6f1e68ab58.png"
  },
  {
    "id": "prophet-5",
    "name": "Vintage Synthesizer: Prophet 5",
    "collection": "Vintage Synthesizer: Prophet 5",
    "collectionSlug": "prophet-5",
    "category": "synths",
    "moods": [
      "dreamy",
      "nostalgic"
    ],
    "genres": [
      "cinematic",
      "electronic"
    ],
    "roles": [
      "texture",
      "lead",
      "bass"
    ],
    "isPremium": true,
    "description": "Vintage Synthesizer: Prophet 5 - Musio instrument collection",
    "tags": [
      "synths",
      "prophet"
    ],
    "color": "#8A5AAA",
    "imageUrl": "https://assets.mus.io/69a153d61124be055ca2526f828a12995f70bcece0b24d3ae41d4c4b340b853c.png"
  },
  {
    "id": "rhodes-chroma",
    "name": "Vintage Synthesizer: Rhodes Chroma",
    "collection": "Vintage Synthesizer: Rhodes Chroma",
    "collectionSlug": "rhodes-chroma",
    "category": "keyboards",
    "moods": [
      "intimate",
      "peaceful"
    ],
    "genres": [
      "cinematic",
      "electronic"
    ],
    "roles": [
      "lead",
      "harmony"
    ],
    "isPremium": true,
    "description": "Vintage Synthesizer: Rhodes Chroma - Musio instrument collection",
    "tags": [
      "keyboards",
      "rhodes",
      "chroma"
    ],
    "color": "#4A6A9A",
    "imageUrl": "https://assets.mus.io/aa5fec9a7b31f8006473cad73916e8597411d66a499c9a5bdab204ba32e6d606.png"
  },
  {
    "id": "synergy",
    "name": "Vintage Synthesizer: Synergy",
    "collection": "Vintage Synthesizer: Synergy",
    "collectionSlug": "synergy",
    "category": "synths",
    "moods": [
      "dreamy",
      "nostalgic"
    ],
    "genres": [
      "cinematic",
      "electronic"
    ],
    "roles": [
      "texture",
      "lead",
      "bass"
    ],
    "isPremium": true,
    "description": "Vintage Synthesizer: Synergy - Musio instrument collection",
    "tags": [
      "synths",
      "synergy"
    ],
    "color": "#8A5AAA",
    "imageUrl": "https://assets.mus.io/f0acf757bb5e1a59097a5c7a82c80c2c8dd907114eed9ff7c0cd57bab4f97353.png"
  },
  {
    "id": "viola-da-gamba",
    "name": "Viola Da Gamba",
    "collection": "Viola Da Gamba",
    "collectionSlug": "viola-da-gamba",
    "category": "strings",
    "moods": [
      "epic",
      "melancholic"
    ],
    "genres": [
      "cinematic",
      "classical"
    ],
    "roles": [
      "lead",
      "harmony",
      "texture"
    ],
    "isPremium": true,
    "description": "Viola Da Gamba - Musio instrument collection",
    "tags": [
      "strings",
      "viola",
      "gamba"
    ],
    "color": "#C4785A",
    "imageUrl": "https://assets.mus.io/d9516bc552065d22d05f816e0b3b678718dbe6062bd59f2ca73b6f01e811a886.png"
  },
  {
    "id": "vision-modern-synths",
    "name": "Vision - Modern Synths",
    "collection": "Vision - Modern Synths",
    "collectionSlug": "vision-modern-synths",
    "category": "synths",
    "moods": [
      "dreamy",
      "nostalgic"
    ],
    "genres": [
      "cinematic",
      "electronic"
    ],
    "roles": [
      "texture",
      "lead",
      "bass"
    ],
    "isPremium": true,
    "description": "Vision - Modern Synths - Musio instrument collection",
    "tags": [
      "synths",
      "vision",
      "modern",
      "synths"
    ],
    "color": "#8A5AAA",
    "imageUrl": "https://assets.mus.io/2e6af0d0ebec8b560d757a1ced41942cab365f0a23db33203ba23ac3a58e88fe.png"
  },
  {
    "id": "voxos",
    "name": "Voxos",
    "collection": "Voxos",
    "collectionSlug": "voxos",
    "category": "vocals",
    "moods": [
      "epic",
      "peaceful"
    ],
    "genres": [
      "cinematic"
    ],
    "roles": [
      "texture",
      "lead"
    ],
    "isPremium": true,
    "description": "Voxos - Musio instrument collection",
    "tags": [
      "vocals",
      "voxos"
    ],
    "color": "#AA6A7A",
    "imageUrl": "https://assets.mus.io/3aada0b9d7c7c93615439275435bcc8a38675b852da64a79ed75b9e08c6ba3d2.png"
  },
  {
    "id": "world-series-iceland",
    "name": "World Series: Iceland",
    "collection": "World Series: Iceland",
    "collectionSlug": "world-series-iceland",
    "category": "world",
    "moods": [
      "mysterious",
      "peaceful"
    ],
    "genres": [
      "cinematic",
      "world"
    ],
    "roles": [
      "lead",
      "texture"
    ],
    "isPremium": true,
    "description": "World Series: Iceland - Musio instrument collection",
    "tags": [
      "world",
      "world",
      "series",
      "iceland"
    ],
    "color": "#9A8A5A",
    "imageUrl": "https://assets.mus.io/f64c5b42672194a44928c3e083e28c783caf07438f7c859d993c781e7cd073d8.png"
  },
  {
    "id": "world-series-ireland",
    "name": "World Series: Ireland",
    "collection": "World Series: Ireland",
    "collectionSlug": "world-series-ireland",
    "category": "world",
    "moods": [
      "mysterious",
      "peaceful"
    ],
    "genres": [
      "cinematic",
      "world"
    ],
    "roles": [
      "lead",
      "texture"
    ],
    "isPremium": true,
    "description": "World Series: Ireland - Musio instrument collection",
    "tags": [
      "world",
      "world",
      "series",
      "ireland"
    ],
    "color": "#9A8A5A",
    "imageUrl": "https://assets.mus.io/ac11f0b5964c1adac570c8ed461264c3f0b8202bf5e113c5a832523ecc3f1bdd.png"
  },
  {
    "id": "world-series-scotland",
    "name": "World Series: Scotland",
    "collection": "World Series: Scotland",
    "collectionSlug": "world-series-scotland",
    "category": "world",
    "moods": [
      "mysterious",
      "peaceful"
    ],
    "genres": [
      "cinematic",
      "world"
    ],
    "roles": [
      "lead",
      "texture"
    ],
    "isPremium": true,
    "description": "World Series: Scotland - Musio instrument collection",
    "tags": [
      "world",
      "world",
      "series",
      "scotland"
    ],
    "color": "#9A8A5A",
    "imageUrl": "https://assets.mus.io/c3e113b30a2ea93b4ba3dd572876b81ff22bdb96601056b842376a2a0ec56c7a.png"
  },
  {
    "id": "world-series-africa",
    "name": "World Series: South Africa",
    "collection": "World Series: South Africa",
    "collectionSlug": "world-series-africa",
    "category": "world",
    "moods": [
      "mysterious",
      "peaceful"
    ],
    "genres": [
      "cinematic",
      "world"
    ],
    "roles": [
      "lead",
      "texture"
    ],
    "isPremium": true,
    "description": "World Series: South Africa - Musio instrument collection",
    "tags": [
      "world",
      "world",
      "series",
      "africa"
    ],
    "color": "#9A8A5A",
    "imageUrl": "https://assets.mus.io/8f010d3e967664b33fd12f6c38f5707bb2daf2c69af31db84bb59623395c3032.png"
  },
  {
    "id": "wurlitzer",
    "name": "Wurly",
    "collection": "Wurly",
    "collectionSlug": "wurlitzer",
    "category": "keyboards",
    "moods": [
      "intimate",
      "peaceful"
    ],
    "genres": [
      "cinematic"
    ],
    "roles": [
      "lead",
      "harmony"
    ],
    "isPremium": true,
    "description": "Wurly - Musio instrument collection",
    "tags": [
      "keyboards",
      "wurlitzer"
    ],
    "color": "#4A6A9A",
    "imageUrl": "https://assets.mus.io/349e1a30f73d4a0bd6d1026fac09540317e37b1d16d9c27619c80deccab708fd.png"
  }
];

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
  collections: 116,
  categories: [...new Set(instruments.map(i => i.category))].length,
};
