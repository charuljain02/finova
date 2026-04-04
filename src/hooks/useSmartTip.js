// src/hooks/useSmartTip.js
import { useMemo } from "react";

export function useSmartTip(transactions) {
  return useMemo(() => {
    if (!transactions.length)
      return "Start adding transactions to get insights.";

    const expenseMap = {};

    transactions.forEach((t) => {
      if (t.type === "expense") {
        expenseMap[t.category] =
          (expenseMap[t.category] || 0) + t.amount;
      }
    });

    let topCategory = null;
    let max = 0;

    Object.entries(expenseMap).forEach(([cat, val]) => {
      if (val > max) {
        max = val;
        topCategory = cat;
      }
    });

    if (!topCategory)
      return "Track expenses to get personalized tips.";

    return `You are spending the most on "${topCategory}". Reducing it slightly can significantly improve your savings.`;
  }, [transactions]);
}