import { CHAT_API_PATH, STOMP_URL } from "@api/chat/constants";
import { Client } from "@stomp/stompjs";

export default function makeStompClient({
  roomId,
  onSubscribe,
  onDisconnect,
}: {
  roomId: number;
  onSubscribe: (message: string) => void;
  onDisconnect?: () => void;
}) {
  const destination = `${CHAT_API_PATH.destination}${roomId}`;
  const client = new Client({
    brokerURL: STOMP_URL,
    connectHeaders: {
      "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
      "Content-Type": "application/json",
    },
    onConnect: () => {
      client.subscribe(destination, (message) => onSubscribe(message.body));
    },
    onDisconnect,
  });

  return client;
}
