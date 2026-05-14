import { useState, useEffect, useRef } from 'react';

export const Timer = () => {
    const [seconds, setSeconds] = useState<number>(0);
    const [isActive, setIsActive] = useState<boolean>(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const startTimer = () => {
        if (!isActive) {
            setIsActive(true);
            intervalRef.current = setInterval(() => {
                setSeconds(prev => prev + 1);
            }, 1000);
        }
    };

    const pauseTimer = () => {
        setIsActive(false);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    };

    const resetTimer = () => {
        setIsActive(false);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        setSeconds(0);
    };

    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2>Temporizador: {seconds}s</h2>
            <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={startTimer} disabled={isActive}>Iniciar</button>
                <button onClick={pauseTimer} disabled={!isActive}>Pausar</button>
                <button onClick={resetTimer}>Reiniciar</button>
            </div>
        </div>
    );
};
