// src/hooks/useFilteredTransactions.js
import { useMemo } from "react";

export function useFilteredTransactions(transactions, filters) {
  return useMemo(() => {
    return transactions
      .filter((t) => {
        const query = filters.searchQuery.toLowerCase();
        return query
          ? t.category.toLowerCase().includes(query) ||
              (t.description || "").toLowerCase().includes(query)
          : true;
      })
      .filter((t) =>
        filters.type !== "all" ? t.type === filters.type : true
      )
      .sort((a, b) => {
        const result =
          filters.sortBy === "amount"
            ? a.amount - b.amount
            : new Date(a.date) - new Date(b.date);

        return filters.sortOrder === "asc" ? result : -result;
      });
  }, [transactions, filters]);
}