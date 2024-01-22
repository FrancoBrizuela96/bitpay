import { Currency } from "@/interfaces";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowIcon, CloseIcon, SearchIcon, TickCircleIcon } from "@/components";
import { useCreatePaymentContext } from "@/contexts/create-payment";
import { filterCurrencies } from "@/helpers";

interface Props {
    title: string;
    options: Currency[];
    className?: string;
}

export const Dropdown = ({ options, title, className }: Props) => {
    const { formValues, updateCurrency } = useCreatePaymentContext();
    const [currencies, setCurrencies] = useState<Currency[]>(options);
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const [searchText, setSearchText] = useState<string>("");

    const handleOptionClick = (currency: Currency) => {
        updateCurrency(currency);
        setIsDropdownOpen(false);
    };

    const handleSearchText = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    useEffect(() => {
        const newCurrencies = filterCurrencies({
            amount: Number(formValues.amount),
            currencies: options,
            searchText,
        });

        if (
            !newCurrencies.some(
                (currency) => currency.symbol === formValues.currency?.symbol
            )
        ) {
            updateCurrency(newCurrencies[0]);
        }

        setCurrencies(newCurrencies);
    }, [searchText, formValues.amount, formValues.currency?.symbol]);

    useEffect(() => {
        updateCurrency(currencies[0]);
    }, [currencies, updateCurrency]);

    if (!isDropdownOpen) {
        return (
            <div
                onClick={() => setIsDropdownOpen(true)}
                className={`flex items-center justify-between px-3 py-4 rounded-md border border-slate-200 gap-2 mt-1 cursor-pointer overflow-hidden ${className}`}>
                <div className="flex items-center gap-2">
                    {formValues.currency?.image && (
                        <>
                            <Image
                                src={formValues.currency.image}
                                height={30}
                                width={30}
                                alt={formValues.currency.name}
                            />
                            <span className="truncate">
                                {formValues.currency.name}
                            </span>
                        </>
                    )}
                </div>
                <ArrowIcon />
            </div>
        );
    }

    return (
        <div className="absolute top-0 left-0 min-h-full h-fit border shadow border-neutral-100 w-full flex flex-col p-6 gap-2 rounded-2xl bg-white">
            <div className="flex items-center justify-between">
                <h2 className="font-bold leading-5 text-[18px]">{title}</h2>
                <button onClick={() => setIsDropdownOpen(false)}>
                    <CloseIcon />
                </button>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 mt-1 rounded-md border border-slate-200">
                <SearchIcon />
                <input
                    value={searchText}
                    onChange={handleSearchText}
                    className="items-center gap-2 py-1 w-full outline-none"
                    placeholder="Buscar"
                    type="text"
                />
            </div>
            <div>
                {currencies.length > 0 ? (
                    currencies.map((currency) => (
                        <div
                            key={currency.symbol}
                            onClick={() => handleOptionClick(currency)}
                            className="flex items-center cursor-pointer mt-5 px-1 rounded-md hover:bg-gray-100">
                            <Image
                                src={currency.image}
                                height={40}
                                width={40}
                                alt={currency.name}
                            />
                            <div className="py-3 flex w-full justify-between items-center pl-2">
                                <div className="flex flex-col">
                                    <p className="font-bold text-[#002859] leading-5 text-sm">
                                        {currency.name}
                                    </p>
                                    <p className="text-[#647184] leading-4 text-xs font-light">
                                        {currency.symbol}
                                    </p>
                                </div>
                                {formValues.currency &&
                                formValues.currency.symbol ===
                                    currency.symbol ? (
                                    <TickCircleIcon />
                                ) : (
                                    <ArrowIcon className="-rotate-90" />
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center">
                        <h3 className="font-semibold text-sm mt-6">
                            No se encontraron criptomoneda para sus filtros.
                        </h3>
                        <span className="text-xs">
                            Por favor revisa tu búsqueda y monto ingresado
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};
