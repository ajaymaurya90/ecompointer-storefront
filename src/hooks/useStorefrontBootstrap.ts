"use client";

import { useEffect, useState } from "react";
import { getStorefrontBootstrapByHost } from "@/modules/storefront/api/storefrontApi";
import type { StorefrontBootstrapResponse } from "@/modules/storefront/types/storefront";

/**
 * ---------------------------------------------------------
 * USE STOREFRONT BOOTSTRAP
 * ---------------------------------------------------------
 * Purpose:
 * Fetches storefront bootstrap from backend using the
 * normalized tenant host passed from server layout.
 * ---------------------------------------------------------
 */
export function useStorefrontBootstrap(hostname: string | null) {
    const [data, setData] = useState<StorefrontBootstrapResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function load() {
            if (!hostname) {
                setData(null);
                setError("Storefront hostname is missing");
                setIsLoading(false);
                return;
            }

            try {
                setIsLoading(true);
                setError(null);

                const response = await getStorefrontBootstrapByHost(hostname);
                setData(response);
            } catch (err: any) {
                setData(null);
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
    }, [hostname]);

    return {
        data,
        isLoading,
        error,
    };
}