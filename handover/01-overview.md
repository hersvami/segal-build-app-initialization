# 01 — Overview
_This is 1 of 14 modules — see `handover/00-index.md` for the full list_

> **AI INSTRUCTION:** Read this to understand the project before doing anything. Do NOT start coding until you have read `handover/00-index.md` first.

---

## What Is Segal Build?

A professional construction quoting and variation management tool for **Victorian domestic builders**. Enables builders to:
- Create projects with customer details and hero photo
- Generate AI-assisted multi-trade quotes using Rawlinsons/HIA-aligned pricing
- Issue formal variations against approved quotes
- Track progress with photos and stage updates
- Communicate with customers via 5-channel messaging

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript (strict) |
| Build | Vite 7 + vite-plugin-singlefile |
| Styling | Tailwind CSS v4 |
| Icons | lucide-react |
| State | localStorage — version-checked, APP_VERSION = "2.0" |
| AI | Google Gemini API (FREE tier only) |
| Photos | Cloudinary upload with base64 fallback |
| Hosting | Firebase Hosting |

---

## Two Companies Supported

| | Segal Build Pty Ltd | Segval |
|---|---|---|
| ABN | 83 671 632 230 | 22 334 455 667 |
| Phone | 0416 460 164 | 0416 460 164 |
| Email | james@thesegals.com.au | info@segval.com.au |
| Licence | DB-L 12345 (VBA) | — |
| Default OH | 12% | 12% |
| Default Profit | 15% | 15% |

---

## Core Workflow

```
New Project Created
      ↓
Welcome Email → Customer (5 channels: Gmail, Mail, Copy, WhatsApp, SMS)
      ↓
Builder creates QUOTE (5-step wizard)
   Step 1: Project Baseline (area, storeys, access, ceiling height)
   Step 2: Scope Input → AI detects trades → Trade cards shown
   Step 3: Details (dimensions, questions, BoQ per trade)
   Step 4: Pricing (OH + Profit + Contingency + GST)
   Step 5: Review & Save
      ↓
Report — 3 tabs
   Builder View: full cost transparency, margins, action log
   Customer View: professional letterhead, total only, T&Cs
   Progress Hub: photos, stage updates
      ↓
Customer approves → Quote status = APPROVED
      ↓
Builder issues VARIATIONS (only after approved quote exists)
```

---

## Pricing Formula

```
Trade Cost
  + Overhead %  (default 12%)
  + Profit %    (default 15%)
  + Contingency % (varies by category: 5–15%)
  + GST 10%
= Total to Customer
```

---

## 12 Non-Negotiable Rules

1. No "Decline" button — always "Request Revised Quote"
2. Gemini FREE tier only — no paid models, no billing
3. Files under 300 lines — split into modules
4. All state in localStorage — no Firebase database yet
5. Build must pass before any commit
6. Company logos loaded from GitHub raw URLs
7. Bump APP_VERSION to clear old data on upgrade
8. No cache on deploy — firebase.json has no-cache headers
9. Quote vs Variation are separate document types — different workflows
10. New Variation gated by approved quote (or external baseline)
11. New features must have a handover module
12. Rates are editable defaults — always show "Verify against current Rawlinsons"
