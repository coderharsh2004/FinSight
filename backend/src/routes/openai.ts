import { Router } from "express";
import axios from "axios";
import OpenAI from "openai"
const router = Router();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
});

router.post("/portfolio-insight", async (req, res) => {
    const { watchlist } = req.body;

    if (!watchlist) {
        return res.status(400).json({ error: "Watchlist is required" });
    }

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                {
                    role: "system",
                    content: "You're a financial advisor. Analyze the user's stock portfolio.",
                },
                {
                    role: "user",
                    content: `Here is my stock portfolio: ${JSON.stringify(watchlist)}. Give insights.`,
                },
            ],
        });

        const insights = response.choices[0].message.content;
        res.json({ insights });
    } catch (error) {
        console.error("OpenAI API error:", error);
        res.status(500).json({ error: "Failed to generate portfolio insights" });
    }
});

router.post("/", async (req, res) => {
    const { message } = req.body;

    try {
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: message }],
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        const reply = response.data.choices[0].message.content;
        res.json({ reply });
    } catch (error: any) {
        console.error("OpenAI Error:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to contact OpenAI API" });
    }
});

export default router;
