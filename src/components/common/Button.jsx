export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) {
  // 🔹 Base styles: smooth transitions, focus, disabled states
  const baseStyles =
    "font-medium rounded-lg transition-transform transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  // 🔹 Variants: color, hover, active, focus ring
  const variantStyles = {
    primary:
      "bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95 focus:ring-indigo-500",
    secondary:
      "bg-gray-100 text-gray-900 hover:bg-gray-200 active:scale-95 focus:ring-gray-400",
    danger:
      "bg-rose-600 text-white hover:bg-rose-700 active:scale-95 focus:ring-rose-500",
    success:
      "bg-emerald-500 text-white hover:bg-emerald-600 active:scale-95 focus:ring-emerald-400",
    warning:
      "bg-amber-400 text-white hover:bg-amber-500 active:scale-95 focus:ring-amber-300",
  };

  // 🔹 Sizes: padding + font size
  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
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