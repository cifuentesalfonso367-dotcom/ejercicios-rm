import { SmartCounter } from './SmartCounter';
import { RegisterForm } from './RegisterForm';
import { UserSearch } from './UserSearch';
import { TodoApp } from './TodoApp';
import { UserList } from './UserList';
import { Timer } from './Timer';
import { ShoppingCart } from './ShoppingCart';
import { ProductFilter } from './ProductFilter';
import { FocusInput } from './FocusInput';
import { TaskReducer } from './TaskReducer';
import { ThemeContextApp } from './ThemeContextApp';
import { AuthContextApp } from './AuthContextApp';
import { ContactForm } from './ContactForm';
import { PostList } from './PostList';
import { UserDashboard } from './UserDashboard';
import { useState } from 'react';

const exercises = [
    { id: 1, name: 'SmartCounter', component: <SmartCounter /> },
    { id: 2, name: 'RegisterForm', component: <RegisterForm /> },
    { id: 3, name: 'UserSearch', component: <UserSearch /> },
    { id: 4, name: 'TodoApp', component: <TodoApp /> },
    { id: 5, name: 'UserList', component: <UserList /> },
    { id: 6, name: 'Timer', component: <Timer /> },
    { id: 7, name: 'ShoppingCart', component: <ShoppingCart /> },
    { id: 8, name: 'ProductFilter', component: <ProductFilter /> },
    { id: 9, name: 'FocusInput', component: <FocusInput /> },
    { id: 10, name: 'TaskReducer', component: <TaskReducer /> },
    { id: 11, name: 'ThemeContextApp', component: <ThemeContextApp /> },
    { id: 12, name: 'AuthContextApp', component: <AuthContextApp /> },
    { id: 13, name: 'ContactForm', component: <ContactForm /> },
    { id: 14, name: 'PostList', component: <PostList /> },
    { id: 15, name: 'UserDashboard', component: <UserDashboard /> },
];

export const ExerciseManager = () => {
    const [currentId, setCurrentId] = useState<number>(1);

    const currentExercise = exercises.find(ex => ex.id === currentId);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', fontFamily: 'sans-serif' }}>
            <nav style={{
                padding: '10px',
                backgroundColor: '#282c34',
                color: 'white',
                display: 'flex',
                gap: '10px',
                flexWrap: 'wrap',
                position: 'sticky',
                top: 0,
                zIndex: 1000
            }}>
                {exercises.map(ex => (
                    <button
                        key={ex.id}
                        onClick={() => setCurrentId(ex.id)}
                        style={{
                            padding: '5px 10px',
                            cursor: 'pointer',
                            backgroundColor: currentId === ex.id ? '#61dafb' : '#444',
                            border: 'none',
                            borderRadius: '4px',
                            color: currentId === ex.id ? '#282c34' : 'white',
                            fontWeight: 'bold'
                        }}
                    >
                        {ex.id}. {ex.name}
                    </button>
                ))}
            </nav>

            <main style={{ padding: '40px', flex: 1, backgroundColor: '#f9f9f9' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                    <h1 style={{ marginTop: 0, color: '#333' }}>Ejercicio {currentId}: {currentExercise?.name}</h1>
                    <hr style={{ marginBottom: '30px', opacity: 0.2 }} />
                    {currentExercise?.component}
                </div>
            </main>
        </div>
    );
};
