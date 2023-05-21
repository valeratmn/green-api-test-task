export interface MessageProps {
  idMessage?: string;
  timestamp: number;
  type: string;
  chatId: string;
  textMessage: string;
  senderName?: string;
}
