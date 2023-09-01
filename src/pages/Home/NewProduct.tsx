import NewProductAddress from "@components/NewProduct/NewProductAddress";
import NewProductCategory from "@components/NewProduct/NewProductCategory";
import NewProductContent from "@components/NewProduct/NewProductContent";
import NewProductHeader from "@components/NewProduct/NewProductHeader";
import NewProductImage from "@components/NewProduct/NewProductImage";
import NewProductPrice from "@components/NewProduct/NewProductPrice";
import NewProductTitle from "@components/NewProduct/NewProductTitle";
import { useTitle } from "@components/NewProduct/store";
import { Page } from "@styles/common";
import { styled } from "styled-components";

export default function NewProduct() {
  const title = useTitle();

  return (
    <Page>
      <NewProductHeader />
      <Main>
        <NewProductImage />
        <div className="product-info">
          <NewProductTitle />
          {title && <NewProductCategory />}
        </div>
        <NewProductPrice />
        <NewProductContent />
      </Main>
      <NewProductAddress />
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
