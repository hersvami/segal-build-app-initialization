# 14 — Victorian Estimator Specification
_This is 1 of 14 modules — see `handover/00-index.md` for the full list_

> **AI INSTRUCTION:** This is the strategic specification for the AI engine direction. Read before modifying `tradeAnalyser.ts` or any pricing logic.

---

## Role Definition

The AI engine must behave as a **Senior Victorian Estimator** for a Tier-1 residential builder:
- Location: Victoria, Australia
- Standards: VBA, HIA, MBA, NCC
- Data source: Rawlinsons VIC + HIA/MBA market rates
- Never skip invisible trades: skip hire, waterproofing, caulking, cleaning, inspection

---

## System Prompt (To Be Embedded in tradeAnalyser.ts)

```
You are the core logic engine for the Segal Build App.
Act as a Senior Victorian Estimator.
Convert rough builder notes into a professional, sequenced, and priced Scope of Works (SOW).

Constraints:
- Location: Victoria, Australia (VBA, HIA, MBA, NCC standards)
- Rates: Rawlinsons VIC and HIA/MBA market data
- Never skip invisible trades: skip hire, waterproofing, caulking, cleaning, inspections
- Every task has a lifecycle — generate preceding AND following trades

Phase 1: Input Deconstruction
- Extract: Quantity (m², lm, units), Material Quality (Standard/Mid/High), Access issues

Phase 2: Trade Chain Logic
- For every trade detected, generate the full chain:
  Tiling → Demo → Plumbing rough-in → Waterproofing AS3740 → Tiling → Grouting → Caulking
  Electrical → Rough-in → Inspection → Fit-off → Test & Tag
  Painting → Prep/Patch → Prime → Paint → Clean-up
  Plumbing → Rough-in → Pressure test → Fit-off → Inspection

Phase 3: Victorian Rate Application
- Labour: Victorian EBA or market sub-bie rates
- Materials: current supply chain costs
- Format: [Unit Rate] × [Quantity] = [Total]

Output format (strict):
Phase | Trade | Task | UOM | Qty | Rate (VIC) | Compliance Ref
```

---

## Required Output Table Format

| Phase | Trade | Itemized Task | UOM | Qty | Rate (VIC) | Compliance Ref |
|---|---|---|---|---|---|---|
| Prep | Demolition | Strip existing bathroom tiles | m² | 22 | $55.00 | Waste Management |
| Prep | Waterproofing | Liquid membrane to floor/walls | m² | 18 | $55.00 | AS 3740 |
| Services | Plumbing | Rough-in — shower, basin, toilet | allow | 1 | $3,200 | VBA Reg 72 |
| Finishes | Tiling | Supply & lay rectified porcelain | m² | 22 | $145.00 | AS 3958 |

---

## Phase Grouping (for BoQ display)

| Phase | Trades Included |
|---|---|
| Preparation | Demolition, Skip hire, Asbestos, Site setup |
| Structure | Carpentry, Steel, Concrete, Masonry, Waterproofing |
| Services | Electrical, Plumbing, HVAC, Gas, Data |
| Finishes | Tiling, Painting, Flooring, Plastering, Cabinetry |
| External | Decking, Paving, Fencing, Landscaping, Roofing |

---

## Trade Chain Map

| Trade Added | Auto-Chain Generated |
|---|---|
| Tiling | Demo → Plumbing rough-in → Waterproofing (AS3740) → Tiling → Grouting → Caulking |
| Painting | Prep/Patching → Priming → Painting → Clean-up |
| Electrical | Rough-in → Inspection → Fit-off → Test & Tag |
| Plumbing | Rough-in → Pressure test → Fit-off → Inspection |
| Waterproofing | Surface prep → Membrane (AS3740) → Flood test → Inspection cert |
| Internal Walls | Framing → Insulation → Sheeting → Setting → Painting |
| Flooring | Subfloor prep → Adhesive/clip system → Floor install → Skirting |

---

## Compliance Reference Library

| Ref | Meaning |
|---|---|
| AS 3740 | Waterproofing of domestic wet areas |
| AS 3958 | Ceramic tiles — installation |
| VBA Reg 72 | Victorian Building Authority — plumbing |
| NCC Section J | Energy efficiency |
| HIA | Housing Industry Association standards |
| MBA | Master Builders Association standards |

---

## Implementation Plan

### Phase 2 Step 2 (Next Session)
1. Embed system prompt above into `buildPrompt()` in `tradeAnalyser.ts`
2. Add Trade Chain suggestion logic
3. Add `phase` and `complianceRef` fields to `ParametricUnit` type

### Phase 2 Step 3
1. Create `src/utils/pricing/tradeChain.ts`
2. Wire into `handleAddScope()` in `VariationBuilder.tsx`
3. Display chain suggestions as dismissible cards in `TradeAnalysisPanel.tsx`

### Phase 2 Step 4
1. Add `phase` field to all parametric units
2. Add `complianceRef` to all parametric units
3. Group BoQ editor by phase in `Editors.tsx`

---

## Rate Correction Workflow

When AI rate is wrong:
1. Builder clicks rate field in BoQ editor
2. Edits rate directly
3. Adds note: "Rawlinsons VIC 2025 — $95/m²"
4. Rate persists on scope
5. Note visible in Builder View and on PDF

This is the Rate Override Mechanism — Phase 2 Step 6.
