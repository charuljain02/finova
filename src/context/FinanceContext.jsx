import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
// Mockdata ko 'mockData' ke naam se import kiya taaki conflict na ho
import { transactions as mockData } from "../data/mockdata";

const FinanceContext = createContext();

export function FinanceProvider({ children }) {
  // 🔹 Transactions State
  const [transactions, setTransactions] = useState(() => {
    const stored = localStorage.getItem("transactions");
    if (stored) return JSON.parse(stored);
    return mockData; // Default to imported mock data
  });

  const [role, setRole] = useState("admin");

  // 🔥 Theme state
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  // 🔹 Persist transactions to LocalStorage
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  // 🔥 Sync Theme with HTML class (Dark Mode Fix)
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  const addTransaction = (newTransaction) => {
    setTransactions(prev => [
      ...prev,
      { ...newTransaction, id: Date.now() },
    ]);
  };

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

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
      {children}
    </FinanceContext.Provider>
  );
}

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error("useFinance must be used within a FinanceProvider");
  }
  return context;
};