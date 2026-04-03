"use client";

/**
 * ---------------------------------------------------------
 * PRODUCT FILTERS
 * ---------------------------------------------------------
 * Purpose:
 * Provides storefront search and page-size controls for
 * the product listing page.
 * ---------------------------------------------------------
 */

type Props = {
    search: string;
    limit: number;
    onSearchChange: (value: string) => void;
    onLimitChange: (value: number) => void;
    onApply: () => void;
    onReset: () => void;
};

export default function ProductFilters({
    search,
    limit,
    onSearchChange,
    onLimitChange,
    onApply,
    onReset,
}: Props) {
    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4">
                <h2 className="text-lg font-semibold text-slate-900">
                    Product Filters
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                    Search products available in this storefront.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Search
                    </label>
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Search by name or code"
                        className="h-12 w-full rounded-2xl border border-slate-300 px-4 text-sm outline-none transition focus:border-slate-500"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Per Page
                    </label>
                    <select
                        value={limit}
                        onChange={(e) => onLimitChange(Number(e.target.value))}
                        className="h-12 w-full rounded-2xl border border-slate-300 px-4 text-sm outline-none transition focus:border-slate-500"
                    >
                        <option value={6}>6</option>
                        <option value={12}>12</option>
                        <option value={24}>24</option>
                    </select>
                </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
                <button
                    type="button"
                    onClick={onApply}
                    className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:opacity-90"
                >
                    Apply
                </button>

                <button
                    type="button"
                    onClick={onReset}
                    className="rounded-2xl border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                    Reset
                </button>
            </div>
        </div>
    );
}