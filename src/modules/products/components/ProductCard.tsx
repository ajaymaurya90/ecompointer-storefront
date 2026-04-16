"use client";

/**
 * ---------------------------------------------------------
 * PRODUCT CARD
 * ---------------------------------------------------------
 * Purpose:
 * Renders one storefront product card inside the listing grid.
 * ---------------------------------------------------------
 */

import Link from "next/link";
import type { StorefrontProductListItem } from "@/modules/products/types/product";
import { resolveMediaUrl } from "@/lib/mediaUrl";

type Props = {
    product: StorefrontProductListItem;
};

export default function ProductCard({ product }: Props) {
    const imageUrl = resolveMediaUrl(product.image);
    const priceText =
        product.price.min === product.price.max
            ? `₹${product.price.min.toFixed(2)}`
            : `₹${product.price.min.toFixed(2)} - ₹${product.price.max.toFixed(2)}`;

    return (
        <Link
            href={`/products/${product.id}`}
            className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
            <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={product.imageAlt || product.name}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm text-slate-400">
                        No image
                    </div>
                )}
            </div>

            <div className="p-5">
                <div className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    {product.brand?.name || "Brand"}
                </div>

                <h3 className="mt-2 line-clamp-2 text-lg font-semibold text-slate-900">
                    {product.name}
                </h3>

                <p className="mt-2 line-clamp-2 min-h-[40px] text-sm leading-6 text-slate-500">
                    {product.description || "Browse this product and choose your option."}
                </p>

                <div className="mt-4 flex items-end justify-between gap-4">
                    <div>
                        <div className="text-lg font-bold text-slate-900">
                            {priceText}
                        </div>
                        <div className="mt-1 text-xs text-slate-500">
                            {product.variantCount > 0
                                ? `${product.variantCount} option${product.variantCount === 1 ? "" : "s"}`
                                : "Simple product"}
                        </div>
                    </div>

                    <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                        Stock: {product.totalStock}
                    </div>
                </div>
            </div>
        </Link>
    );
}
