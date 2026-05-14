import { useState, useEffect } from 'react';

interface FetchState<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}

export const useFetch = <T,>(url: string): FetchState<T> => {
    const [state, setState] = useState<FetchState<T>>({
        data: null,
        loading: true,
        error: null
    });

    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            setState({ data: null, loading: true, error: null });
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error('Error al realizar la petición');
                const data = await response.json();
                if (isMounted) {
                    setState({ data, loading: false, error: null });
                }
            } catch (err) {
                if (isMounted) {
                    setState({ data: null, loading: false, error: err instanceof Error ? err.message : 'Error desconocido' });
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [url]);

    return state;
};
