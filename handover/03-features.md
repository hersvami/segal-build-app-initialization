# 03 — Features: Built vs Planned
_This is 1 of 14 modules — see `handover/00-index.md` for the full list_

---

## ✅ Built — Phase 1 Complete

- Multi-line project scope textarea with AI "Polish with Gemini" button
- Persistent Gemini API key (localStorage — restored badge on reload)
- 5-channel welcome message (Gmail, Mail App, Copy, WhatsApp, SMS)
- Hero photo on project creation (Cloudinary + base64 fallback)
- Project Baseline step: quoted area, storeys, site access, ceiling height
- Baseline multipliers: scaffolding cost + site access labour surcharge
- Parametric BoQ editor: unit rate × quantity = subtotal
- 43 trade categories with stages, inclusions, exclusions, PC items
- Scope recognition: AI one-pass trade detection + keyword fallback
- Trade cards: Add / Remove / Add All with pre-filled BoQ items
- Trade Chain suggestions: detected trade cards can now surface one-click implied linked trades
- Parametric BoQ items now show compliance references (AS 3740, AS/NZS 3000, NCC Section J etc.) in the editor and picker
- Phase Grouped BoQ now shows scope cost buckets: Preparation / Structure / Services / Finishes / External
- Rate Override Mechanism: builder can edit any rate in the Pricing step and attach a justification note (e.g. "Rawlinsons VIC 2025 — $95/m²")
- Report Send Modal: 5-channel quote/variation delivery (Gmail, Mail, Copy, WhatsApp, SMS) with message preview and auto mark-as-sent
- PDF Export: professional quote/variation PDF with company letterhead, phase-grouped BoQ, compliance refs, pricing summary, T&Cs
- 5-step variation wizard: Baseline → Scope → Details → Pricing → Review
- OH + Profit + Contingency + GST pricing pipeline
- External quote baseline (for jobs not originally quoted in-app)
- 3-tab report: Builder View / Customer Preview / Progress Hub
- Progress photos and progress updates
- Action log in Builder View
- Multi-company support: Segal Build + Segval

---

## ✅ Built — Phase 2 Foundation Complete

- Archetype system: `assembly` | `trade` | `element` | `compliance`
- `catX()` constructor for explicit archetype categories
- 4 pilot categories fully migrated to `catX()`:
  - Bathroom (assembly) — manual room template
  - Electrical (trade) — parametric BoQ
  - Internal Walls (element) — wall dimension mode
  - Fire & Safety (compliance) — count only
- Trade-first recognition: AI detects independent priced trades only
- Trade-specific scope text per trade card
- Manual room templates clearly labelled — no auto-pricing
- Category normalisation + dedup in trade analyser
- `tradeNormaliser.ts` — handles category ID aliases + over-broad scope sanitisation
- Shower screen question added to Bathroom

---

## 🔜 Planned — Phase 2 Next Steps

### Immediate (Next Sessions)
- **Victorian Estimator system prompt** — upgrade `tradeAnalyser.ts` prompt
- **Trade Chain logic** — `tradeChain.ts` — auto-generate preceding + following trades
- **ReportSendModal** — wire Send button into VariationReport
- **Phase grouping in BoQ** — Prep / Structure / Services / Finishes / External

### Short Term
- **Compliance Ref column** — VBA, AS 3740, NCC refs in parametric units
- **Rate override mechanism** — builder corrects rates against Rawlinsons
- **Material quality → rate multiplier** — Standard/Mid/High feeds pricing
- **Quantity extraction fallback** — regex pulls m²/lm/units from builder notes

### Medium Term
- Full Rawlinsons VIC rate audit across all 43 categories
- PDF export with professional Australian formatting
- Firebase Firestore migration (from localStorage)
- Customer portal (view/approve quotes online)

### Long Term
- Authentication (builder vs customer roles)
- CPI auto-escalation (ABS quarterly index)
- Xero/MYOB integration
- Offline mode (service worker)

---

## ❌ Not Yet Implemented
- PDF export
- Firebase database
- Authentication
- Customer portal
- Variation visual diff (before/after pricing)
- Trade Chain auto-generation
- Compliance Ref column
- Full 2025 Rawlinsons rate audit
