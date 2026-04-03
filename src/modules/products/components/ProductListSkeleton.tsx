"use client";

/**
 * ---------------------------------------------------------
 * PRODUCT LIST SKELETON
 * ---------------------------------------------------------
 * Purpose:
 * Loading skeleton for storefront product listing page.
 * ---------------------------------------------------------
 */

export default function ProductListSkeleton() {
    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
                <div
                    key={index}
                    className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
                >
                    <div className="aspect-[4/3] animate-pulse bg-slate-200" />
                    <div className="space-y-3 p-5">
                        <div className="h-3 w-20 animate-pulse rounded bg-slate-200" />
                        <div className="h-5 w-3/4 animate-pulse rounded bg-slate-200" />
                        <div className="h-4 w-full animate-pulse rounded bg-slate-100" />
                        <div className="h-4 w-2/3 animate-pulse rounded bg-slate-100" />
                        <div className="flex items-center justify-between pt-2">
                            <div className="h-5 w-24 animate-pulse rounded bg-slate-200" />
                            <div className="h-7 w-20 animate-pulse rounded-full bg-slate-100" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}