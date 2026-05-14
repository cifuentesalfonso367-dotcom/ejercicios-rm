import { useState, useEffect } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
    address: {
        city: string;
    };
}

export const UserList = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;
        const fetchUsers = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                if (!response.ok) throw new Error('Error al cargar usuarios');
                const data = await response.json();
                if (isMounted) {
                    setUsers(data);
                    setLoading(false);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err instanceof Error ? err.message : 'Error desconocido');
                    setLoading(false);
                }
            }
        };

        fetchUsers();

        return () => {
            isMounted = false;
        };
    }, []);

    if (loading) return <p>Cargando usuarios...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2>Lista de Usuarios (API)</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id} style={{ marginBottom: '10px' }}>
                        <strong>{user.name}</strong> - {user.email} ({user.address.city})
                    </li>
                ))}
            </ul>
        </div>
    );
};
