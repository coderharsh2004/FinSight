// import Alert from "../models/Alert";
// import { sendAlertEmail } from "../utils/sendEmail";
//
// // Mock price fetcher — you’ll replace this with real API
// async function getCurrentStockPrice(symbol: string): Promise<number> {
//     // Simulate price data (e.g., from Alpha Vantage, Yahoo Finance, etc.)
//     const simulatedPrice = Math.random() * 500; // Random price between 0–500
//     return parseFloat(simulatedPrice.toFixed(2));
// }
//
// export default async function checkAlerts() {
//     const alerts = await Alert.find();
//
//     for (const alert of alerts) {
//         const currentPrice = await getCurrentStockPrice(alert.symbol);
//
//         if (currentPrice >= alert.targetPrice) {
//             // Send email
//             await sendAlertEmail(alert.email, alert.symbol, currentPrice);
//
//
//             console.log(`✅ Alert sent to ${alert.email} for ${alert.symbol}`);
//
//             // Remove alert after triggering (or you could mark it as triggered)
//             await Alert.findByIdAndDelete(alert._id);
//         }
//     }
// }
import Alert from "../models/Alert";
import { sendAlertEmail } from "./sendEmail";
import axios from "axios";
import dotenv from "dotenv"

dotenv.config();
const TWELVE_API_KEY = process.env.TWELVE_API_KEY;

export const checkAlerts = async () => {
    const alerts = await Alert.find({});

    for (const alert of alerts) {
        try {
            const response = await axios.get(`https://api.twelvedata.com/price?symbol=${alert.symbol}&apikey=${TWELVE_API_KEY}`);
            const currentPrice = response.data.price;

            const shouldTrigger =
                (alert.condition === "gte" && currentPrice >= alert.targetPrice) ||
                (alert.condition === "lte" && currentPrice <= alert.targetPrice);

            if (shouldTrigger) {
                // ✅ Log separately
                console.log(
                    `Current price: $${currentPrice} — your condition (${alert.condition}) of $${alert.targetPrice} is met!`
                );

                // ✅ Send Email with price
                await sendAlertEmail(
                    alert.email,
                    alert.symbol,
                    currentPrice
                );

                // ✅ Remove the alert to prevent future emails
                await Alert.findByIdAndDelete(alert._id);
            }
        } catch (error: any) {
            console.error(`❌ Error processing alert for ${alert.symbol}:`, error.message);
        }
    }
};

export default checkAlerts;
