/* ─── Segal Build — Trade Analyser ───────────────────────────────────────────
 * ONE Gemini call on "Recognise Categories":
 * → detects which trades are needed
 * → pre-fills parametric items + quantities per trade
 * → suggests related items the builder may have missed
 *
 * If Gemini fails or no API key → keyword fallback (no pre-fills).
 * ─────────────────────────────────────────────────────────────────────────── */

import { PARAMETRIC_UNITS } from '../pricing/parametricUnits';
import { getAllCategories } from '../pricing/scopeRecogniser';
import { buildTradeScopeSummary, dedupeTradeAnalyses, normaliseCategoryId } from './tradeNormaliser';

export type TradeItem = {
  unitId: string;
  label: string;
  unit: string;
  rate: number;
  quantity: number;
  isPreFilled: boolean;
  reason?: string;
};

export type TradeAnalysis = {
  categoryId: string;
  label: string;
  confidence: number;
  tradeScope: string;
  items: TradeItem[];
  suggestions: TradeItem[];
  subtotal: number;
};

export type AnalysisResult = {
  trades: TradeAnalysis[];
  model?: string;
  fallback: boolean;
};

function buildPrompt(scopeText: string, projectAreaM2: number): string {
  const unitList = PARAMETRIC_UNITS.map(u => `${u.id}|${u.categoryId}|${u.label}|${u.unit}|${u.rate}`).join('\n');
  const validCategories = getAllCategories()
    .filter((c) => c.archetype !== 'assembly')
    .map((c) => `- ${c.id} (${c.label})`)
    .join('\n');

  return `System Role: You are a Senior Victorian Residential Estimator for a Tier-1 domestic builder. Your job is to convert rough builder notes into a professional, sequenced, and priced multi-trade scope package for Victoria, Australia.

Location + standards:
- Victoria, Australia only
- Follow VBA, HIA, MBA and NCC expectations
- Prioritise Rawlinsons VIC and HIA/MBA market rates
- Never skip invisible but necessary trades when clearly implied: demolition, skip hire, waterproofing, screeding/sheeting, grouting, caulking, cleaning, testing, certification, fit-off

Builder notes:
"""${scopeText}"""
Project area: ${projectAreaM2}m²

Valid category IDs you may use (must use ONLY these IDs):
${validCategories}

Available priced unit items (id|categoryId|label|unit|rate):
${unitList}

Operational process:
1. Deconstruct the notes: identify quantity, likely material quality, and access/site issues if mentioned.
2. Detect all independent priced trades required for the job.
3. Apply Victorian trade-chain thinking. Example chains:
   - Tiling renovation: demolition -> plumbing rough-in -> sheeting/screeding -> waterproofing AS3740 -> tiling -> grouting -> caulking
   - Electrical: rough-in -> fit-off -> testing/certification
   - Plumbing: rough-in -> pressure test -> fit-off
4. If a chain trade is clearly implied but not explicitly written, include it as a suggested item or implied trade scope.

Return JSON ONLY, no markdown, no commentary, using this exact schema:
{
  "trades": [
    {
      "categoryId": "electrical",
      "label": "Electrical",
      "confidence": 0.95,
      "tradeScope": "1-3 sentences describing ONLY the electrical works for this project, sequenced professionally and referencing compliance where relevant.",
      "preFilledItems": [
        { "unitId": "el-downlight", "quantity": 6, "reason": "6 LED downlights to new bedroom and bathroom" }
      ],
      "suggestedItems": [
        { "unitId": "el-gpo-double", "quantity": 2, "reason": "Additional power points typically required for fit-off" }
      ]
    }
  ]
}

Rules:
- MUST ONLY use category IDs from the valid list above.
- NEVER return room assemblies such as bathroom, kitchen, laundry or toilet/wc as detected trades.
- Detect only independent priced trades that will actually be quoted.
- tradeScope must be specific to that trade only, never the full project narrative.
- tradeScope must be concise: 1-3 sentences, professional, Victorian estimator tone.
- Mention key compliance refs in plain text where relevant (for example AS3740 for waterproofing, AS/NZS 3000 for electrical, AS3786 for smoke alarms).
- preFilledItems = explicitly mentioned or strongly evidenced in the notes.
- suggestedItems = commonly required chain items not clearly mentioned, max 5 per trade.
- Use realistic quantities based on the notes and project area.
- confidence must be between 0.1 and 1.0.
- Return valid JSON only.`;
}

