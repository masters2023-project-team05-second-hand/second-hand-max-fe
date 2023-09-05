import { getUserInfo } from "@api/index";
import { AddressInfo, Member } from "api/type";
import { atom, useAtom } from "jotai";
import browserServiceWorker from "../mocks/browser";

// (조이) getUserInfo 실행 전 msw 실행 순서 보장을 위해 이동
if (process.env.NODE_ENV === "development") {
  browserServiceWorker.start({
    onUnhandledRequest: "bypass",
  });
}

const { member, addresses, currentAddressId } = await getUserInfo();

const memberAtom = atom(member, (_, set, payload: Member) => {
  set(memberAtom, payload);
});

const addressListAtom = atom(addresses, (_, set, payload: AddressInfo[]) => {
  set(addressListAtom, payload);
});

const currentAddressIdAtom = atom(
  currentAddressId,
  (_, set, payload?: number) => {
    set(currentAddressIdAtom, payload);
  }
);

export const useMember = () => useAtom(memberAtom);
export const useAddressList = () => useAtom(addressListAtom);
export const useCurrentAddressId = () => useAtom(currentAddressIdAtom);
