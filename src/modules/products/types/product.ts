/**
 * ---------------------------------------------------------
 * STOREFRONT PRODUCT TYPES
 * ---------------------------------------------------------
 * Purpose:
 * Type definitions for storefront product listing and
 * product detail pages.
 * ---------------------------------------------------------
 */

export interface StorefrontProductBrand {
    id: string;
    name: string;
}

export interface StorefrontProductCategory {
    id: string;
    name: string;
}

export interface StorefrontProductPriceRange {
    min: number;
    max: number;
    currencyCode: string;
}

export interface StorefrontProductListItem {
    id: string;
    name: string;
    productCode: string;
    description?: string | null;
    brandOwnerId: string;
    brand: StorefrontProductBrand;
    category: StorefrontProductCategory;
    image?: string | null;
    imageAlt?: string | null;
    price: StorefrontProductPriceRange;
    totalStock: number;
    hasMultipleVariants: boolean;
    variantCount: number;
}

export interface StorefrontProductListResponse {
    message: string;
    data: StorefrontProductListItem[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

export interface StorefrontProductMedia {
    id: string;
    url: string;
    altText?: string | null;
    type: string;
    isPrimary: boolean;
    sortOrder: number;
}

export interface StorefrontProductVariantAttribute {
    attributeId: string;
    attributeName: string;
    attributeValueId: string;
    attributeValue: string;
}

export interface StorefrontProductVariant {
    id: string;
    sku: string;
    name?: string | null;
    description?: string | null;
    variantLabel?: string | null;
    size?: string | null;
    color?: string | null;
    isStandalone?: boolean;
    taxRate: number;
    retailGross: number;
    stock: number;
    inStock: boolean;
    mediaSource?: "product" | "variant" | "product-fallback";
    media: StorefrontProductMedia[];
    attributes: StorefrontProductVariantAttribute[];
}

export interface StorefrontProductDetail {
    id: string;
    name: string;
    productCode: string;
    description?: string | null;
    brandOwnerId: string;
    brand: StorefrontProductBrand;
    category: StorefrontProductCategory;
    media: StorefrontProductMedia[];
    variants: StorefrontProductVariant[];
    price: StorefrontProductPriceRange;
}

export interface StorefrontProductDetailResponse {
    message: string;
    data: StorefrontProductDetail;
}

export interface StorefrontProductQueryParams {
    search?: string;
    categoryId?: string;
    page?: number;
    limit?: number;
}
