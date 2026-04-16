import { api } from "@/lib/http";
import type { StorefrontProductDetail } from "@/modules/products/types/product";

/**
 * ---------------------------------------------------------
 * STOREFRONT PRODUCT API
 * ---------------------------------------------------------
 * Purpose:
 * Loads storefront products for listing and filtering.
 * ---------------------------------------------------------
 */
export async function getStorefrontProducts(
    brandOwnerId: string,
    params?: {
        search?: string;
        page?: number;
        limit?: number;
        categoryId?: string | null;
    }
) {
    const response = await api.get(
        `/storefront/products/brand-owner/${brandOwnerId}`,
        {
            params: {
                ...params,
                categoryId: params?.categoryId || undefined,
            },
        }
    );

    return response.data;
}

export async function getStorefrontProductById(
    brandOwnerId: string,
    productId: string
): Promise<StorefrontProductDetail> {
    const response = await api.get(
        `/storefront/products/brand-owner/${brandOwnerId}/${productId}`
    );

    return response.data?.data ?? response.data;
}
