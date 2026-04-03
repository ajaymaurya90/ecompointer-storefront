"use client";

/**
 * ---------------------------------------------------------
 * CART SUMMARY CARD
 * ---------------------------------------------------------
 * Purpose:
 * Displays computed totals and checkout action for cart.
 * ---------------------------------------------------------
 */

import Link from "next/link";
import type { CartSummary } from "@/modules/cart/types/cart";

type Props = {
    summary: CartSummary;
    onClearCart: () => void;
};

export default function CartSummaryCard({ summary, onClearCart }: Props) {
    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">
                Cart Summary
            </h2>

            <div className="mt-5 space-y-4 text-sm">
                <div className="flex items-center justify-between text-slate-600">
                    <span>Items</span>
                    <span className="font-medium text-slate-900">
                        {summary.itemCount}
                    </span>
                </div>

                <div className="flex items-center justify-between text-slate-600">
                    <span>Total Quantity</span>
                    <span className="font-medium text-slate-900">
                        {summary.totalQuantity}
                    </span>
                </div>

                <div className="flex items-center justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span className="font-medium text-slate-900">
                        ₹{summary.subtotal.toFixed(2)}
                    </span>
                </div>

                <div className="flex items-center justify-between text-slate-600">
                    <span>Tax</span>
                    <span className="font-medium text-slate-900">
                        ₹{summary.taxAmount.toFixed(2)}
                    </span>
                </div>

                <div className="border-t border-slate-200 pt-4">
                    <div className="flex items-center justify-between">
                        <span className="text-base font-semibold text-slate-900">
                            Grand Total
                        </span>
                        <span className="text-xl font-bold text-slate-900">
                            ₹{summary.grandTotal.toFixed(2)}
                        </span>
                    </div>
                </div>
            </div>

            <div className="mt-6 space-y-3">
                <Link
                    href="/checkout"
                    className="inline-flex w-full justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:opacity-90"
                >
                    Proceed to Checkout
                </Link>

                <button
                    type="button"
                    onClick={onClearCart}
                    className="w-full rounded-2xl border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                    Clear Cart
                </button>
            </div>
        </div>
    );
}