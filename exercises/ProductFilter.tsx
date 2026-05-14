import { useState, useMemo, ChangeEvent } from 'react';

interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    stock: number;
}

const productsData: Product[] = [
    { id: 1, name: 'Laptop', category: 'Tecnología', price: 2500, stock: 5 },
    { id: 2, name: 'Smartphone', category: 'Tecnología', price: 1200, stock: 0 },
    { id: 3, name: 'Silla Gamer', category: 'Hogar', price: 300, stock: 10 },
    { id: 4, name: 'Cafetera', category: 'Hogar', price: 80, stock: 4 },
    { id: 5, name: 'Audífonos', category: 'Tecnología', price: 150, stock: 15 }
];

export const ProductFilter = () => {
    const [search, setSearch] = useState<string>('');
    const [category, setCategory] = useState<string>('Todas');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [onlyInStock, setOnlyInStock] = useState<boolean>(false);

    const filteredProducts = useMemo(() => {
        let result = productsData.filter(product =>
            product.name.toLowerCase().includes(search.toLowerCase()) &&
            (category === 'Todas' || product.category === category) &&
            (!onlyInStock || product.stock > 0)
        );

        result.sort((a, b) => sortOrder === 'asc' ? a.price - b.price : b.price - a.price);
        return result;
    }, [search, category, sortOrder, onlyInStock]);

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2>Filtro de Productos</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Buscar por nombre..."
                    value={search}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                />
                <select value={category} onChange={(e: ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value)}>
                    <option value="Todas">Todas las categorías</option>
                    <option value="Tecnología">Tecnología</option>
                    <option value="Hogar">Hogar</option>
                </select>
                <select value={sortOrder} onChange={(e: ChangeEvent<HTMLSelectElement>) => setSortOrder(e.target.value as 'asc' | 'desc')}>
                    <option value="asc">Precio: Menor a Mayor</option>
                    <option value="desc">Precio: Mayor a Menor</option>
                </select>
                <label>
                    <input
                        type="checkbox"
                        checked={onlyInStock}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setOnlyInStock(e.target.checked)}
                    /> Solo con stock
                </label>
            </div>

            <p>Resultados encontrados: {filteredProducts.length}</p>

            {filteredProducts.length > 0 ? (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Categoría</th>
                            <th>Precio</th>
                            <th>Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map(product => (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>{product.category}</td>
                                <td>${product.price}</td>
                                <td>{product.stock}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay productos que coincidan con los filtros.</p>
            )}
        </div>
    );
};
