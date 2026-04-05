import React from "react";

export function Footer() {
  return (
    <footer className="w-full py-10 bg-transparent border-t border-white/5 mt-auto">
      <div className="max-w-[1400px] mx-auto px-4 md:px-10">
        {/* 🟢 Added 'text-center' class here */}
        <p className="text-xs md:text-sm text-gray-500 font-medium tracking-wide text-center">
          © {new Date().getFullYear()} <span className="text-indigo-400">Zorvyn Finance</span> • Built by <span className="text-white">Charul Jain</span>
        </p>
      </div>
    </footer>
  );
}