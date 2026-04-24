/* ─── Segal Build — Core Categories Part 3 (final 6) ─── */
import { cat, type WorkCategory } from './types';

export const CORE_CATEGORIES_PART3: WorkCategory[] = [
  cat('rendering', '🎨 Rendering', 'rendering', 'external',
    [{ id: 'type', label: 'Type', type: 'select', options: ['Cement render', 'Texture coat', 'Acrylic'] }],
    [{ name: 'Surface Prep', trade: 'Carpentry', rate: 25, unit: 'area', duration: 1, description: 'Clean and prepare' },
     { name: 'Render Application', trade: 'Carpentry', rate: 85, unit: 'area', duration: 2, description: 'Supply and apply render' }],
    [], ['Surface preparation', 'Quality render finish'], ['Painting (separate)', 'Structural repairs'],
    [{ categoryId: 'painting', type: 'suggested' }, { categoryId: 'cladding', type: 'suggested' }]),

  cat('cladding', '🧱 Cladding', 'cladding', 'external',
    [{ id: 'type', label: 'Type', type: 'select', options: ['Weatherboard', 'Fibre cement', 'Metal'] }],
    [{ name: 'Wall Prep', trade: 'Carpentry', rate: 35, unit: 'area', duration: 1, description: 'Prepare wall surface' },
     { name: 'Cladding Install', trade: 'Carpentry', rate: 120, unit: 'area', duration: 3, description: 'Supply and fix cladding' }],
    [], ['Sarking and wrap', 'Cladding supply and install'], ['Insulation (separate)', 'Painting (if required)'],
    [{ categoryId: 'insulation', type: 'suggested' }, { categoryId: 'painting', type: 'suggested' }]),

  cat('insulation', '🛡️ Insulation', 'insulation', 'specialty',
    [{ id: 'type', label: 'Type', type: 'select', options: ['Wall', 'Ceiling', 'Underfloor', 'Acoustic'] }],
    [{ name: 'Installation', trade: 'Carpentry', rate: 35, unit: 'area', duration: 1, description: 'Install bulk/batt insulation' }],
    [], ['Supply and installation', 'Code-compliant R-values'], ['Making good linings'],
    [{ categoryId: 'ceilings', type: 'suggested' }]),

  cat('underpinning', '🏠 Underpinning', 'underpinning', 'structural',
    [{ id: 'type', label: 'Type', type: 'select', options: ['Restumping', 'Underpinning', 'Slab repair'] }],
    [{ name: 'Engineering Assessment', trade: 'Structural', rate: 2500, unit: 'item', duration: 5, description: 'Engineer inspection and report' },
     { name: 'Underpinning Works', trade: 'Concreting', rate: 450, unit: 'linear', duration: 5, description: 'Excavate and pour new footings' },
     { name: 'Restumping', trade: 'Carpentry', rate: 350, unit: 'item', duration: 3, description: 'Replace stumps and relevel' }],
    [{ description: 'Engineering Report', allowance: 2000, unit: 'item' }],
    ['Engineering assessment', 'All labour and materials'], ['Internal making good', 'Plumbing adjustments'],
    [{ categoryId: 'structural', type: 'auto' }, { categoryId: 'concreting', type: 'auto' }], 15, 'structural'),

  cat('retainingWalls', '🧱 Retaining Walls', 'retainingWalls', 'external',
    [{ id: 'type', label: 'Type', type: 'select', options: ['Timber sleeper', 'Concrete block', 'Besser block'] }],
    [{ name: 'Excavation & Drainage', trade: 'Landscaping', rate: 120, unit: 'linear', duration: 1, description: 'Excavate and install drainage' },
     { name: 'Wall Construction', trade: 'Carpentry', rate: 280, unit: 'linear', duration: 2, description: 'Build retaining wall' }],
    [], ['Drainage behind wall', 'All materials and labour'], ['Engineering for walls >1m', 'Council permits'],
    [{ categoryId: 'landscaping', type: 'suggested' }, { categoryId: 'concreting', type: 'suggested' }]),

  cat('steelFraming', '🏗️ Steel & Framing', 'steelFraming', 'structural',
    [{ id: 'type', label: 'Type', type: 'select', options: ['Steel beam', 'Timber framing', 'Steel posts'] }],
    [{ name: 'Engineering Design', trade: 'Structural', rate: 1800, unit: 'item', duration: 5, description: 'Engineer specify beam' },
     { name: 'Fabrication & Install', trade: 'Structural', rate: 3500, unit: 'item', duration: 2, description: 'Supply and install steel' }],
    [], ['Engineering certification', 'Supply and installation'], ['Crane hire if required', 'Making good'],
    [{ categoryId: 'structural', type: 'auto' }, { categoryId: 'demolition', type: 'suggested' }], 15, 'structural'),
];

