// src/pages/FindMentor/FindMentor.tsx
import { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaStar, FaMapMarkerAlt, FaBriefcase, FaCalendarAlt, FaHeart, FaRegHeart } from 'react-icons/fa';
import styles from './FindMentor.module.css';

interface Mentor {
  id: number;
  name: string;
  title: string;
  company: string;
  avatar: string;
  location: string;
  rating: number;
  reviewCount: number;
  expertise: string[];
  industries: string[];
  bio: string;
  hourlyRate: number;
  availability: string[];
  featured?: boolean;
  favorite?: boolean;
}

const FindMentor = () => {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [filteredMentors, setFilteredMentors] = useState<Mentor[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([]);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Expertise and industry options
  const expertiseOptions = [
    'Business Strategy', 
    'Marketing', 
    'Sales', 
    'Product Development', 
    'Fundraising', 
    'Leadership', 
    'Technology', 
    'Operations', 
    'Finance', 
    'Legal'
  ];
  
  const industryOptions = [
    'Technology', 
    'Healthcare', 
    'Finance', 
    'E-commerce', 
    'Education', 
    'Manufacturing', 
    'Media', 
    'Food & Beverage', 
    'Real Estate', 
    'Energy'
  ];
  
  // Fetch mentors data
  useEffect(() => {
    // Simulating API call
    const fetchMentors = async () => {
      setLoading(true);
      
      try {
        // In a real app, this would be an API call
        // For the hackathon, we'll use mock data
        const mockMentors: Mentor[] = [
          {
            id: 1,
            name: 'Sarah Johnson',
            title: 'Startup Advisor & Angel Investor',
            company: 'TechVentures Capital',
            avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
            location: 'San Francisco, CA',
            rating: 4.9,
            reviewCount: 87,
            expertise: ['Business Strategy', 'Fundraising', 'Leadership'],
            industries: ['Technology', 'E-commerce'],
            bio: 'Serial entrepreneur with 15+ years of experience in building and scaling tech startups. Former CEO of CloudTech (acquired by Microsoft) and advisor to 20+ startups that have raised over $100M collectively.',
            hourlyRate: 150,
            availability: ['Mon', 'Wed', 'Fri'],
            featured: true
          },
          {
            id: 2,
            name: 'Michael Chen',
            title: 'Product & Growth Mentor',
            company: 'GrowthLabs',
            avatar: 'https://randomuser.me/api/portraits/men/64.jpg',
            location: 'New York, NY',
            rating: 4.8,
            reviewCount: 62,
            expertise: ['Product Development', 'Marketing', 'Sales'],
            industries: ['Technology', 'Media'],
            bio: 'Product leader with experience at Google, Facebook, and multiple startups. Specialized in helping early-stage startups find product-market fit and implement scalable growth strategies.',
            hourlyRate: 120,
            availability: ['Tue', 'Thu', 'Sat']
          },
          {
            id: 3,
            name: 'Jessica Williams',
            title: 'Finance & Operations Expert',
            company: 'Williams Consulting',
            avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
            location: 'Chicago, IL',
            rating: 4.7,
            reviewCount: 41,
            expertise: ['Finance', 'Operations', 'Business Strategy'],
            industries: ['Finance', 'Healthcare', 'Manufacturing'],
            bio: 'Former CFO with expertise in financial modeling, fundraising, and operational efficiency. Helped companies raise Series A through C funding and prepare for successful exits.',
            hourlyRate: 130,
            availability: ['Mon', 'Tue', 'Thu'],
            featured: true
          },
          {
            id: 4,
            name: 'David Singh',
            title: 'Technology & Engineering Leader',
            company: 'TechFoundry',
            avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
            location: 'Austin, TX',
            rating: 4.9,
            reviewCount: 53,
            expertise: ['Technology', 'Product Development', 'Leadership'],
            industries: ['Technology', 'E-commerce'],
            bio: 'CTO with experience scaling engineering teams from 5 to 150+. Expert in software architecture, technical debt management, and building high-performance engineering cultures.',
            hourlyRate: 140,
            availability: ['Wed', 'Fri', 'Sat']
          },
          {
            id: 5,
            name: 'Amanda Lee',
            title: 'Marketing & Brand Strategist',
            company: 'Brand Elevate',
            avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
            location: 'Los Angeles, CA',
            rating: 4.8,
            reviewCount: 76,
            expertise: ['Marketing', 'Sales', 'Business Strategy'],
            industries: ['Media', 'E-commerce', 'Food & Beverage'],
            bio: 'Marketing executive who has led brand strategy for Fortune 500 companies and fast-growing startups. Specializes in brand positioning, go-to-market strategies, and digital marketing optimization.',
            hourlyRate: 125,
            availability: ['Mon', 'Wed', 'Fri']
          },
          {
            id: 6,
            name: 'Robert Taylor',
            title: 'Legal & Compliance Advisor',
            company: 'Taylor Legal Group',
            avatar: 'https://randomuser.me/api/portraits/men/33.jpg',
            location: 'Boston, MA',
            rating: 4.6,
            reviewCount: 38,
            expertise: ['Legal', 'Business Strategy', 'Finance'],
            industries: ['Finance', 'Healthcare', 'Technology'],
            bio: 'Attorney specialized in startup law with experience in entity formation, fundraising, IP protection, and regulatory compliance. Former general counsel for multiple tech startups.',
            hourlyRate: 160,
            availability: ['Tue', 'Thu', 'Sat']
          },
          {
            id: 7,
            name: 'Elena Rodriguez',
            title: 'Healthcare Innovation Expert',
            company: 'HealthTech Innovators',
            avatar: 'https://randomuser.me/api/portraits/women/56.jpg',
            location: 'Seattle, WA',
            rating: 4.9,
            reviewCount: 49,
            expertise: ['Business Strategy', 'Product Development', 'Fundraising'],
            industries: ['Healthcare', 'Technology'],
            bio: 'Physician entrepreneur who has founded three successful healthcare startups. Passionate about digital health innovation and improving patient outcomes through technology.',
            hourlyRate: 145,
            availability: ['Mon', 'Wed', 'Fri'],
            featured: true
          },
          {
            id: 8,
            name: 'James Wilson',
            title: 'Sales & Revenue Growth Mentor',
            company: 'Revenue Accelerator',
            avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
            location: 'Denver, CO',
            rating: 4.7,
            reviewCount: 57,
            expertise: ['Sales', 'Marketing', 'Business Strategy'],
            industries: ['Technology', 'Finance', 'E-commerce'],
            bio: 'Sales leader who has built and scaled sales teams at multiple SaaS companies. Expert in sales process optimization, pipeline management, and enterprise sales strategies.',
            hourlyRate: 135,
            availability: ['Tue', 'Thu', 'Sat']
          }
        ];
        
        setMentors(mockMentors);
        setFilteredMentors(mockMentors);
      } catch (error) {
        console.error('Error fetching mentors:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMentors();
  }, []);
  
  // Filter mentors based on search and filters
  useEffect(() => {
    const filtered = mentors.filter(mentor => {
      // Search filter
      const matchesSearch = 
        mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mentor.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mentor.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mentor.bio.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Expertise filter
      const matchesExpertise = 
        selectedExpertise.length === 0 || 
        selectedExpertise.some(exp => mentor.expertise.includes(exp));
      
      // Industry filter
      const matchesIndustry = 
        selectedIndustries.length === 0 || 
        selectedIndustries.some(ind => mentor.industries.includes(ind));
      
      return matchesSearch && matchesExpertise && matchesIndustry;
    });
    
    setFilteredMentors(filtered);
  }, [searchQuery, selectedExpertise, selectedIndustries, mentors]);
  
  // Toggle expertise selection
  const toggleExpertise = (expertise: string) => {
    if (selectedExpertise.includes(expertise)) {
      setSelectedExpertise(selectedExpertise.filter(exp => exp !== expertise));
    } else {
      setSelectedExpertise([...selectedExpertise, expertise]);
    }
  };
  
  // Toggle industry selection
  const toggleIndustry = (industry: string) => {
    if (selectedIndustries.includes(industry)) {
      setSelectedIndustries(selectedIndustries.filter(ind => ind !== industry));
    } else {
      setSelectedIndustries([...selectedIndustries, industry]);
    }
  };
  
  // Toggle favorite status
  const toggleFavorite = (id: number) => {
    setMentors(prevMentors => 
      prevMentors.map(mentor => 
        mentor.id === id 
          ? { ...mentor, favorite: !mentor.favorite } 
          : mentor
      )
    );
  };
  
  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedExpertise([]);
    setSelectedIndustries([]);
  };
  
  return (
    <div className={styles.findMentor}>
      <div className={styles.heroSection}>
        <div className={styles.container}>
          <h1 className={styles.heroTitle}>Find Your Perfect Mentor</h1>
          <p className={styles.heroSubtitle}>
            Connect with experienced entrepreneurs and industry experts who can guide you through your business journey
          </p>
          
          <div className={styles.searchContainer}>
            <div className={styles.searchBar}>
              <FaSearch className={styles.searchIcon} />
              <input 
                type="text" 
                placeholder="Search mentors by name, expertise, or industry..." 
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
              {(selectedExpertise.length > 0 || selectedIndustries.length > 0) && (
                <span className={styles.filterCount}>
                  {selectedExpertise.length + selectedIndustries.length}
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
                <h3 className={styles.filterGroupTitle}>Expertise</h3>
                <div className={styles.filterOptions}>
                  {expertiseOptions.map((expertise) => (
                    <button 
                      key={expertise}
                      className={`${styles.filterTag} ${selectedExpertise.includes(expertise) ? styles.activeTag : ''}`}
                      onClick={() => toggleExpertise(expertise)}
                    >
                      {expertise}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className={styles.filterGroup}>
                <h3 className={styles.filterGroupTitle}>Industry</h3>
                <div className={styles.filterOptions}>
                  {industryOptions.map((industry) => (
                    <button 
                      key={industry}
                      className={`${styles.filterTag} ${selectedIndustries.includes(industry) ? styles.activeTag : ''}`}
                      onClick={() => toggleIndustry(industry)}
                    >
                      {industry}
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
      
      <div className={styles.mentorsSection}>
        <div className={styles.container}>
          {loading ? (
            <div className={styles.loadingState}>
              <div className={styles.spinner}></div>
              <p>Loading mentors...</p>
            </div>
          ) : filteredMentors.length > 0 ? (
            <>
              {/* Featured mentors section */}
              {selectedExpertise.length === 0 && selectedIndustries.length === 0 && searchQuery === '' && (
                <div className={styles.featuredMentors}>
                  <h2 className={styles.sectionTitle}>Featured Mentors</h2>
                  <div className={styles.mentorGrid}>
                    {filteredMentors
                      .filter(mentor => mentor.featured)
                      .map(mentor => (
                        <div key={mentor.id} className={`${styles.mentorCard} ${styles.featuredCard}`}>
                          <div className={styles.featuredBadge}>Featured</div>
                          <div className={styles.mentorHeader}>
                            <img 
                              src={mentor.avatar} 
                              alt={mentor.name} 
                              className={styles.mentorAvatar} 
                            />
                            <button 
                              className={styles.favoriteButton}
                              onClick={() => toggleFavorite(mentor.id)}
                              aria-label={mentor.favorite ? "Remove from favorites" : "Add to favorites"}
                            >
                              {mentor.favorite ? <FaHeart /> : <FaRegHeart />}
                            </button>
                          </div>
                          
                          <div className={styles.mentorInfo}>
                            <h3 className={styles.mentorName}>{mentor.name}</h3>
                            <p className={styles.mentorTitle}>{mentor.title}</p>
                            <p className={styles.mentorCompany}>{mentor.company}</p>
                            
                            <div className={styles.mentorLocation}>
                              <FaMapMarkerAlt className={styles.infoIcon} />
                              <span>{mentor.location}</span>
                            </div>
                            
                            <div className={styles.mentorRating}>
                              <FaStar className={styles.starIcon} />
                              <span>{mentor.rating}</span>
                              <span className={styles.reviewCount}>({mentor.reviewCount} reviews)</span>
                            </div>
                            
                            <div className={styles.mentorExpertise}>
                              {mentor.expertise.map((exp, index) => (
                                <span key={index} className={styles.expertiseTag}>{exp}</span>
                              ))}
                            </div>
                            
                            <p className={styles.mentorBio}>{mentor.bio}</p>
                            
                            <div className={styles.mentorMeta}>
                              <div className={styles.mentorRate}>
                                <FaBriefcase className={styles.infoIcon} />
                                <span>${mentor.hourlyRate}/hour</span>
                              </div>
                              
                              <div className={styles.mentorAvailability}>
                                <FaCalendarAlt className={styles.infoIcon} />
                                <span>Available: {mentor.availability.join(', ')}</span>
                              </div>
                            </div>
                            
                            <div className={styles.mentorActions}>
                              <button className={styles.primaryButton}>Book a Session</button>
                              <button className={styles.secondaryButton}>View Profile</button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
              
              {/* All mentors section */}
              <div className={styles.allMentors}>
                <h2 className={styles.sectionTitle}>
                  {selectedExpertise.length > 0 || selectedIndustries.length > 0 || searchQuery !== '' 
                    ? `Search Results (${filteredMentors.length})` 
                    : 'All Mentors'}
                </h2>
                <div className={styles.mentorGrid}>
                  {filteredMentors.map(mentor => (
                    <div key={mentor.id} className={styles.mentorCard}>
                      <div className={styles.mentorHeader}>
                        <img 
                          src={mentor.avatar} 
                          alt={mentor.name} 
                          className={styles.mentorAvatar} 
                        />
                        <button 
                          className={styles.favoriteButton}
                          onClick={() => toggleFavorite(mentor.id)}
                          aria-label={mentor.favorite ? "Remove from favorites" : "Add to favorites"}
                        >
                          {mentor.favorite ? <FaHeart /> : <FaRegHeart />}
                        </button>
                      </div>
                      
                      <div className={styles.mentorInfo}>
                        <h3 className={styles.mentorName}>{mentor.name}</h3>
                        <p className={styles.mentorTitle}>{mentor.title}</p>
                        <p className={styles.mentorCompany}>{mentor.company}</p>
                        
                        <div className={styles.mentorLocation}>
                          <FaMapMarkerAlt className={styles.infoIcon} />
                          <span>{mentor.location}</span>
                        </div>
                        
                        <div className={styles.mentorRating}>
                          <FaStar className={styles.starIcon} />
                          <span>{mentor.rating}</span>
                          <span className={styles.reviewCount}>({mentor.reviewCount} reviews)</span>
                        </div>
                        
                        <div className={styles.mentorExpertise}>
                          {mentor.expertise.slice(0, 3).map((exp, index) => (
                            <span key={index} className={styles.expertiseTag}>{exp}</span>
                          ))}
                        </div>
                        
                        <div className={styles.mentorMeta}>
                          <div className={styles.mentorRate}>
                            <FaBriefcase className={styles.infoIcon} />
                            <span>${mentor.hourlyRate}/hour</span>
                          </div>
                        </div>
                        
                        <div className={styles.mentorActions}>
                          <button className={styles.primaryButton}>Book a Session</button>
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
              <h2>No mentors found</h2>
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

export default FindMentor;