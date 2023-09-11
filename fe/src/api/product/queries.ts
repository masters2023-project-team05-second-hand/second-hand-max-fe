import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getAddresses, getCategories, getProductDetail } from ".";

export const useAddressesInfiniteQuery = (option?: { size: number }) => {
  return useInfiniteQuery({
    queryKey: ["addresses"],
    queryFn: ({ pageParam }) => getAddresses(pageParam, option?.size),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.hasNext ? allPages.length : undefined,
  });
};

export const useCategoryQuery = () => {
  return useQuery({
    queryKey: ["getCategories"],
    queryFn: getCategories,
    staleTime: Infinity,
  });
};

export const useProductDetailQuery = (id: number, enabled: boolean) => {
  return useQuery({
    queryKey: ["getProductDetail"],
    queryFn: () => getProductDetail(id),
    enabled,
    staleTime: Infinity,
  });
};
