"use client";

/**
 * ---------------------------------------------------------
 * CHECKOUT ORDER SUMMARY
 * ---------------------------------------------------------
 * Purpose:
 * Displays selected cart items and calculated totals.
 * ---------------------------------------------------------
 */

import type { CartItem } from "@/modules/cart/types/cart";

type Props = {
    items: CartItem[];
    subtotal: number;
    taxAmount: number;
    shippingAmount: string;
    discountAmount: string;
    grandTotal: number;
    onShippingAmountChange: (value: string) => void;
    onDiscountAmountChange: (value: string) => void;
};

export default function CheckoutOrderSummary({
    items,
    subtotal,
    taxAmount,
    shippingAmount,
    discountAmount,
    grandTotal,
    onShippingAmountChange,
    onDiscountAmountChange,
}: Props) {
    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5">
                <h2 className="text-xl font-semibold text-slate-900">
                    Order Summary
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                    Review selected items and total amount.
                </p>
            </div>

            <div className="space-y-4">
                {items.map((item) => {
                    const lineSubtotal = item.price * item.quantity;
                    const lineTax = (lineSubtotal * item.taxRate) / 100;
                    const lineTotal = lineSubtotal + lineTax;

                    return (
                        <div
                            key={item.productVariantId}
                            className="flex items-start justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4"
                        >
                            <div className="min-w-0">
                                <div className="font-medium text-slate-900">
                                    {item.productName}
                                </div>
                                <div className="mt-1 text-xs text-slate-500">
                                    {item.variantLabel}
                                </div>
                                <div className="mt-1 text-xs text-slate-500">
                                    Qty: {item.quantity}
                                </div>
                            </div>

                            <div className="whitespace-nowrap text-right text-sm font-semibold text-slate-900">
                                ₹{lineTotal.toFixed(2)}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-6 space-y-4">
                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Shipping Amount
                    </label>
                    <input
                        type="number"
                        min={0}
                        value={shippingAmount}
                        onChange={(e) => onShippingAmountChange(e.target.value)}
                        className="h-12 w-full rounded-2xl border border-slate-300 px-4 text-sm outline-none transition focus:border-slate-500"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Discount Amount
                    </label>
                    <input
                        type="number"
                        min={0}
                        value={discountAmount}
                        onChange={(e) => onDiscountAmountChange(e.target.value)}
                        className="h-12 w-full rounded-2xl border border-slate-300 px-4 text-sm outline-none transition focus:border-slate-500"
                    />
                </div>
            </div>

            <div className="mt-6 space-y-3 border-t border-slate-200 pt-5 text-sm">
                <div className="flex items-center justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span className="font-medium text-slate-900">
                        ₹{subtotal.toFixed(2)}
                    </span>
                </div>

                <div className="flex items-center justify-between text-slate-600">
                    <span>Tax</span>
                    <span className="font-medium text-slate-900">
                        ₹{taxAmount.toFixed(2)}
                    </span>
                </div>

                <div className="flex items-center justify-between text-slate-600">
                    <span>Shipping</span>
                    <span className="font-medium text-slate-900">
                        ₹{Number(shippingAmount || 0).toFixed(2)}
                    </span>
                </div>

                <div className="flex items-center justify-between text-slate-600">
                    <span>Discount</span>
                    <span className="font-medium text-slate-900">
                        ₹{Number(discountAmount || 0).toFixed(2)}
                    </span>
                </div>

                <div className="flex items-center justify-between border-t border-slate-200 pt-4">
                    <span className="text-base font-semibold text-slate-900">
                        Grand Total
                    </span>
                    <span className="text-xl font-bold text-slate-900">
                        ₹{grandTotal.toFixed(2)}
                    </span>
                </div>
            </div>
        </div>
    );
}