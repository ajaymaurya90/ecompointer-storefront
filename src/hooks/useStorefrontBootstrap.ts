"use client";

/**
 * ---------------------------------------------------------
 * USE STOREFRONT BOOTSTRAP
 * ---------------------------------------------------------
 * Purpose:
 * Loads BO storefront bootstrap data from backend and
 * exposes loading/error/data states to the app shell.
 * ---------------------------------------------------------
 */

import { useEffect, useState } from "react";
import { getStorefrontBootstrap } from "@/modules/storefront/api/storefrontApi";
import type { StorefrontBootstrapResponse } from "@/modules/storefront/types/storefront";

export function useStorefrontBootstrap(brandOwnerId: string | null) {
    const [data, setData] = useState<StorefrontBootstrapResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function load() {
            if (!brandOwnerId) {
                setError("Brand owner id is missing");
                setIsLoading(false);
                return;
            }

            try {
                setIsLoading(true);
                setError(null);

                const response = await getStorefrontBootstrap(brandOwnerId);
                setData(response);
            } catch (err: any) {
                setError(
                    err?.response?.data?.message ||
                    err?.message ||
                    "Failed to load storefront"
                );
            } finally {
                setIsLoading(false);
            }
        }

        void load();
    }, [brandOwnerId]);

    return {
        data,
        isLoading,
        error,
    };
}