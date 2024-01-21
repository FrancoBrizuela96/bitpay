import { Divider, TickCircleIcon } from "@/components";
import { formatDate } from "@/helpers";
import { Currency, DetailedOrder } from "@/interfaces";
import Image from "next/image";

interface Props {
    order: DetailedOrder;
    currency: Currency;
}

export const OrderSummary = ({ order, currency }: Props) => {
    return (
        <div className="text-[#002859]">
            <h3 className="font-bold leading-5 text-xl">Resumen del pedido</h3>
            <div className="flex flex-col w-full bg-[#F9FAFC] mt-6 p-8 rounded-2xl">
                <div className="flex text-lg font-bold leading-5">
                    <span className="flex-1">Importe:</span>
                    <span>
                        {order.fiat_amount - order.received_amount} {order.fiat}
                    </span>
                </div>
                <Divider className="mt-5 mb-10" />
                <div className="flex text-md font-bold leading-5">
                    <span className="flex-1">Moneda seleccionada:</span>
                    <div className="flex items-center gap-1">
                        <Image
                            src={currency.image}
                            height={30}
                            width={30}
                            alt={currency.name}
                        />
                        <span className="truncate">{currency.name}</span>
                    </div>
                </div>
                <Divider className="mt-5 mb-8" />
                <div className="flex text-md font-bold leading-5 gap-2">
                    <span className="flex-1">Comercio:</span>
                    <span className="font-semibold flex items-center gap-1 break-words truncate text-center">
                        <TickCircleIcon /> {order.merchant_device}
                    </span>
                </div>
                <div className="flex text-md font-bold leading-5 mt-8">
                    <span className="flex-1">Fecha:</span>
                    <span className="font-semibold">
                        {formatDate(order.created_at)}
                    </span>
                </div>
                <Divider className="mt-5 mb-5" />
                <div className="flex text-md font-bold leading-5 px-3">
                    <span className="flex-1">Concepto:</span>
                    <span className="font-semibold">{order.reference}</span>
                </div>
            </div>
        </div>
    );
};
