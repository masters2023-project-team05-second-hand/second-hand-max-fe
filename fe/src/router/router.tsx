import { Auth } from "@pages/Auth";
import Category from "@pages/Category";
import Chat from "@pages/Chat";
import MyAccount from "@pages/MyAccount/MyAccount";
import ProductDetail from "@pages/ProductDetail";
import ProductList from "@pages/ProductList";
import ProductRegister from "@pages/ProductRegister";
import Register from "@pages/Register";
import SalesList from "@pages/SalesList";
import WishList from "@pages/WishList";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import ProtectedRoutes from "./ProtectedRoutes";
import { ROUTE_PATH } from "./constants";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={ROUTE_PATH.home}>
      <Route element={<ProtectedRoutes />}>
        <Route index element={<ProductList />} />
        <Route path={ROUTE_PATH.category} element={<Category />} />
        <Route
          path={`${ROUTE_PATH.detail}/:productId`}
          element={<ProductDetail />}
        />
        <Route element={<PrivateRoutes />}>
          <Route path={ROUTE_PATH.new} element={<ProductRegister />} />
          <Route
            path={`${ROUTE_PATH.edit}/:productId`}
            element={<ProductRegister />}
          />
          <Route path={ROUTE_PATH.sales} element={<SalesList />} />
          <Route path={ROUTE_PATH.wish} element={<WishList />} />
          <Route path={ROUTE_PATH.chat} element={<Chat />} />
        </Route>
      </Route>
      <Route path={ROUTE_PATH.account} element={<MyAccount />} />
      <Route path={ROUTE_PATH.auth.index} element={<Auth />} />
      <Route path={ROUTE_PATH.register} element={<Register />} />
    </Route>
  )
);
