/* ─── Segal Build — Parametric Units Part 2 ───────────────────────────────── */
import type { ParametricUnit } from './parametricUnits';

export const PARAMETRIC_UNITS_PART2: ParametricUnit[] = [

  // ─── WATERPROOFING (finishes) ──────────────────────────────────────────────
  { id: 'wp-liquid-mem',    categoryId: 'waterproofing', label: 'Liquid Membrane (Class III)', description: 'Liquid membrane per AS3740 — floor + junctions', unit: 'm2',   rate: 55,   trade: 'Waterproofing', defaultQty: 8, phase: 'finishes' },
  { id: 'wp-sheet-mem',     categoryId: 'waterproofing', label: 'Sheet Membrane',              description: 'Sheet membrane for wet area floor',             unit: 'm2',    rate: 65,   trade: 'Waterproofing', defaultQty: 5, phase: 'finishes' },
  { id: 'wp-bond-breaker',  categoryId: 'waterproofing', label: 'Bond Breaker Tape',           description: 'Bond breaker tape at wall/floor junctions',     unit: 'lm',    rate: 18,   trade: 'Waterproofing', defaultQty: 10, phase: 'finishes' },
  { id: 'wp-flood-test',    categoryId: 'waterproofing', label: 'Flood Test',                  description: 'Flood test all waterproofed areas',             unit: 'allow', rate: 180,  trade: 'Waterproofing', defaultQty: 1, phase: 'finishes' },

  // ─── PAINTING (finishes) ───────────────────────────────────────────────────
  { id: 'pt-walls-int',     categoryId: 'painting', label: 'Interior Wall Paint (2 coat)',    description: 'Two coats premium acrylic — walls',              unit: 'm2',    rate: 18,   trade: 'Painting',    defaultQty: 40, phase: 'finishes' },
  { id: 'pt-ceiling',       categoryId: 'painting', label: 'Ceiling Paint (2 coat)',          description: 'Two coats ceiling white — ceilings',             unit: 'm2',    rate: 15,   trade: 'Painting',    defaultQty: 15, phase: 'finishes' },
  { id: 'pt-trim-door',     categoryId: 'painting', label: 'Door + Trim Paint',               description: 'Paint doors, architraves, skirting',             unit: 'each',  rate: 120,  trade: 'Painting',    defaultQty: 2, phase: 'finishes' },
  { id: 'pt-walls-ext',     categoryId: 'painting', label: 'Exterior Wall Paint (2 coat)',    description: 'Two coats exterior acrylic — external walls',    unit: 'm2',    rate: 28,   trade: 'Painting',    defaultQty: 20, phase: 'finishes' },
  { id: 'pt-prep',          categoryId: 'painting', label: 'Surface Prep & Fill',             description: 'Prep, fill, sand all surfaces before paint',     unit: 'm2',    rate: 8,    trade: 'Painting',    defaultQty: 40, phase: 'preparation' },

  // ─── FLOORING (finishes) ───────────────────────────────────────────────────
  { id: 'fl-carpet',        categoryId: 'flooring', label: 'Carpet + Underlay',               description: 'Supply & lay carpet with premium underlay',      unit: 'm2',    rate: 65,   trade: 'Flooring',    defaultQty: 12, phase: 'finishes' },
  { id: 'fl-timber-eng',    categoryId: 'flooring', label: 'Engineered Timber Floor',         description: 'Supply & lay engineered timber flooring',        unit: 'm2',    rate: 120,  trade: 'Flooring',    defaultQty: 15, phase: 'finishes' },
  { id: 'fl-vinyl-plank',   categoryId: 'flooring', label: 'Vinyl Plank (LVP)',               description: 'Supply & lay luxury vinyl plank flooring',       unit: 'm2',    rate: 75,   trade: 'Flooring',    defaultQty: 15, phase: 'finishes' },
  { id: 'fl-tile',          categoryId: 'flooring', label: 'Floor Tiles (Flooring)',          description: 'Supply & lay ceramic/porcelain floor tiles',     unit: 'm2',    rate: 95,   trade: 'Flooring',    defaultQty: 10, phase: 'finishes' },
  { id: 'fl-subfloor-prep', categoryId: 'flooring', label: 'Subfloor Prep & Levelling',       description: 'Prepare and level subfloor before covering',     unit: 'm2',    rate: 35,   trade: 'Flooring',    defaultQty: 15, phase: 'preparation' },

  // ─── KITCHEN (mixed phases) ────────────────────────────────────────────────
  { id: 'kt-cabinetry',     categoryId: 'kitchen', label: 'Base + Wall Cabinetry',            description: 'Supply & install modular kitchen cabinetry',     unit: 'lm',    rate: 1100, trade: 'Cabinetry',   defaultQty: 4, phase: 'structure' },
  { id: 'kt-bench-lam',     categoryId: 'kitchen', label: 'Laminate Benchtop',                description: 'Supply & install laminate benchtop',             unit: 'lm',    rate: 280,  trade: 'Cabinetry',   defaultQty: 4, phase: 'structure' },
  { id: 'kt-bench-stone',   categoryId: 'kitchen', label: 'Stone Benchtop (Caesarstone)',     description: 'Supply & install 20mm Caesarstone benchtop',     unit: 'lm',    rate: 850,  trade: 'Cabinetry',   defaultQty: 4, phase: 'structure' },
  { id: 'kt-sink',          categoryId: 'kitchen', label: 'Kitchen Sink (Undermount)',         description: 'Supply & install undermount kitchen sink',        unit: 'each',  rate: 450,  trade: 'Plumbing',    defaultQty: 1, phase: 'services' },
  { id: 'kt-tap',           categoryId: 'kitchen', label: 'Kitchen Mixer Tap',                description: 'Supply & install kitchen mixer tapware',          unit: 'each',  rate: 280,  trade: 'Plumbing',    defaultQty: 1, phase: 'services' },
  { id: 'kt-appliance-con', categoryId: 'kitchen', label: 'Appliance Connection',             description: 'Connect oven, cooktop or dishwasher',            unit: 'each',  rate: 220,  trade: 'Electrical',  defaultQty: 2, phase: 'services' },
  { id: 'kt-splashback',    categoryId: 'kitchen', label: 'Tile Splashback',                  description: 'Supply & lay tile splashback behind bench',       unit: 'm2',    rate: 160,  trade: 'Tiling',      defaultQty: 2, phase: 'finishes' },

  // ─── CABINETRY & JOINERY (structure) ───────────────────────────────────────
  { id: 'cb-bir',           categoryId: 'cabinetry', label: 'Built-in Robe (BIR)',            description: 'Supply & install built-in wardrobe',             unit: 'lm',    rate: 750,  trade: 'Cabinetry',   defaultQty: 2, phase: 'structure' },
  { id: 'cb-vanity',        categoryId: 'cabinetry', label: 'Bathroom Vanity Unit',           description: 'Supply & install vanity unit with basin',        unit: 'each',  rate: 1200, trade: 'Cabinetry',   defaultQty: 1, phase: 'structure' },
  { id: 'cb-mirror',        categoryId: 'cabinetry', label: 'Bathroom Mirror / Cabinet',      description: 'Supply & install bathroom mirror or cabinet',    unit: 'each',  rate: 350,  trade: 'Cabinetry',   defaultQty: 1, phase: 'structure' },
  { id: 'cb-shelving',      categoryId: 'cabinetry', label: 'Adjustable Shelving',            description: 'Supply & install adjustable shelf system',       unit: 'lm',    rate: 180,  trade: 'Cabinetry',   defaultQty: 3, phase: 'structure' },

  // ─── WINDOWS & DOORS (structure) ───────────────────────────────────────────
  { id: 'wd-door-int',      categoryId: 'windowsDoors', label: 'Internal Door (Flush Panel)', description: 'Supply & install internal flush panel door',    unit: 'each',  rate: 650,  trade: 'Carpentry',   defaultQty: 2, phase: 'structure' },
  { id: 'wd-door-ext',      categoryId: 'windowsDoors', label: 'External Door (Solid Core)',  description: 'Supply & install solid core external door',     unit: 'each',  rate: 1200, trade: 'Carpentry',   defaultQty: 1, phase: 'structure' },
  { id: 'wd-window-alum',   categoryId: 'windowsDoors', label: 'Aluminium Window (Single)',   description: 'Supply & install aluminium framed window',      unit: 'each',  rate: 850,  trade: 'Carpentry',   defaultQty: 2, phase: 'structure' },
  { id: 'wd-window-dg',     categoryId: 'windowsDoors', label: 'Window (Double Glazed)',      description: 'Supply & install double glazed window unit',    unit: 'each',  rate: 1400, trade: 'Carpentry',   defaultQty: 1, phase: 'structure' },
  { id: 'wd-sliding-door',  categoryId: 'windowsDoors', label: 'Sliding Door (Alum Frame)',   description: 'Supply & install aluminium sliding door',       unit: 'each',  rate: 2200, trade: 'Carpentry',   defaultQty: 1, phase: 'structure' },
  { id: 'wd-door-hardware', categoryId: 'windowsDoors', label: 'Door Hardware Set',           description: 'Supply & install lever handle set per door',    unit: 'each',  rate: 120,  trade: 'Carpentry',   defaultQty: 2, phase: 'structure' },
  { id: 'wd-door-closer',   categoryId: 'windowsDoors', label: 'Door Closer (Fire Door)',     description: 'Supply & install hydraulic door closer',        unit: 'each',  rate: 180,  trade: 'Carpentry',   defaultQty: 1, phase: 'structure' },

  // ─── HVAC (services) ───────────────────────────────────────────────────────
  { id: 'hv-split-2.5',     categoryId: 'hvac', label: '2.5kW Split System',                  description: 'Supply & install 2.5kW split system AC',        unit: 'each',  rate: 1800, trade: 'HVAC',        defaultQty: 1, phase: 'services' },
  { id: 'hv-split-7kw',     categoryId: 'hvac', label: '7.0kW Split System',                  description: 'Supply & install 7.0kW split system AC',        unit: 'each',  rate: 2800, trade: 'HVAC',        defaultQty: 1, phase: 'services' },
  { id: 'hv-ducted',        categoryId: 'hvac', label: 'Ducted System (full)',                description: 'Supply & install ducted HVAC system',           unit: 'allow', rate: 12500,trade: 'HVAC',        defaultQty: 1, phase: 'services' },
  { id: 'hv-vent',          categoryId: 'hvac', label: 'Return Air / Vent Grill',             description: 'Supply & install return air box and grill',     unit: 'each',  rate: 450,  trade: 'HVAC',        defaultQty: 1, phase: 'services' },
  { id: 'hv-duct-zone',     categoryId: 'hvac', label: 'Ducted Zone (add-on)',                description: 'Add a zone to existing ducted system',          unit: 'each',  rate: 850,  trade: 'HVAC',        defaultQty: 1, phase: 'services' },

  // ─── FIRE & SAFETY (services) ──────────────────────────────────────────────
  { id: 'fs-smoke',         categoryId: 'fireSafety', label: 'Smoke Alarm (240V)',            description: '240V photoelectric smoke alarm, interconnected', unit: 'each',  rate: 150,  trade: 'Compliance',  defaultQty: 2, phase: 'services' },
  { id: 'fs-co-detector',   categoryId: 'fireSafety', label: 'CO Detector',                   description: 'Supply & install carbon monoxide detector',     unit: 'each',  rate: 180,  trade: 'Compliance',  defaultQty: 1, phase: 'services' },
  { id: 'fs-fire-blanket',  categoryId: 'fireSafety', label: 'Fire Blanket',                  description: 'Supply & install fire blanket (kitchen)',        unit: 'each',  rate: 65,   trade: 'Compliance',  defaultQty: 1, phase: 'services' },
  { id: 'fs-extinguisher',  categoryId: 'fireSafety', label: 'Fire Extinguisher',             description: 'Supply & install 1kg dry powder extinguisher',  unit: 'each',  rate: 95,   trade: 'Compliance',  defaultQty: 1, phase: 'services' },

  // ─── SMART HOME & DATA (services) ──────────────────────────────────────────
  { id: 'sm-cat6',          categoryId: 'smartHome', label: 'Cat6 Data Point',                description: 'Data point wired to patch panel',               unit: 'each',  rate: 195,  trade: 'Data',        defaultQty: 2, phase: 'services' },
  { id: 'sm-cctv',          categoryId: 'smartHome', label: 'CCTV Camera',                    description: 'Supply & install IP CCTV camera',               unit: 'each',  rate: 450,  trade: 'Data',        defaultQty: 2, phase: 'services' },
  { id: 'sm-intercom',      categoryId: 'smartHome', label: 'Intercom Station',               description: 'Supply & install video intercom station',        unit: 'each',  rate: 850,  trade: 'Data',        defaultQty: 1, phase: 'services' },
  { id: 'sm-sensor',        categoryId: 'smartHome', label: 'Smart Motion Sensor',            description: 'Supply & install smart motion sensor',           unit: 'each',  rate: 180,  trade: 'Data',        defaultQty: 2, phase: 'services' },
  { id: 'sm-doorbell',      categoryId: 'smartHome', label: 'Video Doorbell',                 description: 'Supply & install video doorbell unit',           unit: 'each',  rate: 280,  trade: 'Data',        defaultQty: 1, phase: 'services' },

  // ─── INSULATION (structure) ────────────────────────────────────────────────
  { id: 'in-ceiling-batts', categoryId: 'insulation', label: 'Ceiling Batts (R3.5)',          description: 'Supply & install R3.5 ceiling insulation batts', unit: 'm2',    rate: 18,   trade: 'Insulation',  defaultQty: 20, phase: 'structure' },
  { id: 'in-wall-batts',    categoryId: 'insulation', label: 'Wall Batts (R2.0)',             description: 'Supply & install R2.0 wall insulation batts',    unit: 'm2',    rate: 25,   trade: 'Insulation',  defaultQty: 30, phase: 'structure' },
  { id: 'in-underfloor',    categoryId: 'insulation', label: 'Underfloor Insulation',         description: 'Supply & install reflective underfloor foil',    unit: 'm2',    rate: 22,   trade: 'Insulation',  defaultQty: 20, phase: 'structure' },
];
