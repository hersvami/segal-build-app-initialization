# 07 — Data Types
_This is 1 of 14 modules — see `handover/00-index.md` for the full list_

> **AI INSTRUCTION:** Request `src/types/domain.ts` and `src/types/appState.ts` before editing types.

---

## Files To Request
- `src/types/domain.ts` — all domain types
- `src/types/appState.ts` — app state shape

---

## Core Domain Types

```ts
// Company
type Company = {
  id: string; name: string; abn: string; licence: string;
  phone: string; email: string; logoUrl: string;
  defaultOverheadPercent: number; defaultProfitPercent: number;
};

// Project
type Project = {
  id: string; name: string; address: string;
  customer: ProjectCustomer; companyId: string;
  createdAt: string; geminiApiKey?: string; heroPhoto?: string;
};

// Customer
type ProjectCustomer = { name: string; email: string; phone: string };

// Variation (covers both Quotes and Variations)
type Variation = {
  id: string; title: string; description: string;
  status: 'draft' | 'sent' | 'approved' | 'rejected';
  documentType: 'quote' | 'variation';
  scopes: QuoteScope[]; pricing: QuotePricing;
  changeLog: ChangeLogEntry[]; internalNotes: string[];
  referenceQuoteId?: string; reasonForChange?: string;
  variationNumber?: string;
  costImpact?: 'additional' | 'credit' | 'no-change';
  source?: 'internal' | 'external';
  externalQuoteRef?: ExternalQuoteReference;
  baseline?: ProjectBaseline;
  progressPhotos?: ProgressPhoto[];
  progressUpdates?: ProgressUpdate[];
  createdAt: string; updatedAt: string;
};

// Scope
type QuoteScope = {
  id: string; categoryId: string; categoryLabel: string;
  description: string; builderNotes?: string;
  stages: JobStage[]; dimensions: { width: number; length: number; height: number };
  answers: Record<string, string>; questionAnswers?: QuestionAnswer[];
  pcItems: PCItem[]; inclusions: InclusionItem[]; exclusions: ExclusionItem[];
  parametricItems?: ParametricItem[]; photos?: string[];
};

// Pricing
type QuotePricing = {
  overheadPercent: number; profitPercent: number;
  contingencyPercent: number; gstPercent: number;
  tradeCost: number; overhead: number; profit: number;
  contingency: number; gst: number; clientTotal: number;
  totalIncGst: number; total: number;
  overheadAmount: number; profitAmount: number;
  contingencyAmount: number; subtotalExclGst: number; gstAmount: number;
};

// Baseline
type ProjectBaseline = {
  totalAreaM2: number;
  storeys: 'single' | 'double' | 'multi';
  siteAccess: 'easy' | 'moderate' | 'difficult';
  ceilingHeightM: number; notes?: string;
};

// Parametric BoQ item
type ParametricItem = {
  id: string; unitId: string; label: string;
  unit: 'each' | 'lm' | 'm2' | 'allow';
  rate: number; quantity: number; notes?: string;
};
```

---

## App State Shape

```ts
type AppState = {
  version: string;               // '2.0' — bump to clear localStorage
  activeCompanyId: string;
  companies: Company[];
  projects: Project[];
  activeProjectId: string | null;
  variations: Record<string, Variation[]>;  // projectId → variations
  activeVariationId: string | null;
  uiState: {
    view: 'welcome' | 'project' | 'builder' | 'report';
    showProjectForm: boolean;
    showWelcomeEmail: boolean;
  };
};
```

---

## Key Type Rules

- `documentType: 'quote' | 'variation'` — these are SEPARATE workflows. Never mix.
- `InclusionItem` and `ExclusionItem` must always have `id` and `isDefault` fields.
- `QuoteScope.answers` is `Record<string, string>` — never undefined.
- `ProjectBaseline` is stored on the `Variation`, not on `Project`.
- `ParametricItem.unit` must be one of the 4 exact literals — no other strings.
