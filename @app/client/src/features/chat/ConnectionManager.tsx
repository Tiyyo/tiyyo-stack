import { socket } from "../../socket";

export function ConnectionManager({ user, username = "Username" }) {
  function connect() {
    socket.connect();
    socket.emit("username", username, user.userId);
  }

  function disconnect() {
    socket.disconnect();
  }

  return (
    <>
      <button className="text-red" onClick={connect}>
        Connect
      </button>
      <button onClick={disconnect}>Disconnect</button>
    </>
  );
}
