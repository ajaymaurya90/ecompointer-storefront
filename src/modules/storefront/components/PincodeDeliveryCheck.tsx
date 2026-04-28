"use client";

import { useState } from "react";
import { checkStorefrontServiceability } from "@/modules/storefront/api/serviceabilityApi";
import type { StorefrontServiceabilityResult } from "@/modules/storefront/types/serviceability";

type Props = {
    brandOwnerId?: string | null;
    initialPincode?: string;
    compact?: boolean;
    onResult?: (result: StorefrontServiceabilityResult | null) => void;
};

export default function PincodeDeliveryCheck({
    brandOwnerId,
    initialPincode = "",
    compact = false,
    onResult,
}: Props) {
    const [pincode, setPincode] = useState(initialPincode);
    const [result, setResult] = useState<StorefrontServiceabilityResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isChecking, setIsChecking] = useState(false);

    async function checkDelivery() {
        const value = pincode.trim();

        if (!value) {
            setResult(null);
            setError("Please enter a valid pincode.");
            onResult?.(null);
            return;
        }

        try {
            setIsChecking(true);
            setError(null);
            setResult(null);

            const response = await checkStorefrontServiceability({
                pincode: value,
                channelType: "DIRECT_WEBSITE",
                brandOwnerId,
            });

            setResult(response);
            onResult?.(response);
        } catch (err: any) {
            const message =
                err?.response?.data?.message ||
                err?.message ||
                "Could not check delivery availability.";
            setResult(null);
            setError(message);
            onResult?.(null);
        } finally {
            setIsChecking(false);
        }
    }

    return (
        <div className={`rounded-3xl border border-slate-200 bg-white ${compact ? "p-5" : "p-6"} shadow-sm`}>
            <div>
                <h2 className="text-lg font-semibold text-slate-900">
                    Check Delivery
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                    Enter your pincode to confirm delivery availability.
                </p>
            </div>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <input
                    type="text"
                    value={pincode}
                    onChange={(event) => {
                        setPincode(event.target.value);
                        setResult(null);
                        setError(null);
                        onResult?.(null);
                    }}
                    placeholder="Enter pincode"
                    className="h-12 w-full rounded-2xl border border-slate-300 px-4 text-sm outline-none transition focus:border-slate-500"
                />
                <button
                    type="button"
                    onClick={() => void checkDelivery()}
                    disabled={isChecking}
                    className="h-12 rounded-2xl bg-slate-900 px-5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {isChecking ? "Checking..." : "Check Delivery"}
                </button>
            </div>

            {result ? (
                <div
                    className={`mt-4 rounded-2xl border px-4 py-3 text-sm font-medium ${result.serviceable
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                        : "border-red-200 bg-red-50 text-red-700"
                        }`}
                >
                    {result.serviceable
                        ? result.matchedLevel
                            ? `Delivery is available to this pincode (${result.matchedLevel}).`
                            : "Delivery is available to this pincode."
                        : "Sorry, delivery is not available to this pincode."}
                </div>
            ) : null}

            {error ? (
                <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                    {error}
                </div>
            ) : null}
        </div>
    );
}
