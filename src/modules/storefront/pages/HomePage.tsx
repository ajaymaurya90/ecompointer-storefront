"use client";

/**
 * ---------------------------------------------------------
 * HOMEPAGE
 * ---------------------------------------------------------
 * Purpose:
 * Initial storefront homepage using bootstrap-driven branding.
 * ---------------------------------------------------------
 */

import StorefrontShell from "@/modules/storefront/components/StorefrontShell";
import StorefrontHero from "@/modules/storefront/components/StorefrontHero";

export default function HomePage() {
    return (
        <StorefrontShell>
            <StorefrontHero />

            <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="rounded-3xl border border-slate-200 bg-white p-8">
                    <h2 className="text-2xl font-semibold text-slate-900">
                        Storefront is ready
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                        Your storefront bootstrap layer is working. Next we can add
                        product listing, product detail, cart, checkout, and customer
                        account pages.
                    </p>
                </div>
            </section>
        </StorefrontShell>
    );
}