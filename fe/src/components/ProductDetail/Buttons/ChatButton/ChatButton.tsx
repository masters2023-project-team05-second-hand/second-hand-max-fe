import { SellerInfo } from "@api/type";
import { ProductInfo } from "@components/ChatRoom/type";
import { GoToChatRoomButton } from "./GoToChatRoomButton";
import { GoToProductChatsButton } from "./GoToProductChatsButton";

export type ChatInfo = {
  product: ProductInfo;
  seller: SellerInfo;
  chatCount: number;
};

type ChatButtonProps = {
  isSeller: boolean;
  chatInfo: ChatInfo;
};

export default function ChatButton({ isSeller, chatInfo }: ChatButtonProps) {
  const { product, seller, chatCount } = chatInfo;

  return isSeller ? (
    <GoToProductChatsButton {...{ chatCount, productId: product.id }} />
  ) : (
    <GoToChatRoomButton {...{ product, seller }} />
  );
}
