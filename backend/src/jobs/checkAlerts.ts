// src/jobs/checkAlerts.ts
import Alert from "../models/Alert";
import { sendAlertEmail } from "../utils/sendEmail";

// Replace with actual API logic
const getMockStockPrice = async (symbol: string): Promise<number> => {
    // Simulated random price
    return Math.floor(Math.random() * 300);
};

export const checkPriceAlerts = async () => {
    const alerts = await Alert.find();

    for (const alert of alerts) {
        const currentPrice = await getMockStockPrice(alert.symbol);

        console.log(`[${alert.symbol}] Target: ${alert.targetPrice}, Current: ${currentPrice}`);

        if (currentPrice >= alert.targetPrice) {
            await sendAlertEmail(alert.email, alert.symbol, currentPrice);
            console.log(`📧 Email sent to ${alert.email}`);
        }
    }
};
