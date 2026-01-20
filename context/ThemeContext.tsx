import { useStorageState } from "@/hooks/UseStorageState";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  systemTheme: Theme | null;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
const THEME_STORAGE_KEY = "preferred_theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [[isLoading, savedTheme], setSavedTheme] =
    useStorageState(THEME_STORAGE_KEY);
  const [theme, setThemeState] = useState<Theme>("dark");

  useEffect(() => {
    if (isLoading) return;

    if (savedTheme) {
      // User preference takes precedence
      setThemeState(savedTheme as Theme);
    } else if (systemColorScheme) {
      // Use system theme if no saved preference
      setThemeState(systemColorScheme as Theme);
    } else {
      // Fallback to dark theme
      setThemeState("dark");
    }
  }, [isLoading, savedTheme, systemColorScheme]);

  const handleSetTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    setSavedTheme(newTheme);
  };

  if (isLoading) {
    return null;
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme: handleSetTheme,
        systemTheme: systemColorScheme as Theme | null,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
