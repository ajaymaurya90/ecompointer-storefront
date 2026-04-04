/**
 * ---------------------------------------------------------
 * STOREFRONT API
 * ---------------------------------------------------------
 * Purpose:
 * API client for storefront bootstrap/config endpoints.
 * Bootstrap now resolves storefront by request host instead
 * of frontend hardcoded Brand Owner id.
 * ---------------------------------------------------------
 */

import { api } from "@/lib/http";
import type { StorefrontBootstrapResponse } from "@/modules/storefront/types/storefront";

export async function getStorefrontBootstrapByHost(
    host: string
): Promise<StorefrontBootstrapResponse> {
    const response = await api.get("/storefront/bootstrap/resolve/by-host", {
        params: {
            host,
        },
    });

    return response.data;
}