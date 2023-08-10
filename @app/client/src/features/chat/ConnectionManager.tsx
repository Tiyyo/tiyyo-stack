import { socket } from "../../socket";

export function ConnectionManager() {
  const user = "Steeve";

  function connect() {
    socket.connect();
    socket.emit("username", user, "userId");
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
