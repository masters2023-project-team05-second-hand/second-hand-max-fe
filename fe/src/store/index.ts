import { AddressInfo, Member, Status } from "api/type";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { DEFAULT_ADDRESS } from "./constants";

// TODO: 로그인 상태 유지하는 방법 고민 (저장된 토큰이 만료된 경우)
// const accessToken = localStorage.getItem("accessToken");

const isLoginAtom = atom<boolean>(false);
const memberAtom = atom<Member>({ id: -1, nickname: "", profileImgUrl: "" });
const addressListAtom = atom<AddressInfo[]>([DEFAULT_ADDRESS]);
const currentAddressIdAtom = atom<number>(DEFAULT_ADDRESS.id);
const currentCategoryIdAtom = atom<number | undefined>(undefined);
const statuesAtom = atom<Status[]>([]);

const useIsLoginAtom = atom(
  (get) => get(isLoginAtom),
  (_, set, payload: boolean) => {
    set(isLoginAtom, payload);
  }
);

const useMemberAtom = atom(
  (get) => get(memberAtom),
  (_, set, payload: Member) => {
    set(memberAtom, payload);
  }
);

const useAddressListAtom = atom(
  (get) => get(addressListAtom),
  (_, set, payload: AddressInfo[]) => {
    set(addressListAtom, payload);
  }
);

const useCurrentAddressIdAtom = atom(
  (get) => get(currentAddressIdAtom),
  (_, set, payload: number) => {
    set(currentAddressIdAtom, payload);
    localStorage.setItem("currentAddressId", JSON.stringify(payload));
  }
);

const useCurrentCategoryIdAtom = atom(
  (get) => get(currentCategoryIdAtom),
  (get, set, payload: number) => {
    const prevCategoryId = get(currentCategoryIdAtom);
    if (prevCategoryId === payload) {
      set(currentCategoryIdAtom, undefined);
      return;
    }
    set(currentCategoryIdAtom, payload);
  }
);

const useStatusesAtom = atom(
  (get) => get(statuesAtom),
  (_, set, payload: Status[]) => {
    set(statuesAtom, payload);
    localStorage.setItem("statuses", JSON.stringify(payload));
  }
);

// read & set 모두 필요할 땐 useAtom 사용
// read만 필요할 땐 useAtomValue 사용
// set만 필요할 땐 useSetAtom 사용

export const useIsLogin = () => useAtom(useIsLoginAtom);
export const useMember = () => useAtom(useMemberAtom);
export const useAddressList = () => useAtom(useAddressListAtom);
export const useCurrentAddressId = () => useAtom(useCurrentAddressIdAtom);
export const useCurrentCategoryId = () => useAtom(useCurrentCategoryIdAtom);
export const useStatuses = () => useAtom(useStatusesAtom);

export const useIsLoginValue = () => useAtomValue(isLoginAtom);
export const useMemberValue = () => useAtomValue(memberAtom);
export const useAddressListValue = () => useAtomValue(addressListAtom);
export const useCurrentAddressIdValue = () =>
  useAtomValue(currentAddressIdAtom);
export const useCurrentCategoryIdValue = () =>
  useAtomValue(currentCategoryIdAtom);
export const useStatusesValue = () => useAtomValue(statuesAtom);

export const useSetIsLogin = () => useSetAtom(useIsLoginAtom);
export const useSetMember = () => useSetAtom(useMemberAtom);
export const useSetAddresses = () => useSetAtom(useAddressListAtom);
export const useSetCurrentAddressId = () => useSetAtom(useCurrentAddressIdAtom);
export const useSetCurrentCategoryId = () =>
  useSetAtom(useCurrentCategoryIdAtom);
export const useSetStatuses = () => useSetAtom(useStatusesAtom);
