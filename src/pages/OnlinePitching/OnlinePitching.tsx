// src/pages/OnlinePitching/OnlinePitching.tsx
import { useState, useEffect } from 'react';
import { 
  FaPlay, 
  FaCalendarAlt, 
  FaUsers, 
  FaClock,  
  FaLightbulb, 
  FaStar, 
  FaRegStar, 
  FaPlus
} from 'react-icons/fa';
import styles from './OnlinePitching.module.css';

interface PitchEvent {
  id: number;
  title: string;
  date: string;
  time: string;
  duration: string;
  organizer: string;
  organizerLogo: string;
  attendees: number;
  maxAttendees: number;
  category: string;
  description: string;
  featured?: boolean;
  registrationOpen: boolean;
}

interface PastPitch {
  id: number;
  title: string;
  companyName: string;
  logo: string;
  thumbnail: string;
  presenter: {
    name: string;
    title: string;
    avatar: string;
  };
  duration: string;
  category: string;
  views: number;
  rating: number;
  date: string;
}

const OnlinePitching = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'my-pitches'>('upcoming');
  const [upcomingEvents, setUpcomingEvents] = useState<PitchEvent[]>([]);
  const [pastPitches, setPastPitches] = useState<PastPitch[]>([]);
  const [myPitches, setMyPitches] = useState<PitchEvent[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [showPitchModal, setShowPitchModal] = useState(false);
  
  // Categories for filtering
  const categories = [
    'all',
    'tech',
    'health',
    'finance',
    'education',
    'e-commerce',
    'sustainability',
    'ai',
    'blockchain'
  ];
  
  // Fetch pitch events data
  useEffect(() => {
    // Simulating API call
    const fetchData = async () => {
      setLoading(true);
      
      try {
        // In a real app, this would be an API call
        // For the hackathon, we'll use mock data
        const mockUpcomingEvents: PitchEvent[] = [
          {
            id: 1,
            title: 'TechStars Demo Day',
            date: '2023-11-15',
            time: '10:00 AM PST',
            duration: '3 hours',
            organizer: 'TechStars',
            organizerLogo: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Techstars-logo.png',
            attendees: 156,
            maxAttendees: 200,
            category: 'tech',
            description: 'Join us for the TechStars Demo Day where 10 startups will pitch their innovative solutions to investors and industry experts.',
            featured: true,
            registrationOpen: true
          },
          {
            id: 2,
            title: 'HealthTech Innovation Showcase',
            date: '2023-11-20',
            time: '1:00 PM EST',
            duration: '2 hours',
            organizer: 'Health Innovators Network',
            organizerLogo: 'https://randomuser.me/api/portraits/men/32.jpg',
            attendees: 89,
            maxAttendees: 150,
            category: 'health',
            description: 'A platform for healthcare startups to present their solutions addressing key challenges in the healthcare industry.',
            registrationOpen: true
          },
          {
            id: 3,
            title: 'FinTech Founders Pitch Night',
            date: '2023-11-25',
            time: '5:00 PM GMT',
            duration: '2.5 hours',
            organizer: 'FinTech Alliance',
            organizerLogo: 'https://randomuser.me/api/portraits/women/44.jpg',
            attendees: 120,
            maxAttendees: 150,
            category: 'finance',
            description: 'An evening dedicated to showcasing the most promising fintech startups disrupting the financial services industry.',
            featured: true,
            registrationOpen: true
          },
          {
            id: 4,
            title: 'EdTech Innovators Summit',
            date: '2023-12-05',
            time: '11:00 AM EST',
            duration: '4 hours',
            organizer: 'Education Innovation Consortium',
            organizerLogo: 'https://randomuser.me/api/portraits/men/55.jpg',
            attendees: 75,
            maxAttendees: 200,
            category: 'education',
            description: 'A virtual summit where educational technology startups present solutions transforming the future of learning.',
            registrationOpen: true
          },
          {
            id: 5,
            title: 'Sustainable Startups Showcase',
            date: '2023-12-10',
            time: '2:00 PM CET',
            duration: '3 hours',
            organizer: 'Green Ventures Network',
            organizerLogo: 'https://randomuser.me/api/portraits/women/22.jpg',
            attendees: 95,
            maxAttendees: 150,
            category: 'sustainability',
            description: 'Highlighting startups with innovative solutions addressing environmental challenges and promoting sustainability.',
            registrationOpen: true
          },
          {
            id: 6,
            title: 'AI & ML Startups Pitch Competition',
            date: '2023-12-15',
            time: '4:00 PM PST',
            duration: '3 hours',
            organizer: 'AI Founders Club',
            organizerLogo: 'https://randomuser.me/api/portraits/men/64.jpg',
            attendees: 180,
            maxAttendees: 250,
            category: 'ai',
            description: 'A competition for startups leveraging artificial intelligence and machine learning to solve complex problems.',
            featured: true,
            registrationOpen: true
          }
        ];
        
        const mockPastPitches: PastPitch[] = [
          {
            id: 1,
            title: 'AI-Powered Customer Service Platform',
            companyName: 'ServiceAI',
            logo: 'https://randomuser.me/api/portraits/men/32.jpg',
            thumbnail: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
            presenter: {
              name: 'Michael Chen',
              title: 'CEO & Co-founder',
              avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
            },
            duration: '12:45',
            category: 'ai',
            views: 1245,
            rating: 4.8,
            date: '2023-10-15'
          },
          {
            id: 2,
            title: 'Blockchain Solution for Supply Chain Transparency',
            companyName: 'ChainTrack',
            logo: 'https://randomuser.me/api/portraits/women/44.jpg',
            thumbnail: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
            presenter: {
              name: 'Sarah Johnson',
              title: 'CTO',
              avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
            },
            duration: '15:20',
            category: 'blockchain',
            views: 987,
            rating: 4.6,
            date: '2023-10-10'
          },
          {
            id: 3,
            title: 'Digital Health Platform for Chronic Disease Management',
            companyName: 'HealthTrack',
            logo: 'https://randomuser.me/api/portraits/men/55.jpg',
            thumbnail: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
            presenter: {
              name: 'David Park',
              title: 'Founder',
              avatar: 'https://randomuser.me/api/portraits/men/55.jpg'
            },
            duration: '14:10',
            category: 'health',
            views: 1578,
            rating: 4.9,
            date: '2023-10-05'
          },
          {
            id: 4,
            title: 'Personalized Learning Platform for K-12 Students',
            companyName: 'EduSmart',
            logo: 'https://randomuser.me/api/portraits/women/22.jpg',
            thumbnail: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
            presenter: {
              name: 'Jessica Martinez',
              title: 'CEO',
              avatar: 'https://randomuser.me/api/portraits/women/22.jpg'
            },
            duration: '11:55',
            category: 'education',
            views: 843,
            rating: 4.5,
            date: '2023-09-28'
          },
          {
            id: 5,
            title: 'Sustainable Packaging Solutions for E-commerce',
            companyName: 'GreenPack',
            logo: 'https://randomuser.me/api/portraits/men/64.jpg',
            thumbnail: 'https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
            presenter: {
              name: 'Ryan Taylor',
              title: 'Co-founder',
              avatar: 'https://randomuser.me/api/portraits/men/64.jpg'
            },
            duration: '13:30',
            category: 'sustainability',
            views: 1124,
            rating: 4.7,
            date: '2023-09-20'
          },
          {
            id: 6,
            title: 'Fintech Solution for Small Business Lending',
            companyName: 'LendFast',
            logo: 'https://randomuser.me/api/portraits/women/33.jpg',
            thumbnail: 'https://images.unsplash.com/photo-1534951009808-766178b47a4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
            presenter: {
              name: 'Olivia Wilson',
              title: 'CEO & Founder',
              avatar: 'https://randomuser.me/api/portraits/women/33.jpg'
            },
            duration: '16:05',
            category: 'finance',
            views: 1345,
            rating: 4.8,
            date: '2023-09-15'
          }
        ];
        
        const mockMyPitches: PitchEvent[] = [
          {
            id: 101,
            title: 'ITO: AI-Powered Entrepreneurial Network',
            date: '2023-12-20',
            time: '2:00 PM EST',
            duration: '15 minutes',
            organizer: 'Founder Connect',
            organizerLogo: 'https://randomuser.me/api/portraits/men/32.jpg',
            attendees: 0,
            maxAttendees: 50,
            category: 'tech',
            description: 'Presenting ITO, a platform that leverages AI to connect entrepreneurs with mentors, co-founders, and resources.',
            registrationOpen: true
          }
        ];
        
        setUpcomingEvents(mockUpcomingEvents);
        setPastPitches(mockPastPitches);
        setMyPitches(mockMyPitches);
      } catch (error) {
        console.error('Error fetching pitch data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Filter events based on category
  const filteredUpcomingEvents = selectedCategory === 'all' 
    ? upcomingEvents 
    : upcomingEvents.filter(event => event.category === selectedCategory);
  
  const filteredPastPitches = selectedCategory === 'all' 
    ? pastPitches 
    : pastPitches.filter(pitch => pitch.category === selectedCategory);
  
  const filteredMyPitches = selectedCategory === 'all' 
    ? myPitches 
    : myPitches.filter(pitch => pitch.category === selectedCategory);
  
  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Render star rating
  const renderRating = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className={styles.starIcon} />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStar key={i} className={styles.starHalfIcon} />);
      } else {
        stars.push(<FaRegStar key={i} className={styles.starEmptyIcon} />);
      }
    }
    
    return (
      <div className={styles.ratingStars}>
        {stars}
        <span className={styles.ratingValue}>{rating.toFixed(1)}</span>
      </div>
    );
  };
  
  return (
    <div className={styles.onlinePitching}>
      <div className={styles.heroSection}>
        <div className={styles.container}>
          <h1 className={styles.heroTitle}>Online Pitching Platform</h1>
          <p className={styles.heroSubtitle}>
            Present your startup idea to investors, mentors, and the entrepreneurial community
          </p>
          
          <div className={styles.heroActions}>
            <button 
              className={styles.primaryButton}
              onClick={() => setShowPitchModal(true)}
            >
              <FaPlus className={styles.buttonIcon} /> Schedule Your Pitch
            </button>
            <button className={styles.secondaryButton}>
              <FaPlay className={styles.buttonIcon} /> Watch How It Works
            </button>
          </div>
        </div>
      </div>
      
      <div className={styles.contentSection}>
        <div className={styles.container}>
          <div className={styles.tabsContainer}>
            <div className={styles.tabs}>
              <button 
                className={`${styles.tab} ${activeTab === 'upcoming' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('upcoming')}
              >
                Upcoming Pitch Events
              </button>
              <button 
                className={`${styles.tab} ${activeTab === 'past' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('past')}
              >
                Past Pitches
              </button>
              <button 
                className={`${styles.tab} ${activeTab === 'my-pitches' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('my-pitches')}
              >
                My Pitches
              </button>
            </div>
            
            <div className={styles.categoryFilter}>
              <span className={styles.filterLabel}>Filter by:</span>
              <div className={styles.categoryTags}>
                {categories.map(category => (
                  <button 
                    key={category}
                    className={`${styles.categoryTag} ${selectedCategory === category ? styles.activeTag : ''}`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {loading ? (
            <div className={styles.loadingState}>
              <div className={styles.spinner}></div>
              <p>Loading pitch events...</p>
            </div>
          ) : (
            <div className={styles.tabContent}>
              {/* Upcoming Events Tab */}
              {activeTab === 'upcoming' && (
                <div className={styles.upcomingEvents}>
                  {filteredUpcomingEvents.length > 0 ? (
                    <>
                      {/* Featured events */}
                      {selectedCategory === 'all' && (
                        <div className={styles.featuredEvents}>
                          <h2 className={styles.sectionTitle}>Featured Events</h2>
                          <div className={styles.featuredGrid}>
                            {filteredUpcomingEvents
                              .filter(event => event.featured)
                              .map(event => (
                                <div key={event.id} className={styles.featuredEventCard}>
                                  <div className={styles.featuredBadge}>Featured</div>
                                  <div className={styles.eventHeader}>
                                    <div className={styles.organizerInfo}>
                                      <img 
                                        src={event.organizerLogo} 
                                        alt={event.organizer} 
                                        className={styles.organizerLogo} 
                                      />
                                      <span className={styles.organizerName}>{event.organizer}</span>
                                    </div>
                                    <span className={styles.categoryBadge}>{event.category}</span>
                                  </div>
                                  
                                  <h3 className={styles.eventTitle}>{event.title}</h3>
                                  <p className={styles.eventDescription}>{event.description}</p>
                                  
                                  <div className={styles.eventDetails}>
                                    <div className={styles.eventDetail}>
                                      <FaCalendarAlt className={styles.detailIcon} />
                                      <span>{formatDate(event.date)}</span>
                                    </div>
                                    <div className={styles.eventDetail}>
                                      <FaClock className={styles.detailIcon} />
                                      <span>{event.time} • {event.duration}</span>
                                    </div>
                                    <div className={styles.eventDetail}>
                                      <FaUsers className={styles.detailIcon} />
                                      <span>{event.attendees} / {event.maxAttendees} attendees</span>
                                    </div>
                                  </div>
                                  
                                  <div className={styles.eventProgress}>
                                    <div 
                                      className={styles.progressBar} 
                                      style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                                    ></div>
                                  </div>
                                  
                                  <div className={styles.eventActions}>
                                    <button 
                                      className={styles.primaryButton}
                                      disabled={!event.registrationOpen}
                                    >
                                      {event.registrationOpen ? 'Register Now' : 'Registration Closed'}
                                    </button>
                                    <button className={styles.secondaryButton}>
                                      Learn More
                                    </button>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      )}
                      
                      {/* All upcoming events */}
                      <div className={styles.allEvents}>
                        <h2 className={styles.sectionTitle}>
                          {selectedCategory === 'all' ? 'All Upcoming Events' : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Events`}
                        </h2>
                        <div className={styles.eventGrid}>
                          {filteredUpcomingEvents.map(event => (
                            <div key={event.id} className={styles.eventCard}>
                              <div className={styles.eventHeader}>
                                <div className={styles.organizerInfo}>
                                  <img 
                                    src={event.organizerLogo} 
                                    alt={event.organizer} 
                                    className={styles.organizerLogo} 
                                  />
                                  <span className={styles.organizerName}>{event.organizer}</span>
                                </div>
                                <span className={styles.categoryBadge}>{event.category}</span>
                              </div>
                              
                              <h3 className={styles.eventTitle}>{event.title}</h3>
                              
                              <div className={styles.eventDetails}>
                                <div className={styles.eventDetail}>
                                  <FaCalendarAlt className={styles.detailIcon} />
                                  <span>{formatDate(event.date)}</span>
                                </div>
                                <div className={styles.eventDetail}>
                                  <FaClock className={styles.detailIcon} />
                                  <span>{event.time}</span>
                                </div>
                                <div className={styles.eventDetail}>
                                  <FaUsers className={styles.detailIcon} />
                                  <span>{event.attendees} attendees</span>
                                </div>
                              </div>
                              
                              <div className={styles.eventActions}>
                                <button 
                                  className={styles.primaryButton}
                                  disabled={!event.registrationOpen}
                                >
                                  {event.registrationOpen ? 'Register' : 'Full'}
                                </button>
                                <button className={styles.secondaryButton}>
                                  Details
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className={styles.emptyState}>
                      <h2>No upcoming events found</h2>
                      <p>Check back later or adjust your category filter</p>
                      {selectedCategory !== 'all' && (
                        <button 
                          className={styles.resetButton}
                          onClick={() => setSelectedCategory('all')}
                        >
                          View All Events
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}
              
              {/* Past Pitches Tab */}
              {activeTab === 'past' && (
                <div className={styles.pastPitches}>
                  {filteredPastPitches.length > 0 ? (
                    <div className={styles.pitchGrid}>
                      {filteredPastPitches.map(pitch => (
                        <div key={pitch.id} className={styles.pitchCard}>
                          <div className={styles.pitchThumbnail}>
                            <img 
                              src={pitch.thumbnail} 
                              alt={pitch.title} 
                              className={styles.thumbnailImage} 
                            />
                            <div className={styles.playOverlay}>
                              <FaPlay className={styles.playIcon} />
                              <span className={styles.duration}>{pitch.duration}</span>
                            </div>
                          </div>
                          
                          <div className={styles.pitchContent}>
                            <div className={styles.companyInfo}>
                              <img 
                                src={pitch.logo} 
                                alt={pitch.companyName} 
                                className={styles.companyLogo} 
                              />
                              <span className={styles.companyName}>{pitch.companyName}</span>
                              <span className={styles.categoryBadge}>{pitch.category}</span>
                            </div>
                            
                            <h3 className={styles.pitchTitle}>{pitch.title}</h3>
                            
                            <div className={styles.presenterInfo}>
                              <img 
                                src={pitch.presenter.avatar} 
                                alt={pitch.presenter.name} 
                                className={styles.presenterAvatar} 
                              />
                              <div className={styles.presenterDetails}>
                                <span className={styles.presenterName}>{pitch.presenter.name}</span>
                                <span className={styles.presenterTitle}>{pitch.presenter.title}</span>
                              </div>
                            </div>
                            
                            <div className={styles.pitchStats}>
                              <div className={styles.statItem}>
                                <span className={styles.statValue}>{pitch.views.toLocaleString()}</span>
                                <span className={styles.statLabel}>views</span>
                              </div>
                              <div className={styles.statItem}>
                                {renderRating(pitch.rating)}
                              </div>
                              <div className={styles.statItem}>
                                <span className={styles.statDate}>{formatDate(pitch.date)}</span>
                              </div>
                            </div>
                            
                            <button className={styles.watchButton}>
                              <FaPlay className={styles.buttonIcon} /> Watch Pitch
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className={styles.emptyState}>
                      <h2>No past pitches found</h2>
                      <p>Check back later or adjust your category filter</p>
                      {selectedCategory !== 'all' && (
                        <button 
                          className={styles.resetButton}
                          onClick={() => setSelectedCategory('all')}
                        >
                          View All Pitches
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}
              
              {/* My Pitches Tab */}
              {activeTab === 'my-pitches' && (
                <div className={styles.myPitches}>
                  <div className={styles.myPitchesHeader}>
                    <h2 className={styles.sectionTitle}>My Scheduled Pitches</h2>
                    <button 
                      className={`${styles.primaryButton} ${styles.schedulePitchButton}`}
                      onClick={() => setShowPitchModal(true)}
                    >
                      <FaPlus className={styles.buttonIcon} /> Schedule New Pitch
                    </button>
                  </div>
                  
                  {filteredMyPitches.length > 0 ? (
                    <div className={styles.myPitchesGrid}>
                      {filteredMyPitches.map(pitch => (
                        <div key={pitch.id} className={styles.myPitchCard}>
                          <div className={styles.pitchHeader}>
                            <span className={styles.categoryBadge}>{pitch.category}</span>
                            <div className={styles.pitchDate}>
                              <FaCalendarAlt className={styles.detailIcon} />
                              <span>{formatDate(pitch.date)} • {pitch.time}</span>
                            </div>
                          </div>
                          
                          <h3 className={styles.pitchTitle}>{pitch.title}</h3>
                          <p className={styles.pitchDescription}>{pitch.description}</p>
                          
                          <div className={styles.pitchDetails}>
                            <div className={styles.detailItem}>
                              <span className={styles.detailLabel}>Duration:</span>
                              <span className={styles.detailValue}>{pitch.duration}</span>
                            </div>
                            <div className={styles.detailItem}>
                              <span className={styles.detailLabel}>Organizer:</span>
                              <span className={styles.detailValue}>{pitch.organizer}</span>
                            </div>
                            <div className={styles.detailItem}>
                              <span className={styles.detailLabel}>Attendees:</span>
                              <span className={styles.detailValue}>{pitch.attendees} registered</span>
                            </div>
                          </div>
                          
                          <div className={styles.pitchActions}>
                            <button className={styles.primaryButton}>
                              Prepare Pitch
                            </button>
                            <button className={styles.secondaryButton}>
                              Edit Details
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className={styles.emptyPitchState}>
                      <div className={styles.emptyStateIcon}>
                        <FaLightbulb />
                      </div>
                      <h3>You haven't scheduled any pitches yet</h3>
                      <p>Schedule your first pitch to showcase your startup idea to investors and mentors</p>
                      <button 
                        className={styles.primaryButton}
                        onClick={() => setShowPitchModal(true)}
                      >
                        <FaPlus className={styles.buttonIcon} /> Schedule Your First Pitch
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Schedule Pitch Modal */}
      {showPitchModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2>Schedule Your Pitch</h2>
              <button 
                className={styles.closeButton}
                onClick={() => setShowPitchModal(false)}
              >
                ×
              </button>
            </div>
            
            <div className={styles.modalBody}>
              <form className={styles.pitchForm}>
                <div className={styles.formGroup}>
                  <label htmlFor="pitchTitle">Pitch Title</label>
                  <input 
                    type="text" 
                    id="pitchTitle" 
                    placeholder="Enter a catchy title for your pitch"
                    required
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="pitchDescription">Pitch Description</label>
                  <textarea 
                    id="pitchDescription" 
                    placeholder="Briefly describe your startup and what you'll be pitching"
                    rows={4}
                    required
                  ></textarea>
                </div>
                
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="pitchCategory">Category</label>
                    <select id="pitchCategory" required>
                      <option value="">Select a category</option>
                      {categories.filter(cat => cat !== 'all').map(category => (
                        <option key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="pitchDuration">Duration</label>
                    <select id="pitchDuration" required>
                      <option value="">Select duration</option>
                      <option value="5">5 minutes</option>
                      <option value="10">10 minutes</option>
                      <option value="15">15 minutes</option>
                      <option value="20">20 minutes</option>
                    </select>
                  </div>
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="pitchDate">Date & Time</label>
                  <div className={styles.dateTimeInputs}>
                    <input 
                      type="date" 
                      id="pitchDate"
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                    <input 
                      type="time" 
                      id="pitchTime"
                      required
                    />
                  </div>
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="pitchEvent">Event (Optional)</label>
                  <select id="pitchEvent">
                    <option value="">Select an event or leave blank for independent pitch</option>
                    {upcomingEvents.map(event => (
                      <option key={event.id} value={event.id}>
                        {event.title} - {formatDate(event.date)}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className={styles.formGroup}>
                  <label>Pitch Materials</label>
                  <div className={styles.fileUploadContainer}>
                    <div className={styles.fileUpload}>
                      <span>Upload Pitch Deck (PDF)</span>
                      <input type="file" accept=".pdf" />
                    </div>
                    <div className={styles.fileUpload}>
                      <span>Upload Company Logo</span>
                      <input type="file" accept="image/*" />
                    </div>
                  </div>
                </div>
                
                <div className={styles.formGroup}>
                  <label>Visibility Settings</label>
                  <div className={styles.radioGroup}>
                    <div className={styles.radioOption}>
                      <input 
                        type="radio" 
                        id="visibilityPublic" 
                        name="visibility" 
                        value="public"
                        defaultChecked
                      />
                      <label htmlFor="visibilityPublic">
                        <strong>Public</strong> - Anyone can attend your pitch
                      </label>
                    </div>
                    <div className={styles.radioOption}>
                      <input 
                        type="radio" 
                        id="visibilityPrivate" 
                        name="visibility" 
                        value="private"
                      />
                      <label htmlFor="visibilityPrivate">
                        <strong>Private</strong> - Only invited attendees can join
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className={styles.modalActions}>
                  <button 
                    type="button" 
                    className={styles.secondaryButton}
                    onClick={() => setShowPitchModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className={styles.primaryButton}>
                    Schedule Pitch
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OnlinePitching;