import { FC } from 'react'
import styles from './ChatListItem.module.css'
import { Messages } from '../ChatList/ChatList.props';

const ChatListItem: FC<Messages> = ({ chatId, textMessage, timestamp, onSelectChat }) => {
  const time = new Date(timestamp * 1000).toLocaleDateString();

  return (
      <div className={styles.chatItem} onClick={onSelectChat} >
        <div className={styles.userChat}>
          <span className={styles.userName}>{chatId}</span>
          <span className={styles.lastMessage}>{textMessage}</span>
        </div>
        <div className={styles.sidebar}>
          <span className={styles.timeMessage}>{`${time}`}</span>
        </div>
      </div>
  );
};

export default ChatListItem;