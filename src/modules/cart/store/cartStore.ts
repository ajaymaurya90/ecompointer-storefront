"use client";

/**
 * ---------------------------------------------------------
 * TENANT-AWARE CART STORE
 * ---------------------------------------------------------
 * Purpose:
 * Manages storefront cart state in memory while tenant-
 * specific persistence is handled externally using BO id.
 *
 * Notes:
 * - Cart is isolated per tenant/storefront
 * - Persistence is no longer done with Zustand persist()
 * - Cart totals should be derived in UI components via useMemo
 * ---------------------------------------------------------
 */

import { create } from "zustand";
import type { CartItem } from "@/modules/cart/types/cart";

type AddCartItemInput = Omit<CartItem, "quantity"> & {
    quantity?: number;
};

type CartStore = {
    items: CartItem[];
    setItems: (items: CartItem[]) => void;
    addItem: (item: AddCartItemInput) => void;
    removeItem: (productVariantId: string) => void;
    updateQuantity: (productVariantId: string, quantity: number) => void;
    clearCart: () => void;
};

export const useCartStore = create<CartStore>((set) => ({
    items: [],

    // Replace full cart state when loading tenant-specific cart from storage.
    setItems: (items) => {
        set({ items });
    },

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

    // Clear current in-memory storefront cart.
    clearCart: () => {
        set({ items: [] });
    },
}));