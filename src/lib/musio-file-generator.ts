// Musio File Generator
// Generates .musio rack files that can be loaded into the Musio plugin
// Uses instrument UUIDs from the catalog CSV

import { Instrument } from '@/data/full-instruments';
import { collectionDefaultUUIDs, findInstrumentUUID } from '@/data/instrument-uuids';

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

// Known releaseIds from working .musio files
// These map instrumentId -> releaseId
const knownReleaseIds: Record<string, string> = {
  '50f950950abc4251be89e5574777f16b': '8c4633df146e9d37760d138cfe18e35a', // CineLegacy Harp
  '74af6b250bab4382b6b6d911f6a4040a': '50f51b23015aadadb3adb070ccaab1e7', // Kalimba
  'e46b684df0344d868b57ae11895206da': 'd554c2c13511b1d81abaa23e3fb1a1f1', // Session Upright
  'e70adc550937490c959e7cc5d0c09c29': 'a24e77bef8203c758bf2a737cbc2891e', // From musiorack.musio
  '429b5ac8ffb544d6b6e7c981e7808ea1': '0d7323382fb4f331096a3a3392669119', // From musiorack.musio
};

// Generate a releaseId - try known mapping first, then generate a hash
function getReleaseId(instrumentId: string): string {
  // Check if we have a known releaseId for this instrument
  if (knownReleaseIds[instrumentId]) {
    return knownReleaseIds[instrumentId];
  }
  
  // Generate a deterministic releaseId based on the instrumentId
  // This is a fallback - ideally we'd have all releaseIds from the API
  let hash = 0;
  const seed = instrumentId + '_release';
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  
  const absHash = Math.abs(hash);
  const hex1 = absHash.toString(16).padStart(8, '0');
  const hex2 = ((absHash * 31) & 0xffffffff).toString(16).padStart(8, '0');
  const hex3 = ((absHash * 127) & 0xffffffff).toString(16).padStart(8, '0');
  const hex4 = ((absHash * 255) & 0xffffffff).toString(16).padStart(8, '0');
  return (hex1 + hex2 + hex3 + hex4).substring(0, 32);
}

// Get the instrument UUID from the catalog
function getInstrumentUUID(instrument: Instrument): string {
  // First try to find by instrument name and collection
  const uuid = findInstrumentUUID(instrument.collectionSlug, instrument.name);
  if (uuid) return uuid;
  
  // Fall back to collection default
  const defaultUuid = collectionDefaultUUIDs[instrument.collectionSlug];
  if (defaultUuid) return defaultUuid;
  
  // Last resort: generate a placeholder (won't work in Musio)
  let hash = 0;
  const seed = instrument.collectionSlug + instrument.name;
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
  // Get the real UUID for this instrument from the catalog
  const instrumentId = config?.instrumentId || getInstrumentUUID(instrument);
  const releaseId = config?.releaseId || getReleaseId(instrumentId);
  
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
