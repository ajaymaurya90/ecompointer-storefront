/**
 * Convert backend-stored media paths into browser-loadable URLs.
 * Uploaded files are served by the API, not by the storefront domain.
 */
export function resolveMediaUrl(url?: string | null): string | null {
    if (!url) {
        return null;
    }

    if (/^https?:\/\//i.test(url) || url.startsWith("data:") || url.startsWith("blob:")) {
        return url;
    }

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
    const normalizedBase = apiBaseUrl.replace(/\/+$/, "");
    const normalizedPath = url.startsWith("/") ? url : `/${url}`;

    return `${normalizedBase}${normalizedPath}`;
}
