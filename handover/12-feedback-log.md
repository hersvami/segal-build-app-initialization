# 12 — Feedback Log
_This is 1 of 14 modules — see `handover/00-index.md` for the full list_

> **READ THIS BEFORE IMPLEMENTING ANYTHING. DO NOT REPEAT PAST MISTAKES.**

---

## All Feedback Items

| # | Session | Feedback | Status |
|---|---|---|---|
| 1 | 1 | Build module by module, report progress | ✅ Done |
| 2 | 1 | Files must stay under 300 lines | ✅ Done |
| 3 | 1 | Is there upper storey extension? | ✅ Done — in structuralExtensions |
| 4 | 1 | Implement Gemini AI service | ✅ Done — services.ts free cascade |
| 5 | 1 | Implement Cloudinary image upload | ✅ Done — services.ts + PhotoCapture |
| 6 | 1 | Customer gets photos in reports? | ✅ Done — CustomerViewParts.tsx |
| 7 | 1 | Quote vs Variation separation | ✅ Done — separate documentTypes, QTE/VAR |
| 8 | 1 | Variation for external/non-app job | ✅ Done — ExternalQuoteModal |
| 9 | 2 | Save all work in environment for testing | ✅ Done |
| 10 | 2 | Welcome message needs portal login details | ✅ Done |
| 11 | 2 | Welcome message via SMS/WhatsApp too | ✅ Done — 5 channels |
| 12 | 2 | Message should say download/view quotation | ✅ Done |
| 13 | 2 | Hero photo upload on project creation | ✅ Done |
| 14 | 2 | Gemini should be free only | ✅ Done |
| 15 | 2 | Gemini model fallback chain | ✅ Done — Flash→Lite→1.5→2.0→keyword |
| 16 | 2 | Handover too big, split into indexed sub-files | ✅ Done |
| 17 | 2 | Update master handover as we go | ✅ Done |
| 18 | 2 | ReportSendModal missing | ✅ Done |
| 19 | 2 | Customer photos in report missing | ✅ Done |
| 20 | 2 | Gemini API key instructions with link | ✅ Done |
| 21 | 2 | Which handover structure is better | ✅ Done — migrated to handover/ folder |
| 22 | 3 | How to Use must be first thing read | ✅ Done |
| 23 | 3 | Remove obsolete/duplicate files | ✅ Done |
| 24 | 3 | New features must have handover modules | ✅ Done — rule in 00-index.md |
| 25 | 3 | Check audit section by section against handover | ✅ Done |
| 26 | 3 | Fix Builder View action log not saved | ✅ Done |
| 27 | 3 | Handover modules should be self-contained AI prompts | ✅ Done |
| 28 | 4 | Each module must assume AI has NO code access | ✅ Done |
| 29 | 4 | Include module for final AI to combine everything | ✅ Done — 12-final-assembly.md |
| 30 | 4 | Each module must reference other modules | ✅ Done |
| 31 | 5 | Bigger scope window (multi-line) | ✅ Done |
| 32 | 5 | API key must be remembered across sessions | ✅ Done |
| 33 | 5 | Project Baseline before scopes | ✅ Done — BaselineStep.tsx |
| 34 | 5 | Parametric / Rawlinsons-style unit pricing | 🟡 Partial — needs full rate audit |
| 35 | 5 | Recognise Categories button does nothing visible | ✅ Done — feedback pill |
| 36 | 5 | Bathroom didn't auto-pull bundled trades | ✅ Done |
| 37 | 5 | No way to expand a category to see what's inside | ✅ Done — CategoryInfoPanel |
| 38 | 5 | Internal Walls falsely locked Electrical | ✅ Done |
| 39 | 5 | Add button hard-disabled when warning shown | ✅ Done — amber Add Anyway |
| 40 | 6 | Bathroom = Room Assembly | 📋 Planned Phase 2 |
| 41 | 6 | Strict dimension audit | 📋 Planned Phase 2 Step 2 |
| 42 | 6 | Project Scope vs Category Scope separation | 📋 Planned Phase 2 Step 3 |
| 43 | 6 | Realistic Rawlinsons rates | 📋 Planned Phase 2 Step 4 |
| 44 | 6 | Assembly questions drive bundled-trade quantities | 📋 Planned Phase 2 |
| 45 | 7 | Welcome email professional format | ✅ Done |
| 46 | 8 | Add Skip for Now to Welcome modal | ✅ Done |
| 47 | 8 | Fix ALL type mismatches | ✅ Done |
| 48 | 8 | Cloudinary auto-upload with base64 fallback | ✅ Done |
| 49 | 8 | Bundled trades expansion logic | ✅ Done |
| 50 | 8 | Two-tier baseline surcharge model | ✅ Documented |
| 51 | 8 | Parametric units for 27 categories | 📋 Planned Phase 2 Step 4 |
| 52 | 8 | Welcome email uses customer email/login | ✅ Done |
| 53 | 8 | Welcome modal shows full approved body | ✅ Done |
| 54 | 9 | Trade detection + scope sanitisation + shower screen | ✅ Done |
| 55 | 10 | Victorian Estimator system prompt direction | 📋 Phase 2 Step 2 |
| 56 | 10 | Trade Chain logic | 📋 Phase 2 Step 3 — new tradeChain.ts |
| 57 | 10 | Handover restructured to 14 modules | ✅ Done this session |
| 58 | 10 | 8-minute working windows, save immediately, 300-line limit | ✅ Rules enforced |
| 59 | 10 | Victorian Estimator system prompt must be embedded in the AI engine | ✅ Done — `tradeAnalyser.ts` prompt upgraded with Victorian estimator framing, invisible trades rule, trade-chain thinking, compliance refs, and strict JSON output |
| 60 | 10 | Add Trade Chain logic so implied linked trades can be surfaced in the builder flow | ✅ Done — new `tradeChain.ts` + `TradeAnalysisPanel.tsx` now shows per-trade chain suggestions with one-click add |
| 61 | 10 | Add Compliance Ref to parametric BoQ items | ✅ Done — `parametricUnits.ts` now derives compliance refs and `ParametricEditor.tsx` shows them in the BoQ and picker |
| 62 | 10 | Group BoQ output by estimator phases | ✅ Done — new `phaseGrouping.ts` + `Editors.tsx` now show Phase Grouped BoQ sections for Preparation / Structure / Services / Finishes / External |
| 63 | 10 | Rate Override Mechanism — builder must be able to override rates with a note | ✅ Done — `PricingStep.tsx` rewritten with inline ✏️ override notes for stages and BoQ items, `JobStage.rateOverrideNote` added to domain types |
| 64 | 10 | Wire ReportSendModal into VariationReport so builder can send quotes to customers | ✅ Done — `ReportSendModal.tsx` upgraded to 5-channel (Gmail, Mail, Copy, WhatsApp, SMS) with message preview, wired into `VariationReport.tsx` with Send button + auto mark-as-sent |
| 65 | 10 | PDF Export for quotes/variations | ✅ Done — `pdfGenerator.ts` creates professional PDF with company letterhead, phase-grouped BoQ, compliance refs, pricing summary, T&Cs footer; Download button in VariationReport |
| 66 | 10 | Phase field on parametric units | ✅ Done — all 50+ parametric units now have explicit `phase` field (preparation/structure/services/finishes/external); phase grouping now uses explicit phase when available |

---

## How to Update This Log
1. Add row with next number + current session
2. Status: ⏳ working → ✅ done / 📋 planned
3. Update related handover modules
