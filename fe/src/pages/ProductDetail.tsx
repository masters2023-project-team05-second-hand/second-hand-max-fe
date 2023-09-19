import { useProductDetailQuery } from "@api/product/queries";
import BackButton from "@components/common/Buttons/BackButton";
import ChatButton from "@components/ProductDetail/Buttons/ChatButton";
import MoreButton from "@components/ProductDetail/Buttons/MoreButton";
import ProductLikeButton from "@components/ProductDetail/Buttons/ProductLikeButton";
import ProductContents from "@components/ProductDetail/ProductContents/ProductContents";
import ProductImageList from "@components/ProductDetail/ProductImageList";
import TopBar from "@components/TopBar";
import useScroll from "@hooks/useScroll";
import { useToast } from "@hooks/useToast";
import { ROUTE_PATH } from "@router/constants";
import { BottomBar, Page } from "@styles/common";
import { useNavigate, useParams } from "react-router-dom";
import { useMemberValue } from "store";
import styled from "styled-components";

export default function ProductDetail() {
  const member = useMemberValue();
  const { scrollY, ref } = useScroll();
  const { toast } = useToast();
  const navigate = useNavigate();

  const { productId } = useParams();
  const numberProductId = Number(productId);

  const { data: productDetailInfo, isSuccess: isProductDetailSuccess } =
    useProductDetailQuery(numberProductId, !!productId);

  const onClickChat = () => {
    if (!isProductDetailSuccess) {
      return;
    }

    if (isSeller && !!productDetailInfo.stats.chatCount) {
      toast({
        type: "info",
        title: "상품 상세 목록 조회 완료",
        message: "채팅한 이웃이 없습니다",
      });
      return;
    }

    if (isSeller) {
      // TODO: 채팅 목록 조회 api 나오면 수정 => 상품 id를 path에 넣어야할듯??
      navigate(ROUTE_PATH.chat);
    } else {
      // TODO: 채팅 상세 url 나오면 수정 => 채팅 id를 path에 넣어야할듯??
      navigate(ROUTE_PATH.chat);
    }
  };

  const isScroll = !!scrollY && scrollY > 0;
  const isSeller = member.id === productDetailInfo?.product.seller.id;
  const productPrice =
    productDetailInfo?.product.price?.toLocaleString("ko-KR");

  return (
    <Page ref={ref}>
      <TopBar
        backgroundColor="accentPrimary"
        isScrolled={isScroll}
        leftBtn={<BackButton color="accentText" />}
        rightBtn={isSeller && <MoreButton />}
      />
      {isProductDetailSuccess && (
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
          <LeftWrapper>
            <ProductLikeButton />
            {isProductDetailSuccess && (
              <span>{productPrice ? `${productPrice} 원` : "가격미정"}</span>
            )}
          </LeftWrapper>
          <ChatButton
            onClick={onClickChat}
            isSeller={isSeller}
            chatCount={productDetailInfo?.stats.chatCount}
          />
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
