// src/components/sections/Hero/Hero.tsx
import { Link } from 'react-router-dom';
import styles from './Hero.module.css';
import { motion } from 'framer-motion';
import { fadeIn } from '../../../variants.js';
import AnimatedImage from '../../../components/parvesh/images';

const Hero = () => {
  // Animation variants for staggered text
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
        type: "spring",
        stiffness: 100
      }
    })
  };

  // Hero section container variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
        duration: 0.8,
        type: "tween"
      }
    }
  };

  // Button hover variants
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: {
        duration: 0.2,
        type: "spring",
        stiffness: 300
      }
    }
  };

  // Split text into individual letters for animation
  const animateText = (text: string) => {
    return text.split('').map((letter, index) => (
      <motion.span
        key={index}
        custom={index}
        variants={letterVariants}
        initial="hidden"
        animate="visible"
        className={styles.animatedLetter}
      >
        {letter}
      </motion.span>
    ));
  };

  return (
    <motion.section 
      className={styles.hero}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.1 }}
      variants={containerVariants}
    >
      <div className={styles.container}>
        <div className={styles.heroContent}>
          <motion.div 
            variants={fadeIn('right', 0.3)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.3 }}
            className={styles.heroTextContent}
          >
            <h1 className={styles.title}>
              Connect with <span className={styles.highlight}>{animateText("Entrepreneurs")}</span> and <span className={styles.highlight}>{animateText("Mentors")}</span> who can transform your business
            </h1>
            <motion.p 
              variants={fadeIn('up', 0.4)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.3 }}
              className={styles.subtitle}
            >
              Find the right mentor, co-founder, or investor to take your startup to the next level
            </motion.p>
            <motion.div 
              variants={fadeIn('up', 0.6)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.3 }}
              className={styles.buttonGroup}
            >
              <motion.div
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
              >
                <Link to="/find-mentor" className={styles.findMentorButton}>
                  FIND A MENTOR
                </Link>
              </motion.div>
              <motion.div
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
              >
                <Link to="/signup" className={styles.getStartedButton}>
                  GET STARTED
                </Link>
              </motion.div>
            </motion.div>
            <motion.p 
              variants={fadeIn('up', 0.8)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.3 }}
              className={styles.subtext}
            >
              ITO is free to try for as long as you like
            </motion.p>
          </motion.div>
          <motion.div 
            variants={fadeIn('left', 0.5)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.3 }}
            className={styles.heroImageContainer}
          >
            <motion.div 
              className={styles.imagePlaceholder}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                transition: { 
                  duration: 0.5,
                  delay: 0.4
                }
              }}
            >
              <AnimatedImage />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Hero;