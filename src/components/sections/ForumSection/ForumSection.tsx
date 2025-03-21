// src/components/sections/ForumSection/ForumSection.tsx
import { FaComment, FaHeart, FaEye, FaUser } from 'react-icons/fa';
import styles from './ForumSection.module.css';

const ForumSection = () => {
  const forumTopics = [
    {
      id: 1,
      title: 'How to find the right co-founder for a tech startup?',
      author: 'Sarah Johnson',
      category: 'Co-founders',
      replies: 24,
      views: 342,
      likes: 45,
      time: '2 days ago'
    },
    {
      id: 2,
      title: 'Fundraising strategies for early-stage startups in 2023',
      author: 'Michael Chen',
      category: 'Funding',
      replies: 18,
      views: 287,
      likes: 36,
      time: '3 days ago'
    },
    {
      id: 3,
      title: 'Best practices for pitching to angel investors',
      author: 'Emily Rodriguez',
      category: 'Pitching',
      replies: 31,
      views: 415,
      likes: 52,
      time: '5 days ago'
    },
    {
      id: 4,
      title: 'How to validate your startup idea before building an MVP',
      author: 'David Wilson',
      category: 'Ideation',
      replies: 27,
      views: 376,
      likes: 41,
      time: '1 week ago'
    }
  ];

  return (
    <section className={styles.forumSection}>
      <div className={styles.container}>
        <div className={styles.forumHeader}>
          <h2 className={styles.sectionTitle}>Community Forum</h2>
          <p className={styles.sectionDescription}>
            Join the conversation with fellow entrepreneurs, mentors, and investors
          </p>
        </div>
        
        <div className={styles.forumTopicsContainer}>
          <div className={styles.forumCategories}>
            <span className={`${styles.categoryTag} ${styles.activeCategory}`}>All Topics</span>
            <span className={styles.categoryTag}>Co-founders</span>
            <span className={styles.categoryTag}>Funding</span>
            <span className={styles.categoryTag}>Pitching</span>
            <span className={styles.categoryTag}>Ideation</span>
            <span className={styles.categoryTag}>Marketing</span>
          </div>
          
          <div className={styles.topicsList}>
            {forumTopics.map(topic => (
              <div key={topic.id} className={styles.topicCard}>
                <div className={styles.topicContent}>
                  <h3 className={styles.topicTitle}>{topic.title}</h3>
                  <div className={styles.topicMeta}>
                    <span className={styles.topicAuthor}>
                      <FaUser className={styles.metaIcon} />
                      {topic.author}
                    </span>
                    <span className={styles.topicCategory}>{topic.category}</span>
                    <span className={styles.topicTime}>{topic.time}</span>
                  </div>
                </div>
                <div className={styles.topicStats}>
                  <div className={styles.statItem}>
                    <FaComment className={styles.statIcon} />
                    <span>{topic.replies}</span>
                  </div>
                  <div className={styles.statItem}>
                    <FaEye className={styles.statIcon} />
                    <span>{topic.views}</span>
                  </div>
                  <div className={styles.statItem}>
                    <FaHeart className={styles.statIcon} />
                    <span>{topic.likes}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className={styles.viewMoreContainer}>
            <button className={styles.viewMoreButton}>
              View More Topics
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForumSection;