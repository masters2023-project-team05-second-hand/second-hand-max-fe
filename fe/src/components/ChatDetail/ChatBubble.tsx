import styled from "styled-components";

export default function ChatBubble({
  isMine,
  content,
}: {
  isMine: boolean;
  content: string;
}) {
  return <Bubble $isMine={isMine}>{content}</Bubble>;
}

const Bubble = styled.div<{ $isMine: boolean }>`
  color: ${({ $isMine, theme: { color } }) =>
    $isMine ? color.accentText : color.neutralText};
  background-color: ${({ $isMine, theme: { color } }) =>
    $isMine ? color.accentPrimary : color.neutralBackgroundBold};
  max-width: 256px;
  border-radius: 16px;
  padding: 0.5rem 1rem;
  align-self: ${({ $isMine }) => ($isMine ? "flex-end" : "flex-start")};
`;
