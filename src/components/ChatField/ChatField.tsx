import { useState, useEffect } from "react";
import axios from "axios";
import { useAppSelector } from "../../store/hooks";
import styles from "./ChatField.module.css";
import Message from "../Message/Message";
import { MessageProps } from "../Message/Message.props";

const ChatField: React.FC = () => {
  const [messageText, setMessageText] = useState<string>(""); // введеное сообщение в input
  const loginData = useAppSelector((state) => state.auth); // данные авторизации из store
  const chatId = useAppSelector((state) => state.chatId); 
  const unreadMessages = useAppSelector((state) => state.unreadMessage)
  const [messagesList, setMessagesList] = useState<MessageProps[]>([]); // список сообщений
  const [sending, setSending] = useState<boolean>(false);

  useEffect(() => {
    setChatMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatId]);

  // обновит список сообщений в чате после отправки сообщения
  useEffect(() => {
    const timer = setTimeout(setChatMessages, 700);
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sending]);

  // зашружает список сообщений в чате
  const setChatMessages = async () => {
    const response = await axios.post(
      `https://api.green-api.com/waInstance${loginData.id}/GetChatHistory/${loginData.apiToken}`,
      {
        chatId: chatId.chatId,
      }
    );
    setMessagesList(response.data);
  };

  // отправляет введеное сообщение 
  const sendMessage = async () => {
    setSending(false);
    await axios.post(
      `https://api.green-api.com/waInstance${loginData.id}/SendMessage/${loginData.apiToken}`,
      {
        chatId: chatId.chatId,
        message: messageText,
      }
    );
    setSending(true);
    setMessageText('');
  };

  // удаляет сообщение из очереди
  const deleteUnredMessage = async () => {
    await axios.delete(`https://api.green-api.com/waInstance${loginData.id}/DeleteNotification/${loginData.apiToken}/${unreadMessages.receiptId}`);
  }

  const messages = messagesList.map((message) => { 
    if (message.timestamp === unreadMessages.timestamp) {
      deleteUnredMessage();
    }
    return (
    <li className={styles.message} key={message.idMessage}>
      <Message
        textMessage={message.textMessage}
        chatId={message.chatId}
        timestamp={message.timestamp}
        type={message.type}
        senderName={message.senderName}
      />
    </li>
  )});

  const buttonDiabled = messageText.trim().length < 1

  return (
    <div className={styles.chatField}>
      {chatId && (
        <div className={styles.inputField}>
          <input
            placeholder="Input message"
            value={messageText}
            onChange={(e) => {
              setMessageText(e.target.value);
            }}
          />
          <button onClick={sendMessage} disabled={buttonDiabled}>Send</button>
        </div>
      )}
      <div className={styles.messagesField}>
        <div className={styles.message}>{messages}</div>
      </div>
    </div>
  );
};

export default ChatField;
