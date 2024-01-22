import { Divider } from "@/components";
import { formatDate } from "@/helpers";
import { DetailedOrder } from "@/interfaces";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
    orders: DetailedOrder[];
}

export default function OrdersPage({ orders }: Props) {
    const router = useRouter();

    if (!orders)
        return (
            <>
                <Head>
                    <title>Bitpay | Ordenes</title>
                    <meta
                        name="description"
                        content="Bitpay ver todas las órdenes"
                    />
                </Head>
                <section className="flex flex-col items-center justify-center md:mt-32 m-4 md:m-auto pb-4 max-w-[600px]">
                    <h1 className="font-semibold text-xl">
                        No se pudieron obtener las órdenes
                    </h1>
                    <Link
                        href={"/"}
                        className="border mt-10 py-2 px-3 rounded-md text-white bg-blue-600 hover:scale-105 active:scale-95 transition-all">
                        Regresar al home
                    </Link>
                </section>
            </>
        );

    return (
        <>
            <Head>
                <title>Bitpay | Orders</title>
                <meta
                    name="description"
                    content="Bitpay realizar cripto pago"
                />
            </Head>
            <section className="flex flex-col items-center justify-center md:mt-32 m-4 md:m-auto pb-4 max-w-[600px]">
                <div className="flex w-full justify-between">
                    <h1 className="font-bold text-2xl">Todas las órdenes</h1>
                    <Link
                        href={"/"}
                        className="border py-2 px-3 rounded-md text-white bg-blue-600 hover:scale-105 active:scale-95 transition-all">
                        Regresar al home
                    </Link>
                </div>
                <ul className="flex flex-col w-full mt-10 gap-16">
                    {orders.map((order, index) =>
                        order ? (
                            <li
                                key={order.identifier}
                                className="flex flex-col gap-1 border relative rounded-md p-3 px-4">
                                <div className="flex absolute w-full -top-7 left-0 justify-between font-semibold">
                                    <label className="">
                                        Orden #{index + 1}
                                    </label>
                                    <button
                                        onClick={() =>
                                            router.push(
                                                `/order/${order.identifier}`
                                            )
                                        }
                                        className="underline">
                                        Detalles
                                    </button>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-semibold">
                                        Fecha de creación:
                                    </span>
                                    <span>{formatDate(order.created_at)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-semibold">
                                        Fecha de expiración:
                                    </span>
                                    <span>
                                        {formatDate(order.expired_time)}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-semibold">
                                        Cantidad a pagar en cripto:
                                    </span>
                                    <span>
                                        {order.crypto_amount ?? "-"}{" "}
                                        <span className="font-semibold">
                                            {order.currency_id}
                                        </span>
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-semibold">
                                        Cantidad a pagar en Fiat:
                                    </span>
                                    <span>
                                        {order.fiat_amount}{" "}
                                        <span className="font-semibold">
                                            {order.fiat}
                                        </span>
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-semibold">
                                        Referencia:
                                    </span>
                                    <span>{order.reference ?? "-"}</span>
                                </div>
                                <Divider className="my-2" />
                                <div className="flex justify-between">
                                    <span className="font-semibold">
                                        Estado:
                                    </span>
                                    <span>{order.status}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-semibold">
                                        Cantidad confirmada:
                                    </span>
                                    <span>
                                        {order.confirmed_amount}{" "}
                                        <span className="font-semibold">
                                            {order.currency_id}
                                        </span>
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-semibold">
                                        Cantidad restante:
                                    </span>
                                    <span>
                                        {order.crypto_amount -
                                            order.confirmed_amount}{" "}
                                        <span className="font-semibold">
                                            {order.currency_id}
                                        </span>
                                    </span>
                                </div>
                                <div className="flex justify-between text-xl">
                                    <span className="font-semibold">
                                        Porcentaje pagado:
                                    </span>
                                    <span>{order.percentage}%</span>
                                </div>
                            </li>
                        ) : null
                    )}
                </ul>
            </section>
        </>
    );
}

export async function getServerSideProps() {
    const orders: DetailedOrder[] = await fetch(
        `https://payments.pre-bnvo.com/api/v1/orders/`,
        {
            headers: {
                "X-Device-Id": process.env.NEXT_PUBLIC_X_DEVICE_ID ?? "",
            },
        }
    )
        .then((res) => res.json())
        .catch((error) => console.log(error.message));

    return {
        props: {
            orders: orders ?? null,
        },
    };
}
