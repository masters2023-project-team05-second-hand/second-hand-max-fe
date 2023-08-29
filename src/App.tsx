import Chat from "@pages/Chat";
import Category from "@pages/Home/Category";
import Home from "@pages/Home/Home";
import NewProduct from "@pages/Home/NewProduct";
import MyAccount from "@pages/MyAccount";
import Product from "@pages/Product";
import SalesList from "@pages/SalesList";
import Test from "@pages/Test";
import WishList from "@pages/WishList";
import GlobalStyle from "@styles/GlobalStyle";
import { theme } from "@styles/designSystem";
import { PATH } from "constants/path";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path={PATH.home} element={<Home />} />
          <Route path={PATH.new} element={<NewProduct />} />
          <Route path={PATH.category} element={<Category />} />
          <Route path={PATH.product} element={<Product />} />
          <Route path={PATH.sales} element={<SalesList />} />
          <Route path={PATH.wish} element={<WishList />} />
          <Route path={PATH.chat} element={<Chat />} />
          <Route path={PATH.account} element={<MyAccount />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
