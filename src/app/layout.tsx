import "./globals.css";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { StorefrontBootstrapProvider } from "@/providers/StorefrontBootstrapProvider";
import TenantCartProvider from "@/providers/TenantCartProvider";

export const metadata: Metadata = {
  title: "Ecompointer Storefront",
  description: "Multi-tenant storefront powered by Ecompointer",
};

/**
 * ---------------------------------------------------------
 * ROOT LAYOUT
 * ---------------------------------------------------------
 * Purpose:
 * Reads the normalized tenant host forwarded by middleware
 * and passes it into storefront bootstrap provider.
 *
 * Notes:
 * - tenant resolution is now domain-first
 * - frontend no longer decides BO using hardcoded mapping
 * - backend remains the source of truth for host -> BO
 * ---------------------------------------------------------
 */
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requestHeaders = await headers();

  // Read only the middleware-normalized tenant host.
  const tenantHost = requestHeaders.get("x-tenant-host");

  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <StorefrontBootstrapProvider hostname={tenantHost}>
          <TenantCartProvider>{children}</TenantCartProvider>
        </StorefrontBootstrapProvider>
      </body>
    </html>
  );
}