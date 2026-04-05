export function Card({ children, className = "", hover = false }) {
  return (
    <div className={`
      /* 🟢 Background & Core Layout */
      bg-white dark:bg-[#111827] 
      relative 
      overflow-hidden /* ⚡ Prevents content from breaking rounded corners */
      
      /* 🟢 Responsive Rounding */
      rounded-2xl sm:rounded-3xl 
      
      /* 🟢 Borders & Shadows */
      border border-slate-100 dark:border-slate-800 
      shadow-sm 
      
      /* 🟢 Transition Logic */
      transition-all duration-300 ease-in-out
      
      /* 🟢 Interaction Logic */
      /* sm:hover ensures the vertical lift only happens with a mouse */
      /* active:scale gives tactile feedback on mobile taps */
      ${hover ? `
        hover:shadow-md sm:hover:shadow-lg 
        sm:hover:-translate-y-1 
        active:scale-[0.98] sm:active:scale-100
      ` : ""}
      
      /* 🟢 Custom overrides */
      ${className}
    `}>
      {children}
    </div>
  );
}