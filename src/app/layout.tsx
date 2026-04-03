/**
 * ---------------------------------------------------------
 * ROOT LAYOUT
 * ---------------------------------------------------------
 * Purpose:
 * Wraps the storefront app with bootstrap provider so BO
 * storefront settings are available globally.
 * ---------------------------------------------------------
 */

import "./globals.css";
import type { Metadata } from "next";
import { StorefrontBootstrapProvider } from "@/providers/StorefrontBootstrapProvider";

export const metadata: Metadata = {
  title: "Ecompointer Storefront",
  description: "Multi-tenant storefront powered by Ecompointer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Temporary BO id until domain-based resolution is added.
  const brandOwnerId =
    process.env.NEXT_PUBLIC_BRAND_OWNER_ID || null;

  return (
    <html lang="en">
      <body>
        <StorefrontBootstrapProvider brandOwnerId={brandOwnerId}>
          {children}
        </StorefrontBootstrapProvider>
      </body>
    </html>
  );
}