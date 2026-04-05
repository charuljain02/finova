import React from "react";
import { RoleToggle } from "../dashboard/RoleToggle";
import { useFinance } from "../../context/FinanceContext";

export function Header() {
  const { role, setRole } = useFinance();

  return (
    <header className="relative pt-20 pb-20 lg:pt-28 lg:pb-24 overflow-hidden">
      {/* 🔹 Background Glow - Reduced opacity for light mode */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[600px] h-[400px] bg-indigo-600/5 dark:bg-indigo-600/10 blur-[120px] pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto px-5 lg:px-10 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-12 lg:gap-16">
          
          {/* 🔹 Left Side: Branding */}
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 dark:bg-indigo-500/5 border border-indigo-500/20 dark:border-indigo-500/10 backdrop-blur-xl">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse" />
              <span className="text-indigo-600 dark:text-indigo-400 text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em]">
                Intelligence Portal 2.0
              </span>
            </div>

            <div className="space-y-2">
              <h2 className="text-slate-500 dark:text-slate-400 font-medium text-sm sm:text-lg">
                Welcome back, <span className="text-slate-900 dark:text-white font-bold">Charul Jain</span>
              </h2>
              {/* FIXED: Text color changes based on theme */}
              <h1 className="text-6xl sm:text-8xl lg:text-[120px] font-black tracking-tighter leading-[0.85] text-slate-900 dark:text-white">
                FIN<span className="text-indigo-500">OVA</span>
              </h1>
              <p className="text-slate-500 dark:text-slate-500 text-[11px] sm:text-base max-w-[280px] sm:max-w-md leading-relaxed">
                Precision Analytics for the Next Generation of Asset Management.
              </p>
            </div>
          </div>

          {/* 🔹 Right Side: Workspace Switcher Card */}
          <div className="w-full max-w-[320px] sm:max-w-[360px] group relative z-20 mb-12 lg:mb-0">
            {/* FIXED: Card background and text adapt to light/dark mode */}
            <div className="relative p-6 sm:p-8 bg-white/70 dark:bg-slate-900/60 backdrop-blur-3xl border border-slate-200 dark:border-white/10 rounded-[2.5rem] shadow-2xl">
              
              <div className="flex items-center justify-between mb-8">
                <div className="text-left">
                  <span className="text-[9px] font-black text-indigo-500 uppercase tracking-widest block">Security Status</span>
                  <p className="text-slate-400 dark:text-white/40 text-[9px] font-medium">End-to-end Encrypted</p>
                </div>
                <div className="px-3 py-1 rounded-lg bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-[9px] font-black uppercase">
                  {role}
                </div>
              </div>

              <div className="space-y-5 text-left">
                <h4 className="text-slate-900 dark:text-white font-bold text-xs uppercase tracking-widest">Workspace</h4>
                <div className="w-full">
                  <div className="scale-95 sm:scale-100 origin-center lg:origin-left">
                    <RoleToggle role={role} setRole={setRole} />
                  </div>
                </div>
              </div>
              
              <p className="mt-8 text-center text-[8px] text-slate-400 dark:text-slate-600 font-bold uppercase tracking-[0.2em] animate-pulse">
                Mainframe Sync Active
              </p>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}