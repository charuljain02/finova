// src/components/transactions/TransactionFilter.jsx
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

export function TransactionFilter({ onFilterChange }) {
  const [filters, setFilters] = useState({
    searchQuery: "",
    type: "all",
    sortBy: "date", // 'date' or 'amount'
    sortOrder: "desc", // 'asc' or 'desc'
  });

  // Notify parent whenever filters change
  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  // Generic handler for all filter inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4 p-2">
      {/* 🔍 Search */}
      <div className="relative w-full md:w-1/3">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-400">
          <FaSearch />
        </span>
        <input
          type="text"
          name="searchQuery"
          placeholder="Search transactions..."
          value={filters.searchQuery}
          onChange={handleChange}
          className="pl-10 w-full border border-gray-300 dark:border-gray-600 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-all duration-200 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
        />
      </div>

      {/* 🔽 Type Filter */}
      <select
        name="type"
        value={filters.type}
        onChange={handleChange}
        className="border border-gray-300 dark:border-gray-600 p-2 rounded-lg w-full md:w-1/4 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
      >
        <option value="all">All Types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      {/* 🔽 Sort By */}
      <select
        name="sortBy"
        value={filters.sortBy}
        onChange={handleChange}
        className="border border-gray-300 dark:border-gray-600 p-2 rounded-lg w-full md:w-1/4 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
      >
        <option value="date">Sort by Date</option>
        <option value="amount">Sort by Amount</option>
      </select>

      {/* 🔽 Sort Order */}
      <select
        name="sortOrder"
        value={filters.sortOrder}
        onChange={handleChange}
        className="border border-gray-300 dark:border-gray-600 p-2 rounded-lg w-full md:w-1/4 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
      >
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
      </select>
    </div>
  );
}