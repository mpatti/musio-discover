'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Sparkles, 
  RefreshCw, 
  X, 
  Layers,
  Wand2
} from 'lucide-react';
import { 
  instruments, 
  catalogStats,
  Instrument,
  InstrumentCategory
} from '@/data/full-instruments';
import { 
  quickRecommend, 
  Combo, 
  InstrumentWithRole,
} from '@/lib/recommendation-engine';


// Gradient backgrounds for instrument cards
const categoryGradients: Record<InstrumentCategory, string> = {
  strings: 'linear-gradient(135deg, #8B4513 0%, #D2691E 50%, #A0522D 100%)',
  brass: 'linear-gradient(135deg, #B8860B 0%, #DAA520 50%, #FFD700 100%)',
  woodwinds: 'linear-gradient(135deg, #2F4F4F 0%, #3D5A5A 50%, #4A6B6B 100%)',
  percussion: 'linear-gradient(135deg, #8B0000 0%, #A52A2A 50%, #CD5C5C 100%)',
  keyboards: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 50%, #0F3460 100%)',
  synths: 'linear-gradient(135deg, #4A0080 0%, #7B2CBF 50%, #9D4EDD 100%)',
  vocals: 'linear-gradient(135deg, #FF6B35 0%, #FF8C61 50%, #FFAB8A 100%)',
  world: 'linear-gradient(135deg, #C4A35A 0%, #D4AF37 50%, #E4C16A 100%)',
  guitars: 'linear-gradient(135deg, #654321 0%, #8B5A2B 50%, #A0522D 100%)',
  bass: 'linear-gradient(135deg, #191970 0%, #2F2F70 50%, #4B4B80 100%)',
  orchestral: 'linear-gradient(135deg, #2C1810 0%, #4A2C20 50%, #6B4030 100%)',
  fx: 'linear-gradient(135deg, #1A1A2E 0%, #2D2D44 50%, #3D3D5C 100%)',
  other: 'linear-gradient(135deg, #333333 0%, #555555 50%, #777777 100%)',
};

