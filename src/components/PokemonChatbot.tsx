import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X } from 'lucide-react';
import { cn } from '@/lib/utils';

// Define the Pokemon interface for the chatbot
interface Pokemon {
  name: string;
  image: string;
  type: string;
  description?: string;
}

// Define the message interface
interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

// Define the props for the PokemonChatbot component
interface PokemonChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  apiKey: string;
  pokemon?: Pokemon;
}

// Helper function to get color based on Pokemon type
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
  return colors[type?.toLowerCase()] || '#AAA67F'; // Default to normal type color
};

const PokemonChatbot: React.FC<PokemonChatbotProps> = ({ 
  isOpen, 
  onClose, 
  apiKey,
  pokemon = {
    name: 'Pikachu',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
    type: 'electric',
  }
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  // Handle dialog open/close and Pokémon changes
  useEffect(() => {
    // Reset messages when dialog is closed
    if (!isOpen) {
      setMessages([]);
      return;
    }
    
    // Add greeting message when dialog opens with empty messages
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          content: `Hi there! I'm ${pokemon.name}. How can I help you today?`,
          sender: 'bot',
          timestamp: new Date()
        }
      ]);
    }
    
    // Focus the input when the dialog opens
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen, pokemon.name, messages.length]);
  
  // Reset messages when Pokémon changes
  useEffect(() => {
    if (isOpen) {
      setMessages([]);
    }
  }, [pokemon.name]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Handle sending a message
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    try {
      // Validate API key before making the request
      if (!apiKey || apiKey.trim() === '') {
        throw new Error('API key is missing or invalid');
      }
      
      // Call the Gemini API
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey
        },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: `You are ${pokemon.name}, a helpful and friendly Pokémon assistant. Respond in a cheerful, energetic manner that matches ${pokemon.name}'s personality. Keep responses concise and helpful.` }]
            },
            ...messages.map(msg => ({
              role: msg.sender === 'user' ? 'user' : 'model',
              parts: [{ text: msg.content }]
            })),
            {
              role: 'user',
              parts: [{ text: inputValue }]
            }
          ],
          max_tokens: 1000
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => response.text());
        console.error('API Error Response:', errorData);
        const errorMessage = typeof errorData === 'string' ? errorData : (errorData.error?.message || `API request failed with status ${response.status}`);
        throw new Error(errorMessage);
      }
      
      const data = await response.json();
      
      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts[0]) {
        throw new Error('Invalid response format from API');
      }
      
      // Add bot response
      const botMessage: Message = {
        id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        content: data.candidates[0].content.parts[0].text,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error calling PPLX API:', error);
      
      // Determine the appropriate error message
      let errorContent = `Oops! ${pokemon.name} is having trouble connecting. Please try again later.`;
      
      if (error instanceof Error) {
        if (error.message.toLowerCase().includes('api key')) {
          errorContent = `Oops! It seems there's an issue with the API key. Please make sure it's correct and has been properly configured.`;
        } else {
          errorContent = `Sorry, I'm having a little trouble thinking right now. Here's the error I encountered: ${error.message}`;
        }
      }
      
      // Add error message
      const errorMessage: Message = {
        id: Date.now().toString(),
        content: errorContent,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };
  
  // Handle key press (Enter to send)
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  return (
    <Dialog 
      open={isOpen} 
      onOpenChange={(open) => {
        if (!open) {
          // Only call onClose when dialog is being closed
          onClose();
        }
      }}
    >
      <DialogContent
        className="sm:max-w-[500px] max-h-[80vh] flex flex-col bg-white dark:bg-zinc-900 z-[50] shadow-2xl border-2 border-primary/40"
        aria-describedby="pokemon-chatbot-description"
      >
        <DialogHeader className="flex flex-row items-center justify-between pb-2">
          <div className="flex items-center gap-2">
            <div 
              className="w-10 h-10 rounded-full overflow-hidden border-2" 
              style={{ borderColor: getTypeColor(pokemon.type) }}
            >
              <img 
                src={pokemon.image} 
                alt={pokemon.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <DialogTitle className="text-xl">
              {pokemon.name} Assistant
            </DialogTitle>
            <DialogDescription id="pokemon-chatbot-description" className="sr-only">
              Chat with {pokemon.name}, your personal Pokémon assistant.
            </DialogDescription>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="rounded-full"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        {/* Messages container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 mb-4 border rounded-md">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={cn(
                  "flex",
                  message.sender === 'user' ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg p-3",
                    message.sender === 'user'
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                  {message.sender === 'bot' && (
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 rounded-full overflow-hidden">
                        <img 
                          src={pokemon.image} 
                          alt={pokemon.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="font-semibold text-sm">{pokemon.name}</span>
                    </div>
                  )}
                  <div className="whitespace-pre-wrap">{message.content}</div>
                  <div className="text-xs opacity-70 mt-1 text-right">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="max-w-[80%] rounded-lg p-3 bg-muted">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 rounded-full overflow-hidden">
                      <img 
                        src={pokemon.image} 
                        alt={pokemon.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="font-semibold text-sm">{pokemon.name}</span>
                  </div>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </AnimatePresence>
        </div>
        
        {/* Input area */}
        <div className="flex gap-2 items-end">
          <Textarea
            ref={inputRef}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            placeholder={`Ask ${pokemon.name} something...`}
            className="min-h-[60px] max-h-[120px] resize-none bg-white dark:bg-zinc-800 text-black dark:text-white border border-primary/40 focus:ring-2 focus:ring-primary"
            autoFocus
            disabled={isLoading ? true : false}
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={!inputValue.trim() || isLoading}
            size="icon"
            className="mb-[3px]"
            style={{
              backgroundColor: getTypeColor(pokemon.type),
            }}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PokemonChatbot;