import { useState } from "react";
import { TimerIcon, CopyIcon, WarningIcon } from "@/components";
import { Currency, DetailedOrder } from "@/interfaces";
import { handleCopyToClipboard } from "@/helpers";
import clsx from "clsx";
import QRCode from "react-qr-code";
import useCountdown from "@/hooks/useCountdown";

interface Props {
    order: DetailedOrder;
    currency: Currency;
}

export const OrderPayment = ({ order, currency }: Props) => {
    const [paymentMethodSelected, setPaymentMethodSelected] = useState<
        "Smart QR" | "Web 3"
    >("Smart QR");
    const { timeRemaining } = useCountdown({
        endDate: order.expired_time,
    });
    const cryptoAmountLeft = order.crypto_amount - order.confirmed_amount;

    return (
        <div className="text-[#002859]">
            <h3 className="font-bold leading-5 text-xl">Realiza el pago</h3>
            <div className="flex flex-col items-center w-full shadow border gap-8 border-neutral-100 rounded-2xl mt-6 p-8">
                <div className="flex items-center justify-center gap-2 text-xs font-bold leading-5">
                    <TimerIcon />
                    <span>{timeRemaining}</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-xs leading-5 mt-2">
                    <button
                        onClick={() => setPaymentMethodSelected("Smart QR")}
                        className={clsx(
                            "px-3 py-1 rounded-2xl transition-all text-base",
                            paymentMethodSelected === "Smart QR"
                                ? "bg-blue-700 text-white"
                                : "bg-slate-100"
                        )}>
                        Smart QR
                    </button>
                    <button
                        onClick={() => setPaymentMethodSelected("Web 3")}
                        className={clsx(
                            "px-3 py-1 rounded-2xl transition-all text-base",
                            paymentMethodSelected === "Web 3"
                                ? "bg-blue-700 text-white"
                                : "bg-slate-100"
                        )}>
                        Web 3
                    </button>
                </div>
                <QRCode
                    className="h-48 w-48 rounded-sm shadow-2xl"
                    value="https://www.instagram.com/aldygallardo/?hl=fr"
                />
                <div className="flex flex-col gap-3 items-center">
                    <p className="flex items-center gap-2">
                        Enviar{" "}
                        <strong className="sm:text-xl">
                            {cryptoAmountLeft} {currency.symbol}
                        </strong>
                        <button
                            onClick={() =>
                                handleCopyToClipboard(String(cryptoAmountLeft))
                            }>
                            <CopyIcon className="hover:scale-105 active:scale-95" />
                        </button>
                    </p>
                    <p className="flex break-words relative text-center items-baseline">
                        <span className="max-w-96 break-all">
                            {order.address}
                        </span>
                        <button
                            onClick={() =>
                                handleCopyToClipboard(order.address)
                            }>
                            <CopyIcon className="absolute -right-6 top-0.5 hover:scale-105 active:scale-95" />
                        </button>
                    </p>
                    {order?.tag_memo && (
                        <div className="flex items-center break-all gap-2 mt-2 font-semibold text-xs">
                            <WarningIcon />
                            <p>Etiqueta de destino: {order.tag_memo}</p>
                            <button
                                onClick={() =>
                                    handleCopyToClipboard(order.tag_memo)
                                }>
                                <CopyIcon className="hover:scale-105 active:scale-95" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};