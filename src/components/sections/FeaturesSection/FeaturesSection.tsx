// src/components/sections/FeaturesSection/FeaturesSection.tsx
import { 
    FaUsers, 
    FaLaptopCode, 
    FaLightbulb 
  } from 'react-icons/fa';
  import styles from './FeaturesSection.module.css';
  
  const FeaturesSection = () => {
    const features = [
      {
        id: 1,
        title: 'Find a Founder',
        description: 'Connect with potential co-founders who share your vision and complement your skills.',
        icon: <FaUsers />,
        link: '/find-founder'
      },
      {
        id: 2,
        title: 'Online Pitching',
        description: 'Present your startup idea to investors and mentors through our virtual pitching platform.',
        icon: <FaLaptopCode />,
        link: '/online-pitching'
      },
      {
        id: 3,
        title: 'Startup Ideas',
        description: 'Explore curated startup ideas based on industry trends and market opportunities.',
        icon: <FaLightbulb />,
        link: '/startup-ideas'
      }
    ];
  
    return (
      <section className={styles.featuresSection}>
        <div className={styles.container}>
          <div className={styles.featuresHeader}>
            <h2 className={styles.sectionTitle}>
              Comprehensive Tools & Resources
            </h2>
            <p className={styles.sectionSubtitle}>
              EntreConnect offers a comprehensive suite of tools and resources to help you at every stage of your entrepreneurial journey
            </p>
          </div>
          
          <div className={styles.featuresGrid}>
            {features.map(feature => (
              <div key={feature.id} className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  {feature.icon}
                </div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
                <a href={feature.link} className={styles.featureLink}>
                  Learn More
                  <svg className={styles.arrow} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z" fill="currentColor"/>
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default FeaturesSection;