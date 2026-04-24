# 11 — Phase 2 Roadmap
_This is 1 of 14 modules — see `handover/00-index.md` for the full list_

---

## Strategic Direction

Segal Build is becoming a **Victorian Estimator tool** — not just a scope builder. The two documents provided by the user confirm this direction. See `handover/14-estimator-spec.md` for the full specification.

---

## Phase 2 Steps — Status

### ✅ Step 1: Trade Recognition (Complete)
- One-pass AI trade detection via Gemini
- Keyword fallback always works
- Trade ID normalisation + dedup
- Trade-specific scope text (not full project narrative)
- Bathroom shower-screen question added

### 🔜 Step 2: Victorian Estimator Prompt Upgrade (Next)
**File:** `src/utils/ai/tradeAnalyser.ts`
- Replace basic prompt with full Victorian Estimator system prompt
- Embed Trade Chain logic
- Add invisible trades rule (skip hire, caulking, cleaning)
- Add VBA/AS3740/NCC compliance refs to output
- Output format: Phase / Trade / Task / UOM / Qty / Rate / Compliance Ref

### 🔜 Step 3: Trade Chain Logic
**New file:** `src/utils/pricing/tradeChain.ts`
- Lookup table: trade → [preceding trades] + [following trades]
- When trade added: suggest chain trades as cards
- Builder accepts/rejects each
- Examples:
  - Tiling → Demo + Waterproofing + Grouting + Caulking
  - Electrical → Rough-in + Fit-off + Test & Tag
  - Plumbing → Rough-in + Pressure test + Fit-off

### 🔜 Step 4: Parametric Library Expansion + Compliance Refs
**File:** `src/utils/pricing/parametricUnits.ts`
- Add `complianceRef` field to all units
- Add `phase` field: Preparation / Structure / Services / Finishes / External
- Full Rawlinsons VIC 2025 rate audit across all 43 categories
- Material quality (Standard/Mid/High) feeds rate multipliers

### 🔜 Step 5: Phase Grouping in BoQ Output
**File:** `src/components/variationBuilder/Editors.tsx`
- Group BoQ line items by Phase
- Matches Victorian estimator output format
- Builder sees: Preparation / Structure / Services / Finishes / External

### 🔜 Step 6: Rate Override Mechanism
**File:** `src/components/variationBuilder/PricingStep.tsx`
- Builder can override any unit rate
- Override note: "Rawlinsons VIC 2025 — $95/m²"
- Override persists on the scope

### ✅ Step 7: PDF Export — Done
- Professional Australian format with company letterhead
- Phase-grouped BoQ (Preparation / Structure / Services / Finishes / External)
- Compliance references included
- Pricing summary with OH/Profit/Contingency/GST breakdown
- T&Cs footer with validity period
- Download button in VariationReport

### 📋 Future
- Firebase Firestore (replace localStorage)
- Customer portal (view/approve online)
- Authentication (builder vs customer)
- CPI auto-escalation (ABS quarterly)
- Xero/MYOB integration
- Offline mode

---

## Approved Execution Plan — Prioritised First Steps

_Approved in Session 10. Execute in this exact order. Update status as each completes._

### Step A — Upgrade the Gemini System Prompt ✅ Done
**File:** `src/utils/ai/tradeAnalyser.ts`
**What:** Replaced the basic prompt with a Victorian Estimator system prompt. Added: Victorian framing, VBA/HIA/MBA/NCC context, invisible trades rule, trade-chain thinking, compliance refs in tradeScope, quantity/material/access deconstruction, and stricter JSON instructions.
**Impact:** Immediate — every AI recognition call is now more estimator-like without changing the app schema.
**Time:** 1 × 8-min block
**Status:** ✅ Done in Session 10

### Step B — Add Trade Chain Logic ✅ Done
**File:** New `src/utils/pricing/tradeChain.ts`
**What:** Added a trade-chain lookup for current categories and wired it into `TradeAnalysisPanel.tsx`. Detected trade cards now surface dismissible `Add {Trade}` chain suggestions for implied upstream/downstream work. Suggestions are not forced — builder chooses each one.
**Impact:** App now exposes missing linked trades during scope building instead of relying on the builder to remember them.
**Time:** 1 × 8-min block
**Status:** ✅ Done in Session 10

### Step C — Add Compliance Ref to Parametric Units ✅ Done
**File:** `src/utils/pricing/parametricUnits.ts`
**What:** Added derived `complianceRef` support across the full unit library and surfaced the reference in `ParametricEditor.tsx` for both selected items and the add-item picker.
**Impact:** Builders now see which BoQ items carry key compliance obligations (e.g. AS 3740, AS/NZS 3000, NCC Section J).
**Time:** 1 × 8-min block
**Status:** ✅ Done in Session 10

### Step D — Phase Grouping in BoQ ✅ Done
**File:** `src/components/variationBuilder/Editors.tsx`
**What:** Added a phase-grouped BoQ summary using a new helper file `phaseGrouping.ts`. The editor now groups stage and parametric items into Preparation / Structure / Services / Finishes / External while preserving existing editable controls.
**Impact:** The builder now sees the scope priced in estimator-friendly phase buckets instead of a flat list.
**Time:** 1 × 8-min block
**Status:** ✅ Done in Session 10

### Step E — Rate Override Mechanism ✅ Done
**File:** `src/components/variationBuilder/PricingStep.tsx` + `src/types/domain.ts`
**What:** Added `rateOverrideNote` to `JobStage` and leveraged existing `notes` on `ParametricItem`. PricingStep now shows inline ✏️ buttons to add a rate justification note to any stage cost or BoQ rate. Notes persist on the scope and display as amber italic text below the item.
**Impact:** Builder can override any rate and document the reason (e.g. "Rawlinsons VIC 2025 — $95/m²").
**Time:** 1 × 8-min block
**Status:** ✅ Done in Session 10

---

## Workflow Discipline (Every Session)

1. Get explicit green light before starting
2. Work in 8-minute windows — stop and report when time is up
3. Save every file change immediately to disk
4. Keep all files under 300 lines
5. Run `build_project` after every change
6. Update relevant handover docs before stopping
7. Never claim build passed without running build_project tool
