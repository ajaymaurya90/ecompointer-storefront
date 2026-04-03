/**
 * ---------------------------------------------------------
 * STOREFRONT ACCOUNT API
 * ---------------------------------------------------------
 * Purpose:
 * API client for storefront customer order history and
 * order detail endpoints.
 * ---------------------------------------------------------
 */

import { api } from "@/lib/http";
import type {
    StorefrontOrderDetail,
    StorefrontOrderDetailResponse,
    StorefrontOrderListItem,
    StorefrontOrderListResponse,
} from "@/modules/account/types/account";

export async function getMyStorefrontOrders(
    accessToken: string
): Promise<StorefrontOrderListItem[]> {
    const response = await api.get<StorefrontOrderListResponse>(
        `/storefront/orders/my`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );

    return response.data.data;
}

export async function getMyStorefrontOrderById(
    orderId: string,
    accessToken: string
): Promise<StorefrontOrderDetail> {
    const response = await api.get<StorefrontOrderDetailResponse>(
        `/storefront/orders/my/${orderId}`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );

    return response.data.data;
}