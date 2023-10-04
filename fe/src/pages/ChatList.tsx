import { useGetChatListQuery } from "@api/chat/queries";
import { ChatItem } from "@api/type";
import ChatListItem from "@components/ChatList/ChatListItem";
import NavigationBar from "@components/NavigationBar";
import { SubInfo } from "@components/ProductDetail/common.style";
import TopBar from "@components/TopBar";
import { Error, Loading } from "@components/common/Guide";
import { ROUTE_PATH } from "@router/constants";
import { Main, Page, PageContent } from "@styles/common";
import { useNavigate, useParams } from "react-router-dom";

export default function ChatList() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const numberProductId = Number(productId);

  const {
    data: chatList,
    isSuccess,
    isLoading,
    isError,
  } = useGetChatListQuery(numberProductId);

  const onClickItem = (id: string, chatItem: ChatItem) => {
    navigate(`${ROUTE_PATH.chatting}/${id}`, {
      state: {
        product: chatItem.product,
        partner: chatItem.otherMember,
      },
    });
  };

  return (
    <Page>
      <TopBar
        title="채팅"
        backgroundColor="neutralBackgroundBlur"
        isWithBorder={true}
      />
      <PageContent>
        {isSuccess && (
          <>
            {chatList.length > 0 ? (
              chatList.map((item) => (
                <ChatListItem
                  key={item.roomId}
                  onClick={onClickItem}
                  chatItem={item}
                />
              ))
            ) : (
              <Main>
                <SubInfo>채팅 목록이 없습니다</SubInfo>
              </Main>
            )}
          </>
        )}
        {isLoading && (
          <Loading
            messages={[
              "채팅 목록을 불러오는 중입니다...",
              "새로고침을 하지 마세요!",
            ]}
          />
        )}
        {isError && (
          <Error
            messages={[
              "채팅 목록 조회에 실패했습니다.",
              "새로고침을 하거나 다시 시도해주세요.",
            ]}
          />
        )}
      </PageContent>
      <NavigationBar />
    </Page>
  );
}
