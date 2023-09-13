import { AddressInfo } from "@api/type";
import { ReactComponent as MapIcon } from "@assets/icon/map-pin-filled.svg";
import { HEIGHT, WIDTH } from "@styles/constants";
import { useAddressListValue } from "store";
import { styled } from "styled-components";
import { PLACE_HOLDER } from "./constants";
import MenuIndicator from "@components/common/Menu/MenuIndicator";

type ProductRegisterAddressProps = {
  selectedAddressId: number | null;
  address?: AddressInfo;
  onChange: (addressList: AddressInfo[], newAddressId: number) => void;
};

export default function ProductRegisterAddress({
  selectedAddressId,
  address,
  onChange,
}: ProductRegisterAddressProps) {
  const addressList = useAddressListValue();

  const addressMenuList = addressList.map((address) => ({
    id: address.id,
    name: address.name,
    onClick: () => {
      onChange(addressList, address.id);
    },
    isSelected: address.id === selectedAddressId,
  }));

  return (
    <Address>
      <MenuIndicator itemList={addressMenuList} withShadow={true}>
        <AddressButton>
          <MapIcon />
          <span>{address?.name ?? PLACE_HOLDER.address}</span>
        </AddressButton>
      </MenuIndicator>
    </Address>
  );
}

const Address = styled.div`
  position: fixed;
  bottom: 0;
`;

const AddressButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  position: fixed;
  bottom: 0;
  padding: 0 16px;
  box-sizing: border-box;
  width: ${WIDTH.page}px;
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
