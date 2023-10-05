import { useGetChatDetailQuery, useMakeRoomMutation } from "@api/chat/queries";
import { ChatMessage } from "@api/type";
import ChatBar from "@components/ChatRoom/ChatBar";
import ChatRoomTopBar from "@components/ChatRoom/ChatRoomTopBar";
import DailyChat, { Chat } from "@components/ChatRoom/DailyChat";
import ProductBanner from "@components/ChatRoom/ProductBanner";
import { ChatRoomLocationState } from "@components/ChatRoom/type";
import { useToast } from "@hooks/useToast";
import useWebSocket from "@hooks/useWebsocket";
import { BottomBar, Page, PageContent } from "@styles/common";
import { groupChatsByDate } from "@utils/index";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useMemberValue } from "store";

export default function ChatRoom() {
  const { roomId } = useParams();
  const {
    state: { product, partner },
  }: { state: ChatRoomLocationState } = useLocation();
  const { id: memberId } = useMemberValue();
  const { toast } = useToast();

  const [currentRoomId, setCurrentRoomId] = useState(roomId);
  const [currentChats, setCurrentChats] = useState<Chat[]>([]);

  const {
    data: allChatList,
    isSuccess,
    isError,
  } = useGetChatDetailQuery(roomId ?? "");

  useEffect(() => {
    if (isSuccess) {
      setCurrentChats(
        allChatList.map((chat: ChatMessage, index) => {
          return {
            id: index,
            content: chat.content,
            sentTime: chat.sentTime,
            isMine: chat.senderId === memberId,
          };
        })
      );
    }
    if (isError) {
      toast({
        title: "이전 채팅 불러오기 실패",
        message:
          "이전 채팅 내용을 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.",
        type: "error",
      });
    }
  }, [allChatList, isSuccess, memberId, isError, toast]);

  const appendNewChat = useCallback(
    ({
      message,
      sentTime,
      isMine,
    }: {
      message: string;
      sentTime: string;
      isMine: boolean;
    }) =>
      setCurrentChats((prev) => [
        ...prev,
        {
          id: prev.length,
          content: message,
          sentTime,
          isMine,
        },
      ]),
    []
  );

  const { onPostNewChatRoom } = useMakeRoomMutation({
    productId: product.id,
    callback: ({ roomId, message, sentTime }) => {
      setCurrentRoomId(roomId);
      appendNewChat({
        message,
        sentTime,
        isMine: true,
      });
    },
  });

  const { pubMessage } = useWebSocket({
    currentRoomId: roomId,
    memberId,
    appendNewChat,
  });

  const chatList = groupChatsByDate(currentChats);
  const havePrevChats = !!chatList.length;
  const onMessageSubmit = havePrevChats ? pubMessage : onPostNewChatRoom;

  return (
    <Page>
      <ChatRoomTopBar partnerName={partner.nickname} roomId={currentRoomId} />
      <ProductBanner product={product} />
      <PageContent>
        {chatList.map((dailyChatList) => (
          <DailyChat
            key={dailyChatList.date}
            date={dailyChatList.date}
            chats={dailyChatList.chats}
          />
        ))}
      </PageContent>
      <BottomBar>
        <ChatBar onMessageSubmit={onMessageSubmit} />
      </BottomBar>
    </Page>
  );
}
