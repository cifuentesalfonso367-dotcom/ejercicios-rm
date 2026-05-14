import { createContext, useContext, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<Theme>('light');
    const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

const Header = () => {
    const context = useContext(ThemeContext);
    if (!context) return null;
    const { theme } = context;

    return (
        <header style={{
            padding: '10px',
            backgroundColor: theme === 'light' ? '#eee' : '#333',
            color: theme === 'light' ? '#000' : '#fff'
        }}>
            <h1>Mi Aplicación</h1>
        </header>
    );
};

const Content = () => {
    const context = useContext(ThemeContext);
    if (!context) return null;
    const { theme } = context;

    return (
        <main style={{
            padding: '20px',
            backgroundColor: theme === 'light' ? '#fff' : '#444',
            color: theme === 'light' ? '#000' : '#fff',
            minHeight: '100px'
        }}>
            <p>El tema actual es: {theme}</p>
        </main>
    );
};

const ThemeSwitcher = () => {
    const context = useContext(ThemeContext);
    if (!context) return null;
    const { theme, toggleTheme } = context;

    return (
        <footer style={{
            padding: '10px',
            backgroundColor: theme === 'light' ? '#ddd' : '#222'
        }}>
            <button onClick={toggleTheme}>
                Cambiar a {theme === 'light' ? 'Oscuro' : 'Claro'}
            </button>
        </footer>
    );
};

export const ThemeContextApp = () => {
    return (
        <ThemeProvider>
            <div style={{ border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden' }}>
                <Header />
                <Content />
                <ThemeSwitcher />
            </div>
        </ThemeProvider>
    );
};
