import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import Button from "./Button";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="w-9 h-9 p-0"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Moon size={20} className="text-slate-600" />
      ) : (
        <Sun size={20} className="text-slate-200" />
      )}
    </Button>
  );
};

export default ThemeToggle;
