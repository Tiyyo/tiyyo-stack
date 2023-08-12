import Page from "../../layout/Page";
import AppContext from "../../context/AppContext";
import { useContext } from "react";
import Chat from "./Chat";

function ChatContainer() {
  const { user } = useContext(AppContext);
  return (
    <div className="bg-primary-200 border-red flex h-screen min-h-screen flex-col justify-between border">
      <Chat user={user} />
    </div>
  );
}

export default ChatContainer;
