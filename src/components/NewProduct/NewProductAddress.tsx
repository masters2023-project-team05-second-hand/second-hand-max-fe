import { ReactComponent as MapIcon } from "@assets/icon/map-pin-filled.svg";
import { HEIGHT, WIDTH } from "@styles/constants";
import { useAtom } from "jotai";
import { styled } from "styled-components";
import { addressAtom } from "./store";

export default function NewProductAddress() {
  const [address, setAddress] = useAtom(addressAtom);

  const onOpenAddressModal = () => {
    // Todo: 동네 검색 모달 띄워야함
    console.log("동네 모달 열림");

    setAddress({ id: 2, name: "역삼 2동" });
  };

  return (
    <StyledAddressButton onClick={onOpenAddressModal}>
      <MapIcon />
      <span>{address.name}</span>
    </StyledAddressButton>
  );
}

const StyledAddressButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  position: fixed;
  bottom: 0;
  padding: 0 16px;
  box-sizing: border-box;
  width: ${WIDTH.app}px;
  height: ${HEIGHT.navigationBar}px;
  border-top: ${({ theme: { color } }) => `1px solid ${color.neutralBorder}`};
  background-color: ${({ theme: { color } }) => color.neutralBackgroundWeak};
  color: ${({ theme: { color } }) => color.neutralTextStrong};
  font: ${({ theme: { font } }) => font.availableDefault16};

  &:hover {
    opacity: ${({ theme: { opacity } }) => opacity.press};
  }

  &:active {
    opacity: ${({ theme: { opacity } }) => opacity.disabled};
  }
`;
