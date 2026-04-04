export function Card({ children, className = "", hover = false }) {
  return (
    <div className={`
      /* 🟢 Colors & Background */
      bg-white dark:bg-[#111827] 
      
      /* 🟢 Responsive Rounding: 2xl on mobile, 3xl on desktop */
      rounded-2xl sm:rounded-3xl 
      
      /* 🟢 Borders & Shadows */
      border border-slate-100 dark:border-slate-800 
      shadow-sm 
      
      /* 🟢 Spacing: Adjust padding through the className or set a default */
      /* p-4 sm:p-6 (Add this if you want a base padding) */

      /* 🟢 Transition & Interactive Logic */
      transition-all duration-300 ease-in-out
      
      /* 🟢 Responsive Hover: Disable translate on mobile to prevent "jank" on touch */
      ${hover ? "hover:shadow-lg sm:hover:-translate-y-1 active:scale-[0.98] sm:active:scale-100" : ""}
      
      /* 🟢 Custom overrides */
      ${className}
    `}>
      {children}
    </div>
  );
}