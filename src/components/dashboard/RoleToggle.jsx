import React from "react";

export function RoleToggle({ role, setRole }) {
  return (
    <div className="flex items-center gap-3">

      {/* 🔹 Label */}
      <span className="text-sm md:text-base font-medium text-gray-700 dark:text-gray-300">
        
      </span>

      {/* 🔹 Toggle Container */}
      <div className="relative">
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="
            appearance-none
            px-4 py-2 pr-10
            rounded-xl
            border border-gray-300 dark:border-gray-600
            bg-white dark:bg-gray-800
            text-gray-900 dark:text-gray-100
            shadow-sm
            focus:outline-none focus:ring-2 focus:ring-indigo-500
            hover:border-indigo-400
            transition-all duration-200
            cursor-pointer
          "
        >
          <option value="viewer"> Viewer</option>
          <option value="admin"> Admin</option>
        </select>

        {/* 🔽 Custom Arrow */}
        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-400">
          ▼
        </div>
      </div>

      {/* 🔥 Active Role Badge */}
      <span
        className={`
          text-xs font-semibold px-2 py-1 rounded-full
          ${
            role === "admin"
              ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-300"
              : "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
          }
        `}
      >
        {role.toUpperCase()}
      </span>

    </div>
  );
}