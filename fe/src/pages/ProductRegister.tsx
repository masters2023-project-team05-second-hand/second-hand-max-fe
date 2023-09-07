import { getProductDetail } from "@api/index";
import { AddressInfo, CategoryInfo } from "@api/type";
import ProductRegisterAddress from "@components/ProductRegister/ProductRegisterAddress";
import ProductRegisterCategory from "@components/ProductRegister/ProductRegisterCategory";
import ProductRegisterContent from "@components/ProductRegister/ProductRegisterContent";
import ProductRegisterHeader from "@components/ProductRegister/ProductRegisterHeader";
import ProductRegisterImage from "@components/ProductRegister/ProductRegisterImage";
import ProductRegisterPrice from "@components/ProductRegister/ProductRegisterPrice";
import ProductRegisterTitle from "@components/ProductRegister/ProductRegisterTitle";
import {
  DEFAULT_CATEGORY,
  DEFAULT_SELECTED_ADDRESS_ID,
  DEFAULT_SELECTED_ADDRESS_INDEX,
} from "@components/ProductRegister/constants";
import { Page } from "@styles/common";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAddressList, useCurrentAddressId } from "store";
import { styled } from "styled-components";

type ProductInfo = {
  newImages: File[];
  deletedImageIds?: number[];
  title: string;
  category: Pick<CategoryInfo, "id" | "name">;
  price: string;
  content: string;
  address: AddressInfo;
};

export default function ProductRegister() {
  const { id } = useParams();
  const [addressList] = useAddressList();
  const [currentAddressId] = useCurrentAddressId();
  const [selectedAddressId, setSelectedAddressId] = useState<number>(
    currentAddressId ?? DEFAULT_SELECTED_ADDRESS_ID
  );
  const [productInfo, setProductInfo] = useState<ProductInfo>({
    newImages: [],
    deletedImageIds: [],
    title: "",
    category: DEFAULT_CATEGORY,
    price: "",
    content: "",
    address:
      addressList.find((address) => address.id === selectedAddressId) ??
      addressList[DEFAULT_SELECTED_ADDRESS_INDEX],
  });

  const { mutateAsync: productDetail } = useMutation(
    () => getProductDetail(1),
    {
      onSuccess: (res) => {
        setProductInfo((prev) => {
          return {
            ...prev,
            title: res.data.product.title,
            category: res.data.product.category,
            price: res.data.product.price.toString(),
            content: res.data.product.contents,
            address: res.data.product.address,
          };
        });
      },
      // Todo: error 처리
      onError: (error) => {
        console.error(error);
      },
    }
  );

  useEffect(() => {
    if (id) {
      productDetail();
    }
  }, [id, productDetail]);

  // const onAddNewImage = (newImage: File) => {
  //   setProductInfo((prev) => ({
  //     ...prev,
  //     newImages: [...prev.newImages, newImage],
  //   }));
  // };

  // const onRemoveImage = (id: number) => {
  //   setDeletedImageIds((prev) => [...prev, id]);
  // };

  // const onAddNewImage = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   // Memo: 미완성 기능
  //   const file = e.target.files?.[0];
  //   if (!file) return;

  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = () => {
  //     setImages((prev) => [...prev, reader.result as string]);
  //   };
  // };

  const onChangeTitle = (newTitle: string) => {
    setProductInfo((prev) => ({
      ...prev,
      title: newTitle,
    }));
  };

  const onChangeCategory = (
    id: number,
    categories: Pick<CategoryInfo, "id" | "name">[]
  ) => {
    const selectedCategory = categories.find((category) => category.id === id);

    if (selectedCategory) {
      setProductInfo((prev) => ({
        ...prev,
        category: selectedCategory,
      }));
    }
  };

  const onChangePrice = (price: string) => {
    setProductInfo((prev) => ({
      ...prev,
      price: price,
    }));
  };

  const onChangeContent = (content: string) => {
    setProductInfo((prev) => ({
      ...prev,
      content: content,
    }));
  };

  const onChangeAddress = (
    addressList: AddressInfo[],
    newAddressId: number
  ) => {
    setSelectedAddressId(newAddressId);

    setProductInfo((prev) => ({
      ...prev,
      address:
        addressList.find((address) => address.id === newAddressId) ??
        addressList[DEFAULT_SELECTED_ADDRESS_INDEX],
    }));
  };

  return (
    <Page>
      <ProductRegisterHeader
        title={productInfo.title}
        content={productInfo.content}
      />
      <Main>
        <ProductRegisterImage />
        <div className="product-info">
          <ProductRegisterTitle
            title={productInfo.title}
            onChange={onChangeTitle}
          />
          {productInfo.title && (
            <ProductRegisterCategory
              category={productInfo.category}
              onChange={onChangeCategory}
            />
          )}
        </div>
        <ProductRegisterPrice
          price={productInfo.price}
          onChange={onChangePrice}
        />
        <ProductRegisterContent
          content={productInfo.content}
          address={productInfo.address}
          onChange={onChangeContent}
        />
      </Main>
      <ProductRegisterAddress
        selectedAddressId={selectedAddressId}
        address={productInfo.address}
        onChange={onChangeAddress}
      />
    </Page>
  );
}

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px 16px;
  .product-info {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-bottom: 16px;
    border-bottom: ${({ theme: { color } }) =>
      `1px solid ${color.neutralBorder}`};
  }
`;
