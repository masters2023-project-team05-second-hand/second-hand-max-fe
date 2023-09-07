export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export type Member = {
  nickname: string;
  profileImgUrl: string;
};

export type UserAddressInfo = AddressInfo & {
  isLastVisited: boolean;
};

export type AddressInfo = {
  id: number;
  name: string;
};

export type CategoryInfo = {
  id: number;
  name: string;
  imageUrl: string;
};

export type AddressList = {
  addresses: AddressInfo[];
  hasNext: boolean;
};

export type ProductDetailInfo = {
  isSeller: boolean;
  product: {
    sellers: string;
    category: CategoryInfo;
    address: AddressInfo;
    title: string;
    contents: string;
    price: number;
    createdTime: string;
    status: number;
  };
  images: {
    id: number;
    url: string;
  }[];
  stats: {
    chatCount: number;
    wishCount: number;
    viewCount: number;
  };
  statuses: {
    id: number;
    type: string;
  }[];
};
