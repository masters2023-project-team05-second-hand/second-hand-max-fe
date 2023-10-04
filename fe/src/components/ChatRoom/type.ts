export type ProductInfo = {
  id: number;
  title: string;
  price: number;
  thumbnailUrl: string;
};

export type ChatRoomLocationState = {
  product: ProductInfo;
  partner: {
    id: number;
    nickname: string;
    profileImgUrl: string;
  };
};
