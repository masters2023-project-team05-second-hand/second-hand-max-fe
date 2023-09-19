import { ReactComponent as ChevronLeftIcon } from "@assets/icon/chevron-left.svg";
import Button from "@components/common/Buttons/Button";
import { ColorName } from "@styles/designSystem";
import { useLocation, useNavigate } from "react-router-dom";

export default function BackButton({ color }: { color: ColorName }) {
  const location = useLocation();
  const navigate = useNavigate();

  const goBack = () => navigate(location.state?.prevRoute ?? -1);

  return (
    <Button
      value="뒤로"
      color={color}
      fontName="availableStrong16"
      onClick={goBack}
      leftIcon={<ChevronLeftIcon />}
    />
  );
}
