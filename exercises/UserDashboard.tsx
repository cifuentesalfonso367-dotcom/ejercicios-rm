import { useState, useMemo } from 'react';
import { useFetch } from '../hooks/useFetch';

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
}

export const UserDashboard = () => {
    const { data: users, loading, error } = useFetch<User[]>('https://jsonplaceholder.typicode.com/users');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const filteredUsers = useMemo(() => {
        return users?.filter(user =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.username.toLowerCase().includes(searchTerm.toLowerCase())
        ) || [];
    }, [users, searchTerm]);

    if (loading) return <p>Cargando dashboard...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', display: 'flex', gap: '20px' }}>
            <div style={{ flex: 1 }}>
                <h2>Dashboard de Usuarios</h2>
                <input
                    type="text"
                    placeholder="Filtrar por nombre..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ width: '100%', marginBottom: '10px', padding: '5px' }}
                />
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {filteredUsers.map(user => (
                        <li
                            key={user.id}
                            onClick={() => setSelectedUser(user)}
                            style={{
                                padding: '10px',
                                borderBottom: '1px solid #eee',
                                cursor: 'pointer',
                                backgroundColor: selectedUser?.id === user.id ? '#f0f0f0' : 'transparent'
                            }}
                        >
                            {user.name} (@{user.username})
                        </li>
                    ))}
                </ul>
            </div>

            <div style={{ flex: 1, borderLeft: '1px solid #ccc', paddingLeft: '20px' }}>
                {selectedUser ? (
                    <div>
                        <h3>Detalles de Usuario</h3>
                        <p><strong>Nombre:</strong> {selectedUser.name}</p>
                        <p><strong>Email:</strong> {selectedUser.email}</p>
                        <p><strong>Teléfono:</strong> {selectedUser.phone}</p>
                        <p><strong>Web:</strong> {selectedUser.website}</p>
                        <button onClick={() => setSelectedUser(null)}>Cerrar detalles</button>
                    </div>
                ) : (
                    <p>Selecciona un usuario para ver los detalles.</p>
                )}
            </div>
        </div>
    );
};
