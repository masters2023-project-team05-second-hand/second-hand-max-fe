import { chatKeys } from "@api/queryKeys";
import { useToast } from "@hooks/useToast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getChatDetail, getChatList, postNewChatRoom } from ".";

export const useMakeRoomMutation = ({
  callback,
}: {
  callback: (roomId: number) => void;
}) => {
  const { toast } = useToast();

  return useMutation(postNewChatRoom, {
    onSuccess: ({ roomId }) => {
      callback(roomId);
    },
    onError: () => {
      toast({
        type: "error",
        title: "채팅방 생성 실패",
        message: "채팅방 생성에 실패했습니다. 잠시 후 다시 시도해주세요.",
      });
    },
  });
};

export const useGetChatDetailQuery = (roomId: number) => {
  return useQuery({
    ...chatKeys.chatDetail(roomId),
    queryFn: () => getChatDetail(roomId),
    staleTime: Infinity,
    enabled: !!roomId,
  });
};

export const useGetChatListQuery = (productId?: number) => {
  return useQuery({
    ...chatKeys.chatList(productId),
    queryFn: () => getChatList(productId),
    staleTime: Infinity,
  });
};
