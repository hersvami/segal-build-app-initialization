/* ─── Segal Build — Extended Categories (remaining 23) ─── */
import { cat, catX, type WorkCategory } from './types';

export const EXTENDED_CATEGORIES: WorkCategory[] = [
  cat('toilet', '🚽 Toilet / WC', 'toilet', 'wet',
    [{ id: 'type', label: 'Type', type: 'select', options: ['New WC', 'Renovation', 'Relocation'] },
     { id: 'tileExtent', label: 'Wall tile extent', type: 'select', options: ['Skirting tile only', '1200mm high walls', '2100mm high walls', 'Floor-to-ceiling walls'] },
     { id: 'suiteType', label: 'Toilet suite type', type: 'select', options: ['Back-to-wall', 'Wall-hung', 'Standard close-coupled', 'In-wall cistern'] }],
    [{ name: 'Plumbing Rough-in', trade: 'Plumbing', rate: 1200, unit: 'allow', duration: 1, description: 'New drainage and water supply' },
     { name: 'Wall & Floor Prep', trade: 'Carpentry', rate: 800, unit: 'item', duration: 1, description: 'Stud frame, plasterboard' },
     { name: 'Tiling', trade: 'Tiling', rate: 155, unit: 'area', duration: 1, description: 'Wall and floor tiles' },
     { name: 'Fit-off', trade: 'Plumbing', rate: 600, unit: 'allow', duration: 0.5, description: 'Install toilet suite, cistern' }],
    [{ description: 'Toilet Suite', allowance: 500, unit: 'each' }, { description: 'Hand basin', allowance: 200, unit: 'each' }],
    ['Plumbing rough-in and fit-off', 'Tiling and waterproofing'], ['Structural alterations', 'Mechanical ventilation'],
    [{ categoryId: 'plumbing', type: 'auto' }, { categoryId: 'waterproofing', type: 'auto' }]),

  cat('cabinetry', '🪟 Cabinetry & Joinery', 'cabinetry', 'wet',
    [{ id: 'type', label: 'Type', type: 'select', options: ['Built-in robes', 'Shelving', 'Custom joinery', 'Entertainment unit'] }],
    [{ name: 'Design & Measure', trade: 'Carpentry', rate: 500, unit: 'item', duration: 1, description: 'Measure and design' },
     { name: 'Manufacture', trade: 'Carpentry', rate: 350, unit: 'linear', duration: 5, description: 'Custom manufacture' },
     { name: 'Installation', trade: 'Carpentry', rate: 180, unit: 'linear', duration: 2, description: 'Install and fit out' }],
    [{ description: 'Hardware', allowance: 200, unit: 'allowance' }],
    ['Custom design and manufacture', 'Installation and adjustment'], ['Electrical work within cabinetry', 'Appliance supply'], []),

  cat('ceilings', '🏠 Ceilings & Cornices', 'ceilings', 'structural',
    [{ id: 'type', label: 'Type', type: 'select', options: ['Plasterboard repair', 'Bulkhead', 'Raking ceiling', 'New ceiling'] }],
    [{ name: 'Demolition (if req.)', trade: 'Demo', rate: 45, unit: 'area', duration: 1, description: 'Remove existing ceiling' },
     { name: 'Frame & Sheet', trade: 'Carpentry', rate: 85, unit: 'area', duration: 2, description: 'Ceiling frame and plasterboard' },
     { name: 'Cornice & Finish', trade: 'Carpentry', rate: 35, unit: 'linear', duration: 1, description: 'Cornice, set, and finish' }],
    [], ['All materials and labour', 'Cornice and finishing'], ['Insulation (separate)', 'Asbestos removal'],
    [{ categoryId: 'painting', type: 'suggested' }, { categoryId: 'insulation', type: 'suggested' }]),

  catX('internalWalls', '🧱 Internal Walls', 'internalWalls', 'structural', 'element',
    [{ id: 'wallType', label: 'Wall construction', type: 'select', options: ['90mm timber stud + plasterboard', '70mm timber stud + plasterboard', '64mm steel stud + plasterboard', '92mm steel stud + plasterboard', 'Single brick (110mm)', 'Double brick cavity (270mm)', 'Hebel block (75mm)'] },
     { id: 'finish', label: 'Plasterboard finish', type: 'select', options: ['Standard 10mm', 'Wet-area 10mm (CSR Wet)', 'Acoustic 13mm', 'Fire-rated 13mm'], dependsOn: { questionId: 'wallType', values: ['90mm timber stud + plasterboard', '70mm timber stud + plasterboard', '64mm steel stud + plasterboard', '92mm steel stud + plasterboard'] } },
     { id: 'insulation', label: 'Acoustic / thermal insulation', type: 'select', options: ['None', 'R2.0 acoustic batt', 'R2.5 thermal batt', 'R2.7 acoustic + thermal'] }],
    [{ name: 'Frame', trade: 'Carpentry', rate: 85, unit: 'area', duration: 1, description: 'Construct wall frame to specified type' },
     { name: 'Insulation install', trade: 'Carpentry', rate: 18, unit: 'area', duration: 0.5, description: 'Friction-fit batt insulation' },
     { name: 'Sheet & set', trade: 'Carpentry', rate: 65, unit: 'area', duration: 1, description: 'Plasterboard, set 3-coat finish' }],
    [], ['Frame to specified construction', 'Plasterboard to nominated finish', '3-coat set ready for paint'],
    ['Painting (separate category)', 'Skirting / architrave (separate category)', 'Electrical chasing & make-good', 'Structural lintels / load-bearing modifications'],
    [{ categoryId: 'painting', type: 'suggested' }, { categoryId: 'electrical', type: 'suggested' }, { categoryId: 'insulation', type: 'suggested' }],
    { dimensionMode: 'wall', supportsPcItems: false, contingency: 10, workType: 'renovation' }),

  catX('fireSafety', '🔥 Fire & Safety', 'fireSafety', 'specialty', 'compliance',
    [{ id: 'itemType', label: 'Compliance item', type: 'select', options: ['Smoke alarm — 240V hardwired interconnected', 'Smoke alarm — 10yr lithium interconnected', 'Fire door — 60/30/30 rated', 'Fire door — 90/60/30 rated', 'BAL assessment & report'] },
     { id: 'count', label: 'How many?', type: 'number' },
     { id: 'interconnect', label: 'Interconnect to existing system?', type: 'select', options: ['Yes — extend existing', 'No — standalone'], dependsOn: { questionId: 'itemType', values: ['Smoke alarm — 240V hardwired interconnected', 'Smoke alarm — 10yr lithium interconnected'] } }],
    [{ name: 'Supply & install', trade: 'Electrical', rate: 240, unit: 'item', duration: 0.5, description: 'Per AS3786 — supply, install, test' }],
    [], ['AS3786 / AS1530 compliance certificate', 'Supply, install, test, and tag', 'Battery backup where applicable'],
    ['Fire sprinkler systems', 'Detection panels / monitored alarms', 'Patching & painting after install'], [],
    { dimensionMode: 'none', supportsPcItems: false, contingency: 5, workType: 'maintenance' }),

  cat('paving', '🧱 Paving & Driveways', 'paving', 'external',
    [{ id: 'type', label: 'Type', type: 'select', options: ['Concrete', 'Pavers', 'Exposed aggregate'] }],
    [{ name: 'Base Preparation', trade: 'Concreting', rate: 45, unit: 'area', duration: 1, description: 'Excavate, base, compact' },
     { name: 'Paving/Pour', trade: 'Concreting', rate: 95, unit: 'area', duration: 2, description: 'Lay pavers or pour concrete' }],
    [], ['Base preparation', 'Paving or concrete pour'], ['Drainage', 'Retaining walls'],
    [{ categoryId: 'concreting', type: 'suggested' }, { categoryId: 'landscaping', type: 'suggested' }]),
];

import { CORE_CATEGORIES } from './core';
export const ALL_CATEGORIES: WorkCategory[] = [...CORE_CATEGORIES, ...EXTENDED_CATEGORIES];
export const CATEGORY_MAP: Record<string, WorkCategory> = {};
ALL_CATEGORIES.forEach(c => { CATEGORY_MAP[c.id] = c; });

export function getCategoryById(id: string): WorkCategory | undefined { return CATEGORY_MAP[id]; }

export function searchCategories(query: string): WorkCategory[] {
  const q = query.toLowerCase();
  return ALL_CATEGORIES.filter(c => c.label.toLowerCase().includes(q) || c.id.toLowerCase().includes(q) || c.stages.some(s => s.trade.toLowerCase().includes(q) || s.name.toLowerCase().includes(q)));
}
