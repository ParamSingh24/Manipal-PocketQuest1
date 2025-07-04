
import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
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
            <h1 className="hero-title">
              <span className="title-word title-embark">Embark</span> on Your{' '}
              <span className="title-word title-health">Health</span>{' '}
              <span className="title-word title-adventure">Adventure</span>
            </h1>
            
            <p className="hero-description">
              Transform your health journey into an exciting quest. Explore real-time disease outbreak data, 
              weather intelligence, and AI health assistance, all while interacting with your favorite characters.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hero-cta-btn"
            >
              Start Your Quest
            </motion.button>
          </motion.div>

          {/* Character/Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-visual"
          >
            <div className="character-container">
              <div className="character-circle">
                <img 
                  src="/uploads/a3e73554-a0e3-4119-8841-56403ce5b6d6.png" 
                  alt="Health Guardian Character"
                  className="character-image"
                />
              </div>
              
              {/* Floating elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Infinity }}
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
