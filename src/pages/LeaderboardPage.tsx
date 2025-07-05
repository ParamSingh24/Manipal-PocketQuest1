import React from 'react';
import Leaderboard from "@/components/Leaderboard";

const LeaderboardPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-red-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Trainer Leaderboard</h1>
        <Leaderboard />
      </div>
    </div>
  );
};

export default LeaderboardPage;
