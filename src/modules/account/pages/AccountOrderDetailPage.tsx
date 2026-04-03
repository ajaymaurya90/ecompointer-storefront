"use client";

/**
 * ---------------------------------------------------------
 * ACCOUNT ORDER DETAIL PAGE
 * ---------------------------------------------------------
 * Purpose:
 * Loads and displays one authenticated customer order detail.
 * ---------------------------------------------------------
 */

import { useEffect, useState } from "react";
import StorefrontShell from "@/modules/storefront/components/StorefrontShell";
import AccountAuthRequired from "@/modules/account/components/AccountAuthRequired";
import AccountOrderDetailCard from "@/modules/account/components/AccountOrderDetailCard";
import { useStorefrontAuthStore } from "@/store/storefrontAuthStore";
import { getMyStorefrontOrderById } from "@/modules/account/api/accountApi";
import type { StorefrontOrderDetail } from "@/modules/account/types/account";

type Props = {
    orderId: string;
};

export default function AccountOrderDetailPage({ orderId }: Props) {
    const restoreSession = useStorefrontAuthStore((state) => state.restoreSession);
    const accessToken = useStorefrontAuthStore((state) => state.accessToken);
    const isAuthenticated = useStorefrontAuthStore((state) => state.isAuthenticated);
    const authLoading = useStorefrontAuthStore((state) => state.isLoading);

    const [order, setOrder] = useState<StorefrontOrderDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Restore customer session before protected order detail call.
    useEffect(() => {
        void restoreSession();
    }, [restoreSession]);

    // Load selected authenticated customer order detail.
    useEffect(() => {
        async function loadOrder() {
            if (!accessToken) {
                setIsLoading(false);
                return;
            }

            try {
                setIsLoading(true);
                setError(null);

                const data = await getMyStorefrontOrderById(orderId, accessToken);
                setOrder(data);
            } catch (err: any) {
                setError(
                    err?.response?.data?.message ||
                    err?.message ||
                    "Failed to load order detail"
                );
            } finally {
                setIsLoading(false);
            }
        }

        if (isAuthenticated && accessToken) {
            void loadOrder();
        } else if (!authLoading) {
            setIsLoading(false);
        }
    }, [orderId, accessToken, isAuthenticated, authLoading]);

    return (
        <StorefrontShell>
            <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                {authLoading || isLoading ? (
                    <div className="rounded-3xl border border-slate-200 bg-white p-8 text-sm text-slate-500">
                        Loading order detail...
                    </div>
                ) : !isAuthenticated ? (
                    <AccountAuthRequired />
                ) : error ? (
                    <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                        {error}
                    </div>
                ) : order ? (
                    <AccountOrderDetailCard order={order} />
                ) : (
                    <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
                        <h3 className="text-lg font-semibold text-slate-900">
                            Order not found
                        </h3>
                        <p className="mt-2 text-sm text-slate-500">
                            The requested order detail could not be loaded.
                        </p>
                    </div>
                )}
            </section>
        </StorefrontShell>
    );
}