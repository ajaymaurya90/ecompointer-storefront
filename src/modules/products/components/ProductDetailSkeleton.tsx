"use client";

/**
 * ---------------------------------------------------------
 * PRODUCT DETAIL SKELETON
 * ---------------------------------------------------------
 * Purpose:
 * Loading skeleton for storefront product detail page.
 * ---------------------------------------------------------
 */

export default function ProductDetailSkeleton() {
    return (
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-12">
            <div className="xl:col-span-7">
                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                    <div className="aspect-[4/3] animate-pulse bg-slate-200" />
                </div>
            </div>

            <div className="space-y-6 xl:col-span-5">
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="h-3 w-24 animate-pulse rounded bg-slate-200" />
                    <div className="mt-4 h-8 w-3/4 animate-pulse rounded bg-slate-200" />
                    <div className="mt-4 h-4 w-full animate-pulse rounded bg-slate-100" />
                    <div className="mt-2 h-4 w-5/6 animate-pulse rounded bg-slate-100" />
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="h-6 w-40 animate-pulse rounded bg-slate-200" />
                    <div className="mt-4 space-y-3">
                        <div className="h-20 animate-pulse rounded-2xl bg-slate-100" />
                        <div className="h-20 animate-pulse rounded-2xl bg-slate-100" />
                    </div>
                </div>
            </div>
        </div>
    );
}