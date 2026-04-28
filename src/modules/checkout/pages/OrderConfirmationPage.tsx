"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import StorefrontShell from "@/modules/storefront/components/StorefrontShell";
import { getStorefrontOrderStatus } from "@/modules/checkout/api/checkoutApi";
import { retryStorefrontPaymentSession } from "@/modules/checkout/api/paymentApi";
import { openRazorpayCheckout } from "@/modules/checkout/lib/razorpayCheckout";
import type { StorefrontOrderStatus } from "@/modules/checkout/types/checkout";
import { useStorefrontBootstrapContext } from "@/providers/StorefrontBootstrapProvider";

const maxPollAttempts = 12;
const pollDelayMs = 4000;

export default function OrderConfirmationPage() {
    const searchParams = useSearchParams();
    const { bootstrap } = useStorefrontBootstrapContext();
    const brandOwnerId = bootstrap?.brandOwner?.id ?? null;
    const orderId = searchParams.get("orderId");
    const orderAccessToken = searchParams.get("token");
    const initialStatus = searchParams.get("status");

    const [status, setStatus] = useState<StorefrontOrderStatus | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [pollAttempts, setPollAttempts] = useState(0);
    const [isRetrying, setIsRetrying] = useState(false);
    const [retryMessage, setRetryMessage] = useState<string | null>(null);

    const shouldPoll = useMemo(() => {
        if (!status) return initialStatus === "processing";
        if (status.paymentStatus === "PAID") return false;
        return (
            status.latestPaymentTransactionStatus === "PENDING" ||
            status.latestPaymentTransactionStatus === "CREATED"
        );
    }, [initialStatus, status]);

    useEffect(() => {
        setStatus(null);
        setPollAttempts(0);
    }, [brandOwnerId, orderId, orderAccessToken]);

    useEffect(() => {
        let isCancelled = false;

        async function loadStatus() {
            if (!brandOwnerId || !orderId || !orderAccessToken) {
                setIsLoading(false);
                setError("Order confirmation details are missing.");
                return;
            }

            try {
                setIsLoading(true);
                const nextStatus = await getStorefrontOrderStatus(
                    brandOwnerId,
                    orderId,
                    orderAccessToken,
                );

                if (!isCancelled) {
                    setStatus(nextStatus);
                    setError(null);
                }
            } catch (err: any) {
                if (!isCancelled) {
                    setError(
                        err?.response?.data?.message ||
                            err?.message ||
                            "Could not load payment status.",
                    );
                }
            } finally {
                if (!isCancelled) setIsLoading(false);
            }
        }

        void loadStatus();

        return () => {
            isCancelled = true;
        };
    }, [brandOwnerId, orderId, orderAccessToken]);

    useEffect(() => {
        if (!shouldPoll || pollAttempts >= maxPollAttempts) return;

        const timer = window.setTimeout(async () => {
            if (!brandOwnerId || !orderId || !orderAccessToken) return;

            try {
                const nextStatus = await getStorefrontOrderStatus(
                    brandOwnerId,
                    orderId,
                    orderAccessToken,
                );
                setStatus(nextStatus);
                setError(null);
            } catch (err: any) {
                setError(
                    err?.response?.data?.message ||
                        err?.message ||
                        "Could not refresh payment status.",
                );
            } finally {
                setPollAttempts((value) => value + 1);
            }
        }, pollDelayMs);

        return () => window.clearTimeout(timer);
    }, [brandOwnerId, orderAccessToken, orderId, pollAttempts, shouldPoll]);

    const isCodOrder = status?.selectedPaymentMethod === "CASH_ON_DELIVERY";
    const display = getDisplayState(status, initialStatus, shouldPoll);

    async function refreshStatus() {
        if (!brandOwnerId || !orderId || !orderAccessToken) return;

        const nextStatus = await getStorefrontOrderStatus(
            brandOwnerId,
            orderId,
            orderAccessToken,
        );
        setStatus(nextStatus);
        setError(null);
    }

    async function handleRetryPayment() {
        if (!brandOwnerId || !orderId || !orderAccessToken) {
            setError("Order confirmation details are missing.");
            return;
        }

        try {
            setIsRetrying(true);
            setError(null);
            setRetryMessage("Preparing a new secure payment attempt...");

            const session = await retryStorefrontPaymentSession(brandOwnerId, {
                orderId,
                orderAccessToken,
            });

            setPollAttempts(0);
            setStatus((current) =>
                current
                    ? {
                        ...current,
                        latestPaymentTransactionId: session.transactionId,
                        latestPaymentTransactionStatus: session.status,
                        canRetryPayment: false,
                    }
                    : current,
            );

            if (session.gatewayCode === "MOCK") {
                setRetryMessage(
                    `MOCK payment session created. Complete it locally with transaction ${session.transactionId}.`,
                );
                return;
            }

            await openRazorpayCheckout({
                session,
                storeName:
                    bootstrap?.storefront?.storefrontName ||
                    bootstrap?.brandOwner?.businessName,
                customerName: "",
                customerEmail: "",
                themeColor: bootstrap?.storefront?.primaryColor,
                onSuccess: () => {
                    setRetryMessage(
                        "Payment submitted. We are confirming it securely.",
                    );
                    void refreshStatus();
                },
                onDismiss: () => {
                    setRetryMessage(
                        "Payment window closed. Your order is still awaiting payment.",
                    );
                    void refreshStatus();
                },
            });
        } catch (err: any) {
            setError(
                err?.response?.data?.message ||
                    err?.message ||
                    "Could not retry payment.",
            );
        } finally {
            setIsRetrying(false);
        }
    }

    return (
        <StorefrontShell>
            <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                    <div
                        className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full text-lg font-bold text-white ${display.badgeClass}`}
                    >
                        {display.symbol}
                    </div>
                    <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900">
                        {display.title}
                    </h1>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                        {display.description}
                    </p>

                    {isLoading ? (
                        <div className="mt-5 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                            Loading current order status...
                        </div>
                    ) : null}

                    {error ? (
                        <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                            {error}
                        </div>
                    ) : null}

                    {status ? (
                        <div className="mt-5 space-y-2 rounded-2xl bg-slate-50 px-4 py-4 text-left text-sm text-slate-600">
                            <div>
                                Order:{" "}
                                <span className="font-semibold text-slate-900">
                                    {status.orderNumber}
                                </span>
                            </div>
                            <div>
                                Order Status:{" "}
                                <span className="font-semibold text-slate-900">
                                    {status.orderStatus}
                                </span>
                            </div>
                            <div>
                                Payment Method:{" "}
                                <span className="font-semibold text-slate-900">
                                    {formatPaymentMethod(status.selectedPaymentMethod)}
                                </span>
                            </div>
                            <div>
                                Payment Status:{" "}
                                <span className="font-semibold text-slate-900">
                                    {status.paymentStatus}
                                </span>
                            </div>
                            {status.latestPaymentTransactionStatus ? (
                                <div>
                                    Gateway Status:{" "}
                                    <span className="font-semibold text-slate-900">
                                        {status.latestPaymentTransactionStatus}
                                    </span>
                                </div>
                            ) : null}
                        </div>
                    ) : orderId ? (
                        <div className="mt-5 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                            Order ID:{" "}
                            <span className="font-semibold text-slate-900">{orderId}</span>
                        </div>
                    ) : null}

                    {shouldPoll && pollAttempts < maxPollAttempts ? (
                        <div className="mt-4 text-xs font-medium text-indigo-700">
                            Checking payment confirmation...
                        </div>
                    ) : null}

                    {retryMessage ? (
                        <div className="mt-5 rounded-2xl border border-indigo-200 bg-indigo-50 px-4 py-3 text-sm text-indigo-800">
                            {retryMessage}
                        </div>
                    ) : null}

                    {status?.canRetryPayment && !isCodOrder ? (
                        <button
                            type="button"
                            onClick={handleRetryPayment}
                            disabled={isRetrying}
                            className="mt-6 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {isRetrying ? "Preparing Payment..." : "Retry Payment"}
                        </button>
                    ) : null}

                    <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                        <Link
                            href="/products"
                            className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:opacity-90"
                        >
                            Continue Shopping
                        </Link>
                        <Link
                            href="/account/orders"
                            className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                        >
                            View Orders
                        </Link>
                    </div>
                </div>
            </section>
        </StorefrontShell>
    );
}

function getDisplayState(
    status: StorefrontOrderStatus | null,
    initialStatus: string | null,
    shouldPoll: boolean,
) {
    if (status?.paymentStatus === "PAID") {
        return {
            title: "Payment successful",
            description: "Your payment has been confirmed securely.",
            symbol: "✓",
            badgeClass: "bg-emerald-600",
        };
    }

    if (status?.selectedPaymentMethod === "CASH_ON_DELIVERY") {
        return {
            title: "Order placed",
            description: "Payment will be collected on delivery.",
            symbol: "✓",
            badgeClass: "bg-slate-900",
        };
    }

    if (
        status?.latestPaymentTransactionStatus === "FAILED" ||
        status?.latestPaymentTransactionStatus === "CANCELLED"
    ) {
        return {
            title: "Payment failed",
            description: "Your order is placed, but the latest payment attempt did not complete.",
            symbol: "!",
            badgeClass: "bg-red-600",
        };
    }

    if (
        shouldPoll ||
        status?.latestPaymentTransactionStatus === "PENDING" ||
        status?.latestPaymentTransactionStatus === "CREATED" ||
        initialStatus === "processing"
    ) {
        return {
            title: "Payment confirming",
            description: "We are waiting for secure gateway confirmation. This page will update automatically.",
            symbol: "...",
            badgeClass: "bg-indigo-600",
        };
    }

    return {
        title: "Order placed",
        description: "Your order is placed. Payment is currently unpaid or pending.",
        symbol: "✓",
        badgeClass: "bg-slate-900",
    };
}

function formatPaymentMethod(method?: string | null) {
    if (method === "CASH_ON_DELIVERY") return "Cash on Delivery";
    if (method === "ONLINE") return "Pay Online";
    return "-";
}
