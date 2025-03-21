// src/components/layout/Footer/Footer.tsx
import { Link } from 'react-router-dom';
import { FaTwitter, FaFacebook, FaLinkedin, FaInstagram, FaYoutube } from 'react-icons/fa';
import Logo from '../../common/Logo/Logo';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerTop}>
          <div className={styles.footerNav}>
            <Link to="/find-mentor" className={styles.footerNavItem}>Find a Mentor</Link>
            <Link to="/find-founder" className={styles.footerNavItem}>Find a Founder</Link>
            <Link to="/online-pitching" className={styles.footerNavItem}>Online Pitching</Link>
            <Link to="/startup-ideas" className={styles.footerNavItem}>Startup Ideas</Link>
            <Link to="/forum" className={styles.footerNavItem}>Forum</Link>
            <Link to="/chatbot" className={styles.footerNavItem}>Chatbot</Link>
          </div>
        </div>
        
        <div className={styles.footerMain}>
          <div className={styles.footerInfo}>
            <div className={styles.logoContainer}>
              <Logo />
            </div>
            <p className={styles.footerDescription}>
              ITO is a platform connecting entrepreneurs with mentors, co-founders, and investors to help startups grow and succeed.
            </p>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialLink}><FaTwitter /></a>
              <a href="#" className={styles.socialLink}><FaFacebook /></a>
              <a href="#" className={styles.socialLink}><FaLinkedin /></a>
              <a href="#" className={styles.socialLink}><FaInstagram /></a>
              <a href="#" className={styles.socialLink}><FaYoutube /></a>
            </div>
          </div>
          
          <div className={styles.footerColumns}>
            <div className={styles.footerColumn}>
              <h3 className={styles.columnTitle}>Company</h3>
              <ul className={styles.columnLinks}>
                <li><a href="#" className={styles.columnLink}>About Us</a></li>
                <li><a href="#" className={styles.columnLink}>Careers</a></li>
                <li><a href="#" className={styles.columnLink}>Press</a></li>
                <li><a href="#" className={styles.columnLink}>Contact</a></li>
              </ul>
            </div>
            
            <div className={styles.footerColumn}>
              <h3 className={styles.columnTitle}>Resources</h3>
              <ul className={styles.columnLinks}>
                <li><a href="#" className={styles.columnLink}>Blog</a></li>
                <li><a href="#" className={styles.columnLink}>Events</a></li>
                <li><a href="#" className={styles.columnLink}>Podcast</a></li>
                <li><a href="#" className={styles.columnLink}>Help Center</a></li>
              </ul>
            </div>
            
            <div className={styles.footerColumn}>
              <h3 className={styles.columnTitle}>Legal</h3>
              <ul className={styles.columnLinks}>
                <li><a href="#" className={styles.columnLink}>Terms of Service</a></li>
                <li><a href="#" className={styles.columnLink}>Privacy Policy</a></li>
                <li><a href="#" className={styles.columnLink}>Cookie Policy</a></li>
                <li><a href="#" className={styles.columnLink}>Accessibility</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className={styles.footerBottom}>
          <div className={styles.copyrightText}>
            &copy; {new Date().getFullYear()} ITO. All rights reserved.
          </div>
          <div className={styles.footerButtons}>
            <Link to="/signup" className={styles.footerButton}>Sign Up</Link>
            <Link to="/login" className={styles.footerButtonOutline}>Log In</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;