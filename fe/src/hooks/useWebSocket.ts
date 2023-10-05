import { CHAT_API_PATH } from "@api/chat/constants";
import { Client } from "@stomp/stompjs";
import makeStompClient from "@utils/makeStompClient";
import { useEffect, useRef } from "react";

export default function useWebSocket({
  currentRoomId,
  memberId,
  appendNewChat,
}: {
  currentRoomId?: string;
  memberId: number;
  appendNewChat: (newChat: {
    message: string;
    sentTime: string;
    isMine: boolean;
  }) => void;
}) {
  const client = useRef<Client | null>(null);
  const pubMessage = (message: string) => {
    client.current?.publish({
      destination: `${CHAT_API_PATH.pub}/${currentRoomId}`,
      body: JSON.stringify({
        message,
      }),
    });
  };

  useEffect(() => {
    if (!currentRoomId) {
      return;
    }

    client.current = makeStompClient({
      roomId: currentRoomId,
      onSubscribe: (newChat) => {
        const { message, sentTime, senderId } = JSON.parse(newChat);
        appendNewChat({
          message,
          sentTime,
          isMine: senderId === memberId,
        });
      },
    });
    client.current.activate();

    return () => {
      client.current?.deactivate();
    };
  }, [currentRoomId, memberId, appendNewChat]);

  return { pubMessage };
}
