/**
 * ---------------------------------------------------------
 * STOREFRONT AUTH TYPES
 * ---------------------------------------------------------
 * Purpose:
 * Type definitions for storefront customer auth and profile.
 * ---------------------------------------------------------
 */

export interface StorefrontCustomerAddress {
    id: string;
    type: string;
    fullName?: string | null;
    phone?: string | null;
    addressLine1: string;
    addressLine2?: string | null;
    landmark?: string | null;
    city: string;
    district?: string | null;
    state?: string | null;
    country?: string | null;
    postalCode?: string | null;
    isDefault: boolean;
}

export interface StorefrontCustomerBusiness {
    id: string;
    businessName: string;
    legalBusinessName?: string | null;
    businessType: string;
    contactPersonName?: string | null;
    contactPersonPhone?: string | null;
    contactPersonEmail?: string | null;
    gstNumber?: string | null;
    website?: string | null;
    isPrimary: boolean;
}

export interface StorefrontCustomerProfile {
    id: string;
    customerCode: string;
    brandOwnerId: string;
    type: string;
    status: string;
    source: string;
    firstName: string;
    lastName?: string | null;
    email?: string | null;
    phone?: string | null;
    alternatePhone?: string | null;
    isActive: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    addresses: StorefrontCustomerAddress[];
    businesses: StorefrontCustomerBusiness[];
}

export interface StorefrontRegisterPayload {
    firstName: string;
    lastName?: string;
    email: string;
    phone?: string;
    password: string;
}

export interface StorefrontLoginPayload {
    email: string;
    password: string;
}

export interface StorefrontRegisterResponse {
    message: string;
    data: {
        id: string;
        customerCode: string;
        firstName: string;
        lastName?: string | null;
        email?: string | null;
        phone?: string | null;
        brandOwnerId: string;
        type: string;
        status: string;
    };
}

export interface StorefrontLoginResponse {
    message: string;
    accessToken: string;
    data: {
        customer: {
            id: string;
            customerCode: string;
            firstName: string;
            lastName?: string | null;
            email?: string | null;
            phone?: string | null;
            brandOwnerId: string;
            type: string;
            status: string;
        };
    };
}

export interface StorefrontMeResponse {
    message: string;
    data: StorefrontCustomerProfile;
}