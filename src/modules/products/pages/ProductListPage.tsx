"use client";

/**
 * ---------------------------------------------------------
 * PRODUCT LIST PAGE
 * ---------------------------------------------------------
 * Purpose:
 * Fetches and renders storefront product listing using the
 * active BO bootstrap context.
 * ---------------------------------------------------------
 */

import { useEffect, useState } from "react";
import StorefrontShell from "@/modules/storefront/components/StorefrontShell";
import ProductFilters from "@/modules/products/components/ProductFilters";
import ProductGrid from "@/modules/products/components/ProductGrid";
import ProductListSkeleton from "@/modules/products/components/ProductListSkeleton";
import { getStorefrontProducts } from "@/modules/products/api/productApi";
import { useStorefrontBootstrapContext } from "@/providers/StorefrontBootstrapProvider";
import type { StorefrontProductListItem } from "@/modules/products/types/product";

export default function ProductListPage() {
    const { brandOwnerId, bootstrap } = useStorefrontBootstrapContext();

    const [products, setProducts] = useState<StorefrontProductListItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [search, setSearch] = useState("");
    const [limit, setLimit] = useState(12);
    const [page, setPage] = useState(1);

    const [appliedSearch, setAppliedSearch] = useState("");
    const [appliedLimit, setAppliedLimit] = useState(12);

    const [pagination, setPagination] = useState({
        total: 0,
        page: 1,
        limit: 12,
        totalPages: 1,
    });

    // Load storefront product list whenever active filters or BO changes.
    useEffect(() => {
        async function loadProducts() {
            if (!brandOwnerId) {
                setError("Brand owner id is missing");
                setIsLoading(false);
                return;
            }

            try {
                setIsLoading(true);
                setError(null);

                const response = await getStorefrontProducts(brandOwnerId, {
                    search: appliedSearch,
                    page,
                    limit: appliedLimit,
                });

                setProducts(response.data);
                setPagination(response.pagination);
            } catch (err: any) {
                setError(
                    err?.response?.data?.message ||
                    err?.message ||
                    "Failed to load products"
                );
            } finally {
                setIsLoading(false);
            }
        }

        void loadProducts();
    }, [brandOwnerId, appliedSearch, appliedLimit, page]);

    // Apply current filter form values to active listing query state.
    function handleApplyFilters() {
        setPage(1);
        setAppliedSearch(search.trim());
        setAppliedLimit(limit);
    }

    // Reset filters back to default storefront listing state.
    function handleResetFilters() {
        setSearch("");
        setLimit(12);
        setPage(1);
        setAppliedSearch("");
        setAppliedLimit(12);
    }

    const storefrontName =
        bootstrap?.storefront?.storefrontName ||
        bootstrap?.brandOwner?.businessName ||
        "Storefront";

    return (
        <StorefrontShell>
            <section className="border-b border-slate-200 bg-white">
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                            Product Catalog
                        </div>
                        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">
                            Explore products from {storefrontName}
                        </h1>
                        <p className="mt-4 text-base leading-7 text-slate-600">
                            Browse active storefront products, compare available
                            variants, and add your preferred items to cart.
                        </p>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="space-y-6">
                    <ProductFilters
                        search={search}
                        limit={limit}
                        onSearchChange={setSearch}
                        onLimitChange={setLimit}
                        onApply={handleApplyFilters}
                        onReset={handleResetFilters}
                    />

                    {error ? (
                        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                            {error}
                        </div>
                    ) : null}

                    <div className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white px-5 py-4 text-sm sm:flex-row sm:items-center sm:justify-between">
                        <div className="text-slate-600">
                            Total products:{" "}
                            <span className="font-semibold text-slate-900">
                                {pagination.total}
                            </span>
                        </div>

                        <div className="text-slate-500">
                            Page {pagination.page} of {pagination.totalPages || 1}
                        </div>
                    </div>

                    {isLoading ? (
                        <ProductListSkeleton />
                    ) : (
                        <ProductGrid products={products} />
                    )}

                    {!isLoading && pagination.totalPages > 1 ? (
                        <div className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white px-5 py-4 text-sm sm:flex-row sm:items-center sm:justify-between">
                            <button
                                type="button"
                                disabled={pagination.page <= 1}
                                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                                className="rounded-2xl border border-slate-300 px-4 py-2.5 text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Previous
                            </button>

                            <div className="text-slate-600">
                                Showing page{" "}
                                <span className="font-semibold text-slate-900">
                                    {pagination.page}
                                </span>{" "}
                                of{" "}
                                <span className="font-semibold text-slate-900">
                                    {pagination.totalPages}
                                </span>
                            </div>

                            <button
                                type="button"
                                disabled={pagination.page >= pagination.totalPages}
                                onClick={() =>
                                    setPage((prev) =>
                                        Math.min(prev + 1, pagination.totalPages)
                                    )
                                }
                                className="rounded-2xl border border-slate-300 px-4 py-2.5 text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    ) : null}
                </div>
            </section>
        </StorefrontShell>
    );
}