import { ReactComponent as HeartIcon } from "@assets/icon/heart.svg";
import { ReactComponent as HomeIcon } from "@assets/icon/home.svg";
import { ReactComponent as MessageIcon } from "@assets/icon/message.svg";
import { ReactComponent as NewsIcon } from "@assets/icon/news.svg";
import { ReactComponent as UserIcon } from "@assets/icon/user-circle.svg";
import { PATH } from "constants/path";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "./common/Button";

export default function NavigationBar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <StyledNavigationBar>
      {NAVIGATION.map(({ icon, value, path }) => (
        <Button
          key={path}
          direction="column"
          leftIcon={icon}
          value={value}
          color={pathname === path ? "neutralTextStrong" : "neutralTextWeak"}
          fontName={pathname === path ? "enabledStrong10" : "availableStrong10"}
          onClick={() => navigate(path)}
        />
      ))}
    </StyledNavigationBar>
  );
}

const NAVIGATION = [
  {
    icon: <HomeIcon />,
    value: "홈화면",
    path: PATH.home,
  },
  {
    icon: <NewsIcon />,
    value: "판매내역",
    path: PATH.sales,
  },
  {
    icon: <HeartIcon />,
    value: "관심상품",
    path: PATH.wish,
  },
  {
    icon: <MessageIcon />,
    value: "채팅",
    path: PATH.chat,
  },
  {
    icon: <UserIcon />,
    value: "내 계정",
    path: PATH.account,
  },
];

const StyledNavigationBar = styled.div`
  width: 100%;
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  border-top: 0.8px solid ${({ theme }) => theme.color.neutralBorder};
  background-color: ${({ theme }) => theme.color.neutralBackground};
`;
