import {
    CreateWeb3PaymentContextProps,
    RequestWeb3PaymentProps,
    WindowWithEthereum,
} from "@/interfaces";
import React, { createContext, useContext, useState } from "react";
import Web3 from "web3";

const CreateWeb3PaymentContext = createContext<
    CreateWeb3PaymentContextProps | undefined
>(undefined);

export const CreateWeb3PaymentContextProvider: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    const requestWeb3Payment = async ({
        destinationAddress,
        amountToSend,
    }: RequestWeb3PaymentProps) => {
        if ((window as WindowWithEthereum).ethereum) {
            const web3 = new Web3((window as WindowWithEthereum).ethereum);

            try {
                await (window as any).ethereum.request({
                    method: "eth_requestAccounts",
                });

                const accounts = await web3.eth.getAccounts();

                // Transform human readable amount to a hex precised amount
                const valueToSend = parseInt(
                    web3.utils.toWei(amountToSend, "ether")
                ).toString(16);

                const transactionObject = {
                    from: accounts[0],
                    to: destinationAddress,
                    value: valueToSend,
                };

                const result = await (window as WindowWithEthereum).ethereum
                    .request({
                        method: "eth_sendTransaction",
                        params: [transactionObject],
                    })
                    .then((txHash: any) =>
                        console.log(`Transaction hash: ${txHash}`)
                    )
                    .catch((error: any) => console.log(error));

                console.log("Transaction Result:", result);
            } catch (error) {
                console.log(error);
            }
        } else {
            alert("Please download metamask");
        }
    };

    const contextValue: CreateWeb3PaymentContextProps = {
        requestWeb3Payment,
    };

    return (
        <CreateWeb3PaymentContext.Provider value={contextValue}>
            {children}
        </CreateWeb3PaymentContext.Provider>
    );
};

export const useCreateWeb3PaymentContext =
    (): CreateWeb3PaymentContextProps => {
        const context = useContext(CreateWeb3PaymentContext);

        if (!context) {
            throw new Error(
                "useCreateWeb3PaymentContext must be used within a CreateWeb3PaymentContextProvider"
            );
        }

        return context;
    };
