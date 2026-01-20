import { createContext, useContext, useEffect, useState } from "react";
import { Appearance, ColorSchemeName } from "react-native";
import { useStorageState } from "../hooks/UseStorageState";

// Define the shape of the theme context
interface ThemeContextType {
  theme: ColorSchemeName;
  setTheme: (theme: ColorSchemeName) => void;
}

// Create the ThemeContext with default values
const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  setTheme: () => {},
});

// Create a custom hook to use the ThemeContext
export const useTheme = () => useContext(ThemeContext);

// Create the ThemeProvider component
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [[isLoading, storedTheme], setStoredTheme] =
    useStorageState("app-theme");
  const [theme, setThemeState] = useState<ColorSchemeName>("light");

  // Load the theme from storage or system preference on mount
  useEffect(() => {
    if (!isLoading) {
      if (storedTheme) {
        setThemeState(storedTheme as ColorSchemeName);
      } else {
        const systemTheme = Appearance.getColorScheme() || "light";
        setThemeState(systemTheme);
      }
    }
  }, [isLoading, storedTheme]);

  // Function to update the theme
  const setTheme = (newTheme: ColorSchemeName) => {
    setThemeState(newTheme);
    setStoredTheme(newTheme || null);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
