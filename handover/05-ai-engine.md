# 05 — AI Engine: Victorian Estimator + Trade Chain
_This is 1 of 14 modules — see `handover/00-index.md` for the full list_

> **AI INSTRUCTION:** Request `src/utils/ai/tradeAnalyser.ts` and `src/utils/ai/tradeNormaliser.ts` before editing.

---

## Files To Request
- `src/utils/ai/tradeAnalyser.ts` — main AI engine
- `src/utils/ai/tradeNormaliser.ts` — normalisation + dedup
- `src/utils/services.ts` — Gemini API cascade

---

## Strategic Direction — Victorian Estimator

The AI engine now behaves as a **Senior Victorian Estimator**. The Gemini prompt in `tradeAnalyser.ts` has been upgraded with:
- Location: Victoria — VBA, HIA, MBA, NCC standards
- Rates: Rawlinsons VIC + HIA/MBA market data
- Never skip invisible trades: skip hire, waterproofing, caulking, cleaning, testing, certification
- Trade-chain thinking embedded in prompt instructions
- Compliance refs requested in trade-specific scope text
- Strict JSON-only output preserved so the app parser still works

See `handover/14-estimator-spec.md` for the full specification.

---

## Gemini Model Cascade (FREE ONLY)

| Priority | Model | Free RPM | Free RPD |
|---|---|---|---|
| 1 | gemini-2.5-flash | 10 | 250 |
| 2 | gemini-2.5-flash-lite | 15 | 1,000 |
| 3 | gemini-1.5-flash | 15 | 1,500 |
| 4 | gemini-2.0-flash | 5 | 100 |
| 5 | Keyword fallback | ∞ | ∞ |

**Rules:**
- NO paid models — ever
- On 429/503: mark model rate-limited for 65 seconds, try next
- If all fail: keyword fallback — app always works without a key
- Total free capacity: ~2,850 requests/day

---

## Trade Recognition Flow

```
Builder types scope description
        ↓
analyseScope() called
        ↓
API key present?
  YES → Gemini prompt → parseGeminiResponse() → normalise → dedup
  NO  → keywordFallback() → category IDs only (no pre-fills)
        ↓
TradeAnalysis[] returned
  - categoryId (normalised against real registry)
  - label
  - confidence
  - tradeScope (trade-specific, not full project narrative)
  - items[] (pre-filled parametric items with quantities)
  - subtotal
```

---

## Trade Normaliser

`tradeNormaliser.ts` handles:
- **Category ID aliases** — maps `internal-walls` → `internalWalls`, `wet-areas` → `bathroom`
- **Label-based fallback** — if ID not found, infers from label text
- **Over-broad scope sanitisation** — rejects trade scopes over 650 chars or containing multiple trade headers
- **Deduplication** — merges duplicate category detections, keeps highest confidence

---

## Trade Chain Logic (IMPLEMENTED — Session 10)

**File:** `src/utils/pricing/tradeChain.ts`

The builder flow now surfaces chain suggestions for currently supported categories. `TradeAnalysisPanel.tsx` calls `getTradeChainSuggestions()` and shows one-click `Add {Trade}` pills for implied work not already detected or added.

### Current examples
| Trade Added | Chain Suggestions |
|---|---|
| Plumbing | Waterproofing, Electrical |
| Waterproofing | Demolition, Plumbing |
| Electrical | Smart Home, Fire & Safety |
| Internal Walls | Insulation, Painting, Electrical |
| Ceilings | Insulation, Painting |
| Pergola | Electrical, Paving |
| Pools | Fencing, Electrical, Landscaping |

**Rule:** Chain trades are suggested, not forced. Builder accepts or rejects each suggestion individually.

---

## Current Keyword Trade Map

Covers 16 trade groups: electrical, plumbing, tiling, waterproofing, painting, flooring, demolition, structural, internalWalls, insulation, windowsDoors, ceilings, fireSafety, cabinetry, rendering, cladding.

---

## Getting a Free API Key
1. https://aistudio.google.com/apikey
2. Sign in with Google account
3. Create API Key — no credit card required
4. Paste into app Gemini Key field in Step 2 of the wizard
