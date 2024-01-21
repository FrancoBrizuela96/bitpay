import { ErrorIcon } from "@/components";
import { useRouter } from "next/router";
import Head from "next/head";

export default function OrderFailedPage() {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>Bitpay | Orden fallida </title>
                <meta name="description" content="Bitpay orden fallida" />
            </Head>
            <div className="mt-56 pb-4 max-w-[410px] mx-auto">
                <div className="flex flex-col items-center justify-center border border-neutral-100 m-3 pb-8 text-center shadow rounded-2xl">
                    <ErrorIcon className="mt-12" />
                    <h1 className="mt-4 text-xl font-bold leading-6 text-[#002859]">
                        ¡Pago cancelado!
                    </h1>
                    <p className="text-slate-500 mt-4 p-3">
                        Lo sentimos, esta orden a caducado o sido cancelada, por
                        favor intenta crear una nueva orden!
                    </p>
                    <button
                        onClick={() => router.push("/")}
                        className="bg-[#035AC5] w-10/12 px-6 py-4 rounded-md leading-tight mt-8 text-white">
                        Crear nuevo pago
                    </button>
                </div>
            </div>
        </>
    );
}
