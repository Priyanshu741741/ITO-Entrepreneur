// src/pages/StartupIdeas/StartupIdeas.tsx
import { useState, useEffect } from 'react';
import { 
  FaSearch, 
  FaFilter, 
  FaLightbulb, 
  FaChartLine, 
  FaMoneyBillWave, 
  FaUserFriends, 
  FaRegClock, 
  FaBookmark, 
  FaRegBookmark, 
  FaArrowRight, 
  FaThumbsUp 
} from 'react-icons/fa';
import styles from './StartupIdeas.module.css';

interface StartupIdea {
  id: number;
  title: string;
  description: string;
  industry: string[];
  investmentLevel: 'Low' | 'Medium' | 'High';
  timeToMarket: 'Short' | 'Medium' | 'Long';
  teamSize: 'Solo' | 'Small' | 'Medium' | 'Large';
  potentialRevenue: 'Low' | 'Medium' | 'High';
  trendScore: number;
  upvotes: number;
  savedByUser?: boolean;
  upvotedByUser?: boolean;
  resources?: {
    title: string;
    url: string;
  }[];
  featured?: boolean;
}

interface IndustryTag {
  id: string;
  name: string;
  color: string;
}

const StartupIdeas = () => {
  const [ideas, setIdeas] = useState<StartupIdea[]>([]);
  const [filteredIdeas, setFilteredIdeas] = useState<StartupIdea[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedInvestment, setSelectedInvestment] = useState<string>('');
  const [selectedTimeToMarket, setSelectedTimeToMarket] = useState<string>('');
  const [selectedTeamSize, setSelectedTeamSize] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('trendScore');
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Industry tags with colors
  const industryTags: IndustryTag[] = [
    { id: 'tech', name: 'Technology', color: '#3498db' },
    { id: 'health', name: 'Healthcare', color: '#2ecc71' },
    { id: 'finance', name: 'Finance', color: '#f39c12' },
    { id: 'education', name: 'Education', color: '#9b59b6' },
    { id: 'ecommerce', name: 'E-commerce', color: '#e74c3c' },
    { id: 'sustainability', name: 'Sustainability', color: '#1abc9c' },
    { id: 'food', name: 'Food & Beverage', color: '#e67e22' },
    { id: 'travel', name: 'Travel', color: '#34495e' },
    { id: 'real-estate', name: 'Real Estate', color: '#7f8c8d' },
    { id: 'entertainment', name: 'Entertainment', color: '#8e44ad' },
    { id: 'social', name: 'Social', color: '#3498db' },
    { id: 'ai', name: 'AI', color: '#2c3e50' },
    { id: 'blockchain', name: 'Blockchain', color: '#2980b9' }
  ];
  
  // Investment levels
  const investmentLevels = ['Low', 'Medium', 'High'];
  
  // Time to market options
  const timeToMarketOptions = ['Short', 'Medium', 'Long'];
  
  // Team size options
  const teamSizeOptions = ['Solo', 'Small', 'Medium', 'Large'];
  
  // Sort options
  const sortOptions = [
    { value: 'trendScore', label: 'Trending' },
    { value: 'upvotes', label: 'Most Upvoted' },
    { value: 'newest', label: 'Newest' }
  ];
  
  // Fetch startup ideas data
  useEffect(() => {
    // Simulating API call
    const fetchIdeas = async () => {
      setLoading(true);
      
      try {
        // In a real app, this would be an API call
        // For the hackathon, we'll use mock data
        const mockIdeas: StartupIdea[] = [
          {
            id: 1,
            title: "AI-Powered Personal Shopping Assistant",
            description: "Develop an AI-driven platform that learns users' fashion preferences and provides personalized recommendations across multiple online retailers. The assistant would help users discover items that match their style, budget, and size, while also alerting them to sales and discounts.",
            industry: ['tech', 'ecommerce', 'ai'],
            investmentLevel: 'Medium',
            timeToMarket: 'Medium',
            teamSize: 'Small',
            potentialRevenue: 'High',
            trendScore: 92,
            upvotes: 245,
            resources: [
              { title: "AI in Retail: Market Analysis", url: "#" },
              { title: "Building Recommendation Engines", url: "#" }
            ],
            featured: true
          },
          {
            id: 2,
            title: "Sustainable Packaging Marketplace",
            description: "Create a B2B marketplace connecting businesses with sustainable packaging suppliers. The platform would help companies find eco-friendly alternatives to traditional packaging, calculate environmental impact savings, and streamline the procurement process.",
            industry: ['sustainability', 'ecommerce'],
            investmentLevel: 'Medium',
            timeToMarket: 'Short',
            teamSize: 'Small',
            potentialRevenue: 'Medium',
            trendScore: 87,
            upvotes: 189,
            resources: [
              { title: "Sustainable Packaging Market Report", url: "#" },
              { title: "B2B Marketplace Business Models", url: "#" }
            ]
          },
          {
            id: 3,
            title: "Mental Health Platform for Remote Workers",
            description: "Build a comprehensive mental wellness platform designed specifically for remote and distributed teams. Features would include on-demand therapy sessions, guided meditation, team-building activities, and analytics for employers to measure and improve team wellbeing.",
            industry: ['health', 'tech'],
            investmentLevel: 'Medium',
            timeToMarket: 'Medium',
            teamSize: 'Medium',
            potentialRevenue: 'High',
            trendScore: 95,
            upvotes: 278,
            resources: [
              { title: "Remote Work Mental Health Statistics", url: "#" },
              { title: "Digital Therapeutics Market Analysis", url: "#" }
            ],
            featured: true
          },
          {
            id: 4,
            title: "Fractional Real Estate Investment App",
            description: "Develop a mobile application that allows individuals to invest in fractional shares of commercial and residential properties. The platform would democratize real estate investing by lowering the barrier to entry and providing diversification options.",
            industry: ['finance', 'real-estate', 'tech'],
            investmentLevel: 'High',
            timeToMarket: 'Long',
            teamSize: 'Medium',
            potentialRevenue: 'High',
            trendScore: 89,
            upvotes: 203,
            resources: [
              { title: "Fractional Ownership Legal Framework", url: "#" },
              { title: "Real Estate Investment Platforms Comparison", url: "#" }
            ]
          },
          {
            id: 5,
            title: "Personalized Microlearning Platform",
            description: "Create an adaptive learning platform that delivers bite-sized, personalized educational content based on individual learning styles, goals, and schedules. The platform would use AI to optimize learning paths and improve knowledge retention.",
            industry: ['education', 'tech', 'ai'],
            investmentLevel: 'Medium',
            timeToMarket: 'Medium',
            teamSize: 'Small',
            potentialRevenue: 'Medium',
            trendScore: 85,
            upvotes: 176,
            resources: [
              { title: "Microlearning Effectiveness Research", url: "#" },
              { title: "EdTech Market Growth Analysis", url: "#" }
            ]
          },
          {
            id: 6,
            title: "Food Waste Reduction Marketplace",
            description: "Build a platform connecting restaurants and grocery stores with consumers to sell surplus food at discounted prices before it goes to waste. The app would include real-time inventory updates, delivery options, and impact metrics.",
            industry: ['food', 'sustainability', 'tech'],
            investmentLevel: 'Low',
            timeToMarket: 'Short',
            teamSize: 'Small',
            potentialRevenue: 'Medium',
            trendScore: 91,
            upvotes: 234,
            resources: [
              { title: "Food Waste Statistics by Region", url: "#" },
              { title: "Similar Business Models Case Study", url: "#" }
            ],
            featured: true
          },
          {
            id: 7,
            title: "Virtual Travel Experiences Marketplace",
            description: "Create a platform where local guides from around the world can offer live, interactive virtual tours and experiences. The service would cater to people who want to explore destinations remotely, learn about different cultures, or plan future trips.",
            industry: ['travel', 'entertainment', 'tech'],
            investmentLevel: 'Low',
            timeToMarket: 'Short',
            teamSize: 'Solo',
            potentialRevenue: 'Medium',
            trendScore: 82,
            upvotes: 154,
            resources: [
              { title: "Virtual Tourism Market Size", url: "#" },
              { title: "Monetization Strategies for Experience Platforms", url: "#" }
            ]
          },
          {
            id: 8,
            title: "Smart Home Energy Management System",
            description: "Develop an integrated system that optimizes home energy usage through AI-powered analytics, smart device control, and renewable energy integration. The solution would help homeowners reduce their carbon footprint and save on utility bills.",
            industry: ['tech', 'sustainability', 'ai'],
            investmentLevel: 'High',
            timeToMarket: 'Long',
            teamSize: 'Medium',
            potentialRevenue: 'High',
            trendScore: 88,
            upvotes: 198,
            resources: [
              { title: "Smart Home Energy Market Forecast", url: "#" },
              { title: "Energy Management Technologies Overview", url: "#" }
            ]
          },
          {
            id: 9,
            title: "Peer-to-Peer Skills Trading Platform",
            description: "Build a marketplace where people can exchange skills and services without monetary payment. Users would earn and spend credits by teaching or learning skills, creating a community-based knowledge sharing economy.",
            industry: ['social', 'education'],
            investmentLevel: 'Low',
            timeToMarket: 'Short',
            teamSize: 'Small',
            potentialRevenue: 'Low',
            trendScore: 79,
            upvotes: 143,
            resources: [
              { title: "Sharing Economy Trends", url: "#" },
              { title: "Community Marketplace Business Models", url: "#" }
            ]
          },
          {
            id: 10,
            title: "Blockchain-Based Supply Chain Verification",
            description: "Create a platform that uses blockchain technology to verify product authenticity and track supply chain ethics. The solution would help brands prove their sustainability claims and give consumers transparency about product origins.",
            industry: ['blockchain', 'tech', 'sustainability'],
            investmentLevel: 'High',
            timeToMarket: 'Long',
            teamSize: 'Medium',
            potentialRevenue: 'High',
            trendScore: 86,
            upvotes: 167,
            resources: [
              { title: "Blockchain in Supply Chain Report", url: "#" },
              { title: "Product Verification Technologies Comparison", url: "#" }
            ]
          },
          {
            id: 11,
            title: "On-Demand Elder Care Services",
            description: "Develop a platform connecting seniors with vetted caregivers for on-demand assistance with daily tasks, companionship, transportation, and technology help. The service would focus on maintaining independence and quality of life for aging populations.",
            industry: ['health', 'social'],
            investmentLevel: 'Medium',
            timeToMarket: 'Medium',
            teamSize: 'Medium',
            potentialRevenue: 'High',
            trendScore: 90,
            upvotes: 212,
            resources: [
              { title: "Aging Population Demographics", url: "#" },
              { title: "Elder Care Market Analysis", url: "#" }
            ],
            featured: true
          },
          {
            id: 12,
            title: "AI-Enhanced Language Learning Platform",
            description: "Create an immersive language learning platform that uses AI to generate personalized conversation practice, real-time pronunciation feedback, and adaptive learning paths. The platform would focus on practical fluency rather than rote memorization.",
            industry: ['education', 'ai', 'tech'],
            investmentLevel: 'Medium',
            timeToMarket: 'Medium',
            teamSize: 'Small',
            potentialRevenue: 'High',
            trendScore: 84,
            upvotes: 178,
            resources: [
              { title: "Language Learning Market Size", url: "#" },
              { title: "AI in Education Technology Report", url: "#" }
            ]
          }
        ];
        
        setIdeas(mockIdeas);
        setFilteredIdeas(mockIdeas);
      } catch (error) {
        console.error('Error fetching startup ideas:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchIdeas();
  }, []);
  
  // Filter ideas based on search and filters
  useEffect(() => {
    const filtered = ideas.filter(idea => {
      // Search filter
      const matchesSearch = 
        searchQuery === '' || 
        idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        idea.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Industry filter
      const matchesIndustry = 
        selectedIndustries.length === 0 || 
        selectedIndustries.some(ind => idea.industry.includes(ind));
      
      // Investment level filter
      const matchesInvestment = 
        selectedInvestment === '' || 
        idea.investmentLevel === selectedInvestment;
      
      // Time to market filter
      const matchesTimeToMarket = 
        selectedTimeToMarket === '' || 
        idea.timeToMarket === selectedTimeToMarket;
      
      // Team size filter
      const matchesTeamSize = 
        selectedTeamSize === '' || 
        idea.teamSize === selectedTeamSize;
      
      return matchesSearch && matchesIndustry && matchesInvestment && 
             matchesTimeToMarket && matchesTeamSize;
    });
    
    // Sort filtered ideas
    const sortedIdeas = [...filtered].sort((a, b) => {
      if (sortBy === 'trendScore') {
        return b.trendScore - a.trendScore;
      } else if (sortBy === 'upvotes') {
        return b.upvotes - a.upvotes;
      } else if (sortBy === 'newest') {
        // In a real app, we'd sort by date
        // For mock data, just use the id as a proxy for recency
        return b.id - a.id;
      }
      return 0;
    });
    
    setFilteredIdeas(sortedIdeas);
  }, [
    searchQuery, 
    selectedIndustries, 
    selectedInvestment, 
    selectedTimeToMarket, 
    selectedTeamSize,
    sortBy,
    ideas
  ]);
  
  // Toggle industry selection
  const toggleIndustry = (industry: string) => {
    if (selectedIndustries.includes(industry)) {
      setSelectedIndustries(selectedIndustries.filter(ind => ind !== industry));
    } else {
      setSelectedIndustries([...selectedIndustries, industry]);
    }
  };
  
  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedIndustries([]);
    setSelectedInvestment('');
    setSelectedTimeToMarket('');
    setSelectedTeamSize('');
  };
  
  // Toggle save idea
  const toggleSaveIdea = (id: number) => {
    setIdeas(prevIdeas => 
      prevIdeas.map(idea => 
        idea.id === id 
          ? { ...idea, savedByUser: !idea.savedByUser } 
          : idea
      )
    );
  };
  
  // Toggle upvote idea
  const toggleUpvoteIdea = (id: number) => {
    setIdeas(prevIdeas => 
      prevIdeas.map(idea => {
        if (idea.id === id) {
          const upvoteChange = idea.upvotedByUser ? -1 : 1;
          return { 
            ...idea, 
            upvotedByUser: !idea.upvotedByUser,
            upvotes: idea.upvotes + upvoteChange
          };
        }
        return idea;
      })
    );
  };
  
  // Get industry tag color
  const getIndustryColor = (industryId: string) => {
    const tag = industryTags.find(tag => tag.id === industryId);
    return tag ? tag.color : '#cccccc';
  };
  
  // Get industry name from id
  const getIndustryName = (industryId: string) => {
    const tag = industryTags.find(tag => tag.id === industryId);
    return tag ? tag.name : industryId;
  };
  
  return (
    <div className={styles.startupIdeas}>
      <div className={styles.heroSection}>
        <div className={styles.container}>
          <h1 className={styles.heroTitle}>Startup Ideas</h1>
          <p className={styles.heroSubtitle}>
            Explore curated business ideas across various industries to inspire your entrepreneurial journey
          </p>
          
          <div className={styles.searchContainer}>
            <div className={styles.searchBar}>
              <FaSearch className={styles.searchIcon} />
              <input 
                type="text" 
                placeholder="Search for startup ideas..." 
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
              {(selectedIndustries.length > 0 || 
                selectedInvestment !== '' || 
                selectedTimeToMarket !== '' || 
                selectedTeamSize !== '') && (
                <span className={styles.filterCount}>
                  {selectedIndustries.length + 
                   (selectedInvestment !== '' ? 1 : 0) + 
                   (selectedTimeToMarket !== '' ? 1 : 0) + 
                   (selectedTeamSize !== '' ? 1 : 0)}
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
                <h3 className={styles.filterGroupTitle}>Industries</h3>
                <div className={styles.filterOptions}>
                  {industryTags.map((tag) => (
                    <button 
                      key={tag.id}
                      className={`${styles.filterTag} ${selectedIndustries.includes(tag.id) ? styles.activeTag : ''}`}
                      onClick={() => toggleIndustry(tag.id)}
                      style={{ 
                        backgroundColor: selectedIndustries.includes(tag.id) ? tag.color : 'transparent',
                        borderColor: tag.color,
                        color: selectedIndustries.includes(tag.id) ? 'white' : tag.color
                      }}
                    >
                      {tag.name}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className={styles.filterRow}>
                <div className={styles.filterGroup}>
                  <h3 className={styles.filterGroupTitle}>Investment Level</h3>
                  <div className={styles.filterOptions}>
                    {investmentLevels.map((level) => (
                      <button 
                        key={level}
                        className={`${styles.filterTag} ${selectedInvestment === level ? styles.activeTag : ''}`}
                        onClick={() => setSelectedInvestment(selectedInvestment === level ? '' : level)}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className={styles.filterGroup}>
                  <h3 className={styles.filterGroupTitle}>Time to Market</h3>
                  <div className={styles.filterOptions}>
                    {timeToMarketOptions.map((time) => (
                      <button 
                        key={time}
                        className={`${styles.filterTag} ${selectedTimeToMarket === time ? styles.activeTag : ''}`}
                        onClick={() => setSelectedTimeToMarket(selectedTimeToMarket === time ? '' : time)}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className={styles.filterGroup}>
                  <h3 className={styles.filterGroupTitle}>Team Size</h3>
                  <div className={styles.filterOptions}>
                    {teamSizeOptions.map((size) => (
                      <button 
                        key={size}
                        className={`${styles.filterTag} ${selectedTeamSize === size ? styles.activeTag : ''}`}
                        onClick={() => setSelectedTeamSize(selectedTeamSize === size ? '' : size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className={styles.filterActions}>
                <button 
                  className={styles.resetButton}
                  onClick={resetFilters}
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className={styles.ideasSection}>
        <div className={styles.container}>
          <div className={styles.ideasHeader}>
            <div className={styles.resultsInfo}>
              {filteredIdeas.length} {filteredIdeas.length === 1 ? 'idea' : 'ideas'} found
            </div>
            <div className={styles.sortOptions}>
              <span className={styles.sortLabel}>Sort by:</span>
              <div className={styles.sortButtons}>
                {sortOptions.map(option => (
                  <button 
                    key={option.value}
                    className={`${styles.sortButton} ${sortBy === option.value ? styles.activeSort : ''}`}
                    onClick={() => setSortBy(option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {loading ? (
            <div className={styles.loadingState}>
              <div className={styles.spinner}></div>
              <p>Loading startup ideas...</p>
            </div>
          ) : filteredIdeas.length > 0 ? (
            <>
              {/* Featured ideas section */}
              {selectedIndustries.length === 0 && 
               selectedInvestment === '' && 
               selectedTimeToMarket === '' && 
               selectedTeamSize === '' && 
               searchQuery === '' && (
                <div className={styles.featuredIdeas}>
                  <h2 className={styles.sectionTitle}>Featured Ideas</h2>
                  <div className={styles.featuredGrid}>
                    {filteredIdeas
                      .filter(idea => idea.featured)
                      .map(idea => (
                        <div key={idea.id} className={`${styles.ideaCard} ${styles.featuredCard}`}>
                          <div className={styles.featuredBadge}>Featured</div>
                          <div className={styles.ideaHeader}>
                            <div className={styles.trendScore}>
                              <FaChartLine className={styles.trendIcon} />
                              <span>Trend Score: {idea.trendScore}</span>
                            </div>
                            <button 
                              className={styles.saveButton}
                              onClick={() => toggleSaveIdea(idea.id)}
                              aria-label={idea.savedByUser ? "Unsave idea" : "Save idea"}
                            >
                              {idea.savedByUser ? <FaBookmark /> : <FaRegBookmark />}
                            </button>
                          </div>
                          
                          <h3 className={styles.ideaTitle}>{idea.title}</h3>
                          <p className={styles.ideaDescription}>{idea.description}</p>
                          
                          <div className={styles.ideaTags}>
                            {idea.industry.map(ind => (
                              <span 
                                key={ind} 
                                className={styles.industryTag}
                                style={{ backgroundColor: getIndustryColor(ind) }}
                              >
                                {getIndustryName(ind)}
                              </span>
                            ))}
                          </div>
                          
                          <div className={styles.ideaDetails}>
                            <div className={styles.detailItem}>
                              <FaMoneyBillWave className={styles.detailIcon} />
                              <div className={styles.detailContent}>
                                <span className={styles.detailLabel}>Investment:</span>
                                <span className={styles.detailValue}>{idea.investmentLevel}</span>
                              </div>
                            </div>
                            <div className={styles.detailItem}>
                              <FaRegClock className={styles.detailIcon} />
                              <div className={styles.detailContent}>
                                <span className={styles.detailLabel}>Time to Market:</span>
                                <span className={styles.detailValue}>{idea.timeToMarket}</span>
                              </div>
                            </div>
                            <div className={styles.detailItem}>
                              <FaUserFriends className={styles.detailIcon} />
                              <div className={styles.detailContent}>
                                <span className={styles.detailLabel}>Team Size:</span>
                                <span className={styles.detailValue}>{idea.teamSize}</span>
                              </div>
                            </div>
                            <div className={styles.detailItem}>
                              <FaChartLine className={styles.detailIcon} />
                              <div className={styles.detailContent}>
                                <span className={styles.detailLabel}>Potential Revenue:</span>
                                <span className={styles.detailValue}>{idea.potentialRevenue}</span>
                              </div>
                            </div>
                          </div>
                          
                          {idea.resources && (
                            <div className={styles.ideaResources}>
                              <h4 className={styles.resourcesTitle}>Helpful Resources:</h4>
                              <ul className={styles.resourcesList}>
                                {idea.resources.map((resource, index) => (
                                  <li key={index} className={styles.resourceItem}>
                                    <a href={resource.url} className={styles.resourceLink}>
                                      {resource.title} <FaArrowRight className={styles.linkIcon} />
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          <div className={styles.ideaFooter}>
                            <button 
                              className={`${styles.upvoteButton} ${idea.upvotedByUser ? styles.upvoted : ''}`}
                              onClick={() => toggleUpvoteIdea(idea.id)}
                            >
                              <FaThumbsUp className={styles.upvoteIcon} />
                              <span>{idea.upvotes}</span>
                            </button>
                            <button className={styles.exploreButton}>
                              Explore This Idea
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
              
              {/* All ideas section */}
              <div className={styles.allIdeas}>
                <h2 className={styles.sectionTitle}>
                  {(selectedIndustries.length > 0 || 
                    selectedInvestment !== '' || 
                    selectedTimeToMarket !== '' || 
                    selectedTeamSize !== '' || 
                    searchQuery !== '') 
                    ? 'Search Results' 
                    : 'All Ideas'}
                </h2>
                <div className={styles.ideasGrid}>
                  {filteredIdeas.map(idea => (
                    <div key={idea.id} className={styles.ideaCard}>
                      <div className={styles.ideaHeader}>
                        <div className={styles.trendScore}>
                          <FaChartLine className={styles.trendIcon} />
                          <span>Trend Score: {idea.trendScore}</span>
                        </div>
                        <button 
                          className={styles.saveButton}
                          onClick={() => toggleSaveIdea(idea.id)}
                          aria-label={idea.savedByUser ? "Unsave idea" : "Save idea"}
                        >
                          {idea.savedByUser ? <FaBookmark /> : <FaRegBookmark />}
                        </button>
                      </div>
                      
                      <h3 className={styles.ideaTitle}>{idea.title}</h3>
                      <p className={styles.ideaDescription}>{idea.description}</p>
                      
                      <div className={styles.ideaTags}>
                        {idea.industry.map(ind => (
                          <span 
                            key={ind} 
                            className={styles.industryTag}
                            style={{ backgroundColor: getIndustryColor(ind) }}
                          >
                            {getIndustryName(ind)}
                          </span>
                        ))}
                      </div>
                      
                      <div className={styles.ideaDetailsSummary}>
                        <div className={styles.summaryItem}>
                          <span className={styles.summaryLabel}>Investment:</span>
                          <span className={styles.summaryValue}>{idea.investmentLevel}</span>
                        </div>
                        <div className={styles.summaryItem}>
                          <span className={styles.summaryLabel}>Time:</span>
                          <span className={styles.summaryValue}>{idea.timeToMarket}</span>
                        </div>
                        <div className={styles.summaryItem}>
                          <span className={styles.summaryLabel}>Team:</span>
                          <span className={styles.summaryValue}>{idea.teamSize}</span>
                        </div>
                      </div>
                      
                      <div className={styles.ideaFooter}>
                      // src/pages/StartupIdeas/StartupIdeas.tsx (continued)
                        <button 
                          className={`${styles.upvoteButton} ${idea.upvotedByUser ? styles.upvoted : ''}`}
                          onClick={() => toggleUpvoteIdea(idea.id)}
                        >
                          <FaThumbsUp className={styles.upvoteIcon} />
                          <span>{idea.upvotes}</span>
                        </button>
                        <button className={styles.exploreButton}>
                          Explore This Idea
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className={styles.emptyState}>
              <div className={styles.emptyStateIcon}>
                <FaLightbulb />
              </div>
              <h2>No startup ideas found</h2>
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

export default StartupIdeas;