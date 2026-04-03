"use client";

/**
 * ---------------------------------------------------------
 * PRODUCT GRID
 * ---------------------------------------------------------
 * Purpose:
 * Displays a responsive grid of storefront product cards.
 * ---------------------------------------------------------
 */

import ProductCard from "./ProductCard";
import type { StorefrontProductListItem } from "@/modules/products/types/product";

type Props = {
    products: StorefrontProductListItem[];
};

export default function ProductGrid({ products }: Props) {
    if (!products.length) {
        return (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
                <h3 className="text-lg font-semibold text-slate-900">
                    No products found
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                    Try changing your search or browse again later.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}