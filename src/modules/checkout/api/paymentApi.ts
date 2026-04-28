import { api } from "@/lib/http";
import type {
    CreatePaymentSessionPayload,
    PaymentSessionResponse,
    RetryPaymentSessionPayload,
    StorefrontPaymentMethod,
    StorefrontPaymentMethodsResponse,
    StorefrontPaymentOption,
    StorefrontPaymentOptionsResponse,
} from "@/modules/checkout/types/payment";

export async function getStorefrontPaymentOptions(
    brandOwnerId: string
): Promise<StorefrontPaymentOption[]> {
    const response = await api.get<StorefrontPaymentOptionsResponse>(
        `/storefront/payments/options/brand-owner/${brandOwnerId}`
    );

    return response.data.data ?? [];
}

export async function getStorefrontPaymentMethods(
    brandOwnerId: string,
    params: {
        amount?: number;
        countryId?: string;
        stateId?: string;
        districtId?: string;
        pincodeId?: string;
        postalCode?: string;
    },
): Promise<StorefrontPaymentMethod[]> {
    const response = await api.get<StorefrontPaymentMethodsResponse>(
        `/storefront/payments/methods/brand-owner/${brandOwnerId}`,
        { params },
    );

    return response.data.data?.methods ?? [];
}

export async function createStorefrontPaymentSession(
    brandOwnerId: string,
    data: CreatePaymentSessionPayload
): Promise<PaymentSessionResponse> {
    const response = await api.post<PaymentSessionResponse>(
        `/storefront/payments/sessions/brand-owner/${brandOwnerId}`,
        data
    );

    return response.data;
}

export async function retryStorefrontPaymentSession(
    brandOwnerId: string,
    data: RetryPaymentSessionPayload
): Promise<PaymentSessionResponse> {
    const response = await api.post<PaymentSessionResponse>(
        `/storefront/payments/retry/brand-owner/${brandOwnerId}`,
        data
    );

    return response.data;
}
