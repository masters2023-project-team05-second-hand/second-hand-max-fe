import { putUserAddress } from "@api/user";
import { useToast } from "@hooks/useToast";
import { useMutation } from "@tanstack/react-query";
import { isSameItems } from "@utils/index";
import { useRef, useState } from "react";
import { useAddressList } from "store";
import Modal from "../Modal";
import AddressIndicatorList from "./Content/AddressIndicatorList";
import AddressSearch from "./Content/AddressSearch";

export default function AddressModal({
  closeHandler,
}: {
  closeHandler: () => void;
}) {
  const { toast } = useToast();

  const [addresses, setAddresses] = useAddressList();
  const userAddressIDs = addresses.map(({ id }) => id);

  const prevAddresses = useRef(addresses);
  const prevAddressIDs = prevAddresses.current.map(({ id }) => id);

  const [isSearchingAddress, setIsSearchingAddress] = useState<boolean>(false);
  const openAddressSearch = () => setIsSearchingAddress(true);
  const closeAddressSearch = () => setIsSearchingAddress(false);

  const { mutate: mutateUserAddresses } = useMutation(putUserAddress, {
    onSuccess: () =>
      toast({
        type: "success",
        title: "동네 설정 완료",
        message: "동네 설정이 완료되었습니다.",
      }),
    onError: () => {
      toast({
        type: "error",
        title: "동네 설정 실패",
        message: "동네 설정에 실패했습니다. 잠시 후 다시 시도해주세요.",
      }),
        setAddresses(prevAddresses.current);
    },
  });

  const addressSearchHeader = {
    backHandler: closeAddressSearch,
    closeHandler,
  };

  const addressIndicatorListHeader = {
    title: "동네 설정",
    closeHandler: () => {
      !isSameItems(userAddressIDs, prevAddressIDs) &&
        mutateUserAddresses(userAddressIDs);
      closeHandler();
    },
  };

  const currentHeader = isSearchingAddress
    ? addressSearchHeader
    : addressIndicatorListHeader;

  const currentContent = isSearchingAddress ? (
    <AddressSearch {...{ closeAddressSearch, userAddressIDs }} />
  ) : (
    <AddressIndicatorList openAddressSearch={openAddressSearch} />
  );

  return <Modal header={currentHeader} content={currentContent} />;
}
