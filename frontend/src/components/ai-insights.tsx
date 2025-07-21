import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, TrendingUp, AlertTriangle, Info, Sparkles } from "lucide-react";

interface AIInsight {
  id: string;
  type: 'bullish' | 'bearish' | 'neutral' | 'alert';
  title: string;
  description: string;
  confidence: number;
  timestamp: string;
  symbol?: string;
}

const mockInsights: AIInsight[] = [
  {
    id: '1',
    type: 'bullish',
    title: 'Strong Momentum Detected',
    description: 'AAPL showing strong technical indicators with RSI approaching oversold levels and volume increasing.',
    confidence: 85,
    timestamp: '2 hours ago',
    symbol: 'AAPL',
  },
  {
    id: '2',
    type: 'alert',
    title: 'Market Volatility Warning',
    description: 'Increased volatility expected in tech sector due to upcoming Fed announcement. Consider protective strategies.',
    confidence: 92,
    timestamp: '4 hours ago',
  },
  {
    id: '3',
    type: 'bearish',
    title: 'Resistance Level Reached',
    description: 'TSLA approaching key resistance at $250. Historical data suggests potential pullback.',
    confidence: 78,
    timestamp: '6 hours ago',
    symbol: 'TSLA',
  },
  {
    id: '4',
    type: 'neutral',
    title: 'Sector Rotation Analysis',
    description: 'Energy sector showing relative strength while tech consolidates. Monitor for rotation opportunities.',
    confidence: 71,
    timestamp: '8 hours ago',
  },
];

export function AIInsights() {
  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'bullish':
        return <TrendingUp className="h-4 w-4 text-success" />;
      case 'bearish':
        return <TrendingUp className="h-4 w-4 text-danger rotate-180" />;
      case 'alert':
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      default:
        return <Info className="h-4 w-4 text-info" />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'bullish':
        return 'bg-success/20 text-success border-success/30';
      case 'bearish':
        return 'bg-danger/20 text-danger border-danger/30';
      case 'alert':
        return 'bg-warning/20 text-warning border-warning/30';
      default:
        return 'bg-info/20 text-info border-info/30';
    }
  };

  return (
    <Card className="bg-card/50 border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
            <Brain className="h-4 w-4 text-primary-foreground" />
          </div>
          AI Market Insights
          <Badge variant="secondary" className="ml-auto">
            <Sparkles className="h-3 w-3 mr-1" />
            Live
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockInsights.map((insight) => (
          <div
            key={insight.id}
            className="p-4 rounded-lg bg-secondary/30 border border-border/30 hover:border-primary/30 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                {getInsightIcon(insight.type)}
                <h4 className="font-semibold text-sm text-foreground">
                  {insight.title}
                </h4>
                {insight.symbol && (
                  <Badge variant="outline" className="text-xs">
                    {insight.symbol}
                  </Badge>
                )}
              </div>
              <Badge className={`text-xs ${getInsightColor(insight.type)}`}>
                {insight.confidence}% confidence
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              {insight.description}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                {insight.timestamp}
              </span>
              <Button variant="ghost" size="sm" className="text-xs h-6 px-2">
                View Details
              </Button>
            </div>
          </div>
        ))}
        
        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
          <Brain className="h-4 w-4 mr-2" />
          Generate New Insights
        </Button>
      </CardContent>
    </Card>
  );
}