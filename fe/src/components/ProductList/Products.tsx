import { ProductItem, ProductList } from "@api/type";
import ProductListItem from "@components/ProductListItem";
import { styled } from "styled-components";

export default function Products({
  productLists,
}: {
  productLists: ProductList[];
}) {
  return (
    <StyledProductList>
      {productLists.map((productList) =>
        productList.products.map((productItem: ProductItem) => (
          <ProductListItem
            key={productItem.productId}
            productItem={productItem}
          />
        ))
      )}
    </StyledProductList>
  );
}

const StyledProductList = styled.ul`
  width: 100%;
`;
