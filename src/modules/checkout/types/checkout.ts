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
        totalAmount: string;
        createdAt: string;
    };
}