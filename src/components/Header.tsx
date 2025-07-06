import React, { useState } from 'react';
import { Menu, X, User, MessageCircle } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import VoiceNavigation from './VoiceNavigation';
import Narrator from './Narrator';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Catch Pokemon', href: '/catch' },
    { name: 'Inventory', href: '/inventory' },
    { name: 'Leaderboard', href: '/leaderboard' },
    { name: 'Pokémon Chatbot', href: '/chatbot' },
    { name: 'Challenges', href: '/challenges' }
  ];

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          {/* Logo and Brand */}
          <div className="logo-section">
            <Link to="/" className="logo">
              <div className="logo-icon">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg" 
                  alt="Pokeball" 
                  style={{ width: 32, height: 32 }} 
                />
              </div>
              <span className="brand-name">Manipal PokeQuest</span>
            </Link>
            
            {/* Chatbot Quick Access */}
            <Link to="/chatbot" className="chatbot-quick-access">
              <MessageCircle size={20} />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="nav-link"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Header Actions */}
          <div className="header-actions">
            <VoiceNavigation />
            <Narrator 
              text="Welcome to Manipal PokeQuest. Navigate through the menu to explore different features like catching Pokemon, viewing your inventory, checking the leaderboard, chatting with our AI assistant, taking health challenges, and exploring disease outbreak data."
              className="header-narrator"
            />
            <ThemeToggle />
            <div className="user-profile">
              <div className="profile-avatar">
                <User size={16} />
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="mobile-menu-btn"
              aria-label="Toggle mobile menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="mobile-nav">
            <nav className="mobile-nav-content">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="mobile-nav-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
