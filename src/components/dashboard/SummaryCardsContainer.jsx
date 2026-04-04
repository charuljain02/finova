// src/components/dashboard/SummaryCardsContainer.jsx
import React from "react";
import { Card } from "../common/Card";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/solid";

// 🔹 Helper function to format numbers in Indian notation (Thousand, Lakh, Crore)
function formatIndianNumber(num) {
  if (num >= 1_00_00_000) {
    return `₹${(num / 1_00_00_000).toFixed(2)} Cr`;
  } else if (num >= 1_00_000) {
    return `₹${(num / 1_00_000).toFixed(2)} L`;
  } else if (num >= 1_000) {
    return `₹${(num / 1_000).toFixed(2)} K`;
  } else {
    return `₹${num}`;
  }
}

export function SummaryCardsContainer({ summary }) {
  const cards = [
    {
      title: "Total Balance",
      value: formatIndianNumber(summary.balance),
      textColor: "text-indigo-600 dark:text-indigo-400",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-indigo-500 dark:text-indigo-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2v4h6v-4c0-1.105-1.343-2-3-2z"
          />
        </svg>
      ),
      trend: null,
    },
    {
      title: "Income",
      value: formatIndianNumber(summary.income),
      textColor: "text-emerald-500 dark:text-emerald-400",
      icon: <ArrowUpIcon className="h-6 w-6 text-emerald-500 dark:text-emerald-400" />,
      trend: "+8% from last month",
    },
    {
      title: "Expenses",
      value: formatIndianNumber(summary.expenses),
      textColor: "text-rose-500 dark:text-rose-400",
      icon: <ArrowDownIcon className="h-6 w-6 text-rose-500 dark:text-rose-400" />,
      trend: "-5% from last month",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
      {cards.map((card, index) => (
        <Card
          key={index}
          hover
          className="p-4 flex flex-col justify-between transition-transform duration-300 ease-in-out hover:scale-105 shadow-lg dark:shadow-gray-700 rounded-xl bg-white dark:bg-gray-900"
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{card.title}</p>
            {card.icon}
          </div>
          <h2 className={`text-2xl font-bold ${card.textColor}`}>{card.value}</h2>
          {card.trend && (
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{card.trend}</p>
          )}
        </Card>
      ))}
    </div>
  );
}