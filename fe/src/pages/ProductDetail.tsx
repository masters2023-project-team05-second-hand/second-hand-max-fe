import { useProductDetailQuery } from "@api/product/queries";
import {
  BackButton,
  ChatButton,
  LikeButton,
  MoreButton,
} from "@components/ProductDetail/Buttons";
import ProductContents from "@components/ProductDetail/ProductContents/ProductContents";
import ProductImageList from "@components/ProductDetail/ProductImageList";
import TopBar from "@components/TopBar";
import useScroll from "@hooks/useScroll";
import { BottomBar, Page } from "@styles/common";
import { useParams } from "react-router-dom";
import { useMemberValue } from "store";
import styled from "styled-components";

export default function ProductDetail() {
  const member = useMemberValue();
  const { productId } = useParams();
  const { scrollY, ref } = useScroll();

  const { data: productDetailInfo, isSuccess } = useProductDetailQuery(
    Number(productId),
    !!productId
  );

  const isScroll = !!scrollY && scrollY > 0;
  const isSeller = member?.id === productDetailInfo?.product.seller.id;
  const productPrice =
    productDetailInfo?.product.price?.toLocaleString("ko-KR");

  return (
    <Page ref={ref}>
      <TopBar
        backgroundColor="accentPrimary"
        isScrolled={isScroll}
        leftBtn={<BackButton />}
        rightBtn={isSeller && <MoreButton />}
      />
      {isSuccess && (
        <StyledProductDetail>
          <ProductImageList productImages={productDetailInfo.images} />
          <ProductContents
            productInfo={productDetailInfo.product}
            stats={productDetailInfo.stats}
            isSeller={isSeller}
          />
        </StyledProductDetail>
      )}
      <BottomBar>
        <ButtonContainer>
          {isSuccess && (
            <LeftWrapper>
              <LikeButton isLiked={true} />
              <span>{productPrice ? `${productPrice} 원` : "가격미정"}</span>
            </LeftWrapper>
          )}
          <ChatButton />
        </ButtonContainer>
      </BottomBar>
    </Page>
  );
}

const StyledProductDetail = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 16px;
`;

const LeftWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
