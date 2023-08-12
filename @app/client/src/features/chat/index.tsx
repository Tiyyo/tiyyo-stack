import Page from "../../layout/Page";
import AppContext from "../../context/AppContext";
import { useContext } from "react";
import Chat from "./Chat";

function ChatContainer() {
  const { user } = useContext(AppContext);
  return (
    <Page>
      <h1>Here goes chat</h1>
      <Chat user={user} />
    </Page>
  );
}

export default ChatContainer;
