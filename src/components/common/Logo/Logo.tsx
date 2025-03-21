// src/components/common/Logo/Logo.tsx
import { Link } from 'react-router-dom';
import styles from './Logo.module.css';
import logoPath from '../../../assets/images/ITO-2.svg';

const Logo = () => {
  return (
    <Link to="/" className={styles.logo}>
      <img src={logoPath} alt="ITO" className={styles.logoImage} />
    </Link>
  );
};

export default Logo;