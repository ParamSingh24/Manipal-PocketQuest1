import React, { useRef, useState, MouseEvent } from 'react';

// --- Type Definition for a Pokemon ---
// This defines the shape of the data the card component expects.
// In a real project, this would likely live in a separate types file.
interface Pokemon {
  name: string;
  image: string;
  type: string;
  description: string;
}

// --- Helper function to get a color based on Pokémon type for styling ---
const getTypeColor = (type: string): string => {
    const colors: { [key: string]: string } = {
        fire: '#F57D31',      // Orange
        water: '#6493EB',     // Blue
        grass: '#74CB48',     // Green
        electric: '#F9CF30',  // Yellow
        psychic: '#FB5584',   // Pink
        ice: '#9AD6DF',       // Light Blue
        dragon: '#7037FF',    // Purple
        dark: '#75574C',      // Brown
        fairy: '#E69EAC',     // Light Pink
        normal: '#AAA67F',    // Gray
        fighting: '#C12239',  // Red
        flying: '#A891EC',    // Lavender
        poison: '#A43E9E',    // Dark Purple
        ground: '#DEC16B',    // Sand
        rock: '#B69E31',      // Dark Sand
        bug: '#A7B723',       // Lime Green
        ghost: '#70559B',     // Dark Lavender
        steel: '#B7B9D0',     // Light Steel
    };
    return colors[type.toLowerCase()] || '#A8A878'; // Default color
};


// === Main App Component for Demonstration ===
// This component renders the PokemonCard and provides it with sample data.
export default function App() {
  // Sample Pokémon data to pass to the card.
type Pokemon = {
  name: string;
  type: string;
  image: string;
  description: string;
};

const pokemons: Pokemon[] = [
  {
    name: 'Bulbasaur',
    type: 'Grass/Poison',
    image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
    description: 'A strange seed was planted on its back at birth. The plant sprouts and grows with this Pokémon.',
  },
  {
    name: 'Charmander',
    type: 'Fire',
    image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png',
    description: 'Obviously prefers hot places. When it rains, steam is said to spout from the tip of its tail.',
  },
  {
    name: 'Squirtle',
    type: 'Water',
    image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png',
    description: 'Shoots water at prey while in the water. Withdraws into its shell when in danger.',
  },
  {
    name: 'Pikachu',
    type: 'Electric',
    image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png',
    description: 'When several of these Pokémon gather, their electricity could build and cause lightning storms.',
  },
  {
    name: 'Jigglypuff',
    type: 'Normal/Fairy',
    image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/039.png',
    description: 'Uses its alluring eyes to enrapture its foe. It then sings a pleasing melody that lulls the foe to sleep.',
  },
  {
    name: 'Meowth',
    type: 'Normal',
    image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/052.png',
    description: 'Adores circular objects. Wanders the streets on a nightly basis to look for dropped loose change.',
  },
  {
    name: 'Psyduck',
    type: 'Water',
    image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/054.png',
    description: 'While lulling its enemies with its vacant look, this wily Pokémon will use psychokinetic powers.',
  },
  {
    name: 'Machop',
    type: 'Fighting',
    image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/066.png',
    description: 'Loves to build its muscles. It trains in all styles of martial arts to become even stronger.',
  },
  {
    name: 'Growlithe',
    type: 'Fire',
    image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/058.png',
    description: 'Very protective of its territory. It will bark and bite to repel intruders from its space.',
  },
  {
    name: 'Abra',
    type: 'Psychic',
    image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/063.png',
    description: 'Sleeps 18 hours a day. If it senses danger, it will teleport itself to safety even while asleep.',
  },
  {
    name: 'Geodude',
    type: 'Rock/Ground',
    image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/074.png',
    description: 'Commonly found near mountain trails and construction sites. If you step on one by accident, it gets angry.',
  },
  {
    name: 'Magnemite',
    type: 'Electric/Steel',
    image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/081.png',
    description: 'Uses antigravity to stay suspended. Appears without warning and uses Thunder Wave and similar moves.',
  },
  {
    name: 'Onix',
    type: 'Rock/Ground',
    image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/095.png',
    description: 'As it grows, the stone portions of its body harden to become similar to a diamond.',
  },
  {
    name: 'Cubone',
    type: 'Ground',
    image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/104.png',
    description: 'Wears the skull of its deceased mother. Its cries echo inside the skull and come out as a sad melody.',
  },
  {
    name: 'Hitmonlee',
    type: 'Fighting',
    image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/106.png',
    description: 'When in a hurry, its legs lengthen progressively. It runs smoothly with extra long, loping strides.',
  },
  {
    name: 'Koffing',
    type: 'Poison',
    image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/109.png',
    description: 'Because it stores several kinds of toxic gases in its body, it is prone to exploding without warning.',
  },
  {
    name: 'Rhyhorn',
    type: 'Ground/Rock',
    image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/111.png',
    description: 'Its massive bones are 1,000 times harder than human bones. It can knock a trailer flying with a tackle.',
  },
  {
    name: 'Magikarp',
    type: 'Water',
    image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/129.png',
    description: 'In the distant past, it was somewhat stronger than the horribly weak descendants that exist today.',
  },
  {
    name: 'Eevee',
    type: 'Normal',
    image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/133.png',
    description: 'Its genetic code is irregular. It may mutate if it is exposed to radiation from element stones.',
  },
  {
    name: 'Charizard',
    type: 'Fire/Flying',
    image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/006.png',
    description: 'It spits fire that is hot enough to melt boulders. It may cause forest fires by blowing flames.',
  },
];

const samplePokemon: Pokemon = pokemons[Math.floor(Math.random() * pokemons.length)];

  
  // The StyleInjector is needed for the holographic glow effect.
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      fontFamily: "'Inter', sans-serif",
      overflow: 'hidden',
    }}>
      <StyleInjector />
      <PokemonCard pokemon={samplePokemon} />
    </div>
  );
}


