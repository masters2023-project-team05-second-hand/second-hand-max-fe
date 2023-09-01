import { atom, useAtomValue } from "jotai";
import { atomWithDefault } from "jotai/utils";
import { DEFAULT_CATEGORY } from "./constants";
import { ProductAddress, ProductCategory } from "./type";

export const productImagesAtom = atom<string[]>([]);
export const titleAtom = atom("");
export const categoryAtom = atomWithDefault<ProductCategory>(
  () => DEFAULT_CATEGORY
);
export const priceAtom = atom("");
export const contentAtom = atom("");
export const addressAtom = atomWithDefault<ProductAddress>(
  // Todo: 동네 설정 기능 추가 후 주석 해제
  // () => {
  // const addressList = useAddressList();
  // const currentAddressId = useCurrentAddressId();
  // const defaultAddress = addressList.find(
  //   (address) => address.id === currentAddressId
  // );
  // return defaultAddress ?? addressList[0];
  // }

  () => {
    return { id: 1, name: "역삼 1동" };
  }
);

export const setAddressAtom = atom(
  null,
  (_get, set, address: ProductAddress) => {
    set(addressAtom, address);
  }
);

export const useProductImages = () => useAtomValue(productImagesAtom);
export const useTitle = () => useAtomValue(titleAtom);
export const useCategory = () => useAtomValue(categoryAtom);
export const usePrice = () => useAtomValue(priceAtom);
export const useContent = () => useAtomValue(contentAtom);
export const useAddress = () => useAtomValue(addressAtom);
