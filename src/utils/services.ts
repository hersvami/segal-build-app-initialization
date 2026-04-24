/* ─── Segal Build — Services (Gemini AI FREE TIER + Cloudinary) ─── */

// ─── FREE-ONLY Gemini Model Cascade ───
// All models below are confirmed FREE (no credit card required)
// Strategy: Start with best quality, cascade down on 429/503
// Total free capacity: ~2,850 requests/day across all models
const GEMINI_MODELS = [
  { id: 'gemini-2.5-flash', label: 'Gemini 2.5 Flash', tier: 1, freeRPM: 10, freeRPD: 250, note: 'Best quality free model' },
  { id: 'gemini-2.5-flash-lite', label: 'Gemini 2.5 Flash Lite', tier: 2, freeRPM: 15, freeRPD: 1000, note: 'Most generous free quota' },
  { id: 'gemini-1.5-flash', label: 'Gemini 1.5 Flash', tier: 3, freeRPM: 15, freeRPD: 1500, note: 'Legacy — highest daily limit' },
  { id: 'gemini-2.0-flash', label: 'Gemini 2.0 Flash', tier: 4, freeRPM: 5, freeRPD: 100, note: 'Stable fallback' },
] as const;

type ModelId = (typeof GEMINI_MODELS)[number]['id'];
const rateLimitedModels = {} as Partial<Record<ModelId, number>>;
const RATE_LIMIT_COOLDOWN_MS = 65_000;

function getAvailableModels() {
  const now = Date.now();
  return GEMINI_MODELS.filter(m => {
    const limitedAt = rateLimitedModels[m.id];
    if (!limitedAt) return true;
    if (now - limitedAt > RATE_LIMIT_COOLDOWN_MS) {
      delete rateLimitedModels[m.id];
      return true;
    }
    return false;
  });
}

export type GeminiResult = { text: string; model: string; tier: number; fallback: boolean };

async function callGeminiWithFallback(prompt: string, apiKey: string): Promise<GeminiResult> {
  const models = getAvailableModels();
  if (models.length === 0) throw new Error('All models rate-limited. Try again in 1 minute.');

  for (let i = 0; i < models.length; i++) {
    const m = models[i];
    try {
      const resp = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${m.id}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { maxOutputTokens: 4096 },
          }),
        }
      );

      if (resp.status === 429 || resp.status === 503) {
        rateLimitedModels[m.id] = Date.now();
        continue;
      }

      if (!resp.ok) throw new Error(`Gemini ${m.id} error: ${resp.status}`);

      const data = await resp.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) {
        return { text, model: m.id, tier: m.tier, fallback: i > 0 };
      }
    } catch {
      continue;
    }
  }
  throw new Error('All free models exhausted. Using keyword fallback.');
}

export function getModelStatus() {
  const now = Date.now();
  const available: { id: string; label: string; tier: number; freeRPD: number }[] = [];
  const rateLimited: { id: string; label: string; resumesIn: number }[] = [];

  for (const m of GEMINI_MODELS) {
    const limitedAt = rateLimitedModels[m.id];
    if (limitedAt && now - limitedAt < RATE_LIMIT_COOLDOWN_MS) {
      rateLimited.push({ id: m.id, label: m.label, resumesIn: Math.ceil((RATE_LIMIT_COOLDOWN_MS - (now - limitedAt)) / 1000) });
    } else {
      available.push({ id: m.id, label: m.label, tier: m.tier, freeRPD: m.freeRPD });
    }
  }
  return { available, rateLimited, totalDailyCapacity: GEMINI_MODELS.reduce((sum, m) => sum + m.freeRPD, 0) };
}

export async function polishScopeWithAI(description: string, apiKey?: string): Promise<{ text: string; model?: string; tier?: number; fallback?: boolean }> {
  if (!apiKey) return { text: description };

  const prompt = `You are a senior Australian construction estimator writing a formal Scope of Works. Rewrite the builder notes below into a complete, professionally structured Scope of Works using clear, plain Australian building terminology. Output requirements: Start with a one-line summary heading. Then 4–8 short sections, each with a bold header ending in ":". Under each header, use short bullet points starting with "- ". Reference relevant trades, AS standards and BCA where appropriate. Do NOT invent dimensions or PC item dollar values. Do NOT use markdown asterisks. Cover the full scope. Builder notes: """${description}"""`;

  try {
    const result = await callGeminiWithFallback(prompt, apiKey);
    return { text: result.text.trim(), model: result.model, tier: result.tier, fallback: result.fallback };
  } catch {
    return { text: description };
  }
}

export async function recogniseScopeWithAI(description: string, categoryIds: string[], apiKey?: string): Promise<{ categoryId: string; model: string } | null> {
  if (!apiKey) return null;

  const prompt = `You are an Australian construction expert. Given this description, identify the SINGLE most relevant category from: ${categoryIds.join(', ')}. Description: "${description}". Return ONLY the category ID.`;

  try {
    const result = await callGeminiWithFallback(prompt, apiKey);
    const cleaned = result.text.trim().toLowerCase().replace(/[^a-z-]/g, '');
    if (categoryIds.includes(cleaned)) return { categoryId: cleaned, model: result.model };
    const match = categoryIds.find(id => cleaned.includes(id) || id.includes(cleaned));
    return match ? { categoryId: match, model: result.model } : null;
  } catch {
    return null;
  }
}

export function isCloudinaryConfigured(): boolean {
  const env = (import.meta as any).env || {};
  return !!(env.VITE_CLOUDINARY_CLOUD_NAME && env.VITE_CLOUDINARY_UPLOAD_PRESET);
}

export async function uploadPhotoToCloudinary(file: File): Promise<string> {
  const env = (import.meta as any).env || {};
  const cloudName = env.VITE_CLOUDINARY_CLOUD_NAME || '';
  const preset = env.VITE_CLOUDINARY_UPLOAD_PRESET || '';
  if (!cloudName || !preset) return URL.createObjectURL(file);

  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', preset);
    const resp = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData,
    });
    const data = await resp.json();
    return data.secure_url;
  } catch {
    return URL.createObjectURL(file);
  }
}
