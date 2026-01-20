// Musio File Generator
// Generates .musio rack files that can be loaded into the Musio plugin
// Uses real instrument UUIDs from the catalog

import { Instrument } from '@/data/full-instruments';
import { findInstrumentUUID, getRandomUUID, collectionDefaultUUIDs } from '@/data/instrument-uuids';

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

// Generate a release ID based on the instrument UUID
// The release ID is derived from the UUID
function generateReleaseId(instrumentUuid: string): string {
  let hash = 0;
  for (let i = 0; i < instrumentUuid.length; i++) {
    const char = instrumentUuid.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  
  const absHash = Math.abs(hash);
  const hex1 = absHash.toString(16).padStart(8, '0');
  const hex2 = (absHash * 31).toString(16).padStart(8, '0');
  const hex3 = (absHash * 127).toString(16).padStart(8, '0');
  const hex4 = (absHash * 255).toString(16).padStart(8, '0');
  return (hex1 + hex2 + hex3 + hex4).substring(0, 32);
}

// Get the real UUID for an instrument
function getInstrumentUUID(instrument: Instrument): string {
  // First try to find by instrument name and collection
  const uuid = findInstrumentUUID(instrument.collectionSlug, instrument.name);
  if (uuid) return uuid;
  
  // Fall back to collection default
  const defaultUuid = collectionDefaultUUIDs[instrument.collectionSlug];
  if (defaultUuid) return defaultUuid;
  
  // Last resort: get a random one from the collection
  const randomUuid = getRandomUUID(instrument.collectionSlug);
  if (randomUuid) return randomUuid;
  
  // Ultimate fallback: generate a placeholder
  return generatePlaceholderUUID(instrument.collectionSlug + instrument.name);
}

// Generate a placeholder UUID as last resort
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
  // Get the real UUID for this instrument
  const instrumentId = config?.instrumentId || getInstrumentUUID(instrument);
  const releaseId = config?.releaseId || generateReleaseId(instrumentId);
  
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
