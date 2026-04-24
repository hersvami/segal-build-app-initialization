import type { Company, Project, Variation } from '../../types/domain';
import { formatCurrency } from '../../utils/helpers';

type Props = {
  variation: Variation;
  project: Project;
  company: Company;
};

export function BuilderView({ variation, project, company }: Props) {
  return (
    <div className="space-y-3 p-4">
      <div className="text-sm text-slate-500">
        {company.name} · {project.name}
      </div>
      <div className="rounded-lg border border-slate-200 p-3">
        <div className="flex justify-between text-sm">
          <span>Trade Cost</span>
          <span className="font-medium">{formatCurrency(variation.pricing.tradeCost)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Overhead ({variation.pricing.overheadPercent}%)</span>
          <span>{formatCurrency(variation.pricing.overheadAmount)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Profit ({variation.pricing.profitPercent}%)</span>
          <span>{formatCurrency(variation.pricing.profitAmount)}</span>
        </div>
        <div className="mt-2 flex justify-between border-t border-slate-200 pt-2 font-semibold">
          <span>Total incl GST</span>
          <span>{formatCurrency(variation.pricing.total)}</span>
        </div>
      </div>
    </div>
  );
}