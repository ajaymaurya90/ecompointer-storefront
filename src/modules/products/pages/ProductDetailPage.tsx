"use client";

/**
 * ---------------------------------------------------------
 * PRODUCT DETAIL PAGE
 * ---------------------------------------------------------
 * Purpose:
 * Fetches and renders a storefront product detail page with
 * gallery, variant selection, and add-to-cart action.
 * ---------------------------------------------------------
 */

import { useEffect, useMemo, useState } from "react";
import StorefrontShell from "@/modules/storefront/components/StorefrontShell";
import ProductGallery from "@/modules/products/components/ProductGallery";
import ProductVariantSelector from "@/modules/products/components/ProductVariantSelector";
import AddToCartCard from "@/modules/products/components/AddToCartCard";
import ProductDetailSkeleton from "@/modules/products/components/ProductDetailSkeleton";
import { getStorefrontProductById } from "@/modules/products/api/productApi";
import { useStorefrontBootstrapContext } from "@/providers/StorefrontBootstrapProvider";
import { useCartStore } from "@/modules/cart/store/cartStore";
import type {
    StorefrontProductDetail,
    StorefrontProductVariant,
} from "@/modules/products/types/product";

type Props = {
    productId: string;
};

export default function ProductDetailPage({ productId }: Props) {
    const { bootstrap } = useStorefrontBootstrapContext();
    const brandOwnerId = bootstrap?.brandOwner?.id ?? null;
    const addItem = useCartStore((state) => state.addItem);

    const [product, setProduct] = useState<StorefrontProductDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [selectedVariantId, setSelectedVariantId] = useState("");
    const [quantity, setQuantity] = useState(1);

    // Load selected storefront product detail using BO context and route id.
    useEffect(() => {
        async function loadProduct() {
            if (!brandOwnerId) {
                setError("Brand owner id is missing");
                setIsLoading(false);
                return;
            }

            try {
                setIsLoading(true);
                setError(null);

                const data = await getStorefrontProductById(brandOwnerId, productId);
                setProduct(data);

                if (data.variants.length) {
                    setSelectedVariantId(data.variants[0].id);
                }
            } catch (err: any) {
                setError(
                    err?.response?.data?.message ||
                    err?.message ||
                    "Failed to load product"
                );
            } finally {
                setIsLoading(false);
            }
        }

        void loadProduct();
    }, [brandOwnerId, productId]);

    // Resolve currently selected variant for gallery and purchase card.
    const selectedVariant = useMemo<StorefrontProductVariant | null>(() => {
        if (!product) return null;
        return (
            product.variants.find((variant) => variant.id === selectedVariantId) ||
            null
        );
    }, [product, selectedVariantId]);

    // Keep quantity within safe range whenever selected variant changes.
    useEffect(() => {
        if (!selectedVariant) {
            setQuantity(1);
            return;
        }

        setQuantity((prev) => {
            if (prev < 1) return 1;
            if (prev > selectedVariant.stock) return Math.max(1, selectedVariant.stock);
            return prev;
        });
    }, [selectedVariant]);

    // Add selected product variant to persistent storefront cart.
    function handleAddToCart() {
        if (!product || !selectedVariant || !brandOwnerId) {
            return;
        }

        const variantLabel =
            [selectedVariant.size, selectedVariant.color]
                .filter(Boolean)
                .join(" / ") || selectedVariant.sku;

        const primaryImage =
            selectedVariant.media[0]?.url || product.media[0]?.url || null;

        addItem({
            productId: product.id,
            productVariantId: selectedVariant.id,
            brandOwnerId,
            productName: product.name,
            productCode: product.productCode,
            sku: selectedVariant.sku,
            variantLabel,
            image: primaryImage,
            price: selectedVariant.retailGross,
            taxRate: selectedVariant.taxRate,
            stock: selectedVariant.stock,
            quantity,
        });

        alert("Product added to cart");
    }

    return (
        <StorefrontShell>
            <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {error ? (
                    <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                        {error}
                    </div>
                ) : null}

                {isLoading ? (
                    <ProductDetailSkeleton />
                ) : product ? (
                    <div className="grid grid-cols-1 gap-8 xl:grid-cols-12">
                        <div className="space-y-6 xl:col-span-7">
                            <ProductGallery
                                productMedia={product.media}
                                selectedVariant={selectedVariant}
                            />

                            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                                    {product.brand?.name || "Brand"}
                                </div>

                                <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                                    {product.name}
                                </h1>

                                <div className="mt-3 text-sm text-slate-500">
                                    Product Code: {product.productCode}
                                </div>

                                <p className="mt-5 whitespace-pre-line text-sm leading-7 text-slate-600">
                                    {product.description ||
                                        "This product is available in multiple variants for storefront purchase."}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-6 xl:col-span-5">
                            <ProductVariantSelector
                                variants={product.variants}
                                selectedVariantId={selectedVariantId}
                                onChange={setSelectedVariantId}
                            />

                            <AddToCartCard
                                product={product}
                                selectedVariant={selectedVariant}
                                quantity={quantity}
                                onQuantityChange={setQuantity}
                                onAddToCart={handleAddToCart}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
                        <h3 className="text-lg font-semibold text-slate-900">
                            Product not found
                        </h3>
                        <p className="mt-2 text-sm text-slate-500">
                            The requested product could not be loaded for this storefront.
                        </p>
                    </div>
                )}
            </section>
        </StorefrontShell>
    );
}