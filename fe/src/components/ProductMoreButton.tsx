import {
  useDeleteProductQuery,
  useMutateProductStatus,
  useProductStatusesQuery,
} from "@api/product/queries";
import { ReactComponent as DotsIcon } from "@assets/icon/dots.svg";
import { useNavigate } from "react-router-dom";
import MenuIndicator from "./common/Menu/MenuIndicator";
import { MenuItemInfo } from "./common/Menu/type";

type ProductMoreButtonProps = {
  productId: string;
  currentStatusId: number;
};

export default function ProductMoreButton({
  productId,
  currentStatusId,
}: ProductMoreButtonProps) {
  const navigate = useNavigate();
  const currentPathname = window.location.pathname;

  // TODO: 쿼리키 관리 방식 개선 후 리팩토링
  const invalidateQueryKey =
    currentPathname === "/sales"
      ? ["getUserSalesProduct"]
      : currentPathname === "/wish"
      ? ["getUserWishlistProduct"]
      : ["getProduct"];

  const { data: productStatuses, isSuccess } = useProductStatusesQuery();
  const { onDeleteProduct } = useDeleteProductQuery({
    productId,
    invalidateQueryKey,
  });
  const { mutate: mutateProductStatus } = useMutateProductStatus({
    invalidateQueryKey,
  });

  const getProductStatusList = (): MenuItemInfo[] => {
    return isSuccess
      ? productStatuses
          .filter((status) => status.id !== currentStatusId)
          .map((productStatus) => ({
            name: `${productStatus.type} 상태로 전환`,
            onClick: () => {
              mutateProductStatus({
                productId,
                statusId: productStatus.id,
              });
            },
          }))
      : [];
  };

  const moreButtonItems = [
    {
      name: "게시글 수정",
      onClick: () => {
        navigate(`/product-edit/${productId}`);
      },
    },
    ...getProductStatusList(),
    {
      name: "삭제",
      onClick: () => {
        onDeleteProduct();
      },
      isWarning: true,
    },
  ];

  return (
    <MenuIndicator itemList={moreButtonItems}>
      <DotsIcon className="more" />
    </MenuIndicator>
  );
}
