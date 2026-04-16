"use client";

/**
 * ---------------------------------------------------------
 * STOREFRONT HEADER
 * ---------------------------------------------------------
 * Purpose:
 * Main public storefront header showing BO branding,
 * storefront navigation, customer auth actions,
 * and live cart item count badge.
 *
 * Features:
 * 1. Restores storefront customer session on load
 * 2. Shows logged-in customer name when authenticated
 * 3. Hides login link when authenticated
 * 4. Shows account/orders link when authenticated
 * 5. Adds logout action
 * 6. Shows live cart item count badge
 * 7. Shows storefront tagline when configured
 * ---------------------------------------------------------
 */

import Link from "next/link";
import { useEffect } from "react";
import { useStorefrontBootstrapContext } from "@/providers/StorefrontBootstrapProvider";
import { useStorefrontAuthStore } from "@/store/storefrontAuthStore";
import { useCartStore } from "@/modules/cart/store/cartStore";
import { resolveMediaUrl } from "@/lib/mediaUrl";

export default function StorefrontHeader() {
    const { bootstrap } = useStorefrontBootstrapContext();

    const customer = useStorefrontAuthStore((state) => state.customer);
    const isAuthenticated = useStorefrontAuthStore((state) => state.isAuthenticated);
    const isLoading = useStorefrontAuthStore((state) => state.isLoading);
    const restoreSession = useStorefrontAuthStore((state) => state.restoreSession);
    const clearSession = useStorefrontAuthStore((state) => state.clearSession);

    const cartItemCount = useCartStore((state) => state.items.length);
    const cartTotalQuantity = useCartStore((state) =>
        state.items.reduce((sum, item) => sum + item.quantity, 0)
    );

    // Restore storefront customer session when header mounts.
    useEffect(() => {
        void restoreSession();
    }, [restoreSession]);

    const storefrontName =
        bootstrap?.storefront?.storefrontName ||
        bootstrap?.brandOwner?.businessName ||
        "Storefront";

    const storefrontTagline =
        bootstrap?.storefront?.tagline || "Customer storefront";
    const logoUrl = resolveMediaUrl(bootstrap?.storefront?.logoUrl);

    // Build readable customer name for authenticated header state.
    const customerName =
        [customer?.firstName, customer?.lastName].filter(Boolean).join(" ").trim() ||
        customer?.email ||
        "Customer";

    // Clear storefront customer session on logout click.
    function handleLogout() {
        clearSession();
    }

    return (
        <header className="border-b border-slate-200 bg-white">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
                <Link href="/" className="flex items-center gap-3">
                    {logoUrl ? (
                        <img
                            src={logoUrl}
                            alt={storefrontName}
                            className="h-10 w-10 rounded-xl object-cover"
                        />
                    ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-sm font-semibold text-white">
                            {storefrontName.slice(0, 1).toUpperCase()}
                        </div>
                    )}

                    <div>
                        <div className="text-base font-semibold text-slate-900">
                            {storefrontName}
                        </div>
                        <div className="text-xs text-slate-500">
                            {storefrontTagline}
                        </div>
                    </div>
                </Link>

                <nav className="flex items-center gap-3 text-sm text-slate-600 sm:gap-5">
                    <Link href="/" className="hover:text-slate-900">
                        Home
                    </Link>

                    <Link href="/products" className="hover:text-slate-900">
                        Products
                    </Link>

                    <Link
                        href="/cart"
                        className="relative inline-flex items-center gap-2 hover:text-slate-900"
                    >
                        <span>Cart</span>

                        {cartItemCount > 0 ? (
                            <span className="inline-flex min-w-[22px] items-center justify-center rounded-full bg-slate-900 px-2 py-0.5 text-[11px] font-semibold text-white">
                                {cartTotalQuantity}
                            </span>
                        ) : null}
                    </Link>

                    {isLoading ? (
                        <span className="text-slate-400">Loading...</span>
                    ) : isAuthenticated ? (
                        <>
                            <span className="hidden rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 md:inline-flex">
                                {customerName}
                            </span>

                            <Link href="/account/orders" className="hover:text-slate-900">
                                My Orders
                            </Link>

                            <button
                                type="button"
                                onClick={handleLogout}
                                className="rounded-2xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="hover:text-slate-900">
                                Login
                            </Link>

                            <Link
                                href="/register"
                                className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:opacity-90"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
}
