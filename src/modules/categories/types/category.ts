/**
 * ---------------------------------------------------------
 * STOREFRONT CATEGORY TYPES
 * ---------------------------------------------------------
 * Purpose:
 * Type definitions for storefront category navigation and
 * category detail pages.
 * ---------------------------------------------------------
 */

export interface StorefrontCategoryChild {
    id: string;
    name: string;
    description?: string | null;
    position: number;
    productCount: number;
}

export interface StorefrontCategoryListItem {
    id: string;
    name: string;
    description?: string | null;
    position: number;
    productCount: number;
    children: StorefrontCategoryChild[];
}

export interface StorefrontCategoryListResponse {
    message: string;
    data: StorefrontCategoryListItem[];
}

export interface StorefrontCategoryDetail {
    id: string;
    name: string;
    description?: string | null;
    position: number;
    productCount: number;
    parent?: {
        id: string;
        name: string;
    } | null;
    children: StorefrontCategoryChild[];
}

export interface StorefrontCategoryDetailResponse {
    message: string;
    data: StorefrontCategoryDetail;
}