function parseGeminiResponse(text: string): TradeAnalysis[] {
  try {
    const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const parsed = JSON.parse(cleaned);
    const trades: TradeAnalysis[] = [];

    for (const t of parsed.trades || []) {
      const categoryId = normaliseCategoryId(t.categoryId, t.label);
      if (!getAllCategories().some((c) => c.id === categoryId)) continue;

      const items: TradeItem[] = (t.preFilledItems || [])
        .map((item: any) => {
          const unit = PARAMETRIC_UNITS.find((u) => u.id === item.unitId);
          if (!unit) return null;
          return { unitId: unit.id, label: unit.label, unit: unit.unit, rate: unit.rate, quantity: item.quantity || 1, isPreFilled: true, reason: item.reason };
        })
        .filter(Boolean) as TradeItem[];

      const suggestions: TradeItem[] = (t.suggestedItems || [])
        .map((item: any) => {
          const unit = PARAMETRIC_UNITS.find((u) => u.id === item.unitId);
          if (!unit) return null;
          return { unitId: unit.id, label: unit.label, unit: unit.unit, rate: unit.rate, quantity: item.quantity || 1, isPreFilled: false, reason: item.reason };
        })
        .filter(Boolean) as TradeItem[];

      trades.push({
        categoryId,
        label: getAllCategories().find((c) => c.id === categoryId)?.label || t.label,
        confidence: t.confidence || 0.5,
        tradeScope: buildTradeScopeSummary(t.label || categoryId, items, t.tradeScope || ''),
        items,
        suggestions,
        subtotal: items.reduce((sum, i) => sum + i.rate * i.quantity, 0),
      });
    }
    return dedupeTradeAnalyses(trades);
  } catch {
    return [];
  }
}

const KEYWORD_TRADE_MAP: Record<string, { label: string; keywords: string[] }> = {
  electrical: { label: 'Electrical', keywords: ['electrical', 'electrician', 'power point', 'gpo', 'downlight', 'light', 'switch', 'switchboard', 'exhaust fan', 'smoke alarm'] },
  plumbing: { label: 'Plumbing & Drainage', keywords: ['plumbing', 'plumber', 'hot water', 'drainage', 'toilet', 'shower', 'basin', 'tap', 'pipe', 'sewer', 'gas'] },
  tiling: { label: 'Tiling', keywords: ['tile', 'tiling', 'ceramic', 'porcelain', 'grout'] },
  waterproofing: { label: 'Waterproofing', keywords: ['waterproof', 'membrane', 'as3740'] },
  painting: { label: 'Painting', keywords: ['paint', 'painting', 'primer', 'undercoat'] },
  flooring: { label: 'Flooring', keywords: ['floor', 'carpet', 'timber floor', 'vinyl'] },
  demolition: { label: 'Demolition', keywords: ['demo', 'demolition', 'remove', 'strip out'] },
  internalWalls: { label: 'Internal Walls', keywords: ['stud wall', 'framing', 'plasterboard', 'partition'] },
  insulation: { label: 'Insulation', keywords: ['insulation', 'batt', 'insulate'] },
  windowsDoors: { label: 'Windows & Doors', keywords: ['window', 'door', 'glazing'] },
  ceilings: { label: 'Ceilings', keywords: ['ceiling', 'cornice'] },
  fireSafety: { label: 'Fire & Safety', keywords: ['smoke alarm', 'fire safety'] },
  cabinetry: { label: 'Cabinetry & Joinery', keywords: ['vanity', 'cabinet', 'joinery'] },
};

function keywordFallback(scopeText: string): TradeAnalysis[] {
  const lower = scopeText.toLowerCase();
  const detected: TradeAnalysis[] = [];
  for (const [categoryId, config] of Object.entries(KEYWORD_TRADE_MAP)) {
    const matched = config.keywords.filter(kw => lower.includes(kw));
    if (matched.length === 0) continue;
    const confidence = Math.min(matched.length / config.keywords.length * 5, 1);
    detected.push({ categoryId, label: config.label, confidence, tradeScope: '', items: [], suggestions: [], subtotal: 0 });
  }
  return detected.sort((a, b) => b.confidence - a.confidence);
}

export async function analyseScope(
  scopeText: string, projectAreaM2: number, apiKey?: string,
): Promise<AnalysisResult> {
  if (!scopeText.trim()) return { trades: [], fallback: true };
  if (!apiKey) return { trades: keywordFallback(scopeText), fallback: true };

  try {
    const prompt = buildPrompt(scopeText, projectAreaM2);
    const models = ['gemini-2.5-flash', 'gemini-2.5-flash-lite', 'gemini-1.5-flash', 'gemini-2.0-flash'];

    for (const modelId of models) {
      try {
        const resp = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent?key=${apiKey}`,
          { method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { maxOutputTokens: 4096, temperature: 0.2 } }) },
        );
        if (resp.status === 429 || resp.status === 503) continue;
        if (!resp.ok) continue;
        const data = await resp.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!text) continue;
        const trades = parseGeminiResponse(text);
        if (trades.length > 0) return { trades, model: modelId, fallback: false };
      } catch { continue; }
    }
  } catch { /* fall through */ }

  return { trades: keywordFallback(scopeText), fallback: true };
}
