// src/pages/Forum/Forum.tsx
import { useState, useEffect } from 'react';
import { 
  FaSearch, 
  FaFilter, 
  FaComment, 
  FaEye, 
  FaHeart, 
  FaRegHeart, 
  FaUserCircle, 
  FaRegClock, 
  FaChevronLeft,
  FaPlus,
  FaFire,
  FaTag,
  FaExclamationCircle
} from 'react-icons/fa';
import styles from './Forum.module.css';

interface ForumTopic {
  id: number;
  title: string;
  content: string;
  author: {
    id: number;
    name: string;
    avatar: string;
    role?: string;
  };
  category: string;
  tags: string[];
  createdAt: string;
  views: number;
  likes: number;
  likesBy?: number[];
  comments: number;
  isLiked?: boolean;
  isPinned?: boolean;
  isAnswered?: boolean;
  lastActivity: string;
}

interface ForumComment {
  id: number;
  topicId: number;
  content: string;
  author: {
    id: number;
    name: string;
    avatar: string;
    role?: string;
  };
  createdAt: string;
  likes: number;
  isLiked?: boolean;
  isAnswer?: boolean;
}

const Forum = () => {
  const [topics, setTopics] = useState<ForumTopic[]>([]);
  const [filteredTopics, setFilteredTopics] = useState<ForumTopic[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('recent');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<ForumTopic | null>(null);
  const [comments, setComments] = useState<ForumComment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [newTopicModal, setNewTopicModal] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Categories
  const categories = [
    { id: 'all', name: 'All Topics' },
    { id: 'general', name: 'General Discussion' },
    { id: 'startup-help', name: 'Startup Help' },
    { id: 'funding', name: 'Funding & Investment' },
    { id: 'technical', name: 'Technical' },
    { id: 'marketing', name: 'Marketing & Growth' },
    { id: 'feedback', name: 'Feedback Request' },
    { id: 'jobs', name: 'Jobs & Hiring' },
    { id: 'legal', name: 'Legal & Compliance' }
  ];
  
  // Tags
  const popularTags = [
    'fundraising', 'mentorship', 'product-market-fit', 'mvp', 'scaling', 
    'pitch-deck', 'hiring', 'marketing', 'saas', 'bootstrapping', 'investor-relations'
  ];
  
  // Sort options
  const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'active', label: 'Most Active' },
    { value: 'unanswered', label: 'Unanswered' }
  ];
  
  // Fetch forum topics data
  useEffect(() => {
    // Simulating API call
    const fetchTopics = async () => {
      setLoading(true);
      
      try {
        // In a real app, this would be an API call
        // For the hackathon, we'll use mock data
        const mockTopics: ForumTopic[] = [
          {
            id: 1,
            title: "How to find the right co-founder for a tech startup?",
            content: "I'm looking to start a SaaS company and need a technical co-founder. What's the best way to find someone who's not only skilled but also shares my vision and work ethic? I've tried some co-founder matching platforms but haven't had much luck. Any specific strategies or platforms that worked for you?",
            author: {
              id: 1,
              name: "Sarah Johnson",
              avatar: "https://randomuser.me/api/portraits/women/32.jpg",
              role: "Entrepreneur"
            },
            category: "startup-help",
            tags: ["co-founder", "team-building", "startup"],
            createdAt: "2023-11-01T14:32:00Z",
            views: 342,
            likes: 45,
            comments: 24,
            isPinned: true,
            lastActivity: "2023-11-05T09:15:00Z"
          },
          {
            id: 2,
            title: "Fundraising strategies for early-stage startups in 2023",
            content: "I'm preparing for our seed round and would love to hear about current fundraising trends and strategies. What's working now in the current economic climate? Are investors looking for anything specific? Any tips on pitch deck structure or valuation approaches would be greatly appreciated.",
            author: {
              id: 2,
              name: "Michael Chen",
              avatar: "https://randomuser.me/api/portraits/men/64.jpg",
              role: "Founder"
            },
            category: "funding",
            tags: ["fundraising", "seed-round", "pitch-deck"],
            createdAt: "2023-11-02T09:45:00Z",
            views: 287,
            likes: 36,
            comments: 18,
            lastActivity: "2023-11-04T16:22:00Z"
          },
          {
            id: 3,
            title: "Best practices for pitching to angel investors",
            content: "I have meetings with several angel investors next week and I'm looking for advice on how to make my pitch stand out. What do angels typically look for that's different from VCs? How detailed should my financial projections be? Any common pitfalls I should avoid?",
            author: {
              id: 3,
              name: "Emily Rodriguez",
              avatar: "https://randomuser.me/api/portraits/women/45.jpg"
            },
            category: "funding",
            tags: ["angel-investors", "pitching", "fundraising"],
            createdAt: "2023-11-03T11:20:00Z",
            views: 415,
            likes: 52,
            comments: 31,
            isAnswered: true,
            lastActivity: "2023-11-06T10:45:00Z"
          },
          {
            id: 4,
            title: "How to validate your startup idea before building an MVP",
            content: "I have a concept for a new fintech app, but I want to validate it properly before investing time and money into development. What are some effective, low-cost ways to test if there's real demand? Has anyone used the 'fake door' testing approach successfully?",
            author: {
              id: 4,
              name: "David Wilson",
              avatar: "https://randomuser.me/api/portraits/men/22.jpg",
              role: "Product Manager"
            },
            category: "startup-help",
            tags: ["validation", "mvp", "product-market-fit"],
            createdAt: "2023-10-28T15:30:00Z",
            views: 376,
            likes: 41,
            comments: 27,
            lastActivity: "2023-11-03T12:10:00Z"
          },
          {
            id: 5,
            title: "Legal considerations when forming a Delaware C-Corp",
            content: "We're incorporating as a Delaware C-Corp and I'm trying to understand all the legal implications. Specifically, I'm confused about stock issuance, vesting schedules, and how to properly set up the cap table. Has anyone gone through this recently who can share their experience or recommend resources?",
            author: {
              id: 5,
              name: "Amanda Lee",
              avatar: "https://randomuser.me/api/portraits/women/28.jpg"
            },
            category: "legal",
            tags: ["incorporation", "legal", "equity"],
            createdAt: "2023-10-25T10:15:00Z",
            views: 208,
            likes: 29,
            comments: 15,
            lastActivity: "2023-11-01T14:20:00Z"
          },
          {
            id: 6,
            title: "Effective customer acquisition strategies for B2B SaaS",
            content: "We've built a great product for the HR tech space, but we're struggling with customer acquisition. Our CAC is too high and our sales cycles are long. What are some effective strategies for reaching decision-makers and shortening the sales cycle in B2B SaaS?",
            author: {
              id: 6,
              name: "Robert Taylor",
              avatar: "https://randomuser.me/api/portraits/men/33.jpg",
              role: "Marketing Director"
            },
            category: "marketing",
            tags: ["b2b", "saas", "customer-acquisition"],
            createdAt: "2023-11-04T16:45:00Z",
            views: 187,
            likes: 34,
            comments: 19,
            lastActivity: "2023-11-06T09:30:00Z"
          },
          {
            id: 7,
            title: "Feedback on my startup landing page design",
            content: "We just redesigned our landing page for our productivity tool and I'd love to get some feedback before we go live. I'm particularly interested in thoughts on the value proposition clarity and the CTA placement. Here's the link to the staging site: [link]",
            author: {
              id: 7,
              name: "Elena Rodriguez",
              avatar: "https://randomuser.me/api/portraits/women/56.jpg",
              role: "UX Designer"
            },
            category: "feedback",
            tags: ["design", "landing-page", "conversion"],
            createdAt: "2023-11-05T13:10:00Z",
            views: 142,
            likes: 27,
            comments: 22,
            lastActivity: "2023-11-06T15:40:00Z"
          },
          {
            id: 8,
            title: "How to structure equity distribution among co-founders",
            content: "My two colleagues and I are launching a startup, and we're discussing equity distribution. One person is full-time, while the other two (including me) are part-time initially. How should we approach equity splits? Is a 50/25/25 split reasonable? Should we consider vesting schedules?",
            author: {
              id: 8,
              name: "James Wilson",
              avatar: "https://randomuser.me/api/portraits/men/41.jpg"
            },
            category: "legal",
            tags: ["equity", "co-founders", "vesting"],
            createdAt: "2023-10-30T09:20:00Z",
            views: 231,
            likes: 38,
            comments: 25,
            isAnswered: true,
            lastActivity: "2023-11-04T11:35:00Z"
          },
          {
            id: 9,
            title: "Technical stack choices for a marketplace startup",
            content: "We're building a two-sided marketplace and need to make technology choices. I'm leaning toward React/Node.js with PostgreSQL, but I'm concerned about scalability as we grow. Has anyone built a marketplace at scale? What technologies worked well, and what would you do differently?",
            author: {
              id: 9,
              name: "Alex Kim",
              avatar: "https://randomuser.me/api/portraits/men/55.jpg",
              role: "CTO"
            },
            category: "technical",
            tags: ["tech-stack", "scalability", "marketplace"],
            createdAt: "2023-11-03T08:45:00Z",
            views: 176,
            likes: 31,
            comments: 24,
            lastActivity: "2023-11-05T16:20:00Z"
          },
          {
            id: 10,
            title: "Remote team management best practices",
            content: "Our startup has team members across three different time zones, and we're facing some collaboration challenges. What tools and practices have worked well for other remote-first startups? How do you maintain culture and communication while working asynchronously?",
            author: {
              id: 10,
              name: "Sophia Martinez",
              avatar: "https://randomuser.me/api/portraits/women/65.jpg",
              role: "Operations Lead"
            },
            category: "general",
            tags: ["remote-work", "team-management", "culture"],
            createdAt: "2023-11-02T14:30:00Z",
            views: 201,
            likes: 43,
            comments: 28,
            lastActivity: "2023-11-05T13:50:00Z"
          },
          {
            id: 11,
            title: "Looking for a technical mentor in AI/ML",
            content: "I'm a non-technical founder building an AI-powered analytics tool. While we have developers, I'd like to find a mentor who can help me understand the technical aspects better and guide our AI strategy. Ideally someone with experience in NLP and predictive analytics. Any recommendations?",
            author: {
              id: 11,
              name: "Thomas Wright",
              avatar: "https://randomuser.me/api/portraits/men/67.jpg"
            },
            category: "startup-help",
            tags: ["mentorship", "ai", "technical-advice"],
            createdAt: "2023-11-04T10:15:00Z",
            views: 132,
            likes: 24,
            comments: 13,
            lastActivity: "2023-11-06T08:25:00Z"
          },
          {
            id: 12,
            title: "Strategies for pricing a SaaS product",
            // src/pages/Forum/Forum.tsx (continued)
            content: "We're finalizing our pricing strategy for our B2B SaaS product and I'm torn between usage-based and tiered pricing. Our product is a data analytics tool for e-commerce. What pricing models have worked well for similar products? How do you determine the right price points?",
            author: {
              id: 12,
              name: "Daniel Lee",
              avatar: "https://randomuser.me/api/portraits/men/73.jpg",
              role: "Product Manager"
            },
            category: "marketing",
            tags: ["pricing", "saas", "monetization"],
            createdAt: "2023-11-01T11:40:00Z",
            views: 195,
            likes: 32,
            comments: 21,
            lastActivity: "2023-11-05T10:30:00Z"
          }
        ];
        
        setTopics(mockTopics);
        setFilteredTopics(mockTopics);
      } catch (error) {
        console.error('Error fetching forum topics:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTopics();
  }, []);
  
  // Fetch comments when a topic is selected
  useEffect(() => {
    if (selectedTopic) {
      // Simulating API call to get comments for the selected topic
      const fetchComments = async () => {
        try {
          // In a real app, this would be an API call with the topic ID
          // For the hackathon, we'll use mock data
          const mockComments: ForumComment[] = [
            {
              id: 1,
              topicId: selectedTopic.id,
              content: "I found my co-founder through CoFoundersLab. The key is to be very specific about what you're looking for and to have several conversations before committing. Make sure you align on vision, work ethic, and communication style.",
              author: {
                id: 15,
                name: "Mark Johnson",
                avatar: "https://randomuser.me/api/portraits/men/42.jpg",
                role: "Founder"
              },
              createdAt: "2023-11-02T10:15:00Z",
              likes: 12,
              isAnswer: true
            },
            {
              id: 2,
              topicId: selectedTopic.id,
              content: "Networking events specifically for startups can be gold mines. I met my technical co-founder at a hackathon. We worked together for a weekend and realized we complemented each other well. Try participating in hackathons or joining startup-focused Slack communities.",
              author: {
                id: 16,
                name: "Lisa Chen",
                avatar: "https://randomuser.me/api/portraits/women/42.jpg"
              },
              createdAt: "2023-11-02T14:30:00Z",
              likes: 8
            },
            {
              id: 3,
              topicId: selectedTopic.id,
              content: "Don't rush the process. It's better to spend months finding the right person than to partner with someone quickly and regret it later. I'd recommend working on small projects together before making any commitments. It's like dating before marriage.",
              author: {
                id: 17,
                name: "Alex Thompson",
                avatar: "https://randomuser.me/api/portraits/men/45.jpg",
                role: "Serial Entrepreneur"
              },
              createdAt: "2023-11-03T09:20:00Z",
              likes: 15
            },
            {
              id: 4,
              topicId: selectedTopic.id,
              content: "Consider looking beyond your immediate network. I found my co-founder by reaching out to someone whose blog posts I admired. We had coffee, then started collaborating on a side project, and eventually launched our startup together.",
              author: {
                id: 18,
                name: "Sophia Williams",
                avatar: "https://randomuser.me/api/portraits/women/33.jpg"
              },
              createdAt: "2023-11-03T16:45:00Z",
              likes: 7
            },
            {
              id: 5,
              topicId: selectedTopic.id,
              content: "I'd recommend Y Combinator's co-founder matching platform. It's well-structured and helps you find people who are serious about building something. Also, be very clear about equity splits and roles from the beginning to avoid future conflicts.",
              author: {
                id: 19,
                name: "David Garcia",
                avatar: "https://randomuser.me/api/portraits/men/46.jpg"
              },
              createdAt: "2023-11-04T11:30:00Z",
              likes: 10
            }
          ];
          
          setComments(mockComments);
        } catch (error) {
          console.error('Error fetching comments:', error);
        }
      };
      
      fetchComments();
    }
  }, [selectedTopic]);
  
  // Filter topics based on search, category, and tag
  useEffect(() => {
    const filtered = topics.filter(topic => {
      // Search filter
      const matchesSearch = 
        searchQuery === '' || 
        topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        topic.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        topic.author.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Category filter
      const matchesCategory = 
        selectedCategory === 'all' || 
        topic.category === selectedCategory;
      
      // Tag filter
      const matchesTag = 
        selectedTag === '' || 
        topic.tags.includes(selectedTag);
      
      return matchesSearch && matchesCategory && matchesTag;
    });
    
    // Sort filtered topics
    const sortedTopics = [...filtered].sort((a, b) => {
      // Always show pinned topics first
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      
      if (sortBy === 'recent') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else if (sortBy === 'popular') {
        return b.likes - a.likes;
      } else if (sortBy === 'active') {
        return new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime();
      } else if (sortBy === 'unanswered') {
        if (a.isAnswered && !b.isAnswered) return 1;
        if (!a.isAnswered && b.isAnswered) return -1;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      return 0;
    });
    
    setFilteredTopics(sortedTopics);
  }, [searchQuery, selectedCategory, selectedTag, sortBy, topics]);
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
      if (diffHours === 0) {
        const diffMinutes = Math.floor(diffTime / (1000 * 60));
        return `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`;
      }
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else if (diffDays < 7) {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    } else {
      const options: Intl.DateTimeFormatOptions = { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      };
      return date.toLocaleDateString(undefined, options);
    }
  };
  
  // Toggle like topic
  const toggleLikeTopic = (id: number) => {
    setTopics(prevTopics => 
      prevTopics.map(topic => {
        if (topic.id === id) {
          const isLiked = !topic.isLiked;
          return { 
            ...topic, 
            isLiked,
            likes: isLiked ? topic.likes + 1 : topic.likes - 1
          };
        }
        return topic;
      })
    );
  };
  
  // Toggle like comment
  const toggleLikeComment = (id: number) => {
    setComments(prevComments => 
      prevComments.map(comment => {
        if (comment.id === id) {
          const isLiked = !comment.isLiked;
          return { 
            ...comment, 
            isLiked,
            likes: isLiked ? comment.likes + 1 : comment.likes - 1
          };
        }
        return comment;
      })
    );
  };
  
  // Submit new comment
  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedTopic || newComment.trim() === '') return;
    
    // In a real app, this would be an API call to post the comment
    const newCommentObj: ForumComment = {
      id: comments.length + 1,
      topicId: selectedTopic.id,
      content: newComment,
      author: {
        id: 20, // Assuming this is the current user
        name: "Current User",
        avatar: "https://randomuser.me/api/portraits/men/85.jpg"
      },
      createdAt: new Date().toISOString(),
      likes: 0
    };
    
    setComments([...comments, newCommentObj]);
    
    // Update the topic's comment count
    setTopics(prevTopics => 
      prevTopics.map(topic => 
        topic.id === selectedTopic.id 
          ? { ...topic, comments: topic.comments + 1 } 
          : topic
      )
    );
    
    setNewComment('');
  };
  
  // Get category name
  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : categoryId;
  };
  
  // Back to topics list
  const backToTopics = () => {
    setSelectedTopic(null);
    setComments([]);
  };
  
  return (
    <div className={styles.forum}>
      <div className={styles.heroSection}>
        <div className={styles.container}>
          <h1 className={styles.heroTitle}>Community Forum</h1>
          <p className={styles.heroSubtitle}>
            Join the conversation with fellow entrepreneurs, mentors, and investors
          </p>
          
          <div className={styles.searchContainer}>
            <div className={styles.searchBar}>
              <FaSearch className={styles.searchIcon} />
              <input 
                type="text" 
                placeholder="Search topics, questions, or users..." 
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
              {(selectedCategory !== 'all' || selectedTag !== '') && (
                <span className={styles.filterCount}>
                  {(selectedCategory !== 'all' ? 1 : 0) + (selectedTag !== '' ? 1 : 0)}
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
                <h3 className={styles.filterGroupTitle}>Categories</h3>
                <div className={styles.filterOptions}>
                  {categories.map((category) => (
                    <button 
                      key={category.id}
                      className={`${styles.filterTag} ${selectedCategory === category.id ? styles.activeTag : ''}`}
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className={styles.filterGroup}>
                <h3 className={styles.filterGroupTitle}>Popular Tags</h3>
                <div className={styles.filterOptions}>
                  {popularTags.map((tag) => (
                    <button 
                      key={tag}
                      className={`${styles.filterTag} ${selectedTag === tag ? styles.activeTag : ''}`}
                      onClick={() => setSelectedTag(selectedTag === tag ? '' : tag)}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className={styles.filterActions}>
                <button 
                  className={styles.resetButton}
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedTag('');
                  }}
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className={styles.forumContent}>
        <div className={styles.container}>
          {!selectedTopic ? (
            // Topics list view
            <>
              <div className={styles.forumHeader}>
                <div className={styles.forumActions}>
                  <button 
                    className={styles.primaryButton}
                    onClick={() => setNewTopicModal(true)}
                  >
                    <FaPlus className={styles.buttonIcon} /> New Topic
                  </button>
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
                
                <div className={styles.forumStats}>
                  <div className={styles.statItem}>
                    <span className={styles.statNumber}>{topics.length}</span>
                    <span className={styles.statLabel}>Topics</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statNumber}>
                      {topics.reduce((sum, topic) => sum + topic.comments, 0)}
                    </span>
                    <span className={styles.statLabel}>Replies</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statNumber}>
                      {topics.filter(topic => new Date(topic.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length}
                    </span>
                    <span className={styles.statLabel}>New This Week</span>
                  </div>
                </div>
              </div>
              
              {loading ? (
                <div className={styles.loadingState}>
                  <div className={styles.spinner}></div>
                  <p>Loading topics...</p>
                </div>
              ) : filteredTopics.length > 0 ? (
                <div className={styles.topicsList}>
                  {filteredTopics.map(topic => (
                    <div 
                      key={topic.id} 
                      className={`${styles.topicCard} ${topic.isPinned ? styles.pinnedTopic : ''}`}
                      onClick={() => setSelectedTopic(topic)}
                    >
                      {topic.isPinned && (
                        <div className={styles.pinnedBadge}>
                          <FaFire className={styles.pinnedIcon} />
                          <span>Pinned</span>
                        </div>
                      )}
                      
                      <div className={styles.topicMain}>
                        <h3 className={styles.topicTitle}>
                          {topic.title}
                          {topic.isAnswered && (
                            <span className={styles.answeredBadge}>Answered</span>
                          )}
                        </h3>
                        
                        <div className={styles.topicMeta}>
                          <div className={styles.topicAuthor}>
                            <img 
                              src={topic.author.avatar} 
                              alt={topic.author.name} 
                              className={styles.authorAvatar} 
                            />
                            <span className={styles.authorName}>{topic.author.name}</span>
                            {topic.author.role && (
                              <span className={styles.authorRole}>{topic.author.role}</span>
                            )}
                          </div>
                          
                          <div className={styles.topicDetails}>
                            <span className={styles.topicCategory}>
                              <FaTag className={styles.categoryIcon} />
                              {getCategoryName(topic.category)}
                            </span>
                            <span className={styles.topicTime}>
                              <FaRegClock className={styles.timeIcon} />
                              {formatDate(topic.createdAt)}
                            </span>
                          </div>
                        </div>
                        
                        <p className={styles.topicExcerpt}>
                          {topic.content.length > 200 
                            ? `${topic.content.substring(0, 200)}...` 
                            : topic.content}
                        </p>
                        
                        <div className={styles.topicTags}>
                          {topic.tags.map(tag => (
                            <span 
                              key={tag} 
                              className={styles.tagPill}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedTag(tag);
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className={styles.topicStats}>
                        <div className={styles.statItem}>
                          <FaComment className={styles.statIcon} />
                          <span>{topic.comments}</span>
                        </div>
                        <div className={styles.statItem}>
                          <FaEye className={styles.statIcon} />
                          <span>{topic.views}</span>
                        </div>
                        <div 
                          className={`${styles.statItem} ${styles.likeItem}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleLikeTopic(topic.id);
                          }}
                        >
                          {topic.isLiked ? (
                            <FaHeart className={`${styles.statIcon} ${styles.likedIcon}`} />
                          ) : (
                            <FaRegHeart className={styles.statIcon} />
                          )}
                          <span>{topic.likes}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.emptyState}>
                  <div className={styles.emptyStateIcon}>
                    <FaExclamationCircle />
                  </div>
                  <h2>No topics found</h2>
                  <p>Try adjusting your search criteria or filters</p>
                  <button 
                    className={styles.resetButton}
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                      setSelectedTag('');
                    }}
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </>
          ) : (
            // Topic detail view
            <div className={styles.topicDetail}>
              <button 
                className={styles.backButton}
                onClick={backToTopics}
              >
                <FaChevronLeft className={styles.backIcon} /> Back to Topics
              </button>
              
              <div className={styles.topicContent}>
                <h2 className={styles.detailTitle}>{selectedTopic.title}</h2>
                
                <div className={styles.topicMeta}>
                  <div className={styles.topicAuthor}>
                    <img 
                      src={selectedTopic.author.avatar} 
                      alt={selectedTopic.author.name} 
                      className={styles.authorAvatar} 
                    />
                    <div className={styles.authorInfo}>
                      <span className={styles.authorName}>{selectedTopic.author.name}</span>
                      {selectedTopic.author.role && (
                        <span className={styles.authorRole}>{selectedTopic.author.role}</span>
                      )}
                    </div>
                  </div>
                  
                  <div className={styles.topicDetails}>
                    <span className={styles.topicCategory}>
                      <FaTag className={styles.categoryIcon} />
                      {getCategoryName(selectedTopic.category)}
                    </span>
                    <span className={styles.topicTime}>
                      <FaRegClock className={styles.timeIcon} />
                      {formatDate(selectedTopic.createdAt)}
                    </span>
                  </div>
                </div>
                
                <div className={styles.topicBody}>
                  <p>{selectedTopic.content}</p>
                </div>
                
                <div className={styles.topicTags}>
                  {selectedTopic.tags.map(tag => (
                    <span 
                      key={tag} 
                      className={styles.tagPill}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className={styles.topicActions}>
                  <div 
                    className={`${styles.likeAction} ${selectedTopic.isLiked ? styles.liked : ''}`}
                    onClick={() => toggleLikeTopic(selectedTopic.id)}
                  >
                    {selectedTopic.isLiked ? (
                      <FaHeart className={styles.likedIcon} />
                    ) : (
                      <FaRegHeart />
                    )}
                    <span>{selectedTopic.likes} likes</span>
                  </div>
                  
                  <div className={styles.viewsCount}>
                    <FaEye className={styles.viewsIcon} />
                    <span>{selectedTopic.views} views</span>
                  </div>
                </div>
              </div>
              
              <div className={styles.commentsSection}>
                <h3 className={styles.commentsTitle}>
                  {selectedTopic.comments} {selectedTopic.comments === 1 ? 'Reply' : 'Replies'}
                </h3>
                
                <div className={styles.commentsList}>
                  {comments.map(comment => (
                    <div 
                      key={comment.id} 
                      className={`${styles.commentCard} ${comment.isAnswer ? styles.answerCard : ''}`}
                    >
                      {comment.isAnswer && (
                        <div className={styles.answerBadge}>Best Answer</div>
                      )}
                      
                      <div className={styles.commentHeader}>
                        <div className={styles.commentAuthor}>
                          <img 
                            src={comment.author.avatar} 
                            alt={comment.author.name} 
                            className={styles.commentAvatar} 
                          />
                          <div className={styles.authorInfo}>
                            <span className={styles.authorName}>{comment.author.name}</span>
                            {comment.author.role && (
                              <span className={styles.authorRole}>{comment.author.role}</span>
                            )}
                          </div>
                        </div>
                        
                        <span className={styles.commentTime}>
                          {formatDate(comment.createdAt)}
                        </span>
                      </div>
                      
                      <div className={styles.commentBody}>
                        <p>{comment.content}</p>
                      </div>
                      
                      <div className={styles.commentActions}>
                        <div 
                          className={`${styles.likeAction} ${comment.isLiked ? styles.liked : ''}`}
                          onClick={() => toggleLikeComment(comment.id)}
                        >
                          {comment.isLiked ? (
                            <FaHeart className={styles.likedIcon} />
                          ) : (
                            <FaRegHeart />
                          )}
                          <span>{comment.likes} likes</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className={styles.addComment}>
                  <h4 className={styles.replyTitle}>Add Your Reply</h4>
                  <form onSubmit={handleSubmitComment}>
                    <div className={styles.commentForm}>
                      <div className={styles.currentUser}>
                        <FaUserCircle className={styles.userIcon} />
                      </div>
                      <textarea 
                        className={styles.commentInput}
                        placeholder="Share your thoughts or answer the question..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        rows={4}
                        required
                      ></textarea>
                    </div>
                    <button 
                      type="submit" 
                      className={styles.submitButton}
                      disabled={newComment.trim() === ''}
                    >
                      Post Reply
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* New Topic Modal */}
      {newTopicModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2>Create New Topic</h2>
              <button 
                className={styles.closeButton}
                onClick={() => setNewTopicModal(false)}
              >
                ×
              </button>
            </div>
            
            <div className={styles.modalBody}>
              <form className={styles.newTopicForm}>
                <div className={styles.formGroup}>
                  <label htmlFor="topicTitle">Title</label>
                  <input 
                    type="text" 
                    id="topicTitle" 
                    placeholder="Enter a descriptive title for your topic"
                    className={styles.formInput}
                    required
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="topicCategory">Category</label>
                  <select 
                    id="topicCategory" 
                    className={styles.formSelect}
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.filter(cat => cat.id !== 'all').map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="topicContent">Content</label>
                  <textarea 
                    id="topicContent" 
                    placeholder="Describe your question or topic in detail"
                    className={styles.formTextarea}
                    rows={6}
                    required
                  ></textarea>
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="topicTags">Tags (comma separated)</label>
                  <input 
                    type="text" 
                    id="topicTags" 
                    placeholder="e.g., funding, marketing, technical"
                    className={styles.formInput}
                  />
                </div>
                
                <div className={styles.formActions}>
                  <button 
                    type="button" 
                    className={styles.cancelButton}
                    onClick={() => setNewTopicModal(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className={styles.submitButton}
                  >
                    Create Topic
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

export default Forum;