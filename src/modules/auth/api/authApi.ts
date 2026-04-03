/**
 * ---------------------------------------------------------
 * STOREFRONT AUTH API
 * ---------------------------------------------------------
 * Purpose:
 * API client for storefront customer register, login,
 * and current customer profile.
 * ---------------------------------------------------------
 */

import { api } from "@/lib/http";
import type {
    StorefrontLoginPayload,
    StorefrontLoginResponse,
    StorefrontMeResponse,
    StorefrontCustomerProfile,
    StorefrontRegisterPayload,
    StorefrontRegisterResponse,
} from "@/modules/auth/types/auth";

export async function registerStorefrontCustomer(
    brandOwnerId: string,
    data: StorefrontRegisterPayload
): Promise<StorefrontRegisterResponse> {
    const response = await api.post(
        `/storefront/auth/register/brand-owner/${brandOwnerId}`,
        data
    );

    return response.data;
}

export async function loginStorefrontCustomer(
    brandOwnerId: string,
    data: StorefrontLoginPayload
): Promise<StorefrontLoginResponse> {
    const response = await api.post(
        `/storefront/auth/login/brand-owner/${brandOwnerId}`,
        data
    );

    return response.data;
}

export async function getStorefrontMe(
    accessToken: string
): Promise<StorefrontCustomerProfile> {
    const response = await api.get<StorefrontMeResponse>(`/storefront/auth/me`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    return response.data.data;
}