"use client";

/**
 * ---------------------------------------------------------
 * CHECKOUT CUSTOMER FORM
 * ---------------------------------------------------------
 * Purpose:
 * Captures customer identity details during storefront checkout.
 * ---------------------------------------------------------
 */

type Props = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    notes: string;
    onChange: (field: string, value: string) => void;
};

export default function CheckoutCustomerForm({
    firstName,
    lastName,
    email,
    phone,
    notes,
    onChange,
}: Props) {
    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5">
                <h2 className="text-xl font-semibold text-slate-900">
                    Customer Details
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                    Enter your details for order confirmation and delivery.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        First Name
                    </label>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => onChange("firstName", e.target.value)}
                        className="h-12 w-full rounded-2xl border border-slate-300 px-4 text-sm outline-none transition focus:border-slate-500"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Last Name
                    </label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => onChange("lastName", e.target.value)}
                        className="h-12 w-full rounded-2xl border border-slate-300 px-4 text-sm outline-none transition focus:border-slate-500"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Email
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => onChange("email", e.target.value)}
                        className="h-12 w-full rounded-2xl border border-slate-300 px-4 text-sm outline-none transition focus:border-slate-500"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Phone
                    </label>
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => onChange("phone", e.target.value)}
                        className="h-12 w-full rounded-2xl border border-slate-300 px-4 text-sm outline-none transition focus:border-slate-500"
                    />
                </div>
            </div>

            <div className="mt-4">
                <label className="mb-2 block text-sm font-medium text-slate-700">
                    Notes
                </label>
                <textarea
                    rows={4}
                    value={notes}
                    onChange={(e) => onChange("notes", e.target.value)}
                    placeholder="Any delivery note or order instruction"
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-500"
                />
            </div>
        </div>
    );
}