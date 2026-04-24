# 00 — Master Index
_Last updated: Session 10 — Full architecture review + Victorian Estimator direction set_

> **⚠️ AI INSTRUCTION — READ THIS FIRST, EVERY TIME:**
> 1. You do NOT have access to the code — ask the user for every file you need
> 2. NEVER create files from scratch — ask first, read first, then edit
> 3. Files must stay under 300 lines — split if needed
> 4. Save every change immediately to disk
> 5. Run `npm run build` after every change and verify it passes
> 6. Update this index and relevant handover docs after every change

---

## What Is This Project?

**Segal Build** is a professional construction quoting and variation management app for Australian domestic builders. Built for Victoria — follows VBA, HIA, MBA, and Rawlinsons standards.

- **Stack:** React 19 + Vite 7 + TypeScript + Tailwind CSS v4
- **State:** localStorage (Firestore migration planned)
- **AI:** Google Gemini FREE tier only — cascades through models, keyword fallback always works
- **Build:** Single-file HTML via vite-plugin-singlefile → Firebase Hosting
- **Live:** https://segal-build-app.web.app
- **Repo:** https://github.com/hersvami/phase-2-rollout-execution

---

## How To Use This Handover

| You want to... | Read this |
|---|---|
| Understand the project | `handover/01-overview.md` |
| See all files on disk | `handover/02-file-structure.md` |
| Check what is built vs planned | `handover/03-features.md` |
| Work on categories / archetypes | `handover/04-categories.md` |
| Work on AI / Gemini / Trade Chain | `handover/05-ai-engine.md` |
| Work on pricing / BoQ / rates | `handover/06-pricing-engine.md` |
| Understand TypeScript types | `handover/07-data-types.md` |
| Work on the variation builder wizard | `handover/08-variation-builder.md` |
| Work on report views | `handover/09-report-views.md` |
| Build or deploy the app | `handover/10-deployment.md` |
| See the Phase 2 roadmap | `handover/11-phase2-roadmap.md` |
| Check past decisions | `handover/12-feedback-log.md` |
| Fix bugs / must-not-regress rules | `handover/13-required-fixes.md` |
| Read the Victorian Estimator spec | `handover/14-estimator-spec.md` |

---

## Current Build Status

- **Build:** ✅ Passing — `385.52 kB` single-file HTML
- **Phase 2 Step 1:** ✅ Complete — AI trade recognition, normalisation, dedup
- **Phase 2 Step 2:** 🔜 Next — Victorian Estimator system prompt upgrade
- **Phase 2 Steps 3–6:** 📋 Planned — see `handover/11-phase2-roadmap.md`

---

## What Has Changed Since Original Handover

| Area | Was | Now |
|---|---|---|
| Trade Recognition | Basic keyword matching | Full AI trade analyser + Gemini cascade + keyword fallback |
| Category System | Simple `cat()` factory | Phase 2 `catX()` with archetypes, `dimensionMode`, `usesParametric` |
| Pricing | Basic stage costs | Parametric BoQ + baseline multipliers + OH/Profit/Contingency/GST |
| Scope Input | Single text field | 5-step wizard: Baseline → Scope → Details → Pricing → Review |
| AI Prompt | Basic classification | Victorian Estimator system prompt (new strategic direction) |
| Trade Chain | Not conceived | Planned — `src/utils/pricing/tradeChain.ts` |
| Report Views | Placeholder | 3-tab: Builder / Customer / Progress |

---

## 5 Rules — Never Break These

1. **No "Decline" button** — always "Request Revised Quote"
2. **Gemini FREE only** — no paid models, no billing
3. **Files under 300 lines** — split into modules if needed
4. **All state in localStorage** — no Firebase database yet
5. **Build must pass** — never commit without running `build_project`
