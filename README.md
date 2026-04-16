# EcomPointer Storefront

Next.js public storefront for EcomPointer Brand Owners.

This app is the customer-facing storefront. It resolves the current storefront by request host, loads public Brand Owner storefront settings from the backend, displays products, manages a tenant-isolated cart, accepts checkout orders, and lets storefront customers view their order history.

## Workspace Role

EcomPointer is split into three projects:

- `ecompointer-backend`: API, Prisma schema, PostgreSQL data model, uploads, and business rules.
- `ecompointer-frontend`: Brand Owner admin dashboard.
- `ecompointer-storefront`: Public customer storefront.

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS v4
- Zustand
- Axios

## Main Features

### Tenant Bootstrap

- Middleware reads the incoming host.
- Host is forwarded as `x-tenant-host`.
- Root layout passes the host into `StorefrontBootstrapProvider`.
- Provider calls backend `/storefront/bootstrap/resolve/by-host`.
- Backend resolves `BrandOwnerStorefrontDomain`.
- Storefront uses the returned Brand Owner id for public products, categories, checkout, and customer auth.

### Public Storefront

- Home page with Brand Owner storefront branding
- Storefront header and footer
- Hero section driven by storefront settings
- Support email/phone display
- Currency and theme metadata display

### Product Browsing

- Product listing
- Search
- Page size and pagination
- Category sidebar
- Product detail page
- Product gallery
- Variant selector
- Add-to-cart flow

### Cart

- Zustand cart state
- Tenant-specific localStorage persistence
- Quantity updates with stock bounds
- Cart summary and empty state

### Checkout

- Guest checkout payload
- Customer details
- Billing and shipping address snapshots
- Same-as-billing option
- Order summary
- Storefront order creation through backend
- Cart clear after successful order

### Storefront Customer Auth

- Customer registration
- Customer login
- Local access token storage
- Session restoration through `/storefront/auth/me`
- Account order list
- Account order detail

## Environment

Create `.env.local` in this project:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Development

Install dependencies:

```bash
npm install
```

Run the storefront:

```bash
npm run dev
```

The app runs on:

```text
http://localhost:3002
```

For local custom domains, map hostnames such as these to `127.0.0.1` in `/etc/hosts`:

```text
127.0.0.1 ayodoya.local
127.0.0.1 myshop.local
127.0.0.1 demo.local
```

Then open:

```text
http://ayodoya.local:3002
```

The backend must have a matching active `BrandOwnerStorefrontDomain` row for the host.

## Scripts

```bash
npm run dev    # Next dev server on port 3002
npm run build  # Production build
npm run start  # Start production server
npm run lint   # ESLint
```

## Backend API Surface

The storefront consumes these backend API groups:

- `/storefront/bootstrap/resolve/by-host`
- `/storefront/categories/brand-owner/:brandOwnerId`
- `/storefront/products/brand-owner/:brandOwnerId`
- `/storefront/products/brand-owner/:brandOwnerId/:productId`
- `/storefront/auth/register/brand-owner/:brandOwnerId`
- `/storefront/auth/login/brand-owner/:brandOwnerId`
- `/storefront/auth/me`
- `/storefront/orders/brand-owner/:brandOwnerId`
- `/storefront/orders/my`
- `/storefront/orders/my/:orderId`

## Current Status

The storefront has the complete first customer journey in place: resolve storefront, browse products, add variants to cart, checkout, register/login, and view order history.

Areas that should be cleaned up next:

- Rewrite or remove the older unused tenant helper in `src/lib/tenant.ts`.
- Store customer auth tokens per tenant instead of using one global `storefront_access_token` key.
- Reflect `isGuestCheckoutEnabled` and `isCustomerRegistrationEnabled` directly in checkout/auth UI.
- Replace the ignored JSX return inside checkout submit loading guard with a proper disabled/loading state.
- Reduce `any` usage in error handlers and account types.
- Consider using `next/image` or an intentional image policy for storefront product images.
- Apply storefront theme settings more broadly across pages, not only in the hero/header content.

## Related Projects

- Backend API: `../ecompointer-backend`
- Admin dashboard: `../ecompointer-frontend`
