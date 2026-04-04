// src/components/transactions/AddTransactionModal.jsx
import { useState, useEffect, useRef } from "react";
import { useFinance } from "../../context/FinanceContext";
import { Card } from "../common/Card";
import { Button } from "../common/Button";

export function AddTransactionModal({ onClose }) {
  const { addTransaction } = useFinance();
  const [form, setForm] = useState({
    date: "",
    amount: "",
    category: "",
    type: "expense",
    description: "",
  });
  const [error, setError] = useState("");
  const firstInputRef = useRef(null);

  useEffect(() => {
    firstInputRef.current?.focus();
    const handleEsc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const isFormValid = form.date && form.amount > 0 && form.category.trim();

  const handleSubmit = (e) => {
  e.preventDefault();
  if (!isFormValid) {
    setError("Date, Amount, and Category are required (Amount > 0).");
    return;
  }

  // Normalize data for Insights
  addTransaction({
    ...form,
    amount: Number(form.amount),           // always number
    category: form.category.trim(),        // clean category
    type: form.type.toLowerCase(),         // lowercase 'income' or 'expense'
    date: form.date,                       // already in YYYY-MM-DD
  });

  // Reset form
  setForm({ date: "", amount: "", category: "", type: "expense", description: "" });
  onClose();
};

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 transition-opacity duration-300">
      <Card className="w-full max-w-md p-6 shadow-2xl transform transition-all scale-95 md:scale-100 hover:scale-105">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
          Add Transaction
        </h2>

        {error && (
          <div className="mb-3 p-2 text-sm text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="date"
            name="date"
            ref={firstInputRef}
            value={form.date}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
          />
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={form.amount}
            onChange={handleChange}
            min="0.01"
            step="0.01"
            className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
          />
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
          <input
            type="text"
            name="description"
            placeholder="Description (optional)"
            value={form.description}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
          />

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={!isFormValid}>Add</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}