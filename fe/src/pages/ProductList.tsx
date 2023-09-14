import NavigationBar from "@components/NavigationBar";
import ProductListFAB from "@components/ProductList/ProductListFAB";
import ProductListHeader from "@components/ProductList/ProductListHeader";
import Products from "@components/ProductList/Products";
import { Page } from "@styles/common";

const mockData = {
  products: [
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
  ],
  hasNext: false,
};

export default function ProductList() {
  return (
    <Page>
      <ProductListHeader />
      <Products productLists={[mockData]} />
      <ProductListFAB />
      <NavigationBar />
    </Page>
  );
}
