import React, { useState, useEffect } from 'react';
import { DashboardHeader } from '@/components/dashboard-header';
import { MarketOverview } from '@/components/market-overview';
import { StockSearch } from '@/components/stock-search';
import { StockCard } from '@/components/ui/stock-card';
import { StockChart } from '@/components/ui/stock-chart';
import { AIInsights } from '@/components/ai-insights';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { yahooFinanceAPI, StockData, StockChartData } from '@/services/yahooFinance';
import { useToast } from '@/hooks/use-toast';
import { BarChart3, Loader2, RefreshCw, Brain, Newspaper } from 'lucide-react';
import { useAuth } from "@/context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useNavigate } from "react-router-dom";
import OpenAIChat from "@/components/OpenAIChat";
import PriceAlertForm from "@/components/PriceAlertForm";
import PortfolioAnalysisModal from "@/components/modals/PortfolioAnalysisModal";
import { useStockSocket } from '@/hooks/useStockSocket';
const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [watchlist, setWatchlist] = useState<StockData[]>([]);
  const [selectedStock, setSelectedStock] = useState<string | null>(null);
  const [chartData, setChartData] = useState<StockChartData[]>([]);
  const [loading, setLoading] = useState(false);
  const [chartLoading, setChartLoading] = useState(false);
  const [showPortfolioModal, setShowPortfolioModal] = useState(false); // ✅ Add this line
  const { toast } = useToast();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  useEffect(() => {
    const loadInitialStocks = async () => {
      try {
        const symbols = ['AAPL', 'TSLA', 'GOOGL', 'MSFT'];
        const stocks = await Promise.all(
            symbols.map(symbol => yahooFinanceAPI.getStockData(symbol))
        );
        setWatchlist(stocks);
        setSelectedStock('AAPL');
      } catch (error) {
        console.error('Error loading initial stocks:', error);
      }
    };

    loadInitialStocks();
  }, []);

  useEffect(() => {
    if (selectedStock) {
      loadChartData(selectedStock);
    }
  }, [selectedStock]);

  const loadChartData = async (symbol: string) => {
    setChartLoading(true);
    try {
      const data = await yahooFinanceAPI.getStockChart(symbol, '1mo');
      setChartData(data);
    } catch (error) {
      console.error('Error loading chart data:', error);
      toast({
        title: "Error",
        description: "Failed to load chart data",
        variant: "destructive",
      });
    } finally {
      setChartLoading(false);
    }
  };

  const handleAddStock = async (symbol: string) => {
    setLoading(true);
    try {
      const stockData = await yahooFinanceAPI.getStockData(symbol);
      const existingStock = watchlist.find(stock => stock.symbol === symbol);

      if (existingStock) {
        setWatchlist(prev =>
            prev.map(stock => stock.symbol === symbol ? stockData : stock)
        );
        toast({
          title: "Stock Updated",
          description: `${symbol} data has been refreshed`,
        });
      } else {
        setWatchlist(prev => [...prev, stockData]);
        toast({
          title: "Stock Added",
          description: `${symbol} has been added to your watchlist`,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Could not find stock symbol: ${symbol}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const refreshWatchlist = async () => {
    setLoading(true);
    try {
      const refreshedStocks = await Promise.all(
          watchlist.map(stock => yahooFinanceAPI.getStockData(stock.symbol))
      );
      setWatchlist(refreshedStocks);
      toast({
        title: "Watchlist Refreshed",
        description: "All stock data has been updated",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to refresh watchlist",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
          <DashboardHeader />

          <header className="flex items-center justify-between px-6 pt-6">
            <div className="text-sm text-white">
              Logged in as <span className="text-green-400 font-semibold">{user?.email}</span>
            </div>
            <Button onClick={handleLogout} variant="destructive" size="sm">
              Logout
            </Button>
          </header>

          <div className="container mx-auto px-6 py-8 space-y-8">
            {/* Market Overview */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">Market Overview</h2>
                <Badge variant="secondary" className="animate-pulse">
                  Live Data
                </Badge>
              </div>
              <MarketOverview />
            </section>

            {/* Watchlist Section */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">Stock Watchlist</h2>
                <Button onClick={refreshWatchlist} disabled={loading} variant="outline" size="sm">
                  {loading ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                      <RefreshCw className="h-4 w-4 mr-2" />
                  )}
                  Refresh
                </Button>
              </div>
              <StockSearch onAddStock={handleAddStock} />
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left column: Watchlist + Chart */}
              <div className="lg:col-span-2 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {watchlist.map((stock) => (
                      <StockCard
                          key={stock.symbol}
                          stock={stock}
                          className={`cursor-pointer transition-all duration-300 ${
                              selectedStock === stock.symbol
                                  ? "ring-2 ring-primary shadow-lg shadow-primary/20"
                                  : "hover:scale-105"
                          }`}
                          onClick={() => setSelectedStock(stock.symbol)}
                      />
                  ))}
                </div>

                {selectedStock && (
                    <Card className="bg-card/50 border-border/50">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <BarChart3 className="h-5 w-5 text-primary" />
                          {selectedStock} Price Chart
                          <Badge variant="outline" className="ml-auto">
                            30 Days
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {chartLoading ? (
                            <div className="h-[300px] flex items-center justify-center">
                              <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            </div>
                        ) : (
                            <StockChart data={chartData} symbol={selectedStock} timeframe="1mo" />
                        )}
                      </CardContent>
                    </Card>
                )}
              </div>

              {/* Right Column: AI + Alerts + Quick Actions */}
              <div className="space-y-6">
                <AIInsights />

                <Card className="bg-card/50 border-border/50">
                  <CardHeader>
                    <CardTitle className="text-lg">📩 Set Price Alert</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <PriceAlertForm />
                  </CardContent>
                </Card>

                <Card className="bg-card/50 border-border/50">
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button
                        className="w-full justify-start"
                        variant="outline"
                        onClick={() => setShowPortfolioModal(true)} // ✅ Open modal
                    >
                      <Brain className="h-4 w-4 mr-2" />
                      AI Portfolio Analysis
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Newspaper className="h-4 w-4 mr-2" />
                      Market News Summary
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Technical Analysis
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          <div>
            <Card className="bg-[#1c1c2e] p-4 text-center">
              <p className="text-gray-400 text-sm">Last Refreshed</p>
              <h3 className="text-md text-green-200">{new Date().toLocaleTimeString()}</h3>
            </Card>
          </div>
        </div>

        {/* Floating AI Chat */}
        <div className="fixed bottom-4 right-4 z-50 w-[350px]">
          <OpenAIChat />
        </div>

        {/* ✅ AI Portfolio Modal */}
        <PortfolioAnalysisModal
            isOpen={showPortfolioModal}
            onClose={() => setShowPortfolioModal(false)}
            watchlist={watchlist}
        />
      </>
  );
};

export default Index;