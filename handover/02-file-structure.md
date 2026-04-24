# 02 — File Structure
_This is 1 of 14 modules — see `handover/00-index.md` for the full list_

> **AI INSTRUCTION:** This lists every file currently on disk. Use this to know what to ask the user for. UPDATE THIS FILE whenever you add or delete a file.

---

## Root Files
| File | Purpose |
|---|---|
| `index.html` | Entry HTML — Segal Build title |
| `firebase.json` | Firebase hosting — no-cache headers |
| `.firebaserc` | Links to Firebase project: segal-build-app |
| `package.json` | Dependencies and scripts |
| `vite.config.ts` | Vite + singlefile plugin |
| `tsconfig.json` | TypeScript configuration |
| `README.md` | Points to handover/00-index.md |

## Entry Points
| File | Purpose |
|---|---|
| `src/main.tsx` | React DOM entry point |
| `src/index.css` | Tailwind CSS v4 import |
| `src/App.tsx` | Main app — routing, state, modals (~280 lines) |

## Types
| File | Purpose |
|---|---|
| `src/types/domain.ts` | All domain types: Project, Variation, QuoteScope, PCItem |
| `src/types/appState.ts` | Application state shape |

## Constants & Logic
| File | Purpose |
|---|---|
| `src/constants/companies.ts` | Segal Build + Segval company configs |
| `src/logic/state.ts` | localStorage persistence, project/variation CRUD |
| `src/utils/helpers.ts` | UUID, currency formatter, cn(), export |
| `src/utils/cn.ts` | Tailwind class merger (legacy — helpers.ts also exports cn) |
| `src/utils/services.ts` | Gemini AI cascade + Cloudinary upload |

## Categories
| File | Purpose |
|---|---|
| `src/utils/categories/types.ts` | `CategoryArchetype`, `cat()`, `catX()`, control flags |
| `src/utils/categories/core.ts` | 20 core categories — Bathroom + Electrical on catX() |
| `src/utils/categories/extended.ts` | 23 extended categories — InternalWalls + FireSafety on catX() |
| `src/utils/categories/categoryTypeOptions.ts` | Material/type option lists per category |

## AI Engine
| File | Purpose |
|---|---|
| `src/utils/ai/tradeAnalyser.ts` | One-pass Gemini trade recognition + keyword fallback |
| `src/utils/ai/tradeNormaliser.ts` | Category ID normalisation + trade dedup |

## Pricing Engine
| File | Purpose |
|---|---|
| `src/utils/pricing/types.ts` | StageTemplate, SolutionTemplate types |
| `src/utils/pricing/constants.ts` | Trade markers, overhead rates |
| `src/utils/pricing/engine.ts` | Solution generator + scope-total helpers |
| `src/utils/pricing/quoteCalculator.ts` | OH + Profit + Contingency + GST |
| `src/utils/pricing/quoteDefaults.ts` | Pre-filled PC items, inclusions, exclusions |
| `src/utils/pricing/scopeRecogniser.ts` | Keyword scope classification |
| `src/utils/pricing/parametricUnits.ts` | Rawlinsons-style unit-rate library |
| `src/utils/pricing/baselineMultipliers.ts` | Scaffolding + site access surcharge |
| `src/utils/pricing/index.ts` | Barrel exports |

## Core Components
| File | Purpose |
|---|---|
| `src/components/Sidebar.tsx` | Company logo, switcher, project list |
| `src/components/WelcomeScreen.tsx` | Landing page with company branding |
| `src/components/ProjectForm.tsx` | New project form + hero photo |
| `src/components/ProjectChat.tsx` | Internal notes + contact customer |
| `src/components/LoadingSpinner.tsx` | Reusable spinner |
| `src/components/PhotoCapture.tsx` | Upload/camera — Cloudinary + base64 fallback |
| `src/components/SendWelcomeEmailModal.tsx` | 5-channel welcome message sender |
| `src/components/ExternalQuoteModal.tsx` | External quote baseline for non-app jobs |
| `src/components/VariationBuilder.tsx` | 5-step wizard shell |
| `src/components/welcomeMessages.ts` | Email + SMS message builders |

## Variation Builder Sub-Components
| File | Purpose |
|---|---|
| `src/components/variationBuilder/BaselineStep.tsx` | Step 1: area, storeys, access, ceiling height |
| `src/components/variationBuilder/BuilderHeader.tsx` | Wizard header + step pills |
| `src/components/variationBuilder/BuilderStepContent.tsx` | Routes each step to sub-component |
| `src/components/variationBuilder/ScopeStep.tsx` | Step 2 container |
| `src/components/variationBuilder/ScopeInputPanel.tsx` | Textarea, recognise, polish, Gemini key |
| `src/components/variationBuilder/TradeAnalysisPanel.tsx` | Detected trade cards: Add/Remove/Add All |
| `src/components/variationBuilder/CategoryBrowserPanel.tsx` | Browse all categories |
| `src/components/variationBuilder/CategoryInfoPanel.tsx` | Expandable category detail panel |
| `src/components/variationBuilder/AddedScopesPanel.tsx` | Review of added scopes |
| `src/components/variationBuilder/Editors.tsx` | ScopeDetailEditor — description, BoQ, stages |
| `src/components/variationBuilder/CategoryQuestions.tsx` | Category-specific questions |
| `src/components/variationBuilder/ParametricEditor.tsx` | BoQ unit picker |
| `src/components/variationBuilder/EditableList.tsx` | Inclusions/Exclusions editor |
| `src/components/variationBuilder/PCItemEditor.tsx` | PC items table |
| `src/components/variationBuilder/DimensionInput.tsx` | Numeric m/lm input |
| `src/components/variationBuilder/PricingStep.tsx` | Step 4: markup controls + summary |
| `src/components/variationBuilder/ReviewStep.tsx` | Step 5: final review |
| `src/components/variationBuilder/builderDraft.ts` | Draft persistence helpers |
| `src/components/variationBuilder/builderShared.ts` | Shared constants + grouping |
| `src/components/variationBuilder/createScopeFromCategory.ts` | Scope factory |
| `src/components/variationBuilder/scopePricing.ts` | Stage-cost sync, template detection |

## Report Views
| File | Purpose |
|---|---|
| `src/components/report/VariationReport.tsx` | 3-tab container: Builder / Customer / Progress |
| `src/components/report/BuilderView.tsx` | Full cost breakdown, action log |
| `src/components/report/CustomerView.tsx` | Professional letterhead, total only |
| `src/components/report/CustomerViewParts.tsx` | Scope sections + progress photos |
| `src/components/report/ProgressHub.tsx` | Photo upload + progress updates |
| `src/components/report/ReportSendModal.tsx` | Multi-channel report sender |

## Planned (Not Yet Created)
| File | Purpose |
|---|---|
| `src/utils/pricing/tradeChain.ts` | Trade Chain auto-generation logic |
