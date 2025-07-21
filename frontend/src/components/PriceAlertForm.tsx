import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const PriceAlertForm = () => {
    const [email, setEmail] = useState("");
    const [symbol, setSymbol] = useState("");
    const [targetPrice, setTargetPrice] = useState("");
    const [condition, setCondition] = useState("gte");
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/api/alerts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    symbol: symbol.toUpperCase(),
                    targetPrice: parseFloat(targetPrice),
                    condition
                }),
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.message || "Failed to create alert");

            toast({
                title: "✅ Alert Created",
                description: `You'll be notified when ${symbol.toUpperCase()} hits $${targetPrice}`,
            });

            setEmail("");
            setSymbol("");
            setTargetPrice("");
            setCondition("gte");
        } catch (error: any) {
            toast({
                title: "❌ Error",
                description: error.message || "Failed to create alert",
                variant: "destructive",
            });
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-card border border-border rounded-xl p-6 space-y-4"
        >
            <h3 className="text-lg font-semibold text-foreground">Set Price Alert</h3>

            <div className="space-y-2">
                <Label>Email</Label>
                <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                />
            </div>

            <div className="space-y-2">
                <Label>Stock Symbol</Label>
                <Input
                    type="text"
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value)}
                    placeholder="AAPL"
                    required
                />
            </div>

            <div className="space-y-2">
                <Label>Target Price</Label>
                <Input
                    type="number"
                    value={targetPrice}
                    onChange={(e) => setTargetPrice(e.target.value)}
                    placeholder="200"
                    required
                />
            </div>

            <div className="space-y-2">
                <Label>Condition</Label>
                <select
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
                >
                    <option value="gte">Greater than or equal</option>
                    <option value="lte">Less than or equal</option>
                </select>
            </div>

            <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white w-full">
                Create Alert
            </Button>
        </form>
    );
};

export default PriceAlertForm;
