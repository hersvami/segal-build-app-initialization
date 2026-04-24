# 09 — Report Views
_This is 1 of 14 modules — see `handover/00-index.md` for the full list_

> **AI INSTRUCTION:** Request report files before editing. Never show builder margins in Customer View.

---

## Files To Request
- `src/components/report/VariationReport.tsx` — 3-tab container
- `src/components/report/BuilderView.tsx` — full cost view
- `src/components/report/CustomerView.tsx` — client-facing view
- `src/components/report/CustomerViewParts.tsx` — scope sections + photos
- `src/components/report/ProgressHub.tsx` — progress tracking
- `src/components/report/ReportSendModal.tsx` — multi-channel sender

---

## 3-Tab Structure

`VariationReport.tsx` is the container. It shows:
- QTE/VAR badge + title + status pill + Total
- 3 tab buttons: Builder / Customer / Progress
- Active tab content below

---

## Tab 1: Builder View

**Shows to builder only — never shown to customer.**

- Full cost breakdown: Trade Cost / Overhead / Profit / Contingency / GST / Total
- Action log: all status changes and notes with timestamps
- Status action buttons: Mark Sent → Mark Approved / Request Revised Quote
- Internal note input: add notes to action log
- Scope list with category labels and descriptions

**Rule:** No "Decline" button — always "Request Revised Quote"

---

## Tab 2: Customer Preview

**Professional letterhead — shown to or sent to customer.**

- Company name, ABN, licence, phone, email
- QTE/VAR label + variation number if applicable
- Project name, address, customer name, date
- Scope sections: category label + description + inclusions/exclusions
- PC items table (where applicable)
- Progress photos grid (if any uploaded)
- **Total incl GST only** — never shows margins, OH, or profit
- T&Cs footer: valid 30 days, all prices incl GST, payment per contract

---

## Tab 3: Progress Hub

- Add progress photo (PhotoCapture — Cloudinary + base64 fallback)
- Progress photo grid
- Add progress update (text + timestamp)
- Update log

---

## Report Send Modal (IMPLEMENTED)

`ReportSendModal.tsx` — triggered by Send button on `VariationReport.tsx`.

5 channels — matching the Welcome Message modal style:
- Gmail (opens mail.google.com with pre-filled to/subject/body)
- Mail App (mailto: link)
- Copy (clipboard with Copied! feedback)
- WhatsApp (wa.me link — disabled if no phone)
- SMS (sms: link — disabled if no phone)

Features:
- Full message preview with company ABN, scope list, total
- Auto marks variation status as `sent` on first send
- Logs send action to variation changeLog

---

## Status Colour Coding

| Status | Colour |
|---|---|
| draft | Slate |
| sent | Blue |
| approved | Emerald |
| rejected | Red |
