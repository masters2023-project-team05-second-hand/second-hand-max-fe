import gajiCharacter from "@assets/image/gaji.png";
import Intro from "@components/Intro";
import {
  GithubButton,
  KakaoButton,
} from "@components/common/Buttons/SocialButtons";
import { HEIGHT } from "@styles/constants";
import styled from "styled-components";

export default function Login() {
  return (
    <StyledLogin>
      <Intro />
      <img src={gajiCharacter} alt="가지 캐릭터 이미지" width={"100%"} />
      <div className="button-wrapper">
        <KakaoButton />
        <GithubButton />
      </div>
    </StyledLogin>
  );
}

const StyledLogin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - ${HEIGHT.topBar + HEIGHT.navigationBar}px);
  padding: 0 16px;

  .button-wrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`;
