// src/hooks/useStockSocket.ts
import { useEffect } from 'react';

interface StockSocketProps {
    symbols: string[];
    onPriceUpdate: (symbol: string, price: number) => void;
}

export const useStockSocket = ({ symbols, onPriceUpdate }: StockSocketProps) => {
    useEffect(() => {
        const socket = new WebSocket("wss://ws.twelvedata.com/v1/price?apikey=b5b92730f63946b7a60338db5dbe8f70");

        socket.onopen = () => {
            socket.send(JSON.stringify({
                action: "subscribe",
                symbols: symbols.join(",")
            }));
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.symbol && data.price) {
                onPriceUpdate(data.symbol, parseFloat(data.price));
            }
        };

        return () => {
            socket.close();
        };
    }, [symbols, onPriceUpdate]);
};
