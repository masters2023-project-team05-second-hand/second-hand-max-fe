import NavigationBar from "@components/NavigationBar";
import TopBar from "@components/TopBar";

export default function MyAccount() {
  return (
    <div>
      <TopBar
        title="내 계정"
        backgroundColor="neutralBackgroundBlur"
        isWithBorder={true}
      />
      MyAccount
      <NavigationBar />
    </div>
  );
}
