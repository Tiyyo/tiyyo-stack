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
import isDatesAreEquals from "../../utils/dates.are.equals";
import { ChatMessage } from "../../@types";
import Return from "../../assets/Return";
import { useNavigate } from "react-router-dom";

function Chat({ user, username = "Username" }) {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const navigate = useNavigate();

  // currently useless but setup for later
  // const { data } = useQuery("user", {
  //   enabled: true
  // });

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      username: "David",
      socketId: "123456789",
      userId: "123456789",
      message: "Hello",
      date: new Date("08-08-2021-12:00"),
      avatar: "https://picsum.photos/200/300"
    },
    {
      username: "Julien",
      socketId: "123456789",
      userId: "123456789",
      message: "Hi",
      date: new Date("08-09-2021-17:00"),
      avatar: "https://picsum.photos/200/300"
    },
    {
      username: "Julien",
      socketId: "123456789",
      userId: "123456789",
      message: "How are you?",
      date: new Date("08-09-2021-19:00"),
      avatar: "https://picsum.photos/200/300"
    },
    {
      username: "Julien",
      socketId: "123456789",
      userId: "123456789",
      message: "I'm fine",
      date: new Date("09-09-2021-19:00  "),
      avatar: "https://picsum.photos/200/300"
    },
    {
      username: "Julien",
      socketId: "123456789",
      userId: "123456789",
      message: "Thank you",
      date: new Date("10-09-2021-19:00"),
      avatar: "https://picsum.photos/200/300"
    },
    {
      username: "Julien",
      socketId: "123456789",
      userId: "123456789",
      message: "Thank you",
      date: new Date("10-09-2021-19:00"),
      avatar: "https://picsum.photos/200/300"
    },
    {
      username: "Julien",
      socketId: "123456789",
      userId: "123456789",
      message: "Thank you",
      date: new Date("10-09-2021-19:00"),
      avatar: "https://picsum.photos/200/300"
    },
    {
      username: "Julien",
      socketId: "123456789",
      userId: "123456789",
      message: "Thank you",
      date: new Date("10-09-2021-19:00"),
      avatar: "https://picsum.photos/200/300"
    },
    {
      username: "Julien",
      socketId: "123456789",
      userId: "123456789",
      message: "Thank you",
      date: new Date("10-09-2021-19:00"),
      avatar: "https://picsum.photos/200/300"
    }
  ]);

  function connect() {
    socket.connect();
    socket.emit("username", username, user?.userId);
  }

  function getHistory(history: ChatMessage[]) {
    // typescript doesn't know about toReversed() method yet
    const reversedHistory = history.toReversed();
    setMessages((previous: ChatMessage[]) => [...previous, ...reversedHistory]);
  }

  function handleClickReturn() {
    navigate(-1);
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

    function displayNewMessage(value: ChatMessage) {
      setMessages((previous: ChatMessage[]) => [...previous, value]);
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
      <header className="bg-primary-400 text-accent-200 flex h-14 items-center border-b border-opacity-30 px-4">
        <button type="button" onClick={handleClickReturn}>
          <Return />
        </button>
      </header>
      <main className="flex h-[80%] flex-grow flex-col justify-end overflow-hidden bg-[url('/chat_bg_2.svg')] py-2">
        <div className="flex flex-col gap-y-8 overflow-y-scroll py-3 pl-8 pr-3">
          {messages.map((message: ChatMessage, index: number) => {
            let sameDate = false;
            if (index >= 1) {
              sameDate = isDatesAreEquals(
                message.date,
                messages[index - 1].date
              );
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
      </main>

      <footer className="border-secondary-400 bg-primary-400 h-20 border-t border-opacity-30">
        <MyForm />
      </footer>
      {/* <ConnectionState isConnected={isConnected} /> */}
      {/* <Events events={messages} /> */}
      {/* <ConnectionManager user={user} /> */}
    </>
  );
}

export default Chat;
