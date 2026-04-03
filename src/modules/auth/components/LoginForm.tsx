"use client";

/**
 * ---------------------------------------------------------
 * LOGIN FORM
 * ---------------------------------------------------------
 * Purpose:
 * Collects storefront customer login credentials.
 * ---------------------------------------------------------
 */

type Props = {
    email: string;
    password: string;
    isSubmitting?: boolean;
    onChange: (field: "email" | "password", value: string) => void;
    onSubmit: () => void;
};

export default function LoginForm({
    email,
    password,
    isSubmitting = false,
    onChange,
    onSubmit,
}: Props) {
    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5">
                <h2 className="text-2xl font-semibold text-slate-900">
                    Customer Login
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                    Login to view your orders and account details.
                </p>
            </div>

            <div className="space-y-4">
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
                        Password
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => onChange("password", e.target.value)}
                        className="h-12 w-full rounded-2xl border border-slate-300 px-4 text-sm outline-none transition focus:border-slate-500"
                    />
                </div>

                <button
                    type="button"
                    onClick={onSubmit}
                    disabled={isSubmitting}
                    className="w-full rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {isSubmitting ? "Logging in..." : "Login"}
                </button>
            </div>
        </div>
    );
}