// === Main Component Props ---
interface PokemonCardProps {
    pokemon: Pokemon | null; // Accept null to prevent crashes before data loads
}

// === The Dynamic and Animated Pokemon Card Component ===
const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [style, setStyle] = useState<React.CSSProperties>({});

    // If no pokemon data is provided, render nothing to avoid errors.
    if (!pokemon) {
        return null;
    }

    const ROTATION_STRENGTH = 15;
    const GLOW_STRENGTH = 0.6;

const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
  if (!cardRef.current) return;
  const { clientX, clientY } = e;
  const { top, left, width, height } = cardRef.current.getBoundingClientRect();
  const x = (clientX - left) / width - 0.5;
  const y = (clientY - top) / height - 0.5;
  const rotateY = x * ROTATION_STRENGTH;
  const rotateX = -y * ROTATION_STRENGTH;
  const glowX = x * 100 + 50;
  const glowY = y * 100 + 50;
  const glowOpacity = Math.max(Math.abs(x), Math.abs(y)) * GLOW_STRENGTH;

  cardRef.current.style.setProperty('--glow-x', `${glowX}%`);
  cardRef.current.style.setProperty('--glow-y', `${glowY}%`);
  cardRef.current.style.setProperty('--glow-opacity', `${glowOpacity}`);
  cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
};

const handleMouseLeave = () => {
  if (!cardRef.current) return;
  cardRef.current.style.setProperty('--glow-opacity', '0');
  cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
};

    
    // --- Dynamic Styles based on Pokémon type ---
    const typeColor = getTypeColor(pokemon.type);

    const dynamicCardInnerStyle: React.CSSProperties = {
        ...styles.cardInner,
        // Glassy effect with a subtle hint of the pokemon's type color
        background: `linear-gradient(135deg, ${typeColor}25, transparent 60%), rgba(255, 255, 255, 0.1)`,
    };

    const dynamicImageContainerStyle: React.CSSProperties = {
        ...styles.pokemonImageContainer,
        // Use the Pokémon's type color for the background glow
        boxShadow: `0 0 25px -5px ${typeColor}`,
    };

    return (
        <div
            ref={cardRef}
            style={{ ...styles.card, ...style }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div style={dynamicCardInnerStyle}>
                {/* All content is layered with 3D transforms */}
                <div style={dynamicImageContainerStyle}>
                    <img
                        src={pokemon.image}
                        alt={pokemon.name}
                        style={styles.pokemonImage}
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = `https://placehold.co/200x200/454d55/FFFFFF?text=${pokemon.name}&font=roboto`;
                        }}
                    />
                </div>
                
                <div style={styles.typeBadge}>
                    {pokemon.type}
                </div>

                <h2 style={styles.pokemonName}>{pokemon.name}</h2>
                
                <p style={styles.pokemonDescription}>{pokemon.description}</p>
            </div>
        </div>
    );
};

