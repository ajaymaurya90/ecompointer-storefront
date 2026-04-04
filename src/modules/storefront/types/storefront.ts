/**
 * ---------------------------------------------------------
 * STOREFRONT TYPES
 * ---------------------------------------------------------
 * Purpose:
 * Type definitions for storefront bootstrap, public branding,
 * and active theme data returned by backend bootstrap API.
 * ---------------------------------------------------------
 */

export interface StorefrontDomain {
    id: string;
    hostName: string;
    isPrimary: boolean;
    isVerified: boolean;
}

export interface StorefrontBrandOwner {
    id: string;
    businessName: string;
}

export interface StorefrontSettings {
    storefrontName: string;
    tagline?: string | null;
    shortDescription?: string | null;
    aboutDescription?: string | null;
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
    domain: StorefrontDomain;
    brandOwner: StorefrontBrandOwner;
    storefront: StorefrontSettings;
    theme: StorefrontTheme;
}