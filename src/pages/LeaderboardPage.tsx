import React from 'react';
import Leaderboard from "@/components/Leaderboard";
import ReturnHome from "@/components/ReturnHome";
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
 const heroTitleStyle: React.CSSProperties = {
    fontFamily: '"Young Serif", serif',
    fontSize: '3.5rem',
    lineHeight: 1.2,
    color: '#FFFFFF',
    textShadow: '0px 4px 8px rgba(8, 8, 8, 0.4), 0px 0px 15px rgba(255, 255, 255, 0.2)',
    letterSpacing: '0.05em',
    textAlign: 'center',
    margin: '20px',
  };
const LeaderboardPage = () => {
  return (
    <div style={{padding: '20px'}}>
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <Link to="/">
            <Button variant="ghost" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
        
        <h1 style={heroTitleStyle}>Trainer Leaderboard</h1>
        <Leaderboard />
        <ReturnHome />
      </div>
    </div>
  );
};

export default LeaderboardPage;
