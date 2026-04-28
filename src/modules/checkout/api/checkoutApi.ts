/**
 * ---------------------------------------------------------
 * STOREFRONT CHECKOUT API
 * ---------------------------------------------------------
 * Purpose:
 * API client for storefront checkout order creation.
 * ---------------------------------------------------------
 */

import { api } from "@/lib/http";
import type {
    CreateStorefrontOrderPayload,
    CreateStorefrontOrderResponse,
    StorefrontOrderStatus,
    StorefrontOrderStatusResponse,
} from "@/modules/checkout/types/checkout";

export async function createStorefrontOrder(
    brandOwnerId: string,
    data: CreateStorefrontOrderPayload
): Promise<CreateStorefrontOrderResponse["data"]> {
    const response = await api.post<CreateStorefrontOrderResponse>(
        `/storefront/orders/brand-owner/${brandOwnerId}`,
        data
    );

    return response.data.data;
}

export async function getStorefrontOrderStatus(
    brandOwnerId: string,
    orderId: string,
    orderAccessToken: string
): Promise<StorefrontOrderStatus> {
    const response = await api.get<StorefrontOrderStatusResponse>(
        `/storefront/orders/brand-owner/${brandOwnerId}/${orderId}/status`,
        {
            params: {
                token: orderAccessToken,
            },
        }
    );

    return response.data.data;
}
