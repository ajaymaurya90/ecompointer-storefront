"use client";

/**
 * ---------------------------------------------------------
 * ADD TO CART CARD
 * ---------------------------------------------------------
 * Purpose:
 * Displays selected sellable option summary and add-to-cart action.
 * ---------------------------------------------------------
 */

import { useMemo } from "react";
import type { StorefrontProductDetail, StorefrontProductVariant } from "@/modules/products/types/product";

type Props = {
    product: StorefrontProductDetail;
    selectedVariant: StorefrontProductVariant | null;
    quantity: number;
    onQuantityChange: (quantity: number) => void;
    onAddToCart: () => void;
};

export default function AddToCartCard({
    product,
    selectedVariant,
    quantity,
    onQuantityChange,
    onAddToCart,
}: Props) {
    const maxQty = useMemo(() => {
        if (!selectedVariant) return 1;
        return Math.max(1, selectedVariant.stock);
    }, [selectedVariant]);

    const canAdd =
        !!selectedVariant && selectedVariant.inStock && quantity > 0;

    const variantLabel = selectedVariant
        ? selectedVariant.variantLabel ||
        [selectedVariant.size, selectedVariant.color].filter(Boolean).join(" / ") ||
        selectedVariant.sku
        : "Select an option";

    const optionLabel = selectedVariant?.isStandalone ? "Product" : "Option";

    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-medium uppercase tracking-wide text-slate-400">
                Purchase
            </div>

            <h2 className="mt-2 text-2xl font-bold text-slate-900">
                {product.name}
            </h2>

            <div className="mt-3 text-sm text-slate-600">
                {optionLabel}:{" "}
                <span className="font-medium text-slate-900">{variantLabel}</span>
            </div>

            <div className="mt-2 text-sm text-slate-600">
                Price:{" "}
                <span className="font-semibold text-slate-900">
                    ₹{selectedVariant?.retailGross?.toFixed(2) || product.price.min.toFixed(2)}
                </span>
            </div>

            <div className="mt-2 text-sm text-slate-600">
                Tax Rate:{" "}
                <span className="font-medium text-slate-900">
                    {selectedVariant?.taxRate ?? 0}%
                </span>
            </div>

            <div className="mt-5">
                <label className="mb-2 block text-sm font-medium text-slate-700">
                    Quantity
                </label>
                <input
                    type="number"
                    min={1}
                    max={maxQty}
                    value={quantity}
                    onChange={(e) => onQuantityChange(Number(e.target.value))}
                    className="h-12 w-full rounded-2xl border border-slate-300 px-4 text-sm outline-none transition focus:border-slate-500"
                />
            </div>

            <button
                type="button"
                onClick={onAddToCart}
                disabled={!canAdd}
                className="mt-6 w-full rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
                Add to Cart
            </button>

            {!selectedVariant ? (
                <p className="mt-3 text-xs text-amber-600">
                    Please select an option first.
                </p>
            ) : null}

            {selectedVariant && !selectedVariant.inStock ? (
                <p className="mt-3 text-xs text-red-500">
                    This option is currently out of stock.
                </p>
            ) : null}
        </div>
    );
}
