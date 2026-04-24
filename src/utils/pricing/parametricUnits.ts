/* ─── Segal Build — Parametric Unit Library ───────────────────────────────────
 * Rawlinsons 2025 methodology rates — labour + materials per unit, ex GST.
 * All rates are EDITABLE DEFAULTS — verify against current Rawlinsons edition
 * or supplier quotes before issuing to clients.
 * ─────────────────────────────────────────────────────────────────────────── */

export type PhaseKey = 'preparation' | 'structure' | 'services' | 'finishes' | 'external';

export type ParametricUnit = {
  id: string;
  categoryId: string;
  label: string;
  description: string;
  unit: 'each' | 'lm' | 'm2' | 'allow';
  rate: number;
  trade: string;
  defaultQty?: number;
  complianceRef?: string;
  phase?: PhaseKey;
};

export const PARAMETRIC_UNITS: ParametricUnit[] = [

  // ─── ELECTRICAL (services) ─────────────────────────────────────────────────
  { id: 'el-gpo-double',    categoryId: 'electrical', label: 'Double GPO (power point)',      description: 'Supply & install double GPO',                    unit: 'each',  rate: 110,  trade: 'Electrical',  defaultQty: 4, phase: 'services' },
  { id: 'el-gpo-usb',       categoryId: 'electrical', label: 'USB GPO (double + USB)',        description: 'Supply & install double GPO with USB charging',  unit: 'each',  rate: 145,  trade: 'Electrical',  defaultQty: 1, phase: 'services' },
  { id: 'el-downlight',     categoryId: 'electrical', label: 'LED Downlight',                 description: 'Supply & install dimmable LED downlight',        unit: 'each',  rate: 85,   trade: 'Electrical',  defaultQty: 6, phase: 'services' },
  { id: 'el-switch',        categoryId: 'electrical', label: 'Light Switch (single)',          description: 'Supply & install single gang light switch',      unit: 'each',  rate: 65,   trade: 'Electrical',  defaultQty: 2, phase: 'services' },
  { id: 'el-switch-2g',     categoryId: 'electrical', label: 'Light Switch (double gang)',     description: 'Supply & install double gang light switch',      unit: 'each',  rate: 75,   trade: 'Electrical',  defaultQty: 1, phase: 'services' },
  { id: 'el-exhaust-fan',   categoryId: 'electrical', label: 'Exhaust Fan (ducted)',           description: 'Supply & install exhaust fan ducted to outside', unit: 'each',  rate: 350,  trade: 'Electrical',  defaultQty: 1, phase: 'services' },
  { id: 'el-heat-lamp',     categoryId: 'electrical', label: 'Bathroom Heat Lamp / Fan Unit', description: 'Supply & install 3-in-1 heat lamp, fan, light',  unit: 'each',  rate: 450,  trade: 'Electrical',  defaultQty: 1, phase: 'services' },
  { id: 'el-smoke-alarm',   categoryId: 'electrical', label: 'Smoke Alarm (240V)',            description: '240V photoelectric interconnected smoke alarm',  unit: 'each',  rate: 150,  trade: 'Electrical',  defaultQty: 2, phase: 'services' },
  { id: 'el-data-cat6',     categoryId: 'electrical', label: 'Data Point (Cat6)',             description: 'Cat6 data point — wired to patch panel',        unit: 'each',  rate: 195,  trade: 'Electrical',  defaultQty: 1, phase: 'services' },
  { id: 'el-tv-point',      categoryId: 'electrical', label: 'TV Antenna Point',              description: 'Supply & install TV antenna outlet',             unit: 'each',  rate: 120,  trade: 'Electrical',  defaultQty: 1, phase: 'services' },
  { id: 'el-outside-light', categoryId: 'electrical', label: 'External Light Point',          description: 'Supply & install external light fitting',        unit: 'each',  rate: 195,  trade: 'Electrical',  defaultQty: 1, phase: 'services' },
  { id: 'el-sensor-light',  categoryId: 'electrical', label: 'Sensor Light (security)',       description: 'Supply & install motion sensor security light',  unit: 'each',  rate: 220,  trade: 'Electrical',  defaultQty: 1, phase: 'services' },
  { id: 'el-switchboard',   categoryId: 'electrical', label: 'Switchboard Upgrade',           description: 'Upgrade switchboard with safety switches',       unit: 'allow', rate: 2200, trade: 'Electrical',  defaultQty: 1, phase: 'services' },
  { id: 'el-circuit',       categoryId: 'electrical', label: 'New Power Circuit',             description: 'Run new dedicated power circuit from board',     unit: 'each',  rate: 380,  trade: 'Electrical',  defaultQty: 1, phase: 'services' },

  // ─── PLUMBING & DRAINAGE (services) ────────────────────────────────────────
  { id: 'pl-water-pt',      categoryId: 'plumbing', label: 'Water Point (Rough-In)',          description: 'Rough-in hot or cold water service point',       unit: 'each',  rate: 180,  trade: 'Plumbing',    defaultQty: 3, phase: 'services' },
  { id: 'pl-drain-pt',      categoryId: 'plumbing', label: 'Drainage Point (Rough-In)',       description: 'Rough-in waste drainage point',                  unit: 'each',  rate: 220,  trade: 'Plumbing',    defaultQty: 3, phase: 'services' },
  { id: 'pl-toilet-suite',  categoryId: 'plumbing', label: 'Toilet Suite (Back-to-Wall)',     description: 'Supply & install back-to-wall toilet suite',     unit: 'each',  rate: 650,  trade: 'Plumbing',    defaultQty: 1, phase: 'services' },
  { id: 'pl-shower-mixer',  categoryId: 'plumbing', label: 'Shower Mixer + Rose',             description: 'Supply & install shower mixer tap + shower rose',unit: 'each',  rate: 380,  trade: 'Plumbing',    defaultQty: 1, phase: 'services' },
  { id: 'pl-basin-mixer',   categoryId: 'plumbing', label: 'Basin Mixer Tap',                 description: 'Supply & install basin mixer tapware',           unit: 'each',  rate: 280,  trade: 'Plumbing',    defaultQty: 1, phase: 'services' },
  { id: 'pl-floor-waste',   categoryId: 'plumbing', label: 'Floor Waste',                     description: 'Supply & install chrome floor waste grate',      unit: 'each',  rate: 120,  trade: 'Plumbing',    defaultQty: 1, phase: 'services' },
  { id: 'pl-hw-sys',        categoryId: 'plumbing', label: 'Hot Water System (26L Gas)',       description: 'Supply & install continuous flow gas HW system', unit: 'allow', rate: 2500, trade: 'Plumbing',    defaultQty: 1, phase: 'services' },
  { id: 'pl-hw-elec',       categoryId: 'plumbing', label: 'Hot Water System (Electric)',      description: 'Supply & install electric storage HW system',    unit: 'allow', rate: 1800, trade: 'Plumbing',    defaultQty: 1, phase: 'services' },
  { id: 'pl-pressure-test', categoryId: 'plumbing', label: 'Pressure Test',                   description: 'Pressure test all new plumbing lines',           unit: 'allow', rate: 250,  trade: 'Plumbing',    defaultQty: 1, phase: 'services' },
  { id: 'pl-garden-tap',    categoryId: 'plumbing', label: 'Garden Tap (External)',            description: 'Supply & install external garden tap hose cock', unit: 'each',  rate: 180,  trade: 'Plumbing',    defaultQty: 1, phase: 'services' },
  { id: 'pl-washing-taps',  categoryId: 'plumbing', label: 'Washing Machine Taps',            description: 'Supply & install cold + hot washing machine taps',unit: 'each', rate: 220,  trade: 'Plumbing',    defaultQty: 1, phase: 'services' },
  { id: 'pl-isolation-valve',categoryId:'plumbing', label: 'Isolation Valve',                 description: 'Supply & install inline isolation valve',        unit: 'each',  rate: 85,   trade: 'Plumbing',    defaultQty: 2, phase: 'services' },
  { id: 'pl-gas-bayonet',   categoryId: 'plumbing', label: 'Gas Bayonet Point',               description: 'Supply & install gas bayonet outlet',            unit: 'each',  rate: 280,  trade: 'Plumbing',    defaultQty: 1, phase: 'services' },

  // ─── TILING (finishes) ─────────────────────────────────────────────────────
  { id: 'tl-floor-std',     categoryId: 'tiling', label: 'Floor Tile (Standard Ceramic)',     description: 'Supply & lay standard ceramic floor tiles',      unit: 'm2',    rate: 95,   trade: 'Tiling',      defaultQty: 5, phase: 'finishes' },
  { id: 'tl-floor-prem',    categoryId: 'tiling', label: 'Floor Tile (Rectified Porcelain)',  description: 'Supply & lay rectified porcelain floor tiles',   unit: 'm2',    rate: 145,  trade: 'Tiling',      defaultQty: 5, phase: 'finishes' },
  { id: 'tl-wall-std',      categoryId: 'tiling', label: 'Wall Tile (Standard Ceramic)',      description: 'Supply & lay standard ceramic wall tiles',       unit: 'm2',    rate: 105,  trade: 'Tiling',      defaultQty: 10, phase: 'finishes' },
  { id: 'tl-wall-prem',     categoryId: 'tiling', label: 'Wall Tile (Large Format Premium)',  description: 'Supply & lay large format premium wall tiles',   unit: 'm2',    rate: 165,  trade: 'Tiling',      defaultQty: 10, phase: 'finishes' },
  { id: 'tl-waterproof',    categoryId: 'tiling', label: 'Waterproofing Membrane',            description: 'Class III liquid membrane per AS3740',           unit: 'm2',    rate: 55,   trade: 'Tiling',      defaultQty: 5, phase: 'finishes' },
  { id: 'tl-tile-trim',     categoryId: 'tiling', label: 'Tile Trim / Edge Strip',            description: 'Supply & install aluminium tile trim',           unit: 'lm',    rate: 25,   trade: 'Tiling',      defaultQty: 6, phase: 'finishes' },
  { id: 'tl-grout-seal',    categoryId: 'tiling', label: 'Grout Sealer',                      description: 'Apply grout sealer to all tiled surfaces',       unit: 'm2',    rate: 12,   trade: 'Tiling',      defaultQty: 10, phase: 'finishes' },
  { id: 'tl-shower-screen', categoryId: 'tiling', label: 'Frameless Shower Screen',           description: 'Supply & install frameless shower screen',       unit: 'each',  rate: 1800, trade: 'Tiling',      defaultQty: 1, phase: 'finishes' },
];

