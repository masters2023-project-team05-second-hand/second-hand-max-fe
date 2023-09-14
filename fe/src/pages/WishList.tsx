import {
  useUserLikeCategories,
  useUserWishlistInfiniteQuery,
} from "@api/user/queries";
import NavigationBar from "@components/NavigationBar";
import { SubInfo } from "@components/ProductDetail/common.style";
import Products from "@components/ProductList/Products";
import TopBar from "@components/TopBar";
import { TabButtons } from "@components/common/TabButtons";
import useDrag from "@hooks/useDrag";
import { Main, Page } from "@styles/common";
import { useState } from "react";
import styled from "styled-components";

export default function WishList() {
  const { data: userCategories, isSuccess: isUserCategoriesSuccess } =
    useUserLikeCategories();
  const [activeTabId, setActiveTabId] = useState(DEFAULT_TAB.id);
  const { data: categoryProducts, isSuccess: isCategoryProductsSuccess } =
    useUserWishlistInfiniteQuery(activeTabId);
  const { ref, onDragStart, onDragEnd, onDragMove } =
    useDrag<HTMLUListElement>();

  const isEmpty = categoryProducts?.pages[0].products.length === 0;
  const onTabClick = (tabId: number) => {
    setActiveTabId(tabId);
  };

  return (
    <Page>
      <TopBar
        title="관심 목록"
        backgroundColor="neutralBackgroundBlur"
        isWithBorder={true}
      />
      {isEmpty && (
        <Main>
          <SubInfo>관심 상품이 없습니다</SubInfo>
        </Main>
      )}
      {!isEmpty && (
        <PageContent>
          {isUserCategoriesSuccess && (
            <TabButtons
              ref={ref}
              activeTabId={activeTabId}
              tabList={[DEFAULT_TAB, ...userCategories]}
              onTabClick={onTabClick}
              onMouseDown={onDragStart}
              onMouseMove={onDragMove}
              onMouseUp={onDragEnd}
              onMouseLeave={onDragEnd}
            />
          )}
          {isCategoryProductsSuccess && (
            <Products productLists={categoryProducts.pages} />
          )}
        </PageContent>
      )}
      <NavigationBar />
    </Page>
  );
}

const DEFAULT_TAB = { id: 0, name: "전체" };

const PageContent = styled.div`
  max-width: 100%;
`;
