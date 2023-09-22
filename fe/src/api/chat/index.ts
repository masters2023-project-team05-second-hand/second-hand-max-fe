import { fetcher } from "@api/fetcher";
import { ChatList } from "@api/type";
import { CHAT_API_PATH } from "./constants";

export const getChatDetail = async (
  page: number = 0,
  option: {
    roomId: number;
    size: number;
  }
) => {
  const baseUrl = CHAT_API_PATH.chatList;
  const pathVariable = `?page=${page}&size=${option.size}&roomId=${option.roomId}`;

  const { data } = await fetcher.get<ChatList>(baseUrl + pathVariable);
  return data;
};

export const postNewChatRoom = async ({
  productId,
  firstMessage,
}: {
  productId: number;
  firstMessage: string;
}) => {
  const { data } = await fetcher.post<{ roomId: number }>(
    `${CHAT_API_PATH.createRoom}/${productId}`,
    { firstMessage }
  );

  return data;
};
