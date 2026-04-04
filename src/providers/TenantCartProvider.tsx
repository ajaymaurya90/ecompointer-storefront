"use client";

/**
 * ---------------------------------------------------------
 * TENANT CART PROVIDER
 * ---------------------------------------------------------
 * Purpose:
 * Keeps cart persistence isolated per resolved Brand Owner.
 * Cart waits until bootstrap is loaded and then uses the
 * resolved BO id from backend.
 * ---------------------------------------------------------
 */

import { useEffect, useRef } from "react";
import { useStorefrontBootstrapContext } from "@/providers/StorefrontBootstrapProvider";
import { useCartStore } from "@/modules/cart/store/cartStore";
import {
    loadTenantCartItems,
    saveTenantCartItems,
} from "@/lib/cartStorage";

type Props = {
    children: React.ReactNode;
};

export default function TenantCartProvider({ children }: Props) {
    const { bootstrap } = useStorefrontBootstrapContext();

    const brandOwnerId = bootstrap?.brandOwner?.id || null;

    const items = useCartStore((state) => state.items);
    const setItems = useCartStore((state) => state.setItems);

    const hasLoadedTenantCartRef = useRef(false);
    const activeTenantRef = useRef<string | null>(null);

    useEffect(() => {
        if (!brandOwnerId) {
            return;
        }

        const tenantChanged = activeTenantRef.current !== brandOwnerId;

        if (tenantChanged) {
            activeTenantRef.current = brandOwnerId;
            hasLoadedTenantCartRef.current = false;
        }

        if (!hasLoadedTenantCartRef.current) {
            const tenantItems = loadTenantCartItems(brandOwnerId);
            setItems(tenantItems);
            hasLoadedTenantCartRef.current = true;
        }
    }, [brandOwnerId, setItems]);

    useEffect(() => {
        if (!brandOwnerId || !hasLoadedTenantCartRef.current) {
            return;
        }

        saveTenantCartItems(brandOwnerId, items);
    }, [brandOwnerId, items]);

    return <>{children}</>;
}