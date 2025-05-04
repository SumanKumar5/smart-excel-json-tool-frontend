import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "success"
    | "warning"
    | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled,
  fullWidth,
  onClick,
  ...props
}) => {
  const [ripples, setRipples] = React.useState<
    { x: number; y: number; id: number }[]
  >([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || isLoading) return;

    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();

    setRipples([...ripples, { x, y, id }]);
    setTimeout(() => {
      setRipples((ripples) => ripples.filter((r) => r.id !== id));
    }, 1000);

    onClick?.(e);
  };

  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-900 transform-gpu overflow-hidden";

  const variants = {
    primary:
      "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 active:from-blue-800 active:to-indigo-800 focus:ring-blue-500/50 dark:focus:ring-blue-400/50",
    secondary:
      "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 active:from-purple-800 active:to-pink-800 focus:ring-purple-500/50 dark:focus:ring-purple-400/50",
    outline:
      "border-2 border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 active:bg-slate-100 dark:active:bg-slate-700 focus:ring-slate-500/50 dark:focus:ring-slate-400/50",
    ghost:
      "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 active:bg-slate-200 dark:active:bg-slate-700 focus:ring-slate-500/50 dark:focus:ring-slate-400/50",
    success:
      "bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700 active:from-emerald-800 active:to-teal-800 focus:ring-emerald-500/50 dark:focus:ring-emerald-400/50",
    warning:
      "bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 active:from-amber-700 active:to-orange-700 focus:ring-amber-500/50 dark:focus:ring-amber-400/50",
    danger:
      "bg-gradient-to-r from-red-600 to-rose-600 text-white hover:from-red-700 hover:to-rose-700 active:from-red-800 active:to-rose-800 focus:ring-red-500/50 dark:focus:ring-red-400/50",
  };

  const sizes = {
    sm: "text-sm px-3 py-1.5 space-x-1.5",
    md: "text-sm px-4 py-2 space-x-2",
    lg: "text-base px-6 py-3 space-x-3",
  };

  const iconSizes = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-5 w-5",
  };

  const loadingState = isLoading && (
    <motion.span
      className="mr-2"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    >
      <svg
        className={cn("text-current", iconSizes[size])}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </motion.span>
  );

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        (disabled || isLoading) &&
          "opacity-60 cursor-not-allowed pointer-events-none",
        fullWidth && "w-full",
        "shadow-lg hover:shadow-xl relative",
        className,
      )}
      disabled={disabled || isLoading}
      onClick={handleClick}
      {...props}
    >
      {/* Ripple effects */}
      {ripples.map(({ x, y, id }) => (
        <motion.span
          key={id}
          initial={{ scale: 0, opacity: 0.35 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute bg-white/30 rounded-full pointer-events-none"
          style={{
            width: 100,
            height: 100,
            left: x - 50,
            top: y - 50,
          }}
        />
      ))}

      {/* Button content */}
      <span className="relative flex items-center justify-center">
        {isLoading
          ? loadingState
          : leftIcon && (
              <motion.span
                className={cn("flex-shrink-0", iconSizes[size])}
                initial={{ y: 0 }}
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 1 }}
              >
                {leftIcon}
              </motion.span>
            )}
        <span className="relative">{children}</span>
        {rightIcon && (
          <motion.span
            className={cn("flex-shrink-0", iconSizes[size])}
            initial={{ x: 0 }}
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            {rightIcon}
          </motion.span>
        )}
      </span>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-xl" />
    </motion.button>
  );
};

export default Button;
