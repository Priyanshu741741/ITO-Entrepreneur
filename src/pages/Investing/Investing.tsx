// src/pages/Investing/Investing.tsx
import styles from './Investing.module.css';

const Investing = () => {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>Investing</h1>
        <p className={styles.pageDescription}>Discover promising startups to invest in or connect with investors interested in your venture.</p>
        <p className={styles.comingSoon}>Full feature coming soon!</p>
      </div>
    </div>
  );
};

export default Investing;