// src/components/layout/Sidebar.jsx
import React from "react";
import { useFinance } from "../../context/FinanceContext";
import { FaHome, FaMoon, FaSun } from "react-icons/fa";
import avatar from "../../assets/avatar.png";

export function Sidebar() {
  const { role, theme, toggleTheme } = useFinance();

  return (
    <aside
      className="w-20 h-screen fixed z-50 flex flex-col justify-between
      bg-gray-900 text-white
      border-r border-gray-800
      shadow-[4px_0_20px_rgba(0,0,0,0.25)]
      transition-all duration-300"
    >
      {/* 🔹 Top Navigation */}
      <nav className="flex flex-col items-center gap-4 mt-10">
        <SidebarIcon icon={<FaHome size={18} />} label="Dashboard" active />
      </nav>

      {/* 🔹 Bottom Section */}
      <div className="flex flex-col items-center gap-5 mb-6">

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="w-10 h-10 flex items-center justify-center rounded-xl
          bg-gray-800 text-gray-300
          hover:bg-gray-700 hover:text-white
          transition-all duration-200"
        >
          {theme === "light" ? <FaMoon size={14} /> : <FaSun size={14} />}
        </button>

        {/* Avatar + Tooltip */}
        <div className="relative group">
          <img
            src={avatar}
            alt="Avatar"
            className="w-9 h-9 rounded-full border-2 border-indigo-500 shadow-md cursor-pointer"
          />

          {/* Tooltip */}
          <div
            className="absolute left-14 top-1/2 -translate-y-1/2
            bg-gray-800 text-white text-xs px-3 py-1.5 rounded-md
            opacity-0 group-hover:opacity-100 transition-all duration-200
            whitespace-nowrap shadow-lg"
          >
            {`Charul Jain (${role})`}
          </div>
        </div>
      </div>
    </aside>
  );
}

/* 🔹 Sidebar Icon Component */
function SidebarIcon({ icon, label, active }) {
  return (
    <button
      className={`w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-200
        ${
          active
            ? "bg-indigo-600 text-white shadow-lg"
            : "text-gray-400 hover:bg-gray-800 hover:text-white"
        }`}
      title={label}
    >
      {icon}
    </button>
  );
}