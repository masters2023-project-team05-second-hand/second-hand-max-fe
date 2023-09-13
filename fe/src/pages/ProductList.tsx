import ProductListFAB from "@components/ProductList/ProductListFAB";
import ProductListHeader from "@components/ProductList/ProductListHeader";
import NavigationBar from "@components/NavigationBar";
import ProductListItem from "@components/ProductListItem";
import { Page } from "@styles/common";
import { styled } from "styled-components";

const mockData = [
  {
    sellerId: 1,
    productId: 1,
    thumbnailUrl: "https://legacy.reactjs.org/logo-og.png",
    title: "리액트",
    addressName: "역삼 3동",
    createdTime: "2023-09-11T18:42:12",
    price: 56000,
    statusId: 1,
    stats: {
      chatCount: 0,
      likeCount: 0,
    },
  },
  {
    sellerId: 2,
    productId: 2,
    thumbnailUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png",
    title: "리액트 가지",
    addressName: "상계 6동",
    createdTime: "2023-09-08T17:55:24",
    price: 24000,
    statusId: 2,
    stats: {
      chatCount: 3,
      likeCount: 5,
    },
  },
  {
    sellerId: 3,
    productId: 3,
    thumbnailUrl:
      "https://blog.logrocket.com/wp-content/uploads/2020/07/react-native-geolocation.png",
    title: "리액트 가지가지",
    addressName: "역삼 1동",
    createdTime: "2023-09-12T16:20:00",
    price: 4800,
    statusId: 3,
    stats: {
      chatCount: 6,
      likeCount: 7,
    },
  },
  {
    sellerId: 3,
    productId: 4,
    thumbnailUrl:
      "https://blog.logrocket.com/wp-content/uploads/2020/07/react-native-geolocation.png",
    title: "리액트 가지가지",
    addressName: "역삼 1동",
    createdTime: "2023-09-12T16:20:00",
    price: 4800,
    statusId: 3,
    stats: {
      chatCount: 6,
      likeCount: 7,
    },
  },
  {
    sellerId: 3,
    productId: 5,
    thumbnailUrl:
      "https://blog.logrocket.com/wp-content/uploads/2020/07/react-native-geolocation.png",
    title: "리액트 가지가지",
    addressName: "역삼 1동",
    createdTime: "2023-09-12T16:20:00",
    price: 4800,
    statusId: 3,
    stats: {
      chatCount: 6,
      likeCount: 7,
    },
  },
  {
    sellerId: 3,
    productId: 6,
    thumbnailUrl:
      "https://blog.logrocket.com/wp-content/uploads/2020/07/react-native-geolocation.png",
    title: "리액트 가지가지",
    addressName: "역삼 1동",
    createdTime: "2023-09-12T16:20:00",
    price: 4800,
    statusId: 3,
    stats: {
      chatCount: 6,
      likeCount: 7,
    },
  },
  {
    sellerId: 3,
    productId: 7,
    thumbnailUrl:
      "https://blog.logrocket.com/wp-content/uploads/2020/07/react-native-geolocation.png",
    title: "리액트 가지가지",
    addressName: "역삼 1동",
    createdTime: "2023-09-12T16:20:00",
    price: 4800,
    statusId: 3,
    stats: {
      chatCount: 6,
      likeCount: 7,
    },
  },
];

export default function ProductList() {
  // Memo: 상품 전체 목록 조회 전체 카테고리 일 경우, id=0으로 보내기
  return (
    <Page>
      <ProductListHeader />
      <StyledProductList>
        {mockData.map((productItem) => {
          return (
            <ProductListItem
              key={productItem.productId}
              productItem={productItem}
            />
          );
        })}
      </StyledProductList>
      <ProductListFAB />
      <NavigationBar />
    </Page>
  );
}

const StyledProductList = styled.ul`
  > li {
    border-bottom: 1px solid ${({ theme: { color } }) => color.neutralBorder};

    &:last-child {
      border-bottom: none;
    }
  }
`;
