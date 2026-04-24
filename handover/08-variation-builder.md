# 08 — Variation Builder: 5-Step Wizard
_This is 1 of 14 modules — see `handover/00-index.md` for the full list_

> **AI INSTRUCTION:** Request files listed below before editing. The wizard has many sub-components — do NOT touch files outside your scope.

---

## Files To Request
- `src/components/VariationBuilder.tsx` — wizard shell
- `src/components/variationBuilder/BuilderStepContent.tsx` — step router
- `src/components/variationBuilder/ScopeStep.tsx` — Step 2
- `src/components/variationBuilder/Editors.tsx` — Step 3 detail editor

---

## Wizard Steps

| Step | Component | Purpose |
|---|---|---|
| 1 — Baseline | `BaselineStep.tsx` | Area, storeys, access, ceiling height |
| 2 — Scope | `ScopeStep.tsx` | Trade recognition, browse, add scopes |
| 3 — Details | `Editors.tsx` (ScopeDetailEditor) | Dimensions, questions, BoQ, inclusions |
| 4 — Pricing | `PricingStep.tsx` | OH/Profit/Contingency controls + summary |
| 5 — Review | `ReviewStep.tsx` | Final review before save |

---

## Step 2: Scope — Sub-Components

| Component | Purpose |
|---|---|
| `ScopeInputPanel.tsx` | Textarea, Recognise button, Polish button, Gemini key |
| `TradeAnalysisPanel.tsx` | Detected trade cards: confidence, scope text, Add/Remove |
| `CategoryBrowserPanel.tsx` | Browse all 43 categories manually |
| `CategoryInfoPanel.tsx` | Expandable "what's inside" panel |
| `AddedScopesPanel.tsx` | Review of added scopes |

---

## Step 3: Details — Sub-Components

| Component | Purpose |
|---|---|
| `CategoryQuestions.tsx` | Category-specific questions (tile extent, vanity type etc.) |
| `DimensionInput.tsx` | Archetype-aware dimension fields |
| `ParametricEditor.tsx` | BoQ unit picker — rate × qty = subtotal + compliance refs |
| `phaseGrouping.ts` | Groups stage + parametric line items by estimator phase |
| `PCItemEditor.tsx` | PC items table |
| `EditableList.tsx` | Inclusions and Exclusions editor |

The Details step now also shows a **Phase Grouped BoQ** summary with 5 buckets:
- Preparation
- Structure
- Services
- Finishes
- External

---

## Draft Persistence

`builderDraft.ts` saves the wizard state to localStorage on every change:
- `scopeInput` — current scope text
- `selectedCategoryId` — last selected category
- `baseline` — project baseline values

Key: `segal:builderDraft:{projectId}:{docType}`

Restored on re-open so builder never loses work.

---

## Document Type Rules

| Rule | Quote | Variation |
|---|---|---|
| Badge | QTE | VAR |
| Always available | ✅ | ❌ — needs approved quote first |
| Reference quote | Not required | Required |
| Reason for change | Not required | Required |
| Variation number | Not assigned | V-001, V-002... |

---

## Gemini Key Persistence

- Stored: `localStorage` key `segal:geminiApiKey`
- Restored on load with "Restored from previous session" badge
- Cleared only when builder clicks "Clear key"
- Cross-tab sync via `storage` event listener

---

## Scope Factory

`createScopeFromCategory.ts` creates a `QuoteScope` from a category ID:
- Pulls default stages, inclusions, exclusions, PC items from category definition
- If `TradeAnalysis` provided: pre-fills parametric items from AI detection
- If assembly (Bathroom etc.): creates template scope with empty stages
- Runs `syncScopePricing()` to calculate stage costs from baseline dimensions
