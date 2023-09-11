import { useQueries } from "@tanstack/react-query";
import { getMember, getMemberAddress } from ".";

export const useUserInfoQuery = (
  { enabled }: { enabled: boolean } = { enabled: true }
) => {
  return useQueries({
    queries: [
      {
        queryKey: ["getMember"],
        queryFn: getMember,
        enabled,
        staleTime: Infinity,
      },
      {
        queryKey: ["getMemberAddresses"],
        queryFn: getMemberAddress,
        enabled,
        staleTime: Infinity,
      },
    ],
  });
};
