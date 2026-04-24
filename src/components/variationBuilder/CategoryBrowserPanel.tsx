import { ChevronDown, ChevronUp, Plus } from 'lucide-react';
import { isManualTemplateCategory } from './scopePricing';

type CategoryOption = { id: string; label: string };
type Props = {
  showCategoryBrowser: boolean;
  setShowCategoryBrowser: (value: boolean) => void;
  groupedCategories: Record<string, CategoryOption[]>;
  addedIds: string[];
  onToggleCategory: (categoryId: string, added: boolean) => void;
};

export function CategoryBrowserPanel({
  showCategoryBrowser,
  setShowCategoryBrowser,
  groupedCategories,
  addedIds,
  onToggleCategory,
}: Props) {
  return (
    <div className="space-y-3">
      <button type="button" onClick={() => setShowCategoryBrowser(!showCategoryBrowser)}
        className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700">
        <Plus className="h-4 w-4" />
        Browse All Categories
        {showCategoryBrowser ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
      </button>

      {showCategoryBrowser && (
        <div className="max-h-72 space-y-4 overflow-y-auto rounded-lg bg-slate-50 p-4">
          <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
            <strong>Manual room templates:</strong> Bathroom, Kitchen, Laundry and Toilet/WC stay available for planning notes. They do <strong>not</strong> create priced lines by default.
          </div>

          {Object.entries(groupedCategories).map(([group, categories]) => (
            <div key={group}>
              <h4 className="mb-2 text-xs font-semibold uppercase text-slate-500">{group}</h4>
              <div className="grid gap-2 sm:grid-cols-2">
                {categories.map((category) => {
                  const added = addedIds.includes(category.id);
                  const isTemplate = isManualTemplateCategory(category.id);
                  return (
                    <button key={category.id} type="button"
                      onClick={() => onToggleCategory(category.id, added)}
                      className={`rounded-xl border px-3 py-2 text-left transition-colors ${
                        added ? 'border-red-200 bg-red-50' :
                        isTemplate ? 'border-amber-200 bg-amber-50 hover:border-amber-300' :
                        'border-slate-200 bg-white hover:border-blue-400 hover:text-blue-700'
                      }`}>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-medium text-slate-900">{category.label}</span>
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                          added ? 'bg-red-100 text-red-700' :
                          isTemplate ? 'bg-amber-100 text-amber-700' : 'bg-blue-50 text-blue-700'
                        }`}>
                          {added ? 'Added' : isTemplate ? 'Template' : 'Priced'}
                        </span>
                      </div>
                      <p className="mt-1 text-[11px] text-slate-500">
                        {isTemplate ? 'Manual room guide only · no pricing by default' : 'Independent priced category'}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
