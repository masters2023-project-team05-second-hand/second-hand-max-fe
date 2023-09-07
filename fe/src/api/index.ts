import { API_PATH } from "./constants";
import { fetcher } from "./fetcher";
import {
  AddressInfo,
  AddressList,
  CategoryInfo,
  Member,
  PatchProduct,
  PostNewProduct,
  ProductDetailInfo,
  Tokens,
  UserAddressInfo,
} from "./type";

export const postSocialLogin = async (
  provider: "kakao" | "github",
  body: { accessCode: string }
) => {
  return await fetcher.post<{ tokens: Tokens }>(API_PATH.login(provider), body);
};

export const postLogout = async (body: { refreshToken: string }) => {
  return await fetcher.post(API_PATH.logout, body);
};

export const getCategories = async () => {
  return await fetcher.get<CategoryInfo[]>(API_PATH.categories);
};

export const postRefreshToken = async (refreshToken: string) => {
  return await fetcher.post<{ accessToken: string }>(API_PATH.refresh, {
    refreshToken,
  });
};

export const postUserAddress = async (body: { addressIds: number[] }) => {
  return await fetcher.post<UserAddressInfo[]>(API_PATH.userAddress, body);
};

export const postUserProfile = async (file: File) => {
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  const formData = new FormData();
  formData.append("image", file);

  return await fetcher.post<{ profileImgUrl: string }>(
    API_PATH.userProfile,
    formData,
    config
  );
};

export const getMember = async () => {
  return await fetcher.get<{ member: Member }>(API_PATH.member);
};

export const getMemberAddress = async () => {
  return await fetcher.get<{ addresses: UserAddressInfo[] }>(
    API_PATH.memberAddress
  );
};

export const getUserInfo = async (): Promise<{
  member: Member;
  addresses: AddressInfo[];
  currentAddressId?: number;
}> => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    return {
      member: { nickname: "", profileImgUrl: "" },
      addresses: [],
    };
  }

  try {
    const [member, addresses] = await Promise.all([
      getMember(),
      getMemberAddress(),
    ]);
    const currentAddressId = addresses.data.addresses.find(
      (address: UserAddressInfo) => address.isLastVisited
    )?.id;

    return {
      member: member.data.member,
      addresses: addresses.data.addresses.map((address) => ({
        id: address.id,
        name: address.name,
      })),
      currentAddressId,
    };
  } catch (error) {
    // TODO: 토스트 메시지로 보여주기
    console.error("error", "네트워크 오류가 발생했습니다.");
    return {
      member: { nickname: "", profileImgUrl: "" },
      addresses: [],
    };
  }
};

export const getAddresses = async (page: number = 0, size: number = 10) => {
  const { data } = await fetcher.get<AddressList>(
    API_PATH.addresses(page, size)
  );
  return data;
};

export const patchNickname = async (nickname: string) => {
  return await fetcher.patch(API_PATH.nickname, { nickname });
};

export const getProductDetail = async (productId: number) => {
  return await fetcher.get<ProductDetailInfo>(
    API_PATH.productDetail(productId)
  );
};

export const postProduct = async (productInfo: PostNewProduct) => {
  return await fetcher.post<{ productId: number }>(API_PATH.newProduct, {
    productInfo,
  });
};

export const patchProduct = async (
  productId: number,
  productInfo: PatchProduct
) => {
  return await fetcher.patch(API_PATH.editProduct(productId), { productInfo });
};
