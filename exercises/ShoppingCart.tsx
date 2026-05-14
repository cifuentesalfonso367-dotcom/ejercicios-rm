import { useState, useMemo } from 'react';

interface Product {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

const initialCart: Product[] = [
    { id: 1, name: 'Teclado', price: 120, quantity: 1 },
    { id: 2, name: 'Mouse', price: 50, quantity: 2 },
    { id: 3, name: 'Monitor', price: 400, quantity: 1 }
];

export const ShoppingCart = () => {
    const [cart, setCart] = useState<Product[]>(initialCart);

    const updateQuantity = (id: number, delta: number) => {
        setCart(prev => prev.map(item =>
            item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
        ));
    };

    const removeItem = (id: number) => {
        setCart(prev => prev.filter(item => item.id !== id));
    };

    const totalQuantity = useMemo(() => cart.reduce((acc, item) => acc + item.quantity, 0), [cart]);
    const totalPrice = useMemo(() => cart.reduce((acc, item) => acc + (item.price * item.quantity), 0), [cart]);

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2>Carrito de Compras</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Subtotal</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map(item => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>${item.price}</td>
                            <td>
                                <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                                <span style={{ margin: '0 10px' }}>{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                            </td>
                            <td>${item.price * item.quantity}</td>
                            <td><button onClick={() => removeItem(item.id)}>Eliminar</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div style={{ marginTop: '20px', textAlign: 'right' }}>
                <p>Total de productos: {totalQuantity}</p>
                <h3>Total General: ${totalPrice}</h3>
            </div>
        </div>
    );
};
