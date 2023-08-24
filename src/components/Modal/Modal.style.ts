import styled from "styled-components";

export const StyledModal = styled.div`
  width: 320px;
  height: 700px;
  background-color: ${({ theme: { color } }) => color.neutralBackground};
  border-radius: ${({ theme: { radius } }) => radius[16]};
`;

export const ModalHeader = styled.header`
  height: 5%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
`;

export const ModalContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const HeadlineText = styled.h1`
  font: ${({ theme: { font } }) => font.displayStrong20};
  color: ${({ theme: { color } }) => color.neutralTextStrong};
`;

export const ListPanel = styled.ul`
  width: 100%;
  max-height: 600px;
  padding: 0px 24px;
  overflow: hidden;
  overflow-y: scroll;

  li:not(:last-child) {
    border-bottom: 1px solid ${({ theme: { color } }) => color.neutralBorder};
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ListItem = styled.li<{ $active: boolean }>`
  font: ${({ $active, theme: { font } }) =>
    $active ? font.availableStrong16 : font.availableDefault16};
  color: ${({ $active, theme: { color } }) =>
    $active ? color.neutralTextStrong : color.neutralText};
  padding: 16px 0px;
`;
