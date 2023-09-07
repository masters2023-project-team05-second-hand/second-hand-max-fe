import { getProductDetail, postProduct } from "@api/index";
import { AddressInfo, CategoryInfo, PostNewProduct } from "@api/type";
import ProductRegisterAddress from "@components/ProductRegister/ProductRegisterAddress";
import ProductRegisterCategory from "@components/ProductRegister/ProductRegisterCategory";
import ProductRegisterContent from "@components/ProductRegister/ProductRegisterContent";
import ProductRegisterHeader from "@components/ProductRegister/ProductRegisterHeader";
import ProductRegisterImage from "@components/ProductRegister/ProductRegisterImage";
import ProductRegisterPrice from "@components/ProductRegister/ProductRegisterPrice";
import ProductRegisterTitle from "@components/ProductRegister/ProductRegisterTitle";
import {
  DEFAULT_CATEGORY,
  DEFAULT_SELECTED_ADDRESS_INDEX,
} from "@components/ProductRegister/constants";
import { ProductInfo, ProductNewImage } from "@components/ProductRegister/type";
import { Page } from "@styles/common";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAddressList, useCurrentAddressId } from "store";
import { styled } from "styled-components";

export default function ProductRegister() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [addressList] = useAddressList();
  const [currentAddressId] = useCurrentAddressId();
  const [newImages, setNewImages] = useState<ProductNewImage[]>([]);
  const [deletedImageIds, setDeletedImageIds] = useState<number[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<
    number | undefined
  >(productId ? undefined : currentAddressId);
  const [productInfo, setProductInfo] = useState<ProductInfo>({
    images: [],
    newImages: newImages,
    deletedImageIds: deletedImageIds,
    title: "",
    category: DEFAULT_CATEGORY,
    price: "",
    content: "",
    address:
      addressList.find((address) => address.id === selectedAddressId) ??
      addressList[DEFAULT_SELECTED_ADDRESS_INDEX],
  });

  const { mutateAsync: getProduct } = useMutation(() => getProductDetail(1), {
    onSuccess: (res) => {
      setProductInfo((prev) => {
        console.log(res);
        return {
          ...prev,
          images: res.data.images,
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
  });

  useEffect(() => {
    if (productId) {
      console.log(productId);
      getProduct();
    }
  }, [productId, getProduct]);

  const { mutateAsync: newProductMutation } = useMutation(
    (productInfo: PostNewProduct) => postProduct(productInfo),
    {
      onSuccess: () => {
        navigate(-1);
      },
      onError: (error) => {
        console.error(error);
      },
    }
  );

  const onSubmitProduct = (
    id: number | undefined,
    productInfo: ProductInfo
  ) => {
    // Todo: 이미지 파일 담은 배열? 보내는 법??
    // Todo: patch도 추가해야함
    const postInfo = {
      images: productInfo.newImages!.map((image) => image.image),
      product: {
        addressId: productInfo.address.id,
        categoryId: productInfo.category.id,
        title: productInfo.title,
        content: productInfo.content,
        price: parseInt(productInfo.price),
      },
    };

    if (!id) {
      newProductMutation(postInfo);
    }
  };

  const onAddNewImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const now = new Date().getTime();

    setNewImages((prev) => [...prev, { id: now, image: file }]);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProductInfo((prev) => ({
        ...prev,
        images: [...prev.images, { id: now, url: reader.result as string }],
      }));
    };
  };

  const onRemoveImage = (id: number) => {
    const isNewImage = newImages.find((image) => image.id === id);

    if (!isNewImage) {
      setDeletedImageIds((prev) => [...prev, id]);
    }

    setProductInfo((prev) => {
      return {
        ...prev,
        images: prev.images.filter((image) => image.id !== id),
      };
    });
  };

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
        productInfo={productInfo}
        onSubmit={onSubmitProduct}
      />
      <Main>
        <ProductRegisterImage
          images={productInfo.images}
          onAddNewImage={onAddNewImage}
          onRemoveImage={onRemoveImage}
        />
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
