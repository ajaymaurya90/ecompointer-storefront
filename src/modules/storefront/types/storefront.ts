/**
 * ---------------------------------------------------------
 * STOREFRONT TYPES
 * ---------------------------------------------------------
 * Purpose:
 * Type definitions for storefront bootstrap and theme data.
 * ---------------------------------------------------------
 */

export interface StorefrontBrandOwner {
    id: string;
    businessName: string;
}

export interface StorefrontSettings {
    storefrontName: string;
    logoUrl?: string | null;
    faviconUrl?: string | null;
    supportEmail?: string | null;
    supportPhone?: string | null;
    isStorefrontEnabled: boolean;
    isGuestCheckoutEnabled: boolean;
    isCustomerRegistrationEnabled: boolean;
    primaryColor?: string | null;
    secondaryColor?: string | null;
    currencyCode: string;
    seoTitle?: string | null;
    seoDescription?: string | null;
}

export interface StorefrontTheme {
    activeThemeCode: string;
    isThemeActive: boolean;
    themeConfigJson?: Record<string, unknown> | null;
}

export interface StorefrontBootstrapResponse {
    brandOwner: StorefrontBrandOwner;
    storefront: StorefrontSettings;
    theme: StorefrontTheme;
}