// Musio Logo Component - uses the official PNG logo
function MusioLogo() {
  return (
    <img 
      src="/musio-logo.png" 
      alt="Musio" 
      width={40} 
      height={40}
      className="object-contain"
    />
  );
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'discover' | 'catalog'>('discover');
  const [combos, setCombos] = useState<Combo[]>([]);
  const [selectedCombo, setSelectedCombo] = useState<Combo | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [palette, setPalette] = useState<Instrument[]>([]);
  const [catalogSearchQuery, setCatalogSearchQuery] = useState('');

  // Quick prompts - expanded suggestions
  const allQuickPrompts = [
    // Cinematic & Film
    'Epic orchestral battle',
    'Dark thriller suspense',
    'Romantic film score',
    'Sci-fi space exploration',
    'Historical drama',
    'Horror tension builder',
    'Adventure quest theme',
    'Emotional documentary',
    
    // Mood-based
    'Dreamy ambient textures',
    'Melancholic reflection',
    'Triumphant victory',
    'Mysterious discovery',
    'Peaceful meditation',
    'Intense action sequence',
    'Nostalgic memories',
    'Hopeful new beginning',
    
    // Genre-specific
    'Intimate piano ballad',
    'Energetic pop anthem',
    'Jazz lounge vibes',
    'Electronic synthwave',
    'Folk acoustic warmth',
    'Classical string quartet',
    'Cinematic trailer hit',
    'Hybrid orchestral EDM',
    
    // World & Cultural
    'World fusion journey',
    'Celtic mystical forest',
    'African rhythmic celebration',
    'Nordic frozen landscapes',
    'Irish tavern gathering',
    'Icelandic ethereal voices',
    
    // Specific Ensembles
    'Full orchestra tutti',
    'Brass fanfare',
    'String ensemble emotional',
    'Woodwind pastoral',
    'Percussion ensemble',
    'Vocal choir ethereal',
    'Piano and strings duo',
    'Synth and orchestra hybrid',
    
    // Use Cases
    'Video game boss fight',
    'Podcast intro music',
    'Wedding ceremony',
    'Corporate presentation',
    'Nature documentary',
    'Sports highlight reel',
    'Meditation app background',
    'True crime podcast',
  ];
  
  // Show 4 prompts - shuffle only on client to avoid hydration mismatch
  const [shuffledPrompts, setShuffledPrompts] = useState(allQuickPrompts.slice(0, 4));
  
  useEffect(() => {
    setShuffledPrompts([...allQuickPrompts].sort(() => Math.random() - 0.5).slice(0, 4));
  }, []);

  const handleGenerate = async (query?: string) => {
    setIsGenerating(true);
    const prompt = query || searchQuery || 'cinematic orchestral';
    
    try {
      // Try Claude API with 10 second timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      
      if (response.ok) {
        const data = await response.json();
        if (data.combos && data.combos.length > 0) {
          setCombos(data.combos);
          setSelectedCombo(data.combos[0]);
          setIsGenerating(false);
          return;
        }
      }
    } catch (error) {
      console.log('Claude API unavailable, using local engine');
    }
    
    // Fallback to local engine
    const generatedCombos = quickRecommend(prompt, 12);
    setCombos(generatedCombos);
    setSelectedCombo(generatedCombos[0] || null);
    setIsGenerating(false);
  };

  const addToPalette = (instrument: Instrument) => {
    if (!palette.find(i => i.id === instrument.id)) {
      setPalette([...palette, instrument]);
    }
  };

  const removeFromPalette = (id: string) => {
    setPalette(palette.filter(i => i.id !== id));
  };

  // Unique collections for catalog view (one per collectionSlug)
  const uniqueCollections = useMemo(() => {
    const seen = new Set<string>();
    return instruments.filter(i => {
      if (seen.has(i.collectionSlug)) return false;
      seen.add(i.collectionSlug);
      return true;
    });
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      {/* Header */}
      <header className="header sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <MusioLogo />
            </div>

            {/* Navigation */}
            <nav className="flex items-center gap-1">
              <button 
                onClick={() => setActiveTab('discover')}
                className={`nav-link ${activeTab === 'discover' ? 'active' : ''}`}
              >
                Discover
              </button>
              <button 
                onClick={() => setActiveTab('catalog')}
                className={`nav-link ${activeTab === 'catalog' ? 'active' : ''}`}
              >
                Catalog
              </button>
            </nav>

            {/* Stats - actual Musio catalog numbers */}
            <div className="flex items-center gap-4 text-sm text-[var(--color-text-muted)]">
              <span>{catalogStats.totalInstruments.toLocaleString()} instruments</span>
              <span>{catalogStats.collections} collections</span>
            </div>
          </div>
        </div>
      </header>

      <main>
        {activeTab === 'discover' ? (
          <>
            {/* Hero Section with Backdrop Mosaic */}
            <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
              {/* Background Mosaic Grid */}
              <div className="absolute inset-0 grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-1 opacity-80">
                {uniqueCollections.slice(0, 48).map((inst, idx) => (
                  <div 
                    key={inst.collectionSlug + idx}
                    className="aspect-square relative overflow-hidden"
                    style={{
                      transform: `scale(${1 + (idx % 3) * 0.1})`,
                      opacity: 0.6 + (idx % 4) * 0.1
                    }}
                  >
                    {inst.imageUrl ? (
                      <img 
                        src={inst.imageUrl}
                        alt=""
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div 
                        className="w-full h-full"
                        style={{ background: categoryGradients[inst.category] }}
                      />
                    )}
                  </div>
                ))}
              </div>
              
              {/* Dark Gradient Overlay - lighter version */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-[var(--color-bg-primary)]" />
              
              {/* Radial Gradient for Center Focus - lighter */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_80%)]" />

              {/* Content */}
              <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">
                  Musio Rack Generator
                </h1>
                
                {/* Search Section */}
                <div className="relative mb-6">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-muted)]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                    placeholder="Describe your composition... (e.g., 'epic orchestral battle scene')"
                    className="input-search w-full bg-black/50 backdrop-blur-md border-white/20"
                  />
                  <button 
                    onClick={() => handleGenerate()}
                    disabled={isGenerating}
                    className="btn-primary absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2"
                  >
                    {isGenerating ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <Wand2 className="w-4 h-4" />
                    )}
                    Generate
                  </button>
                </div>

                {/* Quick Prompts */}
                <div className="flex flex-wrap justify-center gap-2">
                  {shuffledPrompts.slice(0, 4).map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => {
                        setSearchQuery(prompt);
                        handleGenerate(prompt);
                      }}
                      className="chip bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* Results Section */}
            <section className="max-w-7xl mx-auto px-6 py-6">
            <AnimatePresence mode="wait">
              {combos.length > 0 ? (
                <motion.section
                  key="results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Combo List */}
                    <div className="space-y-3">
                      <h3 className="section-title flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[var(--color-musio-red)]" />
                        Suggested Instrument Racks
                      </h3>
                      {combos.map((combo, index) => (
                        <motion.div
                          key={combo.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          onClick={() => setSelectedCombo(combo)}
                          className={`combo-card ${selectedCombo?.id === combo.id ? 'selected' : ''}`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-semibold text-sm">{combo.name}</h4>
                            <span className="text-xs text-[var(--color-text-muted)]">
                              {combo.instruments.length} instruments
                            </span>
                          </div>
                          
                          {/* Mini palette preview */}
                          <div className="flex gap-0.5 h-2 rounded overflow-hidden mb-3">
                            {combo.instruments.map((inst) => (
                              <div
                                key={inst.id}
                                className="flex-1 h-full"
                                style={{ backgroundColor: inst.color }}
                              />
                            ))}
                          </div>

                          <div className="flex flex-wrap gap-1">
                            {combo.tags.slice(0, 3).map(tag => (
                              <span key={tag} className="badge badge-category">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Selected Combo Detail */}
                    <div className="lg:col-span-2">
                      {selectedCombo && (
                        <motion.div
                          key={selectedCombo.id}
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="bg-[var(--color-bg-card)] rounded-xl overflow-hidden"
                        >
                          {/* Header */}
                          <div className="p-5 border-b border-[var(--color-border)]">
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="text-xl font-bold">{selectedCombo.name}</h3>
                                  {selectedCombo.generatedBy === 'claude' && (
                                    <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-gradient-to-r from-[#D97706] to-[#F59E0B] text-white">
                                      ✨ AI Generated
                                    </span>
                                  )}
                                </div>
                                <p className="text-sm text-[var(--color-text-secondary)]">
                                  {selectedCombo.description}
                                </p>
                              </div>
                            </div>

                            {/* Download Button */}
                            <button
                              disabled
                              className="btn-primary flex items-center gap-2 text-sm opacity-50 cursor-not-allowed mt-4"
                              title="Coming soon"
                            >
                              Download Rack
                            </button>

                            {/* Sonic Palette */}
                            <div className="mt-4">
                              <p className="text-xs text-[var(--color-text-muted)] mb-2">Sonic Palette</p>
                              <div className="flex gap-1 h-6 rounded-lg overflow-hidden">
                                {selectedCombo.instruments.map((inst, i) => (
                                  <motion.div
                                    key={inst.id}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${100 / selectedCombo.instruments.length}%` }}
                                    transition={{ delay: i * 0.05 }}
                                    className="h-full cursor-pointer hover:opacity-80 transition-opacity"
                                    style={{ backgroundColor: inst.color }}
                                    title={inst.name}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Instruments Grid */}
                          <div className="p-5">
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                              {selectedCombo.instruments.map((instrument, index) => (
                                <motion.div
                                  key={instrument.id}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: index * 0.05 }}
                                  className="instrument-card group"
                                >
                                  {/* Cover */}
                                  <div 
                                    className="cover relative"
                                    style={{ background: categoryGradients[instrument.category] }}
                                  >
                                    {instrument.imageUrl && (
                                      <img 
                                        src={instrument.imageUrl} 
                                        alt={instrument.name}
                                        loading="eager"
                                        className="absolute inset-0 w-full h-full object-cover"
                                      />
                                    )}
                                    {!instrument.imageUrl && (
                                      <div className="absolute inset-0 flex flex-col items-center justify-center p-3">
                                        <span className="text-3xl mb-2 opacity-90">
                                          {instrument.category === 'strings' && '🎻'}
                                          {instrument.category === 'brass' && '🎺'}
                                          {instrument.category === 'woodwinds' && '🎷'}
                                          {instrument.category === 'percussion' && '🥁'}
                                          {instrument.category === 'keyboards' && '🎹'}
                                          {instrument.category === 'synths' && '🎛️'}
                                          {instrument.category === 'vocals' && '🎤'}
                                          {instrument.category === 'world' && '🌍'}
                                          {instrument.category === 'guitars' && '🎸'}
                                          {instrument.category === 'bass' && '🎸'}
                                          {instrument.category === 'orchestral' && '🎼'}
                                          {instrument.category === 'fx' && '✨'}
                                          {instrument.category === 'other' && '🎵'}
                                        </span>
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-white/80">
                                          {instrument.category}
                                        </span>
                                      </div>
                                    )}

                                    {/* Premium badge */}
                                  </div>

                                  {/* Info */}
                                  <div className="info">
                                    <p className="title">{instrument.name}</p>
                                    <p className="subtitle">{instrument.collection}</p>
                                    <div className="flex items-center gap-1 mt-2">
                                      <span className="badge badge-category text-[10px] py-0.5">
                                        {instrument.assignedRole}
                                      </span>
                                    </div>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </div>

                          {/* Tags */}
                          <div className="px-5 pb-5">
                            <div className="flex flex-wrap gap-2">
                              {selectedCombo.moods.slice(0, 4).map(mood => (
                                <span key={mood} className="chip text-xs">
                                  {mood}
                                </span>
                              ))}
                              {selectedCombo.genres.slice(0, 3).map(genre => (
                                <span key={genre} className="chip text-xs">
                                  {genre}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.section>
              ) : null}
            </AnimatePresence>
            </section>
          </>
        ) : (
          /* Catalog Tab - Full Catalog View */
          <section className="max-w-7xl mx-auto px-6 py-6">
            {/* Search */}
            <div className="max-w-md mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-muted)]" />
                <input
                  type="text"
                  placeholder="Search all collections..."
                  value={catalogSearchQuery}
                  onChange={(e) => setCatalogSearchQuery(e.target.value)}
                  className="input-search w-full"
                />
              </div>
              {catalogSearchQuery && (
                <p className="text-center text-sm text-[var(--color-text-muted)] mt-2">
                  Found {uniqueCollections.filter(i => 
                    i.collection.toLowerCase().includes(catalogSearchQuery.toLowerCase()) ||
                    i.collectionSlug.toLowerCase().includes(catalogSearchQuery.toLowerCase()) ||
                    i.category.toLowerCase().includes(catalogSearchQuery.toLowerCase()) ||
                    i.tags.some(t => t.toLowerCase().includes(catalogSearchQuery.toLowerCase()))
                  ).length} collections
                </p>
              )}
            </div>

            {/* All Collections Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {uniqueCollections
                .filter(i => {
                  if (!catalogSearchQuery) return true;
                  const query = catalogSearchQuery.toLowerCase();
                  return (
                    i.collection.toLowerCase().includes(query) ||
                    i.collectionSlug.toLowerCase().includes(query) ||
                    i.category.toLowerCase().includes(query) ||
                    i.tags.some(t => t.toLowerCase().includes(query))
                  );
                })
                .map((instrument) => (
                <div
                  key={instrument.collectionSlug}
                  className="instrument-card group catalog-item"
                  onClick={() => addToPalette(instrument)}
                >
                  <div 
                    className="cover relative"
                    style={{ background: categoryGradients[instrument.category] }}
                  >
                    {instrument.imageUrl && (
                      <img 
                        src={instrument.imageUrl} 
                        alt={instrument.collection}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    )}
                    {!instrument.imageUrl && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
                        <span className="cover-text text-xs leading-tight">
                          {instrument.collection}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="info">
                    <p className="title">{instrument.collection}</p>
                    <p className="subtitle">{instrument.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Palette Bar */}
      <AnimatePresence>
        {palette.length > 0 && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="palette-bar fixed bottom-0 left-0 right-0 z-50"
          >
            <div className="max-w-7xl mx-auto px-6 py-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[var(--color-musio-red)]" />
                  <span className="text-sm font-medium">My Palette ({palette.length})</span>
                </div>

                <div className="flex-1 flex gap-2 overflow-x-auto pb-1">
                  {palette.map(instrument => (
                    <motion.div
                      key={instrument.id}
                      layout
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="flex-shrink-0 flex items-center gap-2 bg-[var(--color-bg-card)] rounded-lg px-3 py-2 group"
                    >
                      <div 
                        className="w-2 h-6 rounded-full"
                        style={{ backgroundColor: instrument.color }}
                      />
                      <span className="text-sm whitespace-nowrap">{instrument.name}</span>
                      <button
                        onClick={() => removeFromPalette(instrument.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity hover:text-[var(--color-musio-red)]"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    disabled
                    className="btn-primary flex items-center gap-2 text-sm py-1.5 px-3 opacity-50 cursor-not-allowed"
                    title="Coming soon"
                  >
                    Download Rack
                  </button>
                  <button
                    onClick={() => setPalette([])}
                    className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
