import { useUserInfoQuery } from "@api/user/queries";
import { useToast } from "@hooks/useToast";
import { ROUTE_PATH } from "@router/constants";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useIsLoginValue, useSetAddresses, useSetMember } from "store";

export default function UserProvider() {
  const isLogin = useIsLoginValue();

  const setMember = useSetMember();
  const setAddresses = useSetAddresses();

  const { toast } = useToast();

  const [memberResult, memberAddressResult] = useUserInfoQuery({
    enabled: isLogin,
  });

  const isFirstUser =
    memberAddressResult.isSuccess && !memberAddressResult.data.length;

  useEffect(() => {
    if (memberResult.isSuccess) {
      setMember(memberResult.data);
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
      const userAddressesInfo = memberAddressResult.data;
      setAddresses(
        userAddressesInfo.map((address) => ({
          id: address.id,
          name: address.name,
        }))
      );
    }
    if (memberAddressResult.isError) {
      toast({
        type: "error",
        title: "유저 주소 조회 실패",
        message: "유저 주소를 조회하는데 실패했습니다. 새로고침 해주세요.",
      });
    }
  }, [memberAddressResult, setAddresses, toast]);

  return isFirstUser ? <Navigate to={ROUTE_PATH.register} /> : <Outlet />;
}