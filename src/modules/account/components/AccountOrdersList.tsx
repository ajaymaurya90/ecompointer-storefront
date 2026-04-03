"use client";

/**
 * ---------------------------------------------------------
 * ACCOUNT ORDERS LIST
 * ---------------------------------------------------------
 * Purpose:
 * Displays authenticated customer order history.
 * ---------------------------------------------------------
 */

import Link from "next/link";
import type { StorefrontOrderListItem } from "@/modules/account/types/account";

type Props = {
    orders: StorefrontOrderListItem[];
};

export default function AccountOrdersList({ orders }: Props) {
    if (!orders.length) {
        return (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
                <h3 className="text-lg font-semibold text-slate-900">
                    No orders found
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                    Your placed orders will appear here once checkout is completed.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {orders.map((order) => (
                <div
                    key={order.id}
                    className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                        <div>
                            <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                Order Number
                            </div>
                            <h3 className="mt-1 text-xl font-semibold text-slate-900">
                                {order.orderNumber}
                            </h3>
                            <div className="mt-2 text-sm text-slate-500">
                                {new Date(order.createdAt).toLocaleString()}
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                                {order.status}
                            </span>
                            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                                {order.paymentStatus}
                            </span>
                        </div>
                    </div>

                    <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div className="rounded-2xl bg-slate-50 p-4">
                            <div className="text-xs text-slate-500">Items</div>
                            <div className="mt-1 text-lg font-semibold text-slate-900">
                                {order.itemCount}
                            </div>
                        </div>

                        <div className="rounded-2xl bg-slate-50 p-4">
                            <div className="text-xs text-slate-500">Total Paid</div>
                            <div className="mt-1 text-lg font-semibold text-slate-900">
                                ₹{Number(order.totalPaid).toFixed(2)}
                            </div>
                        </div>

                        <div className="rounded-2xl bg-slate-50 p-4">
                            <div className="text-xs text-slate-500">Grand Total</div>
                            <div className="mt-1 text-lg font-semibold text-slate-900">
                                ₹{Number(order.totalAmount).toFixed(2)}
                            </div>
                        </div>
                    </div>

                    <div className="mt-5">
                        <Link
                            href={`/account/orders/${order.id}`}
                            className="inline-flex rounded-2xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                        >
                            View Order
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
}