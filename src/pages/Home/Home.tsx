// src/pages/Home/Home.tsx
import Hero from '../../components/sections/Hero/Hero';
import MapSection from '../../components/sections/MapSection/MapSection';
import ChatbotSection from '../../components/sections/ChatbotSection/ChatbotSection';
import ForumSection from '../../components/sections/ForumSection/ForumSection';
import FeaturesSection from '../../components/sections/FeaturesSection/FeaturesSection';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.home}>
      <Hero />
      <FeaturesSection />
      <MapSection />
      <ForumSection />
      <ChatbotSection />
    </div>
  );
};

export default Home;