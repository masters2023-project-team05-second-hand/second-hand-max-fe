import { useDeleteProductQuery } from "@api/product/queries";
import { ReactComponent as DotsIcon } from "@assets/icon/dots.svg";
import Alert from "@components/common/Alert/Alert";
import Button from "@components/common/Buttons/Button";
import MenuIndicator from "@components/common/Menu/MenuIndicator";
import { useState } from "react";

export default function MoreButton({
  productId,
  onClickBack,
  onClickEdit,
}: {
  productId: number;
  onClickBack: () => void;
  onClickEdit: () => void;
}) {
  const { onDeleteProduct } = useDeleteProductQuery({
    productId: productId,
    onSuccess: onClickBack,
  });
  const [isRemoveAlertOpen, setIsRemoveAlertOpen] = useState(false);

  const openRemoveAlert = () => setIsRemoveAlertOpen(true);
  const closeRemoveAlert = () => setIsRemoveAlertOpen(false);

  const MoreMenuItemList = [
    {
      name: "게시글 수정",
      onClick: onClickEdit,
    },
    { name: "삭제", onClick: openRemoveAlert, isWarning: true },
  ];

  return (
    <>
      <MenuIndicator itemList={MoreMenuItemList}>
        <Button color="accentText" leftIcon={<DotsIcon />} />
      </MenuIndicator>
      {isRemoveAlertOpen && (
        <Alert
          message={"게시글을 삭제하시겠어요?"}
          onDeleteClick={onDeleteProduct}
          closeAlertHandler={closeRemoveAlert}
        />
      )}
    </>
  );
}
