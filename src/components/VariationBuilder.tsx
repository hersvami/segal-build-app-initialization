import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import type { Project, ProjectBaseline, QuoteScope, Variation } from '../types/domain';
import { generateId } from '../utils/helpers';
import { calcScopesTotal } from '../utils/pricing/engine';
import { calculateQuote } from '../utils/pricing/quoteCalculator';
import { calcBaselineAdjustment } from '../utils/pricing/baselineMultipliers';
import { polishScopeWithAI } from '../utils/services';
import { analyseScope, type TradeAnalysis } from '../utils/ai/tradeAnalyser';
import { clearBuilderDraft, loadBuilderDraft, saveBuilderDraft } from './variationBuilder/builderDraft';
import { createScopeFromCategory } from './variationBuilder/createScopeFromCategory';
import { BuilderHeader } from './variationBuilder/BuilderHeader';
import { BuilderStepContent } from './variationBuilder/BuilderStepContent';
import { GEMINI_KEY_STORAGE, getDefaultBaseline, groupCategories, moveStep, readGeminiKey, type Step } from './variationBuilder/builderShared';
import { syncScopePricing } from './variationBuilder/scopePricing';

type Props = {
  project: Project;
  documentType: 'quote' | 'variation';
  existingQuotes: Variation[];
  companyOH: number;
  companyProfit: number;
  onSave: (variation: Variation) => void;
  onCancel: () => void;
};

