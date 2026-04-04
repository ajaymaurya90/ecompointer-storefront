/**
 * ---------------------------------------------------------
 * TENANT RESOLUTION
 * ---------------------------------------------------------
 * Purpose:
 * Resolves the active storefront tenant from request host.
 *
 * Local development behavior:
 * - Prefer explicit hostname mapping for ayodoya.local etc.
 * - Fallback to env-based default BO for localhost/dev use
 * ---------------------------------------------------------
 */

export type ResolvedTenant = {
    brandOwnerId: string | null;
    hostname: string;
};

/**
 * Strip port from host header safely.
 */
export function normalizeHostname(host?: string | null): string {
    if (!host) {
        return "";
    }

    return host.split(":")[0].trim().toLowerCase();
}

/**
 * Local development hostname → brand owner mapping.
 */
const LOCAL_TENANT_MAP: Record<string, string> = {
    "ayodoya.local": "8579d40b-8e7b-4519-ae18-05b587e1568a",
    "myshop.local": "11111111-2222-3333-4444-555555555555",
    "demo.local": "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee",
};

/**
 * Default fallback BO id for local development.
 *
 * Use this when opening storefront on localhost:3002
 * or when local custom hostname resolution is unreliable.
 */
const DEFAULT_LOCAL_BRAND_OWNER_ID =
    process.env.NEXT_PUBLIC_BRAND_OWNER_ID || null;

/**
 * Resolve tenant from current request host.
 */
export function resolveTenantFromHost(host?: string | null): ResolvedTenant {
    const hostname = normalizeHostname(host);

    // Prefer explicit mapped local hostnames first.
    if (hostname && LOCAL_TENANT_MAP[hostname]) {
        return {
            brandOwnerId: LOCAL_TENANT_MAP[hostname],
            hostname,
        };
    }

    // For localhost and other unmapped dev hosts, use env fallback.
    if (
        !hostname ||
        hostname === "localhost" ||
        hostname === "127.0.0.1"
    ) {
        return {
            brandOwnerId: DEFAULT_LOCAL_BRAND_OWNER_ID,
            hostname,
        };
    }

    // Final fallback for dev: if host is unknown but env BO exists, still use it.
    if (DEFAULT_LOCAL_BRAND_OWNER_ID) {
        return {
            brandOwnerId: DEFAULT_LOCAL_BRAND_OWNER_ID,
            hostname,
        };
    }

    return {
        brandOwnerId: null,
        hostname,
    };
}