// === Static Styles ===
const styles: { [key: string]: React.CSSProperties & { '--glow-x'?: string, '--glow-y'?: string, '--glow-opacity'?: string } } = {
    card: {
        width: 360,
        height: 450,
        padding:20,
        position: 'relative',
        transformStyle: 'preserve-3d',
        transition: 'transform 0.1s ease-out',
        '--glow-x': '50%',
        '--glow-y': '50%',
        '--glow-opacity': '0',
    },
    cardInner: {
        position: 'absolute',
        width: '90%',
        height: '100%',
        borderRadius: '20px',
        overflow: 'hidden',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1.5px solid rgba(255, 255, 255, 0.2)',
        transformStyle: 'preserve-3d',
        transform: 'translateZ(0)',
    },
    pokemonImageContainer: {
        position: 'absolute',
        top: '20px',
        left: '50%',
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: 'translateX(-50%) translateZ(80px)', // Pop out effect
    },
    pokemonImage: {
        width: '180px',
        height: '180px',
        objectFit: 'contain',
        filter: 'drop-shadow(0px 5px 10px rgba(0, 0, 0, 0.5))',
        pointerEvents: 'none',
    },

    pokemonName: {
        fontFamily: '"Young Serif", serif',
        fontWeight:'400',
        position: 'absolute',
        top: '230px',
        width: '100%',
        textAlign: 'center',
        color: 'white',
        fontSize: '32px',
        textTransform: 'capitalize',
        textShadow: '0 2px 5px rgba(0, 0, 0, 0.6)',
        transform: 'translateZ(60px)',
    },
    typeBadge: {
        position: 'absolute',
        fontFamily: '"Young Serif", serif',
        top: '285px',
        left: '50%',
        transform: 'translateX(-50%) translateZ(50px)',
        padding: '5px 20px',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '20px',
        fontSize: '14px',
        textTransform: 'uppercase',
        color: 'white',
        letterSpacing: '1px',
    },
    pokemonDescription: {
           fontFamily: '"Roboto Serif", serif',
        position: 'absolute',
        bottom: '25px',
        left: '25px',
        right: '25px',
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: '14px',
        fontWeight: 400,
        textAlign: 'center',
        textShadow: '0 1px 3px rgba(0, 0, 0, 0.4)',
        transform: 'translateZ(40px)',
    },
};

// === Style Injector for Glow Effect ===
const StyleInjector: React.FC = () => {
    React.useEffect(() => {
        const styleId = 'pokemon-card-glow-style';
        if (document.getElementById(styleId)) return;

        const styleElement = document.createElement('style');
        styleElement.id = styleId;
        const cardInnerSelector = `[style*="backdrop-filter: blur(12px)"]`;

        styleElement.innerHTML = `
          ${cardInnerSelector}::before {
            content: '';
            position: absolute;
            left: 0; top: 0;
            width: 100%; height: 100%;
            background: radial-gradient(
              circle at var(--glow-x) var(--glow-y),
              rgba(255, 255, 255, 0.6),
              transparent 50%
            );
            opacity: var(--glow-opacity);
            transition: opacity 0.2s ease-in-out;
            mix-blend-mode: screen;
            transform: translateZ(30px);
            pointer-events: none;
          }
        `;
        document.head.appendChild(styleElement);
        
        return () => {
            const existingStyle = document.getElementById(styleId);
            if (existingStyle) {
                document.head.removeChild(existingStyle);
            }
        };
    }, []);
    return null;
};

export { PokemonCard as PokemonCardHero };
