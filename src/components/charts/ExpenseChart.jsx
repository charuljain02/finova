import { useMemo, useState } from "react";
import { useFinance } from "../../context/FinanceContext";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend, Sector } from "recharts";

const COLORS = ["#6366f1", "#f43f5e", "#10b981", "#f59e0b", "#3b82f6", "#8b5cf6"];

export function ExpenseChart({ transactions: propsTransactions }) {
  const { transactions: contextTransactions, theme } = useFinance();
  const transactions = propsTransactions || contextTransactions;
  const [activeIndex, setActiveIndex] = useState(null);

  const data = useMemo(() => {
    const grouped = transactions
      .filter((t) => t.type === "expense")
      .reduce((acc, t) => {
        const key = t.category || "Other";
        if (!acc[key]) acc[key] = { name: key, value: 0 };
        acc[key].value += Number(t.amount);
        return acc;
      }, {});
    let result = Object.values(grouped).sort((a, b) => b.value - a.value);
    if (result.length > 6) {
      const top = result.slice(0, 5);
      const othersSum = result.slice(5).reduce((sum, item) => sum + item.value, 0);
      result = [...top, { name: "Others", value: othersSum }];
    }
    return result;
  }, [transactions]);

  const totalExpenses = data.reduce((sum, d) => sum + d.value, 0);

  const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, name, value } = props;
    return (
      <g>
        <text x={cx} y={cy - 5} textAnchor="middle" className="fill-slate-400 text-[9px] font-black uppercase tracking-widest">{name}</text>
        <text x={cx} y={cy + 15} textAnchor="middle" className="fill-slate-900 dark:fill-white text-lg font-black">₹{value.toLocaleString()}</text>
        <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius + 8} startAngle={startAngle} endAngle={endAngle} fill={fill} cornerRadius={10} />
      </g>
    );
  };

  if (data.length === 0) return <div className="h-full flex items-center justify-center text-xs text-slate-400">No Expenses</div>;

  return (
    <div className="w-full h-full relative">
      {activeIndex === null && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none translate-y-[-10%] sm:translate-y-[-12%]">
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Spent</span>
          <span className="text-xl font-black text-slate-900 dark:text-white">₹{totalExpenses.toLocaleString()}</span>
        </div>
      )}
      <ResponsiveContainer width="100%" height="100%" debounce={50}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            cx="50%" cy="40%"
            innerRadius="65%" outerRadius="85%"
            paddingAngle={5} cornerRadius={12}
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            onMouseEnter={(_, index) => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
            stroke="none"
          >
            {data.map((_, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
          </Pie>
          <Tooltip 
             content={({ active, payload }) => {
              if (active && payload?.[0]) {
                return (
                  <div className="bg-white dark:bg-slate-800 p-2 px-3 shadow-xl rounded-lg border border-slate-100 dark:border-slate-700 text-[10px] font-bold uppercase text-indigo-500">
                    {payload[0].name}: ₹{payload[0].value.toLocaleString()}
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', paddingTop: '20px' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}