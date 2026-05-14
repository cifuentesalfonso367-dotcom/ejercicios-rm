import { useState, useEffect, ChangeEvent } from 'react';

interface User {
    id: number;
    name: string;
    role: string;
}

const initialUsers: User[] = [
    { id: 1, name: 'Ana', role: 'Frontend' },
    { id: 2, name: 'Beto', role: 'Backend' },
    { id: 3, name: 'Carla', role: 'UX/UI' },
    { id: 4, name: 'David', role: 'Frontend' }
];

export const UserSearch = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredUsers, setFilteredUsers] = useState<User[]>(initialUsers);

    useEffect(() => {
        const results = initialUsers.filter(user =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.role.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(results);
        document.title = `${results.length} usuarios encontrados`;
    }, [searchTerm]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2>Buscador de Usuarios</h2>
            <input
                type="text"
                placeholder="Buscar por nombre o rol..."
                value={searchTerm}
                onChange={handleChange}
                style={{ marginBottom: '10px', padding: '5px', width: '100%' }}
            />

            {filteredUsers.length > 0 ? (
                <ul>
                    {filteredUsers.map(user => (
                        <li key={user.id}>
                            {user.name} - <strong>{user.role}</strong>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No se encontraron resultados.</p>
            )}
        </div>
    );
};
