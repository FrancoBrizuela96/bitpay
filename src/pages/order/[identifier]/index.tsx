import { OrderPayment } from "@/components/order/OrderPayment";
import { OrderSummary } from "@/components/order/OrderSummary";
import { CreateWeb3PaymentContextProvider } from "@/contexts/order-web3-payment";
import useWebSocket from "@/hooks/useWebSocket";
import { Currency, DetailedOrder } from "@/interfaces";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Props {
    order: DetailedOrder;
    currency: Currency;
}

export default function OrderPage({ order, currency }: Props) {
    const [currentOrder, setCurrentOrder] = useState<DetailedOrder>(order);
    const router = useRouter();
    const { identifier } = router.query;

    useEffect(() => {
        if (currentOrder) {
            if (currentOrder.status === "OC" || currentOrder.status === "EX") {
                router.push(currentOrder.url_ko ?? "/order/failed");
            } else if (
                currentOrder.status === "CO" ||
                currentOrder.status === "AC"
            ) {
                router.push(currentOrder.url_ok ?? "/order/completed");
            }
        }
    }, [currentOrder, router]);

    const handleWebSocketMessage = (message: string) => {
        const updatedOrder = JSON.parse(message);
        setCurrentOrder(updatedOrder);
    };

    useWebSocket(
        `wss://payments.pre-bnvo.com/ws/${identifier}`,
        handleWebSocketMessage
    );

    return (
        <>
            <Head>
                <title>Bitpay | Orden</title>
                <meta
                    name="description"
                    content="Bitpay realizar cripto pago"
                />
            </Head>
            <CreateWeb3PaymentContextProvider>
                <section className="flex items-center justify-center md:mt-32 m-4 md:m-10 pb-4">
                    <div className="grid grid-cols-1 w-full md:grid-cols-2 gap-8 max-w-[1200px]">
                        <OrderSummary
                            order={currentOrder}
                            currency={currency}
                        />
                        <OrderPayment
                            order={currentOrder}
                            currency={currency}
                        />
                    </div>
                </section>
            </CreateWeb3PaymentContextProvider>
        </>
    );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { params } = context;
    const identifier = params?.identifier;

    const order: DetailedOrder[] = await fetch(
        `https://payments.pre-bnvo.com/api/v1/orders/info/${identifier}`,
        {
            headers: {
                "X-Device-Id": process.env.NEXT_PUBLIC_X_DEVICE_ID ?? "",
            },
        }
    )
        .then((res) => res.json())
        .catch((error) => console.log(error.message));

    if (!order) {
        return {
            notFound: true,
        };
    }

    const currencies: Currency[] = await fetch(
        "https://payments.pre-bnvo.com/api/v1/currencies",
        {
            headers: {
                "X-Device-Id": process.env.NEXT_PUBLIC_X_DEVICE_ID ?? "",
            },
        }
    )
        .then((res) => res.json())
        .catch((error) => console.log(error));

    const selectedCurrency = currencies.find(
        (currency) => currency.symbol === order[0].currency_id
    );

    return {
        props: {
            order: order[0],
            currency: selectedCurrency,
        },
    };
}
