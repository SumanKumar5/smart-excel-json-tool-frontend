import React from "react";
import { cn } from "../../utils/cn";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  icon?: React.ReactNode;
  animate?: boolean;
  tilt?: boolean;
  hover?: boolean;
  glassmorphism?: boolean;
  loading?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className,
  title,
  icon,
  animate = false,
  tilt = false,
  hover = true,
  glassmorphism = true,
  loading = false,
}) => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [50, 0]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tilt) return;

    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tilt) return;
    e.currentTarget.style.transform =
      "perspective(1000px) rotateX(0) rotateY(0)";
  };

  if (loading) {
    return (
      <div
        className={cn(
          "rounded-2xl overflow-hidden",
          "animate-pulse bg-slate-100 dark:bg-slate-800",
          className,
        )}
      >
        <div className="h-48"></div>
      </div>
    );
  }

  const cardContent = (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl overflow-hidden transition-all duration-300",
        glassmorphism &&
          "backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/50 dark:border-slate-700/50",
        hover && "hover:shadow-xl hover:-translate-y-1 hover:scale-102",
        tilt && "hover:shadow-2xl",
        "group relative",
        className,
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Border gradient animation */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Inner shadow */}
      <div className="absolute inset-0 rounded-2xl shadow-inner-glow opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Content container */}
      <div className="relative">
        {(title || icon) && (
          <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center space-x-3">
            {icon && (
              <motion.span
                className="text-blue-600 dark:text-blue-400"
                animate={
                  inView ? { scale: [0, 1.2, 1], rotate: [0, 10, 0] } : {}
                }
                transition={{ duration: 0.5 }}
              >
                {icon}
              </motion.span>
            )}
            {title && (
              <motion.h3
                className="font-semibold text-slate-800 dark:text-slate-200"
                animate={inView ? { opacity: [0, 1], y: [20, 0] } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {title}
              </motion.h3>
            )}
          </div>
        )}
        <motion.div
          className="p-6 relative"
          style={{ transform: "translateZ(20px)" }}
          animate={inView ? { opacity: [0, 1], y: [20, 0] } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {children}
        </motion.div>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" />
    </div>
  );

  if (animate) {
    return (
      <motion.div
        style={{ scale, y }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="group"
      >
        {cardContent}
      </motion.div>
    );
  }

  return <div className="group">{cardContent}</div>;
};

export default Card;
