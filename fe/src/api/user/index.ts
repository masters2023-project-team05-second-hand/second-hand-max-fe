import { fetcher } from "@api/fetcher";
import { AddressInfo, Member, Tokens } from "@api/type";
import { USER_API_PATH } from "./constants";

export const postSocialLogin = async (
  provider: "kakao" | "github",
  accessCode: string
) => {
  const { data } = await fetcher.post<Tokens>(USER_API_PATH.login(provider), {
    accessCode,
  });
  return data;
};

export const postLogout = async (body: { refreshToken: string }) => {
  return await fetcher.post(USER_API_PATH.logout, body);
};

export const postRefreshToken = async (refreshToken: string) => {
  return await fetcher.post<{ accessToken: string }>(USER_API_PATH.refresh, {
    refreshToken,
  });
};

export const putUserAddress = async (addressIds: number[]) => {
  return await fetcher.put<AddressInfo[]>(USER_API_PATH.memberAddress, {
    addressIds,
  });
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
    USER_API_PATH.userProfile,
    formData,
    config
  );
};

export const getMember = async () => {
  const { data } = await fetcher.get<Member>(USER_API_PATH.member);
  return data;
};

export const getMemberAddress = async () => {
  const { data } = await fetcher.get<AddressInfo[]>(
    USER_API_PATH.memberAddress
  );
  return data;
};

export const patchNickname = async (newNickname: string) => {
  return await fetcher.patch(USER_API_PATH.nickname, { newNickname });
};

export const getProductLikeStatus = async (productId: string) => {
  const path = `${USER_API_PATH.wishlist}/${productId}`;

  const { data } = await fetcher.get<{ isWished: boolean }>(path);
  return data;
};

export const postProductLike = async ({
  productId,
  isWished,
}: {
  productId: string;
  isWished: boolean;
}) => {
  return await fetcher.post(USER_API_PATH.wishlist, {
    productId,
    isWished,
  });
};
