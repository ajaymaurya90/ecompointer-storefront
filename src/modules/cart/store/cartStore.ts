"use client";

/**
 * ---------------------------------------------------------
 * CART STORE
 * ---------------------------------------------------------
 * Purpose:
 * Manages storefront cart state including add, update,
 * remove, and clear actions.
 *
 * Notes:
 * - Cart totals are now derived inside UI components with useMemo
 * - getSummary() has been removed to avoid unstable store snapshots
 * ---------------------------------------------------------
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/modules/cart/types/cart";

type AddCartItemInput = Omit<CartItem, "quantity"> & {
    quantity?: number;
};

type CartStore = {
    items: CartItem[];
    addItem: (item: AddCartItemInput) => void;
    removeItem: (productVariantId: string) => void;
    updateQuantity: (productVariantId: string, quantity: number) => void;
    clearCart: () => void;
};

export const useCartStore = create<CartStore>()(
    persist(
        (set) => ({
            items: [],

            // Add a new cart item or increase quantity if the same variant already exists.
            addItem: (item) => {
                set((state) => {
                    const existingItem = state.items.find(
                        (entry) => entry.productVariantId === item.productVariantId
                    );

                    // Increase existing variant quantity while respecting max stock.
                    if (existingItem) {
                        return {
                            items: state.items.map((entry) => {
                                if (entry.productVariantId !== item.productVariantId) {
                                    return entry;
                                }

                                const nextQty = Math.min(
                                    entry.quantity + (item.quantity || 1),
                                    entry.stock
                                );

                                return {
                                    ...entry,
                                    quantity: Math.max(1, nextQty),
                                };
                            }),
                        };
                    }

                    // Append new variant as a fresh cart line item.
                    return {
                        items: [
                            ...state.items,
                            {
                                ...item,
                                quantity: Math.max(
                                    1,
                                    Math.min(item.quantity || 1, item.stock)
                                ),
                            },
                        ],
                    };
                });
            },

            // Remove one cart line item by variant id.
            removeItem: (productVariantId) => {
                set((state) => ({
                    items: state.items.filter(
                        (item) => item.productVariantId !== productVariantId
                    ),
                }));
            },

            // Update one cart line quantity while keeping quantity inside safe bounds.
            updateQuantity: (productVariantId, quantity) => {
                set((state) => ({
                    items: state.items.map((item) => {
                        if (item.productVariantId !== productVariantId) {
                            return item;
                        }

                        const safeQty = Math.max(1, Math.min(quantity, item.stock));

                        return {
                            ...item,
                            quantity: safeQty,
                        };
                    }),
                }));
            },

            // Clear full storefront cart after successful checkout or manual reset.
            clearCart: () => {
                set({ items: [] });
            },
        }),
        {
            name: "storefront-cart",
        }
    )
);