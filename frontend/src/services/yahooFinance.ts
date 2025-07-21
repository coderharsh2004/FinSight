// Mock Yahoo Finance API service
// In a real implementation, you would use the actual Yahoo Finance API

export interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: string;
  high52w: number;
  low52w: number;
  previousClose: number;
}

export interface StockChartData {
  timestamp: string;
  price: number;
}

// Mock data for demonstration
const mockStocks: Record<string, StockData> = {
  AAPL: {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 192.53,
    change: 2.34,
    changePercent: 1.23,
    volume: 45231000,
    marketCap: '3.01T',
    high52w: 199.62,
    low52w: 164.08,
    previousClose: 190.19,
  },
  TSLA: {
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    price: 248.42,
    change: -3.21,
    changePercent: -1.27,
    volume: 52187000,
    marketCap: '790.5B',
    high52w: 299.29,
    low52w: 138.80,
    previousClose: 251.63,
  },
  GOOGL: {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    price: 141.80,
    change: 0.95,
    changePercent: 0.67,
    volume: 28456000,
    marketCap: '1.78T',
    high52w: 153.78,
    low52w: 83.34,
    previousClose: 140.85,
  },
  MSFT: {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    price: 378.85,
    change: 4.22,
    changePercent: 1.13,
    volume: 31245000,
    marketCap: '2.81T',
    high52w: 384.30,
    low52w: 309.45,
    previousClose: 374.63,
  },
};

// Generate mock chart data
function generateMockChartData(symbol: string, days: number = 30): StockChartData[] {
  const data: StockChartData[] = [];
  const basePrice = mockStocks[symbol]?.price || 100;
  const now = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Generate realistic price movement
    const volatility = 0.02; // 2% daily volatility
    const randomChange = (Math.random() - 0.5) * volatility;
    const price = basePrice * (1 + randomChange * (i / days));
    
    data.push({
      timestamp: date.toISOString(),
      price: Math.max(price, 1), // Ensure positive price
    });
  }
  
  return data;
}

export const yahooFinanceAPI = {
  async getStockData(symbol: string): Promise<StockData> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const stock = mockStocks[symbol.toUpperCase()];
    if (!stock) {
      throw new Error(`Stock symbol ${symbol} not found`);
    }
    
    // Add some random variation to simulate live data
    const variation = (Math.random() - 0.5) * 0.02; // ±1% variation
    const newPrice = stock.price * (1 + variation);
    const newChange = newPrice - stock.previousClose;
    const newChangePercent = (newChange / stock.previousClose) * 100;
    
    return {
      ...stock,
      price: newPrice,
      change: newChange,
      changePercent: newChangePercent,
    };
  },

  async getStockChart(symbol: string, period: string = '1mo'): Promise<StockChartData[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const days = period === '1d' ? 1 : period === '1w' ? 7 : period === '1mo' ? 30 : 365;
    return generateMockChartData(symbol, days);
  },

  async searchStocks(query: string): Promise<Array<{ symbol: string; name: string }>> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const results = Object.values(mockStocks)
      .filter(stock => 
        stock.symbol.toLowerCase().includes(query.toLowerCase()) ||
        stock.name.toLowerCase().includes(query.toLowerCase())
      )
      .map(stock => ({ symbol: stock.symbol, name: stock.name }));
    
    return results;
  },
};