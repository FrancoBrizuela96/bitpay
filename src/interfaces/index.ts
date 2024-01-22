export interface Currency {
    symbol: string;
    name: string;
    min_amount: string;
    max_amount: string;
    image: string;
    blockchain: string;
}

export interface CreatePaymentContextProps {
    isFormValid: boolean;
    isLoading: boolean;
    formValues: CreatePaymentForm;
    updateAmount: (value: number) => void;
    updateDescription: (description: string) => void;
    updateCurrency: (currency: Currency) => void;
    createOrder: () => Promise<void>;
}

export interface CreatePaymentForm {
    amount: number;
    currency: Currency | null;
    description: string;
}

export interface CreateOrderResponse {
    address: string;
    expected_input_amount: number;
    fiat: string;
    identifier: string;
    input_currency: string;
    language: string;
    notes: string | null;
    payment_uri: string;
    rate: number;
    reference: string;
    tag_memo: string;
    web_url: string;
}

export interface DetailedOrder {
    address: string;
    balance_based: string;
    confirmed_amount: number;
    created_at: string;
    crypto_amount: number;
    currency_id: string;
    edited_at: string;
    expired_time: string;
    fiat: string;
    fiat_amount: number;
    good_fee: boolean;
    identifier: string;
    internal_data: string;
    language: string;
    merchant_device: string;
    merchant_device_id: number;
    notes: any[] | null;
    percentage: number;
    rbf: boolean;
    received_amount: number;
    reference: string;
    safe: boolean;
    status: string;
    tag_memo: string;
    transactions: [];
    unconfirmed_amount: number;
    url_ko: string;
    url_ok: string;
    url_standby: string;
}

export interface WindowWithEthereum extends Window {
    ethereum?: any;
}

export interface CreateWeb3PaymentContextProps {
    requestWeb3Payment: ({
        destinationAddress,
        amountToSend,
    }: RequestWeb3PaymentProps) => Promise<void>;
}

export interface RequestWeb3PaymentProps {
    destinationAddress: string;
    amountToSend: string;
}
