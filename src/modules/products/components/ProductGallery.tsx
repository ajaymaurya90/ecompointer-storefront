"use client";

/**
 * ---------------------------------------------------------
 * PRODUCT GALLERY
 * ---------------------------------------------------------
 * Purpose:
 * Displays product media gallery with selectable preview.
 * ---------------------------------------------------------
 */

import { useMemo, useState } from "react";
import type {
    StorefrontProductMedia,
    StorefrontProductVariant,
} from "@/modules/products/types/product";

type Props = {
    productMedia: StorefrontProductMedia[];
    selectedVariant: StorefrontProductVariant | null;
};

export default function ProductGallery({
    productMedia,
    selectedVariant,
}: Props) {
    const mergedMedia = useMemo(() => {
        const variantMedia = selectedVariant?.media || [];
        return variantMedia.length ? variantMedia : productMedia;
    }, [productMedia, selectedVariant]);

    const [selectedIndex, setSelectedIndex] = useState(0);

    const activeMedia = mergedMedia[selectedIndex] || mergedMedia[0] || null;

    return (
        <div className="space-y-4">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <div className="aspect-[4/3] w-full bg-slate-100">
                    {activeMedia ? (
                        <img
                            src={activeMedia.url}
                            alt={activeMedia.altText || "Product image"}
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-sm text-slate-400">
                            No image available
                        </div>
                    )}
                </div>
            </div>

            {mergedMedia.length > 1 ? (
                <div className="grid grid-cols-4 gap-3 sm:grid-cols-5">
                    {mergedMedia.map((media, index) => (
                        <button
                            key={media.id}
                            type="button"
                            onClick={() => setSelectedIndex(index)}
                            className={`overflow-hidden rounded-2xl border bg-white ${index === selectedIndex
                                    ? "border-slate-900"
                                    : "border-slate-200"
                                }`}
                        >
                            <div className="aspect-square w-full bg-slate-100">
                                <img
                                    src={media.url}
                                    alt={media.altText || "Thumbnail"}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        </button>
                    ))}
                </div>
            ) : null}
        </div>
    );
}