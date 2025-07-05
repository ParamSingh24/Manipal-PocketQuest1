import React from 'react';
import { useInventory } from '@/contexts/InventoryContext';
import PokemonCard from '@/components/PokemonCard';
import { Link } from 'react-router-dom';

const styles = {
    page: {
        background: '#23272F',
        minHeight: '100vh',
        padding: '50px',
    },
    header: {
        color: 'white',
        textAlign: 'center' as const,
        marginBottom: '40px',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '40px',
        justifyItems: 'center',
    },
    emptyText: {
        color: 'white',
        textAlign: 'center' as const,
        fontSize: '1.2rem',
    },
    link: {
        color: '#ffaf7b',
        textDecoration: 'underline'
    }
};

export default function InventoryPage() {
    const { inventory } = useInventory();

    return (
        <div style={styles.page}>
            <h1 style={styles.header}>My Pokémon Collection</h1>
            {inventory.length > 0 ? (
                <div style={styles.grid}>
                    {inventory.map(pokemon => (
                        <PokemonCard key={pokemon.id} pokemon={pokemon} />
                    ))}
                </div>
            ) : (
                <p style={styles.emptyText}>
                    Your inventory is empty. <Link to="/catch" style={styles.link}>Go catch some!</Link>
                </p>
            )}
        </div>
    );
}