import TopBar from "@components/TopBar";
import Button from "@components/common/Buttons/Button";
import { ROUTE_PATH } from "@router/constants";
import { useNavigate } from "react-router-dom";

type ProductRegisterHeaderProps = {
  // images: string[];
  title: string;
  content: string;
};

export default function ProductRegisterHeader({
  // images,
  title,
  content,
}: ProductRegisterHeaderProps) {
  const navigate = useNavigate();

  const onClose = () => {
    navigate(-1);
  };

  const onAddNewProduct = () => {
    // Todo: 경로에 api response로 오는 상세 아이디 추가해야함
    navigate(ROUTE_PATH.detail);
  };

  // Todo: !!images.length 추가해야함
  // Memo: 상품 수정일 때는 title or content or images가 변경되어야 활성화?? -> 캡쳐필요??
  const isCoreFilled = title && content;

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
          onClick={onAddNewProduct}
        />
      }
    />
  );
}
