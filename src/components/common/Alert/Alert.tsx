import { designSystem } from "@styles/designSystem";
import { ReactNode, useEffect, useRef, useState } from "react";
import { styled } from "styled-components";

type AlertType = {
  message: string;
  closeAlertHandler: () => void;
  buttons: ReactNode[];
};

export default function Alert({
  message,
  closeAlertHandler,
  buttons,
}: AlertType) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);

    const onOutsideClick = (e: MouseEvent) => {
      if (!modalRef.current?.contains(e.target as Node)) {
        closeAlertHandler();
      }
    };

    if (isOpen) {
      window.addEventListener("click", onOutsideClick);
    }

    return () => {
      window.removeEventListener("click", onOutsideClick);
    };
  }, [isOpen, closeAlertHandler]);

  return (
    <StyledAlert ref={modalRef}>
      <span>{message}</span>
      <ButtonWrapper>{...buttons}</ButtonWrapper>
    </StyledAlert>
  );
}

const StyledAlert = styled.dialog`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 24px 32px;
  width: 336px;
  height: 144px;
  box-sizing: border-box;
  border: none;
  border-radius: ${designSystem.radius[16]};
  box-shadow: 0px 4px 4px 0px #00000040;
  z-index: 1;
  font: ${designSystem.font.displayStrong16};
  color: ${designSystem.color.neutralTextStrong};
  background-color: ${designSystem.color.neutralBackground};
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 32px;
  margin-left: auto;
`;
