"use client";

/**
 * ---------------------------------------------------------
 * CART EMPTY STATE
 * ---------------------------------------------------------
 * Purpose:
 * Displays a friendly empty cart message and action.
 * ---------------------------------------------------------
 */

import Link from "next/link";

export default function CartEmptyState() {
    return (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <h2 className="text-2xl font-semibold text-slate-900">
                Your cart is empty
            </h2>
            <p className="mt-3 text-sm text-slate-500">
                Browse products and add your preferred items to continue.
            </p>

            <Link
                href="/products"
                className="mt-6 inline-flex rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:opacity-90"
            >
                Shop Products
            </Link>
        </div>
    );
}