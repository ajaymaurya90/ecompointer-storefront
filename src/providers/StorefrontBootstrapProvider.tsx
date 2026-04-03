"use client";

/**
 * ---------------------------------------------------------
 * STOREFRONT BOOTSTRAP PROVIDER
 * ---------------------------------------------------------
 * Purpose:
 * Provides storefront bootstrap data to the full frontend
 * app so layout, theme, and pages can use BO storefront
 * settings from one central place.
 * ---------------------------------------------------------
 */

import {
    createContext,
    useContext,
    type ReactNode,
} from "react";
import { useStorefrontBootstrap } from "@/hooks/useStorefrontBootstrap";
import type { StorefrontBootstrapResponse } from "@/modules/storefront/types/storefront";

type StorefrontBootstrapContextValue = {
    brandOwnerId: string | null;
    bootstrap: StorefrontBootstrapResponse | null;
    isLoading: boolean;
    error: string | null;
};

const StorefrontBootstrapContext =
    createContext<StorefrontBootstrapContextValue | null>(null);

type Props = {
    brandOwnerId: string | null;
    children: ReactNode;
};

export function StorefrontBootstrapProvider({
    brandOwnerId,
    children,
}: Props) {
    const { data, isLoading, error } = useStorefrontBootstrap(brandOwnerId);

    return (
        <StorefrontBootstrapContext.Provider
            value={{
                brandOwnerId,
                bootstrap: data,
                isLoading,
                error,
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