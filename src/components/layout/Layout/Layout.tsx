// src/components/layout/Layout/Layout.tsx
import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Sidebar from '../Sidebar/Sidebar';
import styles from './Layout.module.css';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isDashboard = location.pathname.includes('/dashboard') || 
                      location.pathname.includes('/mentor-matching') || 
                      location.pathname.includes('/knowledge-hub') || 
                      location.pathname.includes('/network-map');

  return (
    <div className={styles.layout}>
      <Header />
      
      <div className={styles.content}>
        {isDashboard && <Sidebar />}
        <main className={`${styles.main} ${isDashboard ? styles.withSidebar : ''}`}>
          {children}
        </main>
      </div>
      
      {!isDashboard && <Footer />}
    </div>
  );
};

export default Layout;