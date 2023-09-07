import { getProductDetail, patchProduct, postProduct } from "@api/index";
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
  DEFAULT_SELECTED_ADDRESS_INDEX,
} from "@components/ProductRegister/constants";
import { ProductInfo } from "@components/ProductRegister/type";
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
  const [selectedAddressId, setSelectedAddressId] = useState<
    number | undefined
  >(productId ? undefined : currentAddressId);
  const [productInfo, setProductInfo] = useState<ProductInfo>({
    images: [],
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

  const { mutate: getProduct } = useMutation(
    () => getProductDetail(Number(productId)),
    {
      onSuccess: (res) => {
        setProductInfo((prev) => {
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
    }
  );

  useEffect(() => {
    if (productId) {
      getProduct();
    }
  }, [productId, getProduct]);

  const newProductMutation = useMutation(postProduct);
  const editProductMutation = useMutation(patchProduct);

  const onPostNewProduct = () => {
    const price = productInfo.price.replace(/,/g, "");

    const formData = new FormData();

    productInfo.newImages?.forEach((image) => {
      formData.append("images", image.image);
    });

    formData.append("title", productInfo.title);
    formData.append("content", productInfo.content);
    formData.append("categoryId", productInfo.category.id.toString());
    formData.append("addressId", productInfo.address!.id.toString());
    formData.append("price", price);

    newProductMutation.mutate(formData, {
      onSuccess: () => {
        navigate(`/product-detail/${productId}`);
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  const onPatchProduct = () => {
    const price = productInfo.price.replace(/,/g, "");

    const formData = new FormData();

    productInfo.newImages?.forEach((image) => {
      formData.append("newImages", image.image);
    });

    formData.append(
      "deletedImageIds",
      productInfo.deletedImageIds?.toString() ?? ""
    );
    formData.append("title", productInfo.title);
    formData.append("content", productInfo.content);
    formData.append("categoryId", productInfo.category.id.toString());
    formData.append("addressId", productInfo.address!.id.toString());
    formData.append("price", price);

    editProductMutation.mutate(
      { productId: Number(productId), productInfo: formData },
      {
        onSuccess: () => {
          navigate(`/product-detail/${productId}`);
        },
        onError: (error) => {
          console.error(error);
        },
      }
    );
  };

  const onSubmitProduct = () => {
    const isNewProduct = !productId;

    if (isNewProduct) {
      onPostNewProduct();
    } else {
      onPatchProduct();
    }
  };

  const onAddNewImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const now = new Date().getTime();

    setProductInfo((prev) => ({
      ...prev,
      newImages: prev.newImages
        ? [...prev.newImages, { id: now, image: file }]
        : [{ id: now, image: file }],
    }));

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
    const isNewImage = productInfo.newImages?.find((image) => image.id === id);

    if (!isNewImage) {
      setProductInfo((prev) => {
        return {
          ...prev,
          deletedImageIds: prev.deletedImageIds
            ? [...prev.deletedImageIds, id]
            : [id],
        };
      });
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