// Part 2 units (waterproofing, painting, flooring, kitchen, cabinetry, windows, HVAC, fire, smart, insulation)
import { PARAMETRIC_UNITS_PART2 } from './parametricUnitsPart2';

const COMPLIANCE_BY_CATEGORY: Record<string, string> = {
  electrical: 'AS/NZS 3000',
  plumbing: 'VBA Plumbing Compliance',
  tiling: 'AS 3958',
  waterproofing: 'AS 3740',
  painting: 'Manufacturer System + Site Safety',
  flooring: 'Manufacturer Install Standards',
  kitchen: 'NCC + Trade Coordination',
  cabinetry: 'AS/NZS 4386 / Manufacturer Standards',
  windowsDoors: 'NCC Glazing / Egress',
  hvac: 'NCC + Manufacturer Commissioning',
  fireSafety: 'AS 3786 / VBA',
  smartHome: 'AS/NZS 3000 + Data Standards',
  insulation: 'NCC Section J',
};

function getDefaultComplianceRef(unit: ParametricUnit): string {
  if (unit.id === 'tl-waterproof' || unit.id.startsWith('wp-')) return 'AS 3740';
  if (unit.id === 'el-smoke-alarm' || unit.id === 'fs-smoke') return 'AS 3786';
  return COMPLIANCE_BY_CATEGORY[unit.categoryId] || 'Relevant VBA / NCC Standard';
}

