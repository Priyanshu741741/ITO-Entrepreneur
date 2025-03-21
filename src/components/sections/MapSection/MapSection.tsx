// src/components/sections/MapSection/MapSection.tsx
import { useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import styles from './MapSection.module.css';
import { motion } from 'framer-motion';
import { fadeIn } from '../../../variants.js';
import GoogleMapsImage from '../../../components/parvesh/googlemaps.tsx';

const MapSection = () => {
  const [mapFilter, setMapFilter] = useState('mentors');
  
  return (
    <section className={styles.mapSection}>
      <div className={styles.container}>
        <motion.div 
          className={styles.mapHeader}
          variants={fadeIn('down', 0.3)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
        >
          <h2 className={styles.sectionTitle}>Find Connections Near You</h2>
          <p className={styles.sectionDescription}>
            Explore mentors, startups, and networking events in your area
          </p>
          
          <div className={styles.mapFilters}>
            <motion.button 
              className={`${styles.filterButton} ${mapFilter === 'mentors' ? styles.activeFilter : ''}`}
              onClick={() => setMapFilter('mentors')}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <FaMapMarkerAlt className={styles.filterIcon} />
              Mentors
            </motion.button>
            <motion.button 
              className={`${styles.filterButton} ${mapFilter === 'startups' ? styles.activeFilter : ''}`}
              onClick={() => setMapFilter('startups')}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <FaMapMarkerAlt className={styles.filterIcon} />
              Startups
            </motion.button>
            <motion.button 
              className={`${styles.filterButton} ${mapFilter === 'events' ? styles.activeFilter : ''}`}
              onClick={() => setMapFilter('events')}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <FaMapMarkerAlt className={styles.filterIcon} />
              Events
            </motion.button>
          </div>
        </motion.div>
        
        <motion.div 
          className={styles.mapContainer}
          variants={fadeIn('up', 0.5)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
        >
          {/* Google Maps image component */}
          <div className={styles.googleMapContainer}>
            <GoogleMapsImage />
          </div>
        </motion.div>
        
        <motion.div 
          className={styles.mapLegend}
          variants={fadeIn('up', 0.7)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
        >
          <div className={styles.legendItem}>
            <div className={`${styles.legendDot} ${styles.mentorDot}`}></div>
            <span>Mentors</span>
          </div>
          <div className={styles.legendItem}>
            <div className={`${styles.legendDot} ${styles.startupDot}`}></div>
            <span>Startups</span>
          </div>
          <div className={styles.legendItem}>
            <div className={`${styles.legendDot} ${styles.eventDot}`}></div>
            <span>Events</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MapSection;