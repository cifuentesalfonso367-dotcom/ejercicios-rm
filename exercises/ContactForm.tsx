import { FormEvent } from 'react';
import { useForm } from '../hooks/useForm';

interface ContactData {
    name: string;
    message: string;
}

export const ContactForm = () => {
    const { values, handleChange, resetForm } = useForm<ContactData>({
        name: '',
        message: ''
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log('Formulario enviado:', values);
        alert(`Gracias ${values.name}, recibimos tu mensaje.`);
        resetForm();
    };

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', maxWidth: '400px' }}>
            <h2>Contacto (Custom Hook)</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input
                    type="text"
                    name="name"
                    placeholder="Tu nombre"
                    value={values.name}
                    onChange={handleChange}
                />
                <textarea
                    name="message"
                    placeholder="Tu mensaje"
                    value={values.message}
                    onChange={handleChange}
                    rows={4}
                />
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
};
