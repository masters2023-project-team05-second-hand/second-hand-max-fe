import { useNavigate } from "react-router-dom";
import MenuIndicator from "./common/Menu/MenuIndicator";
import { ReactComponent as DotsIcon } from "@assets/icon/dots.svg";
import { deleteProduct } from "@api/product";
import { useToast } from "@hooks/useToast";
import { useMutation } from "@tanstack/react-query";

type ProductMoreButtonProps = {
  productId: number;
};

export default function ProductMoreButton({
  productId,
}: ProductMoreButtonProps) {
  const navigate = useNavigate();
  const { toast } = useToast();

  const deleteProductMutation = useMutation(deleteProduct);

  const onDeleteProduct = (id: number) => {
    deleteProductMutation.mutate(id, {
      onSuccess: () => {
        toast({
          type: "success",
          title: "상품 삭제 성공",
          message: "상품 삭제에 성공했습니다.",
        });
      },
      onError: () => {
        toast({
          type: "error",
          title: "상품 삭제 실패",
          message: "상품 삭제에 실패했습니다. 잠시 후 다시 시도해주세요.",
        });
      },
    });
  };

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
        onDeleteProduct(productId);
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
