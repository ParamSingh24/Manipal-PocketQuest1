import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pokemon } from '@/types';
import { Star, Trophy, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// --- UI Components (mocked for shadcn-like usage) ---
const Dialog = ({ open, onOpenChange, children }) => (
  <div 
    className="fixed inset-0 z-50 flex items-center justify-center"
    onClick={() => onOpenChange(false)}
  >
    {children}
  </div>
);

const DialogContent = ({ className, children }) => (
  <div className={className} onClick={(e) => e.stopPropagation()}>
    {children}
  </div>
);
const DialogHeader = ({ className, children }) => <div className={className}>{children}</div>;
const DialogTitle = ({ className, children }) => <h2 className={className}>{children}</h2>;
const DialogDescription = ({ className, children }) => <p className={className}>{children}</p>;
const Button = ({ className, children, ...props }) => <button className={className} {...props}>{children}</button>;

interface StoryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  pokemon: Pokemon | null;
}

const StoryDialog: React.FC<StoryDialogProps> = ({ isOpen, onClose, pokemon }) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [showCompletion, setShowCompletion] = useState(false);
  const navigate = useNavigate();

  // If no pokemon is provided, use a default one
  const defaultPokemon = {
    id: 25,
    name: 'Pikachu',
    type: 'electric',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
    description: 'When several of these POKéMON gather, their electricity could build and cause lightning storms.'
  };

  const activePokemon = pokemon || defaultPokemon;
  
  // Simple story content
  const storyContent = [
    {
      title: 'Welcome to Your Health Adventure!',
      content: `Hi there! I'm ${activePokemon.name}, and I'll be your guide on this exciting health journey!`
    },
    {
      title: 'Walk and Earn Pokémon',
      content: 'As you walk and stay active, you\'ll earn Pokémon to add to your collection. The more steps you take, the higher you\'ll climb on our leaderboard!'
    },
    {
      title: 'Health Quests',
      content: 'Attend health-related quests and challenges to catch rare Pokémon. Complete quizzes about health topics and expand your knowledge while growing your collection!'
    },
    {
      title: 'Leaderboard Prizes',
      content: 'Stay at the top of the leaderboard and you\'ll be eligible for special prizes! The healthier you are, the more rewards you\'ll unlock.'
    }
  ];
  const handleNext = React.useCallback(() => {
    if (currentStoryIndex < storyContent.length - 1) {
      setCurrentStoryIndex(prev => prev + 1);
    } else {
      // End of story, show completion
      setShowCompletion(true);
    }
  }, [currentStoryIndex, storyContent.length]);

  const handleComplete = () => {
    setShowCompletion(false);
    setCurrentStoryIndex(0);
    onClose();
    // Navigate to catch Pokemon page
    navigate('/catch');
  };

  // Reset story index when dialog is closed
  useEffect(() => {
    if (!isOpen) {
      setCurrentStoryIndex(0);
      setShowCompletion(false);
    }
  }, [isOpen]);

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (e.key === 'ArrowRight' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (showCompletion) {
          handleComplete();
        } else {
          handleNext();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentStoryIndex, showCompletion, handleNext, handleComplete]);

  // Show completion screen
  if (showCompletion) {
    return (
      <Dialog open={isOpen} onOpenChange={(open) => !open && handleComplete()}>
        <DialogContent className="sm:max-w-[700px] bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 border-2 border-yellow-200 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600 mb-4 flex items-center justify-center">
              <Trophy className="w-8 h-8 mr-3 text-yellow-500" />
              Quest Completed!
            </DialogTitle>
          </DialogHeader>
          
          <div className="text-center py-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <div className="text-2xl font-bold text-gray-800 mb-2">
                🎉 You completed 500 steps! 🎉
              </div>
              <div className="text-lg text-gray-600 mb-6">
                Here is your reward:
              </div>
            </motion.div>

            {/* Pokemon Reward Card */}
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-xl border-2 border-yellow-300 max-w-md mx-auto"
            >
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  duration: 2, 
                  ease: "easeInOut", 
                  repeat: Infinity,
                  repeatDelay: 1
                }}
                className="relative"
              >
                <img 
                  src={activePokemon.image} 
                  alt={activePokemon.name} 
                  className="w-32 h-32 object-contain mx-auto mb-4"
                />
                
                {/* Glow effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full filter blur-xl opacity-50"
                  animate={{ 
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 2, 
                    ease: "easeInOut", 
                    repeat: Infinity,
                    repeatType: "reverse" 
                  }}
                />
              </motion.div>
              
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-2 capitalize">
                  {activePokemon.name}
                </h3>
                <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold mb-3 uppercase">
                  {activePokemon.type}
                </div>
                <p className="text-gray-600 text-sm">
                  {activePokemon.description}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-6"
            >
              <Button 
                onClick={handleComplete}
                className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white px-10 py-3 rounded-full font-bold text-lg shadow-lg transform hover:scale-105 transition-all duration-200"
                autoFocus
              >
                <Zap className="w-5 h-5 mr-2" />
                Continue Adventure!
              </Button>
            </motion.div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[700px] bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 border-2 border-blue-200 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
            {storyContent[currentStoryIndex].title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col lg:flex-row items-center space-y-6 lg:space-y-0 lg:space-x-8 py-6">
          {/* Enhanced Pokemon Display */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-64 h-64 relative flex-shrink-0"
            key={`pokemon-${currentStoryIndex}`}
          >
            {/* Pokemon Image */}
            <motion.img 
              src={activePokemon.image} 
              alt={activePokemon.name} 
              className="w-full h-full object-contain z-10 relative"
              animate={{ 
                y: [0, -15, 0],
                scale: [1, 1.08, 1]
              }}
              transition={{ 
                duration: 2, 
                ease: "easeInOut", 
                repeat: Infinity,
                repeatDelay: 0.5
              }}
            />
            
            {/* Enhanced glow effect */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full filter blur-2xl -z-10"
              animate={{ 
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2, 
                ease: "easeInOut", 
                repeat: Infinity,
                repeatType: "reverse" 
              }}
            />
          </motion.div>
          
          {/* Static Story Text */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStoryIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <div className="text-xl text-gray-800 leading-relaxed font-medium" style={{ minHeight: '120px' }}>
                  {storyContent[currentStoryIndex].content}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        
        <div className="flex flex-col items-center mt-6 space-y-4">
          {/* Enhanced Progress indicator */}
          <div className="flex space-x-3 mb-4">
            {storyContent.map((_, index) => (
              <motion.div 
                key={index} 
                className={`h-3 w-3 rounded-full transition-all duration-300 ${
                  index === currentStoryIndex 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 scale-125' 
                    : 'bg-gray-300'
                }`}
                whileHover={{ scale: 1.2 }}
                aria-hidden="true"
              />
            ))}
          </div>
          
          <Button 
            onClick={handleNext}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-10 py-3 rounded-full font-bold text-lg shadow-lg transform hover:scale-105 transition-all duration-200"
            autoFocus
            aria-label={currentStoryIndex < storyContent.length - 1 ? 'Next story page' : 'Complete quest'}
          >
            <motion.span
              animate={currentStoryIndex < storyContent.length - 1 ? {} : { scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              {currentStoryIndex < storyContent.length - 1 ? 'Next' : 'Complete Quest!'}
            </motion.span>
            {currentStoryIndex === storyContent.length - 1 && (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="ml-2"
              >
                <Star className="w-5 h-5" />
              </motion.div>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StoryDialog;
