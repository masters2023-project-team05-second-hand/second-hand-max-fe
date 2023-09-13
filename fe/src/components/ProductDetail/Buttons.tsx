import { ReactComponent as ChevronLeftIcon } from "@assets/icon/chevron-left.svg";
import { ReactComponent as DotsIcon } from "@assets/icon/dots.svg";
import { ReactComponent as HeartFillIcon } from "@assets/icon/heart-filled.svg";
import { ReactComponent as HeartIcon } from "@assets/icon/heart.svg";
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
      onClick={goBack}
      leftIcon={<ChevronLeftIcon />}
    />
  );
}

export function MoreButton() {
  return <Button color="accentText" leftIcon={<DotsIcon />} />;
}

export function ChatButton() {
  return (
    <Button
      size={{ width: 115, height: 32 }}
      color="accentText"
      backgroundColor="accentPrimary"
      radius={8}
      fontName="availableStrong12"
      // TODO: 채팅방 개수 표시
      value={"대화 중인 채팅방"}
    />
  );
}

export function LikeButton({ isLiked }: { isLiked: boolean }) {
  return (
    <Button
      size={{ width: 24, height: 24 }}
      color={isLiked ? "accentPrimary" : "neutralTextStrong"}
      leftIcon={isLiked ? <HeartFillIcon /> : <HeartIcon />}
    />
  );
}
