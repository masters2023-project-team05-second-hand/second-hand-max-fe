import NavigationBar from "@components/NavigationBar";
import TopBar from "@components/TopBar";

export default function WishList() {
  return (
    <div>
      <TopBar
        title="관심 목록"
        backgroundColor="neutralBackgroundBlur"
        isWithBorder={true}
      />
      WishList
      <NavigationBar />
    </div>
  );
}
