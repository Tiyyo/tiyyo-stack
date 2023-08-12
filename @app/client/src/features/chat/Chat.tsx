import { socket } from "../../socket";
import { useState, useEffect } from "react";
import { MyForm } from "./MyForm";
import { ConnectionManager } from "./ConnectionManager";
import { Events } from "./MyEvents";
import { ConnectionState } from "./ConnectionState";
import Page from "../../layout/Page";
import { useQuery } from "react-query";
import "./message.css";
import Message from "./Message";

function Chat({ user, username = "Username" }) {
  const [isConnected, setIsConnected] = useState(socket.connected);

  // currently useless but setup for later
  // const { data } = useQuery("user", {
  //   enabled: true
  // });

  const [messages, setMessages] = useState<any>([
    {
      id: 1,
      message: "Hello",
      date: new Date("08-08-2021-12:00"),
      avatar: "https://picsum.photos/200/300"
    },
    {
      id: 2,
      message: "Hi",
      date: new Date("08-09-2021-17:00")
    },
    {
      id: 3,
      message: "How are you?",
      date: new Date("08-09-2021-19:00")
    },
    {
      id: 4,
      message: "I'm fine",
      date: new Date("09-09-2021-19:00  ")
    },
    {
      id: 5,
      message: "Thank you",
      date: new Date("10-09-2021-19:00")
    }
  ]);

  console.log(messages);
  function connect() {
    socket.connect();
    socket.emit("username", username, user?.userId);
  }

  async function getHistory(history) {
    const reversedHistory = history.toReversed();
    setMessages((previous: any) => [...previous, ...reversedHistory]);
  }

  useEffect(() => {
    function onConnect() {
      connect();
      setIsConnected(true);
    }

    function onDisconnect() {
      socket.disconnect();
      setIsConnected(false);
    }

    function displayNewMessage(value: any) {
      console.log(value);
      setMessages((previous: any) => [...previous, value]);
    }
    if (user?.userId) {
      socket.emit("username", username, user.userId);
    }
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("message_has_been_sent", displayNewMessage);
    socket.on("history", getHistory);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("message_has_been_sent", displayNewMessage);
    };
  }, [user?.userId]);

  return (
    <>
      {/* <ConnectionState isConnected={isConnected} /> */}
      {/* <Events events={messages} /> */}
      {/* <ConnectionManager user={user} /> */}
      <div className="h-screen w-full overflow-hidden">
        <img src="/chat_bg.svg" className="re absolute top-0 object-cover" />
        <div className=" mx-auto mt-6 flex h-96 w-80 flex-col gap-y-1.5 rounded-xl border  px-3 py-3 shadow-sm">
          {messages.map((message: any, index: number) => {
            let sameDate = false;
            if (index >= 1) {
              const date1 = [
                new Date(message.date).getDate(),
                new Date(message.date).getMonth(),
                new Date(message.date).getFullYear()
              ].toString();

              const date2 = [
                new Date(messages[index - 1].date).getDate(),
                new Date(messages[index - 1].date).getMonth(),
                new Date(messages[index - 1].date).getFullYear()
              ].toString();
              if (date1 === date2) {
                sameDate = true;
              }
            }
            return (
              <Message
                messageInfos={message}
                user={user}
                displayDateMessage={sameDate}
              />
            );
          })}
        </div>
      </div>
      <MyForm />
    </>
  );
}

export default Chat;
