"use client";

/**
 * ---------------------------------------------------------
 * PRODUCT OPTION SELECTOR
 * ---------------------------------------------------------
 * Purpose:
 * Lets customer choose one sellable product option for purchase.
 * ---------------------------------------------------------
 */

import type { StorefrontProductVariant } from "@/modules/products/types/product";

type Props = {
    variants: StorefrontProductVariant[];
    selectedVariantId: string;
    onChange: (variantId: string) => void;
};

export default function ProductVariantSelector({
    variants,
    selectedVariantId,
    onChange,
}: Props) {
    if (!variants.length) {
        return null;
    }

    if (variants.length === 1 && variants[0].isStandalone) {
        return null;
    }

    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-slate-900">
                    Select Option
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                    Choose the option you want to add to cart.
                </p>
            </div>

            <div className="space-y-3">
                {variants.map((variant) => {
                    const label =
                        variant.variantLabel ||
                        [variant.size, variant.color].filter(Boolean).join(" / ") ||
                        variant.sku;

                    return (
                        <label
                            key={variant.id}
                            className={`flex cursor-pointer items-start justify-between gap-4 rounded-2xl border p-4 transition ${selectedVariantId === variant.id
                                    ? "border-slate-900 bg-slate-50"
                                    : "border-slate-200 bg-white"
                                }`}
                        >
                            <div className="flex items-start gap-3">
                                <input
                                    type="radio"
                                    name="variant"
                                    checked={selectedVariantId === variant.id}
                                    onChange={() => onChange(variant.id)}
                                    className="mt-1 h-4 w-4"
                                />

                                <div>
                                    <div className="font-medium text-slate-900">
                                        {label}
                                    </div>
                                    <div className="mt-1 text-xs text-slate-500">
                                        SKU: {variant.sku}
                                    </div>
                                </div>
                            </div>

                            <div className="text-right">
                                <div className="font-semibold text-slate-900">
                                    ₹{variant.retailGross.toFixed(2)}
                                </div>
                                <div
                                    className={`mt-1 text-xs ${variant.inStock
                                            ? "text-emerald-600"
                                            : "text-red-500"
                                        }`}
                                >
                                    {variant.inStock
                                        ? `In stock (${variant.stock})`
                                        : "Out of stock"}
                                </div>
                            </div>
                        </label>
                    );
                })}
            </div>
        </div>
    );
}
