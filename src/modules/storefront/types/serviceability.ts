export type StorefrontSalesChannelType = "DIRECT_WEBSITE";

export type StorefrontServiceabilityLevel =
    | "COUNTRY"
    | "STATE"
    | "DISTRICT"
    | "PINCODE";

export type StorefrontServiceabilityResult = {
    serviceable: boolean;
    matchedLevel: StorefrontServiceabilityLevel | null;
};
