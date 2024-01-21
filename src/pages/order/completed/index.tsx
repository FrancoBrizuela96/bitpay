import { SuccessIcon } from "@/components";
import { useRouter } from "next/router";
import Head from "next/head";

export default function OrderCompletedPage() {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>Bitpay | Orden exitosa </title>
                <meta name="description" content="Bitpay orden exitosa" />
            </Head>
            <div className="mt-56 pb-4 max-w-[410px] mx-auto">
                <div className="flex flex-col items-center justify-center border border-neutral-100 m-3 pb-8 text-center shadow rounded-2xl">
                    <SuccessIcon className="mt-12" />
                    <h1 className="mt-4 text-xl font-bold leading-6 text-[#002859]">
                        ¡Pago completado!
                    </h1>
                    <p className="text-slate-500 mt-4 px-3">
                        Muchas gracias por usar el servicio,
                    </p>
                    <p className="text-slate-500 px-3">
                        puedes regresar al Home para crear un nuevo pago!
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
