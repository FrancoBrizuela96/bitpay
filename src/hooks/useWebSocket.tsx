import { useEffect } from "react";

const useWebSocket = (
    url: string,
    onMessageCallback: (message: string) => void
) => {
    useEffect(() => {
        const socket = new WebSocket(url);

        socket.onopen = () => {
            console.log("Conexión websocket abierta");
        };

        socket.onmessage = (event) => {
            onMessageCallback(event.data);
        };

        socket.onclose = () => {
            console.log("Conexión websocket cerrada");
        };

        return () => {
            socket.close();
        };
    }, [url, onMessageCallback]);
};

export default useWebSocket;
