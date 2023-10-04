import { fetcher } from "@api/fetcher";
import { ChatItem, ChatMessage } from "@api/type";
import { CHAT_API_PATH } from "./constants";

export const postNewChatRoom = async ({
  productId,
  senderId,
  content,
}: {
  productId: number;
  senderId: number;
  content: string;
}) => {
  const { data } = await fetcher.post<{ roomId: number }>(
    CHAT_API_PATH.chatroom,
    {
      productId,
      message: {
        senderId,
        content,
      },
    }
  );

  return data;
};

export const getChatDetail = async (roomId: number) => {
  const baseUrl = `${CHAT_API_PATH.chatroom}/messages`;
  const pathVariable = `?roomId=${roomId}`;

  const { data } = await fetcher.get<ChatMessage[]>(baseUrl + pathVariable);
  return data;
};

export const getChatList = async (productId?: number) => {
  const baseUrl = `${CHAT_API_PATH.chatroom}`;
  const pathVariable = productId ? `?productId=${productId}` : "";

  const { data } = await fetcher.get<ChatItem[]>(baseUrl + pathVariable);
  return data;
};
