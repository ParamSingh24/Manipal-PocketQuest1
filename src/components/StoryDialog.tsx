import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Pokemon } from '@/types';

interface StoryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  pokemon: Pokemon | null;
}

const StoryDialog: React.FC<StoryDialogProps> = ({ isOpen, onClose, pokemon }) => {
  // If no pokemon is provided, use a default one
  const defaultPokemon = {
    id: 25,
    name: 'Pikachu',
    type: 'electric',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
    description: 'When several of these POKéMON gather, their electricity could build and cause lightning storms.'
  };

  const activePokemon = pokemon || defaultPokemon;
  
  // Story content - health benefits and app features
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

  const [currentStoryIndex, setCurrentStoryIndex] = React.useState(0);
  
  const handleNext = React.useCallback(() => {
    if (currentStoryIndex < storyContent.length - 1) {
      setCurrentStoryIndex(prevIndex => prevIndex + 1);
    } else {
      // End of story, close the dialog
      onClose();
      // Reset for next time
      setCurrentStoryIndex(0);
    }
  }, [currentStoryIndex, storyContent.length, onClose]);

  // Reset story index when dialog is closed
  React.useEffect(() => {
    if (!isOpen) {
      setCurrentStoryIndex(0);
    }
  }, [isOpen]);

  // Add keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (e.key === 'ArrowRight' || e.key === 'Enter' || e.key === ' ') {
        handleNext();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentStoryIndex, handleNext]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px] bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-blue-700">
            {storyContent[currentStoryIndex].title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center space-y-4 py-4">
          {/* Pokemon Image */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-40 h-40 relative"
            key={`pokemon-${currentStoryIndex}`} // Re-render on story change
          >
            <motion.img 
              src={activePokemon.image} 
              alt={activePokemon.name} 
              className="w-full h-full object-contain"
              animate={{ 
                y: [0, -10, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 1.5, 
                ease: "easeInOut", 
                times: [0, 0.5, 1],
                repeat: Infinity,
                repeatDelay: 1
              }}
            />
            {/* Glow effect */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full filter blur-xl -z-10"
              animate={{ opacity: [0.2, 0.4, 0.2] }}
              transition={{ 
                duration: 2, 
                ease: "easeInOut", 
                repeat: Infinity,
                repeatType: "reverse" 
              }}
            ></motion.div>
          </motion.div>
          
          {/* Story Text */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStoryIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="text-center px-4"
            >
              <DialogDescription className="text-lg text-gray-700">
                {storyContent[currentStoryIndex].content}
              </DialogDescription>
            </motion.div>
          </AnimatePresence>
        </div>
        
        <div className="flex flex-col items-center mt-4 space-y-3">
          {/* Progress indicator */}
          <div className="flex space-x-2 mb-2">
            {storyContent.map((_, index) => (
              <div 
                key={index} 
                className={`h-2 w-2 rounded-full transition-colors duration-300 ${index === currentStoryIndex ? 'bg-blue-500' : 'bg-gray-300'}`}
                aria-hidden="true"
              />
            ))}
          </div>
          
          <Button 
            onClick={handleNext}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-2 rounded-full font-medium"
            autoFocus
            aria-label={currentStoryIndex < storyContent.length - 1 ? 'Next story page' : 'Start your adventure'}
          >
            {currentStoryIndex < storyContent.length - 1 ? 'Next' : 'Start Adventure!'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StoryDialog;