import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

interface BadgeProps {
  children: React.ReactNode;
  variant?:
    | "default"
    | "outline"
    | "success"
    | "warning"
    | "error"
    | "ai"
    | "premium"
    | "new";
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
  animate?: boolean;
  glow?: boolean;
  pulse?: boolean;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
  size = "md",
  className,
  animate = false,
  glow = false,
  pulse = false,
}) => {
  const variants = {
    default: "bg-gradient-to-r from-blue-500 to-blue-600 text-white",
    outline:
      "bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200",
    success: "bg-gradient-to-r from-emerald-500 to-teal-500 text-white",
    warning: "bg-gradient-to-r from-amber-500 to-orange-500 text-white",
    error: "bg-gradient-to-r from-red-500 to-rose-500 text-white",
    ai: "bg-gradient-to-r from-purple-500 to-indigo-500 text-white",
    premium: "bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-900",
    new: "bg-gradient-to-r from-pink-500 to-rose-500 text-white",
  };

  const sizes = {
    xs: "text-xs px-1.5 py-0.5 rounded-md",
    sm: "text-xs px-2 py-1 rounded-lg",
    md: "text-sm px-2.5 py-1 rounded-lg",
    lg: "text-base px-3 py-1.5 rounded-xl",
  };

  const glowColors = {
    default: "shadow-blue-500/50",
    outline: "shadow-slate-200/50 dark:shadow-slate-700/50",
    success: "shadow-emerald-500/50",
    warning: "shadow-amber-500/50",
    error: "shadow-red-500/50",
    ai: "shadow-purple-500/50",
    premium: "shadow-amber-400/50",
    new: "shadow-pink-500/50",
  };

  const BadgeContent = (
    <span
      className={cn(
        "inline-flex items-center justify-center font-medium transition-all duration-200",
        "backdrop-blur-sm backdrop-saturate-150",
        variants[variant],
        sizes[size],
        glow && `shadow-lg ${glowColors[variant]}`,
        pulse && "animate-pulse",
        className,
      )}
    >
      {/* Inner gradient overlay */}
      <span className="absolute inset-0 rounded-inherit bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

      {/* Badge content */}
      <span className="relative flex items-center gap-1">{children}</span>
    </span>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        className="group inline-flex"
      >
        {BadgeContent}
      </motion.div>
    );
  }

  return <div className="group inline-flex">{BadgeContent}</div>;
};

export default Badge;
