import { userKeys } from "@api/queryKeys";
import { useUserSalesInfiniteQuery } from "@api/user/queries";
import NavigationBar from "@components/NavigationBar";
import { SubInfo } from "@components/ProductDetail/common.style";
import Products from "@components/ProductList/Products";
import TopBar from "@components/TopBar";
import { Loading } from "@components/common/Guide";
import { TabButtons } from "@components/common/TabButtons";
import { useIntersect } from "@hooks/useIntersect";
import { Main, Page, PageContent, Target } from "@styles/common";
import { useState } from "react";
import { useStatusesValue } from "store";
import { DEFAULT_TAB } from "store/constants";

export default function SalesList() {
  const productStatuses = useStatusesValue();
  const [activeTabId, setActiveTabId] = useState(DEFAULT_TAB.id);
  const {
    data: salesProducts,
    isSuccess: isSalesProductsSuccess,
    hasNextPage,
    isFetching,
    fetchNextPage,
  } = useUserSalesInfiniteQuery(activeTabId);

  const targetRef = useIntersect(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  });

  const isEmpty = salesProducts?.pages[0].products.length === 0;
  const onTabClick = (tabId: number) => {
    setActiveTabId(tabId);
  };

  return (
    <Page>
      <TopBar
        title="판매 내역"
        backgroundColor="neutralBackgroundBlur"
        isWithBorder={true}
      />
      <PageContent>
        {!!productStatuses.length && (
          <TabButtons
            activeTabId={activeTabId}
            tabList={[DEFAULT_TAB, ...productStatuses]}
            onTabClick={onTabClick}
          />
        )}
        {isSalesProductsSuccess && (
          <>
            {isEmpty ? (
              <>
                <Main>
                  <SubInfo>판매 내역이 없습니다</SubInfo>
                </Main>
              </>
            ) : (
              <Products
                productList={salesProducts.pages.map((page) => page.products)}
                invalidateQueryKey={userKeys.salesProduct(activeTabId).queryKey}
              />
            )}
          </>
        )}
        {isFetching ? (
          <Loading messages={["상품 목록 로딩 중"]} />
        ) : (
          <Target ref={targetRef} />
        )}
      </PageContent>
      <NavigationBar />
    </Page>
  );
}
