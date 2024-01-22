import { CreatePaymentContainer } from "@/components/create-payment";

import { Currency } from "@/interfaces";
import Head from "next/head";

interface Props {
    currencies: Currency[];
}

export default function Home({ currencies }: Props) {
    return (
        <>
            <Head>
                <title>Bitpay | Home </title>
                <meta
                    name="description"
                    content="Genera tus pagos con criptomonedas"
                />
            </Head>
            <main
                className={`flex flex-col items-center justify-between p-4 sm:p-24`}>
                {currencies ? (
                    <CreatePaymentContainer currencies={currencies} />
                ) : (
                    <h1>No se pudieron obtener las criptomonedas</h1>
                )}
            </main>
        </>
    );
}

export async function getServerSideProps() {
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

    return {
        props: {
            currencies: currencies ?? null,
        },
    };
}
