import { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export const RegisterForm = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [submittedData, setSubmittedData] = useState<FormData | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const isEmailValid = formData.email.includes('@');
    const isPasswordValid = formData.password.length >= 8;
    const passwordsMatch = formData.password === formData.confirmPassword;
    const isFormValid = formData.name.trim() !== '' && isEmailValid && isPasswordValid && passwordsMatch;

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (isFormValid) {
            setSubmittedData(formData);
        }
    };

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', maxWidth: '400px' }}>
            <h2>Registro</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    value={formData.name}
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Correo electrónico"
                    value={formData.email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña (mín. 8 caracteres)"
                    value={formData.password}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirmar contraseña"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                />

                <button type="submit" disabled={!isFormValid}>
                    Enviar
                </button>
            </form>

            {!isPasswordValid && formData.password.length > 0 && (
                <p style={{ color: 'red', fontSize: '12px' }}>La contraseña debe tener al menos 8 caracteres</p>
            )}
            {!passwordsMatch && formData.confirmPassword.length > 0 && (
                <p style={{ color: 'red', fontSize: '12px' }}>Las contraseñas no coinciden</p>
            )}

            {submittedData && (
                <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f0f0f0' }}>
                    <h3>Resumen de registro:</h3>
                    <p>Nombre: {submittedData.name}</p>
                    <p>Email: {submittedData.email}</p>
                </div>
            )}
        </div>
    );
};
