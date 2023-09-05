import TopBar from "@components/TopBar";
import { Error, Loading } from "@components/common/Guide";
import { ROUTE_PATH } from "@router/constants";
import { Page } from "@styles/common";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo, postSocialLogin } from "api";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAddressList, useCurrentAddressId, useMember } from "store";

export function Auth() {
  const { provider } = useParams<{ provider: "kakao" | "github" }>();
  const accessCode = new URL(window.location.href).searchParams.get("code");
  const navigate = useNavigate();

  const [, setMember] = useMember();
  const [, setAddresses] = useAddressList();
  const [, setCurrentAddressId] = useCurrentAddressId();

  // (조이) getAuth 함수에서 로그인 요청 후 유저 정보까지 모두 하나의 useQuery로 처리해도 괜찮은지, 다른 방법은?
  const getAuth = async () => {
    if (!accessCode || !provider) {
      return;
    }

    const {
      data: { tokens },
    } = await postSocialLogin(provider, { accessCode });

    localStorage.setItem("accessToken", tokens.accessToken);
    localStorage.setItem("refreshToken", tokens.refreshToken);

    const { member, addresses, currentAddressId } = await getUserInfo();
    setMember(member);
    setAddresses(addresses);
    setCurrentAddressId(currentAddressId);

    const isFirstUser = addresses.length === 0;
    return isFirstUser;
  };

  const {
    data: isFirstUser,
    isLoading,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: ["socialLogin"],
    queryFn: getAuth,
    enabled: !!accessCode && !!provider,
  });

  useEffect(() => {
    if (isSuccess) {
      isFirstUser ? navigate(ROUTE_PATH.register) : navigate(ROUTE_PATH.home);
    }
  }, [isSuccess, isFirstUser, navigate]);

  if (isLoading || isError) {
    return (
      <Page>
        <TopBar
          title="내 계정"
          backgroundColor="neutralBackgroundBlur"
          isWithBorder={true}
        />
        {isLoading && (
          <Loading
            messages={["로그인중입니다...", "새로고침을 하지 마세요!"]}
          />
        )}
        {isError && (
          <Error
            messages={["로그인에 실패했습니다.", "잠시 후 다시 시도해주세요."]}
          />
        )}
      </Page>
    );
  }

  return null;
}
