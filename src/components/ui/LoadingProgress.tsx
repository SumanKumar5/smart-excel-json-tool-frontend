import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

interface LoadingProgressProps {
  isLoading: boolean;
  progress?: number;
  className?: string;
  variant?: "default" | "ai" | "success" | "warning" | "error";
  showPercentage?: boolean;
  size?: "sm" | "md" | "lg";
  indeterminate?: boolean;
}

const LoadingProgress: React.FC<LoadingProgressProps> = ({
  isLoading,
  progress = 0,
  className,
  variant = "default",
  showPercentage = false,
  size = "md",
  indeterminate = true,
}) => {
  if (!isLoading) return null;

  const variants = {
    default:
      "from-blue-500 via-blue-600 to-blue-700 dark:from-blue-400 dark:via-blue-500 dark:to-blue-600",
    ai: "from-purple-500 via-purple-600 to-purple-700 dark:from-purple-400 dark:via-purple-500 dark:to-purple-600",
    success:
      "from-emerald-500 via-emerald-600 to-emerald-700 dark:from-emerald-400 dark:via-emerald-500 dark:to-emerald-600",
    warning:
      "from-amber-500 via-amber-600 to-amber-700 dark:from-amber-400 dark:via-amber-500 dark:to-amber-600",
    error:
      "from-red-500 via-red-600 to-red-700 dark:from-red-400 dark:via-red-500 dark:to-red-600",
  };

  const sizes = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3",
  };

  const containerSizes = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3",
  };

  return (
    <div className={cn("relative w-full", className)}>
      {/* Background track */}
      <div
        className={cn(
          "w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden",
          containerSizes[size],
        )}
      >
        {/* Progress bar */}
        <motion.div
          initial={{ width: "0%" }}
          animate={{
            width: progress ? `${progress}%` : "100%",
            transition: {
              duration: progress ? 0.3 : 1.5,
              repeat: indeterminate ? Infinity : 0,
              repeatType: "reverse",
              ease: "easeInOut",
            },
          }}
          className={cn(
            "h-full bg-gradient-to-r transition-all duration-300",
            variants[variant],
            sizes[size],
          )}
        >
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 w-full h-full"
            animate={{
              backgroundPosition: ["200% 0", "-200% 0"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
              backgroundSize: "200% 100%",
            }}
          />
        </motion.div>
      </div>

      {/* Percentage indicator */}
      {showPercentage && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute right-0 top-0 -mt-6 text-sm font-medium text-slate-600 dark:text-slate-300"
        >
          {progress ? `${Math.round(progress)}%` : "Loading..."}
        </motion.div>
      )}

      {/* Pulse dots for indeterminate state */}
      {indeterminate && (
        <div className="absolute right-0 top-0 -mt-6 flex space-x-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className={cn(
                "w-1 h-1 rounded-full",
                variant === "default"
                  ? "bg-blue-500 dark:bg-blue-400"
                  : variant === "ai"
                    ? "bg-purple-500 dark:bg-purple-400"
                    : variant === "success"
                      ? "bg-emerald-500 dark:bg-emerald-400"
                      : variant === "warning"
                        ? "bg-amber-500 dark:bg-amber-400"
                        : "bg-red-500 dark:bg-red-400",
              )}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default LoadingProgress;
