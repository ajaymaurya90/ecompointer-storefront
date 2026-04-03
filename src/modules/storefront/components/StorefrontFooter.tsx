"use client";

/**
 * ---------------------------------------------------------
 * STOREFRONT FOOTER
 * ---------------------------------------------------------
 * Purpose:
 * Simple public storefront footer with BO contact details.
 * ---------------------------------------------------------
 */

import { useStorefrontBootstrapContext } from "@/providers/StorefrontBootstrapProvider";

export default function StorefrontFooter() {
    const { bootstrap } = useStorefrontBootstrapContext();

    return (
        <footer className="border-t border-slate-200 bg-white">
            <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 text-sm text-slate-600 sm:px-6 lg:grid-cols-3 lg:px-8">
                <div>
                    <div className="font-semibold text-slate-900">
                        {bootstrap?.storefront?.storefrontName ||
                            bootstrap?.brandOwner?.businessName ||
                            "Storefront"}
                    </div>
                    <p className="mt-2 text-sm text-slate-500">
                        A lightweight storefront powered by Ecompointer.
                    </p>
                </div>

                <div>
                    <div className="font-semibold text-slate-900">Support</div>
                    <div className="mt-2 space-y-1">
                        <div>{bootstrap?.storefront?.supportEmail || "-"}</div>
                        <div>{bootstrap?.storefront?.supportPhone || "-"}</div>
                    </div>
                </div>

                <div>
                    <div className="font-semibold text-slate-900">Store</div>
                    <div className="mt-2 space-y-1">
                        <div>
                            Currency: {bootstrap?.storefront?.currencyCode || "INR"}
                        </div>
                        <div>
                            Theme: {bootstrap?.theme?.activeThemeCode || "default"}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}