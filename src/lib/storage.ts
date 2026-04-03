/**
 * ---------------------------------------------------------
 * STOREFRONT TOKEN STORAGE
 * ---------------------------------------------------------
 * Purpose:
 * Small helper to manage storefront customer access token
 * in browser storage.
 * ---------------------------------------------------------
 */

const STOREFRONT_ACCESS_TOKEN_KEY = "storefront_access_token";

export function getStorefrontAccessToken(): string | null {
    if (typeof window === "undefined") {
        return null;
    }

    return localStorage.getItem(STOREFRONT_ACCESS_TOKEN_KEY);
}

export function setStorefrontAccessToken(token: string) {
    if (typeof window === "undefined") {
        return;
    }

    localStorage.setItem(STOREFRONT_ACCESS_TOKEN_KEY, token);
}

export function removeStorefrontAccessToken() {
    if (typeof window === "undefined") {
        return;
    }

    localStorage.removeItem(STOREFRONT_ACCESS_TOKEN_KEY);
}