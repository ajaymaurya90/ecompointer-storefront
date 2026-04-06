import { api } from "@/lib/http";
import type { StorefrontCategoriesResponse } from "@/modules/categories/types/category";

/**
 * ---------------------------------------------------------
 * STOREFRONT CATEGORY API
 * ---------------------------------------------------------
 * Purpose:
 * Loads public storefront categories for the active
 * Brand Owner storefront.
 * ---------------------------------------------------------
 */
export async function getStorefrontCategories(
    brandOwnerId: string
): Promise<StorefrontCategoriesResponse> {
    const response = await api.get(
        `/storefront/categories/brand-owner/${brandOwnerId}`
    );

    return response.data;
}