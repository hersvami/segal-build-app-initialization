import { useMemo, useState } from 'react';
import { Plus, Trash2, GripVertical, Layers3 } from 'lucide-react';
import type { QuoteScope, ParametricItem } from '../../types/domain';
import { formatCurrency } from '../../utils/helpers';
import { hasParametricUnits } from '../../utils/pricing/parametricUnits';
import { calcScopeTotal } from '../../utils/pricing/engine';
import { getCategoryById } from '../../utils/categories/extended';
import { EditableList } from './EditableList';
import { DimensionInput } from './DimensionInput';
import { ParametricEditor } from './ParametricEditor';
import { CategoryQuestions } from './CategoryQuestions';
import type { TradeAnalysis } from '../../utils/ai/tradeAnalyser';
import { needsAreaHeightOverride } from './scopePricing';
import { groupBoqByPhase, PHASE_LABELS, PHASE_ORDER } from './phaseGrouping';

export { PCItemEditor } from './PCItemEditor';

type ScopeDetailProps = {
  scope: QuoteScope;
  index: number;
  tradeAnalysis?: TradeAnalysis;
  onChange: (next: QuoteScope) => void;
};

export function ScopeDetailEditor({ scope, index, tradeAnalysis, onChange }: ScopeDetailProps) {
  void tradeAnalysis;
  const [showAddStage, setShowAddStage] = useState(false);
  const [draft, setDraft] = useState({ name: '', trade: '', cost: 0, duration: 1 });

  const update = (patch: Partial<QuoteScope>) => onChange({ ...scope, ...patch });

  const handleRemoveStage = (i: number) => update({ stages: scope.stages.filter((_, idx) => idx !== i) });

  const handleAddStage = () => {
    if (!draft.name.trim()) return;
    update({
      stages: [
        ...scope.stages,
        {
          name: draft.name.trim(),
          trade: draft.trade.trim() || 'General',
          cost: draft.cost,
          duration: draft.duration,
          description: draft.name.trim(),
          status: 'not-started' as const,
        },
      ],
    });
    setDraft({ name: '', trade: '', cost: 0, duration: 1 });
    setShowAddStage(false);
  };

  const updateStage = (i: number, patch: Partial<QuoteScope['stages'][number]>) => {
    const next = [...scope.stages];
    next[i] = { ...next[i], ...patch };
    update({ stages: next });
  };

  const setParametric = (items: ParametricItem[]) => update({ parametricItems: items });
  const total = calcScopeTotal(scope);
  const category = getCategoryById(scope.categoryId);
  const phaseGroups = useMemo(
    () => groupBoqByPhase(scope.categoryId, scope.stages, scope.parametricItems || []),
    [scope.categoryId, scope.parametricItems, scope.stages],
  );

  return (
    <div className="space-y-3 rounded-xl border border-slate-200 p-4">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-semibold">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
            {index + 1}
          </span>
          {scope.categoryLabel}
        </h3>
        {total > 0 && (
          <span className="text-sm font-medium text-slate-500">
            Subtotal: {formatCurrency(total)}
          </span>
        )}
      </div>

      <div>
        <label className="text-xs text-slate-500">Scope Description</label>
        <textarea
          value={scope.description}
          onChange={(e) => update({ description: e.target.value })}
          className="mt-1 min-h-[180px] w-full rounded-lg border border-slate-300 px-3 py-3 text-sm leading-relaxed"
          placeholder="Describe the scope of works…"
        />
      </div>

      <CategoryQuestions scope={scope} onChange={onChange} />

      {renderDimensions(category, scope, update)}

      {(category?.usesParametric || hasParametricUnits(scope.categoryId)) && (
        <ParametricEditor
          categoryId={scope.categoryId}
          items={scope.parametricItems || []}
          onChange={setParametric}
        />
      )}

      {PHASE_ORDER.some((phase) => phaseGroups[phase].length > 0) && (
        <div className="rounded-xl border border-indigo-200 bg-indigo-50/50 p-4">
          <div className="mb-3 flex items-center gap-2">
            <Layers3 className="h-4 w-4 text-indigo-700" />
            <h4 className="text-sm font-semibold text-indigo-900">Phase Grouped BoQ</h4>
          </div>
          <div className="space-y-3">
            {PHASE_ORDER.filter((phase) => phaseGroups[phase].length > 0).map((phase) => {
              const phaseTotal = phaseGroups[phase].reduce((sum, item) => sum + item.cost, 0);
              return (
                <div key={phase} className="rounded-lg border border-indigo-100 bg-white p-3">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wide text-indigo-700">{PHASE_LABELS[phase]}</span>
                    <span className="text-xs font-medium text-indigo-900">{formatCurrency(phaseTotal)}</span>
                  </div>
                  <div className="space-y-1.5">
                    {phaseGroups[phase].map((item) => (
                      <div key={item.id} className="flex items-center justify-between gap-3 text-sm">
                        <div className="min-w-0">
                          <div className="font-medium text-slate-800">{item.label}</div>
                          <div className="text-xs text-slate-500">{item.trade} · {item.source === 'parametric' ? 'BoQ item' : 'Stage'}</div>
                        </div>
                        <span className="shrink-0 text-slate-700">{formatCurrency(item.cost)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="space-y-1">
        <h4 className="mb-2 text-sm font-medium text-slate-700">Stages / Trades ({scope.stages.length})</h4>
        {scope.stages.map((stage, i) => (
          <div key={i} className="group flex items-center gap-2 rounded-lg bg-slate-50 p-2 text-sm">
            <GripVertical className="h-3 w-3 shrink-0 text-slate-300" />
            <input
              value={stage.name}
              onChange={(e) => updateStage(i, { name: e.target.value, description: e.target.value })}
              className="min-w-0 flex-1 rounded border-0 bg-transparent px-1 py-0.5 font-medium text-slate-900 outline-none focus:bg-white focus:ring-1 focus:ring-blue-300"
            />
            <input
              value={stage.trade}
              onChange={(e) => updateStage(i, { trade: e.target.value })}
              className="w-24 rounded border-0 bg-transparent px-1 py-0.5 text-xs text-slate-500 outline-none focus:bg-white focus:ring-1 focus:ring-blue-300"
            />
            <span className="text-xs text-slate-400">$</span>
            <input
              type="number"
              value={stage.cost || 0}
              onChange={(e) => updateStage(i, { cost: Number(e.target.value) })}
              className="w-20 rounded border-0 bg-transparent px-1 py-0.5 text-right outline-none focus:bg-white focus:ring-1 focus:ring-blue-300"
            />
            <input
              type="number"
              value={stage.duration}
              onChange={(e) => updateStage(i, { duration: Number(e.target.value) })}
              className="w-12 rounded border-0 bg-transparent px-1 py-0.5 text-center outline-none focus:bg-white focus:ring-1 focus:ring-blue-300"
            />
            <span className="text-xs text-slate-400">d</span>
            <button
              onClick={() => handleRemoveStage(i)}
              className="rounded p-1 text-slate-300 opacity-0 transition-all hover:bg-red-50 hover:text-red-600 group-hover:opacity-100"
              aria-label="Remove stage"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}

        {showAddStage ? (
          <div className="mt-2 space-y-2 rounded-lg border border-blue-200 bg-blue-50 p-3">
            <div className="grid grid-cols-2 gap-2">
              <input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} placeholder="Stage name" className="rounded border border-slate-300 px-2 py-1.5 text-sm" autoFocus />
              <input value={draft.trade} onChange={(e) => setDraft({ ...draft, trade: e.target.value })} placeholder="Trade (e.g. Plumbing)" className="rounded border border-slate-300 px-2 py-1.5 text-sm" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs text-slate-500">Cost ($)</label>
                <input type="number" value={draft.cost} onChange={(e) => setDraft({ ...draft, cost: Number(e.target.value) })} className="w-full rounded border border-slate-300 px-2 py-1.5 text-sm" />
              </div>
              <div>
                <label className="text-xs text-slate-500">Duration (days)</label>
                <input type="number" value={draft.duration} onChange={(e) => setDraft({ ...draft, duration: Number(e.target.value) })} className="w-full rounded border border-slate-300 px-2 py-1.5 text-sm" />
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={handleAddStage} disabled={!draft.name.trim()} className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-50">
                <Plus className="h-3 w-3" /> Add Stage
              </button>
              <button onClick={() => setShowAddStage(false)} className="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100">Cancel</button>
            </div>
          </div>
        ) : (
          <button onClick={() => setShowAddStage(true)} className="mt-2 flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700">
            <Plus className="h-3.5 w-3.5" /> Add Stage
          </button>
        )}
      </div>

      <EditableList title="Inclusions" items={scope.inclusions} onChange={(inclusions) => update({ inclusions })} color="emerald" icon="✓" />
      <EditableList title="Exclusions" items={scope.exclusions} onChange={(exclusions) => update({ exclusions })} color="red" icon="✗" />
    </div>
  );
}

function renderDimensions(
  category: ReturnType<typeof getCategoryById> | undefined,
  scope: QuoteScope,
  update: (patch: Partial<QuoteScope>) => void,
) {
  const mode = category?.dimensionMode ?? 'area';
  const setDim = (key: 'width' | 'length' | 'height', v: number) =>
    update({ dimensions: { ...scope.dimensions, [key]: v } });

  if (needsAreaHeightOverride(scope.categoryId)) {
    return (
      <div className="grid grid-cols-2 gap-3">
        <DimensionInput label="Area (m²)" value={scope.dimensions.width} onChange={(v) => setDim('width', v)} />
        <DimensionInput label="Height (m)" value={scope.dimensions.height} onChange={(v) => setDim('height', v)} />
      </div>
    );
  }

  if (mode === 'none' || mode === 'item') return null;

  if (mode === 'linear') {
    return (
      <div className="grid grid-cols-1 gap-3">
        <DimensionInput label="Length (m)" value={scope.dimensions.length} onChange={(v) => setDim('length', v)} />
      </div>
    );
  }
  if (mode === 'wall') {
    return (
      <div className="grid grid-cols-2 gap-3">
        <DimensionInput label="Length (m)" value={scope.dimensions.length} onChange={(v) => setDim('length', v)} />
        <DimensionInput label="Height (m)" value={scope.dimensions.height} onChange={(v) => setDim('height', v)} />
      </div>
    );
  }
  if (mode === 'roof') {
    return (
      <div className="grid grid-cols-2 gap-3">
        <DimensionInput label="Roof width (m)" value={scope.dimensions.width} onChange={(v) => setDim('width', v)} />
        <DimensionInput label="Roof length (m)" value={scope.dimensions.length} onChange={(v) => setDim('length', v)} />
      </div>
    );
  }
  if (mode === 'room') {
    return (
      <div className="grid grid-cols-3 gap-3">
        <DimensionInput label="Width (m)" value={scope.dimensions.width} onChange={(v) => setDim('width', v)} />
        <DimensionInput label="Length (m)" value={scope.dimensions.length} onChange={(v) => setDim('length', v)} />
        <DimensionInput label="Height (m)" value={scope.dimensions.height} onChange={(v) => setDim('height', v)} />
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-3">
      <DimensionInput label="Width (m)" value={scope.dimensions.width} onChange={(v) => setDim('width', v)} />
      <DimensionInput label="Length (m)" value={scope.dimensions.length} onChange={(v) => setDim('length', v)} />
    </div>
  );
}
