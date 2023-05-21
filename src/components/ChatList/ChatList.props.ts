export interface Messages {
  idMessage: string;
  timestamp: number;
  chatId: string;
  textMessage: string;
  onSelectChat: any;
  senderName?: "string";
}

export interface UnreadMessage {
  receiptId: number;
  timestamp: number;
}