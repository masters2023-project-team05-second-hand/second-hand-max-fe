import { fetcher } from "@api/fetcher";
import { ChatItem, ChatMessage } from "@api/type";
import { CHAT_API_PATH } from "./constants";

export const postNewChatRoom = async ({
  productId,
  message,
}: {
  productId: number;
  message: string;
}) => {
  const { data } = await fetcher.post<{ roomId: number }>(
    CHAT_API_PATH.chatroom,
    {
      productId,
      message,
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

export const deleteChatRoom = async (roomId: number) => {
  const { data } = await fetcher.delete(`${CHAT_API_PATH.chatroom}/${roomId}`);
  return data;
};
