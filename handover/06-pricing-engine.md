# 06 — Pricing Engine: BoQ, Rates, Baseline
_This is 1 of 14 modules — see `handover/00-index.md` for the full list_

> **AI INSTRUCTION:** Request relevant pricing files before editing. Never invent rates — use Rawlinsons VIC 2024/2025.

---

## Files To Request
- `src/utils/pricing/quoteCalculator.ts` — OH/Profit/Contingency/GST
- `src/utils/pricing/parametricUnits.ts` — unit rate library
- `src/utils/pricing/baselineMultipliers.ts` — scaffolding + access
- `src/utils/pricing/engine.ts` — scope totals
- `src/utils/pricing/quoteDefaults.ts` — pre-filled inclusions/exclusions/PC items

---

## Pricing Formula

```
Trade Cost (sum of all stage/parametric line items)
  + Overhead          = Trade Cost × OH%          (default 12%)
  + Profit            = (Trade + OH) × Profit%    (default 15%)
  + Contingency       = (above) × Contingency%    (5–15% by category)
  ─────────────────────────────────────────────
  = Subtotal excl GST
  + GST               = Subtotal × 10%
  ─────────────────────────────────────────────
  = Total to Customer
```

---

## Parametric BoQ

Each unit in `parametricUnits.ts` has:
- `id` — unique key
- `categoryId` — which trade it belongs to
- `label` — display name
- `description` — tooltip text
- `unit` — `each` | `lm` | `m2` | `allow`
- `rate` — AUD inc. labour + materials, ex GST
- `trade` — trade name for grouping
- `defaultQty` — pre-filled quantity
- `complianceRef` — derived compliance reference shown in the editor

The Details editor now also groups line items by phase using `phaseGrouping.ts`:
- Preparation
- Structure
- Services
- Finishes
- External

**Implemented:**
- `complianceRef` — derived for all units (e.g. `AS 3740`, `AS/NZS 3000`, `NCC Section J`, VBA plumbing compliance)

**Still planned:**
- `phase` — `Preparation` | `Structure` | `Services` | `Finishes` | `External`

### Currently Covered Trades in Parametric Library
- Electrical (14 units)
- Plumbing & Drainage (12 units)
- Tiling (partial)

### Still Needed (Phase 2 Step 4)
Waterproofing, Painting, Flooring, HVAC, Fire & Safety, Smart Home, Cabinetry, Windows & Doors, Decking, Pergola, Paving, Concreting, Fencing, Landscaping, Roofing, Gutters, Rendering, Cladding, Brickwork, Acoustic, Insulation, Kitchen

---

## Baseline Multipliers

Applied after raw trade cost is summed, before OH/Profit:

| Factor | Easy | Moderate | Difficult |
|---|---|---|---|
| Site Access Labour | ×1.00 | ×1.075 | ×1.15 |

| Storeys | Scaffolding Rate |
|---|---|
| Single | $0/m² |
| Double | $65/m² |
| Multi | $120/m² |

---

## Contingency by Work Type

| Work Type | Contingency % |
|---|---|
| Renovation | 10% |
| New Build | 5% |
| Extension | 8% |
| Structural | 15% |
| Maintenance | 5% |

---

## Rate Disclaimer

All rates are Rawlinsons/Cordell 2024/2025 base rates for Victorian residential construction. Every rate shown to the builder must carry:

> "Editable default — verify against current Rawlinsons edition or supplier quotes (2025 rates)"

---

## Planned: Rate Override Mechanism

Builders will be able to correct any unit rate with a note. The correction persists on the scope. This is Phase 2 Step 4 — see `handover/11-phase2-roadmap.md`.
