import { ListItem, ListPanel } from "@components/Modal/Modal.style";
import { AddressInfo } from "api/type";
import { addresses1 } from "mocks/data/address";
import { useState } from "react";
import { useAddressList, useCurrentAddressId } from "store";
import styled from "styled-components";

export default function AddressSearch({
  userAddressIDs,
  closeAddressSearch,
}: {
  userAddressIDs: number[];
  closeAddressSearch: () => void;
}) {
  const [addresses, setAddresses] = useAddressList();
  const [, setCurrentUserAddressId] = useCurrentAddressId();

  const onAddAddress = (item: AddressInfo) => {
    const isMaxAddressCount = addresses.length === 2;
    const isAlreadyAdded = addresses.some(({ id }) => id === item.id);

    if (isAlreadyAdded || isMaxAddressCount) return;

    setAddresses([...addresses, item]);
    setCurrentUserAddressId(item.id);
  };

  // TODO: 동네 검색/전체 동네 조회 요청
  const [allAddressList] = useState(addresses1.addresses);
  // const [searchKeyword, setSearchKeyword] = useState<string>("");

  return (
    <>
      <SearchBar placeholder="동명(읍, 면)으로 검색(ex. 서초동)" />
      <ListPanel>
        {allAddressList.map(({ id, name }) => (
          <ListItem
            key={id}
            $active={userAddressIDs.includes(id)}
            onClick={() => {
              onAddAddress({ id, name });
              closeAddressSearch();
            }}>
            <span>{name}</span>
          </ListItem>
        ))}
      </ListPanel>
    </>
  );
}

const SearchBar = styled.input`
  width: 100%;
  height: 40px;
  padding: 8px;
  border-radius: ${({ theme: { radius } }) => radius[8]};
  background-color: ${({ theme: { color } }) => color.neutralBackgroundBold};

  &::placeholder {
    font: ${({ theme: { font } }) => font.availableDefault16};
    color: ${({ theme: { color } }) => color.neutralTextWeak};
  }
`;
