import { useToast } from "@hooks/useToast";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { getChatDetail, postNewChatRoom } from ".";
import { chatKeys } from "./../queryKeys";

// 참고: size는 chat 개수
export const useChatDetailInfiniteQuery = ({
  roomId,
  size = 20,
}: {
  roomId: number;
  size?: number;
}) => {
  return useInfiniteQuery({
    ...chatKeys.chatDetail(roomId),
    enabled: !!roomId,
    queryFn: ({ pageParam }) => getChatDetail(pageParam, { roomId, size }),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.hasNext ? allPages.length : undefined,
  });
};

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
