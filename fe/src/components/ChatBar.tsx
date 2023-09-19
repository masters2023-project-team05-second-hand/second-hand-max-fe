import { styled } from "styled-components";
import Button from "./common/Buttons/Button";
import { HEIGHT, WIDTH } from "@styles/constants";
import { ReactComponent as SendIcon } from "@assets/icon/send.svg";
import { useState } from "react";

export default function ChatBar() {
  const [message, setMessage] = useState("");

  const onSendMessage = () => {
    // TODO: api 나오면 메세지 보내는 기능 추가
    console.log(message);
  };

  return (
    <StyledChatBar>
      <MessageInput
        placeholder="내용을 입력하세요"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button
        size={{ width: 32, height: 32 }}
        radius={50}
        leftIcon={<SendIcon />}
        color="accentText"
        backgroundColor="accentPrimary"
        onClick={onSendMessage}
      />
    </StyledChatBar>
  );
}

const StyledChatBar = styled.div`
  width: ${WIDTH.page}px;
  height: ${HEIGHT.navigationBar}px;
  display: flex;
  gap: 10px;
  position: fixed;
  bottom: 0;
  padding: 16px;
  box-sizing: border-box;
  background-color: ${({ theme: { color } }) => color.neutralBackgroundWeak};
  border-top: 1px solid ${({ theme: { color } }) => color.neutralBorder};
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
`;

const MessageInput = styled.input`
  flex: 1;
  height: 32px;
  padding: 4px 12px;
  border-radius: ${({ theme: { radius } }) => radius[16]};
  border: 1px solid ${({ theme: { color } }) => color.neutralBorder};
  background-color: ${({ theme: { color } }) => color.neutralBackground};
  box-sizing: border-box;
  font: ${({ theme: { font } }) => font.availableDefault16};
  color: ${({ theme: { color } }) => color.neutralText};
  caret-color: ${({ theme: { color } }) => color.accentPrimary};
`;
