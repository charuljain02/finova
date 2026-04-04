import React from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-[#0B0E14]">

      {/* Sidebar (fixed) */}
      <Sidebar />

      {/* Main Content (shifted right) */}
      <div className="flex-1 flex flex-col ml-20">
        <Header />
        <main className="p-8 flex-1 overflow-auto light-grid-bg">
          {children}
        </main>
      </div>

    </div>
  );
}