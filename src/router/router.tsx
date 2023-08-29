import Chat from "@pages/Chat";
import Category from "@pages/Home/Category";
import Home from "@pages/Home/Home";
import NewProduct from "@pages/Home/NewProduct";
import MyAccount from "@pages/MyAccount";
import Product from "@pages/Product";
import SalesList from "@pages/SalesList";
import WishList from "@pages/WishList";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { PATH } from "./constant";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path={PATH.home} element={<Home />} />
      <Route path={PATH.new} element={<NewProduct />} />
      <Route path={PATH.category} element={<Category />} />
      <Route path={PATH.product} element={<Product />} />
      <Route path={PATH.sales} element={<SalesList />} />
      <Route path={PATH.wish} element={<WishList />} />
      <Route path={PATH.chat} element={<Chat />} />
      <Route path={PATH.account} element={<MyAccount />} />
    </>
  )
);