// ─── Extensions & New Builds (4 categories) ──────────────────────────────────
export const CORE_CATEGORIES_BUILDS: WorkCategory[] = [
  cat('secondStorey', '🏢 Upper Storey Extension', 'secondStorey', 'structural',
    [{ id: 'size', label: 'Size', type: 'select', options: ['Single room', 'Full upper storey extension'] }],
    [{ name: 'Engineering & Permits', trade: 'Structural', rate: 8000, unit: 'item', duration: 10, description: 'Engineer and council' },
     { name: 'Strengthening', trade: 'Structural', rate: 25000, unit: 'item', duration: 4, description: 'Strengthen existing structure' },
     { name: 'Upper Storey Construction', trade: 'Carpentry', rate: 85000, unit: 'item', duration: 8, description: 'Full upper storey extension build' }],
    [{ description: 'Staircase', allowance: 8000, unit: 'item' }],
    ['Engineering and permits', 'Structural strengthening', 'Full construction'],
    ['Temporary accommodation', 'Asbestos removal', 'Landscaping'],
    [{ categoryId: 'structural', type: 'auto' }, { categoryId: 'roofing', type: 'auto' }], 15, 'new_build'),

  cat('multiUnit', '🏘️ Multi-Unit', 'multiUnit', 'structural',
    [{ id: 'type', label: 'Type', type: 'select', options: ['Dual occupancy', 'Townhouses', 'Triplex'] }],
    [{ name: 'Site Works & Foundation', trade: 'Concreting', rate: 80000, unit: 'item', duration: 4, description: 'Site cut, footings, slab' },
     { name: 'Construction', trade: 'Carpentry', rate: 250000, unit: 'item', duration: 12, description: 'Full multi-unit build' }],
    [], ['Multi-unit construction', 'All trades'], ['DA and CDC approvals', 'Architect fees', 'Landscaping'],
    [{ categoryId: 'newHomeBuild', type: 'suggested' }], 10, 'new_build'),

  cat('grannyFlat', '🏠 Granny Flat / DPU', 'grannyFlat', 'structural',
    [{ id: 'size', label: 'Size', type: 'select', options: ['1 bed (40-50m²)', '2 bed (60-70m²)'] }],
    [{ name: 'Site Prep & Slab', trade: 'Concreting', rate: 22000, unit: 'item', duration: 3, description: 'Site prep and slab' },
     { name: 'Frame to Lock-up', trade: 'Carpentry', rate: 45000, unit: 'item', duration: 4, description: 'Frame, roof, lock-up' },
     { name: 'Fit-out', trade: 'Carpentry', rate: 35000, unit: 'item', duration: 4, description: 'All finishes and trades' }],
    [{ description: 'Kitchen', allowance: 8000, unit: 'allowance' }, { description: 'Bathroom', allowance: 10000, unit: 'allowance' }],
    ['Complete granny flat construction', 'Kitchen and bathroom included'],
    ['DA/CDC approval', 'Utility connections', 'Landscaping'],
    [{ categoryId: 'newHomeBuild', type: 'suggested' }, { categoryId: 'landscaping', type: 'suggested' }], 8, 'new_build'),
];
