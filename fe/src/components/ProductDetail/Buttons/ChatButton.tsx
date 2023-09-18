import Button from "@components/common/Buttons/Button";

type ChatButtonProps = {
  onClick: () => void;
  isSeller: boolean;
  chatCount?: number;
};

export default function ChatButton({
  onClick,
  isSeller,
  chatCount,
}: ChatButtonProps) {
  const sellerMessage = `대화 중인 채팅방${
    chatCount && chatCount > 0 ? ` (${chatCount})` : ""
  }`;
  const buyerMessage = "채팅하기";

  return (
    <Button
      size={{ width: 115, height: 32 }}
      color="accentText"
      backgroundColor="accentPrimary"
      radius={8}
      fontName="availableStrong12"
      value={isSeller ? sellerMessage : buyerMessage}
      onClick={onClick}
    />
  );
}
