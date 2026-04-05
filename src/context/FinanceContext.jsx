import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { transactions as mockData } from "../data/mockdata";

const FinanceContext = createContext();

export function FinanceProvider({ children }) {
  // 🔹 DATA VERSIONING: Jab bhi aap mockdata.js badlo, is version ko "1.1" se "1.2" kar dena
  const DATA_VERSION = "1.1"; 

  // 🔹 Transactions State with Smart Reset
  const [transactions, setTransactions] = useState(() => {
    const stored = localStorage.getItem("transactions");
    const storedVersion = localStorage.getItem("data_version");

    // Agar version alag hai ya data pehli baar load ho raha hai, toh mockData use karein
    if (!stored || storedVersion !== DATA_VERSION) {
      localStorage.setItem("data_version", DATA_VERSION);
      return mockData;
    }

    try {
      return JSON.parse(stored);
    } catch (error) {
      return mockData;
    }
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

  // 🔹 Summary Calculation
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