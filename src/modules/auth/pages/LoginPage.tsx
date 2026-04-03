"use client";

/**
 * ---------------------------------------------------------
 * LOGIN PAGE
 * ---------------------------------------------------------
 * Purpose:
 * Handles storefront customer login flow and session restore.
 * ---------------------------------------------------------
 */

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import StorefrontShell from "@/modules/storefront/components/StorefrontShell";
import LoginForm from "@/modules/auth/components/LoginForm";
import { loginStorefrontCustomer, getStorefrontMe } from "@/modules/auth/api/authApi";
import { useStorefrontBootstrapContext } from "@/providers/StorefrontBootstrapProvider";
import { useStorefrontAuthStore } from "@/store/storefrontAuthStore";

export default function LoginPage() {
    const router = useRouter();
    const { brandOwnerId } = useStorefrontBootstrapContext();
    const setSession = useStorefrontAuthStore((state) => state.setSession);
    const isAuthenticated = useStorefrontAuthStore((state) => state.isAuthenticated);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Redirect authenticated customer away from login page.
    useEffect(() => {
        if (isAuthenticated) {
            router.replace("/account/orders");
        }
    }, [isAuthenticated, router]);

    // Update local form values from controlled login inputs.
    function handleChange(field: "email" | "password", value: string) {
        setError(null);

        if (field === "email") setEmail(value);
        if (field === "password") setPassword(value);
    }

    // Submit storefront login and load current customer profile.
    async function handleSubmit() {
        if (!brandOwnerId) {
            setError("Brand owner id is missing.");
            return;
        }

        if (!email.trim() || !password.trim()) {
            setError("Email and password are required.");
            return;
        }

        try {
            setIsSubmitting(true);
            setError(null);

            const loginResponse = await loginStorefrontCustomer(brandOwnerId, {
                email: email.trim(),
                password,
            });

            const customer = await getStorefrontMe(loginResponse.accessToken);

            setSession(loginResponse.accessToken, customer);
            router.push("/account/orders");
        } catch (err: any) {
            setError(
                err?.response?.data?.message ||
                err?.message ||
                "Failed to login"
            );
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <StorefrontShell>
            <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
                {error ? (
                    <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                        {error}
                    </div>
                ) : null}

                <LoginForm
                    email={email}
                    password={password}
                    isSubmitting={isSubmitting}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                />

                <div className="mt-5 text-center text-sm text-slate-600">
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/register"
                        className="font-medium text-slate-900 underline underline-offset-4"
                    >
                        Register here
                    </Link>
                </div>
            </section>
        </StorefrontShell>
    );
}