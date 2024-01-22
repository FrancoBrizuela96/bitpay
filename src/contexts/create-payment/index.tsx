import {
    CreateOrderResponse,
    CreatePaymentContextProps,
    CreatePaymentForm,
    Currency,
} from "@/interfaces";
import { useRouter } from "next/router";
import React, {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
} from "react";

const CreatePaymentContext = createContext<
    CreatePaymentContextProps | undefined
>(undefined);

export const CreatePaymentContextProvider: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    const [formValues, setFormValues] = useState<CreatePaymentForm>({
        amount: "",
        currency: {
            blockchain: "",
            image: "",
            max_amount: "",
            min_amount: "",
            name: "",
            symbol: "",
        },
        description: "",
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    const isFormValid = useMemo(() => {
        if (
            Number(formValues.amount) > 0 &&
            formValues.currency &&
            formValues.description
        ) {
            return true;
        }

        return false;
    }, [formValues]);

    const updateAmount = useCallback((value: string) => {
        setFormValues((prev) => ({
            ...prev,
            amount: value,
        }));
    }, []);

    const updateDescription = useCallback((description: string) => {
        setFormValues((prev) => ({
            ...prev,
            description,
        }));
    }, []);

    const updateCurrency = useCallback((currency: Currency) => {
        setFormValues((prev) => ({
            ...prev,
            currency,
        }));
    }, []);

    const createOrder = async () => {
        const { amount, currency, description } = formValues;
        const formData = new FormData();
        setIsLoading(true);

        formData.append("expected_output_amount", String(amount));
        formData.append("input_currency", currency?.symbol ?? "");
        formData.append("reference", description);
        formData.append(
            "merchant_urlko",
            `${process.env.NEXT_PUBLIC_BASE_URL}/order/failed`
        );
        formData.append(
            "merchant_urlok",
            `${process.env.NEXT_PUBLIC_BASE_URL}/order/completed`
        );

        const response: CreateOrderResponse = await fetch(
            "https://payments.pre-bnvo.com/api/v1/orders/",
            {
                method: "POST",
                headers: {
                    "X-Device-Id": process.env.NEXT_PUBLIC_X_DEVICE_ID ?? "",
                },
                body: formData,
            }
        )
            .then((res) => res.json())
            .catch((error) => {
                setIsLoading(false);
                console.log(error);
            });

        if (response) {
            router.push(`/order/${response.identifier}`);
        }
    };

    const contextValue: CreatePaymentContextProps = {
        isFormValid,
        isLoading,
        formValues,
        updateAmount,
        updateDescription,
        updateCurrency,
        createOrder,
    };

    return (
        <CreatePaymentContext.Provider value={contextValue}>
            {children}
        </CreatePaymentContext.Provider>
    );
};

export const useCreatePaymentContext = (): CreatePaymentContextProps => {
    const context = useContext(CreatePaymentContext);

    if (!context) {
        throw new Error(
            "useCreatePaymentContext must be used within a CreatePaymentContextProvider"
        );
    }

    return context;
};
