"use client";

/**
 * ---------------------------------------------------------
 * CART PAGE
 * ---------------------------------------------------------
 * Purpose:
 * Renders the storefront cart page using persisted cart state.
 * ---------------------------------------------------------
 */

import { useMemo } from "react";
import StorefrontShell from "@/modules/storefront/components/StorefrontShell";
import CartEmptyState from "@/modules/cart/components/CartEmptyState";
import CartTable from "@/modules/cart/components/CartTable";
import CartSummaryCard from "@/modules/cart/components/CartSummaryCard";
import { useCartStore } from "@/modules/cart/store/cartStore";

export default function CartPage() {
    const items = useCartStore((state) => state.items);
    const updateQuantity = useCartStore((state) => state.updateQuantity);
    const removeItem = useCartStore((state) => state.removeItem);
    const clearCart = useCartStore((state) => state.clearCart);

    // Compute cart summary from current cart items to avoid unstable store snapshots.
    const summary = useMemo(() => {
        const itemCount = items.length;

        const totalQuantity = items.reduce(
            (sum, item) => sum + item.quantity,
            0
        );

        const subtotal = items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );

        const taxAmount = items.reduce(
            (sum, item) =>
                sum + ((item.price * item.quantity) * item.taxRate) / 100,
            0
        );

        const grandTotal = subtotal + taxAmount;

        return {
            itemCount,
            totalQuantity,
            subtotal,
            taxAmount,
            grandTotal,
        };
    }, [items]);

    return (
        <StorefrontShell>
            <section className="border-b border-slate-200 bg-white">
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                            Shopping Cart
                        </div>
                        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">
                            Review your cart
                        </h1>
                        <p className="mt-4 text-base leading-7 text-slate-600">
                            Update quantities, remove products, and continue to
                            checkout when you are ready.
                        </p>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {items.length === 0 ? (
                    <CartEmptyState />
                ) : (
                    <div className="grid grid-cols-1 gap-8 xl:grid-cols-12">
                        <div className="xl:col-span-8">
                            <CartTable
                                items={items}
                                onQuantityChange={updateQuantity}
                                onRemove={removeItem}
                            />
                        </div>

                        <div className="xl:col-span-4">
                            <CartSummaryCard
                                summary={summary}
                                onClearCart={clearCart}
                            />
                        </div>
                    </div>
                )}
            </section>
        </StorefrontShell>
    );
}