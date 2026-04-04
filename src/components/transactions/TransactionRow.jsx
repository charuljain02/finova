// src/components/transactions/TransactionRow.jsx
import { FaArrowUp, FaArrowDown, FaTrash } from "react-icons/fa";
import { useFinance } from "../../context/FinanceContext";

export function TransactionRow({ transaction }) {
  const { deleteTransaction, role } = useFinance();
  const { id, date, amount, category, type, description } = transaction;

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const formattedAmount = Number(amount).toLocaleString();

  return (
    <tr className="border-b border-slate-100 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors duration-200">
      <td className="p-4 text-sm text-gray-500 dark:text-gray-400">{formattedDate}</td>
      <td className="p-4 text-sm font-medium text-gray-800 dark:text-gray-100">
        {description || "No description"}
      </td>
      <td className="p-4 text-sm text-gray-500 dark:text-gray-400">{category}</td>
      <td className="p-4">
        <span
          className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold w-fit transition-all ${
            type === "income"
              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
              : "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400"
          }`}
        >
          {type === "income" ? <FaArrowDown size={12} /> : <FaArrowUp size={12} />}
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </td>
      <td
        className={`p-4 text-right font-bold ${
          type === "income" ? "text-emerald-600 dark:text-emerald-400" : "text-rose-500 dark:text-rose-400"
        }`}
      >
        ₹{formattedAmount}
      </td>
      {role === "admin" && deleteTransaction && (
        <td className="p-4 text-center">
          <button
            onClick={() => deleteTransaction(id)}
            className="text-slate-400 hover:text-rose-500 transition-colors duration-200"
            title="Delete Transaction"
          >
            <FaTrash size={14} />
          </button>
        </td>
      )}
    </tr>
  );
}