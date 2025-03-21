// src/components/layout/Header/Header.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import Logo from '../../common/Logo/Logo';
import styles from './Header.module.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.logoContainer}>
          <Logo />
        </div>
        
        <div className={styles.rightSection}>
          <nav className={styles.desktopNav}>
            <Link to="/find-mentor" className={styles.navItem}>Find a Mentor</Link>
            <Link to="/find-founder" className={styles.navItem}>Find a Co-Founder</Link>
            <Link to="/online-pitching" className={styles.navItem}>Online Pitching</Link>
            <Link to="/startup-ideas" className={styles.navItem}>Startup Ideas</Link>
            <Link to="/forum" className={styles.navItem}>Forum</Link>
            <Link to="/chatbot" className={styles.navItem}>Chatbot</Link>
          </nav>
          
          <div className={styles.actionButtons}>
            <button className={styles.searchButton}>
              <FaSearch />
            </button>
            <Link to="/login" className={styles.signInLink}>Sign in</Link>
            <Link to="/signup" className={styles.getStartedButton}>
              GET STARTED
            </Link>
          </div>
          
          <button className={styles.mobileMenuButton} onClick={toggleMenu}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className={styles.mobileMenu}>
          <nav className={styles.mobileNav}>
            <Link to="/find-mentor" className={styles.mobileNavItem}>Find a Mentor</Link>
            <Link to="/find-founder" className={styles.mobileNavItem}>Find a Founder</Link>
            <Link to="/online-pitching" className={styles.mobileNavItem}>Online Pitching</Link>
            <Link to="/startup-ideas" className={styles.mobileNavItem}>Startup Ideas</Link>
            <Link to="/forum" className={styles.mobileNavItem}>Forum</Link>
            <Link to="/chatbot" className={styles.mobileNavItem}>Chatbot</Link>
            <Link to="/login" className={styles.mobileNavItem}>Sign in</Link>
            <div className={styles.mobileButtons}>
              <button className={styles.mobileGetStartedButton}>GET STARTED</button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;