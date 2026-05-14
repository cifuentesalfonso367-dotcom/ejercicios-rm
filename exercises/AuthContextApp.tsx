import { createContext, useContext, useState, ReactNode, ChangeEvent } from 'react';

interface AuthContextType {
    user: string | null;
    login: (name: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<string | null>(null);
    const login = (name: string) => setUser(name);
    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

const LoginForm = () => {
    const context = useContext(AuthContext);
    const [name, setName] = useState<string>('');
    if (!context) return null;

    return (
        <div style={{ padding: '20px' }}>
            <input
                type="text"
                placeholder="Tu nombre"
                value={name}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            />
            <button onClick={() => context.login(name)}>Iniciar Sesión</button>
        </div>
    );
};

const Profile = () => {
    const context = useContext(AuthContext);
    if (!context || !context.user) return null;

    return (
        <div style={{ padding: '20px' }}>
            <h3>Bienvenido, {context.user}!</h3>
            <button onClick={context.logout}>Cerrar Sesión</button>
        </div>
    );
};

const AuthStatus = () => {
    const context = useContext(AuthContext);
    if (!context) return null;

    return (
        <div>
            {context.user ? <Profile /> : <LoginForm />}
        </div>
    );
};

export const AuthContextApp = () => {
    return (
        <AuthProvider>
            <div style={{ border: '1px solid #ccc', borderRadius: '8px' }}>
                <AuthStatus />
            </div>
        </AuthProvider>
    );
};
