import { NextRequest, NextResponse } from "next/server";

/**
 * Normalize incoming host
 */
function normalizeTenantHost(host?: string | null): string {
    if (!host) return "";

    return host
        .trim()
        .toLowerCase()
        .replace(/^https?:\/\//, "")
        .replace(/\/$/, "");
}

/**
 * IMPORTANT:
 * Use DEFAULT export (required for stability in Next 16)
 */
export default function middleware(request: NextRequest) {
    const incomingHost =
        request.headers.get("x-forwarded-host") ||
        request.headers.get("host") ||
        "";

    const tenantHost = normalizeTenantHost(incomingHost);

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-tenant-host", tenantHost);

    return NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
    ],
};