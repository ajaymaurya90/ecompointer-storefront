import ProductDetailPage from "@/modules/products/pages/ProductDetailPage";

type Props = {
    params: Promise<{
        productId: string;
    }>;
};

export default async function Page({ params }: Props) {
    const { productId } = await params;

    return <ProductDetailPage productId={productId} />;
}