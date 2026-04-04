"use client";

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

    const {
        bootstrap,
        isLoading: isBootstrapLoading,
        error: bootstrapError,
    } = useStorefrontBootstrapContext();

    const brandOwnerId = bootstrap?.brandOwner?.id ?? null;

    const setSession = useStorefrontAuthStore((state) => state.setSession);
    const isAuthenticated = useStorefrontAuthStore((state) => state.isAuthenticated);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isAuthenticated) {
            router.replace("/account/orders");
        }
    }, [isAuthenticated, router]);

    function handleChange(field: "email" | "password", value: string) {
        setError(null);
        if (field === "email") setEmail(value);
        if (field === "password") setPassword(value);
    }

    async function handleSubmit() {
        if (isBootstrapLoading) return;

        if (bootstrapError) {
            setError(bootstrapError);
            return;
        }

        if (!brandOwnerId) {
            setError("Storefront not available.");
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

    if (isBootstrapLoading) {
        return <StorefrontShell>Loading storefront...</StorefrontShell>;
    }

    return (
        <StorefrontShell>
            <section className="mx-auto max-w-3xl px-4 py-12">
                {error && (
                    <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                        {error}
                    </div>
                )}

                <LoginForm
                    email={email}
                    password={password}
                    isSubmitting={isSubmitting}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                />

                <div className="mt-5 text-center text-sm text-slate-600">
                    Don&apos;t have an account?{" "}
                    <Link href="/register" className="underline">
                        Register here
                    </Link>
                </div>
            </section>
        </StorefrontShell>
    );
}