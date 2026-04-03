/**
 * ---------------------------------------------------------
 * STOREFRONT PRODUCT API
 * ---------------------------------------------------------
 * Purpose:
 * API client for storefront product list and detail endpoints.
 * ---------------------------------------------------------
 */

import { api } from "@/lib/http";
import type {
    StorefrontProductDetail,
    StorefrontProductDetailResponse,
    StorefrontProductListResponse,
    StorefrontProductQueryParams,
} from "@/modules/products/types/product";

function cleanParams<T extends object>(params: T) {
    return Object.fromEntries(
        Object.entries(params).filter(
            ([, value]) => value !== "" && value !== undefined && value !== null
        )
    );
}

export async function getStorefrontProducts(
    brandOwnerId: string,
    params: StorefrontProductQueryParams = {}
): Promise<StorefrontProductListResponse> {
    const response = await api.get(`/storefront/products/brand-owner/${brandOwnerId}`, {
        params: cleanParams(params),
    });

    return response.data;
}

export async function getStorefrontProductById(
    brandOwnerId: string,
    productId: string
): Promise<StorefrontProductDetail> {
    const response = await api.get<StorefrontProductDetailResponse>(
        `/storefront/products/brand-owner/${brandOwnerId}/${productId}`
    );

    return response.data.data;
}