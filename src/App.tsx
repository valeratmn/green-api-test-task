import Auth from "./components/Auth/Auth";
import "./App.css";
import ChatList from "./components/ChatList/ChatList";
import Layout from "./components/Layout/Layout";
import NewChat from "./components/NewChat/NewChat";
import { useAppSelector } from "./store/hooks";
import ChatField from "./components/ChatField/ChatField";

const App: React.FC = () => {
  const loggedIn = useAppSelector((state) => state.auth.status);
  const selecedChat = useAppSelector((state) => state.chatId.chatId);

  return (
    <>
      {!loggedIn && (
        <Layout>
          <Auth />
        </Layout>
      )}
      {loggedIn && (
        <div className="chat">
          <div className="contacts">
            {loggedIn && <NewChat />}

            <ChatList />
          </div>
          {selecedChat && (
            <div className="chatfield">
              <ChatField />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default App;
