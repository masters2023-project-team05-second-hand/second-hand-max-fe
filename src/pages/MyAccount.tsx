import Login from "@components/Login";
import NavigationBar from "@components/NavigationBar";
import TopBar from "@components/TopBar";
import { Page } from "@styles/common";

export default function MyAccount() {
  return (
    <Page>
      <TopBar
        title="내 계정"
        backgroundColor="neutralBackgroundBlur"
        isWithBorder={true}
      />
      <Login />
      <NavigationBar />
    </Page>
  );
}
