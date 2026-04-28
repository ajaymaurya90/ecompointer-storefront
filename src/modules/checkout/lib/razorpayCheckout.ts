import type { PaymentSessionResponse } from "@/modules/checkout/types/payment";

const RAZORPAY_CHECKOUT_SRC = "https://checkout.razorpay.com/v1/checkout.js";

type RazorpaySuccessResponse = {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
};

type RazorpayOptions = {
    key: string;
    amount: number;
    currency: string;
    name?: string;
    description?: string;
    order_id: string;
    handler: (response: RazorpaySuccessResponse) => void;
    prefill?: {
        name?: string;
        email?: string;
        contact?: string;
    };
    modal?: {
        ondismiss?: () => void;
    };
    notes?: Record<string, string>;
    theme?: {
        color?: string;
    };
};

type RazorpayConstructor = new (options: RazorpayOptions) => {
    open: () => void;
};

declare global {
    interface Window {
        Razorpay?: RazorpayConstructor;
    }
}

export function loadRazorpayCheckoutScript(): Promise<void> {
    if (typeof window === "undefined") {
        return Promise.reject(new Error("Razorpay Checkout requires a browser."));
    }

    if (window.Razorpay) {
        return Promise.resolve();
    }

    const existingScript = document.querySelector<HTMLScriptElement>(
        `script[src="${RAZORPAY_CHECKOUT_SRC}"]`
    );

    if (existingScript) {
        return new Promise((resolve, reject) => {
            existingScript.addEventListener("load", () => resolve(), { once: true });
            existingScript.addEventListener(
                "error",
                () => reject(new Error("Could not load Razorpay Checkout.")),
                { once: true }
            );
        });
    }

    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = RAZORPAY_CHECKOUT_SRC;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("Could not load Razorpay Checkout."));
        document.body.appendChild(script);
    });
}

export async function openRazorpayCheckout(input: {
    session: PaymentSessionResponse;
    storeName?: string;
    customerName: string;
    customerEmail: string;
    customerPhone?: string;
    themeColor?: string | null;
    onSuccess: () => void;
    onDismiss: () => void;
}) {
    await loadRazorpayCheckoutScript();

    if (!window.Razorpay) {
        throw new Error("Razorpay Checkout is unavailable.");
    }

    const checkout = new window.Razorpay({
        key: input.session.keyId || input.session.providerSession.keyId,
        amount: toPaise(input.session.amount),
        currency: input.session.currencyCode,
        name: input.storeName || "Storefront",
        description: `Order payment ${input.session.transactionId}`,
        order_id:
            input.session.gatewayOrderId ||
            input.session.providerSession.gatewayOrderId,
        handler: () => input.onSuccess(),
        prefill: {
            name: input.customerName,
            email: input.customerEmail,
            contact: input.customerPhone,
        },
        notes: {
            transactionId: input.session.transactionId,
        },
        theme: {
            color: input.themeColor || "#111827",
        },
        modal: {
            ondismiss: input.onDismiss,
        },
    });

    checkout.open();
}

function toPaise(amount: string) {
    const normalized = amount.trim();
    const [rupees, paise = ""] = normalized.split(".");
    return Number(`${rupees}${paise.padEnd(2, "0")}`);
}
