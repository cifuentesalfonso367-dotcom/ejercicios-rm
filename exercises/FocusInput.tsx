import { useState, useEffect, useRef, ChangeEvent } from 'react';

export const FocusInput = () => {
    const [text, setText] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleFocus = () => {
        inputRef.current?.focus();
    };

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2>Input con Foco Automático</h2>
            <input
                ref={inputRef}
                type="text"
                value={text}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
                placeholder="Escribe algo..."
                style={{ padding: '5px', marginBottom: '10px' }}
            />
            <br />
            <button onClick={handleFocus}>Enfocar buscador</button>
            <p style={{ marginTop: '10px' }}>Texto escrito: {text}</p>
        </div>
    );
};
