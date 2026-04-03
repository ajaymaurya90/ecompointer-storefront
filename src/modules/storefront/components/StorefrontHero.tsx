"use client";

/**
 * ---------------------------------------------------------
 * STOREFRONT HERO
 * ---------------------------------------------------------
 * Purpose:
 * Homepage hero block powered by storefront bootstrap data.
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

    return (
        <section className="border-b border-slate-200 bg-white">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="max-w-3xl">
                    <div className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
                        Welcome to {storefrontName}
                    </div>

                    <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                        Discover products from {storefrontName}
                    </h1>

                    <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
                        Explore the latest products, add them to cart, and place your
                        order through this storefront experience.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <Link
                            href="/products"
                            className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:opacity-90"
                        >
                            Shop Products
                        </Link>

                        <Link
                            href="/login"
                            className="rounded-2xl border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
                        >
                            Customer Login
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}