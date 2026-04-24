# 13 — Required Fixes & Must-Not-Regress Rules
_This is 1 of 14 modules — see `handover/00-index.md` for the full list_

> **READ BEFORE TOUCHING ANY FILE. These have been fixed before and must not break again.**

---

## Critical — Must Never Break

1. **Add button never fully blocked** — duplicate categories show amber "Add Anyway" with tooltip
2. **Gemini key persistence** — must restore with "Restored from previous session" badge on reload
3. **Project scope is GLOBAL** — never copy the polished narrative into category scopes
4. **Dimension audit** — honour `dimensionMode` per archetype. No generic width×length for all categories
5. **No "Decline" button** — always "Request Revised Quote" everywhere in the app
6. **Build must pass** — never commit without running build_project and seeing success

---

## UX Rules — Must Always Hold

- Recognise Categories button must show count pill ("Found 3 trades")
- All monetary values in AUD with $ symbol and correct formatting
- Rates must show disclaimer: "Editable default — verify against current Rawlinsons (2025 rates)"
- Welcome modal must show full email preview body, not compact summary
- Welcome email login must use customer email (not builder email)
- Temp password format: `SB-XXXXXXX`

---

## Technical Rules — Must Always Hold

- Every React component/file under 300 lines (data files exempt)
- Use `cn()` from `helpers.ts` for all conditional Tailwind classes
- All state survives page refresh via localStorage
- Pricing engine recalculates totals on ANY dimension change
- `InclusionItem` and `ExclusionItem` must always have `id` + `isDefault` fields
- `QuoteScope.answers` must always be `Record<string, string>` — never undefined
- `documentType: 'quote' | 'variation'` — never mix workflows

---

## Known Issues (Post Phase 2 Foundation)

- Category selector still uses `cat()` in some places — not yet fully migrated to `catX()`
- No archetype-specific dimension rendering yet — all show same generic form
- Bundle hiding not implemented — trades still appear after assembly added
- Category scopes not yet separated from project scope
- Parametric rate library incomplete — needs full 2025 Rawlinsons VIC audit
- PDF export not implemented
- ReportSendModal is minimal — needs full 5-channel send matching Welcome modal style
- `src/components/ProgressHub.tsx` exists in wrong location — should be `src/components/report/ProgressHub.tsx`

---

## Files That Must Not Be Accidentally Overwritten

- `src/types/domain.ts` — all domain types
- `src/logic/state.ts` — localStorage persistence
- `src/utils/services.ts` — Gemini cascade (free only)
- `src/utils/ai/tradeAnalyser.ts` — AI engine
- `src/components/VariationBuilder.tsx` — wizard shell
