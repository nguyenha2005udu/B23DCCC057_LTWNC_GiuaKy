import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
type Theme = 'light' | 'dark';
interface ThemeValue {
  theme: Theme;
  toggleTheme: () => void;
}
const ThemeContext = createContext<ThemeValue | null>(null);
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const toggleTheme = useCallback(() => setTheme((t) => (t === 'light' ? 'dark' : 'light')), []);
  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);
  return (
    <ThemeContext.Provider value={value}>
      <div className="theme" data-theme={theme}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme cần ThemeProvider');
  return context;
}
