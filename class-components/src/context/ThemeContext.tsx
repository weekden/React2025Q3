import {
  createContext,
  useEffect,
  type PropsWithChildren,
  type ReactNode,
} from 'react';
import useLocalStorage from '../hooks/localeStorage';

type ThemeContext = {
  theme: string;
  setTheme: (theme: string) => void;
};

const ThemeContext = createContext<ThemeContext | null>(null);

function ThemeContextProvider({ children }: PropsWithChildren): ReactNode {
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  useEffect(() => {
    document.cookie = `theme=${theme}`;
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeContextProvider, ThemeContext };
