import { ChatItem } from "@api/type";
import { TextBold, TextDefault, TextWeak } from "@styles/common";
import { convertPastTimestamp } from "@utils/time";
import { styled } from "styled-components";

type ChatListItemProps = {
  onClick: (chatItem: ChatItem) => void;
  chatItem: ChatItem;
};

export default function ChatListItem({ onClick, chatItem }: ChatListItemProps) {
  return (
    <StyledChatListItem onClick={() => onClick(chatItem)}>
      <UserImage src={chatItem.otherMember.profileImgUrl} />
      <ChatInfo>
        <div className="sub-info">
          <TextBold>{chatItem.otherMember.nickname}</TextBold>
          <TextWeak>
            {convertPastTimestamp(chatItem.message.lastSentTime)}
          </TextWeak>
        </div>
        <TextDefault>{chatItem.message.lastMessage}</TextDefault>
      </ChatInfo>
      <Badge>{chatItem.unreadMessageCount}</Badge>
      <Thumbnail src={chatItem.product.thumbnailUrl} />
    </StyledChatListItem>
  );
}

const StyledChatListItem = styled.li`
  display: flex;
  padding: 16px;
  gap: 8px;
  border-bottom: 1px solid ${({ theme: { color } }) => color.neutralBorder};

  &:hover {
    cursor: pointer;
    opacity: ${({ theme: { opacity } }) => opacity.hover};
  }
`;

const UserImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: ${({ theme: { radius } }) => radius[50]};
`;

const ChatInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;

  .sub-info {
    display: flex;
    gap: 4px;
    align-items: center;
  }
`;

const Badge = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  font: ${({ theme: { font } }) => font.displayDefault12};
  color: ${({ theme: { color } }) => color.neutralBackground};
  background-color: ${({ theme: { color } }) => color.accentPrimary};
  border-radius: ${({ theme: { radius } }) => radius[50]};
`;

const Thumbnail = styled.img`
  width: 48px;
  height: 48px;
  border: 1px solid ${({ theme: { color } }) => color.neutralBorder};
  border-radius: ${({ theme: { radius } }) => radius[8]};
`;
