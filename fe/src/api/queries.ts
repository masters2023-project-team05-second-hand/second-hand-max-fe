import { useInfiniteQuery } from "@tanstack/react-query";
import { getAddresses } from ".";

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
