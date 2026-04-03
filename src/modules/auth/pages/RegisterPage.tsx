"use client";

/**
 * ---------------------------------------------------------
 * REGISTER PAGE
 * ---------------------------------------------------------
 * Purpose:
 * Handles storefront customer registration and optional
 * immediate redirect to login.
 * ---------------------------------------------------------
 */

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import StorefrontShell from "@/modules/storefront/components/StorefrontShell";
import RegisterForm from "@/modules/auth/components/RegisterForm";
import { registerStorefrontCustomer } from "@/modules/auth/api/authApi";
import { useStorefrontBootstrapContext } from "@/providers/StorefrontBootstrapProvider";
import { useStorefrontAuthStore } from "@/store/storefrontAuthStore";

export default function RegisterPage() {
    const router = useRouter();
    const { brandOwnerId } = useStorefrontBootstrapContext();
    const isAuthenticated = useStorefrontAuthStore((state) => state.isAuthenticated);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    // Redirect authenticated customer away from register page.
    useEffect(() => {
        if (isAuthenticated) {
            router.replace("/account/orders");
        }
    }, [isAuthenticated, router]);

    // Update registration form values.
    function handleChange(
        field: "firstName" | "lastName" | "email" | "phone" | "password",
        value: string
    ) {
        setError(null);
        setSuccessMessage(null);

        if (field === "firstName") setFirstName(value);
        if (field === "lastName") setLastName(value);
        if (field === "email") setEmail(value);
        if (field === "phone") setPhone(value);
        if (field === "password") setPassword(value);
    }

    // Submit storefront registration and redirect customer to login.
    async function handleSubmit() {
        if (!brandOwnerId) {
            setError("Brand owner id is missing.");
            return;
        }

        if (!firstName.trim() || !email.trim() || !password.trim()) {
            setError("First name, email, and password are required.");
            return;
        }

        try {
            setIsSubmitting(true);
            setError(null);
            setSuccessMessage(null);

            await registerStorefrontCustomer(brandOwnerId, {
                firstName: firstName.trim(),
                lastName: lastName.trim() || undefined,
                email: email.trim(),
                phone: phone.trim() || undefined,
                password,
            });

            setSuccessMessage("Account created successfully. Redirecting to login...");

            setTimeout(() => {
                router.push("/login");
            }, 900);
        } catch (err: any) {
            setError(
                err?.response?.data?.message ||
                err?.message ||
                "Failed to register"
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

                {successMessage ? (
                    <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
                        {successMessage}
                    </div>
                ) : null}

                <RegisterForm
                    firstName={firstName}
                    lastName={lastName}
                    email={email}
                    phone={phone}
                    password={password}
                    isSubmitting={isSubmitting}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                />

                <div className="mt-5 text-center text-sm text-slate-600">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="font-medium text-slate-900 underline underline-offset-4"
                    >
                        Login here
                    </Link>
                </div>
            </section>
        </StorefrontShell>
    );
}