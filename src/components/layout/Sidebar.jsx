import React from "react";
import { useFinance } from "../../context/FinanceContext";
import { FaHome, FaMoon, FaSun } from "react-icons/fa";
import avatar from "../../assets/avatar.png";

export function Sidebar() {
  const { role, theme, toggleTheme } = useFinance();

  return (
    <aside
      className="w-full h-16 lg:w-16 lg:h-screen fixed top-0 left-0 z-[100] 
      flex flex-row lg:flex-col justify-between items-center px-4 lg:px-0
      bg-[#05070a] text-white border-b lg:border-b-0 lg:border-r border-white/10 shadow-xl transition-all duration-300">
    
      {/* 🔹 Top Navigation Section */}
      <nav className="flex flex-row lg:flex-col items-center gap-4 lg:mt-10">
        <SidebarIcon icon={<FaHome size={18} />} label="Dashboard" active />
      </nav>

      {/* 🔹 Theme & Avatar Section */}
      <div className="flex flex-row lg:flex-col items-center gap-4 lg:gap-5 lg:mb-6">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="w-9 h-9 lg:w-10 lg:h-10 flex items-center justify-center rounded-xl
          bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white
          transition-all duration-200 border border-white/5"
        >
          {theme === "light" ? <FaMoon size={14} /> : <FaSun size={14} />}
        </button>

        {/* Avatar */}
        <div className="relative group">
          <img
            src={avatar}
            alt="Avatar"
            className="w-8 h-8 lg:w-10 lg:h-10 rounded-full border-2 border-indigo-500 shadow-md cursor-pointer object-cover"
          />
          {/* Tooltip for PC */}
          <div className="hidden lg:block absolute left-16 top-1/2 -translate-y-1/2
            bg-indigo-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-md
            opacity-0 group-hover:opacity-100 transition-all duration-200
            whitespace-nowrap shadow-xl z-[110] pointer-events-none uppercase tracking-widest"
          >
            {`Charul Jain (${role})`}
          </div>
        </div>
      </div>
    </aside>
  );
}

function SidebarIcon({ icon, label, active }) {
  return (
    <button
      className={`w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center rounded-xl transition-all duration-200
        ${
          active
            ? "bg-indigo-600 text-white shadow-[0_0_15px_rgba(79,70,229,0.4)]"
            : "text-gray-400 hover:bg-white/5 hover:text-white"
        }`}
      title={label}
    >
      {icon}
    </button>
  );
}