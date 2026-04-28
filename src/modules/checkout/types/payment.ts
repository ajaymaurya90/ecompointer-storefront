export type StorefrontPaymentMode = "TEST" | "LIVE";

export type StorefrontPaymentOption = {
    tenantPaymentGatewayId: string;
    paymentGatewayId: string;
    gatewayCode: string;
    displayName: string;
    mode: StorefrontPaymentMode;
    isDefault: boolean;
};

export type StorefrontPaymentOptionsResponse = {
    data: StorefrontPaymentOption[];
};

export type StorefrontPaymentMethodCode = "ONLINE" | "CASH_ON_DELIVERY";

export type StorefrontPaymentMethod = {
    method: StorefrontPaymentMethodCode;
    available: boolean;
    reason?: string | null;
    matchedLevel?: string | null;
};

export type StorefrontPaymentMethodsResponse = {
    data: {
        methods: StorefrontPaymentMethod[];
    };
};

export type CreatePaymentSessionPayload = {
    orderId: string;
    tenantPaymentGatewayId?: string;
};

export type RetryPaymentSessionPayload = {
    orderId: string;
    orderAccessToken: string;
    tenantPaymentGatewayId?: string;
};

export type PaymentSessionResponse = {
    transactionId: string;
    paymentGatewayId: string;
    tenantPaymentGatewayId: string;
    gatewayCode: string;
    mode: StorefrontPaymentMode;
    amount: string;
    currencyCode: string;
    status: string;
    gatewayOrderId: string;
    keyId: string;
    providerSession: {
        gatewayOrderId: string;
        keyId: string;
        amount: string;
        currencyCode: string;
    };
};
