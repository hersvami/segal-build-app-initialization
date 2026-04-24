# 04 — Categories & Archetype System
_This is 1 of 14 modules — see `handover/00-index.md` for the full list_

> **AI INSTRUCTION:** Request `src/utils/categories/types.ts`, `core.ts`, `extended.ts` before editing.

---

## Files To Request
- `src/utils/categories/types.ts` — archetype types, cat(), catX()
- `src/utils/categories/core.ts` — 20 core categories
- `src/utils/categories/extended.ts` — 23 extended categories
- `src/utils/categories/categoryTypeOptions.ts` — material/type selectors

---

## Archetype System

Every category has an `archetype` that controls how it behaves in the UI and pricing engine:

| Archetype | Example | Dimension Mode | Parametric | PC Items |
|---|---|---|---|---|
| `assembly` | Bathroom | area | no | yes |
| `trade` | Electrical | none | **yes** | no |
| `element` | Internal Walls | wall | no | no |
| `compliance` | Fire & Safety | none | no | no |

### Key Rule
- **Assembly** = manual room template only. Never auto-detected, never auto-priced.
- **Trade** = independently priced. AI detects and pre-fills BoQ.
- **Element** = linear/wall-based. No width field.
- **Compliance** = item/count only. No dimensions.

---

## Dimension Modes

| Mode | Used For | Fields Shown |
|---|---|---|
| `area` | Rooms, floors | Width × Length |
| `wall` | Internal walls, cladding | Length × Height |
| `linear` | Fencing, gutters | Length only |
| `roof` | Roofing | Width × Length (labelled as roof) |
| `room` | Extensions | Width × Length × Height |
| `none` | Trades, compliance | No dimension fields |
| `item` | Per-item trades | No dimension fields |

---

## The 43 Categories

### Wet Areas & Interior (group: wet)
| ID | Label | Archetype |
|---|---|---|
| bathroom | Bathroom / Wet Areas | assembly |
| kitchen | Kitchen | assembly |
| laundry | Laundry | assembly |
| toilet | Toilet / WC | assembly |
| flooring | Flooring | element |
| painting | Painting | trade |

### Structural & Build (group: structural)
| ID | Label | Archetype |
|---|---|---|
| demolition | Demolition | trade |
| structural | Structural | trade |
| internalWalls | Internal Walls | element |
| ceilings | Ceilings | element |
| underpinning | Underpinning | trade |
| retainingWalls | Retaining Walls | element |
| steelFraming | Steel & Framing | trade |
| extensions | Ground Floor Extensions | assembly |
| secondStorey | Second Storey Additions | assembly |
| newHomeBuild | New Home Build | assembly |
| multiUnit | Multi-Unit | assembly |
| grannyFlat | Granny Flat / DPU | assembly |

### External Works (group: external)
| ID | Label | Archetype |
|---|---|---|
| decking | Decking | element |
| pergola | Pergola & Patio | assembly |
| paving | Paving & Driveways | element |
| concreting | Concreting | trade |
| fencing | Fencing & Gates | element |
| landscaping | Landscaping | trade |
| pools | Pool & Spa | assembly |

### Trades & Services (group: trades)
| ID | Label | Archetype |
|---|---|---|
| electrical | Electrical | trade |
| plumbing | Plumbing & Drainage | trade |
| hvac | HVAC | trade |
| waterproofing | Waterproofing | trade |
| insulation | Insulation | element |

### Roofing & Exterior (group: structural)
| ID | Label | Archetype |
|---|---|---|
| roofing | Roofing — Re-Roof | element |
| roofRepairs | Roofing — Repairs | trade |
| guttersFascia | Gutters & Fascia | element |
| rendering | Rendering | element |
| cladding | Cladding | element |
| windowsDoors | Windows & Doors | trade |
| brickwork | Brickwork & Masonry | element |
| cabinetry | Cabinetry & Joinery | assembly |

### Specialist (group: specialty)
| ID | Label | Archetype |
|---|---|---|
| fireSafety | Fire & Safety | compliance |
| accessibility | Accessibility / SDA | compliance |
| heritage | Heritage | assembly |
| acoustic | Acoustic | element |
| smartHome | Smart Home & Data | compliance |

---

## cat() vs catX()

- `cat()` — backwards-compatible. Infers archetype from group. Use for categories not yet migrated.
- `catX()` — explicit archetype. Use for all new categories and Phase 2 pilot categories.

### Migrated to catX() so far
- `bathroom` — assembly
- `electrical` — trade
- `internalWalls` — element
- `fireSafety` — compliance

All remaining 39 categories still use `cat()`. Migration is Phase 2 Step 2.
