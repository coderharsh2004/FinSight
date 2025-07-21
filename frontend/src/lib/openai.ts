import { StockData } from "@/services/yahooFinance";

export const getPortfolioInsight = async (watchlist: StockData[]) => {
    const response = await fetch("http://localhost:5000/api/openai/portfolio-insight", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ watchlist }),
    });

    if (!response.ok) throw new Error("Failed to fetch insights");
    const data = await response.json();
    return data.insights;
};