export function VariationBuilder({ project, documentType, existingQuotes, companyOH, companyProfit, onSave, onCancel }: Props) {
  const savedDraft = loadBuilderDraft(project.id, documentType);
  const draftBaseline: ProjectBaseline = savedDraft?.baseline
    ? { ...getDefaultBaseline(), ...savedDraft.baseline }
    : getDefaultBaseline();

  const [step, setStep] = useState<Step>('baseline');
  const [scopeInput, setScopeInput] = useState(savedDraft?.scopeInput || '');
  const [selectedCategoryId, setSelectedCategoryId] = useState(savedDraft?.selectedCategoryId || '');
  const [showCategoryBrowser, setShowCategoryBrowser] = useState(false);
  const [scopes, setScopes] = useState<QuoteScope[]>([]);
  const [ohPct, setOhPct] = useState(companyOH);
  const [profitPct, setProfitPct] = useState(companyProfit);
  const [contingencyPct, setContingencyPct] = useState(10);
  const [varRefQuote, setVarRefQuote] = useState('');
  const [varReason, setVarReason] = useState('');
  const [baseline, setBaseline] = useState<ProjectBaseline>(draftBaseline);
  const [geminiKey, setGeminiKey] = useState(() => readGeminiKey(project.geminiApiKey));
  const [keyRestored, setKeyRestored] = useState(false);
  const [apiPolishing, setApiPolishing] = useState(false);
  const [lastAiModel, setLastAiModel] = useState('');
  const [recogniseFeedback, setRecogniseFeedback] = useState('');
  const [tradeAnalyses, setTradeAnalyses] = useState<TradeAnalysis[]>([]);
  const [isAnalysing, setIsAnalysing] = useState(false);
  const [analysisFallback, setAnalysisFallback] = useState(false);

  useEffect(() => {
    saveBuilderDraft(project.id, documentType, { scopeInput, selectedCategoryId, baseline });
  }, [baseline, documentType, project.id, scopeInput, selectedCategoryId]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const stored = window.localStorage.getItem(GEMINI_KEY_STORAGE);
      if (stored && stored === geminiKey) {
        setKeyRestored(true);
        const t = setTimeout(() => setKeyRestored(false), 4000);
        return () => clearTimeout(t);
      }
    } catch {}
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      if (geminiKey) window.localStorage.setItem(GEMINI_KEY_STORAGE, geminiKey);
      else window.localStorage.removeItem(GEMINI_KEY_STORAGE);
    } catch {}
  }, [geminiKey]);

  useEffect(() => {
    setScopes((prev) => prev.map((scope) => syncScopePricing(scope, baseline)));
  }, [baseline]);

  const groupedCategories = useMemo(groupCategories, []);
  const approvedQuotes = existingQuotes.filter((q) => q.documentType === 'quote' && q.status === 'approved');
  const rawTradeCost = useMemo(() => calcScopesTotal(scopes), [scopes]);
  const baselineAdj = useMemo(() => calcBaselineAdjustment(baseline, rawTradeCost), [baseline, rawTradeCost]);
  const pricing = calculateQuote(rawTradeCost + baselineAdj.totalAdjustment, ohPct, profitPct, contingencyPct);
  const canNext = step === 'baseline'
    ? baseline.totalAreaM2 > 0
    : step === 'scope'
      ? scopes.length > 0 && (documentType === 'quote' || (Boolean(varRefQuote) && Boolean(varReason)))
      : true;

  const handleAddScope = (categoryId: string) => {
    setScopes((prev) => {
      if (prev.some((scope) => scope.categoryId === categoryId)) return prev;
      const analysis = tradeAnalyses.find((t) => t.categoryId === categoryId);
      const next = createScopeFromCategory(categoryId, scopeInput, analysis, baseline);
      return next ? [...prev, next] : prev;
    });
    setSelectedCategoryId(categoryId);
  };

  const handleScopeChange = (index: number, next: QuoteScope) => {
    setScopes((prev) => prev.map((scope, i) => (i === index ? syncScopePricing(next, baseline) : scope)));
  };

  const handleRecognise = async () => {
    if (!scopeInput.trim()) return flashRecognise('Type a scope description first.');
    setIsAnalysing(true);
    setTradeAnalyses([]);
    const result = await analyseScope(scopeInput, baseline.totalAreaM2, geminiKey || undefined);
    setTradeAnalyses(result.trades);
    setAnalysisFallback(result.fallback);
    if (result.model) setLastAiModel(result.model);
    flashRecognise(
      result.trades.length === 0
        ? 'No trades detected — try adding more detail to your scope.'
        : result.fallback
          ? `Found ${result.trades.length} trades (keyword fallback)`
          : `AI detected ${result.trades.length} trades with pre-filled items`,
    );
    setIsAnalysing(false);
  };

  const handleAddAll = () => {
    setScopes((prev) => {
      const existing = new Set(prev.map((scope) => scope.categoryId));
      const nextScopes = tradeAnalyses
        .filter((trade) => !existing.has(trade.categoryId))
        .map((trade) => createScopeFromCategory(trade.categoryId, scopeInput, trade, baseline))
        .filter(Boolean) as QuoteScope[];
      return nextScopes.length > 0 ? [...prev, ...nextScopes] : prev;
    });
  };

  const handlePolish = async () => {
    if (!geminiKey || !scopeInput.trim()) return;
    setApiPolishing(true);
    const result = await polishScopeWithAI(scopeInput, geminiKey);
    setScopeInput(result.text);
    if (result.model) setLastAiModel(result.model);
    setApiPolishing(false);
  };

  const handleSave = () => {
    const now = new Date().toISOString();
    const nextVariationCount = existingQuotes.filter((v) => v.documentType === 'variation').length + 1;
    clearBuilderDraft(project.id, documentType);
    onSave({
      id: generateId(),
      title: documentType === 'quote' ? `Quote - ${project.name}` : `Variation ${scopes.map((s) => s.categoryLabel).join(', ')}`,
      description: scopes.map((s) => s.description).filter(Boolean).join('\n\n'),
      status: 'draft',
      documentType,
      scopes,
      pricing,
      changeLog: [{ id: generateId(), action: 'created', timestamp: now, user: 'Builder', details: `${documentType} created with ${scopes.length} scope(s)` }],
      createdAt: now,
      updatedAt: now,
      internalNotes: [],
      source: 'internal',
      referenceQuoteId: documentType === 'variation' ? varRefQuote : undefined,
      reasonForChange: documentType === 'variation' ? varReason : undefined,
      variationNumber: documentType === 'variation' ? `V-${String(nextVariationCount).padStart(3, '0')}` : undefined,
      costImpact: documentType === 'variation' ? 'additional' : undefined,
      baseline,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="flex max-h-[90vh] w-full max-w-4xl flex-col rounded-2xl bg-white shadow-2xl">
        <BuilderHeader documentType={documentType} step={step} baseline={baseline} baselineAdj={baselineAdj} onCancel={onCancel} />
        <main className="flex-1 overflow-y-auto p-6">
          <BuilderStepContent
            step={step}
            documentType={documentType}
            baseline={baseline}
            rawTradeCost={rawTradeCost}
            scopeInput={scopeInput}
            setScopeInput={setScopeInput}
            selectedCategoryId={selectedCategoryId}
            setSelectedCategoryId={setSelectedCategoryId}
            tradeAnalyses={tradeAnalyses}
            isAnalysing={isAnalysing}
            analysisFallback={analysisFallback}
            showCategoryBrowser={showCategoryBrowser}
            setShowCategoryBrowser={setShowCategoryBrowser}
            groupedCategories={groupedCategories}
            scopes={scopes}
            geminiKey={geminiKey}
            setGeminiKey={setGeminiKey}
            apiPolishing={apiPolishing}
            varRefQuote={varRefQuote}
            setVarRefQuote={setVarRefQuote}
            varReason={varReason}
            setVarReason={setVarReason}
            approvedQuotes={approvedQuotes}
            lastAiModel={lastAiModel}
            recogniseFeedback={recogniseFeedback}
            keyRestored={keyRestored}
            pricing={pricing}
            ohPct={ohPct}
            setOhPct={setOhPct}
            profitPct={profitPct}
            setProfitPct={setProfitPct}
            contingencyPct={contingencyPct}
            setContingencyPct={setContingencyPct}
            setBaseline={setBaseline}
            setScopes={setScopes}
            onScopeChange={handleScopeChange}
            onRecognise={handleRecognise}
            onPolish={handlePolish}
            onAddScope={handleAddScope}
            onAddAll={handleAddAll}
          />
        </main>
        <footer className="flex shrink-0 justify-between border-t border-slate-200 p-4">
          <button onClick={() => moveStep(step, setStep, -1)} disabled={step === 'baseline'} className="flex items-center gap-2 rounded-lg px-4 py-2 text-slate-600 hover:bg-slate-100 disabled:opacity-50"><ArrowLeft className="h-4 w-4" /> Back</button>
          {step === 'review' ? (
            <button onClick={handleSave} className="flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-2 font-medium text-white hover:bg-emerald-700"><Check className="h-4 w-4" /> Save {documentType === 'quote' ? 'Quote' : 'Variation'}</button>
          ) : (
            <button onClick={() => canNext && moveStep(step, setStep, 1)} disabled={!canNext} className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50">Next <ArrowRight className="h-4 w-4" /></button>
          )}
        </footer>
      </div>
    </div>
  );

  function flashRecognise(message: string) {
    setRecogniseFeedback(message);
    setTimeout(() => setRecogniseFeedback(''), 5000);
  }
}
