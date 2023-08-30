import NavigationBar from "@components/NavigationBar";
import TopBar from "@components/TopBar";
import { ROUTE_PATH } from "@router/constants";
import { Page } from "@styles/common";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function MyAccount() {
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate(ROUTE_PATH.account.login);
      return;
    }

    navigate(ROUTE_PATH.account.setting);
  }, [accessToken, navigate]);

  return (
    <Page>
      <TopBar
        title="내 계정"
        backgroundColor="neutralBackgroundBlur"
        isWithBorder={true}
      />
      <Outlet />
      <NavigationBar />
    </Page>
  );
}
