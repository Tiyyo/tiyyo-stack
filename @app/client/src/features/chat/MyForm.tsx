import { useRef, useState } from "react";
import { socket } from "../../socket";

export function MyForm() {
  const [value, setValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);
  const avatar = "";

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    socket.timeout(5000).emit("user_sent_message", value, avatar, () => {
      setIsLoading(false);
    });
    formRef.current?.reset();
  }

  return (
    <form onSubmit={onSubmit} ref={formRef}>
      <input onChange={(e) => setValue(e.target.value)} />
      <button type="submit" disabled={isLoading}>
        {" "}
        Submit{" "}
      </button>
    </form>
  );
}
