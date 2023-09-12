import { ProductInfo as ProductInfoType, ProductStats } from "@api/type";
import ProductInfo from "@components/ProductDetail/ProductContents/ProductInfo";
import SellerInfo from "@components/ProductDetail/ProductContents/SellerInfo";
import { SubInfo } from "@components/ProductDetail/common.style";
import styled from "styled-components";

export default function ProductContents({
  productInfo,
  stats,
}: {
  productInfo: ProductInfoType;
  stats: ProductStats;
}) {
  return (
    <StyledProductContents>
      <SellerInfo sellerName={productInfo.seller.nickname} />
      <ProductInfo
        title={productInfo.title}
        categoryName={productInfo.category.name}
        createdTime={productInfo.createdTime}
        contents={productInfo.contents}
      />
      <SubInfo className="product-stats-subInfo">
        <span>채팅 {stats.chatCount}</span>
        <span>관심 {stats.wishCount}</span>
        <span>조회 {stats.viewCount}</span>
      </SubInfo>
    </StyledProductContents>
  );
}

const StyledProductContents = styled.div`
  height: 60vh;
  position: absolute;
  padding: 1rem;
  top: 40vh;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .product-stats-subInfo {
    gap: 0.5rem;
  }
`;
