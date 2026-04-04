import "./globals.css";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { StorefrontBootstrapProvider } from "@/providers/StorefrontBootstrapProvider";
import TenantCartProvider from "@/providers/TenantCartProvider";

export const metadata: Metadata = {
  title: "Ecompointer Storefront",
  description: "Multi-tenant storefront powered by Ecompointer",
};

function normalizeHost(host?: string | null) {
  if (!host) {
    return null;
  }

  return host.trim().toLowerCase();
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") || requestHeaders.get("host");
  const normalizedHost = normalizeHost(host);

  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <StorefrontBootstrapProvider hostname={normalizedHost}>
          <TenantCartProvider>{children}</TenantCartProvider>
        </StorefrontBootstrapProvider>
      </body>
    </html>
  );
}