// src/components/common/Button.jsx
import React from "react";

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) {
  // 🔹 Base styles: Added 'inline-flex' and 'items-center' for better icon alignment
  // Added 'active:scale-95' globally for tactile feedback on touch
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 sm:active:scale-[0.98]";

  // 🔹 Variants: Refined colors for better dark mode contrast
  const variantStyles = {
    primary:
      "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-200 dark:shadow-none focus:ring-indigo-500",
    secondary:
      "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700 focus:ring-gray-400",
    danger:
      "bg-rose-600 text-white hover:bg-rose-700 shadow-md shadow-rose-200 dark:shadow-none focus:ring-rose-500",
    success:
      "bg-emerald-500 text-white hover:bg-emerald-600 shadow-md shadow-emerald-200 dark:shadow-none focus:ring-emerald-400",
    warning:
      "bg-amber-400 text-white hover:bg-amber-500 focus:ring-amber-300",
  };

  // 🔹 Sizes: Increased padding for mobile 'sm' and 'md' to ensure a 44px hit-target
  const sizeStyles = {
    sm: "px-3.5 py-2 text-xs md:text-sm", 
    md: "px-5 py-2.5 text-sm",
    lg: "px-8 py-4 text-base",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}