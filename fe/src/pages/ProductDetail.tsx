import { useProductDetailQuery } from "@api/product/queries";
import { ReactComponent as ChevronLeftIcon } from "@assets/icon/chevron-left.svg";
import { ReactComponent as DotsIcon } from "@assets/icon/dots.svg";
import ProductImageList from "@components/ProductDetail/ProductImageList";
import SellerInfo from "@components/ProductDetail/SellerInfo";
import TopBar from "@components/TopBar";
import Button from "@components/common/Buttons/Button";
import useScroll from "@hooks/useScroll";
import { Main, Page } from "@styles/common";
import { useParams } from "react-router-dom";

export default function ProductDetail() {
  const { productId } = useParams();
  const { scrollY, ref } = useScroll();

  const { data: productDetailInfo, isSuccess } = useProductDetailQuery(
    Number(productId),
    !!productId
  );

  const isScroll = !!scrollY && scrollY > 0;

  return (
    <Page ref={ref}>
      <TopBar
        backgroundColor="accentPrimary"
        isScrolled={isScroll}
        leftBtn={
          <Button
            value="뒤로"
            color="accentText"
            fontName="availableStrong16"
            leftIcon={<ChevronLeftIcon />}
          />
        }
        rightBtn={
          <Button // Todo: 판매자 / 구매자 나눠야 함
            color="accentText"
            leftIcon={<DotsIcon />}
          />
        }
      />
      {isSuccess && (
        <Main>
          <ProductImageList productImages={productDetailInfo.images} />
          <SellerInfo sellerName={productDetailInfo.product.seller.nickname} />
        </Main>
      )}
    </Page>
  );
}
