import { useProductDetailQuery } from "@api/product/queries";
import { BackButton, MoreButton } from "@components/ProductDetail/Buttons";
import ProductContents from "@components/ProductDetail/ProductContents/ProductContents";
import ProductImageList from "@components/ProductDetail/ProductImageList";
import TopBar from "@components/TopBar";
import useScroll from "@hooks/useScroll";
import { Page } from "@styles/common";
import { useParams } from "react-router-dom";
import { useMemberValue } from "store";

export default function ProductDetail() {
  const member = useMemberValue();
  const { productId } = useParams();
  const { scrollY, ref } = useScroll();

  const { data: productDetailInfo, isSuccess } = useProductDetailQuery(
    Number(productId),
    !!productId
  );

  const isSeller = member?.id === productDetailInfo?.product.seller.id;
  const isScroll = !!scrollY && scrollY > 0;

  return (
    <Page ref={ref}>
      <TopBar
        backgroundColor="accentPrimary"
        isScrolled={isScroll}
        leftBtn={<BackButton />}
        rightBtn={isSeller && <MoreButton />}
      />
      {isSuccess && (
        <>
          <ProductImageList productImages={productDetailInfo.images} />
          <ProductContents
            productInfo={productDetailInfo.product}
            stats={productDetailInfo.stats}
          />
        </>
      )}
    </Page>
  );
}
