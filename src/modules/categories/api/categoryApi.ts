/**
 * ---------------------------------------------------------
 * STOREFRONT CATEGORY API
 * ---------------------------------------------------------
 * Purpose:
 * API client for storefront categories and category detail.
 * ---------------------------------------------------------
 */

import { api } from "@/lib/http";
import type {
    StorefrontCategoryDetail,
    StorefrontCategoryDetailResponse,
    StorefrontCategoryListItem,
    StorefrontCategoryListResponse,
} from "@/modules/categories/types/category";

export async function getStorefrontCategories(
    brandOwnerId: string
): Promise<StorefrontCategoryListItem[]> {
    const response = await api.get<StorefrontCategoryListResponse>(
        `/storefront/categories/brand-owner/${brandOwnerId}`
    );

    return response.data.data;
}

export async function getStorefrontCategoryById(
    brandOwnerId: string,
    categoryId: string
): Promise<StorefrontCategoryDetail> {
    const response = await api.get<StorefrontCategoryDetailResponse>(
        `/storefront/categories/brand-owner/${brandOwnerId}/${categoryId}`
    );

    return response.data.data;
}