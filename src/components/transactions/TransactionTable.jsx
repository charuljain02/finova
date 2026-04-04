// src/components/transactions/TransactionTable.jsx
import { useState, useRef } from "react";
import { TransactionRow } from "./TransactionRow";
import { Card } from "../common/Card";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

export function TransactionTable({ transactions = [], role = "viewer", filters }) {
  const { searchQuery, type, sortBy, sortOrder } = filters || {};

  // --- PAGINATION STATE ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // --- REF FOR SCROLLING ---
  const tableRef = useRef(null);

  // --- FILTER & SORT LOGIC ---
  const filteredTransactions = transactions
    .filter((t) => {
      const query = searchQuery?.toLowerCase();
      return query
        ? t.category.toLowerCase().includes(query) ||
            (t.description || "").toLowerCase().includes(query)
        : true;
    })
    .filter((t) => (type && type !== "all" ? t.type === type : true))
    .sort((a, b) => {
      const result =
        sortBy === "amount"
          ? a.amount - b.amount
          : new Date(a.date) - new Date(b.date);
      return sortOrder === "asc" ? result : -result;
    });

  // --- PAGINATION CALCULATIONS ---
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem);

  // --- PAGINATE FUNCTION ---
  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      tableRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Card className="p-4 md:p-6 shadow-xl rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 transition-all">
      
      {/* --- TRANSACTION TABLE --- */}
      <div ref={tableRef} className="overflow-x-auto rounded-lg">
        <table className="min-w-full text-sm text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-slate-800/50 text-gray-600 dark:text-gray-400 uppercase text-[11px] font-bold tracking-widest">
              <th className="py-4 px-4">Date</th>
              <th className="py-4 px-4">Description</th>
              <th className="py-4 px-4">Category</th>
              <th className="py-4 px-4">Type</th>
              <th className="py-4 px-4 text-right">Amount</th>
              {role === "admin" && <th className="py-4 px-4 text-center">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {currentItems.length > 0 ? (
              currentItems.map((t) => <TransactionRow key={t.id} transaction={t} />)
            ) : (
              <tr>
                <td
                  colSpan={role === "admin" ? 6 : 5}
                  className="text-center py-10 text-gray-400 dark:text-gray-500 italic"
                >
                  No matching transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* --- PAGINATION CONTROLS --- */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 px-2">
          
          {/* Showing results info */}
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Showing <span className="text-slate-900 dark:text-slate-200">{indexOfFirstItem + 1}</span> 
            to <span className="text-slate-900 dark:text-slate-200">{Math.min(indexOfLastItem, filteredTransactions.length)}</span> 
            of <span className="text-slate-900 dark:text-slate-200">{filteredTransactions.length}</span>
          </p>

          {/* Pagination buttons */}
          <div className="flex items-center gap-2">
            
            {/* Prev Arrow */}
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-blue-500 hover:text-blue-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
            >
              <FaAngleLeft size={18} />
            </button>

            {/* Page numbers */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/40 p-1 rounded-2xl border border-slate-200 dark:border-slate-700/50">
              {[...Array(totalPages)].map((_, i) => {
                const pageNum = i + 1;

                // Ellipsis logic
                if (
                  totalPages > 5 &&
                  pageNum !== 1 &&
                  pageNum !== totalPages &&
                  Math.abs(pageNum - currentPage) > 1
                ) {
                  if (Math.abs(pageNum - currentPage) === 2) {
                    return <span key={pageNum} className="px-1 text-slate-400">...</span>;
                  }
                  return null;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => paginate(pageNum)}
                    className={`w-9 h-9 rounded-xl text-sm font-bold transition-all duration-300 ${
                      currentPage === pageNum
                        ? "bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)] scale-105"
                        : "text-slate-500 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 hover:text-blue-500"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            {/* Next Arrow */}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-blue-500 hover:text-blue-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
            >
              <FaAngleRight size={18} />
            </button>
          </div>
        </div>
      )}
    </Card>
  );
}