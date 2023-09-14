import UserAccount from "@components/UserAccount";
import Button from "@components/common/Buttons/Button";
import { Main } from "@styles/common";
import { useMutation } from "@tanstack/react-query";
import { postLogout } from "api/user";
import { useSetAddresses, useSetIsLogin, useSetMember } from "store";

export default function Setting() {
  const setMember = useSetMember();
  const setAddresses = useSetAddresses();
  const setIsLogin = useSetIsLogin();

  const { mutate: mutateLogout } = useMutation(postLogout, {
    onSuccess: () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      setIsLogin(false);
      setMember({
        id: -1,
        nickname: "",
        profileImgUrl: "",
      });
      setAddresses([]);
    },
  });

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
        onClick={() => mutateLogout()}
      />
    </Main>
  );
}
