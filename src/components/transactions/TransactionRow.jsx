// src/components/transactions/TransactionRow.jsx
import { FaArrowUp, FaArrowDown, FaTrash } from "react-icons/fa";
import { useFinance } from "../../context/FinanceContext";

export function TransactionRow({ transaction }) {
  const { deleteTransaction, role } = useFinance();
  const { id, date, amount, category, type, description } = transaction;

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
  const formattedAmount = Number(amount).toLocaleString();

  return (
    <tr className="group border-b border-slate-100 dark:border-white/[0.05] hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-all duration-200">
      
      {/* 🔹 DATE & ICON (Desktop) / PRIMARY INFO (Mobile) */}
      <td className="p-3 md:p-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg shrink-0 ${
            type === "income" 
              ? "bg-emerald-500/10 text-emerald-500" 
              : "bg-rose-500/10 text-rose-500"
          }`}>
            {type === "income" ? <FaArrowDown size={12} /> : <FaArrowUp size={12} />}
          </div>
          <div className="flex flex-col">
            {/* Mobile-only Description: Keeps row height compact */}
            <span className="text-xs font-bold text-slate-800 dark:text-slate-100 md:hidden truncate max-w-[120px]">
              {description || "No description"}
            </span>
            <span className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-tight">
              {formattedDate}
            </span>
          </div>
        </div>
      </td>

      {/* 🔹 DESCRIPTION (Desktop Only) */}
      <td className="hidden md:table-cell p-4 text-sm font-medium text-slate-700 dark:text-slate-200">
        {description || "—"}
      </td>

      {/* 🔹 CATEGORY (Desktop/Tablet Only) */}
      <td className="hidden sm:table-cell p-4 text-sm">
        <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/50 text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-white/5">
          {category}
        </span>
      </td>

      {/* 🔹 AMOUNT (Always Visible & Clean) */}
      <td className={`p-3 md:p-4 text-right font-black tracking-tighter text-sm md:text-base ${
        type === "income" ? "text-emerald-500" : "text-rose-500"
      }`}>
        {type === "income" ? "+" : "-"}₹{formattedAmount}
      </td>

      {/* 🔹 ACTIONS (Admin Only) */}
      {role === "admin" && (
        <td className="p-3 md:p-4 text-center">
          <button
            onClick={() => deleteTransaction?.(id)}
            className="text-slate-400 hover:text-rose-500 transition-all p-1"
            title="Delete"
          >
            <FaTrash size={12} />
          </button>
        </td>
      )}
    </tr>
  );
}