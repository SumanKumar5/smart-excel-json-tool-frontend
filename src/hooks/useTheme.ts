import { useContext } from "react";

// Need to import the context type and the context itself
// Assuming ThemeContextType is defined and exported in ThemeContext.tsx
// and ThemeContext is also exported
import { ThemeContextType, ThemeContext } from "../contexts/ThemeContext";

export function useTheme(): ThemeContextType {
  const context = useContext<ThemeContextType | undefined>(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
