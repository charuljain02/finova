import React, { createContext, useContext, useState, useEffect, useMemo } from "react";

const FinanceContext = createContext();

export function FinanceProvider({ children }) {
  // 🔹 Transactions (with localStorage)
  const [transactions, setTransactions] = useState(() => {
    const stored = localStorage.getItem("transactions");
    if (stored) return JSON.parse(stored);
    return [
      { id: 1, date: "2026-03-01", amount: 5000, category: "Salary", type: "income", description: "Monthly Pay" },
      { id: 2, date: "2026-03-05", amount: 120, category: "Food", type: "expense", description: "Lunch" },
    ];
  });

  const [role, setRole] = useState("admin");

  // 🔥 Theme state
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  // 🔹 Persist transactions
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  // 🔥 APPLY DARK MODE TO HTML (MAIN FIX)
  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  // 🔹 Toggle theme
  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  // 🔹 Add transaction
  const addTransaction = (newTransaction) => {
    setTransactions(prev => [
      ...prev,
      { ...newTransaction, id: Date.now() },
    ]);
  };

  // 🔹 Delete transaction
  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  // 🔹 Summary
  const summary = useMemo(() => {
    const income = transactions
      .filter(t => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const expenses = transactions
      .filter(t => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      income,
      expenses,
      balance: income - expenses,
    };
  }, [transactions]);

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        summary,
        role,
        setRole,
        theme,
        toggleTheme,
        addTransaction,
        deleteTransaction,
      }}
    >
      {/* ✅ IMPORTANT: NO "dark" div here */}
      {children}
    </FinanceContext.Provider>
  );
}

export const useFinance = () => useContext(FinanceContext);
