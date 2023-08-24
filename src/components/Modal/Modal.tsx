import React from "react";
import { ModalContent, ModalHeader, StyledModal } from "./Modal.style";

export default function Modal({
  header,
  content,
}: {
  header: React.ReactNode;
  content: React.ReactNode;
}) {
  return (
    <StyledModal>
      <ModalHeader>{header}</ModalHeader>
      <ModalContent>{content}</ModalContent>
    </StyledModal>
  );
}
