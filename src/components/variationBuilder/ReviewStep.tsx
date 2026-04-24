import type { QuotePricing, QuoteScope } from '../../types/domain';
import { formatCurrency } from '../../utils/helpers';
import { calcScopeTotal } from '../../utils/pricing/engine';

type Props = {
  scopes: QuoteScope[];
  pricing: QuotePricing;
  ohPct: number;
  profitPct: number;
  contingencyPct: number;
};

export function ReviewStep({ scopes, pricing, ohPct, profitPct, contingencyPct }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-900">Review</h3>
        <p className="text-sm text-slate-500 mt-1">Final review before saving.</p>
      </div>

      <div className="space-y-3">
        {scopes.map((scope) => {
          const scopeTotal = calcScopeTotal(scope);
          return (
            <div key={scope.id} className="rounded-xl border border-slate-200 p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium text-slate-900">{scope.categoryLabel}</h4>
                  <p className="text-sm text-slate-500 mt-1">{scope.description}</p>
                </div>
                <span className="text-sm font-medium text-slate-700">{formatCurrency(scopeTotal)}</span>
              </div>
              {scope.stages.length > 0 && (
                <div className="mt-3 space-y-1">
                  {scope.stages.map((stage, i) => (
                    <div key={i} className="flex justify-between text-sm text-slate-600">
                      <span>{stage.name} <span className="text-xs text-slate-400">({stage.trade})</span></span>
                      <span>{formatCurrency(stage.cost)}</span>
                    </div>
                  ))}
                </div>
              )}
              {scope.inclusions.length > 0 && (
                <div className="mt-2">
                  <p className="text-xs font-medium text-emerald-600">Inclusions</p>
                  <ul className="text-xs text-slate-500 list-none mt-1 space-y-0.5">
                    {scope.inclusions.map((item, i) => <li key={i}>✓ {item.text}</li>)}
                  </ul>
                </div>
              )}
              {scope.exclusions.length > 0 && (
                <div className="mt-2">
                  <p className="text-xs font-medium text-red-500">Exclusions</p>
                  <ul className="text-xs text-slate-500 list-none mt-1 space-y-0.5">
                    {scope.exclusions.map((item, i) => <li key={i}>✗ {item.text}</li>)}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 space-y-2 text-sm">
        <div className="flex justify-between"><span className="text-slate-600">Trade Cost</span><span className="font-medium">{formatCurrency(pricing.tradeCost)}</span></div>
        <div className="flex justify-between"><span className="text-slate-600">Overhead ({ohPct}%)</span><span className="font-medium">{formatCurrency(pricing.overheadAmount)}</span></div>
        <div className="flex justify-between"><span className="text-slate-600">Profit ({profitPct}%)</span><span className="font-medium">{formatCurrency(pricing.profitAmount)}</span></div>
        <div className="flex justify-between"><span className="text-slate-600">Contingency ({contingencyPct}%)</span><span className="font-medium">{formatCurrency(pricing.contingencyAmount)}</span></div>
        <hr className="border-blue-200" />
        <div className="flex justify-between"><span className="text-slate-600">Subtotal (excl. GST)</span><span className="font-medium">{formatCurrency(pricing.subtotalExclGst)}</span></div>
        <div className="flex justify-between"><span className="text-slate-600">GST (10%)</span><span className="font-medium">{formatCurrency(pricing.gstAmount)}</span></div>
        <hr className="border-blue-200" />
        <div className="flex justify-between text-base"><span className="font-bold text-slate-900">Total (incl. GST)</span><span className="font-bold text-blue-700">{formatCurrency(pricing.total)}</span></div>
      </div>
    </div>
  );
}
