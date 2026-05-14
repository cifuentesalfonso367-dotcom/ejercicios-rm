import { useFetch } from '../hooks/useFetch';

interface Post {
    id: number;
    title: string;
    body: string;
}

export const PostList = () => {
    const { data, loading, error } = useFetch<Post[]>('https://jsonplaceholder.typicode.com/posts?_limit=5');

    if (loading) return <p>Cargando posts...</p>;
    if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2>Lista de Posts (Custom Hook)</h2>
            {data?.map(post => (
                <article key={post.id} style={{ marginBottom: '15px', borderBottom: '1px solid #eee' }}>
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                </article>
            ))}
        </div>
    );
};
