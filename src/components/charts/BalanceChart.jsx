import { useMemo } from "react";
import { useFinance } from "../../context/FinanceContext";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const formatIndianNumber = (num) => {
  if (num >= 100000) return `₹${(num / 100000).toFixed(1)}L`;
  if (num >= 1000) return `₹${(num / 1000).toFixed(0)}K`;
  return `₹${num}`;
};

export function BalanceChart({ transactions: propsTransactions }) {
  const { theme, transactions: contextTransactions } = useFinance();
  const transactions = propsTransactions || contextTransactions;

  const data = useMemo(() => {
    if (!transactions?.length) return [];
    const sorted = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));
    let runningBalance = 0;
    const grouped = {};
    sorted.forEach((t) => {
      const dateKey = new Date(t.date).toLocaleDateString("en-US", { month: "short", day: "numeric" });
      if (!grouped[dateKey]) grouped[dateKey] = 0;
      grouped[dateKey] += t.type === "income" ? Number(t.amount) : -Number(t.amount);
    });
    return Object.entries(grouped).map(([date, value]) => {
      runningBalance += value;
      return { date, balance: runningBalance };
    });
  }, [transactions]);

  if (!data.length) return <div className="h-full flex items-center justify-center text-xs text-slate-400">No Transactions</div>;

  return (
    <div className="w-full h-full min-h-[250px]">
      <ResponsiveContainer width="100%" height="100%" debounce={50}>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === "dark" ? "#1f2937" : "#f3f4f6"} />
          <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} minTickGap={20} dy={10} />
          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} tickFormatter={formatIndianNumber} width={55} />
          <Tooltip 
            contentStyle={{ backgroundColor: theme === "dark" ? "#1e293b" : "#fff", border: 'none', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
            itemStyle={{ fontSize: '12px', fontWeight: 'bold', color: '#6366f1' }}
          />
          <Area type="monotone" dataKey="balance" stroke="#6366f1" strokeWidth={3} fill="url(#balanceGradient)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}