import React, { useMemo } from "react";
import { Card } from "../common/Card";
import { FaPiggyBank, FaWallet, FaCoins } from "react-icons/fa";

export function Insights({ transactions = [], smartTip }) {

  // 🔹 Monthly Totals (same as Dashboard)
  const monthlyTotals = useMemo(() => {
    const totals = {};

    transactions.forEach((t) => {
      const date = new Date(t.date);
      const key = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}`;

      if (!totals[key]) {
        totals[key] = { income: 0, expense: 0 };
      }

      if (t.type === "income") totals[key].income += t.amount;
      else totals[key].expense += t.amount;
    });

    return totals;
  }, [transactions]);

  // 🔹 Sorted last 6 months
  const monthlyKeys = useMemo(() => {
    return Object.keys(monthlyTotals).sort().slice(-6);
  }, [monthlyTotals]);

  const thisMonthKey = monthlyKeys[monthlyKeys.length - 1];
  const lastMonthKey = monthlyKeys[monthlyKeys.length - 2];

  const maxExpenseValue = Math.max(
    ...monthlyKeys.map((k) => monthlyTotals[k]?.expense || 0),
    1
  );

  // 🔹 Best / Worst / Category (same logic)
  let bestMonth = "-";
  let worstMonth = "-";
  let highestSpendingCategory = "-";

  let maxIncome = -Infinity;
  let maxExpense = -Infinity;

  const categoryTotals = {};

  transactions.forEach((t) => {
    const date = new Date(t.date);
    const key = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}`;

    if (t.type === "income" && t.amount > maxIncome) {
      maxIncome = t.amount;
      bestMonth = key;
    }

    if (t.type === "expense") {
      if (t.amount > maxExpense) {
        maxExpense = t.amount;
        worstMonth = key;
      }

      const cat = t.category;
      categoryTotals[cat] = (categoryTotals[cat] || 0) + t.amount;
    }
  });

  highestSpendingCategory =
    Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0]?.[0] || "-";

  // 🔹 SAME InsightsBox (unchanged)
  const InsightsBox = ({ title, value, type }) => {
    const icon =
      type === "income"
        ? FaPiggyBank
        : type === "expense"
        ? FaWallet
        : FaCoins;

    return (
      <Card
        hover
        className="p-6 flex flex-col items-center justify-center rounded-2xl shadow-xl min-h-[200px] transition-all hover:scale-[1.02]"
      >
        {React.createElement(icon, {
          className: "text-2xl mb-3 text-indigo-500",
        })}
        <h4 className="text-sm text-gray-500 dark:text-gray-400 mb-2 text-center">
          {title}
        </h4>
        <p className="text-xl font-bold text-gray-900 dark:text-white text-center">
          {value || "-"}
        </p>
      </Card>
    );
  };

  return (
    <Card className="p-6 space-y-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg">

      {/* 🔹 Smart Tip */}
      <Card className="p-6 rounded-3xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
        <div className="flex items-start gap-4">
          <div className="text-2xl">💡</div>
          <div className="flex-1">
            <h4 className="font-semibold text-lg mb-1">Smart Saving Tip</h4>
            <p className="text-sm opacity-90 leading-relaxed">
              {smartTip}
            </p>
          </div>
        </div>
      </Card>

      {/* 🔹 Heading */}
      <h3 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
        Insights
      </h3>

      {/* 🔹 Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* 🔹 Monthly Comparison Box */}
        <div className="lg:col-span-2 rounded-3xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg p-6">

          <h4 className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-5">
            Monthly Expense Comparison
          </h4>

          {(() => {
            const lastMonthAmount = monthlyTotals[lastMonthKey]?.expense || 0;
            const thisMonthAmount = monthlyTotals[thisMonthKey]?.expense || 0;

            const maxValue = Math.max(lastMonthAmount, thisMonthAmount, 1);
            const lastWidth = (lastMonthAmount / maxValue) * 100;
            const thisWidth = (thisMonthAmount / maxValue) * 100;

            const isIncrease = thisMonthAmount > lastMonthAmount;
            const diff = thisMonthAmount - lastMonthAmount;

            return (
              <div className="flex flex-col gap-5">

                {/* Last Month */}
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500 dark:text-gray-400">
                      Last Month ({lastMonthKey || "Prev"})
                    </span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">
                      ₹{lastMonthAmount.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full h-5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-5 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 transition-all duration-700"
                      style={{ width: `${lastWidth}%` }}
                    />
                  </div>
                </div>

                {/* This Month */}
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500 dark:text-gray-400">
                      This Month ({thisMonthKey || "Current"})
                    </span>
                    <span
                      className={`font-semibold ${
                        isIncrease ? "text-rose-500" : "text-emerald-500"
                      }`}
                    >
                      ₹{thisMonthAmount.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full h-5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-5 rounded-full transition-all duration-700 ${
                        isIncrease
                          ? "bg-gradient-to-r from-rose-500 to-pink-500"
                          : "bg-gradient-to-r from-emerald-500 to-green-500"
                      }`}
                      style={{ width: `${thisWidth}%` }}
                    />
                  </div>
                </div>

                {/* Change */}
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-gray-500 dark:text-gray-400">
                    Change
                  </span>
                  <span
                    className={`font-semibold ${
                      isIncrease ? "text-rose-500" : "text-emerald-500"
                    }`}
                  >
                    {isIncrease ? "+" : "-"}₹{Math.abs(diff).toLocaleString()}
                  </span>
                </div>

                {/* 🔹 6 Month Grid */}
                <div className="mt-6 grid grid-cols-3 gap-3 h-40">
                  {monthlyKeys.map((month) => {
                    const value = monthlyTotals[month]?.expense || 0;
                    const percentage = (value / maxExpenseValue) * 100;
                    const isCurrentMonth = month === thisMonthKey;

                    return (
                      <div
                        key={month}
                        className={`relative rounded-xl p-3 flex flex-col justify-between text-white text-xs font-medium cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                          isCurrentMonth
                            ? "bg-gradient-to-br from-rose-500 to-pink-600"
                            : "bg-gradient-to-br from-indigo-500 to-purple-600"
                        }`}
                        style={{ opacity: 0.7 + percentage / 150 }}
                      >
                        <span className="text-[11px] opacity-80">
                          {new Date(month + "-01").toLocaleString("default", {
                            month: "short",
                          })}
                        </span>
                        <span className="text-sm font-semibold">
                          ₹{value.toLocaleString()}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })()}
        </div>

        {/* 🔹 Right Side */}
        <div className="flex flex-col gap-4">
          <InsightsBox title="Best Month (Income)" value={bestMonth} type="income" />
          <InsightsBox title="Worst Month (Expense)" value={worstMonth} type="expense" />
          <InsightsBox title="Top Spending Category" value={highestSpendingCategory} type="category" />
        </div>
      </div>
    </Card>
  );
}