import { API_PATH } from "./constants";
import { fetcher } from "./fetcher";
import {
  AddressInfo,
  CategoryInfo,
  Member,
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
    // TODO: 어떻게 처리할지 고민
    console.error("error", "네트워크 오류가 발생했습니다.");
    return {
      member: { nickname: "", profileImgUrl: "" },
      addresses: [],
    };
  }
};
