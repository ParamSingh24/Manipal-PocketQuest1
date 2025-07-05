<<<<<<< HEAD
import React from 'react';
import { useInventory } from '@/contexts/InventoryContext';

const LeaderboardPage = () => {
  const { inventory } = useInventory();

  const leaderboardData = [
    { username: 'Ash', pokemonCount: 150, points: 3000 },
    { username: 'Misty', pokemonCount: 120, points: 2500 },
    { username: 'Brock', pokemonCount: 100, points: 2000 },
    { username: 'You', pokemonCount: inventory.length, points: inventory.length * 20 }
  ].sort((a, b) => b.points - a.points);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-red-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Trainer Leaderboard</h1>
        
        <div className="bg-white/10 backdrop-blur-lg rounded-lg shadow-xl overflow-hidden">
          <div className="grid grid-cols-4 gap-4 p-4 border-b border-white/20 font-bold text-white">
            <div>Rank</div>
            <div>Trainer</div>
            <div>Pokémon</div>
            <div>Points</div>
          </div>
          
          {leaderboardData.map((trainer, index) => (
            <div 
              key={trainer.username}
              className={`grid grid-cols-4 gap-4 p-4 ${trainer.username === 'You' ? 'bg-white/20' : ''} hover:bg-white/5 transition-colors`}
            >
              <div className="text-white">{index + 1}</div>
              <div className="text-white font-medium">{trainer.username}</div>
              <div className="text-white">{trainer.pokemonCount}</div>
              <div className="text-white">{trainer.points}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
=======
import Leaderboard from "@/components/Leaderboard";
import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import styled from "styled-components";


// Styled Components for thematic look and transitions
const NotFoundContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* Reverted background to original Manipal PokeQuest gradient */
  background: linear-gradient(135deg, #ff7e5f, #feb47b);
  color: white;
  font-family: 'Poppins', sans-serif; /* Assuming Poppins or similar font for Manipal PokeQuest */
  text-align: center;
  padding: 20px;
  box-sizing: border-box;
  animation: backgroundAnimation 10s ease infinite alternate; /* Subtle background animation */

  @keyframes backgroundAnimation {
    0% { background-position: 0% 50%; }
    100% { background-position: 100% 50%; }
  }
`;


// Helper function to capitalize first letter
const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const NotFound = () => {
  const location = useLocation();
  const [pokemonData, setPokemonData] = useState<{ name: string; imageUrl: string } | null>(null);
  const totalPokemons = 1000; // Increased total_pokemons for more variety

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );

    const getRandomPokemon = async () => {
      try {
        const randomId = Math.floor(Math.random() * totalPokemons) + 1;
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch Pokemon");
        }
        const data = await response.json();
        setPokemonData({
          name: capitalizeFirstLetter(data.name),
          imageUrl: data.sprites.other.dream_world.front_default || data.sprites.front_default, // Fallback sprite
        });
      } catch (error) {
        console.error("Error fetching random Pokemon:", error);
        setPokemonData(null); // Reset if there's an error
      }
    };

    getRandomPokemon();
  }, [location.pathname]);

  return (
    <NotFoundContainer>
        <Leaderboard></Leaderboard>
    </NotFoundContainer>
  );
};

export default NotFound;
>>>>>>> e6feaa7ee4c18a89ee1744b205143b95a8eb8536
