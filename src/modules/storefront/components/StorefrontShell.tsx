"use client";

/**
 * ---------------------------------------------------------
 * STOREFRONT SHELL
 * ---------------------------------------------------------
 * Purpose:
 * Shared storefront shell used across public pages.
 * ---------------------------------------------------------
 */

import type { ReactNode } from "react";
import StorefrontHeader from "./StorefrontHeader";
import StorefrontFooter from "./StorefrontFooter";

type Props = {
    children: ReactNode;
};

export default function StorefrontShell({ children }: Props) {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <StorefrontHeader />
            <main>{children}</main>
            <StorefrontFooter />
        </div>
    );
}
