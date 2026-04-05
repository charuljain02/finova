// src/components/transactions/TransactionTable.jsx
import { useState, useRef } from "react";
import { TransactionRow } from "./TransactionRow";
import { Card } from "../common/Card";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

export function TransactionTable({ transactions = [], role = "viewer", filters }) {
  const { searchQuery, type, sortBy, sortOrder } = filters || {};

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // More items per page for a sleeker list
  const tableRef = useRef(null);

  // --- FILTER & SORT LOGIC ---
  const filteredTransactions = transactions
    .filter((t) => {
      const query = searchQuery?.toLowerCase();
      return query
        ? t.category.toLowerCase().includes(query) || (t.description || "").toLowerCase().includes(query)
        : true;
    })
    .filter((t) => (type && type !== "all" ? t.type === type : true))
    .sort((a, b) => {
      const result = sortBy === "amount" ? a.amount - b.amount : new Date(a.date) - new Date(b.date);
      return sortOrder === "asc" ? result : -result;
    });

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      tableRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Card className="p-0 shadow-2xl rounded-3xl bg-white dark:bg-[#0B0F1A] border border-slate-200 dark:border-white/5 overflow-hidden transition-all">
      <div ref={tableRef} className="w-full overflow-x-auto no-scrollbar">
        <table className="w-full text-left border-collapse min-w-[300px]">
          <thead>
            <tr className="bg-slate-100/80 dark:bg-white/[0.02] text-slate-400 dark:text-slate-500 uppercase text-[10px] font-black tracking-[0.2em] border-b border-slate-200 dark:border-white/5">
              <th className="py-5 px-4">Transaction</th>
              <th className="py-5 px-4 hidden md:table-cell">Description</th>
              <th className="py-5 px-4 hidden sm:table-cell">Category</th>
              <th className="py-5 px-4 text-right">Amount</th>
              {role === "admin" && <th className="py-5 px-4 text-center">Action</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-white/[0.05]">
            {currentItems.length > 0 ? (
              currentItems.map((t) => (
                <TransactionRow key={t.id} transaction={t} />
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-20 text-slate-400 dark:text-slate-600 font-medium text-sm">
                  No matching records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* --- COMPACT PAGINATION --- */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between p-5 bg-white dark:bg-transparent border-t border-slate-100 dark:border-white/5">
          <p className="hidden sm:block text-[10px] font-black uppercase tracking-widest text-slate-400">
            Page {currentPage} of {totalPages}
          </p>
          
          <div className="flex items-center gap-2 w-full sm:w-auto justify-between">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:border-indigo-500 hover:text-indigo-500 disabled:opacity-20 transition-all"
            >
              <FaAngleLeft size={16} />
            </button>

            {/* Simple Indicator for Mobile */}
            <span className="sm:hidden text-xs font-bold text-slate-500">
              {currentPage} / {totalPages}
            </span>

            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:border-indigo-500 hover:text-indigo-500 disabled:opacity-20 transition-all"
            >
              <FaAngleRight size={16} />
            </button>
          </div>
        </div>
      )}
    </Card>
  );
}