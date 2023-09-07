import TopBar from "@components/TopBar";
import Button from "@components/common/Buttons/Button";
import { useNavigate, useParams } from "react-router-dom";
import { ProductInfo } from "./type";

type ProductRegisterHeaderProps = {
  productInfo: ProductInfo;
  onSubmit: (id: number | undefined, productInfo: ProductInfo) => void;
};

export default function ProductRegisterHeader({
  productInfo,
  onSubmit,
}: ProductRegisterHeaderProps) {
  const navigate = useNavigate();
  const { productId } = useParams();

  const onClose = () => {
    navigate(-1);
  };

  // Memo: 상품 수정일 때는 title or content or images가 변경되어야 활성화?? -> 캡쳐필요??
  const isCoreFilled =
    !!productInfo.images.length && productInfo.title && productInfo.content;

  return (
    <TopBar
      title="내 물건 팔기"
      backgroundColor="neutralBackgroundBlur"
      isWithBorder={true}
      leftBtn={
        <Button
          value="닫기"
          color="neutralText"
          fontName="availableStrong16"
          onClick={onClose}
        />
      }
      rightBtn={
        <Button
          value="완료"
          fontName="availableStrong16"
          color="neutralText"
          disabled={!isCoreFilled}
          onClick={() => onSubmit(Number(productId), productInfo)}
        />
      }
    />
  );
}
