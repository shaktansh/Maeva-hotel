import { createContext, useContext, useState, useEffect } from "react";

export const ThemeContext = createContext(null);
export const THEMES = { QUIET: "quiet", DARK: "dark" };

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(THEMES.QUIET);
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  const toggle = () => setTheme(t => t === THEMES.QUIET ? THEMES.DARK : THEMES.QUIET);
  return (
    <ThemeContext.Provider value={{ theme, toggle, isDark: theme === THEMES.DARK }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
