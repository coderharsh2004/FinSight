import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { StockData } from "@/services/yahooFinance";
import { getPortfolioInsight } from "@/lib/openai"; // Your GPT-4 API call

interface PortfolioAnalysisModalProps {
    isOpen: boolean;
    onClose: () => void;
    watchlist: StockData[];
}

const PortfolioAnalysisModal: React.FC<PortfolioAnalysisModalProps> = ({
                                                                           isOpen,
                                                                           onClose,
                                                                           watchlist,
                                                                       }) => {
    const [loading, setLoading] = useState(false);
    const [insights, setInsights] = useState<string>("");

    const analyzePortfolio = async () => {
        setLoading(true);
        try {
            const response = await getPortfolioInsight(watchlist); // Implement this API call
            setInsights(response);
        } catch (error) {
            setInsights("⚠️ Failed to analyze portfolio.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-card text-white">
                <DialogHeader>
                    <DialogTitle className="text-xl">📊 AI Portfolio Analysis</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                        GPT-4 will analyze your watchlist and suggest insights.
                    </p>

                    <Button
                        onClick={analyzePortfolio}
                        disabled={loading}
                        className="w-full bg-green-500 text-black"
                    >
                        {loading ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : null}
                        Analyze My Portfolio
                    </Button>

                    {insights && (
                        <div className="bg-muted p-3 rounded-md text-green-400 whitespace-pre-wrap">
                            {insights}
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default PortfolioAnalysisModal;
