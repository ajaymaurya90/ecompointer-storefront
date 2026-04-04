"use client";

/**
 * ---------------------------------------------------------
 * STOREFRONT HERO
 * ---------------------------------------------------------
 * Purpose:
 * Renders the main storefront hero section using dynamic
 * Brand Owner storefront bootstrap content.
 *
 * Dynamic content used:
 * - storefront name
 * - tagline
 * - short description
 * - primary / secondary colors
 * - active theme code
 * ---------------------------------------------------------
 */

import Link from "next/link";
import { useStorefrontBootstrapContext } from "@/providers/StorefrontBootstrapProvider";

export default function StorefrontHero() {
    const { bootstrap } = useStorefrontBootstrapContext();

    const storefrontName =
        bootstrap?.storefront?.storefrontName ||
        bootstrap?.brandOwner?.businessName ||
        "Storefront";

    const tagline =
        bootstrap?.storefront?.tagline ||
        "Discover products curated for your storefront.";

    const shortDescription =
        bootstrap?.storefront?.shortDescription ||
        "Browse our catalog, add items to cart, and place orders with a smooth customer experience.";

    const primaryColor = bootstrap?.storefront?.primaryColor || "#111827";
    const secondaryColor = bootstrap?.storefront?.secondaryColor || "#6b7280";
    const activeThemeCode = bootstrap?.theme?.activeThemeCode || "default";

    return (
        <section className="border-b border-slate-200 bg-white">
            <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
                <div
                    className="overflow-hidden rounded-[32px] border border-slate-200 px-6 py-10 shadow-sm sm:px-10 lg:px-12"
                    style={{
                        background: `linear-gradient(135deg, ${primaryColor}12 0%, #ffffff 45%, ${secondaryColor}10 100%)`,
                    }}
                >
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-center">
                        <div>
                            <div
                                className="inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]"
                                style={{
                                    color: primaryColor,
                                    borderColor: `${primaryColor}33`,
                                    backgroundColor: `${primaryColor}0D`,
                                }}
                            >
                                {activeThemeCode} theme
                            </div>

                            <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                                {storefrontName}
                            </h1>

                            <p
                                className="mt-4 max-w-2xl text-lg font-medium"
                                style={{ color: primaryColor }}
                            >
                                {tagline}
                            </p>

                            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                                {shortDescription}
                            </p>

                            <div className="mt-8 flex flex-wrap items-center gap-3">
                                <Link
                                    href="/products"
                                    className="rounded-2xl px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
                                    style={{ backgroundColor: primaryColor }}
                                >
                                    Shop Products
                                </Link>

                                <Link
                                    href="/cart"
                                    className="rounded-2xl border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                                >
                                    View Cart
                                </Link>
                            </div>
                        </div>

                        <div className="rounded-[28px] border border-slate-200 bg-white/80 p-6 backdrop-blur">
                            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                                Storefront Highlights
                            </div>

                            <div className="mt-5 space-y-4">
                                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                                    <div className="text-xs text-slate-500">
                                        Registration
                                    </div>
                                    <div className="mt-1 text-sm font-semibold text-slate-900">
                                        {bootstrap?.storefront?.isCustomerRegistrationEnabled
                                            ? "Enabled"
                                            : "Disabled"}
                                    </div>
                                </div>

                                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                                    <div className="text-xs text-slate-500">
                                        Guest Checkout
                                    </div>
                                    <div className="mt-1 text-sm font-semibold text-slate-900">
                                        {bootstrap?.storefront?.isGuestCheckoutEnabled
                                            ? "Available"
                                            : "Login Required"}
                                    </div>
                                </div>

                                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                                    <div className="text-xs text-slate-500">
                                        Currency
                                    </div>
                                    <div className="mt-1 text-sm font-semibold text-slate-900">
                                        {bootstrap?.storefront?.currencyCode || "INR"}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}