// src/pages/NetworkMap/NetworkMap.tsx
import { useState } from 'react';
import { FaSearch, FaFilter, FaUserPlus, FaEnvelope, FaLinkedin, FaTwitter, FaBuilding, FaMapMarkerAlt, FaBriefcase, FaUsers } from 'react-icons/fa';
import styles from './NetworkMap.module.css';

interface Connection {
  id: number;
  name: string;
  title: string;
  company: string;
  avatar: string;
  location: string;
  industry: string;
  connectionType: 'direct' | 'secondDegree' | 'recommended';
  mutualConnections?: number;
  skills: string[];
  contact?: {
    email?: string;
    linkedin?: string;
    twitter?: string;
  };
}

const NetworkMap = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [selectedConnectionType, setSelectedConnectionType] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  
  const industries = [
    'all',
    'technology',
    'healthcare',
    'finance',
    'education',
    'retail',
    'manufacturing',
    'consulting'
  ];
  
  const connectionTypes = [
    'all',
    'direct',
    'secondDegree',
    'recommended'
  ];
  
  const connections: Connection[] = [
    {
      id: 1,
      name: 'Michael Johnson',
      title: 'Startup Advisor',
      company: 'Tech Ventures',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      location: 'San Francisco, CA',
      industry: 'technology',
      connectionType: 'direct',
      skills: ['Business Strategy', 'Fundraising', 'Product Development'],
      contact: {
        email: 'michael@example.com',
        linkedin: 'linkedin.com/in/michael',
        twitter: 'twitter.com/michael'
      }
    },
    {
      id: 2,
      name: 'Lisa Williams',
      title: 'Investment Partner',
      company: 'Capital Ventures',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      location: 'New York, NY',
      industry: 'finance',
      connectionType: 'direct',
      skills: ['Venture Capital', 'Financial Analysis', 'Due Diligence'],
      contact: {
        email: 'lisa@example.com',
        linkedin: 'linkedin.com/in/lisa'
      }
    },
    {
      id: 3,
      name: 'David Chen',
      title: 'CTO',
      company: 'InnovateTech',
      avatar: 'https://randomuser.me/api/portraits/men/54.jpg',
      location: 'Boston, MA',
      industry: 'technology',
      connectionType: 'secondDegree',
      mutualConnections: 3,
      skills: ['Software Architecture', 'AI/ML', 'Team Leadership']
    },
    {
      id: 4,
      name: 'Sarah Thompson',
      title: 'Marketing Director',
      company: 'Growth Strategies',
      avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
      location: 'Chicago, IL',
      industry: 'consulting',
      connectionType: 'secondDegree',
      mutualConnections: 1,
      skills: ['Digital Marketing', 'Brand Development', 'Growth Hacking']
    },
    {
      id: 5,
      name: 'James Wilson',
      title: 'Healthcare Entrepreneur',
      company: 'MediNova',
      avatar: 'https://randomuser.me/api/portraits/men/62.jpg',
      location: 'Austin, TX',
      industry: 'healthcare',
      connectionType: 'recommended',
      skills: ['Healthcare Innovation', 'Business Development', 'Strategic Partnerships']
    },
    {
      id: 6,
      name: 'Emily Davis',
      title: 'EdTech Founder',
      company: 'LearnSphere',
      avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
      location: 'Seattle, WA',
      industry: 'education',
      connectionType: 'recommended',
      skills: ['Education Technology', 'Product Management', 'UX Design']
    },
  ];
  
  const getConnectionTypeLabel = (type: string) => {
    switch (type) {
      case 'direct':
        return 'Direct Connection';
      case 'secondDegree':
        return '2nd Degree';
      case 'recommended':
        return 'Recommended';
      default:
        return type;
    }
  };
  
  const filteredConnections = connections.filter(connection => {
    const matchesSearch = connection.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         connection.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         connection.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesIndustry = selectedIndustry === 'all' || connection.industry === selectedIndustry;
    
    const matchesConnectionType = selectedConnectionType === 'all' || connection.connectionType === selectedConnectionType;
    
    return matchesSearch && matchesIndustry && matchesConnectionType;
  });
  
  return (
    <div className={styles.networkMap}>
      <div className={styles.header}>
        <h1 className={styles.title}>Network Map</h1>
        <p className={styles.subtitle}>
          Discover, connect, and collaborate with entrepreneurs and industry experts in your network.
        </p>
      </div>
      
      <div className={styles.searchFilterContainer}>
        <div className={styles.searchBar}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search your network..."
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button 
          className={styles.filterButton}
          onClick={() => setShowFilters(!showFilters)}
        >
          <FaFilter className={styles.filterIcon} />
          Filters
        </button>
      </div>
      
      {showFilters && (
        <div className={styles.filtersContainer}>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Industry:</label>
            <div className={styles.filterOptions}>
              {industries.map(industry => (
                <button
                  key={industry}
                  className={`${styles.filterOption} ${selectedIndustry === industry ? styles.activeFilter : ''}`}
                  onClick={() => setSelectedIndustry(industry)}
                >
                  {industry.charAt(0).toUpperCase() + industry.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Connection Type:</label>
            <div className={styles.filterOptions}>
              {connectionTypes.map(type => (
                <button
                  key={type}
                  className={`${styles.filterOption} ${selectedConnectionType === type ? styles.activeFilter : ''}`}
                  onClick={() => setSelectedConnectionType(type)}
                >
                  {type === 'all' ? 'All' : getConnectionTypeLabel(type)}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      
      <div className={styles.connectionsGrid}>
        {filteredConnections.length > 0 ? (
          filteredConnections.map(connection => (
            <div key={connection.id} className={styles.connectionCard}>
              <div className={styles.connectionHeader}>
                <img 
                  src={connection.avatar} 
                  alt={connection.name} 
                  className={styles.avatar} 
                />
                <div className={styles.connectionType}>
                  {connection.connectionType === 'direct' && (
                    <span className={`${styles.typeTag} ${styles.directTag}`}>
                      Direct Connection
                    </span>
                  )}
                  {connection.connectionType === 'secondDegree' && (
                    <span className={`${styles.typeTag} ${styles.secondDegreeTag}`}>
                      2nd Degree • {connection.mutualConnections} mutual
                    </span>
                  )}
                  {connection.connectionType === 'recommended' && (
                    <span className={`${styles.typeTag} ${styles.recommendedTag}`}>
                      Recommended
                    </span>
                  )}
                </div>
              </div>
              
              <div className={styles.connectionInfo}>
                <h3 className={styles.name}>{connection.name}</h3>
                <p className={styles.title}>{connection.title}</p>
                <p className={styles.company}>
                  <FaBuilding className={styles.infoIcon} />
                  {connection.company}
                </p>
                <p className={styles.location}>
                  <FaMapMarkerAlt className={styles.infoIcon} />
                  {connection.location}
                </p>
                <p className={styles.industry}>
                  <FaBriefcase className={styles.infoIcon} />
                  {connection.industry.charAt(0).toUpperCase() + connection.industry.slice(1)}
                </p>
                
                <div className={styles.skills}>
                  {connection.skills.map((skill, index) => (
                    <span key={index} className={styles.skillTag}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className={styles.connectionActions}>
                {connection.connectionType === 'direct' && connection.contact && (
                  <div className={styles.contactOptions}>
                    {connection.contact.email && (
                      <a href={`mailto:${connection.contact.email}`} className={styles.contactButton}>
                        <FaEnvelope />
                      </a>
                    )}
                    {connection.contact.linkedin && (
                      <a href={connection.contact.linkedin} target="_blank" rel="noopener noreferrer" className={styles.contactButton}>
                        <FaLinkedin />
                      </a>
                    )}
                    {connection.contact.twitter && (
                      <a href={connection.contact.twitter} target="_blank" rel="noopener noreferrer" className={styles.contactButton}>
                        <FaTwitter />
                      </a>
                    )}
                  </div>
                )}
                
                {connection.connectionType !== 'direct' && (
                  <button className={styles.connectButton}>
                    <FaUserPlus className={styles.buttonIcon} />
                    {connection.connectionType === 'secondDegree' ? 'Request Introduction' : 'Connect'}
                  </button>
                )}
                
                {connection.connectionType === 'secondDegree' && (
                  <button className={styles.mutualButton}>
                    <FaUsers className={styles.buttonIcon} />
                    View Mutual
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className={styles.noResults}>
            <p>No connections found matching your criteria. Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NetworkMap;