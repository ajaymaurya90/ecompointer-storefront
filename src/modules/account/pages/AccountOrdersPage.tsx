"use client";

/**
 * ---------------------------------------------------------
 * ACCOUNT ORDERS PAGE
 * ---------------------------------------------------------
 * Purpose:
 * Loads and displays authenticated customer order history.
 * ---------------------------------------------------------
 */

import { useEffect, useState } from "react";
import StorefrontShell from "@/modules/storefront/components/StorefrontShell";
import AccountAuthRequired from "@/modules/account/components/AccountAuthRequired";
import AccountOrdersList from "@/modules/account/components/AccountOrdersList";
import { useStorefrontAuthStore } from "@/store/storefrontAuthStore";
import { getMyStorefrontOrders } from "@/modules/account/api/accountApi";
import type { StorefrontOrderListItem } from "@/modules/account/types/account";

export default function AccountOrdersPage() {
    const restoreSession = useStorefrontAuthStore((state) => state.restoreSession);
    const accessToken = useStorefrontAuthStore((state) => state.accessToken);
    const isAuthenticated = useStorefrontAuthStore((state) => state.isAuthenticated);
    const authLoading = useStorefrontAuthStore((state) => state.isLoading);

    const [orders, setOrders] = useState<StorefrontOrderListItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Restore customer session on first account page load.
    useEffect(() => {
        void restoreSession();
    }, [restoreSession]);

    // Load authenticated customer order history.
    useEffect(() => {
        async function loadOrders() {
            if (!accessToken) {
                setIsLoading(false);
                return;
            }

            try {
                setIsLoading(true);
                setError(null);

                const data = await getMyStorefrontOrders(accessToken);
                setOrders(data);
            } catch (err: any) {
                setError(
                    err?.response?.data?.message ||
                    err?.message ||
                    "Failed to load orders"
                );
            } finally {
                setIsLoading(false);
            }
        }

        if (isAuthenticated && accessToken) {
            void loadOrders();
        } else if (!authLoading) {
            setIsLoading(false);
        }
    }, [accessToken, isAuthenticated, authLoading]);

    return (
        <StorefrontShell>
            <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                        My Account
                    </div>
                    <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">
                        My Orders
                    </h1>
                    <p className="mt-4 text-base leading-7 text-slate-600">
                        Review your placed orders and check their current status.
                    </p>
                </div>

                {authLoading || isLoading ? (
                    <div className="rounded-3xl border border-slate-200 bg-white p-8 text-sm text-slate-500">
                        Loading orders...
                    </div>
                ) : !isAuthenticated ? (
                    <AccountAuthRequired />
                ) : error ? (
                    <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                        {error}
                    </div>
                ) : (
                    <AccountOrdersList orders={orders} />
                )}
            </section>
        </StorefrontShell>
    );
}