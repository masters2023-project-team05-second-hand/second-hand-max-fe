import { useDeleteProductQuery } from "@api/product/queries";
import { ReactComponent as DotsIcon } from "@assets/icon/dots.svg";
import { useNavigate } from "react-router-dom";
import MenuIndicator from "./common/Menu/MenuIndicator";

type ProductMoreButtonProps = {
  productId: string;
};

export default function ProductMoreButton({
  productId,
}: ProductMoreButtonProps) {
  const navigate = useNavigate();

  const { onDeleteProduct } = useDeleteProductQuery(productId);

  const moreButtonItems = [
    {
      name: "게시글 수정",
      onClick: () => {
        navigate(`/product-edit/${productId}`);
      },
    },
    {
      name: "판매 중 상태로 전환",
      onClick: () => {
        // Todo: 판매 상태 변경 api 붙이기
        console.log(`판매 중 ${productId}`);
      },
    },
    {
      name: "판매 완료 상태로 전환",
      onClick: () => {
        // Todo: 판매 상태 변경 api 붙이기
        console.log(`판매 완료 ${productId}`);
      },
    },
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
