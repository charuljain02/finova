// src/components/dashboard/Dashboard.jsx
import React, { useState } from "react";
import { useFinance } from "../../context/FinanceContext";

import { ExpenseChart } from "../charts/ExpenseChart";
import { BalanceChart } from "../charts/BalanceChart";
import { SummaryCardsContainer } from "./SummaryCardsContainer";

import { TransactionTable } from "../transactions/TransactionTable";
import { TransactionFilter } from "../transactions/TransactionFilters";
import { AddTransactionModal } from "../transactions/AddTransactionModal";

import { RoleToggle } from "./RoleToggle";
import { Button } from "../common/Button";
import { Card } from "../common/Card";
import { Footer } from "../layout/Footer";

import { Insights } from "../insights/Insights";

import { useFilteredTransactions } from "../../hooks/useFilteredTransactions";
import { useSmartTip } from "../../hooks/useSmartTip";

export function Dashboard() {
  const { transactions, summary, role, setRole } = useFinance();

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
    <div className="flex-1 light-grid-bg min-h-screen transition-all duration-300">
      {/* 🟢 Responsive Padding: p-4 for Mobile, p-6 for Tablet, p-10 for Desktop */}
      <div className="max-w-[1400px] mx-auto p-4 sm:p-6 lg:p-10 space-y-6 md:space-y-10">

        {/* 🔹 Header: Stacks on mobile, side-by-side on md+ */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
            <h1 className="text-xl md:text-3xl font-bold tracking-tight">
              <span className="text-gray-900 dark:text-white">Financial </span>
              <span className="text-indigo-600">Dashboard</span>
            </h1>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 max-w-xs md:max-w-md">
              Track, analyze and optimize your income and expenses in real-time.
            </p>
          </div>

          {/* Mode Toggle: Full width button on mobile if needed, or compact group */}
          <div className="flex items-center gap-3 bg-white/70 dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-gray-700 px-3 py-1.5 md:px-4 md:py-2 rounded-xl shadow-sm self-end md:self-auto">
            <span className="hidden sm:inline text-xs font-medium text-gray-500 dark:text-gray-400">
              Mode
            </span>
            <RoleToggle role={role} setRole={setRole} />
          </div>
        </div>

        {/* 🔹 Summary: Handled inside its container (usually a responsive grid) */}
        <SummaryCardsContainer summary={summary} />

        {/* 🔹 Main Grid: 12-column layout for PC, single column for Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          
          {/* Left Column: Charts and Transactions (Spans 12 on mobile, 8 on desktop) */}
          <div className="lg:col-span-8 space-y-6 md:space-y-8">

            {/* 🔹 Charts: 1 col on mobile, 2 cols on tablet/PC */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <Card hover className="p-4 md:p-5">
                <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-4">
                  Balance Trend
                </h3>
                <BalanceChart transactions={filteredTransactions} />
              </Card>

              <Card hover className="p-4 md:p-5">
                <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-4">
                  Expense Breakdown
                </h3>
                <ExpenseChart transactions={filteredTransactions} />
              </Card>
            </div>

            {/* 🔹 Transactions Card */}
            <Card hover className="p-4 md:p-6 overflow-hidden">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                  Transaction History
                </h3>

                {role === "admin" && (
                  <Button
                    size="sm"
                    variant="primary"
                    className="w-full sm:w-auto shadow-indigo-200 dark:shadow-none"
                    onClick={() => setShowModal(true)}
                  >
                    + New Transaction
                  </Button>
                )}
              </div>

              {/* Filters: Should be scrollable or wrapping on mobile */}
              <div className="mb-6">
                <TransactionFilter onFilterChange={setFilters} />
              </div>

              {/* Table: Usually requires horizontal scroll on mobile */}
              <div className="overflow-x-auto -mx-4 md:mx-0">
                <div className="min-w-[600px] md:min-w-full inline-block align-middle p-4 md:p-0">
                  <TransactionTable
                    transactions={filteredTransactions}
                    role={role}
                    filters={filters}
                  />
                </div>
              </div>
            </Card>

            {/* 🔹 Insights */}
            <div className="pt-2">
              <Insights transactions={filteredTransactions} smartTip={smartTip} />
            </div>

          </div>

          {/* Right Column (Placeholder for Sidebar Content like Goals/Recent Activity if added later) */}
          {/* Currently, your logic keeps everything in the 8-span column, 
              but the 12-column grid is ready if you want to move Insights to a sidebar on lg screens. */}
        </div>
      </div>

      {/* 🔹 Modal */}
      {showModal && (
        <AddTransactionModal onClose={() => setShowModal(false)} />
      )}

      <Footer />
    </div>
  );
}