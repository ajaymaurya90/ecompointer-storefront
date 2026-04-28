"use client";

/**
 * ---------------------------------------------------------
 * CHECKOUT SUBMIT CARD
 * ---------------------------------------------------------
 * Purpose:
 * Handles same-as-billing toggle and final place-order action.
 * ---------------------------------------------------------
 */

type Props = {
    sameAsBilling: boolean;
    onSameAsBillingChange: (checked: boolean) => void;
    isSubmitting: boolean;
    paymentMethod: "ONLINE" | "CASH_ON_DELIVERY";
    onPaymentMethodChange: (method: "ONLINE" | "CASH_ON_DELIVERY") => void;
    onlinePaymentAvailable: boolean;
    codAvailable: boolean;
    onlineUnavailableReason?: string | null;
    codUnavailableReason?: string | null;
    paymentMethodsLoading?: boolean;
    noPaymentMethodsAvailable?: boolean;
    selectedPaymentOptionId: string;
    onSelectedPaymentOptionChange: (id: string) => void;
    paymentOptions: Array<{
        tenantPaymentGatewayId: string;
        displayName: string;
        gatewayCode: string;
        mode: string;
        isDefault: boolean;
    }>;
    paymentMessage?: string | null;
    onSubmit: () => void;
};

export default function CheckoutSubmitCard({
    sameAsBilling,
    onSameAsBillingChange,
    isSubmitting,
    paymentMethod,
    onPaymentMethodChange,
    onlinePaymentAvailable,
    codAvailable,
    onlineUnavailableReason,
    codUnavailableReason,
    paymentMethodsLoading = false,
    noPaymentMethodsAvailable = false,
    selectedPaymentOptionId,
    onSelectedPaymentOptionChange,
    paymentOptions,
    paymentMessage,
    onSubmit,
}: Props) {
    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">
                Place Order
            </h2>

            <label className="mt-5 flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <input
                    type="checkbox"
                    checked={sameAsBilling}
                    onChange={(e) => onSameAsBillingChange(e.target.checked)}
                    className="mt-1 h-4 w-4"
                />
                <div>
                    <div className="text-sm font-medium text-slate-800">
                        Shipping address same as billing
                    </div>
                    <div className="mt-1 text-xs text-slate-500">
                        Use billing address as delivery address too.
                    </div>
                </div>
            </label>

            <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-sm font-semibold text-slate-900">
                    Payment Method
                </div>
                <div className="mt-3 space-y-3">
                    {onlinePaymentAvailable ? (
                        <label className="flex items-start gap-3">
                            <input
                                type="radio"
                                checked={paymentMethod === "ONLINE"}
                                onChange={() => onPaymentMethodChange("ONLINE")}
                                className="mt-1 h-4 w-4"
                            />
                            <div>
                                <div className="text-sm font-medium text-slate-800">
                                    Pay Online
                                </div>
                                <div className="mt-1 text-xs text-slate-500">
                                    Secure checkout powered by the payment gateway.
                                </div>
                            </div>
                        </label>
                    ) : (
                        <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
                            {onlineUnavailableReason ||
                                "No online payment gateway is enabled for this store."}
                        </div>
                    )}

                    {codAvailable ? (
                        <label className="flex items-start gap-3">
                            <input
                                type="radio"
                                checked={paymentMethod === "CASH_ON_DELIVERY"}
                                onChange={() => onPaymentMethodChange("CASH_ON_DELIVERY")}
                                className="mt-1 h-4 w-4"
                            />
                            <div>
                                <div className="text-sm font-medium text-slate-800">
                                    Cash on Delivery
                                </div>
                                <div className="mt-1 text-xs text-slate-500">
                                    Place the order now and pay on delivery.
                                </div>
                            </div>
                        </label>
                    ) : (
                        <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
                            {codUnavailableReason ||
                                "Cash on Delivery is not available for this order."}
                        </div>
                    )}
                </div>

                {paymentMethod === "ONLINE" && onlinePaymentAvailable ? (
                    <label className="mt-4 block">
                        <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Gateway
                        </span>
                        <select
                            value={selectedPaymentOptionId}
                            onChange={(event) =>
                                onSelectedPaymentOptionChange(event.target.value)
                            }
                            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 outline-none focus:border-slate-900"
                        >
                            {paymentOptions.map((option) => (
                                <option
                                    key={option.tenantPaymentGatewayId}
                                    value={option.tenantPaymentGatewayId}
                                >
                                    {option.displayName} ({option.mode})
                                    {option.isDefault ? " - Default" : ""}
                                </option>
                            ))}
                        </select>
                    </label>
                ) : null}

                {paymentMessage ? (
                    <div className="mt-4 rounded-xl border border-indigo-200 bg-indigo-50 p-3 text-xs text-indigo-800">
                        {paymentMessage}
                    </div>
                ) : null}

                {paymentMethodsLoading ? (
                    <div className="mt-4 rounded-xl bg-slate-100 p-3 text-xs text-slate-600">
                        Checking available payment methods...
                    </div>
                ) : null}

                {noPaymentMethodsAvailable ? (
                    <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
                        No payment method is available for this order.
                    </div>
                ) : null}
            </div>

            <button
                type="button"
                onClick={onSubmit}
                disabled={isSubmitting || paymentMethodsLoading || noPaymentMethodsAvailable}
                className="mt-6 w-full rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
                {isSubmitting
                    ? paymentMethod === "ONLINE"
                        ? "Opening Payment..."
                        : "Placing Order..."
                    : paymentMethod === "ONLINE"
                        ? "Place Order & Pay"
                        : "Place Order"}
            </button>
        </div>
    );
}
