import { useProductStatusesQuery } from "@api/product/queries";
import { ReactComponent as ChevronDownIcon } from "@assets/icon/chevron-down.svg";
import ProductStatusModal from "@components/Modal/ProductStatusModal/ProductStatusModal";
import Button from "@components/common/Buttons/Button";
import { useState } from "react";
import styled from "styled-components";

export default function ProductStatus({
  currentStatusId,
}: {
  currentStatusId: number;
}) {
  const { data: productStatuses, isSuccess } = useProductStatusesQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openHandler = () => setIsModalOpen(true);
  const closeHandler = () => setIsModalOpen(false);

  const currentStatus = productStatuses?.find(
    (status) => status.id === currentStatusId
  );

  return (
    <>
      <Button
        size={{ width: 108, height: 32 }}
        radius={8}
        borderColor="neutralBorder"
        color="neutralTextStrong"
        rightIcon={<ChevronDownIcon />}
        onClick={openHandler}>
        <StatusText>{currentStatus?.type}</StatusText>
      </Button>
      {isModalOpen && isSuccess && (
        <ProductStatusModal {...{ closeHandler, productStatuses }} />
      )}
    </>
  );
}

const StatusText = styled.span`
  width: 56px;
  display: flex;
`;