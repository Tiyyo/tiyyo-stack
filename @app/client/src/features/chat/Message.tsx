import { useEffect, useState } from "react";

function Message({ messageInfos, user, displayDateMessage }) {
  const ownMessageVariant = "message owned bg-accent-100 self-end pr-8";
  const receivedMessageVariant = "message received bg-primary-300 self-start";

  const [messageDate, setMessageDate] = useState(new Date());

  const messageTimeFormatted = new Intl.DateTimeFormat("fr-FR", {
    hour: "numeric",
    minute: "numeric",
    timeZone: "Europe/Paris"
  }).format(new Date(messageDate));

  const messageDateFormatted = new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(new Date(messageDate));

  // to ensure to format a date even if the date is not defined
  useEffect(() => {
    if (!messageInfos.date) return;
    setMessageDate(messageInfos?.date);
  }, [messageInfos.date]);

  return (
    <>
      {!displayDateMessage && (
        <p className="text-secondary-500 mx-auto w-fit rounded-lg px-2 py-1.5 text-center text-xs opacity-80">
          {messageDateFormatted}
        </p>
      )}
      <div
        className={
          messageInfos.userId === user?.userId
            ? ownMessageVariant
            : receivedMessageVariant
        }
      >
        {messageInfos.message}
        <p className="text-right text-xs opacity-30">{messageTimeFormatted}</p>
      </div>
    </>
  );
}

export default Message;
