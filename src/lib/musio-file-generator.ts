// Musio File Generator
// Generates .musio rack files that can be loaded into the Musio plugin

import { Instrument } from '@/data/all-instruments';
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

// Generate a placeholder ID (32-char hex) based on instrument name
// This is a fallback - real IDs from the catalog are preferred
function generatePlaceholderId(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  
  // Generate a 32-char hex string
  const hex = Math.abs(hash).toString(16).padStart(8, '0');
  return (hex + hex + hex + hex).substring(0, 32);
}

export function getInstrumentIds(instrument: Instrument): { instrumentId: string; releaseId: string } {
  // Check if we have IDs from the scraped catalog
  if (instrumentIdMappings[instrument.collectionSlug]) {
    return instrumentIdMappings[instrument.collectionSlug];
  }
  
  // Fallback to placeholder IDs for any missing instruments
  return {
    instrumentId: generatePlaceholderId(instrument.collectionSlug + '-inst'),
    releaseId: generatePlaceholderId(instrument.collectionSlug + '-release'),
  };
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
  const ids = getInstrumentIds(instrument);
  const instrumentId = config?.instrumentId || ids.instrumentId;
  const releaseId = config?.releaseId || ids.releaseId;
  
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
