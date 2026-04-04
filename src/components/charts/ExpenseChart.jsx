// src/components/charts/ExpenseChart.jsx
import { useMemo, useState } from "react";
import { useFinance } from "../../context/FinanceContext";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  Sector,
} from "recharts";

const COLORS = [
  "#ef4444",
  "#f97316",
  "#facc15",
  "#22c55e",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
  "#14b8a6",
  "#6366f1",
  "#84cc16",
];

export function ExpenseChart() {
  const { transactions, theme } = useFinance();
  const [activeIndex, setActiveIndex] = useState(null);

  // ✅ Smart grouping + sorting
  const data = useMemo(() => {
    const grouped = transactions
      .filter((t) => t.type === "expense")
      .reduce((acc, t) => {
        const key = t.category || "Other";
        if (!acc[key]) acc[key] = { name: key, value: 0 };
        acc[key].value += Number(t.amount);
        return acc;
      }, {});

    let result = Object.values(grouped);

    // 🔥 Sort descending
    result.sort((a, b) => b.value - a.value);

    // 🔥 Group small categories into "Others"
    if (result.length > 6) {
      const top = result.slice(0, 5);
      const others = result.slice(5);

      const othersSum = others.reduce((sum, item) => sum + item.value, 0);

      result = [...top, { name: "Others", value: othersSum }];
    }

    return result;
  }, [transactions]);

  const totalExpenses = data.reduce((sum, d) => sum + d.value, 0);

  // ✅ Empty state
  if (data.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg text-center text-gray-500 dark:text-gray-400">
        No expense data available
      </div>
    );
  }

  // 🔥 Active slice (hover effect)
  const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;

    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 8} // 🔥 expand on hover
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
      </g>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl shadow-lg">
      
      {/* Header */}
      <div className="flex flex-col items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          Expenses by Category
        </h3>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Total: ₹{totalExpenses.toLocaleString()}
        </span>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={270}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={3}
            cornerRadius={10}
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            onMouseEnter={(_, index) => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
            isAnimationActive={true}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                stroke={theme === "dark" ? "#111827" : "#fff"}
                strokeWidth={2}
              />
            ))}
          </Pie>

          {/* Tooltip */}
          <Tooltip
            contentStyle={{
              backgroundColor: theme === "dark" ? "#1f2937" : "#fff",
              borderRadius: "10px",
              border: "none",
              boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
            }}
            formatter={(value, name) => [
              `₹${value.toLocaleString()}`,
              name,
            ]}
          />

          {/* Legend */}
          <Legend
            verticalAlign="bottom"
            align="center"
            iconType="circle"
            wrapperStyle={{
              fontSize: "12px",
              marginTop: "10px",
              color: theme === "dark" ? "#d1d5db" : "#374151",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
} 