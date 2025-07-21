import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

interface StockChartProps {
  data: {
    timestamp: string;
    price: number;
  }[];
  symbol: string;
  timeframe?: string;
}

export function StockChart({ data, symbol, timeframe = "1D" }: StockChartProps) {
  const isPositive = data.length > 1 && data[data.length - 1].price > data[0].price;
  
  const chartData = {
    labels: data.map(item => item.timestamp),
    datasets: [
      {
        label: symbol,
        data: data.map(item => item.price),
        borderColor: isPositive ? 'hsl(var(--success))' : 'hsl(var(--danger))',
        backgroundColor: isPositive 
          ? 'hsl(var(--success) / 0.1)' 
          : 'hsl(var(--danger) / 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointBackgroundColor: isPositive ? 'hsl(var(--success))' : 'hsl(var(--danger))',
        pointBorderColor: 'hsl(var(--background))',
        pointBorderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        backgroundColor: 'hsl(var(--popover))',
        titleColor: 'hsl(var(--popover-foreground))',
        bodyColor: 'hsl(var(--popover-foreground))',
        borderColor: 'hsl(var(--border))',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
        callbacks: {
          title: function(context: any) {
            return new Date(context[0].label).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              hour: timeframe === '1D' ? 'numeric' : undefined,
              minute: timeframe === '1D' ? '2-digit' : undefined,
            });
          },
          label: function(context: any) {
            return `${symbol}: $${context.parsed.y.toFixed(2)}`;
          },
        },
      },
    },
    scales: {
      x: {
        type: 'time' as const,
        display: true,
        grid: {
          display: false,
        },
        ticks: {
          color: 'hsl(var(--muted-foreground))',
          maxTicksLimit: 6,
        },
        border: {
          display: false,
        },
      },
      y: {
        display: true,
        position: 'right' as const,
        grid: {
          color: 'hsl(var(--border) / 0.3)',
          drawBorder: false,
        },
        ticks: {
          color: 'hsl(var(--muted-foreground))',
          callback: function(value: any) {
            return '$' + value.toFixed(2);
          },
          maxTicksLimit: 6,
        },
        border: {
          display: false,
        },
      },
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false,
    },
    elements: {
      point: {
        hoverRadius: 8,
      },
    },
  };

  return (
    <div className="h-[300px] w-full">
      <Line data={chartData} options={options} />
    </div>
  );
}