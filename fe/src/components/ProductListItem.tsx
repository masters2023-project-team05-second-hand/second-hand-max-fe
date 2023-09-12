import { styled } from "styled-components";
import { ReactComponent as DotsIcon } from "@assets/icon/dots.svg";
import { ReactComponent as MessageIcon } from "@assets/icon/message.svg";
import { ReactComponent as HeartIcon } from "@assets/icon/heart.svg";
import ProductStatus from "@components/ProductStatus";
import Button from "@components/common/Buttons/Button";
import { getFormattedPrice, getTimeLine } from "@utils/index";
import { useNavigate } from "react-router-dom";
import MenuIndicator from "./common/Menu/MenuIndicator";

type ProductItem = {
  sellerId: number;
  productId: number;
  thumbnailUrl: string;
  title: string;
  addressName: string;
  createdTime: string;
  price: number;
  statusId: number;
  stats: {
    chatCount: number;
    likeCount: number;
  };
};

type ProductListItemProps = {
  productItem: ProductItem;
};

export default function ProductListItem({ productItem }: ProductListItemProps) {
  const navigate = useNavigate();

  const onProductClick = () => {
    navigate(`/product-detail/${productItem.productId}`);
  };

  const onMoreButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    console.log("더보기 버튼 클릭");
  };

  const moreButtonItems = [
    {
      name: "게시글 수정",
      onClick: () => {
        // Memo: 생성 페이지, 수정 페이지 모두 product-register로 바꿀까요??
        navigate(`/product-edit/${productItem.productId}`);
      },
    },
    {
      name: "판매 중 상태로 전환",
      onClick: () => {
        // Todo: 판매 상태 변경 api 붙이기
        console.log("판매 중");
      },
    },
    {
      name: "판매 완료 상태로 전환",
      onClick: () => {
        // Todo: 판매 상태 변경 api 붙이기
        console.log("판매 완료");
      },
    },
    {
      name: "삭제",
      onClick: () => {
        // Todo: 상품 삭제 api 붙이기, 삭제하시겠습니까 모달 띄우기
        console.log("상품 삭제");
      },
      isWarning: true,
    },
  ];

  // Todo: memberId와 비교하는 로직으로 바꿔야함
  const isSeller = productItem.sellerId !== 0;

  return (
    <StyledProductListItem onClick={onProductClick}>
      <Product>
        <ProductImage src={productItem.thumbnailUrl} alt="" />
        <ProductInfo>
          <div className="info-main">
            <div className="info-top">
              <TextDefault>{productItem.title}</TextDefault>
              {isSeller && (
                <MenuIndicator
                  className="more"
                  button={
                    <Button
                      leftIcon={<DotsIcon />}
                      onClick={onMoreButtonClick}
                    />
                  }
                  itemList={moreButtonItems}
                  positionX="right"
                  positionY="bottom"
                />
              )}
            </div>
            <div className="info-middle">
              <TextWeak>{productItem.addressName}</TextWeak>
              <TextWeak>・</TextWeak>
              <TextWeak>{getTimeLine(productItem.createdTime)}</TextWeak>
            </div>
            <div className="info-bottom">
              <ProductStatus id={productItem.statusId} />
              <TextBold>
                {getFormattedPrice(productItem.price.toString())}원
              </TextBold>
            </div>
          </div>
          <div className="info-history">
            {!!productItem.stats.chatCount && (
              <>
                <History>
                  <MessageIcon />
                  <TextWeak>{productItem.stats.chatCount}</TextWeak>
                </History>
              </>
            )}
            {!!productItem.stats.likeCount && (
              <>
                <History>
                  <HeartIcon />
                  <TextWeak>{productItem.stats.likeCount}</TextWeak>
                </History>
              </>
            )}
          </div>
        </ProductInfo>
      </Product>
    </StyledProductListItem>
  );
}

const StyledProductListItem = styled.li`
  margin: 0 16px;
`;

const Product = styled.div`
  padding: 16px 0;
  height: 152px;
  box-sizing: border-box;
  display: flex;
  gap: 16px;

  &:not(&:has(.more:hover)):hover {
    cursor: pointer;
    opacity: ${({ theme: { opacity } }) => opacity.hover};
  }
`;

const ProductImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: ${({ theme: { radius } }) => radius[8]};
`;

const ProductInfo = styled.div`
  flex: 1;
  height: 120px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  .info-main {
    display: flex;
    flex-direction: column;
    gap: 4px;

    .info-top {
      display: flex;
      justify-content: space-between;

      .more {
        &:hover {
          svg {
            filter: ${({ theme: { filter } }) => filter.neutralTextWeak};
          }
        }
      }
    }

    .info-middle {
      display: flex;
    }

    .info-bottom {
      display: flex;
      gap: 4px;
    }
  }

  .info-history {
    display: flex;
    gap: 8px;
    margin-left: auto;
  }
`;

const TextDefault = styled.span`
  color: ${({ theme: { color } }) => color.neutralText};
  font: ${({ theme: { font } }) => font.displayDefault16};
`;

const TextWeak = styled.span`
  color: ${({ theme: { color } }) => color.neutralTextWeak};
  font: ${({ theme: { font } }) => font.displayDefault12};
`;

const TextBold = styled.span`
  color: ${({ theme: { color } }) => color.neutralTextStrong};
  font: ${({ theme: { font } }) => font.displayStrong16};
`;

const History = styled.div`
  display: flex;

  align-items: center;
  gap: 4px;

  svg {
    width: 16px;
    height: 16px;
    filter: ${({ theme: { filter } }) => filter.neutralTextWeak};
  }
`;
