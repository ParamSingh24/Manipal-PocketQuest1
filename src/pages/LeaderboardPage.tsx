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