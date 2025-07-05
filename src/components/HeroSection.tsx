import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Import AnimatePresence
import PokemonCard from './PokemonCard'; // Ensure this path is correct
import { Pokemon } from '@/types'; // Ensure this path is correct for your project
import { ArrowRight } from 'lucide-react'; // Import arrow icon

const HeroSection = () => {
  // State to hold the random Pokemon data
  const [randomPokemon, setRandomPokemon] = useState<Pokemon | null>(null);
  const [loadingPokemon, setLoadingPokemon] = useState<boolean>(true);
  const [pokemonError, setPokemonError] = useState<string | null>(null);
  // Ref to get the bounding box of the visual container for mouse events
  const visualRef = useRef<HTMLDivElement>(null);

  // --- Data Fetching Logic for a Random Pokemon ---
  const fetchRandomPokemon = async () => {
    setLoadingPokemon(true);
    setPokemonError(null);
    try {
      const maxPokemonId = 1025; // As of latest PokeAPI data (Gen 9). Adjust if needed.
      const randomId = Math.floor(Math.random() * maxPokemonId) + 1;

      // Fetch basic Pokémon data
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}/`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      // Fetch species data for description (flavor text)
      const speciesResponse = await fetch(data.species.url);
      if (!speciesResponse.ok) {
        throw new Error(`HTTP error! status: ${speciesResponse.status}`);
      }
      const speciesData = await speciesResponse.json();

      // Find an English flavor text entry
      const descriptionEntry = speciesData.flavor_text_entries.find(
        (entry: any) => entry.language.name === 'en'
      );
      // Clean up description: replace newlines and form feed characters
      const description = descriptionEntry
        ? descriptionEntry.flavor_text.replace(/[\n\f]/g, ' ')
        : 'No description available.';

      const pokemonData: Pokemon = {
        id: data.id,
        name: data.name,
        type: data.types[0]?.type.name || 'unknown',
        image: data.sprites.other['official-artwork'].front_default || data.sprites.front_default,
        description: description,
      };

      setRandomPokemon(pokemonData);
    } catch (err) {
      console.error("Failed to fetch random Pokémon:", err);
      setPokemonError("Failed to load Pokémon. Displaying placeholder.");
      // Optionally set a default placeholder Pokemon here if desired:
      // setRandomPokemon(yourDefaultPlaceholderPokemonObject);
    } finally {
      setLoadingPokemon(false);
    }
  };

  // Run the fetch when the component mounts
  useEffect(() => {
    fetchRandomPokemon();
  }, []);




  //FONT STYLES
  // --- Existing styles (no changes needed here unless you want to integrate new fonts via global CSS) ---
  const heroTitleStyle: React.CSSProperties = {
    fontFamily: '"Young Serif", serif',
    fontSize: '3.5rem',
    lineHeight: 1.2,
    color: '#FFFFFF',
    textShadow: '0px 4px 8px rgba(8, 8, 8, 0.4), 0px 0px 15px rgba(255, 255, 255, 0.2)',
    letterSpacing: '0.05em',
  };
  const heroDescriptionStyle: React.CSSProperties = {
    fontFamily: '"Roboto Serif", serif',
    fontSize: '1.2rem',
    lineHeight: 1.6,
    marginTop: '20px',
    marginBottom: '30px',
    textShadow: '0px 2px 4px rgba(8, 8, 8, 0.3), 0px 0px 8px rgba(255, 255, 255, 0.1)',
    fontWeight: 400,
    fontStyle: 'normal',
  };

  return (
    <section className="hero-section">
      {/* Background Elements */}
      <div className="hero-background">
        <div className="floating-element floating-element-1"></div>
        <div className="floating-element floating-element-2"></div>
        <div className="floating-element floating-element-3"></div>
      </div>

      <div className="hero-container">
        <div className="hero-grid">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-text"
          >
            <h1 className="hero-title" style={heroTitleStyle}>
              <span className="title-word title-embark">Embark</span> on Your{' '}
              <span className="title-word title-health">Health</span>{' '}
              <span className="title-word title-adventure">Adventure</span>
            </h1>

            <p className="hero-description" style={heroDescriptionStyle}>
              Transform your health journey into an exciting quest. Explore real-time disease outbreak data,
              weather intelligence, and AI health assistance, all while interacting with your favorite characters.
            </p>

            <button className="cssbuttons-io-button">
              Start Your Quest
              <div className="icon">
                <ArrowRight />
              </div>
            </button>
          </motion.div>

          {/* Character/Illustration Container with Mouse Events and 3D Perspective */}
          <motion.div
            ref={visualRef} // Attach ref to this div to track its position
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-visual"
            // Apply perspective to the parent that contains the 3D rotating element
            style={{ perspective: '1000px' }}
          >
            <div className="character-container">
              {/* Removed character-circle for a cleaner look */}
              {/* AnimatePresence for graceful unmounting of loading/error/pokemon states */}
              <AnimatePresence mode="wait">
                {loadingPokemon ? (
                  <motion.div
                    key="loading" // Unique key for AnimatePresence
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      color: 'white',
                      textAlign: 'center',
                      fontSize: '1.2rem',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '100%',
                      width: '100%',
                    }}
                  >
                    Loading Pokémon...
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.2, repeat: Infinity, ease: "linear" }}
                      style={{ display: 'inline-block', marginLeft: '10px', fontSize: '2rem' }}
                    >

                    </motion.div>
                  </motion.div>
                ) : pokemonError ? (
                  <motion.div
                    key="error" // Unique key for AnimatePresence
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      color: 'red',
                      textAlign: 'center',
                      fontSize: '1.2rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '100%',
                      width: '100%',
                    }}
                  >
                    {pokemonError}
                  </motion.div>
                ) : (
                  // When Pokemon is loaded, add entry animation to PokemonCard
                  <motion.div
                    key={randomPokemon?.id || "pokemon-card"} // Key for AnimatePresence. Use Pokemon ID for re-animation on new pokemon.
                    initial={{ opacity: 0, scale: 0.8, rotateY: 90 }} // Start rotated and small
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }} // Animate to full size and no rotation
                    exit={{ opacity: 0, scale: 0.8, rotateY: -90 }} // Exit animation if component unmounts
                    transition={{
                      type: "spring",
                      stiffness: 100,
                      damping: 10,
                      delay: 0.2, // Small delay after loading message disappears
                      duration: 0.6 // Overall animation duration for the card
                    }}
                    style={{
                      width: '100%', // Ensure the card takes full space within its container
                      height: '100%',
                      display: 'flex', // To center content if card isn't exactly 100%
                      alignItems: 'center',
                      justifyContent: 'center',
                      backfaceVisibility: 'hidden', // Prevents flickering on rotation
                    }}
                  >
                    <PokemonCard pokemon={randomPokemon} />
                  </motion.div>
                )}
              </AnimatePresence>
              {/* End removed character-circle */}

              {/* Floating elements (keep their existing animations) */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="floating-accent floating-accent-1"
              ></motion.div>

              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="floating-accent floating-accent-2"
              ></motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;