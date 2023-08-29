import NavigationBar from "@components/NavigationBar";
import TopBar from "@components/TopBar";

export default function Chat() {
  return (
    <div>
      <TopBar
        title="채팅"
        backgroundColor="neutralBackgroundBlur"
        isWithBorder={true}
      />
      Chat
      <NavigationBar />
    </div>
  );
}
