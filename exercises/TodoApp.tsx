import { useState, useEffect, ChangeEvent } from 'react';

interface Todo {
    id: string;
    title: string;
    completed: boolean;
}

export const TodoApp = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [inputValue, setInputValue] = useState<string>('');
    const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

    useEffect(() => {
        const savedTodos = localStorage.getItem('todos');
        if (savedTodos) {
            setTodos(JSON.parse(savedTodos));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const handleAddTodo = () => {
        if (inputValue.trim() === '') return;
        const newTodo: Todo = {
            id: crypto.randomUUID(),
            title: inputValue,
            completed: false
        };
        setTodos(prev => [...prev, newTodo]);
        setInputValue('');
    };

    const toggleTodo = (id: string) => {
        setTodos(prev => prev.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const deleteTodo = (id: string) => {
        setTodos(prev => prev.filter(todo => todo.id !== id));
    };

    const filteredTodos = todos.filter(todo => {
        if (filter === 'pending') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
    });

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2>Lista de Tareas</h2>
            <div style={{ display: 'flex', gap: '5px', marginBottom: '10px' }}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
                    placeholder="Nueva tarea..."
                />
                <button onClick={handleAddTodo}>Agregar</button>
            </div>

            <div style={{ marginBottom: '10px', display: 'flex', gap: '5px' }}>
                <button onClick={() => setFilter('all')}>Todas</button>
                <button onClick={() => setFilter('pending')}>Pendientes</button>
                <button onClick={() => setFilter('completed')}>Completadas</button>
            </div>

            <ul>
                {filteredTodos.map(todo => (
                    <li key={todo.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px' }}>
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => toggleTodo(todo.id)}
                        />
                        <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                            {todo.title}
                        </span>
                        <button onClick={() => deleteTodo(todo.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
