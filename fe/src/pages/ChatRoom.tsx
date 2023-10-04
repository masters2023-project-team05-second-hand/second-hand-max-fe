import { CHAT_API_PATH } from "@api/chat/constants";
import { useGetChatDetailQuery, useMakeRoomMutation } from "@api/chat/queries";
import { ChatMessage } from "@api/type";
import ChatBar from "@components/ChatRoom/ChatBar";
import ChatRoomTopBar from "@components/ChatRoom/ChatRoomTopBar";
import DailyChat, { Chat } from "@components/ChatRoom/DailyChat";
import ProductBanner from "@components/ChatRoom/ProductBanner";
import { ProductInfo } from "@components/ChatRoom/type";
import { useToast } from "@hooks/useToast";
import { Client } from "@stomp/stompjs";
import { BottomBar, Page, PageContent } from "@styles/common";
import { groupChatsByDate } from "@utils/index";
import makeStompClient from "@utils/makeStompClient";
import { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useMemberValue } from "store";

type ChatRoomLocationState = {
  product: ProductInfo;
  partner: {
    id: number;
    nickname: string;
    profileImgUrl: string;
  };
};

export default function ChatRoom() {
  const { roomId } = useParams();
  const numberRoomId = Number(roomId);

  const {
    state: { product, partner },
  }: { state: ChatRoomLocationState } = useLocation();
  const { id: memberId } = useMemberValue();
  const { toast } = useToast();

  const {
    data: allChatList,
    isSuccess,
    isError,
  } = useGetChatDetailQuery(numberRoomId);

  const { mutate: makeChatRoom } = useMakeRoomMutation({
    callback: (roomId: number) => setCurrentRoomId(roomId),
  });

  const [currentRoomId, setCurrentRoomId] = useState(numberRoomId);
  const [currentChats, setCurrentChats] = useState<Chat[]>([]);
  const client = useRef<Client | null>(null);

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

  useEffect(() => {
    // TODO: 비교해보기
    if (!currentRoomId) {
      return;
    }

    client.current = makeStompClient({
      roomId: currentRoomId,
      onSubscribe: (newChat) =>
        appendNewChat({
          newChat,
          isMine: false,
        }),
    });

    return () => {
      client.current?.deactivate();
    };
  }, [currentRoomId]);

  const sendMessage = (message: string) => {
    client.current?.publish({
      destination: `${CHAT_API_PATH}/${roomId}`,
      body: message,
    });
    appendNewChat({
      newChat: message,
      isMine: true,
    });
  };

  const sendFirstMessage = (message: string) => {
    makeChatRoom({
      productId: product.id,
      message,
    });
    appendNewChat({
      newChat: message,
      isMine: true,
    });
  };

  const appendNewChat = ({
    newChat,
    isMine,
  }: {
    newChat: string;
    isMine: boolean;
  }) =>
    setCurrentChats((prev) => [
      ...prev,
      {
        id: prev.length,
        content: newChat,
        sentTime: new Date().toISOString(),
        isMine,
      },
    ]);

  const chatList = groupChatsByDate(currentChats);
  const havePrevChats = !!chatList.length; // TODO 확인 필요
  const onMessageSubmit = havePrevChats ? sendMessage : sendFirstMessage;

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
