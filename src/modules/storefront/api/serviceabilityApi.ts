import { api } from "@/lib/http";
import type {
    StorefrontSalesChannelType,
    StorefrontServiceabilityResult,
} from "@/modules/storefront/types/serviceability";

export async function checkStorefrontServiceability({
    pincode,
    channelType = "DIRECT_WEBSITE",
    brandOwnerId,
}: {
    pincode: string;
    channelType?: StorefrontSalesChannelType;
    brandOwnerId?: string | null;
}): Promise<StorefrontServiceabilityResult> {
    const response = await api.get<StorefrontServiceabilityResult>(
        "/storefront/serviceability/check",
        {
            params: {
                pincode,
                channelType,
                brandOwnerId: brandOwnerId || undefined,
            },
        },
    );

    return response.data;
}
