// src/components/sections/ChatInterface/ChatInterface.tsx
import {FaUsers, FaVolumeUp } from 'react-icons/fa';
import styles from './ChatInterface.module.css';

const ChatInterface = () => {
  return (
    <section className={styles.chatInterface}>
      <div className={styles.container}>
        <div className={styles.mockupWindow}>
          {/* Header row with browser dots */}
          <div className={styles.windowHeader}>
            <div className={styles.browserDots}>
              <div className={styles.dot} style={{ backgroundColor: '#ff5f56' }}></div>
              <div className={styles.dot} style={{ backgroundColor: '#ffbd2e' }}></div>
              <div className={styles.dot} style={{ backgroundColor: '#27c93f' }}></div>
            </div>
            <div className={styles.searchBar}>
              <svg className={styles.searchIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className={styles.searchText}>Search A1 Company Ltd.</span>
            </div>
          </div>
          
          {/* Main chat area */}
          <div className={styles.chatContainer}>
            {/* Left sidebar */}
            <div className={styles.sidebar}>
              <div className={styles.companyHeader}>
                <div className={styles.companyAvatar}>
                  A1
                </div>
                <span className={styles.companyName}>A1 Company Ltd.</span>
                <svg className={styles.dropdownIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              
              <div className={styles.channelsSection}>
                <p className={styles.channelsHeader}>Channels</p>
                <ul className={styles.channelsList}>
                  <li className={styles.channelItem}>
                    <span className={styles.channelHash}>#</span> announcements
                  </li>
                  <li className={`${styles.channelItem} ${styles.activeChannel}`}>
                    <span className={styles.channelHash}>#</span> project-gizmo
                  </li>
                  <li className={styles.channelItem}>
                    <span className={styles.channelHash}>#</span> team-marketing
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Right content area */}
            <div className={styles.chatContent}>
              <div className={styles.chatHeader}>
                <div>
                  <h3 className={styles.channelTitle}># project-gizmo</h3>
                </div>
                <div className={styles.memberCount}>
                  <div className={styles.memberAvatars}>
                    <img src="https://randomuser.me/api/portraits/women/32.jpg" alt="User" className={styles.memberAvatar} />
                    <img src="https://randomuser.me/api/portraits/men/54.jpg" alt="User" className={styles.memberAvatar} />
                    <img src="https://randomuser.me/api/portraits/women/45.jpg" alt="User" className={styles.memberAvatar} />
                  </div>
                  <span className={styles.memberNumber}>15</span>
                </div>
              </div>
              
              <div className={styles.messages}>
                <div className={styles.messageItem}>
                  <div className={styles.messageAvatar}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" className={styles.avatarImage} />
                  </div>
                  <div className={styles.messageContent}>
                    <h4 className={styles.messageSender}>Google Calendar</h4>
                    <div className={styles.eventNotification}>
                      <p className={styles.eventTitle}>Project Status Meeting</p>
                      <p className={styles.eventTime}>Today from 01:30-02:00 IST</p>
                    </div>
                    <div className={styles.reactions}>
                      <FaVolumeUp className={styles.reactionIcon} /> 6
                    </div>
                  </div>
                </div>
                
                <div className={styles.messageItem}>
                  <div className={`${styles.messageAvatar} ${styles.huddleAvatar}`}>
                    <FaUsers className={styles.huddleIcon} />
                  </div>
                  <div className={styles.messageContent}>
                    <div className={styles.huddleHeader}>
                      <h4 className={styles.messageSender}>A huddle is happening</h4>
                      <span className={styles.liveTag}>LIVE</span>
                    </div>
                    <p className={styles.huddleParticipants}>
                      Kriti Sanyal and five others are in it. <a href="#" className={styles.joinLink}>Join them</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatInterface;