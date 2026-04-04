"use client";

/**
 * ---------------------------------------------------------
 * HOMEPAGE
 * ---------------------------------------------------------
 * Purpose:
 * Initial storefront homepage using bootstrap-driven branding
 * and public storefront content from BO settings.
 * ---------------------------------------------------------
 */

import StorefrontShell from "@/modules/storefront/components/StorefrontShell";
import StorefrontHero from "@/modules/storefront/components/StorefrontHero";
import { useStorefrontBootstrapContext } from "@/providers/StorefrontBootstrapProvider";

export default function HomePage() {
    const { isTenantResolved, error, bootstrap } =
        useStorefrontBootstrapContext();

    const storefrontName =
        bootstrap?.storefront?.storefrontName ||
        bootstrap?.brandOwner?.businessName ||
        "Storefront";

    const shortDescription =
        bootstrap?.storefront?.shortDescription ||
        "Browse products, add items to cart, and place orders from your storefront.";

    const aboutDescription =
        bootstrap?.storefront?.aboutDescription || null;

    const supportEmail = bootstrap?.storefront?.supportEmail || null;
    const supportPhone = bootstrap?.storefront?.supportPhone || null;

    return (
        <StorefrontShell>
            {!isTenantResolved ? (
                <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
                    <div className="rounded-3xl border border-amber-200 bg-amber-50 p-8">
                        <h1 className="text-2xl font-bold text-amber-900">
                            Storefront domain not mapped
                        </h1>
                        <p className="mt-3 text-sm leading-6 text-amber-800">
                            This storefront could not resolve a Brand Owner from the
                            current host. For local development, open the app using a
                            mapped local domain like <strong>ayodoya.local:3002</strong>{" "}
                            instead of plain localhost.
                        </p>
                        <p className="mt-3 text-xs text-amber-700">
                            {error}
                        </p>
                    </div>
                </section>
            ) : (
                <>
                    <StorefrontHero />

                    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            <div className="rounded-3xl border border-slate-200 bg-white p-8">
                                <h2 className="text-2xl font-semibold text-slate-900">
                                    Welcome to {storefrontName}
                                </h2>
                                <p className="mt-4 text-sm leading-7 text-slate-600">
                                    {shortDescription}
                                </p>
                            </div>

                            <div className="rounded-3xl border border-slate-200 bg-white p-8">
                                <h2 className="text-2xl font-semibold text-slate-900">
                                    Customer Support
                                </h2>
                                <div className="mt-4 space-y-3 text-sm text-slate-600">
                                    <div>
                                        <span className="font-medium text-slate-900">
                                            Email:
                                        </span>{" "}
                                        {supportEmail || "-"}
                                    </div>
                                    <div>
                                        <span className="font-medium text-slate-900">
                                            Phone:
                                        </span>{" "}
                                        {supportPhone || "-"}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {aboutDescription ? (
                            <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-8">
                                <h2 className="text-2xl font-semibold text-slate-900">
                                    About Us
                                </h2>
                                <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-600">
                                    {aboutDescription}
                                </p>
                            </div>
                        ) : null}
                    </section>
                </>
            )}
        </StorefrontShell>
    );
}