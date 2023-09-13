import { useToast } from "@hooks/useToast";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import {
  deleteProduct,
  getAddresses,
  getCategories,
  getProductDetail,
  getStatuses,
} from ".";

export const useAddressesInfiniteQuery = (option?: { size: number }) => {
  return useInfiniteQuery({
    queryKey: ["addresses"],
    queryFn: ({ pageParam }) => getAddresses(pageParam, option?.size),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.hasNext ? allPages.length : undefined,
  });
};

export const useCategoryQuery = () => {
  return useQuery({
    queryKey: ["getCategories"],
    queryFn: getCategories,
    staleTime: Infinity,
  });
};

export const useProductDetailQuery = (id: number, enabled: boolean) => {
  return useQuery({
    queryKey: ["getProductDetail", id],
    queryFn: () => getProductDetail(id),
    enabled,
    staleTime: Infinity,
  });
};

export const useDeleteProductQuery = (productId: number) => {
  const { toast } = useToast();

  const deleteProductMutation = useMutation(deleteProduct);

  const onDeleteProduct = () => {
    deleteProductMutation.mutate(productId, {
      onSuccess: () => {
        toast({
          type: "success",
          title: "상품 삭제 성공",
          message: "상품 삭제에 성공했습니다.",
        });
      },
      onError: () => {
        toast({
          type: "error",
          title: "상품 삭제 실패",
          message: "상품 삭제에 실패했습니다. 잠시 후 다시 시도해주세요.",
        });
      },
    });
  };

  return { onDeleteProduct };
};

export const useProductStatusesQuery = () => {
  return useQuery({
    queryKey: ["getStatuses"],
    queryFn: () => getStatuses(),
    staleTime: Infinity,
  });
};
