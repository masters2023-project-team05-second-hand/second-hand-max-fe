import NavigationBar from "@components/NavigationBar";
import TopBar from "@components/TopBar";

export default function SalesList() {
  return (
    <div>
      <TopBar
        title="판매 내역"
        backgroundColor="neutralBackgroundBlur"
        isWithBorder={true}
      />
      SalesList
      <NavigationBar />
    </div>
  );
}
