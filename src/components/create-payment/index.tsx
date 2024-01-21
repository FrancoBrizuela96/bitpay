import { CreatePaymentContextProvider } from "@/contexts/create-payment";
import { Currency } from "@/interfaces";
import { CreatePaymentBody } from "@/components/create-payment/CreatePaymentBody";

interface Props {
    currencies: Currency[];
}

export const CreatePaymentContainer = ({ currencies }: Props) => {
    return (
        <CreatePaymentContextProvider>
            <CreatePaymentBody currencies={currencies} />
        </CreatePaymentContextProvider>
    );
};
