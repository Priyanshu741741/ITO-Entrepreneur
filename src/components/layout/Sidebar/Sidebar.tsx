// src/components/layout/Sidebar/Sidebar.tsx
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaUsers, FaBook, FaNetworkWired, FaSearch, FaBars } from 'react-icons/fa';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  
  const sidebarItems = [
    { icon: <FaHome />, label: 'Home', path: '/dashboard' },
    { icon: <FaUsers />, label: 'Mentor Matching', path: '/mentor-matching' },
    { icon: <FaBook />, label: 'Knowledge Hub', path: '/knowledge-hub' },
    { icon: <FaNetworkWired />, label: 'Network Map', path: '/network-map' },
  ];
  
  const channelItems = [
    { label: 'announcements', path: '#' },
    { label: 'project-gizmo', path: '#' },
    { label: 'team-marketing', path: '#' },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <div className={styles.headerContent}>
          <div className={styles.logoContainer} onClick={toggleMenu}>
            <h2 className={styles.title}>ITO</h2>
            <div className={styles.menuToggle}>
              <FaBars className={styles.menuIcon} />
            </div>
          </div>
          <span className={styles.badge}>Pro</span>
        </div>
      </div>
      
      <div className={styles.sidebarContent}>
        <div className={styles.searchContainer}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search ITO"
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <nav className={styles.mainNav}>
          <ul className={styles.navList}>
            {sidebarItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`${styles.navItem} ${
                    location.pathname === item.path ? styles.activeNavItem : ''
                  }`}
                >
                  <span className={styles.navIcon}>{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className={styles.channelsContainer}>
          <h3 className={styles.channelsTitle}>Channels</h3>
          <ul className={styles.channelsList}>
            {channelItems.map((channel) => (
              <li key={channel.label}>
                <Link
                  to={channel.path}
                  className={styles.channelItem}
                >
                  <span className={styles.channelHash}>#</span>
                  {channel.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;