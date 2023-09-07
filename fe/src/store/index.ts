import { getUserInfo } from "@api/index";
import { AddressInfo, Member } from "api/type";
import { atom, useAtom } from "jotai";

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
