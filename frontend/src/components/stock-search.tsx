import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface StockSearchProps {
  onAddStock: (symbol: string) => void;
  className?: string;
}

export function StockSearch({ onAddStock, className }: StockSearchProps) {
  const [symbol, setSymbol] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symbol.trim()) return;
    
    setIsLoading(true);
    try {
      await onAddStock(symbol.toUpperCase().trim());
      setSymbol('');
    } catch (error) {
      console.error('Error adding stock:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn("flex gap-2", className)}>
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          placeholder="Enter stock symbol (e.g., AAPL, TSLA)"
          className="pl-10 bg-secondary/50 border-border/50 focus:border-primary/50 focus:bg-secondary"
          disabled={isLoading}
        />
      </div>
      <Button 
        type="submit" 
        disabled={!symbol.trim() || isLoading}
        className="bg-primary hover:bg-primary/90 text-primary-foreground"
      >
        <Plus className="h-4 w-4 mr-1" />
        Add Stock
      </Button>
    </form>
  );
}