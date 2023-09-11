export const PRODUCT_API_PATH = {
  categories: "/api/categories",
  productDetail: (productId: number) => `/api/products/${productId}`,
  addresses: (page: number, size: number) =>
    `/api/addresses?page=${page}&size=${size}`,
  newProduct: "/api/products",
  editProduct: (productId: number) => `/api/products/${productId}`,
};
