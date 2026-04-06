/**
 * ---------------------------------------------------------
 * STOREFRONT CATEGORY TYPES
 * ---------------------------------------------------------
 * Purpose:
 * Shared storefront category response types used by
 * category navigation and filtering UI.
 * ---------------------------------------------------------
 */

export type StorefrontCategoryChild = {
    id: string;
    name: string;
    description?: string | null;
    position: number;
    productCount: number;
};

export type StorefrontCategoryItem = {
    id: string;
    name: string;
    description?: string | null;
    position: number;
    productCount: number;
    children: StorefrontCategoryChild[];
};

export type StorefrontCategoriesResponse = {
    message: string;
    data: StorefrontCategoryItem[];
};