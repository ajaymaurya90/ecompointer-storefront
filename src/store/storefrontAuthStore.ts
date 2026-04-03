"use client";

/**
 * ---------------------------------------------------------
 * STOREFRONT AUTH STORE
 * ---------------------------------------------------------
 * Purpose:
 * Keeps storefront customer auth state in one place and
 * restores current customer profile using the saved token.
 * ---------------------------------------------------------
 */

import { create } from "zustand";
import { getStorefrontAccessToken, removeStorefrontAccessToken, setStorefrontAccessToken } from "@/lib/storage";
import { getStorefrontMe } from "@/modules/auth/api/authApi";
import type { StorefrontCustomerProfile } from "@/modules/auth/types/auth";

type StorefrontAuthStore = {
    accessToken: string | null;
    customer: StorefrontCustomerProfile | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    setSession: (token: string, customer: StorefrontCustomerProfile) => void;
    clearSession: () => void;
    restoreSession: () => Promise<void>;
};

export const useStorefrontAuthStore = create<StorefrontAuthStore>((set) => ({
    accessToken: null,
    customer: null,
    isLoading: false,
    isAuthenticated: false,

    // Save access token and authenticated customer in store + browser storage.
    setSession: (token, customer) => {
        setStorefrontAccessToken(token);

        set({
            accessToken: token,
            customer,
            isAuthenticated: true,
        });
    },

    // Fully clear storefront customer session from memory and storage.
    clearSession: () => {
        removeStorefrontAccessToken();

        set({
            accessToken: null,
            customer: null,
            isAuthenticated: false,
            isLoading: false,
        });
    },

    // Rebuild storefront customer session on page refresh using stored token.
    restoreSession: async () => {
        const token = getStorefrontAccessToken();

        if (!token) {
            set({
                accessToken: null,
                customer: null,
                isAuthenticated: false,
                isLoading: false,
            });
            return;
        }

        try {
            set({ isLoading: true });

            const customer = await getStorefrontMe(token);

            set({
                accessToken: token,
                customer,
                isAuthenticated: true,
                isLoading: false,
            });
        } catch {
            removeStorefrontAccessToken();

            set({
                accessToken: null,
                customer: null,
                isAuthenticated: false,
                isLoading: false,
            });
        }
    },
}));