function withComplianceRef(unit: ParametricUnit): ParametricUnit {
  return unit.complianceRef ? unit : { ...unit, complianceRef: getDefaultComplianceRef(unit) };
}

// Combined array — all units in one place for lookups
const ALL_UNITS: ParametricUnit[] = [...PARAMETRIC_UNITS, ...PARAMETRIC_UNITS_PART2].map(withComplianceRef);

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function getUnitsForCategory(categoryId: string): ParametricUnit[] {
  return ALL_UNITS.filter((u) => u.categoryId === categoryId);
}

export function getUnitById(unitId: string): ParametricUnit | undefined {
  return ALL_UNITS.find((u) => u.id === unitId);
}

export function getComplianceRefByUnitId(unitId: string): string | undefined {
  return getUnitById(unitId)?.complianceRef;
}

export function hasParametricUnits(categoryId: string): boolean {
  return ALL_UNITS.some((u) => u.categoryId === categoryId);
}

export function calcParametricTotal(items: { rate: number; quantity: number }[]): number {
  return items.reduce((sum, it) => sum + (it.rate * it.quantity), 0);
}

export function getAllParametricUnits(): ParametricUnit[] {
  return ALL_UNITS;
}

// Re-export part 2 for direct access if needed
export { PARAMETRIC_UNITS_PART2 };
