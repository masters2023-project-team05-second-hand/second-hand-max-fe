import UserAccount from "@components/UserAccount";
import Button from "@components/common/Buttons/Button";
import { ROUTE_PATH } from "@router/constants";
import { Main } from "@styles/common";
import { postLogout } from "api";
import { useNavigate } from "react-router-dom";

export default function Setting() {
  const navigate = useNavigate();

  // TODO: 상태관리 라이브러리 사용
  const onLogout = () => {
    const refreshToken = localStorage.getItem("refreshToken");
    refreshToken && postLogout({ refreshToken });

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("member");

    navigate(ROUTE_PATH.account.index);
  };

  return (
    <Main>
      <UserAccount />
      <Button
        value="로그아웃"
        backgroundColor="accentPrimary"
        size={{ width: 330, height: 56 }}
        fontName="availableStrong16"
        color="accentText"
        radius={8}
        onClick={onLogout}
      />
    </Main>
  );
}
