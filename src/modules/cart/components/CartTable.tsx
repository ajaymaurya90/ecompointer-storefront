"use client";

/**
 * ---------------------------------------------------------
 * CART TABLE
 * ---------------------------------------------------------
 * Purpose:
 * Displays cart items with quantity update and remove actions.
 * ---------------------------------------------------------
 */

import type { CartItem } from "@/modules/cart/types/cart";
import { resolveMediaUrl } from "@/lib/mediaUrl";

type Props = {
    items: CartItem[];
    onQuantityChange: (productVariantId: string, quantity: number) => void;
    onRemove: (productVariantId: string) => void;
};

export default function CartTable({
    items,
    onQuantityChange,
    onRemove,
}: Props) {
    return (
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                    <thead className="border-b border-slate-200 bg-slate-50 text-left text-slate-600">
                        <tr>
                            <th className="px-5 py-4 font-medium">Product</th>
                            <th className="px-5 py-4 font-medium">Variant</th>
                            <th className="px-5 py-4 font-medium">Price</th>
                            <th className="px-5 py-4 font-medium">Qty</th>
                            <th className="px-5 py-4 font-medium">Total</th>
                            <th className="px-5 py-4 font-medium">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {items.map((item) => {
                            const lineTotal =
                                item.price * item.quantity +
                                ((item.price * item.quantity) * item.taxRate) / 100;
                            const imageUrl = resolveMediaUrl(item.image);

                            return (
                                <tr
                                    key={item.productVariantId}
                                    className="border-b border-slate-100 align-top last:border-b-0"
                                >
                                    <td className="px-5 py-4">
                                        <div className="flex items-start gap-4">
                                            <div className="h-16 w-16 overflow-hidden rounded-2xl bg-slate-100">
                                                {imageUrl ? (
                                                    <img
                                                        src={imageUrl}
                                                        alt={item.productName}
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">
                                                        No image
                                                    </div>
                                                )}
                                            </div>

                                            <div>
                                                <div className="font-semibold text-slate-900">
                                                    {item.productName}
                                                </div>
                                                <div className="mt-1 text-xs text-slate-500">
                                                    Code: {item.productCode}
                                                </div>
                                                <div className="mt-1 text-xs text-slate-500">
                                                    SKU: {item.sku}
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-5 py-4 text-slate-700">
                                        {item.variantLabel}
                                    </td>

                                    <td className="px-5 py-4 text-slate-700">
                                        ₹{item.price.toFixed(2)}
                                        <div className="mt-1 text-xs text-slate-500">
                                            Tax {item.taxRate}%
                                        </div>
                                    </td>

                                    <td className="px-5 py-4">
                                        <input
                                            type="number"
                                            min={1}
                                            max={item.stock}
                                            value={item.quantity}
                                            onChange={(e) =>
                                                onQuantityChange(
                                                    item.productVariantId,
                                                    Number(e.target.value)
                                                )
                                            }
                                            className="h-11 w-24 rounded-2xl border border-slate-300 px-3 text-sm outline-none transition focus:border-slate-500"
                                        />
                                        <div className="mt-1 text-xs text-slate-500">
                                            Max: {item.stock}
                                        </div>
                                    </td>

                                    <td className="px-5 py-4 font-semibold text-slate-900">
                                        ₹{lineTotal.toFixed(2)}
                                    </td>

                                    <td className="px-5 py-4">
                                        <button
                                            type="button"
                                            onClick={() => onRemove(item.productVariantId)}
                                            className="rounded-2xl border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
