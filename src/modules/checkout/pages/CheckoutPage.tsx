"use client";

/**
 * ---------------------------------------------------------
 * CHECKOUT PAGE
 * ---------------------------------------------------------
 * Purpose:
 * Collects customer and address details, submits storefront
 * order to backend, and clears cart on success.
 * ---------------------------------------------------------
 */

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import StorefrontShell from "@/modules/storefront/components/StorefrontShell";
import CheckoutCustomerForm from "@/modules/checkout/components/CheckoutCustomerForm";
import CheckoutAddressForm from "@/modules/checkout/components/CheckoutAddressForm";
import CheckoutOrderSummary from "@/modules/checkout/components/CheckoutOrderSummary";
import CheckoutSubmitCard from "@/modules/checkout/components/CheckoutSubmitCard";
import { createStorefrontOrder } from "@/modules/checkout/api/checkoutApi";
import {
    createStorefrontPaymentSession,
    getStorefrontPaymentMethods,
    getStorefrontPaymentOptions,
} from "@/modules/checkout/api/paymentApi";
import { openRazorpayCheckout } from "@/modules/checkout/lib/razorpayCheckout";
import type {
    StorefrontPaymentMethod,
    StorefrontPaymentOption,
} from "@/modules/checkout/types/payment";
import { checkStorefrontServiceability } from "@/modules/storefront/api/serviceabilityApi";
import { useStorefrontBootstrapContext } from "@/providers/StorefrontBootstrapProvider";
import { useCartStore } from "@/modules/cart/store/cartStore";
import { useStorefrontAuthStore } from "@/store/storefrontAuthStore";

