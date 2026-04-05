import React, { useState } from "react";
import { useFinance } from "../../context/FinanceContext";
import { ExpenseChart } from "../charts/ExpenseChart";
import { BalanceChart } from "../charts/BalanceChart";
import { SummaryCardsContainer } from "./SummaryCardsContainer";
import { TransactionTable } from "../transactions/TransactionTable";
import { TransactionFilter } from "../transactions/TransactionFilters";
import { AddTransactionModal } from "../transactions/AddTransactionModal";
import { Card } from "../common/Card";
import { Button } from "../common/Button";
import { Insights } from "../insights/Insights";
import { useFilteredTransactions } from "../../hooks/useFilteredTransactions";
import { useSmartTip } from "../../hooks/useSmartTip";

export function Dashboard() {
  const { transactions, summary, role } = useFinance();
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState({
    searchQuery: "",
    type: "all",
    sortBy: "date",
    sortOrder: "desc",
  });

  const filteredTransactions = useFilteredTransactions(transactions, filters);
  const smartTip = useSmartTip(transactions);

  return (
    // 🟢 No extra padding or headers here. Purely content.
    <div className="flex-1 space-y-6 md:space-y-10">
      <SummaryCardsContainer summary={summary} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 pb-10">
        <div className="lg:col-span-12 space-y-6 md:space-y-8">
          
          {/* Charts Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <Card className="p-0 border-none shadow-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-md overflow-hidden flex flex-col h-[380px] sm:h-[420px]">
              <div className="p-5">
                <h3 className="text-sm font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
                  Balance Trend
                </h3>
              </div>
              <div className="flex-1 min-h-0 w-full px-2 pb-4">
                <BalanceChart transactions={filteredTransactions} />
              </div>
            </Card>

            <Card className="p-0 border-none shadow-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-md overflow-hidden flex flex-col h-[380px] sm:h-[420px]">
              <div className="p-5">
                <h3 className="text-sm font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-rose-500 rounded-full"></span>
                  Expense Breakdown
                </h3>
              </div>
              <div className="flex-1 min-h-0 w-full px-2 pb-4">
                <ExpenseChart transactions={filteredTransactions} />
              </div>
            </Card>
          </div>

          {/* Transactions Table Area */}
          <Card className="p-4 md:p-6 overflow-hidden border-none shadow-2xl bg-white dark:bg-gray-900">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div className="space-y-1">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">Transaction History</h3>
                <p className="text-xs text-gray-500">Detailed log of activities</p>
              </div>
              {role === "admin" && (
                <Button size="sm" variant="primary" onClick={() => setShowModal(true)}>+ Add Transaction</Button>
              )}
            </div>
            <TransactionFilter onFilterChange={setFilters} />
            <div className="w-full overflow-x-auto no-scrollbar mt-6">
              <TransactionTable transactions={filteredTransactions} role={role} filters={filters} />
            </div>
          </Card>

          <Insights transactions={filteredTransactions} smartTip={smartTip} />
        </div>
      </div>

      {showModal && <AddTransactionModal onClose={() => setShowModal(false)} />}
    </div>
  );
}