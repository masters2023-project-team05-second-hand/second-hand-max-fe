import styled from "styled-components";
import { HEIGHT } from "./constants";

export const Page = styled.div`
  position: relative;
  margin: 0 auto;
  max-width: 393px;
  min-height: 100vh;
  height: 100vh;
  overflow: scroll;
  background-color: ${({ theme: { color } }) => color.neutralBackground};
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  padding-bottom: ${HEIGHT.navigationBar}px;
  box-sizing: border-box;

  &::-webkit-scrollbar {
    display: none;
  }
`;
