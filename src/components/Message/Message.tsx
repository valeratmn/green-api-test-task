import cn from "classnames";
import styles from "./Message.module.css";
import { MessageProps } from "./Message.props";

const Message: React.FC<MessageProps> = ({
  timestamp,
  type,
  chatId,
  textMessage,
  senderName,
}) => {
  const formatter = new Intl.DateTimeFormat("ru", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  const formattedTime = formatter.format(new Date(timestamp * 1000));

  return (
    <div
      className={cn(styles.message, {
        [styles.incoming]: type === "incoming",
        [styles.outgoing]: type === "outgoing",
      })}
    >
      <div>
        {senderName && <div className={styles.name}>{senderName}</div>}
        <div className={styles.content}>
          <div>{textMessage}</div>
          <div className={styles.time}>{formattedTime}</div>
        </div>
      </div>
    </div>
  );
};

export default Message;
