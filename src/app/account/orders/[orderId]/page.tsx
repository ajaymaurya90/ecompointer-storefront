import AccountOrderDetailPage from "@/modules/account/pages/AccountOrderDetailPage";

type Props = {
    params: Promise<{
        orderId: string;
    }>;
};

export default async function Page({ params }: Props) {
    const { orderId } = await params;

    return <AccountOrderDetailPage orderId={orderId} />;
}