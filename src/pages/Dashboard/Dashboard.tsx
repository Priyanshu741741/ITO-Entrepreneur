// src/pages/Dashboard/Dashboard.tsx
import { useState } from 'react';
import { FaCalendarAlt, FaBell, FaUsers, FaBook, FaNetworkWired } from 'react-icons/fa';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const [notifications] = useState([
    { id: 1, title: 'New mentor match', message: 'Sarah Johnson, Tech Entrepreneur, is available to connect', time: '2 hours ago' },
    { id: 2, title: 'Upcoming Event', message: 'Startup Funding Workshop this Friday at 3 PM', time: '1 day ago' },
    { id: 3, title: 'Resource Recommendation', message: 'New market research report for your industry is available', time: '2 days ago' },
  ]);

  const [upcomingMeetings] = useState([
    { id: 1, title: 'Mentor Session with David Chen', time: 'Today, 3:00 PM', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { id: 2, title: 'Peer Mastermind Group', time: 'Tomorrow, 10:00 AM', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
  ]);

  const stats = [
    { label: 'Mentor Connections', value: 8, icon: <FaUsers className={styles.statIcon} /> },
    { label: 'Resources Accessed', value: 24, icon: <FaBook className={styles.statIcon} /> },
    { label: 'Network Size', value: 56, icon: <FaNetworkWired className={styles.statIcon} /> },
  ];

  return (
    <div className={styles.dashboard}>
      <h1 className={styles.pageTitle}>Dashboard</h1>
      
      <div className={styles.statsGrid}>
        {stats.map((stat, index) => (
          <div key={index} className={styles.statCard}>
            <div className={styles.statIconWrapper}>
              {stat.icon}
            </div>
            <div className={styles.statInfo}>
              <h3 className={styles.statValue}>{stat.value}</h3>
              <p className={styles.statLabel}>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className={styles.dashboardGrid}>
        <div className={styles.dashboardCard}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>
              <FaBell className={styles.cardTitleIcon} /> Notifications
            </h2>
            <span className={styles.viewAllLink}>View All</span>
          </div>
          <div className={styles.cardContent}>
            {notifications.map((notification) => (
              <div key={notification.id} className={styles.notificationItem}>
                <h3 className={styles.notificationTitle}>{notification.title}</h3>
                <p className={styles.notificationMessage}>{notification.message}</p>
                <p className={styles.notificationTime}>{notification.time}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className={styles.dashboardCard}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>
              <FaCalendarAlt className={styles.cardTitleIcon} /> Upcoming Meetings
            </h2>
            <span className={styles.viewAllLink}>Schedule New</span>
          </div>
          <div className={styles.cardContent}>
            {upcomingMeetings.map((meeting) => (
              <div key={meeting.id} className={styles.meetingItem}>
                <div className={styles.meetingAvatar}>
                  <img src={meeting.avatar} alt="User avatar" />
                </div>
                <div className={styles.meetingInfo}>
                  <h3 className={styles.meetingTitle}>{meeting.title}</h3>
                  <p className={styles.meetingTime}>{meeting.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;