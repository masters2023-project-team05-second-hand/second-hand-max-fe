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
  imgUrl: string;
};

export type AddressList = {
  addresses: AddressInfo[];
  hasNext: boolean;
};
