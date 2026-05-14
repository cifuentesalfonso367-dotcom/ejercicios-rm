import { useReducer, useState, ChangeEvent } from 'react';

interface Task {
    id: string;
    title: string;
    completed: boolean;
}

type Action =
    | { type: 'ADD_TASK'; payload: string }
    | { type: 'TOGGLE_TASK'; payload: string }
    | { type: 'EDIT_TASK'; payload: { id: string; title: string } }
    | { type: 'DELETE_TASK'; payload: string }
    | { type: 'CLEAR_COMPLETED' };

const taskReducer = (state: Task[], action: Action): Task[] => {
    switch (action.type) {
        case 'ADD_TASK':
            return [...state, { id: crypto.randomUUID(), title: action.payload, completed: false }];
        case 'TOGGLE_TASK':
            return state.map(task => task.id === action.payload ? { ...task, completed: !task.completed } : task);
        case 'EDIT_TASK':
            return state.map(task => task.id === action.payload.id ? { ...task, title: action.payload.title } : task);
        case 'DELETE_TASK':
            return state.filter(task => task.id !== action.payload);
        case 'CLEAR_COMPLETED':
            return state.filter(task => !task.completed);
        default:
            return state;
    }
};

export const TaskReducer = () => {
    const [tasks, dispatch] = useReducer(taskReducer, []);
    const [inputValue, setInputValue] = useState<string>('');

    const handleAddTask = () => {
        if (inputValue.trim()) {
            dispatch({ type: 'ADD_TASK', payload: inputValue });
            setInputValue('');
        }
    };

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2>Gestión de Tareas (useReducer)</h2>
            <div style={{ marginBottom: '10px' }}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
                    placeholder="Nueva tarea..."
                />
                <button onClick={handleAddTask}>Agregar</button>
                <button onClick={() => dispatch({ type: 'CLEAR_COMPLETED' })}>Limpiar Completadas</button>
            </div>

            <ul>
                {tasks.map(task => (
                    <li key={task.id} style={{ marginBottom: '5px' }}>
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => dispatch({ type: 'TOGGLE_TASK', payload: task.id })}
                        />
                        <input
                            type="text"
                            value={task.title}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                dispatch({ type: 'EDIT_TASK', payload: { id: task.id, title: e.target.value } })
                            }
                            style={{ textDecoration: task.completed ? 'line-through' : 'none', border: 'none', background: 'transparent' }}
                        />
                        <button onClick={() => dispatch({ type: 'DELETE_TASK', payload: task.id })}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
