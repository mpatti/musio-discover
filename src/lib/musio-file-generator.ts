// Musio File Generator
// Generates .musio rack files that can be loaded into the Musio plugin
// Uses collection-level instrument IDs that Musio recognizes

import { Instrument } from '@/data/full-instruments';
import { instrumentIdMappings } from '@/data/instrument-id-mappings';

export interface MusioInstrumentConfig {
  instrumentId: string;
  releaseId: string;
  midiChannel?: number;
  masterVolGain?: number;
  muted?: boolean;
  output?: number;
}

// Default instrument settings
const DEFAULT_SETTINGS = {
  MasterVolGain: '0.5011872053146362',
  MidiChannel: '1',
  Muted: '0',
  Output: '0',
  PitchBendDownSemiTones: '2',
  PitchBendUpSemiTones: '2',
  SoloMuted: '0',
  Solod: '0',
};

// Default performable data for most instruments
const DEFAULT_PERFORMABLE_DATA = [
  { id: 'expression', value: '1', inputCc: '11' },
  { id: 'reverb_dry', value: '1', inputCc: '-1' },
  { id: 'reverb_wet', value: '0.5', inputCc: '91' },
  { id: 'reverb_damping', value: '0.7', inputCc: '-1' },
  { id: 'reverb_decay', value: '0.666667', inputCc: '-1' },
  { id: 'reverb_bypass', value: '0', inputCc: '-1' },
];

// Slug normalization to match the mappings format
function normalizeSlug(slug: string): string {
  // Try variations of the slug to match the mappings
  const variations = [
    slug,
    slug.replace(/-core$/, ''),
    slug.replace(/-pro$/, ''),
    slug.replace(/^artist-series-/, ''),
    slug.replace(/^create-series-/, ''),
    slug.replace(/^vintage-drum-machine-/, 'drum-machine-'),
    slug.replace(/^vintage-synthesizer-/, ''),
    slug.replace(/^vintage-synth-bass-/, ''),
    slug.replace(/-1$/, ''),
  ];
  
  for (const variation of variations) {
    if (instrumentIdMappings[variation]) {
      return variation;
    }
  }
  
  return slug;
}

// Get the instrument IDs for a collection
function getInstrumentIds(collectionSlug: string): { instrumentId: string; releaseId: string } | null {
  const normalizedSlug = normalizeSlug(collectionSlug);
  return instrumentIdMappings[normalizedSlug] || null;
}

// Generate a placeholder UUID as fallback
function generatePlaceholderUUID(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  const hex = Math.abs(hash).toString(16).padStart(8, '0');
  return (hex + hex + hex + hex).substring(0, 32);
}

function generatePerformableDataXml(data: { id: string; value: string; inputCc: string }[]): string {
  return data.map(d => 
    `      <PerformableData id="${d.id}" value="${d.value}" inputCc="${d.inputCc}"/>`
  ).join('\n');
}

function generateInstrumentXml(
  instrument: Instrument, 
  slotOrder: number,
  config?: Partial<MusioInstrumentConfig>
): string {
  // Get the real IDs for this collection from the mappings
  const ids = getInstrumentIds(instrument.collectionSlug);
  
  let instrumentId: string;
  let releaseId: string;
  
  if (ids) {
    instrumentId = config?.instrumentId || ids.instrumentId;
    releaseId = config?.releaseId || ids.releaseId;
  } else {
    // Fallback to generated placeholders (these won't work but prevent crashes)
    console.warn(`No mapping found for collection: ${instrument.collectionSlug}`);
    instrumentId = config?.instrumentId || generatePlaceholderUUID(instrument.collectionSlug + '-inst');
    releaseId = config?.releaseId || generatePlaceholderUUID(instrument.collectionSlug + '-release');
  }
  
  const settings = {
    ...DEFAULT_SETTINGS,
    MidiChannel: String(config?.midiChannel || 1),
    MasterVolGain: String(config?.masterVolGain || DEFAULT_SETTINGS.MasterVolGain),
    Muted: config?.muted ? '1' : '0',
    Output: String(config?.output || 0),
  };
  
  return `    <Instrument instrumentId="${instrumentId}" releaseId="${releaseId}"
                MasterVolGain="${settings.MasterVolGain}" MidiChannel="${settings.MidiChannel}" Muted="${settings.Muted}"
                Output="${settings.Output}" PitchBendDownSemiTones="${settings.PitchBendDownSemiTones}" PitchBendUpSemiTones="${settings.PitchBendUpSemiTones}"
                SoloMuted="${settings.SoloMuted}" Solod="${settings.Solod}" slotOrder="${slotOrder}">
${generatePerformableDataXml(DEFAULT_PERFORMABLE_DATA)}
    </Instrument>`;
}

export function generateMusioFile(instruments: Instrument[], name?: string): string {
  const instrumentsXml = instruments
    .map((inst, index) => generateInstrumentXml(inst, index))
    .join('\n');
  
  const xml = `<?xml version="1.0" encoding="UTF-8"?>

<MusioFile FileVersion="0.0.1">
  <InstrumentEngineRack>
${instrumentsXml}
  </InstrumentEngineRack>
</MusioFile>
`;
  
  return xml;
}

// Generate a downloadable blob
export function generateMusioBlob(instruments: Instrument[]): Blob {
  const xml = generateMusioFile(instruments);
  return new Blob([xml], { type: 'application/xml' });
}

// Generate filename from combo name
export function generateFilename(comboName: string): string {
  const sanitized = comboName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return `${sanitized}.musio`;
}

// Download a rack file
export function downloadMusioRack(instruments: Instrument[], comboName: string): void {
  const blob = generateMusioBlob(instruments);
  const url = URL.createObjectURL(blob);
  const filename = generateFilename(comboName);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
