// src/pages/MentorMatching/MentorMatching.tsx
import { useState } from 'react';
import { FaStar, FaFilter, FaSearch, FaCalendarAlt, FaVideo, FaPhoneAlt } from 'react-icons/fa';
import styles from './MentorMatching.module.css';

interface Mentor {
  id: number;
  name: string;
  title: string;
  company: string;
  avatar: string;
  rating: number;
  expertise: string[];
  bio: string;
  matchScore: number;
}

const MentorMatching = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  
  const expertiseOptions = [
    'Product Development',
    'Marketing',
    'Sales',
    'Fundraising',
    'Business Strategy',
    'Technology',
    'Finance',
    'Legal',
    'Operations',
    'Leadership'
  ];
  
  const mentors: Mentor[] = [
    {
      id: 1,
      name: 'Sarah Johnson',
      title: 'Founder & CEO',
      company: 'TechVentures Inc.',
      avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
      rating: 4.9,
      expertise: ['Product Development', 'Business Strategy', 'Fundraising'],
      bio: 'Serial entrepreneur with 15+ years of experience in tech startups. Raised over $50M in venture capital across multiple companies.',
      matchScore: 95
    },
    {
      id: 2,
      name: 'David Chen',
      title: 'CTO',
      company: 'InnovateTech',
      avatar: 'https://randomuser.me/api/portraits/men/54.jpg',
      rating: 4.7,
      expertise: ['Technology', 'Product Development', 'Leadership'],
      bio: 'Technology leader specializing in scaling engineering teams. Previously led development at two unicorn startups.',
      matchScore: 88
    },
    {
      id: 3,
      name: 'Maria Rodriguez',
      title: 'Marketing Director',
      company: 'GrowthLabs',
      avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
      rating: 4.8,
      expertise: ['Marketing', 'Sales', 'Business Strategy'],
      bio: 'Marketing executive with expertise in B2B SaaS. Specialized in go-to-market strategies and brand development.',
      matchScore: 82
    },
    {
      id: 4,
      name: 'James Wilson',
      title: 'Angel Investor',
      company: 'Wilson Ventures',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      rating: 4.6,
      expertise: ['Fundraising', 'Finance', 'Business Strategy'],
      bio: 'Angel investor who has backed 30+ early-stage startups. Previously founded and sold two companies in the fintech space.',
      matchScore: 75
    },
  ];
  
  const handleExpertiseToggle = (expertise: string) => {
    if (selectedExpertise.includes(expertise)) {
      setSelectedExpertise(selectedExpertise.filter(item => item !== expertise));
    } else {
      setSelectedExpertise([...selectedExpertise, expertise]);
    }
  };
  
  const filteredMentors = mentors.filter(mentor => {
    // Filter by search query
    const matchesSearch = mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          mentor.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          mentor.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by expertise
    const matchesExpertise = selectedExpertise.length === 0 || 
                            selectedExpertise.some(expertise => mentor.expertise.includes(expertise));
    
    return matchesSearch && matchesExpertise;
  });
  
  return (
    <div className={styles.mentorMatching}>
      <div className={styles.header}>
        <h1 className={styles.title}>Find Your Perfect Mentor</h1>
        <p className={styles.subtitle}>
          Connect with experienced entrepreneurs and industry experts who can guide you through your business journey.
        </p>
      </div>
      
      <div className={styles.searchContainer}>
        <div className={styles.searchBar}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search mentors by name, title, or company"
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
          <h3 className={styles.filterTitle}>Filter by Expertise</h3>
          <div className={styles.expertiseOptions}>
            {expertiseOptions.map(expertise => (
              <button
                key={expertise}
                className={`${styles.expertiseTag} ${selectedExpertise.includes(expertise) ? styles.selectedTag : ''}`}
                onClick={() => handleExpertiseToggle(expertise)}
              >
                {expertise}
              </button>
            ))}
          </div>
        </div>
      )}
      
      <div className={styles.mentorsList}>
        {filteredMentors.length > 0 ? (
          filteredMentors.map(mentor => (
            <div key={mentor.id} className={styles.mentorCard}>
              <div className={styles.matchScore}>
                <div className={styles.scoreCircle} style={{ background: `conic-gradient(var(--color-primary) ${mentor.matchScore}%, transparent 0)` }}>
                  <span className={styles.scoreText}>{mentor.matchScore}%</span>
                </div>
                <p className={styles.matchLabel}>Match</p>
              </div>
              
              <div className={styles.mentorInfo}>
                <img 
                  src={mentor.avatar} 
                  alt={mentor.name} 
                  className={styles.mentorAvatar} 
                />
                <div className={styles.mentorDetails}>
                  <h3 className={styles.mentorName}>{mentor.name}</h3>
                  <p className={styles.mentorTitle}>{mentor.title} at {mentor.company}</p>
                  <div className={styles.mentorRating}>
                    <FaStar className={styles.starIcon} />
                    <span>{mentor.rating}</span>
                  </div>
                  <div className={styles.mentorExpertise}>
                    {mentor.expertise.map(skill => (
                      <span key={skill} className={styles.expertiseTag}>{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
              
              <p className={styles.mentorBio}>{mentor.bio}</p>
              
              <div className={styles.actionButtons}>
                <button className={styles.scheduleButton}>
                  <FaCalendarAlt className={styles.buttonIcon} />
                  Schedule
                </button>
                <button className={styles.messageButton}>
                  <FaVideo className={styles.buttonIcon} />
                  Video Call
                </button>
                <button className={styles.messageButton}>
                  <FaPhoneAlt className={styles.buttonIcon} />
                  Phone Call
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.noResults}>
            <p>No mentors found matching your criteria. Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MentorMatching;