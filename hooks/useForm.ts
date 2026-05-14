import { useState, ChangeEvent } from 'react';

export const useForm = <T extends object>(initialValues: T) => {
    const [values, setValues] = useState<T>(initialValues);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setValues(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const resetForm = () => {
        setValues(initialValues);
    };

    return {
        values,
        handleChange,
        resetForm
    };
};
