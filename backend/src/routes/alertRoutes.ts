import express from "express";
import Alert from "../models/Alert";
const router = express.Router();

// router.post("/", async (req, res) => {
//     try {
//         const { email, symbol, targetPrice } = req.body;
//
//         if (!email || !symbol || !targetPrice) {
//             return res.status(400).json({ error: "Missing required fields" });
//         }
//
//         const newAlert = new Alert({ email, symbol, targetPrice });
//         await newAlert.save();
//
//         console.log(`✅ Alert saved for ${email} on ${symbol} at ${targetPrice}`);
//         res.status(201).json({ message: "Alert created successfully", alert: newAlert });
//     } catch (error) {
//         console.error("❌ Error saving alert:", error);
//         res.status(500).json({ error: "Failed to save alert" });
//     }
// });
router.post("/", async (req, res) => {
    const { email, symbol, targetPrice, condition } = req.body;

    if (!email || !symbol || !targetPrice) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const newAlert = await Alert.create({
        email,
        symbol,
        targetPrice,
        condition: condition || "gte" // default to "gte"
    });

    res.status(201).json({ message: "Alert created successfully", alert: newAlert });
});

export default router;
