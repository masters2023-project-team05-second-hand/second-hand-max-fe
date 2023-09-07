import { useInfiniteQuery, useQueries, useQuery } from "@tanstack/react-query";
import { getAddresses, getCategories, getMember, getMemberAddress } from ".";

type Props = {
  size: number;
};

export const useAddressesInfiniteQuery = (props?: Props) => {
  return useInfiniteQuery({
    queryKey: ["addresses"],
    queryFn: ({ pageParam }) => getAddresses(pageParam, props?.size),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.hasNext ? allPages.length : undefined,
  });
};

export const useUserInfoQuery = (
  { enabled }: { enabled: boolean } = { enabled: true }
) => {
  return useQueries({
    queries: [
      {
        queryKey: ["getMember"],
        queryFn: getMember,
        enabled,
      },
      {
        queryKey: ["getMemberAddresses"],
        queryFn: getMemberAddress,
        enabled,
      },
    ],
  });
};

export const useCategoryQuery = () => {
  return useQuery({
    queryKey: ["getCategories"],
    queryFn: getCategories,
  });
};
