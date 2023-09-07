import { AddressInfo, CategoryInfo } from "@api/type";

export type ProductAddress = {
  id: number;
  name: string;
};

export type ProductCategory = {
  id: number;
  name: string;
};

export type ProductImageType = {
  id: number;
  url: string;
};

export type ProductNewImage = {
  id: number;
  image: File;
};

export type ProductInfo = {
  images: ProductImageType[];
  newImages?: ProductNewImage[];
  deletedImageIds?: number[];
  title: string;
  category: Pick<CategoryInfo, "id" | "name">;
  price: string;
  content: string;
  address?: AddressInfo;
};
