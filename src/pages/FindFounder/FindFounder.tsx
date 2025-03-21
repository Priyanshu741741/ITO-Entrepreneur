// src/pages/FindFounder/FindFounder.tsx
import { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaLinkedin, FaGithub, FaEnvelope, FaMapMarkerAlt, FaBriefcase, FaGraduationCap, FaCog } from 'react-icons/fa';
import styles from './FindFounder.module.css';

interface Founder {
  id: number;
  name: string;
  title: string;
  avatar: string;
  location: string;
  lookingFor: string[];
  skills: string[];
  interests: string[];
  experience: string;
  education: string;
  bio: string;
  social: {
    linkedin?: string;
    github?: string;
    email?: string;
  };
  availability: string;
  commitment: 'Full-time' | 'Part-time' | 'Flexible';
  matchPercentage?: number;
  featured?: boolean;
}

const FindFounder = () => {
  const [founders, setFounders] = useState<Founder[]>([]);
  const [filteredFounders, setFilteredFounders] = useState<Founder[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedCommitment, setSelectedCommitment] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Skill options
  const skillOptions = [
    'Software Development',
    'UI/UX Design',
    'Product Management',
    'Marketing',
    'Sales',
    'Business Development',
    'Finance',
    'Operations',
    'Data Science',
    'Machine Learning',
    'Blockchain',
    'Mobile Development',
    'Content Creation',
    'Social Media',
    'Legal'
  ];
  
  // Commitment options
  const commitmentOptions = ['Full-time', 'Part-time', 'Flexible'];
  
  // Fetch founders data
  useEffect(() => {
    const fetchFounders = async () => {
      setLoading(true);
      
      try {
        const mockFounders: Founder[] = [
          {
            id: 1,
            name: 'Alex Chen',
            title: 'Full-Stack Developer',
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
            location: 'San Francisco, CA',
            lookingFor: ['Technical Co-founder', 'Product Manager'],
            skills: ['Software Development', 'UI/UX Design', 'Mobile Development'],
            interests: ['HealthTech', 'AI', 'EdTech'],
            experience: '5+ years in software development at startups',
            education: 'B.S. Computer Science, Stanford University',
            bio: 'I\'m a full-stack developer with experience building scalable web and mobile applications. Looking to join forces with someone who has strong business acumen to build products that make a difference.',
            social: {
              linkedin: 'https://linkedin.com/in/alexchen',
              github: 'https://github.com/alexchen',
              email: 'alex@example.com'
            },
            availability: 'Immediate',
            commitment: 'Full-time',
            matchPercentage: 92,
            featured: true
          },
          {
            id: 2,
            name: 'Sarah Johnson',
            title: 'Product Manager',
            avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
            location: 'New York, NY',
            lookingFor: ['Technical Co-founder', 'Designer'],
            skills: ['Product Management', 'Business Development', 'Marketing'],
            interests: ['FinTech', 'SaaS', 'E-commerce'],
            experience: 'Former PM at Google and two early-stage startups',
            education: 'MBA, Harvard Business School',
            bio: 'Product manager with a passion for building user-centric products. I have experience taking products from 0 to 1 and scaling them. Looking for a technical co-founder to build a FinTech solution.',
            social: {
              linkedin: 'https://linkedin.com/in/sarahjohnson',
              email: 'sarah@example.com'
            },
            availability: 'Within 1 month',
            commitment: 'Full-time',
            matchPercentage: 85,
            featured: true
          },
          {
            id: 3,
            name: 'Michael Rodriguez',
            title: 'Marketing & Growth Expert',
            avatar: 'https://randomuser.me/api/portraits/men/64.jpg',
            location: 'Austin, TX',
            lookingFor: ['Technical Co-founder', 'Product Manager'],
            skills: ['Marketing', 'Sales', 'Content Creation', 'Social Media'],
            interests: ['Consumer Apps', 'MarketingTech', 'D2C'],
            experience: 'Led growth at two Y Combinator startups',
            education: 'B.A. Marketing, University of Texas',
            bio: 'Growth marketer who has helped startups acquire millions of users. I specialize in performance marketing, content strategy, and conversion optimization. Looking to partner with a technical founder to build the next great consumer app.',
            social: {
              linkedin: 'https://linkedin.com/in/michaelr',
              email: 'michael@example.com'
            },
            availability: 'Immediate',
            commitment: 'Part-time',
            matchPercentage: 78
          },
          {
            id: 4,
            name: 'Emily Wong',
            title: 'UX/UI Designer',
            avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
            location: 'Seattle, WA',
            lookingFor: ['Technical Co-founder', 'Business Developer'],
            skills: ['UI/UX Design', 'Product Management', 'Content Creation'],
            interests: ['EdTech', 'Health & Wellness', 'Productivity'],
            experience: 'Design lead at Microsoft and two startups',
            education: 'M.F.A. Interaction Design, Rhode Island School of Design',
            bio: 'Designer with a human-centered approach to creating digital products. I believe in solving real problems through thoughtful design. Looking to partner with someone technical to build tools that improve people\'s lives.',
            social: {
              linkedin: 'https://linkedin.com/in/emilywong',
              github: 'https://github.com/emilywong',
              email: 'emily@example.com'
            },
            availability: 'Within 2 months',
            commitment: 'Flexible',
            matchPercentage: 81
          },
          {
            id: 5,
            name: 'David Park',
            title: 'Data Scientist',
            avatar: 'https://randomuser.me/api/portraits/men/55.jpg',
            location: 'Boston, MA',
            lookingFor: ['Business Co-founder', 'Marketing Expert'],
            skills: ['Data Science', 'Machine Learning', 'Software Development'],
            interests: ['AI', 'FinTech', 'Analytics'],
            experience: 'Data scientist at Amazon and an AI startup',
            education: 'Ph.D. Computer Science, MIT',
            bio: 'Data scientist with expertise in machine learning and AI. I\'ve built recommendation systems and predictive models that drive business value. Looking for a business-minded co-founder to help bring AI solutions to market.',
            social: {
              linkedin: 'https://linkedin.com/in/davidpark',
              github: 'https://github.com/davidpark',
              email: 'david@example.com'
            },
            availability: 'Immediate',
            commitment: 'Full-time',
            matchPercentage: 88,
            featured: true
          },
          {
            id: 6,
            name: 'Jessica Martinez',
            title: 'Operations & Finance',
            avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
            location: 'Chicago, IL',
            lookingFor: ['Technical Co-founder', 'Product Manager'],
            skills: ['Finance', 'Operations', 'Business Development'],
            interests: ['FinTech', 'B2B SaaS', 'Sustainability'],
            experience: 'Former CFO at a Series B startup',
            education: 'MBA, University of Chicago',
            bio: 'Finance and operations leader with experience scaling startups. I excel at building systems and processes that enable growth. Looking for a technical co-founder to build B2B SaaS solutions.',
            social: {
              linkedin: 'https://linkedin.com/in/jessicam',
              email: 'jessica@example.com'
            },
            availability: 'Within 1 month',
            commitment: 'Full-time',
            matchPercentage: 75
          },
          {
            id: 7,
            name: 'Ryan Taylor',
            title: 'Blockchain Developer',
            avatar: 'https://randomuser.me/api/portraits/men/92.jpg',
            location: 'Miami, FL',
            lookingFor: ['Business Co-founder', 'Marketing Expert'],
            skills: ['Blockchain', 'Software Development', 'Smart Contracts'],
            interests: ['Crypto', 'DeFi', 'Web3'],
            experience: 'Core developer for two blockchain projects',
            education: 'B.S. Computer Engineering, Georgia Tech',
            bio: 'Blockchain developer passionate about decentralized applications and Web3. I\'ve built multiple dApps and smart contracts. Looking for a business partner who understands the crypto space and can help with go-to-market strategy.',
            social: {
              linkedin: 'https://linkedin.com/in/ryantaylor',
              github: 'https://github.com/ryantaylor',
              email: 'ryan@example.com'
            },
            availability: 'Immediate',
            commitment: 'Full-time',
            matchPercentage: 83
          },
          {
            id: 8,
            name: 'Olivia Wilson',
            title: 'Content & Social Media Strategist',
            avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
            location: 'Los Angeles, CA',
            lookingFor: ['Technical Co-founder', 'Product Manager'],
            skills: ['Content Creation', 'Social Media', 'Marketing'],
            interests: ['Media', 'Creator Economy', 'Community'],
            experience: 'Built social media presence for multiple D2C brands',
            education: 'B.A. Communications, UCLA',
            bio: 'Content creator and social media strategist who has helped brands build engaged online communities. I understand what resonates with audiences across platforms. Looking for a technical partner to build tools for creators.',
            social: {
              linkedin: 'https://linkedin.com/in/oliviaw',
              email: 'olivia@example.com'
            },
            availability: 'Within 2 months',
            commitment: 'Part-time',
            matchPercentage: 72
          }
        ];
        
        setFounders(mockFounders);
        setFilteredFounders(mockFounders);
      } catch (error) {
        console.error('Error fetching founders:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchFounders();
  }, []);
  
  // Filter founders based on search and filters
  useEffect(() => {
    const filtered = founders.filter(founder => {
      // Search filter
      const matchesSearch = 
        founder.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        founder.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        founder.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
        founder.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
        founder.interests.some(interest => interest.toLowerCase().includes(searchQuery.toLowerCase()));
      
      // Skills filter
      const matchesSkills = 
        selectedSkills.length === 0 || 
        selectedSkills.some(skill => founder.skills.includes(skill));
      
      // Commitment filter
      const matchesCommitment = 
        selectedCommitment === '' || 
        founder.commitment === selectedCommitment;
      
      return matchesSearch && matchesSkills && matchesCommitment;
    });
    
    // Sort by match percentage (highest first)
    const sortedFounders = [...filtered].sort((a, b) => {
      return (b.matchPercentage || 0) - (a.matchPercentage || 0);
    });
    
    setFilteredFounders(sortedFounders);
  }, [searchQuery, selectedSkills, selectedCommitment, founders]);
  
  // Toggle skill selection
  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };
  
  // Set commitment filter
  const setCommitment = (commitment: string) => {
    if (selectedCommitment === commitment) {
      setSelectedCommitment('');
    } else {
      setSelectedCommitment(commitment);
    }
  };
  
  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedSkills([]);
    setSelectedCommitment('');
  };
  
  return (
    <div className={styles.findFounder}>
      <div className={styles.heroSection}>
        <div className={styles.container}>
          <h1 className={styles.heroTitle}>Find Your Co-Founder</h1>
          <p className={styles.heroSubtitle}>
            Connect with potential co-founders who share your vision and complement your skills
          </p>
          
          <div className={styles.searchContainer}>
            <div className={styles.searchBar}>
              <FaSearch className={styles.searchIcon} />
              <input 
                type="text" 
                placeholder="Search by skills, interests, or location..." 
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
              {(selectedSkills.length > 0 || selectedCommitment !== '') && (
                <span className={styles.filterCount}>
                  {selectedSkills.length + (selectedCommitment !== '' ? 1 : 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {showFilters && (
        <div className={styles.filtersSection}>
          <div className={styles.container}>
            <div className={styles.filtersContent}>
              <div className={styles.filterGroup}>
                <h3 className={styles.filterGroupTitle}>Skills</h3>
                <div className={styles.filterOptions}>
                  {skillOptions.map((skill) => (
                    <button 
                      key={skill}
                      className={`${styles.filterTag} ${selectedSkills.includes(skill) ? styles.activeTag : ''}`}
                      onClick={() => toggleSkill(skill)}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className={styles.filterGroup}>
                <h3 className={styles.filterGroupTitle}>Commitment</h3>
                <div className={styles.filterOptions}>
                  {commitmentOptions.map((commitment) => (
                    <button 
                      key={commitment}
                      className={`${styles.filterTag} ${selectedCommitment === commitment ? styles.activeTag : ''}`}
                      onClick={() => setCommitment(commitment)}
                    >
                      {commitment}
                    </button>
                  ))}
                </div>
              </div>
              
              <button 
                className={styles.resetButton}
                onClick={resetFilters}
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className={styles.foundersSection}>
        <div className={styles.container}>
          {loading ? (
            <div className={styles.loadingState}>
              <div className={styles.spinner}></div>
              <p>Loading potential co-founders...</p>
            </div>
          ) : filteredFounders.length > 0 ? (
            <>
              {/* Featured founders section */}
              {selectedSkills.length === 0 && selectedCommitment === '' && searchQuery === '' && (
                <div className={styles.featuredFounders}>
                  <h2 className={styles.sectionTitle}>Featured Co-Founders</h2>
                  <div className={styles.founderGrid}>
                    {filteredFounders
                      .filter(founder => founder.featured)
                      .map(founder => (
                        <div key={founder.id} className={`${styles.founderCard} ${styles.featuredCard}`}>
                          <div className={styles.featuredBadge}>Featured</div>
                          <div className={styles.matchPercentage}>
                            <div className={styles.matchCircle}>
                              <svg viewBox="0 0 36 36" className={styles.matchCircleSvg}>
                                <path
                                  className={styles.matchCircleBackground}
                                  d="M18 2.0845
                                    a 15.9155 15.9155 0 0 1 0 31.831
                                    a 15.9155 15.9155 0 0 1 0 -31.831"
                                />
                                <path
                                  className={styles.matchCircleValue}
                                  strokeDasharray={`${founder.matchPercentage}, 100`}
                                  d="M18 2.0845
                                    a 15.9155 15.9155 0 0 1 0 31.831
                                    a 15.9155 15.9155 0 0 1 0 -31.831"
                                />
                                <text x="18" y="20.35" className={styles.matchText}>{founder.matchPercentage}%</text>
                              </svg>
                            </div>
                            <span className={styles.matchLabel}>Match</span>
                          </div>
                          
                          <div className={styles.founderHeader}>
                            <img 
                              src={founder.avatar} 
                              alt={founder.name} 
                              className={styles.founderAvatar} 
                            />
                          </div>
                          
                          <div className={styles.founderInfo}>
                            <h3 className={styles.founderName}>{founder.name}</h3>
                            <p className={styles.founderTitle}>{founder.title}</p>
                            
                            <div className={styles.founderLocation}>
                              <FaMapMarkerAlt className={styles.infoIcon} />
                              <span>{founder.location}</span>
                            </div>
                            
                            <div className={styles.founderLookingFor}>
                              <h4 className={styles.infoLabel}>Looking for:</h4>
                              <div className={styles.lookingForTags}>
                                {founder.lookingFor.map((role, index) => (
                                  <span key={index} className={styles.lookingForTag}>{role}</span>
                                ))}
                              </div>
                            </div>
                            
                            <div className={styles.founderSkills}>
                              <h4 className={styles.infoLabel}>Skills:</h4>
                              <div className={styles.skillTags}>
                                {founder.skills.map((skill, index) => (
                                  <span key={index} className={styles.skillTag}>{skill}</span>
                                ))}
                              </div>
                            </div>
                            
                            <div className={styles.founderInterests}>
                              <h4 className={styles.infoLabel}>Interests:</h4>
                              <div className={styles.interestTags}>
                                {founder.interests.map((interest, index) => (
                                  <span key={index} className={styles.interestTag}>{interest}</span>
                                ))}
                              </div>
                            </div>
                            
                            <div className={styles.founderExperience}>
                              <div className={styles.experienceItem}>
                                <FaBriefcase className={styles.infoIcon} />
                                <span>{founder.experience}</span>
                              </div>
                              <div className={styles.experienceItem}>
                                <FaGraduationCap className={styles.infoIcon} />
                                <span>{founder.education}</span>
                              </div>
                            </div>
                            
                            <p className={styles.founderBio}>{founder.bio}</p>
                            
                            <div className={styles.founderMeta}>
                              <div className={styles.founderAvailability}>
                                <span className={styles.availabilityLabel}>Availability:</span>
                                <span className={styles.availabilityValue}>{founder.availability}</span>
                              </div>
                              <div className={styles.founderCommitment}>
                                <span className={styles.commitmentLabel}>Commitment:</span>
                                <span className={styles.commitmentValue}>{founder.commitment}</span>
                              </div>
                            </div>
                            
                            <div className={styles.founderSocial}>
                              {founder.social.linkedin && (
                                <a href={founder.social.linkedin} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                                  <FaLinkedin />
                                </a>
                              )}
                              {founder.social.github && (
                                <a href={founder.social.github} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                                  <FaGithub />
                                </a>
                              )}
                              {founder.social.email && (
                                <a href={`mailto:${founder.social.email}`} className={styles.socialLink}>
                                  <FaEnvelope />
                                </a>
                              )}
                            </div>
                            
                            <div className={styles.founderActions}>
                              <button className={styles.primaryButton}>Connect</button>
                              <button className={styles.secondaryButton}>View Profile</button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
              
              {/* All founders section */}
              <div className={styles.allFounders}>
                <h2 className={styles.sectionTitle}>
                  {selectedSkills.length > 0 || selectedCommitment !== '' || searchQuery !== '' 
                    ? `Search Results (${filteredFounders.length})` 
                    : 'All Potential Co-Founders'}
                </h2>
                <div className={styles.founderGrid}>
                  {filteredFounders.map(founder => (
                    <div key={founder.id} className={styles.founderCard}>
                      {founder.matchPercentage && (
                        <div className={styles.matchPercentage}>
                          <div className={styles.matchCircle}>
                            <svg viewBox="0 0 36 36" className={styles.matchCircleSvg}>
                              <path
                                className={styles.matchCircleBackground}
                                d="M18 2.0845
                                  a 15.9155 15.9155 0 0 1 0 31.831
                                  a 15.9155 15.9155 0 0 1 0 -31.831"
                              />
                              <path
                                className={styles.matchCircleValue}
                                strokeDasharray={`${founder.matchPercentage}, 100`}
                                d="M18 2.0845
                                  a 15.9155 15.9155 0 0 1 0 31.831
                                  a 15.9155 15.9155 0 0 1 0 -31.831"
                              />
                              <text x="18" y="20.35" className={styles.matchText}>{founder.matchPercentage}%</text>
                            </svg>
                          </div>
                          <span className={styles.matchLabel}>Match</span>
                        </div>
                      )}
                      
                      <div className={styles.founderHeader}>
                        <img 
                          src={founder.avatar} 
                          alt={founder.name} 
                          className={styles.founderAvatar} 
                        />
                      </div>
                      
                      <div className={styles.founderInfo}>
                        <h3 className={styles.founderName}>{founder.name}</h3>
                        <p className={styles.founderTitle}>{founder.title}</p>
                        
                        <div className={styles.founderLocation}>
                          <FaMapMarkerAlt className={styles.infoIcon} />
                          <span>{founder.location}</span>
                        </div>
                        
                        <div className={styles.founderLookingFor}>
                          <h4 className={styles.infoLabel}>Looking for:</h4>
                          <div className={styles.lookingForTags}>
                            {founder.lookingFor.map((role, index) => (
                              <span key={index} className={styles.lookingForTag}>{role}</span>
                            ))}
                          </div>
                        </div>
                        
                        <div className={styles.founderSkills}>
                          <h4 className={styles.infoLabel}>Skills:</h4>
                          <div className={styles.skillTags}>
                            {founder.skills.slice(0, 3).map((skill, index) => (
                              <span key={index} className={styles.skillTag}>{skill}</span>
                            ))}
                            {founder.skills.length > 3 && (
                              <span className={styles.moreTag}>+{founder.skills.length - 3}</span>
                            )}
                          </div>
                        </div>
                        
                        <div className={styles.founderMeta}>
                          <div className={styles.founderCommitment}>
                            <FaCog className={styles.infoIcon} />
                            <span>{founder.commitment}</span>
                          </div>
                        </div>
                        
                        <div className={styles.founderActions}>
                          <button className={styles.primaryButton}>Connect</button>
                          <button className={styles.secondaryButton}>View Profile</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className={styles.emptyState}>
              <h2>No co-founders found</h2>
              <p>Try adjusting your search criteria or filters</p>
              <button 
                className={styles.resetButton}
                onClick={resetFilters}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FindFounder;