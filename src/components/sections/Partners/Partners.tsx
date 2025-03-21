// src/components/sections/Partners/Partners.tsx
import styles from './Partners.module.css';

const Partners = () => {
  const partners = [
    { name: 'Airbnb', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg' },
    { name: 'NASA', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/NASA_logo.svg' },
    { name: 'Uber', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg' },
    { name: 'Target', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Target_Corporation_logo_%28vector%29.svg' },
    { name: 'New York Times', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/77/The_New_York_Times_logo.svg' },
    { name: 'Etsy', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Etsy_logo.svg' },
  ];

  return (
    <section className={styles.partners}>
      <div className={styles.container}>
        <div className={styles.logoGrid}>
          {partners.map((partner) => (
            <div key={partner.name} className={styles.logoItem}>
              <img 
                src={partner.logo} 
                alt={`${partner.name} logo`} 
                className={styles.logo}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;