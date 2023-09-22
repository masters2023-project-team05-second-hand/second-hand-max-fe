import { Chat } from "@api/type";
import { TextWeak } from "@styles/common";
import { formatKoreanDate } from "@utils/index";
import styled from "styled-components";
import ChatMessage from "./ChatBubble";

export default function DailyChat({
  date,
  chats,
}: {
  date: string;
  chats: Chat[];
}) {
  return (
    <StyledDailyChat>
      <TextWeak className="daily-date">{formatKoreanDate(date)}</TextWeak>
      {chats.map((chat) => (
        // TODO: createdTime 사용해서 해당 시간 첫번째 bubble에만 시간 표시하기
        // TODO: isRead 사용해서 읽음 처리하기
        <ChatMessage
          key={chat.id}
          content={chat.content}
          isMine={chat.isMine}
        />
      ))}
    </StyledDailyChat>
  );
}

const StyledDailyChat = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem 1rem;

  .daily-date {
    align-self: center;
  }
`;
