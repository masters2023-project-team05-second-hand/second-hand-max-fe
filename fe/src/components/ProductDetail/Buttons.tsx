import { ReactComponent as ChevronLeftIcon } from "@assets/icon/chevron-left.svg";
import { ReactComponent as DotsIcon } from "@assets/icon/dots.svg";
import Button from "@components/common/Buttons/Button";
import { useNavigate } from "react-router-dom";

export function BackButton() {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <Button
      value="뒤로"
      color="accentText"
      fontName="availableStrong16"
      leftIcon={<ChevronLeftIcon onClick={goBack} />}
    />
  );
}

export function MoreButton() {
  return <Button color="accentText" leftIcon={<DotsIcon />} />;
}
