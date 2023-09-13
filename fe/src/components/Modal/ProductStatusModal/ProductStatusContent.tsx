import { patchProductStatus } from "@api/product";
import { Status } from "@api/type";
import { useToast } from "@hooks/useToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { ListItem, ListPanel } from "../Modal.style";

export default function ProductStatusContent({
  productStatuses,
  closeHandler,
}: {
  productStatuses: Status[];
  closeHandler: () => void;
}) {
  const { toast } = useToast();
  const { productId } = useParams();
  const queryClient = useQueryClient();

  const { mutate: mutateProductStatus } = useMutation(patchProductStatus, {
    onSuccess: () => {
      closeHandler();
      toast({
        type: "success",
        title: "상태 변경 완료",
        message: "상태 변경이 완료되었습니다.",
      });
      queryClient.invalidateQueries(["getProductDetail", Number(productId)]);
    },
    onError: () => {
      closeHandler();
      toast({
        type: "error",
        title: "상태 변경 실패",
        message: "상태 변경에 실패했습니다. 잠시 후 다시 시도해주세요.",
      });
    },
  });

  return (
    <ListPanel>
      {productStatuses.map(({ id, type }) => (
        <ListItem
          key={id}
          $active={false}
          onClick={() =>
            mutateProductStatus({ productId: Number(productId), statusId: id })
          }>
          <span>{type}</span>
        </ListItem>
      ))}
    </ListPanel>
  );
}
