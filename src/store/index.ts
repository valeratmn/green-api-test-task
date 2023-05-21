import { configureStore, PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface authStateProps {
  status: string;
  id: string;
  apiToken: string;
}

const initialAuthState: authStateProps = {
  status: "",
  id: "",
  apiToken: "",
};

const userAuthSlise = createSlice({
  name: "userAuth",
  initialState: initialAuthState,
  reducers: {
    loggedIn: (
      state: authStateProps,
      action: PayloadAction<authStateProps>
    ) => {
      state.status = action.payload.status;
      state.id = action.payload.id;
      state.apiToken = action.payload.apiToken;
    },
  },
});

export interface chatIdProps {
  chatId: string;
}

const initialChatIdState = {
  chatId: null,
};

const chatIdSlice = createSlice({
  name: "chatId",
  initialState: initialChatIdState,
  reducers: {
    setChatId: (state, action) => {
      state.chatId = action.payload;
    },
  },
});

export interface IUnreadMessage {
  receiptId: number;
  timestamp: number;
}

const initialUnreadMessageState: IUnreadMessage = {
  receiptId: 0,
  timestamp: 0,
};

const unreadMessageSlice = createSlice({
  name: "unreadMessage",
  initialState: initialUnreadMessageState,
  reducers: {
    setUnreadMessage: (state, action) => {
      state.receiptId = action.payload.receiptId;
      state.timestamp = action.payload.timestamp;
    },
  },
});

const store = configureStore({
  reducer: {
    auth: userAuthSlise.reducer,
    chatId: chatIdSlice.reducer,
    unreadMessage: unreadMessageSlice.reducer,
  },
});

export const authActions = userAuthSlise.actions;
export const chatIdActions = chatIdSlice.actions;
export const unreadMessageActions = unreadMessageSlice.actions;

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
