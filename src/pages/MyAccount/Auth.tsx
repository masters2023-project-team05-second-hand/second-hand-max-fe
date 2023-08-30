import LoadingIndicator from "@assets/image/loading.gif";
import { ROUTE_PATH } from "@router/constants";
import { SubTitle } from "@styles/common";
import { postSocialLogin } from "api";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

export function Auth() {
  const { provider } = useParams<{ provider: "kakao" | "github" }>();
  const accessCode = new URL(window.location.href).searchParams.get("code");
  const navigate = useNavigate();

  useEffect(() => {
    const getTokens = async () => {
      if (accessCode && provider) {
        const {
          data: { tokens, addresses, member },
        } = await postSocialLogin(provider, { accessCode });
        const isFirstLogin = addresses?.length === 0;

        // TODO: 상태관리 라이브러리 사용
        localStorage.setItem("accessToken", tokens.accessToken);
        localStorage.setItem("refreshToken", tokens.refreshToken);
        localStorage.setItem("member", JSON.stringify(member));

        isFirstLogin
          ? navigate(ROUTE_PATH.register)
          : navigate(ROUTE_PATH.home);
      }
    };

    getTokens();
  }, [accessCode, navigate, provider]);

  return (
    <Loading>
      <img src={LoadingIndicator} alt="loading-indicator" />
      <SubTitle>로그인중입니다...</SubTitle>
      <SubTitle>새로고침을 하지 마세요!</SubTitle>
    </Loading>
  );
}

const Loading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 100px;

  img {
    margin: 30px;
  }
`;
