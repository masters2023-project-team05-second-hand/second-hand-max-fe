import React from "react";
import { styled } from "styled-components";
import { PLACE_HOLDER } from "./constants";
import { AddressInfo } from "@api/type";
import useAutoHeight from "@hooks/useAutoHeight";

export default function ProductRegisterContent({
  content,
  address,
  onChange,
}: {
  content?: string;
  address?: AddressInfo;
  onChange: (content: string) => void;
}) {
  const { ref: textAreaRef, onChange: onContentChange } =
    useAutoHeight<HTMLTextAreaElement>(onChange);

  return (
    <Content
      placeholder={PLACE_HOLDER.CONTENT(
        address?.name ?? PLACE_HOLDER.DEFAULT_PLACE
      )}
      value={content}
      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
        onContentChange(e.target.value)
      }
      ref={textAreaRef}
    />
  );
}

const Content = styled.textarea`
  color: ${({ theme: { color } }) => color.neutralTextStrong};
  font: ${({ theme: { font } }) => font.availableDefault16};
  min-height: 120px;
  border-radius: ${({ theme: { radius } }) => radius[8]};
  padding: 8px;

  &:focus {
    background-color: ${({ theme: { color } }) => color.neutralBackgroundBold};
  }
`;
