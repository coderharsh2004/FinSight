import express from "express";
import { OpenAI } from "openai";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

router.post("/portfolio-insight", async (req, res) => {
    const { watchlist } = req.body;

    if (!watchlist || !Array.isArray(watchlist)) {
        return res.status(400).json({ error: "Watchlist data is required" });
    }

    const stockSummary = watchlist
        .map(stock => `${stock.symbol}: ${stock.regularMarketPrice} USD, ${stock.regularMarketChangePercent.toFixed(2)}%`)
        .join("\n");

    const prompt = `
You're a financial assistant. Based on the following stock data, suggest insightful actions (Buy / Hold / Sell) and reasoning.

Stock Data:
${stockSummary}

Respond with 3-5 key insights in plain text.
`;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
        });

        const result = response.choices[0].message?.content;
        res.json({ insights: result });
    } catch (error) {
        console.error("OpenAI error:", error);
        res.status(500).json({ error: "Failed to generate portfolio insights" });
    }
});

export default router;
