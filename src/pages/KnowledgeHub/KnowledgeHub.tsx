// src/pages/KnowledgeHub/KnowledgeHub.tsx
import { useState } from 'react';
import { FaSearch, FaBook, FaFileAlt, FaVideo, FaPlayCircle, FaStar, FaDownload, FaBookmark } from 'react-icons/fa';
import styles from './KnowledgeHub.module.css';

interface Resource {
  id: number;
  title: string;
  type: 'article' | 'template' | 'video' | 'guide';
  description: string;
  author: string;
  thumbnail: string;
  rating: number;
  reviewCount: number;
  duration?: string;
  category: string[];
  featured?: boolean;
}

const KnowledgeHub = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  
  const categories = [
    'all',
    'business strategy',
    'marketing',
    'finance',
    'product development',
    'leadership',
    'sales',
    'operations'
  ];
  
  const resourceTypes = [
    'all',
    'article',
    'template',
    'video',
    'guide'
  ];
  
  const resources: Resource[] = [
    {
      id: 1,
      title: 'How to Create a Compelling Pitch Deck',
      type: 'template',
      description: 'A comprehensive template for creating investor pitch decks that stand out and effectively communicate your business vision.',
      author: 'Venture Capital Insights',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 4.8,
      reviewCount: 142,
      category: ['business strategy', 'finance'],
      featured: true
    },
    {
      id: 2,
      title: 'Marketing Strategy for Early-Stage Startups',
      type: 'guide',
      description: 'Learn how to build and execute an effective marketing strategy with limited resources and maximize your customer acquisition.',
      author: 'Growth Marketing Academy',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 4.7,
      reviewCount: 98,
      category: ['marketing', 'business strategy']
    },
    {
      id: 3,
      title: 'Financial Modeling for Startups',
      type: 'video',
      description: 'A step-by-step tutorial on creating financial models that will help you make better business decisions and attract investors.',
      author: 'Startup Finance Pro',
      thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 4.9,
      reviewCount: 76,
      duration: '45 min',
      category: ['finance']
    },
    {
      id: 4,
      title: 'Building a Customer-Centric Product Roadmap',
      type: 'article',
      description: 'Discover strategies for aligning your product development with customer needs to ensure market fit and drive growth.',
      author: 'Product Management Institute',
      thumbnail: 'https://images.unsplash.com/photo-1572177812156-58036aae439c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 4.6,
      reviewCount: 112,
      category: ['product development']
    },
    {
      id: 5,
      title: 'Leading Remote Teams Effectively',
      type: 'video',
      description: 'Best practices for managing and motivating remote teams to maintain productivity and foster a positive company culture.',
      author: 'Leadership Academy',
      thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 4.7,
      reviewCount: 89,
      duration: '32 min',
      category: ['leadership', 'operations']
    },
    {
      id: 6,
      title: 'Sales Strategy Framework for B2B SaaS',
      type: 'template',
      description: 'A comprehensive framework for developing and implementing a sales strategy specifically tailored for B2B SaaS companies.',
      author: 'SaaS Sales Experts',
      thumbnail: 'https://images.unsplash.com/photo-1556155092-8707de31f9c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 4.8,
      reviewCount: 67,
      category: ['sales', 'business strategy'],
      featured: true
    },
  ];
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article':
        return <FaFileAlt />;
      case 'template':
        return <FaBook />;
      case 'video':
        return <FaVideo />;
      case 'guide':
        return <FaBook />;
      default:
        return <FaFileAlt />;
    }
  };
  
  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || resource.category.includes(selectedCategory);
    
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });
  
  const featuredResources = resources.filter(resource => resource.featured);
  
  return (
    <div className={styles.knowledgeHub}>
      <div className={styles.header}>
        <h1 className={styles.title}>Knowledge Hub</h1>
        <p className={styles.subtitle}>
          Access curated resources, templates, and guides to help you navigate your entrepreneurial journey.
        </p>
      </div>
      
      <div className={styles.searchContainer}>
        <div className={styles.searchBar}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search for resources..."
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className={styles.filterContainer}>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Category:</label>
          <div className={styles.filterOptions}>
            {categories.map(category => (
              <button
                key={category}
                className={`${styles.filterButton} ${selectedCategory === category ? styles.activeFilter : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
        
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Type:</label>
          <div className={styles.filterOptions}>
            {resourceTypes.map(type => (
              <button
                key={type}
                className={`${styles.filterButton} ${selectedType === type ? styles.activeFilter : ''}`}
                onClick={() => setSelectedType(type)}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {searchQuery === '' && selectedCategory === 'all' && selectedType === 'all' && (
        <div className={styles.featuredSection}>
          <h2 className={styles.sectionTitle}>Featured Resources</h2>
          <div className={styles.featuredGrid}>
            {featuredResources.map(resource => (
              <div key={resource.id} className={styles.featuredCard}>
                <div className={styles.featuredImageContainer}>
                  <img 
                    src={resource.thumbnail} 
                    alt={resource.title} 
                    className={styles.featuredImage} 
                  />
                  <div className={styles.featuredTypeTag}>
                    {getTypeIcon(resource.type)}
                    <span>{resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}</span>
                  </div>
                  {resource.type === 'video' && (
                    <div className={styles.playButton}>
                      <FaPlayCircle />
                    </div>
                  )}
                </div>
                <div className={styles.featuredContent}>
                  <h3 className={styles.featuredTitle}>{resource.title}</h3>
                  <p className={styles.featuredDescription}>{resource.description}</p>
                  <div className={styles.featuredMeta}>
                    <div className={styles.featuredRating}>
                      <FaStar className={styles.starIcon} />
                      <span>{resource.rating}</span>
                      <span className={styles.reviewCount}>({resource.reviewCount})</span>
                    </div>
                    {resource.duration && (
                      <div className={styles.duration}>
                        <span>{resource.duration}</span>
                      </div>
                    )}
                  </div>
                  <div className={styles.featuredActions}>
                    <button className={styles.primaryButton}>
                      {resource.type === 'video' ? 'Watch Now' : 'View Resource'}
                    </button>
                    <button className={styles.iconButton}>
                      <FaBookmark />
                    </button>
                    {(resource.type === 'template' || resource.type === 'guide') && (
                      <button className={styles.iconButton}>
                        <FaDownload />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className={styles.resourcesSection}>
        <h2 className={styles.sectionTitle}>
          {searchQuery || selectedCategory !== 'all' || selectedType !== 'all' 
            ? 'Search Results' 
            : 'All Resources'}
        </h2>
        
        {filteredResources.length > 0 ? (
          <div className={styles.resourcesGrid}>
            {filteredResources.map(resource => (
              <div key={resource.id} className={styles.resourceCard}>
                <div className={styles.resourceImageContainer}>
                  <img 
                    src={resource.thumbnail} 
                    alt={resource.title} 
                    className={styles.resourceImage} 
                  />
                  <div className={styles.resourceTypeTag}>
                    {getTypeIcon(resource.type)}
                    <span>{resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}</span>
                  </div>
                  {resource.type === 'video' && (
                    <div className={styles.playButton}>
                      <FaPlayCircle />
                    </div>
                  )}
                </div>
                <div className={styles.resourceContent}>
                  <h3 className={styles.resourceTitle}>{resource.title}</h3>
                  <p className={styles.resourceAuthor}>By {resource.author}</p>
                  <div className={styles.resourceMeta}>
                    <div className={styles.resourceRating}>
                      <FaStar className={styles.starIcon} />
                      <span>{resource.rating}</span>
                      <span className={styles.reviewCount}>({resource.reviewCount})</span>
                    </div>
                    {resource.duration && (
                      <div className={styles.duration}>
                        <span>{resource.duration}</span>
                      </div>
                    )}
                  </div>
                  <div className={styles.resourceCategories}>
                    {resource.category.map(cat => (
                      <span key={cat} className={styles.categoryTag}>
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </span>
                    ))}
                  </div>
                  <div className={styles.resourceActions}>
                    <button className={styles.actionButton}>
                      {resource.type === 'video' ? 'Watch' : 'View'}
                    </button>
                    <button className={styles.iconButton}>
                      <FaBookmark />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.noResults}>
            <p>No resources found matching your criteria. Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default KnowledgeHub;