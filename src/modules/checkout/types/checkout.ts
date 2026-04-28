/**
 * ---------------------------------------------------------
 * STOREFRONT CHECKOUT TYPES
 * ---------------------------------------------------------
 * Purpose:
 * Type definitions for storefront checkout and order create.
 * ---------------------------------------------------------
 */

export interface StorefrontCheckoutAddressPayload {
    fullName?: string;
    phone?: string;
    addressLine1: string;
    addressLine2?: string;
    landmark?: string;
    city: string;
    district?: string;
    state?: string;
    country?: string;
    postalCode?: string;
}

export interface StorefrontCheckoutItemPayload {
    productVariantId: string;
    quantity: number;
}

export interface CreateStorefrontOrderPayload {
    firstName: string;
    lastName?: string;
    email: string;
    phone?: string;
    notes?: string;
    shippingAmount?: string;
    discountAmount?: string;
    selectedPaymentMethod?: PaymentMethod;
    sameAsBilling?: boolean;
    billingAddress: StorefrontCheckoutAddressPayload;
    shippingAddress?: StorefrontCheckoutAddressPayload;
    items: StorefrontCheckoutItemPayload[];
}

export interface CreateStorefrontOrderResponse {
    message: string;
    data: {
        id: string;
        orderNumber: string;
        status: string;
        paymentStatus: string;
        selectedPaymentMethod?: PaymentMethod | null;
        totalAmount: string;
        createdAt: string;
        orderAccessToken: string;
    };
}

export type PaymentMethod = "ONLINE" | "CASH_ON_DELIVERY";

export interface StorefrontOrderStatus {
    orderId: string;
    orderNumber: string;
    orderStatus: string;
    paymentStatus: string;
    selectedPaymentMethod?: string | null;
    latestPaymentTransactionStatus?: string | null;
    latestPaymentTransactionId?: string | null;
    canRetryPayment: boolean;
}

export interface StorefrontOrderStatusResponse {
    data: StorefrontOrderStatus;
}
