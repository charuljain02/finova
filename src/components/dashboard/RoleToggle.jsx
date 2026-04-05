// src/components/dashboard/RoleToggle.jsx
import React from "react";

export function RoleToggle({ role, setRole }) {
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      
      {/* 🔹 Toggle Container */}
      <div className="relative group">
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="
            appearance-none
            /* 📱 Mobile: Slightly smaller padding | 💻 Desktop: Standard px-4 */
            pl-3 pr-8 py-1.5 sm:px-4 sm:py-2 sm:pr-10
            rounded-xl text-xs sm:text-sm font-semibold
            border border-gray-200 dark:border-gray-800
            bg-white dark:bg-gray-900
            text-gray-700 dark:text-gray-200
            shadow-sm ring-1 ring-black/5 dark:ring-white/5
            focus:outline-none focus:ring-2 focus:ring-indigo-500
            hover:border-indigo-400 dark:hover:border-indigo-500
            transition-all duration-200
            cursor-pointer
          "
        >
          <option value="viewer">Viewer</option>
          <option value="admin">Admin</option>
        </select>

        {/* 🔽 Custom Arrow (Simplified for cleaner UI) */}
        <div className="pointer-events-none absolute inset-y-0 right-2.5 flex items-center text-[10px] text-gray-400 dark:text-gray-500 group-hover:text-indigo-500 transition-colors">
          ▼
        </div>
      </div>

      {/* 🔥 Active Role Badge: Smaller text on mobile */}
      <span
        className={`
          text-[10px] sm:text-xs font-bold px-2 py-0.5 sm:py-1 rounded-lg uppercase tracking-wider
          transition-colors duration-300
          ${
            role === "admin"
              ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-500/20"
              : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400 border border-gray-200 dark:border-gray-700"
          }
        `}
      >
        {role}
      </span>

    </div>
  );
}