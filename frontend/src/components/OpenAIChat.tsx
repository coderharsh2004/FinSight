import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Loader2 } from "lucide-react";

const OpenAIChat = () => {
    const [query, setQuery] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const askAI = async () => {
        if (!query.trim()) return;

        setLoading(true);
        try {
            const result = await axios.post("http://localhost:5000/api/openai", {
                message: query,
            });

            setResponse(result.data.reply);
        } catch (error) {
            console.error("OpenAI Error:", error);
            setResponse("⚠️ Failed to get response from AI.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="bg-card/50 border-border/50">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-yellow-400" />
                    AI Market Assistant
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <Textarea
                    rows={3}
                    placeholder="Ask me something about the market..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <Button onClick={askAI} className="w-full" disabled={loading || !query}>
                    {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : "Ask AI"}
                </Button>

                {response && (
                    <div className="bg-muted p-4 rounded text-sm text-muted-foreground whitespace-pre-wrap">
                        {response}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default OpenAIChat;
