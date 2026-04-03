"use client";

/**
 * ---------------------------------------------------------
 * ACCOUNT AUTH REQUIRED
 * ---------------------------------------------------------
 * Purpose:
 * Displays login-required message for protected account pages.
 * ---------------------------------------------------------
 */

import Link from "next/link";

export default function AccountAuthRequired() {
    return (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <h2 className="text-2xl font-semibold text-slate-900">
                Login required
            </h2>
            <p className="mt-3 text-sm text-slate-500">
                Please login to access your order history and account details.
            </p>

            <Link
                href="/login"
                className="mt-6 inline-flex rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:opacity-90"
            >
                Go to Login
            </Link>
        </div>
    );
}