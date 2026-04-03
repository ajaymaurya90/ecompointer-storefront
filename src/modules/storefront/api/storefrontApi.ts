/**
 * ---------------------------------------------------------
 * STOREFRONT API
 * ---------------------------------------------------------
 * Purpose:
 * API client for storefront bootstrap/config endpoints.
 * ---------------------------------------------------------
 */

import { api } from "@/lib/http";
import type { StorefrontBootstrapResponse } from "@/modules/storefront/types/storefront";

export async function getStorefrontBootstrap(
    brandOwnerId: string
): Promise<StorefrontBootstrapResponse> {
    const response = await api.get(`/storefront/bootstrap/${brandOwnerId}`);
    return response.data;
}