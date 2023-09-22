import { CHAT_API_PATH } from "@api/chat/constants";
import {
  useChatDetailInfiniteQuery,
  useMakeRoomMutation,
} from "@api/chat/queries";
import ChatBar from "@components/ChatDetail/ChatBar";
import ChatMoreButton from "@components/ChatDetail/ChatMoreButton";
import DailyChat from "@components/ChatDetail/DailyChat";
import ProductBanner from "@components/ChatDetail/ProductBanner";
import TopBar from "@components/TopBar";
import BackButton from "@components/common/Buttons/BackButton";
import { useIntersect } from "@hooks/useIntersect";
import { Client } from "@stomp/stompjs";
import { BottomBar, Page, PageContent, Target } from "@styles/common";
import makeStompClient from "@utils/makeStompClient";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

type ChatRoomLocationState = {
  productId: number;
  productInfo: {
    title: string;
    price: number;
    thumbnailImgUrl: string;
  };
  partner: {
    id: number;
    nickname: string;
    profileImgUrl: string;
  };
};

// TODO: ChatList 페이지에서 라우팅하는 경우도 반영해야 함
export default function ChatRoom() {
  const { roomId } = useParams();

  const {
    state: { productId, productInfo, partner },
  }: { state: ChatRoomLocationState } = useLocation();

  const [currentRoomId, setCurrentRoomId] = useState(Number(roomId));
  const client = useRef<Client | null>(null);

  const {
    data: chatDetail,
    // status,
    isFetching,
    hasNextPage,
    fetchNextPage,
  } = useChatDetailInfiniteQuery({ roomId: currentRoomId });

  const ref = useIntersect(() => {
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  });

  const { mutate: makeChatRoom } = useMakeRoomMutation({
    callback: (roomId: number) => setCurrentRoomId(roomId),
  });

  useEffect(() => {
    client.current = makeStompClient({
      roomId: currentRoomId,
      onSubscribe: (newChat) =>
        appendNewChat({
          newChat,
          isMine: false,
        }),
      onDisconnect: () => console.log("unsubscribe 해야함"),
    });
  }, [currentRoomId]);

  // TODO: currentChats initialize 함수 분리하기
  const todayDateKey = new Date().toISOString().slice(0, 10);
  const lastChatDateKey = chatDetail?.pages[0].dailyChats[0].date;
  const hasTodayChat = todayDateKey === lastChatDateKey;
  const todayChats = hasTodayChat
    ? chatDetail?.pages[0].dailyChats[
        chatDetail?.pages[0].dailyChats.length - 1
      ].chats
    : [];

  const [currentChats, setCurrentChats] = useState(todayChats ?? []);

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
      productId,
      firstMessage: message,
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
        id: prev.length + 1,
        content: newChat,
        createdTime: new Date().toISOString(),
        isMine,
      },
    ]);

  const allChatList = chatDetail?.pages.map((page) => page.dailyChats);
  const hasBeforeChat = chatDetail && chatDetail.pages.length > 1;
  const onMessageSubmit = hasBeforeChat ? sendMessage : sendFirstMessage;

  return (
    <Page>
      <ChatRoomTopBar partnerName={partner.nickname} />
      <ProductBanner productInfo={productInfo} />
      <PageContent>
        <Target ref={ref} />
        {allChatList?.map((chatList) =>
          chatList.map((dailyChatList) => (
            <DailyChat
              key={dailyChatList.date}
              date={dailyChatList.date}
              chats={dailyChatList.chats}
            />
          ))
        )}
        <DailyChat date={todayDateKey} chats={currentChats} />
      </PageContent>
      <BottomBar>
        <ChatBar onMessageSubmit={onMessageSubmit} />
      </BottomBar>
    </Page>
  );
}

function ChatRoomTopBar({ partnerName }: { partnerName: string }) {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <TopBar
      title={partnerName}
      backgroundColor="neutralBackgroundBlur"
      isWithBorder={true}
      leftBtn={<BackButton color="neutralText" onClick={goBack} />}
      rightBtn={<ChatMoreButton />}
    />
  );
}

// const mockChatItem = {
//   chatList: [
//     {
//       date: "2021-08-01",
//       chats: [
//         {
//           id: 1,
//           content: "안녕하세요! 한 가지 궁금한 점이 있어서 챗 드려요",
//           createdAt: "2021-08-01T12:00:00",
//           isMine: false,
//         },
//       ],
//     },
//     {
//       date: "2021-08-02",
//       chats: [
//         {
//           id: 2,
//           content: "네 안녕하세요! 답장이 늦어서 죄송합니다.",
//           createdAt: "2021-08-02T12:00:00",
//           isMine: true,
//         },
//         {
//           id: 3,
//           content: "어떤 점이 궁금하신가욤?",
//           createdAt: "2021-08-02T12:00:01",
//           isMine: true,
//         },
//         {
//           id: 4,
//           content: "아이폰 12 256GB이 맞나요? 사진이 귀여운 강아지인데요?",
//           createdAt: "2021-08-02T12:30:00",
//           isMine: false,
//         },
//       ],
//     },
//     {
//       date: "2021-08-03",
//       chats: [
//         {
//           id: 5,
//           content: "네 강아지가 귀여워서 사진을 넣었어요!",
//           createdAt: "2021-08-03T12:00:00",
//           isMine: false,
//         },
//       ],
//     },
//     {
//       date: "2021-08-04",
//       chats: [
//         {
//           id: 6,
//           content: "네 안녕하세요! 답장이 늦어서 죄송합니다.",
//           createdAt: "2021-08-04T12:00:00",
//           isMine: true,
//         },
//         {
//           id: 7,
//           content: "어떤 점이 궁금하신가욤?",
//           createdAt: "2021-08-04T12:00:01",
//           isMine: true,
//         },
//         {
//           id: 8,
//           content: "아이폰 12 256GB이 맞나요? 사진이 귀여운 강아지인데요?",
//           createdAt: "2021-08-04T12:30:00",
//           isMine: false,
//         },
//         {
//           id: 9,
//           content: "네 안녕하세요! 답장이 늦어서 죄송합니다.",
//           createdAt: "2021-08-04T12:00:00",
//           isMine: true,
//         },
//         {
//           id: 10,
//           content: "어떤 점이 궁금하신가욤?",
//           createdAt: "2021-08-04T12:00:01",
//           isMine: true,
//         },
//         {
//           id: 11,
//           content: "아이폰 12 256GB이 맞나요? 사진이 귀여운 강아지인데요?",
//           createdAt: "2021-08-04T12:30:00",
//           isMine: false,
//         },
//       ],
//     },
//   ],
// };
