import { useState } from 'react';

export const SmartCounter = () => {

    const [count, setCount] = useState<number>(0);


    const handleIncrement = () => {
        setCount(prev => prev + 1);
    };

    const handleDecrement = () => {

        if (count > 0) {
            setCount(prev => prev - 1);
        }
    };

    const handleReset = () => {
        setCount(0);
    };

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2>Contador: {count}</h2>

            <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={handleIncrement}>Incrementar</button>
                <button onClick={handleDecrement}>Disminuir</button>
                <button onClick={handleReset}>Reiniciar</button>
            </div>


            {count >= 10 && (
                <p style={{ color: 'orange', fontWeight: 'bold', marginTop: '10px' }}>
                    Has llegado al límite recomendado
                </p>
            )}
        </div>
    );
};
