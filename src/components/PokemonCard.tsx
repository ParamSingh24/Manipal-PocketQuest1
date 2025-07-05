import React from 'react';
import { Pokemon } from '@/types'; // Ensure this path is correct for your project




// --- Helper function to get a color based on Pokémon type for styling ---
const getTypeColor = (type: string): string => {
    const colors: { [key: string]: string } = {
        fire: '#F57D31',       // Orange
        water: '#6493EB',      // Blue
        grass: '#74CB48',      // Green
        electric: '#F9CF30',   // Yellow
        psychic: '#FB5584',    // Pink
        ice: '#9AD6DF',        // Light Blue
        dragon: '#7037FF',     // Purple
        dark: '#75574C',       // Brown
        fairy: '#E69EAC',      // Light Pink
        normal: '#AAA67F',     // Gray
        fighting: '#C12239',   // Red
        flying: '#A891EC',     // Lavender
        poison: '#A43E9E',     // Dark Purple
        ground: '#DEC16B',     // Sand
        rock: '#B69E31',       // Dark Sand
        bug: '#A7B723',        // Lime Green
        ghost: '#70559B',      // Dark Lavender
        steel: '#B7B9D0',      // Light Steel
    };
    return colors[type.toLowerCase()] || '#A8A878'; // Default color
};

// --- Main Component Props ---
interface PokemonCardProps {
    pokemon: Pokemon | null; // Accept null to prevent crashes before data loads
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
    // CRITICAL FIX: Add a check to ensure the pokemon data exists.
    // If pokemon is null or undefined, it renders nothing, preventing any errors.
    if (!pokemon) {
        return null;
    }

    // --- Dynamic Styles based on Pokémon type ---
    const typeColor = getTypeColor(pokemon.type); // Get the color once

    const cardStyle: React.CSSProperties = {
        width: '320px',
        padding: '20px',
        borderRadius: '20px',
        fontFamily: '"Segoe UI", Roboto, sans-serif',
        color: 'white',
        // Glassy effect: blur applied directly
        backdropFilter: 'blur(10px)', // Blur effect for the glass
        WebkitBackdropFilter: 'blur(10px)', // For Safari support

        // Type indication via a subtle gradient combined with the translucent background
        background: `linear-gradient(135deg, ${typeColor}20 0%, transparent 70%), rgba(255, 255, 255, 0.1)`,

        // Subtle border for the glassy feel
        border: '1px solid rgba(255, 255, 255, 0.2)',
        // General glassy shadow
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        textAlign: 'center',
        transition: 'transform 0.3s ease', // Keep the hover transform transition
    };

    const imageContainerStyle: React.CSSProperties = {
        width: '200px',
        height: '200px',
        margin: '0 auto 10px',
        // CHANGED: Use the Pokémon's type color for the background
        backgroundColor: typeColor, // Set the background to the type color
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // Added a subtle inner shadow for depth
        boxShadow: `inset 0 0 15px rgba(0,0,0,0.4), 0 0 10px ${typeColor}50`, // Darker inner shadow, subtle type-colored outer glow
    };

    const imageStyle: React.CSSProperties = {
        width: '90%',
        height: '90%',
        objectFit: 'contain',
        filter: 'drop-shadow(0px 5px 10px rgba(0, 0, 0, 0.5))',
    };

    const nameStyle: React.CSSProperties = {
        fontFamily: '"Young Serif", serif',
        fontWeight: '400',
        fontSize: '2rem',
        textTransform: 'capitalize',
        margin: '10px 0',
        textShadow: '0 2px 4px rgba(0,0,0,0.5)',
    };

    const typeBadgeStyle: React.CSSProperties = {
        display: 'inline-block',
        padding: '6px 20px',
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        borderRadius: '20px',
        fontSize: '1rem',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: '1px',
    };

    const descriptionStyle: React.CSSProperties = {
        fontFamily: '"Roboto Serif", serif',
        fontWeight: '400',
        fontSize: '0.9rem',
        lineHeight: '1.6',
        color: 'rgba(255, 255, 255, 0.9)',
        marginTop: '15px',
        minHeight: '80px', // Ensures consistent card height
    };

    return (
        <div style={cardStyle}
             onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
             onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
            <div style={imageContainerStyle}>
                <img
                    src={pokemon.image}
                    alt={pokemon.name}
                    style={imageStyle}
                    // Add an onError handler for broken image links
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = `https://placehold.co/200x200/454d55/FFFFFF?text=${pokemon.name}&font=roboto`;
                    }}
                />
            </div>
            <h2 style={nameStyle}>{pokemon.name}</h2>
            <div style={typeBadgeStyle}>{pokemon.type}</div>
            <p style={descriptionStyle}>{pokemon.description}</p>
        </div>
    );
};

export default PokemonCard;