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
    onSubmit: () => void;
};

export default function CheckoutSubmitCard({
    sameAsBilling,
    onSameAsBillingChange,
    isSubmitting,
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

            <button
                type="button"
                onClick={onSubmit}
                disabled={isSubmitting}
                className="mt-6 w-full rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
                {isSubmitting ? "Placing Order..." : "Place Order"}
            </button>
        </div>
    );
}