type AddressState = {
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

const initialAddressState: AddressState = {
    fullName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    landmark: "",
    city: "",
    district: "",
    state: "",
    country: "",
    postalCode: "",
};

export default function CheckoutPage() {
    const router = useRouter();
    const {
        bootstrap,
        isLoading: isBootstrapLoading,
        error: bootstrapError,
    } = useStorefrontBootstrapContext();

    const brandOwnerId = bootstrap?.brandOwner?.id ?? null;

    const items = useCartStore((state) => state.items);
    const clearCart = useCartStore((state) => state.clearCart);

    const customer = useStorefrontAuthStore((state) => state.customer);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [notes, setNotes] = useState("");

    const [billingAddress, setBillingAddress] =
        useState<AddressState>(initialAddressState);
    const [shippingAddress, setShippingAddress] =
        useState<AddressState>(initialAddressState);

    const [sameAsBilling, setSameAsBilling] = useState(true);
    const [shippingAmount, setShippingAmount] = useState("0");
    const [discountAmount, setDiscountAmount] = useState("0");

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [serviceabilityMessage, setServiceabilityMessage] = useState<string | null>(null);
    const [paymentMessage, setPaymentMessage] = useState<string | null>(null);
    const [paymentOptions, setPaymentOptions] = useState<StorefrontPaymentOption[]>([]);
    const [paymentMethods, setPaymentMethods] = useState<StorefrontPaymentMethod[]>([]);
    const [paymentMethodsLoading, setPaymentMethodsLoading] = useState(false);
    const [selectedPaymentOptionId, setSelectedPaymentOptionId] = useState("");
    const [paymentMethod, setPaymentMethod] =
        useState<"ONLINE" | "CASH_ON_DELIVERY">("CASH_ON_DELIVERY");

    // Compute cart summary from cart items to avoid unstable store snapshots.
    const cartSummary = useMemo(() => {
        const itemCount = items.length;

        const totalQuantity = items.reduce(
            (sum, item) => sum + item.quantity,
            0
        );

        const subtotal = items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );

        const taxAmount = items.reduce(
            (sum, item) =>
                sum + ((item.price * item.quantity) * item.taxRate) / 100,
            0
        );

        const grandTotal = subtotal + taxAmount;

        return {
            itemCount,
            totalQuantity,
            subtotal,
            taxAmount,
            grandTotal,
        };
    }, [items]);

    // Prefill checkout values from logged-in storefront customer if available.
    useEffect(() => {
        if (!customer) {
            return;
        }

        setFirstName(customer.firstName || "");
        setLastName(customer.lastName || "");
        setEmail(customer.email || "");
        setPhone(customer.phone || "");

        const defaultAddress =
            customer.addresses?.find((address) => address.isDefault) ||
            customer.addresses?.[0];

        if (defaultAddress) {
            const mappedAddress = {
                fullName: defaultAddress.fullName || "",
                phone: defaultAddress.phone || "",
                addressLine1: defaultAddress.addressLine1 || "",
                addressLine2: defaultAddress.addressLine2 || "",
                landmark: defaultAddress.landmark || "",
                city: defaultAddress.city || "",
                district: defaultAddress.district || "",
                state: defaultAddress.state || "",
                country: defaultAddress.country || "",
                postalCode: defaultAddress.postalCode || "",
            };

            setBillingAddress(mappedAddress);
            setShippingAddress(mappedAddress);
        }
    }, [customer]);

    // Redirect back to cart if checkout opens without items.
    useEffect(() => {
        if (items.length === 0) {
            router.replace("/cart");
        }
    }, [items.length, router]);

    useEffect(() => {
        async function loadPaymentOptions() {
            if (!brandOwnerId) return;

            try {
                const options = await getStorefrontPaymentOptions(brandOwnerId);
                setPaymentOptions(options);

                const defaultOption = options.find((option) => option.isDefault) || options[0];
                setSelectedPaymentOptionId(defaultOption?.tenantPaymentGatewayId ?? "");
            } catch {
                setPaymentOptions([]);
                setSelectedPaymentOptionId("");
            }
        }

        void loadPaymentOptions();
    }, [brandOwnerId]);

    const grandTotal = useMemo(() => {
        return (
            cartSummary.subtotal +
            cartSummary.taxAmount +
            Number(shippingAmount || 0) -
            Number(discountAmount || 0)
        );
    }, [cartSummary, shippingAmount, discountAmount]);

    const deliveryAddress = sameAsBilling ? billingAddress : shippingAddress;
    const deliveryPostalCode = deliveryAddress.postalCode.trim();
    const onlineMethod = paymentMethods.find((item) => item.method === "ONLINE");
    const codMethod = paymentMethods.find(
        (item) => item.method === "CASH_ON_DELIVERY",
    );
    const onlinePaymentAvailable =
        Boolean(onlineMethod?.available) && paymentOptions.length > 0;
    const codAvailable = Boolean(codMethod?.available);
    const noPaymentMethodsAvailable =
        !paymentMethodsLoading && !onlinePaymentAvailable && !codAvailable;

    useEffect(() => {
        async function loadPaymentMethods() {
            if (!brandOwnerId) return;

            try {
                setPaymentMethodsLoading(true);
                const methods = await getStorefrontPaymentMethods(brandOwnerId, {
                    amount: grandTotal,
                    postalCode: deliveryPostalCode || undefined,
                });
                setPaymentMethods(methods);
            } catch {
                setPaymentMethods([]);
            } finally {
                setPaymentMethodsLoading(false);
            }
        }

        void loadPaymentMethods();
    }, [brandOwnerId, deliveryPostalCode, grandTotal]);

    useEffect(() => {
        if (onlinePaymentAvailable && !codAvailable) {
            setPaymentMethod("ONLINE");
            return;
        }

        if (codAvailable && !onlinePaymentAvailable) {
            setPaymentMethod("CASH_ON_DELIVERY");
            return;
        }

        if (paymentMethod === "ONLINE" && !onlinePaymentAvailable && codAvailable) {
            setPaymentMethod("CASH_ON_DELIVERY");
        }

        if (paymentMethod === "CASH_ON_DELIVERY" && !codAvailable && onlinePaymentAvailable) {
            setPaymentMethod("ONLINE");
        }
    }, [codAvailable, onlinePaymentAvailable, paymentMethod]);

    // Handle shared customer field updates.
    function handleCustomerFieldChange(field: string, value: string) {
        setError(null);

        if (field === "firstName") setFirstName(value);
        if (field === "lastName") setLastName(value);
        if (field === "email") setEmail(value);
        if (field === "phone") setPhone(value);
        if (field === "notes") setNotes(value);
    }

    // Handle billing address updates.
    function handleBillingAddressChange(field: string, value: string) {
        setError(null);
        if (field === "postalCode" && sameAsBilling) {
            setServiceabilityMessage(null);
        }
        setBillingAddress((prev) => ({
            ...prev,
            [field]: value,
        }));
    }

    // Handle shipping address updates.
    function handleShippingAddressChange(field: string, value: string) {
        setError(null);
        if (field === "postalCode") {
            setServiceabilityMessage(null);
        }
        setShippingAddress((prev) => ({
            ...prev,
            [field]: value,
        }));
    }

    // Validate and submit storefront checkout payload.
    async function handleSubmit() {
        if (isBootstrapLoading) {
            return <StorefrontShell>Loading checkout...</StorefrontShell>;
        }

        if (bootstrapError) {
            setError(bootstrapError);
            return;
        }

        if (!brandOwnerId) {
            setError("Storefront not available.");
            return;
        }

        if (!items.length) {
            setError("Your cart is empty.");
            return;
        }

        if (!firstName.trim()) {
            setError("First name is required.");
            return;
        }

        if (!email.trim()) {
            setError("Email is required.");
            return;
        }

        if (!billingAddress.addressLine1.trim() || !billingAddress.city.trim()) {
            setError("Billing address line 1 and city are required.");
            return;
        }

        if (
            !sameAsBilling &&
            (!shippingAddress.addressLine1.trim() || !shippingAddress.city.trim())
        ) {
            setError("Shipping address line 1 and city are required.");
            return;
        }

        if (!deliveryPostalCode) {
            setError("Please enter a valid pincode.");
            return;
        }

        if (noPaymentMethodsAvailable) {
            setError("No payment method is available for this order.");
            return;
        }

        if (paymentMethod === "ONLINE" && (!selectedPaymentOptionId || !onlinePaymentAvailable)) {
            setError("Please select an online payment option.");
            return;
        }

        if (paymentMethod === "CASH_ON_DELIVERY" && !codAvailable) {
            setError(codMethod?.reason || "Cash on Delivery is not available.");
            return;
        }

        try {
            setIsSubmitting(true);
            setError(null);
            setPaymentMessage(null);
            setServiceabilityMessage("Checking delivery availability...");

            const serviceability = await checkStorefrontServiceability({
                pincode: deliveryPostalCode,
                channelType: "DIRECT_WEBSITE",
                brandOwnerId,
            });

            if (!serviceability.serviceable) {
                setError("Sorry, delivery is not available to this pincode.");
                setServiceabilityMessage(null);
                return;
            }

            setServiceabilityMessage(
                serviceability.matchedLevel
                    ? `Delivery is available in your area (${serviceability.matchedLevel}).`
                    : "Delivery is available in your area.",
            );

            const createdOrder = await createStorefrontOrder(brandOwnerId, {
                firstName: firstName.trim(),
                lastName: lastName.trim() || undefined,
                email: email.trim(),
                phone: phone.trim() || undefined,
                notes: notes.trim() || undefined,
                shippingAmount,
                discountAmount,
                selectedPaymentMethod: paymentMethod,
                sameAsBilling,
                billingAddress: {
                    fullName: billingAddress.fullName.trim() || undefined,
                    phone: billingAddress.phone.trim() || undefined,
                    addressLine1: billingAddress.addressLine1.trim(),
                    addressLine2: billingAddress.addressLine2.trim() || undefined,
                    landmark: billingAddress.landmark.trim() || undefined,
                    city: billingAddress.city.trim(),
                    district: billingAddress.district.trim() || undefined,
                    state: billingAddress.state.trim() || undefined,
                    country: billingAddress.country.trim() || undefined,
                    postalCode: billingAddress.postalCode.trim() || undefined,
                },
                shippingAddress: sameAsBilling
                    ? undefined
                    : {
                        fullName: shippingAddress.fullName.trim() || undefined,
                        phone: shippingAddress.phone.trim() || undefined,
                        addressLine1: shippingAddress.addressLine1.trim(),
                        addressLine2:
                            shippingAddress.addressLine2.trim() || undefined,
                        landmark: shippingAddress.landmark.trim() || undefined,
                        city: shippingAddress.city.trim(),
                        district: shippingAddress.district.trim() || undefined,
                        state: shippingAddress.state.trim() || undefined,
                        country: shippingAddress.country.trim() || undefined,
                        postalCode:
                            shippingAddress.postalCode.trim() || undefined,
                    },
                items: items.map((item) => ({
                    productVariantId: item.productVariantId,
                    quantity: item.quantity,
                })),
            });

            clearCart();
            const confirmationBase = `/order-confirmation?orderId=${createdOrder.id}&token=${encodeURIComponent(createdOrder.orderAccessToken)}`;

            if (paymentMethod === "ONLINE") {
                setPaymentMessage("Preparing secure payment checkout...");

                const paymentSession = await createStorefrontPaymentSession(
                    brandOwnerId,
                    {
                        orderId: createdOrder.id,
                        tenantPaymentGatewayId: selectedPaymentOptionId,
                    },
                );

                await openRazorpayCheckout({
                    session: paymentSession,
                    storeName:
                        bootstrap?.storefront?.storefrontName ||
                        bootstrap?.brandOwner?.businessName,
                    customerName: `${firstName} ${lastName}`.trim(),
                    customerEmail: email.trim(),
                    customerPhone: phone.trim() || undefined,
                    themeColor: bootstrap?.storefront?.primaryColor,
                    onSuccess: () => {
                        setPaymentMessage(
                            "Payment submitted. We are confirming it securely.",
                        );

                        router.push(
                            `${confirmationBase}&status=processing`,
                        );
                    },
                    onDismiss: () => {
                        setPaymentMessage(
                            "Payment window closed. Your order is placed but payment is still pending.",
                        );

                        router.push(
                            `${confirmationBase}&status=pending`,
                        );
                    },
                });

                return;
            }

            router.push(`${confirmationBase}&status=cod`);
        } catch (err: any) {
            setError(
                err?.response?.data?.message ||
                err?.message ||
                "Failed to place order"
            );
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <StorefrontShell>
            <section className="border-b border-slate-200 bg-white">
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                            Checkout
                        </div>
                        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">
                            Complete your order
                        </h1>
                        <p className="mt-4 text-base leading-7 text-slate-600">
                            Enter your details, confirm addresses, review totals,
                            and place the order securely.
                        </p>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {error ? (
                    <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                        {error}
                    </div>
                ) : null}

                {serviceabilityMessage ? (
                    <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
                        {serviceabilityMessage}
                    </div>
                ) : null}

                <div className="grid grid-cols-1 gap-8 xl:grid-cols-12">
                    <div className="space-y-6 xl:col-span-8">
                        <CheckoutCustomerForm
                            firstName={firstName}
                            lastName={lastName}
                            email={email}
                            phone={phone}
                            notes={notes}
                            onChange={handleCustomerFieldChange}
                        />

                        <CheckoutAddressForm
                            title="Billing Address"
                            description="Enter billing address details for this order."
                            values={billingAddress}
                            onChange={handleBillingAddressChange}
                        />

                        {!sameAsBilling ? (
                            <CheckoutAddressForm
                                title="Shipping Address"
                                description="Enter delivery address details."
                                values={shippingAddress}
                                onChange={handleShippingAddressChange}
                            />
                        ) : null}
                    </div>

                    <div className="space-y-6 xl:col-span-4 xl:sticky xl:top-6 xl:self-start">
                        <CheckoutOrderSummary
                            items={items}
                            subtotal={cartSummary.subtotal}
                            taxAmount={cartSummary.taxAmount}
                            shippingAmount={shippingAmount}
                            discountAmount={discountAmount}
                            grandTotal={grandTotal}
                            onShippingAmountChange={setShippingAmount}
                            onDiscountAmountChange={setDiscountAmount}
                        />

                        <CheckoutSubmitCard
                            sameAsBilling={sameAsBilling}
                            onSameAsBillingChange={setSameAsBilling}
                            isSubmitting={isSubmitting}
                            paymentMethod={paymentMethod}
                            onPaymentMethodChange={setPaymentMethod}
                            onlinePaymentAvailable={onlinePaymentAvailable}
                            codAvailable={codAvailable}
                            onlineUnavailableReason={
                                onlineMethod?.reason ||
                                (paymentOptions.length === 0
                                    ? "No online payment gateway is enabled for this store."
                                    : null)
                            }
                            codUnavailableReason={codMethod?.reason}
                            paymentMethodsLoading={paymentMethodsLoading}
                            noPaymentMethodsAvailable={noPaymentMethodsAvailable}
                            selectedPaymentOptionId={selectedPaymentOptionId}
                            onSelectedPaymentOptionChange={setSelectedPaymentOptionId}
                            paymentOptions={paymentOptions}
                            paymentMessage={paymentMessage}
                            onSubmit={handleSubmit}
                        />
                    </div>
                </div>
            </section>
        </StorefrontShell>
    );
}
