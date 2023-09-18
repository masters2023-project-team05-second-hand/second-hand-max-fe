import { useProductStatusesQuery } from "@api/product/queries";
import { useToast } from "@hooks/useToast";
import { useEffect } from "react";
import { IS_RESERVATION_ID, IS_SELLING_ID } from "store/constants";
import { styled } from "styled-components";

type ProductStatusProps = {
  id: number;
};

export default function ProductStatus({ id }: ProductStatusProps) {
  const { data, isError } = useProductStatusesQuery();
  const { toast } = useToast();

  useEffect(() => {
    if (isError) {
      toast({
        type: "error",
        title: "상품 상태 목록 조회 실패",
        message: "상품 상태 목록 조회에 실패했습니다.",
      });
    }
  }, [isError, toast]);

  const statusType = data?.find((item) => item.id === id)?.type;
  const isSelling = id === IS_SELLING_ID;

  return (
    <>
      {!isSelling && statusType && <Status $statusId={id}>{statusType}</Status>}
    </>
  );
}

const Status = styled.div<{ $statusId: number }>`
  box-sizing: border-box;
  padding: 3px 6px;
  border-radius: ${({ theme: { radius } }) => radius[8]};
  background-color: ${({ theme: { color }, $statusId }) =>
    $statusId === IS_RESERVATION_ID
      ? color.accentSecondary
      : color.neutralBorderStrong};
  color: ${({ theme: { color } }) => color.accentText};
  font: ${({ theme: { font } }) => font.displayDefault12};
`;
