import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, DollarSign, Activity } from "lucide-react";

interface MarketIndex {
  name: string;
  value: number;
  change: number;
  changePercent: number;
}

const marketIndices: MarketIndex[] = [
  {
    name: 'S&P 500',
    value: 4756.50,
    change: 12.34,
    changePercent: 0.26,
  },
  {
    name: 'NASDAQ',
    value: 14845.72,
    change: -23.15,
    changePercent: -0.16,
  },
  {
    name: 'DOW JONES',
    value: 37248.73,
    change: 45.67,
    changePercent: 0.12,
  },
  {
    name: 'RUSSELL 2000',
    value: 1987.45,
    change: -8.92,
    changePercent: -0.45,
  },
];

export function MarketOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {marketIndices.map((index) => {
        const isPositive = index.change >= 0;
        
        return (
          <Card key={index.name} className="bg-card/50 border-border/50 hover:border-primary/30 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {index.name}
              </CardTitle>
              {isPositive ? (
                <TrendingUp className="h-4 w-4 text-success" />
              ) : (
                <TrendingDown className="h-4 w-4 text-danger" />
              )}
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-foreground">
                  {index.value.toLocaleString()}
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={isPositive ? "default" : "destructive"}
                    className={`text-xs ${
                      isPositive 
                        ? "bg-success/20 text-success border-success/30" 
                        : "bg-danger/20 text-danger border-danger/30"
                    }`}
                  >
                    {isPositive ? '+' : ''}{index.change.toFixed(2)}
                  </Badge>
                  <span className={`text-xs ${
                    isPositive ? "text-success" : "text-danger"
                  }`}>
                    {isPositive ? '+' : ''}{index.changePercent.toFixed(2)}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}