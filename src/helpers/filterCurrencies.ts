import { Currency } from "@/interfaces";

interface Props {
    currencies: Currency[];
    searchText: string;
    amount: number;
}

export const filterCurrencies = ({
    currencies,
    searchText,
    amount,
}: Props): Currency[] => {
    const currenciesByAmount =
        amount <= 0
            ? currencies
            : currencies.filter(
                  (currency) =>
                      amount >= Number(currency.min_amount) &&
                      amount <= Number(currency.max_amount)
              );

    const finalCurrencies = currenciesByAmount.filter((currency) =>
        currency.name
            .toLocaleLowerCase()
            .includes(searchText.toLocaleLowerCase())
    );

    return finalCurrencies;
};
