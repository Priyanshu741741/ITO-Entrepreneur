import React from 'react';
import { motion } from 'framer-motion';

const GoogleMapsImage: React.FC = () => {
  // Create a visual representation of the Chandigarh map
  return (
    <motion.div
      style={{
        width: '100%',
        height: '100%',
        borderRadius: '10px',
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#e8f4f8', // Light blue background for water
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Grid lines */}
      <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, opacity: 0.2 }}>
        {[...Array(20)].map((_, i) => (
          <line 
            key={`h-${i}`} 
            x1="0" 
            y1={`${i * 5}%`} 
            x2="100%" 
            y2={`${i * 5}%`} 
            stroke="#333" 
            strokeWidth="1" 
          />
        ))}
        {[...Array(20)].map((_, i) => (
          <line 
            key={`v-${i}`} 
            x1={`${i * 5}%`} 
            y1="0" 
            x2={`${i * 5}%`} 
            y2="100%" 
            stroke="#333" 
            strokeWidth="1" 
          />
        ))}
      </svg>
      
      {/* Stylized land areas */}
      <motion.div style={{
        position: 'absolute',
        top: '30%',
        left: '35%',
        width: '40%',
        height: '45%',
        backgroundColor: '#d1e8df',
        borderRadius: '5px',
        transform: 'rotate(15deg)',
      }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      ></motion.div>
      
      <motion.div style={{
        position: 'absolute',
        top: '20%',
        left: '45%',
        width: '30%',
        height: '35%',
        backgroundColor: '#d1e8df',
        borderRadius: '5px',
        transform: 'rotate(-10deg)',
      }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      ></motion.div>
      
      {/* Main roads */}
      <motion.div style={{
        position: 'absolute',
        top: '20%',
        left: '50%',
        width: '2px',
        height: '60%',
        backgroundColor: '#ffffff',
        transform: 'translateX(-50%)',
      }}
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      ></motion.div>
      
      <motion.div style={{
        position: 'absolute',
        top: '50%',
        left: '20%',
        width: '60%',
        height: '2px',
        backgroundColor: '#ffffff',
        transform: 'translateY(-50%)',
      }}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.5, delay: 0.7 }}
      ></motion.div>
      
      {/* City center label */}
      <motion.div style={{
        position: 'absolute',
        top: '47%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'rgba(255,255,255,0.8)',
        padding: '5px 10px',
        borderRadius: '5px',
        fontSize: '14px',
        fontWeight: 'bold',
        color: '#333',
        zIndex: 5,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
      >
        Chandigarh
      </motion.div>
      
      {/* Markers */}
      <motion.div 
        style={{
          position: 'absolute',
          top: '47%',
          left: '50%',
          width: '30px',
          height: '30px',
          backgroundColor: 'var(--color-primary, #6366f1)',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 0 5px rgba(99, 102, 241, 0.3)',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 10
        }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.2 }}
      >
        <div style={{
          position: 'absolute',
          top: '-35px',
          backgroundColor: '#333',
          color: 'white',
          padding: '3px 8px',
          borderRadius: '4px',
          fontSize: '0.75rem',
          whiteSpace: 'nowrap'
        }}>
          City Center
        </div>
      </motion.div>
      
      <motion.div 
        style={{
          position: 'absolute',
          top: '35%',
          left: '35%',
          width: '25px',
          height: '25px',
          backgroundColor: '#f472b6',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 0 5px rgba(244, 114, 182, 0.3)',
          cursor: 'pointer',
          zIndex: 5
        }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.7 }}
        whileHover={{ scale: 1.2 }}
      >
        <div style={{
          position: 'absolute',
          top: '-35px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#333',
          color: 'white',
          padding: '3px 8px',
          borderRadius: '4px',
          fontSize: '0.75rem',
          whiteSpace: 'nowrap'
        }}>
          Startup Hub
        </div>
      </motion.div>
      
      <motion.div 
        style={{
          position: 'absolute',
          top: '60%',
          left: '70%',
          width: '25px',
          height: '25px',
          backgroundColor: '#10b981',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 0 5px rgba(16, 185, 129, 0.3)',
          cursor: 'pointer',
          zIndex: 5
        }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.9 }}
        whileHover={{ scale: 1.2 }}
      >
        <div style={{
          position: 'absolute',
          top: '-35px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#333',
          color: 'white',
          padding: '3px 8px',
          borderRadius: '4px',
          fontSize: '0.75rem',
          whiteSpace: 'nowrap'
        }}>
          Mentor Meetup
        </div>
      </motion.div>
      
      <motion.div 
        style={{
          position: 'absolute',
          top: '30%',
          left: '60%',
          width: '25px',
          height: '25px',
          backgroundColor: '#f59e0b',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 0 5px rgba(245, 158, 11, 0.3)',
          cursor: 'pointer',
          zIndex: 5
        }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.1 }}
        whileHover={{ scale: 1.2 }}
      >
        <div style={{
          position: 'absolute',
          top: '-35px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#333',
          color: 'white',
          padding: '3px 8px',
          borderRadius: '4px',
          fontSize: '0.75rem',
          whiteSpace: 'nowrap'
        }}>
          Networking Event
        </div>
      </motion.div>
    </motion.div>
  );
};

export default GoogleMapsImage; 