import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX, Volume1, Settings, Play, Pause, Square } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NarratorSettings {
  rate: number;
  pitch: number;
  volume: number;
  voice: string;
}

interface ContentSection {
  id: string;
  title: string;
  content: string;
  priority: number;
}

const WebsiteNarrator: React.FC = () => {
  const [isReading, setIsReading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [settings, setSettings] = useState<NarratorSettings>({
    rate: 1,
    pitch: 1,
    volume: 1,
    voice: ''
  });
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const contentQueueRef = useRef<ContentSection[]>([]);

  // Extract all readable content from the website
  const extractWebsiteContent = (): ContentSection[] => {
    const sections: ContentSection[] = [];
    
    // Hero Section
    const heroTitle = document.querySelector('.hero-title');
    const heroDescription = document.querySelector('.hero-description');
    if (heroTitle) {
      sections.push({
        id: 'hero-title',
        title: 'Main Title',
        content: heroTitle.textContent || '',
        priority: 1
      });
    }
    if (heroDescription) {
      sections.push({
        id: 'hero-description',
        title: 'Hero Description',
        content: heroDescription.textContent || '',
        priority: 2
      });
    }

    // Features Section
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
      const title = card.querySelector('.feature-title');
      const description = card.querySelector('.feature-description');
      if (title && description) {
        sections.push({
          id: `feature-${index}`,
          title: title.textContent || '',
          content: `${title.textContent}. ${description.textContent}`,
          priority: 3
        });
      }
    });

    // How It Works Section
    const stepCards = document.querySelectorAll('.step-card');
    stepCards.forEach((card, index) => {
      const title = card.querySelector('.step-title');
      const description = card.querySelector('.step-description');
      if (title && description) {
        sections.push({
          id: `step-${index}`,
          title: title.textContent || '',
          content: `${title.textContent}. ${description.textContent}`,
          priority: 4
        });
      }
    });

    // Testimonials Section
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach((card, index) => {
      const text = card.querySelector('.testimonial-text');
      const author = card.querySelector('.testimonial-author');
      if (text && author) {
        sections.push({
          id: `testimonial-${index}`,
          title: 'Testimonial',
          content: `${text.textContent} - ${author.textContent}`,
          priority: 5
        });
      }
    });

    // Technology Section
    const techCards = document.querySelectorAll('.technology-card');
    techCards.forEach((card, index) => {
      const name = card.querySelector('.tech-name');
      const description = card.querySelector('.tech-description');
      if (name && description) {
        sections.push({
          id: `tech-${index}`,
          title: name.textContent || '',
          content: `${name.textContent}. ${description.textContent}`,
          priority: 6
        });
      }
    });

    // Pricing Section
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach((card, index) => {
      const planName = card.querySelector('.plan-name');
      const price = card.querySelector('.plan-price');
      const features = card.querySelectorAll('.feature-item');
      if (planName && price) {
        let content = `${planName.textContent}. ${price.textContent}.`;
        features.forEach(feature => {
          content += ` ${feature.textContent}.`;
        });
        sections.push({
          id: `pricing-${index}`,
          title: planName.textContent || '',
          content: content,
          priority: 7
        });
      }
    });

    // Download Section
    const downloadTitle = document.querySelector('.download-title');
    const downloadDescription = document.querySelector('.download-description');
    if (downloadTitle && downloadDescription) {
      sections.push({
        id: 'download-section',
        title: 'Download Section',
        content: `${downloadTitle.textContent}. ${downloadDescription.textContent}`,
        priority: 8
      });
    }

    return sections.sort((a, b) => a.priority - b.priority);
  };

  // Initialize speech synthesis
  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        setAvailableVoices(voices);
        
        if (voices.length > 0 && !settings.voice) {
          const englishVoice = voices.find(voice => 
            voice.lang.startsWith('en') && voice.default
          ) || voices[0];
          setSettings(prev => ({ ...prev, voice: englishVoice.name }));
        }
      };

      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      if (utteranceRef.current) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const speak = (content: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      console.error('Speech synthesis not supported');
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new window.SpeechSynthesisUtterance(content);
    utterance.rate = settings.rate;
    utterance.pitch = settings.pitch;
    utterance.volume = settings.volume;
    
    if (settings.voice) {
      const selectedVoice = availableVoices.find(voice => voice.name === settings.voice);
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
    }

    utterance.onstart = () => {
      setIsReading(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsReading(false);
      setIsPaused(false);
      // Move to next section if available
      if (currentSection < contentQueueRef.current.length - 1) {
        setCurrentSection(prev => prev + 1);
        setTimeout(() => {
          speak(contentQueueRef.current[currentSection + 1].content);
        }, 500);
      }
    };

    utterance.onpause = () => setIsPaused(true);
    utterance.onresume = () => setIsPaused(false);
    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event.error);
      setIsReading(false);
      setIsPaused(false);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const startReadingWebsite = () => {
    const content = extractWebsiteContent();
    contentQueueRef.current = content;
    setCurrentSection(0);
    
    if (content.length > 0) {
      speak(content[0].content);
    }
  };

  const pause = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const resume = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  };

  const stop = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsReading(false);
      setIsPaused(false);
      setCurrentSection(0);
      utteranceRef.current = null;
    }
  };

  const toggleReading = () => {
    if (isReading) {
      if (isPaused) {
        resume();
      } else {
        pause();
      }
    } else {
      startReadingWebsite();
    }
  };

  const handleSettingsChange = (key: keyof NarratorSettings, value: number | string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="header-narrator" style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
      <Button
        onClick={() => {
          if (isReading) {
            if (isPaused) {
              if (window.speechSynthesis) window.speechSynthesis.resume();
              setIsPaused(false);
            } else {
              if (window.speechSynthesis) window.speechSynthesis.pause();
              setIsPaused(true);
            }
          } else {
            const content = extractWebsiteContent();
            contentQueueRef.current = content;
            setCurrentSection(0);
            if (content.length > 0) {
              // Start reading
              const utter = new window.SpeechSynthesisUtterance(content[0].content);
              utter.rate = settings.rate;
              utter.pitch = settings.pitch;
              utter.volume = settings.volume;
              if (settings.voice) {
                const selectedVoice = availableVoices.find(voice => voice.name === settings.voice);
                if (selectedVoice) utter.voice = selectedVoice;
              }
              utter.onstart = () => { setIsReading(true); setIsPaused(false); };
              utter.onend = () => {
                setIsReading(false);
                setIsPaused(false);
                if (currentSection < contentQueueRef.current.length - 1) {
                  setCurrentSection(prev => prev + 1);
                  setTimeout(() => {
                    const next = contentQueueRef.current[currentSection + 1];
                    if (next) {
                      const nextUtter = new window.SpeechSynthesisUtterance(next.content);
                      nextUtter.rate = settings.rate;
                      nextUtter.pitch = settings.pitch;
                      nextUtter.volume = settings.volume;
                      if (settings.voice) {
                        const selectedVoice = availableVoices.find(voice => voice.name === settings.voice);
                        if (selectedVoice) nextUtter.voice = selectedVoice;
                      }
                      nextUtter.onstart = () => { setIsReading(true); setIsPaused(false); };
                      nextUtter.onend = () => setIsReading(false);
                      window.speechSynthesis.speak(nextUtter);
                    }
                  }, 500);
                }
              };
              window.speechSynthesis.speak(utter);
            }
          }
        }}
        size="icon"
        variant="ghost"
        className={`narrator-btn ${isReading ? 'reading' : ''}`}
        style={{ color: 'inherit', background: 'none' }}
        title={isReading ? (isPaused ? 'Resume reading' : 'Pause reading') : 'Read entire website'}
      >
        <AnimatePresence mode="wait">
          {isReading ? (
            isPaused ? (
              <motion.div
                key="paused"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Pause className="h-4 w-4" />
              </motion.div>
            ) : (
              <motion.div
                key="reading"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Volume2 className="h-4 w-4" />
              </motion.div>
            )
          ) : (
            <motion.div
              key="stopped"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Play className="h-4 w-4" />
            </motion.div>
          )}
        </AnimatePresence>
      </Button>
      {isReading && (
        <Button
          onClick={() => {
            if (window.speechSynthesis) window.speechSynthesis.cancel();
            setIsReading(false);
            setIsPaused(false);
            setCurrentSection(0);
          }}
          size="icon"
          variant="ghost"
          className="narrator-stop-btn"
          style={{ color: 'inherit', background: 'none' }}
          title="Stop reading"
        >
          <Square className="h-4 w-4" />
        </Button>
      )}
      <div style={{ position: 'relative' }}>
        <Button
          onClick={() => setShowSettings(!showSettings)}
          size="icon"
          variant="ghost"
          className="narrator-settings-btn"
          style={{ color: 'inherit', background: 'none' }}
          title="Voice settings"
        >
          <Settings className="h-4 w-4" />
        </Button>
        <AnimatePresence>
          {showSettings && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="narrator-settings"
              style={{ position: 'absolute', top: '110%', right: 0, zIndex: 100 }}
            >
              <div className="settings-content">
                <h3 className="text-sm font-semibold mb-3">Voice Settings</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-muted-foreground">Voice</label>
                    <select
                      value={settings.voice}
                      onChange={(e) => handleSettingsChange('voice', e.target.value)}
                      className="w-full text-xs p-2 border rounded"
                    >
                      {availableVoices.map((voice) => (
                        <option key={voice.name} value={voice.name}>
                          {voice.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Speed</label>
                    <input
                      type="range"
                      min="0.5"
                      max="2"
                      step="0.1"
                      value={settings.rate}
                      onChange={(e) => handleSettingsChange('rate', parseFloat(e.target.value))}
                      className="w-full"
                    />
                    <span className="text-xs text-muted-foreground">{settings.rate}x</span>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Pitch</label>
                    <input
                      type="range"
                      min="0.5"
                      max="2"
                      step="0.1"
                      value={settings.pitch}
                      onChange={(e) => handleSettingsChange('pitch', parseFloat(e.target.value))}
                      className="w-full"
                    />
                    <span className="text-xs text-muted-foreground">{settings.pitch}x</span>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Volume</label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={settings.volume}
                      onChange={(e) => handleSettingsChange('volume', parseFloat(e.target.value))}
                      className="w-full"
                    />
                    <span className="text-xs text-muted-foreground">{Math.round(settings.volume * 100)}%</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WebsiteNarrator; 