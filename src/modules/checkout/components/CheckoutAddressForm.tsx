"use client";

/**
 * ---------------------------------------------------------
 * CHECKOUT ADDRESS FORM
 * ---------------------------------------------------------
 * Purpose:
 * Captures either billing or shipping address during checkout.
 * ---------------------------------------------------------
 */

type Props = {
    title: string;
    description: string;
    values: {
        fullName: string;
        phone: string;
        addressLine1: string;
        addressLine2: string;
        landmark: string;
        city: string;
        district: string;
        state: string;
        country: string;
        postalCode: string;
    };
    onChange: (field: string, value: string) => void;
};

export default function CheckoutAddressForm({
    title,
    description,
    values,
    onChange,
}: Props) {
    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5">
                <h2 className="text-xl font-semibold text-slate-900">
                    {title}
                </h2>
                <p className="mt-1 text-sm text-slate-500">{description}</p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Full Name
                    </label>
                    <input
                        type="text"
                        value={values.fullName}
                        onChange={(e) => onChange("fullName", e.target.value)}
                        className="h-12 w-full rounded-2xl border border-slate-300 px-4 text-sm outline-none transition focus:border-slate-500"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Phone
                    </label>
                    <input
                        type="text"
                        value={values.phone}
                        onChange={(e) => onChange("phone", e.target.value)}
                        className="h-12 w-full rounded-2xl border border-slate-300 px-4 text-sm outline-none transition focus:border-slate-500"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Address Line 1
                    </label>
                    <input
                        type="text"
                        value={values.addressLine1}
                        onChange={(e) => onChange("addressLine1", e.target.value)}
                        className="h-12 w-full rounded-2xl border border-slate-300 px-4 text-sm outline-none transition focus:border-slate-500"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Address Line 2
                    </label>
                    <input
                        type="text"
                        value={values.addressLine2}
                        onChange={(e) => onChange("addressLine2", e.target.value)}
                        className="h-12 w-full rounded-2xl border border-slate-300 px-4 text-sm outline-none transition focus:border-slate-500"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Landmark
                    </label>
                    <input
                        type="text"
                        value={values.landmark}
                        onChange={(e) => onChange("landmark", e.target.value)}
                        className="h-12 w-full rounded-2xl border border-slate-300 px-4 text-sm outline-none transition focus:border-slate-500"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        City
                    </label>
                    <input
                        type="text"
                        value={values.city}
                        onChange={(e) => onChange("city", e.target.value)}
                        className="h-12 w-full rounded-2xl border border-slate-300 px-4 text-sm outline-none transition focus:border-slate-500"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        District
                    </label>
                    <input
                        type="text"
                        value={values.district}
                        onChange={(e) => onChange("district", e.target.value)}
                        className="h-12 w-full rounded-2xl border border-slate-300 px-4 text-sm outline-none transition focus:border-slate-500"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        State
                    </label>
                    <input
                        type="text"
                        value={values.state}
                        onChange={(e) => onChange("state", e.target.value)}
                        className="h-12 w-full rounded-2xl border border-slate-300 px-4 text-sm outline-none transition focus:border-slate-500"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Country
                    </label>
                    <input
                        type="text"
                        value={values.country}
                        onChange={(e) => onChange("country", e.target.value)}
                        className="h-12 w-full rounded-2xl border border-slate-300 px-4 text-sm outline-none transition focus:border-slate-500"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Postal Code
                    </label>
                    <input
                        type="text"
                        value={values.postalCode}
                        onChange={(e) => onChange("postalCode", e.target.value)}
                        className="h-12 w-full rounded-2xl border border-slate-300 px-4 text-sm outline-none transition focus:border-slate-500"
                    />
                </div>
            </div>
        </div>
    );
}