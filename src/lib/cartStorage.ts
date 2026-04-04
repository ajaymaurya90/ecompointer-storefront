/**
 * ---------------------------------------------------------
 * TENANT CART STORAGE HELPERS
 * ---------------------------------------------------------
 * Purpose:
 * Stores and retrieves storefront cart data using a tenant-
 * specific localStorage key so carts stay isolated per BO.
 * ---------------------------------------------------------
 */

import type { CartItem } from "@/modules/cart/types/cart";

function getTenantCartStorageKey(brandOwnerId: string) {
    return `storefront-cart-${brandOwnerId}`;
}

/**
 * Safely load tenant cart items from localStorage.
 */
export function loadTenantCartItems(brandOwnerId: string): CartItem[] {
    if (typeof window === "undefined") {
        return [];
    }

    try {
        const raw = localStorage.getItem(getTenantCartStorageKey(brandOwnerId));

        if (!raw) {
            return [];
        }

        const parsed = JSON.parse(raw);

        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

/**
 * Safely save tenant cart items to localStorage.
 */
export function saveTenantCartItems(
    brandOwnerId: string,
    items: CartItem[]
) {
    if (typeof window === "undefined") {
        return;
    }

    try {
        localStorage.setItem(
            getTenantCartStorageKey(brandOwnerId),
            JSON.stringify(items)
        );
    } catch {
        // Ignore storage write failures safely.
    }
}

/**
 * Remove one tenant cart from localStorage.
 */
export function clearTenantCartItems(brandOwnerId: string) {
    if (typeof window === "undefined") {
        return;
    }

    try {
        localStorage.removeItem(getTenantCartStorageKey(brandOwnerId));
    } catch {
        // Ignore storage remove failures safely.
    }
}