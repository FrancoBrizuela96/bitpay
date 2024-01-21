import Link from "next/link";

export default function Custom404() {
    return (
        <div className="mt-32 flex flex-col gap-4 items-center justify-center">
            <span className="font-bold antialiased text-7xl">404</span>
            <p className="text-lg font-semibold">
                Whoops, no hemos encontrado la búsqueda
            </p>
            <p className="font-semibold">
                Por favor intenta regresando al Home
            </p>
            <Link
                href={"/"}
                className="border py-2 px-3 rounded-md text-white bg-blue-600 hover:scale-105 active:scale-95 transition-all">
                Regresar al home
            </Link>
        </div>
    );
}
