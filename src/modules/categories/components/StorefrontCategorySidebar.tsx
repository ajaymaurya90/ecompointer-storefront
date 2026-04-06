"use client";

import { useEffect, useState } from "react";
import { useStorefrontBootstrapContext } from "@/providers/StorefrontBootstrapProvider";
import { getStorefrontCategories } from "@/modules/categories/api/categoryApi";
import type { StorefrontCategoryItem } from "@/modules/categories/types/category";

/**
 * ---------------------------------------------------------
 * STOREFRONT CATEGORY SIDEBAR
 * ---------------------------------------------------------
 * Purpose:
 * Displays storefront categories and subcategories for
 * product-list navigation and filtering.
 * ---------------------------------------------------------
 */
type Props = {
    selectedCategoryId: string | null;
    onSelectCategory: (categoryId: string | null) => void;
};

export default function StorefrontCategorySidebar({
    selectedCategoryId,
    onSelectCategory,
}: Props) {
    const {
        bootstrap,
        isLoading: isBootstrapLoading,
    } = useStorefrontBootstrapContext();

    // Resolve active BO id from storefront bootstrap.
    const brandOwnerId = bootstrap?.brandOwner?.id ?? null;

    const [categories, setCategories] = useState<StorefrontCategoryItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadCategories() {
            // Wait until bootstrap finishes before category fetch.
            if (isBootstrapLoading) {
                return;
            }

            if (!brandOwnerId) {
                setCategories([]);
                setError("Storefront category context is missing.");
                setIsLoading(false);
                return;
            }

            try {
                setIsLoading(true);
                setError(null);

                const response = await getStorefrontCategories(brandOwnerId);
                setCategories(response.data ?? []);
            } catch (err: any) {
                setCategories([]);
                setError(
                    err?.response?.data?.message ||
                    err?.message ||
                    "Failed to load categories"
                );
            } finally {
                setIsLoading(false);
            }
        }

        void loadCategories();
    }, [brandOwnerId, isBootstrapLoading]);

    return (
        <aside className="rounded-3xl border border-slate-200 bg-white p-5">
            <div className="mb-4">
                <h2 className="text-lg font-semibold text-slate-900">
                    Categories
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                    Browse by category or subcategory.
                </p>
            </div>

            <div className="space-y-3">
                <button
                    type="button"
                    onClick={() => onSelectCategory(null)}
                    className={`w-full rounded-2xl px-3 py-2 text-left text-sm transition ${selectedCategoryId === null
                            ? "bg-slate-900 font-medium text-white"
                            : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                        }`}
                >
                    All Products
                </button>

                {isLoading ? (
                    <div className="text-sm text-slate-500">
                        Loading categories...
                    </div>
                ) : null}

                {error ? (
                    <div className="rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                        {error}
                    </div>
                ) : null}

                {!isLoading && !error ? (
                    <div className="space-y-3">
                        {categories.map((category) => (
                            <div key={category.id} className="space-y-2">
                                <button
                                    type="button"
                                    onClick={() => onSelectCategory(category.id)}
                                    className={`w-full rounded-2xl px-3 py-2 text-left text-sm transition ${selectedCategoryId === category.id
                                            ? "bg-slate-900 font-medium text-white"
                                            : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                                        }`}
                                >
                                    <div className="flex items-center justify-between gap-3">
                                        <span>{category.name}</span>
                                        <span className="text-xs opacity-80">
                                            {category.productCount}
                                        </span>
                                    </div>
                                </button>

                                {category.children.length > 0 ? (
                                    <div className="ml-3 space-y-2 border-l border-slate-200 pl-3">
                                        {category.children.map((child) => (
                                            <button
                                                key={child.id}
                                                type="button"
                                                onClick={() => onSelectCategory(child.id)}
                                                className={`w-full rounded-2xl px-3 py-2 text-left text-sm transition ${selectedCategoryId === child.id
                                                        ? "bg-slate-900 font-medium text-white"
                                                        : "bg-white text-slate-600 hover:bg-slate-50"
                                                    }`}
                                            >
                                                <div className="flex items-center justify-between gap-3">
                                                    <span>{child.name}</span>
                                                    <span className="text-xs opacity-80">
                                                        {child.productCount}
                                                    </span>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                ) : null}
                            </div>
                        ))}
                    </div>
                ) : null}
            </div>
        </aside>
    );
}