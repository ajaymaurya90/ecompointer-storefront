"use client";

/**
 * ---------------------------------------------------------
 * ACCOUNT ORDER DETAIL CARD
 * ---------------------------------------------------------
 * Purpose:
 * Displays one authenticated customer order detail.
 * ---------------------------------------------------------
 */

import type { StorefrontOrderDetail } from "@/modules/account/types/account";

type Props = {
    order: StorefrontOrderDetail;
};

export default function AccountOrderDetailCard({ order }: Props) {
    return (
        <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                        <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                            Order Detail
                        </div>
                        <h1 className="mt-2 text-3xl font-bold text-slate-900">
                            {order.orderNumber}
                        </h1>
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
            </div>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-slate-900">
                        Billing Address
                    </h2>
                    <div className="mt-4 space-y-2 text-sm text-slate-600">
                        <div>{order.billingFullName || "-"}</div>
                        <div>{order.billingPhone || "-"}</div>
                        <div>{order.billingAddressLine1}</div>
                        {order.billingAddressLine2 ? <div>{order.billingAddressLine2}</div> : null}
                        {order.billingLandmark ? <div>{order.billingLandmark}</div> : null}
                        <div>{order.billingCity}</div>
                        {order.billingDistrict ? <div>{order.billingDistrict}</div> : null}
                        {order.billingState ? <div>{order.billingState}</div> : null}
                        {order.billingCountry ? <div>{order.billingCountry}</div> : null}
                        {order.billingPostalCode ? <div>{order.billingPostalCode}</div> : null}
                    </div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-slate-900">
                        Shipping Address
                    </h2>
                    <div className="mt-4 space-y-2 text-sm text-slate-600">
                        <div>{order.shippingFullName || "-"}</div>
                        <div>{order.shippingPhone || "-"}</div>
                        <div>{order.shippingAddressLine1}</div>
                        {order.shippingAddressLine2 ? <div>{order.shippingAddressLine2}</div> : null}
                        {order.shippingLandmark ? <div>{order.shippingLandmark}</div> : null}
                        <div>{order.shippingCity}</div>
                        {order.shippingDistrict ? <div>{order.shippingDistrict}</div> : null}
                        {order.shippingState ? <div>{order.shippingState}</div> : null}
                        {order.shippingCountry ? <div>{order.shippingCountry}</div> : null}
                        {order.shippingPostalCode ? <div>{order.shippingPostalCode}</div> : null}
                    </div>
                </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-slate-900">Items</h2>

                <div className="mt-5 space-y-4">
                    {order.items.map((item: any) => (
                        <div
                            key={item.id}
                            className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:flex-row md:items-center md:justify-between"
                        >
                            <div>
                                <div className="font-medium text-slate-900">
                                    {item.productName}
                                </div>
                                <div className="mt-1 text-xs text-slate-500">
                                    {item.variantLabel || item.variantSku}
                                </div>
                                <div className="mt-1 text-xs text-slate-500">
                                    Qty: {item.quantity}
                                </div>
                            </div>

                            <div className="text-right text-sm">
                                <div className="font-semibold text-slate-900">
                                    ₹{Number(item.lineTotal).toFixed(2)}
                                </div>
                                <div className="mt-1 text-xs text-slate-500">
                                    Unit: ₹{Number(item.unitPrice).toFixed(2)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-slate-900">Summary</h2>

                <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                    <div className="rounded-2xl bg-slate-50 p-4">
                        <div className="text-xs text-slate-500">Subtotal</div>
                        <div className="mt-1 text-lg font-semibold text-slate-900">
                            ₹{Number(order.subtotalAmount).toFixed(2)}
                        </div>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                        <div className="text-xs text-slate-500">Tax</div>
                        <div className="mt-1 text-lg font-semibold text-slate-900">
                            ₹{Number(order.taxAmount).toFixed(2)}
                        </div>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                        <div className="text-xs text-slate-500">Shipping</div>
                        <div className="mt-1 text-lg font-semibold text-slate-900">
                            ₹{Number(order.shippingAmount).toFixed(2)}
                        </div>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                        <div className="text-xs text-slate-500">Discount</div>
                        <div className="mt-1 text-lg font-semibold text-slate-900">
                            ₹{Number(order.discountAmount).toFixed(2)}
                        </div>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                        <div className="text-xs text-slate-500">Paid</div>
                        <div className="mt-1 text-lg font-semibold text-slate-900">
                            ₹{Number(order.totalPaid).toFixed(2)}
                        </div>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                        <div className="text-xs text-slate-500">Pending</div>
                        <div className="mt-1 text-lg font-semibold text-slate-900">
                            ₹{Number(order.pendingAmount).toFixed(2)}
                        </div>
                    </div>
                </div>

                <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-900 p-5 text-white">
                    <div className="text-sm text-slate-300">Grand Total</div>
                    <div className="mt-2 text-3xl font-bold">
                        ₹{Number(order.totalAmount).toFixed(2)}
                    </div>
                </div>
            </div>
        </div>
    );
}