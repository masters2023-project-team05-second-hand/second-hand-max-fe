import { useUserInfoQuery } from "@api/queries";
import { useToast } from "@hooks/useToast";
import React, { useEffect } from "react";
import { useSetAddresses, useSetCurrentAddressId, useSetMember } from "store";
export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const accessToken = localStorage.getItem("accessToken");

  const setMember = useSetMember();
  const setAddresses = useSetAddresses();
  const setCurrentAddressId = useSetCurrentAddressId();

  const { toast } = useToast();

  const [memberResult, memberAddressResult] = useUserInfoQuery({
    enabled: !!accessToken,
  });

  useEffect(() => {
    if (memberResult.isSuccess) {
      setMember(memberResult.data.member);
    }
    if (memberResult.isError) {
      toast({
        type: "error",
        title: "유저 정보 조회 실패",
        message: "유저 정보를 조회하는데 실패했습니다. 새로고침 해주세요.",
      });
    }
  }, [memberResult, setMember, toast]);

  useEffect(() => {
    if (memberAddressResult.isSuccess) {
      const userAddressesInfo = memberAddressResult.data.addresses;
      setAddresses(
        userAddressesInfo.map((address) => ({
          id: address.id,
          name: address.name,
        }))
      );
      setCurrentAddressId(
        userAddressesInfo.find((address) => address.isLastVisited)?.id
      );
    }
    if (memberAddressResult.isError) {
      toast({
        type: "error",
        title: "유저 주소 조회 실패",
        message: "유저 주소를 조회하는데 실패했습니다. 새로고침 해주세요.",
      });
    }
  }, [memberAddressResult, setAddresses, setCurrentAddressId, toast]);

  return children;
}
