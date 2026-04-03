"use client";

/**
 * ---------------------------------------------------------
 * REGISTER FORM
 * ---------------------------------------------------------
 * Purpose:
 * Collects storefront customer registration details.
 * ---------------------------------------------------------
 */

type Props = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    isSubmitting?: boolean;
    onChange: (
        field: "firstName" | "lastName" | "email" | "phone" | "password",
        value: string
    ) => void;
    onSubmit: () => void;
};

export default function RegisterForm({
    firstName,
    lastName,
    email,
    phone,
    password,
    isSubmitting = false,
    onChange,
    onSubmit,
}: Props) {
    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5">
                <h2 className="text-2xl font-semibold text-slate-900">
                    Create Account
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                    Register as a customer to track your orders and account.
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

                <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Password
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => onChange("password", e.target.value)}
                        className="h-12 w-full rounded-2xl border border-slate-300 px-4 text-sm outline-none transition focus:border-slate-500"
                    />
                </div>
            </div>

            <button
                type="button"
                onClick={onSubmit}
                disabled={isSubmitting}
                className="mt-5 w-full rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
                {isSubmitting ? "Creating account..." : "Register"}
            </button>
        </div>
    );
}