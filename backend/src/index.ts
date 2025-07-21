import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { OpenAI } from "openai";
import mongoose from "mongoose";
import alertRoutes from "./routes/alertRoutes";
import { checkPriceAlerts } from "./jobs/checkAlerts";
import checkAlerts from "./utils/checkAlert";
import openaiRoutes from "./routes/openaiRoutes";
// Load environment variables from .env
dotenv.config();

const app = express();
const PORT = 5000;

// Middleware
// app.use(cors({
//     origin: "http://localhost:5173",credentials: true
// }));
app.use(cors());
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:8081"],
    credentials: true, // optional if you're using cookies or auth
}));
app.use(express.json());
app.use("/api/alerts", alertRoutes)
app.use("/api/openai", openaiRoutes);
// MongoDB Connection
const mongoURI = process.env.MONGODB_URI!;
mongoose.connect(mongoURI)
    .then(() => console.log("✅ MongoDB connected successfully!"))
    .catch(err => {
        console.error("❌ MongoDB connection error:", err);
        process.exit(1);
    });

// Initialize OpenAI with API key from .env
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// POST /api/openai - receives message and returns AI response
app.post("/api/openai", async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: message }],
        });

        const reply = completion.choices[0].message.content;
        res.json({ reply });
    } catch (error: any) {
        console.error("OpenAI API Error:", error.message);
        res.status(500).json({ error: "Failed to generate response" });
    }
});

setInterval(() => {
    console.log("🔍 Checking price alerts...");
    checkAlerts();
}, 60 * 1000); // 5 minutes
// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
