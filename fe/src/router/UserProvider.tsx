import { useUserInfoQuery } from "@api/user/queries";
import { useToast } from "@hooks/useToast";
import { useEffect } from "react";
import {
  useIsLoginValue,
  useSetAddresses,
  useSetCurrentAddressId,
  useSetMember,
} from "store";

export default function UserProvider() {
  const isLogin = useIsLoginValue();

  const setMember = useSetMember();
  const setAddresses = useSetAddresses();
  const setCurrentAddressId = useSetCurrentAddressId();

  const { toast } = useToast();

  const [memberResult, memberAddressResult] = useUserInfoQuery({
    enabled: isLogin,
  });

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
      setAddresses(userAddressesInfo);

      // 기존 유저인 경우에만 로컬스토리지에 저장된 값이 없으면 첫번째 주소를 기본 주소로 설정
      const lastVisitedAddressId =
        localStorage.getItem("currentAddressId") ?? userAddressesInfo[0].id;
      userAddressesInfo.length &&
        setCurrentAddressId(Number(lastVisitedAddressId));
    }

    if (memberAddressResult.isError) {
      toast({
        type: "error",
        title: "유저 주소 조회 실패",
        message: "유저 주소를 조회하는데 실패했습니다. 새로고침 해주세요.",
      });
    }
  }, [memberAddressResult, setAddresses, setCurrentAddressId, toast]);

  return null;
}
