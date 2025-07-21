import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume?: number;
  marketCap?: string;
  high52w?: number;
  low52w?: number;
}

interface StockCardProps {
  stock: StockData;
  className?: string;
  onClick?: () => void;
}

export function StockCard({ stock, className, onClick }: StockCardProps) {
  const isPositive = stock.change >= 0;
  
  return (
    <Card 
      className={cn(
        "bg-gradient-to-br from-card to-card/50 border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg text-foreground">{stock.symbol}</h3>
            <p className="text-sm text-muted-foreground truncate">{stock.name}</p>
          </div>
          <Badge 
            variant={isPositive ? "default" : "destructive"}
            className={cn(
              "flex items-center gap-1",
              isPositive ? "bg-success/20 text-success border-success/30" : "bg-danger/20 text-danger border-danger/30"
            )}
          >
            {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-foreground">
              ${stock.price.toFixed(2)}
            </span>
            <span className={cn(
              "text-sm font-medium",
              isPositive ? "text-success" : "text-danger"
            )}>
              {isPositive ? '+' : ''}${stock.change.toFixed(2)}
            </span>
          </div>
          
          {stock.volume && (
            <div className="text-xs text-muted-foreground">
              Volume: {(stock.volume / 1000000).toFixed(1)}M
            </div>
          )}
          
          {(stock.high52w || stock.low52w) && (
            <div className="flex justify-between text-xs text-muted-foreground">
              {stock.low52w && <span>52W Low: ${stock.low52w}</span>}
              {stock.high52w && <span>52W High: ${stock.high52w}</span>}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}