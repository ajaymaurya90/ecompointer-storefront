import { api } from "@/lib/http";

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
) {
    const response = await api.get(
        `/storefront/products/brand-owner/${brandOwnerId}/${productId}`
    );

    return response.data;
}