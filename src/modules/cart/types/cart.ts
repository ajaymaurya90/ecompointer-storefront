/**
 * ---------------------------------------------------------
 * CART TYPES
 * ---------------------------------------------------------
 * Purpose:
 * Type definitions for storefront cart items and summary.
 * ---------------------------------------------------------
 */

export interface CartItem {
    productId: string;
    productVariantId: string;
    brandOwnerId: string;
    productName: string;
    productCode: string;
    sku: string;
    variantLabel: string;
    image?: string | null;
    price: number;
    taxRate: number;
    stock: number;
    quantity: number;
}

export interface CartSummary {
    itemCount: number;
    totalQuantity: number;
    subtotal: number;
    taxAmount: number;
    grandTotal: number;
}