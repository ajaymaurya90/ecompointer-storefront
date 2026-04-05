"use client";

import {
    createContext,
    useContext,
    type ReactNode,
} from "react";
import { useStorefrontBootstrap } from "@/hooks/useStorefrontBootstrap";
import type { StorefrontBootstrapResponse } from "@/modules/storefront/types/storefront";

/**
 * ---------------------------------------------------------
 * STOREFRONT BOOTSTRAP PROVIDER
 * ---------------------------------------------------------
 * Purpose:
 * Loads storefront bootstrap using the normalized hostname
 * received from server layout.
 * ---------------------------------------------------------
 */

type StorefrontBootstrapContextValue = {
    hostname: string | null;
    bootstrap: StorefrontBootstrapResponse | null;
    isLoading: boolean;
    error: string | null;
    isTenantResolved: boolean;
};

const StorefrontBootstrapContext =
    createContext<StorefrontBootstrapContextValue | null>(null);

type Props = {
    hostname: string | null;
    children: ReactNode;
};

export function StorefrontBootstrapProvider({
    hostname,
    children,
}: Props) {
    const isTenantResolved = !!hostname;

    const { data, isLoading, error } = useStorefrontBootstrap(
        isTenantResolved ? hostname : null
    );

    return (
        <StorefrontBootstrapContext.Provider
            value={{
                hostname,
                bootstrap: data,
                isLoading: isTenantResolved ? isLoading : false,
                error: isTenantResolved
                    ? error
                    : "Storefront hostname could not be resolved.",
                isTenantResolved,
            }}
        >
            {children}
        </StorefrontBootstrapContext.Provider>
    );
}

export function useStorefrontBootstrapContext() {
    const context = useContext(StorefrontBootstrapContext);

    if (!context) {
        throw new Error(
            "useStorefrontBootstrapContext must be used inside StorefrontBootstrapProvider"
        );
    }

    return context;
}