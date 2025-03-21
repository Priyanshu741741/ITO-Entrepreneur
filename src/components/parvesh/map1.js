import React from 'react';
import { motion } from 'framer-motion';

const Map1 = () => {
  // Define the map dimensions
  const mapWidth = '100%';
  const mapHeight = '500px';
  
  // Styles for the map container
  const mapStyle = {
    width: mapWidth,
    height: mapHeight,
    backgroundColor: '#e8f4f8',
    borderRadius: '10px',
    position: 'relative',
    overflow: 'hidden',
  };
  
  // Styles for the continents
  const continentStyle = {
    position: 'absolute',
    backgroundColor: '#88c1d2',
    borderRadius: '10px',
  };
  
  // Continent positions and sizes
  const continents = [
    // North America
    { top: '25%', left: '15%', width: '25%', height: '20%' },
    // South America
    { top: '45%', left: '25%', width: '15%', height: '25%' },
    // Europe
    { top: '25%', left: '45%', width: '10%', height: '15%' },
    // Africa
    { top: '40%', left: '45%', width: '15%', height: '25%' },
    // Asia
    { top: '25%', left: '60%', width: '25%', height: '25%' },
    // Australia
    { top: '55%', left: '75%', width: '12%', height: '15%' },
  ];
  
  // Hotspot styles
  const hotspotStyle = {
    position: 'absolute',
    width: '20px',
    height: '20px',
    backgroundColor: '#6366f1',
    borderRadius: '50%',
    boxShadow: '0 0 0 5px rgba(99, 102, 241, 0.3)',
    cursor: 'pointer',
  };
  
  // Hotspot positions
  const hotspots = [
    { top: '30%', left: '20%', label: 'USA' },
    { top: '27%', left: '47%', label: 'Europe' },
    { top: '35%', left: '70%', label: 'Asia' },
  ];
  
  // Hotspot label style
  const labelStyle = {
    position: 'absolute',
    top: '-25px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#333',
    color: 'white',
    padding: '3px 8px',
    borderRadius: '4px',
    fontSize: '0.75rem',
    whiteSpace: 'nowrap',
  };
  
  return (
    <div style={mapStyle}>
      {/* Draw continents */}
      {continents.map((continent, index) => (
        <motion.div
          key={index}
          style={{
            ...continentStyle,
            top: continent.top,
            left: continent.left,
            width: continent.width,
            height: continent.height,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
        />
      ))}
      
      {/* Draw hotspots */}
      {hotspots.map((hotspot, index) => (
        <motion.div
          key={index}
          style={{
            ...hotspotStyle,
            top: hotspot.top,
            left: hotspot.left,
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1 + (index * 0.2), duration: 0.5 }}
          whileHover={{ scale: 1.2 }}
        >
          <div style={labelStyle}>{hotspot.label}</div>
        </motion.div>
      ))}
      
      {/* Map grid lines */}
      <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, opacity: 0.2 }}>
        {[...Array(10)].map((_, i) => (
          <line 
            key={`h-${i}`} 
            x1="0" 
            y1={`${i * 10}%`} 
            x2="100%" 
            y2={`${i * 10}%`} 
            stroke="#333" 
            strokeWidth="1" 
          />
        ))}
        {[...Array(10)].map((_, i) => (
          <line 
            key={`v-${i}`} 
            x1={`${i * 10}%`} 
            y1="0" 
            x2={`${i * 10}%`} 
            y2="100%" 
            stroke="#333" 
            strokeWidth="1" 
          />
        ))}
      </svg>
    </div>
  );
};

export default Map1; 