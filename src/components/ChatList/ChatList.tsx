import { useEffect, useState } from "react";
import axios from "axios";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import ChatListItem from "../ChatListItem/ChatListItem";
import { chatIdActions, unreadMessageActions } from "../../store";
import { Messages, UnreadMessage } from "./ChatList.props";

const ChatList: React.FC = () => {
  const [messages, setMessages] = useState<Messages[]>([]);
  // принимает данные из полученой очереди сообщений
  const [unreadMessages, setUnreadMessages] = useState<UnreadMessage>({
    receiptId: 0,
    timestamp: 0, // выбрал timestamp, а не idMessage, т.к. не во всех ответах есть idMessage
  });

  const loginData = useAppSelector((state) => state.auth); // данные авторизации из store
  const dispatch = useAppDispatch();

  // отправляет запрос на список входищих и исходящих сообщений
  const fetchData = async () => {
    const outGoingMessages = await axios.get(
      `https://api.green-api.com/waInstance${loginData.id}/LastOutgoingMessages/${loginData.apiToken}?minutes=43400`
    );

    const incomingMessages = await axios.get(
      `https://api.green-api.com/waInstance${loginData.id}/lastIncomingMessages/${loginData.apiToken}?minutes=43400`
    );

    // объединяет результат двух запросов в один массив и сортирует сообзения по времени.
    const listMessages = [
      ...incomingMessages.data,
      ...outGoingMessages.data,
    ].sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1));

    // оставит в списке чатов только уникальные чаты.
    const list = listMessages.reduce(
      (acc, chat) =>
        acc.map[chat.chatId]
          ? acc
          : ((acc.map[chat.chatId] = true), acc.list.push(chat), acc),
      {
        map: {},
        list: [],
      }
    ).list;

    // установит в state список уникальных чатов.
    setMessages(list);
  };

  // загружает список сообщений при открытии чата
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // проверяет наличие новых сообщений в очереди 
  const checkNewMessages = async () => {
    const response = await axios.get(`https://api.green-api.com/waInstance${loginData.id}/ReceiveNotification/${loginData.apiToken}`);

    if (response.data !== null) {
      setUnreadMessages({
        receiptId: response.data.receiptId,
        timestamp: response.data.body.timestamp,
      });
    } else {
      setUnreadMessages({
        receiptId: 0,
        timestamp: 0,
      });
    }
    return response;
  };

  // запускает проверку на наличие новых сообщений в очереди каждые 5 секунд
  useEffect(() => {
    const checkInterval = setInterval(checkNewMessages, 5000);
    dispatch(unreadMessageActions.setUnreadMessage(unreadMessages));
    return () => clearInterval(checkInterval);
  });

  const selectChatHandler = (id: string) => {
    dispatch(chatIdActions.setChatId(id));
  };

  const items = messages.map((message: Messages) => (
    <ChatListItem
      onSelectChat={() => selectChatHandler(message.chatId)}
      key={message.idMessage}
      chatId={message.chatId}
      textMessage={message.textMessage}
      idMessage={message.idMessage}
      timestamp={message.timestamp}
      senderName={message.senderName}
    />
  ));
  return <div className="chatList">{items}</div>;
};

export default ChatList;
