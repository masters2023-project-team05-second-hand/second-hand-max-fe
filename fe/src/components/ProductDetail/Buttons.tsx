import { ReactComponent as ChevronLeftIcon } from "@assets/icon/chevron-left.svg";
import { ReactComponent as DotsIcon } from "@assets/icon/dots.svg";
import { ReactComponent as HeartFillIcon } from "@assets/icon/heart-filled.svg";
import { ReactComponent as HeartIcon } from "@assets/icon/heart.svg";
import Button from "@components/common/Buttons/Button";
import MenuIndicator from "@components/common/Menu/MenuIndicator";
import { ROUTE_PATH } from "@router/constants";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export function BackButton() {
  const location = useLocation();
  const navigate = useNavigate();

  const goBack = () => navigate(location.state?.prevRoute ?? -1);

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
  const navigate = useNavigate();
  const { productId } = useParams();

  const MoreMenuItemList = [
    {
      name: "게시글 수정",
      onClick: () => navigate(`${ROUTE_PATH.edit}/${productId}`),
    },
    { name: "삭제", onClick: () => console.log("삭제"), isWarning: true },
  ];

  return (
    <MenuIndicator itemList={MoreMenuItemList}>
      <Button color="accentText" leftIcon={<DotsIcon />} />
    </MenuIndicator>
  );
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
  const [isLikedState, setIsLikedState] = useState(isLiked);
  const toggleLike = () => setIsLikedState((prev) => !prev);

  return (
    <Button
      size={{ width: 24, height: 24 }}
      color={isLikedState ? "accentPrimary" : "neutralTextStrong"}
      leftIcon={isLikedState ? <HeartFillIcon /> : <HeartIcon />}
      onClick={toggleLike}
    />
  );
}
