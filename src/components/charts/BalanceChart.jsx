// src/components/charts/BalanceChart.jsx
import { useMemo } from "react";
import { useFinance } from "../../context/FinanceContext";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

// ✅ Indian number formatting helper
function formatIndianNumber(num) {
  if (num >= 10000000) return `₹${(num / 10000000).toFixed(1)} Cr`; // Shorter decimal for mobile
  if (num >= 100000) return `₹${(num / 100000).toFixed(1)} L`;
  if (num >= 1000) return `₹${(num / 1000).toFixed(0)} K`;
  return `₹${num}`;
}

export function BalanceChart() {
  const { transactions, theme } = useFinance();

  // ✅ Prepare clean + grouped data
  const data = useMemo(() => {
    if (!transactions || transactions.length === 0) return [];

    const sorted = [...transactions].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    let runningBalance = 0;
    const grouped = {};

    sorted.forEach((t) => {
      const dateKey = new Date(t.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      if (!grouped[dateKey]) grouped[dateKey] = 0;
      grouped[dateKey] += t.type === "income" ? t.amount : -t.amount;
    });

    return Object.entries(grouped).map(([date, value]) => {
      runningBalance += value;
      return { date, balance: runningBalance };
    });
  }, [transactions]);

  // ✅ Empty state
  if (data.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg text-center text-gray-500 dark:text-gray-400">
        No balance data available
      </div>
    );
  }

  return (
    /* Responsive Container: p-3 for mobile, p-6 for desktop */
    <div className="bg-white dark:bg-gray-900 p-3 sm:p-5 lg:p-6 rounded-2xl shadow-lg w-full transition-all">
      
      {/* Header: Left-aligned on desktop, centered on mobile */}
      <div className="mb-4 text-center sm:text-left sm:px-2">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-100">
          Balance Over Time
        </h3>
      </div>

      {/* Responsive Height: 200px for mobile, 260px for tablet, 300px for PC */}
      <div className="h-[200px] sm:h-[260px] lg:h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            
            {/* Gradient */}
            <defs>
              <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>

            {/* Grid */}
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false} // Cleaner on mobile
              stroke={theme === "dark" ? "#1f2937" : "#e5e7eb"}
            />

            {/* X Axis: Smaller font for mobile */}
            <XAxis
              dataKey="date"
              stroke={theme === "dark" ? "#9ca3af" : "#6b7280"}
              tick={{ fontSize: 10 }}
              minTickGap={20} // Prevents overlapping dates on small screens
              axisLine={false}
              tickLine={false}
            />

            {/* Y Axis: Hidden or simplified on very small screens if needed, but here it stays formatted */}
            <YAxis
              stroke={theme === "dark" ? "#9ca3af" : "#6b7280"}
              tick={{ fontSize: 10 }}
              tickFormatter={formatIndianNumber}
              axisLine={false}
              tickLine={false}
            />

            {/* Tooltip */}
            <Tooltip
              contentStyle={{
                backgroundColor: theme === "dark" ? "#1f2937" : "#fff",
                borderRadius: "10px",
                border: "none",
                fontSize: "12px",
                boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
              }}
              formatter={(value) => [formatIndianNumber(value), "Balance"]}
            />

            {/* Area */}
            <Area
              type="monotone"
              dataKey="balance"
              stroke="#3b82f6"
              strokeWidth={3}
              fill="url(#balanceGradient)"
              dot={false}
              activeDot={{ r: 6, strokeWidth: 0 }} 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}