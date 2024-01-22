import { Dropdown, InfoIcon } from "@/components";
import { Currency } from "@/interfaces";
import { useCreatePaymentContext } from "../../contexts/create-payment";

interface Props {
    currencies: Currency[];
}

export const CreatePaymentBody = ({ currencies }: Props) => {
    const {
        isFormValid,
        isLoading,
        formValues,
        updateAmount,
        updateDescription,
        createOrder,
    } = useCreatePaymentContext();

    return (
        <div className="flex m-10 flex-col p-8 rounded-2xl text-[#002859] shadow border border-neutral-100 justify-center items-center w-full max-w-[675px] relative">
            <div className="text-3xl font-bold leading-[38px]">Crear pago</div>
            <div className="flex flex-col w-full gap-8 mt-8">
                <div className="flex flex-col">
                    <label className="text-sm font-bold leading-tight tracking-tight">
                        Importe a pagar
                    </label>
                    <input
                        value={formValues.amount}
                        onChange={(e) => updateAmount(e.target.value)}
                        name="amount"
                        className="px-3 py-4 rounded-md border border-slate-200 items-center gap-2 mt-1"
                        type="number"
                        placeholder="Añade importe a pagar"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="flex gap-1 items-center text-sm font-bold leading-tight tracking-tight">
                        <span>Seleccionar moneda</span>
                        <InfoIcon />
                    </label>
                    <Dropdown
                        title="Seleccionar criptomoneda"
                        options={currencies}
                    />
                    {!formValues.currency && (
                        <span className="font-semibold text-xs mt-1 text-red-600">
                            No se encontraron criptomoneda para sus filtros.
                        </span>
                    )}
                </div>
                <div className="flex flex-col">
                    <label className="flex gap-1 items-center text-sm font-bold leading-tight tracking-tight">
                        Concepto
                    </label>
                    <input
                        value={formValues.description}
                        onChange={(e) => updateDescription(e.target.value)}
                        name="description"
                        className="px-3 py-4 rounded-md border border-slate-200 items-center gap-2 mt-1"
                        type="text"
                        placeholder="Añade descripción del pago"
                    />
                </div>
                <button
                    onClick={() => createOrder()}
                    type="button"
                    className="px-6 py-[18px] transition-all bg-blue-700 rounded-md text-white font-semibold leading-tight disabled:bg-blue-200"
                    disabled={!isFormValid || isLoading}>
                    {isLoading ? "Cargando..." : "Continuar"}
                </button>
            </div>
        </div>
    );
};
