import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FileSpreadsheet, FileJson, Code, Info, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";
import ThemeToggle from "../ui/ThemeToggle";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  const navItems = [
    {
      name: "Excel to JSON",
      path: "/excel-to-json",
      icon: <FileJson size={18} />,
    },
    {
      name: "JSON to Excel",
      path: "/json-to-excel",
      icon: <FileSpreadsheet size={18} />,
    },
    {
      name: "Schema Generator",
      path: "/schema-generator",
      icon: <Code size={18} />,
    },
    { name: "About", path: "/about", icon: <Info size={18} /> },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={cn(
        "fixed w-full z-50 transition-all duration-300",
        isScrolled
          ? "backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-b border-slate-200/20 dark:border-slate-700/20 shadow-lg py-2"
          : "bg-transparent py-4",
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="flex items-center space-x-2 text-2xl font-semibold text-gradient"
            onClick={closeMenu}
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <FileSpreadsheet size={28} />
            </motion.div>
            <span>Smart Excel-JSON</span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            <nav className="flex space-x-1 mr-4">
              {navItems.map((item) => (
                <motion.div
                  key={item.path}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={item.path}
                    className={cn(
                      "px-4 py-2 rounded-md flex items-center space-x-1.5 transition-colors duration-200 relative group",
                      location.pathname === item.path
                        ? "bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300"
                        : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800",
                    )}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                    {location.pathname === item.path && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500"
                        layoutId="underline"
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <ThemeToggle />
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="text-slate-700 dark:text-slate-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mt-4 py-4 space-y-2 rounded-lg glass-effect shadow-lg"
          >
            {navItems.map((item) => (
              <motion.div
                key={item.path}
                whileHover={{ x: 10 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={item.path}
                  className={cn(
                    "px-4 py-3 flex items-center space-x-3 transition-colors duration-200",
                    location.pathname === item.path
                      ? "bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300"
                      : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800",
                  )}
                  onClick={closeMenu}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              </motion.div>
            ))}
          </motion.nav>
        )}
      </div>
    </motion.header>
  );
};

export default Header;
