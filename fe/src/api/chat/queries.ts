import { chatKeys } from "@api/queryKeys";
import { useToast } from "@hooks/useToast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteChatRoom, getChatDetail, getChatList, postNewChatRoom } from ".";

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

export const useDeleteChatRoom = ({
  roomId,
}: // invalidateQueryKey,
{
  roomId: number;
  invalidateQueryKey?: readonly unknown[];
}) => {
  const { toast } = useToast();
  // const queryClient = useQueryClient();

  const deleteChatRoomMutation = useMutation(deleteChatRoom);

  const onDeleteChatRoom = () => {
    deleteChatRoomMutation.mutate(roomId, {
      onSuccess: () => {
        // TODO: 채팅방 삭제 후 채팅방 목록 재조회
        // queryClient.invalidateQueries({ queryKey: invalidateQueryKey });
      },
      onError: () => {
        toast({
          type: "error",
          title: "채팅방 나가기 실패",
          message: "채팅방 나가기를 실패했어요. 잠시 후 다시 시도해주세요.",
        });
      },
    });
  };

  return { onDeleteChatRoom };
};

export const useGetChatListQuery = (productId?: number) => {
  return useQuery({
    ...chatKeys.chatList(productId),
    queryFn: () => getChatList(productId),
    staleTime: Infinity,
  });
};
