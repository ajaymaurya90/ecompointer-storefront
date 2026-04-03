/**
 * ---------------------------------------------------------
 * STOREFRONT ACCOUNT TYPES
 * ---------------------------------------------------------
 * Purpose:
 * Type definitions for storefront customer order history
 * and order detail.
 * ---------------------------------------------------------
 */

export interface StorefrontOrderListItem {
    id: string;
    orderNumber: string;
    buyerName: string;
    buyerEmail?: string | null;
    buyerPhone?: string | null;
    status: string;
    paymentStatus: string;
    currencyCode: string;
    subtotalAmount: string;
    discountAmount: string;
    taxAmount: string;
    shippingAmount: string;
    totalAmount: string;
    totalPaid: string;
    pendingAmount: string;
    itemCount: number;
    items: {
        id: string;
        productName: string;
        productCode?: string | null;
        variantSku: string;
        variantLabel?: string | null;
        quantity: number;
        unitPrice: string;
        lineTotal: string;
    }[];
    createdAt: string;
    updatedAt: string;
}

export interface StorefrontOrderListResponse {
    message: string;
    data: StorefrontOrderListItem[];
}

export interface StorefrontOrderDetail {
    id: string;
    orderNumber: string;
    brandOwnerId: string;
    customerId?: string | null;
    buyerType: string;
    salesChannel: string;
    buyerName: string;
    buyerEmail?: string | null;
    buyerPhone?: string | null;
    billingFullName?: string | null;
    billingPhone?: string | null;
    billingAddressLine1: string;
    billingAddressLine2?: string | null;
    billingLandmark?: string | null;
    billingCity: string;
    billingDistrict?: string | null;
    billingState?: string | null;
    billingCountry?: string | null;
    billingPostalCode?: string | null;
    shippingFullName?: string | null;
    shippingPhone?: string | null;
    shippingAddressLine1: string;
    shippingAddressLine2?: string | null;
    shippingLandmark?: string | null;
    shippingCity: string;
    shippingDistrict?: string | null;
    shippingState?: string | null;
    shippingCountry?: string | null;
    shippingPostalCode?: string | null;
    currencyCode: string;
    subtotalAmount: string;
    discountAmount: string;
    taxAmount: string;
    shippingAmount: string;
    totalAmount: string;
    totalPaid: string;
    pendingAmount: string;
    status: string;
    paymentStatus: string;
    notes?: string | null;
    createdAt: string;
    updatedAt: string;
    brandOwner: {
        id: string;
        businessName: string;
        phone?: string | null;
        logoUrl?: string | null;
        address?: string | null;
        city?: string | null;
        state?: string | null;
        country?: string | null;
    };
    items: any[];
    payments: any[];
}

export interface StorefrontOrderDetailResponse {
    message: string;
    data: StorefrontOrderDetail;
}