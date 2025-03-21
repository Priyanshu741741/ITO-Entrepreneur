// src/components/sections/Features/Features.tsx
import { FaUserFriends, FaBook, FaNetworkWired, FaStore, FaRobot, FaUsers } from 'react-icons/fa';
import styles from './Features.module.css';

const Features = () => {
  const features = [
    {
      icon: <FaUserFriends className={styles.featureIcon} />,
      title: "Smart Mentor Matching",
      description: "AI-powered system that connects entrepreneurs with the perfect mentors based on industry, goals, and challenges."
    },
    {
      icon: <FaBook className={styles.featureIcon} />,
      title: "Knowledge Repository",
      description: "Access curated industry insights, process templates, and interactive learning modules tailored to your business needs."
    },
    {
      icon: <FaNetworkWired className={styles.featureIcon} />,
      title: "Network Visualization",
      description: "Interactive business network map that helps you discover connections and potential partnerships."
    },
    {
      icon: <FaStore className={styles.featureIcon} />,
      title: "Resource Marketplace",
      description: "Find verified service providers and exchange resources with other entrepreneurs in your network."
    },
    {
      icon: <FaRobot className={styles.featureIcon} />,
      title: "AI Assistant",
      description: "Get personalized action plans, progress tracking, and predictive insights for your business challenges."
    },
    {
      icon: <FaUsers className={styles.featureIcon} />,
      title: "Community Engagement",
      description: "Join peer mastermind groups, share skills, and celebrate success stories within the entrepreneurial community."
    }
  ];

  return (
    <section className={styles.features}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Accelerate Your Entrepreneurial Journey</h2>
        
        <div className={styles.featureGrid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <div className={styles.iconWrapper}>{feature.icon}</div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;