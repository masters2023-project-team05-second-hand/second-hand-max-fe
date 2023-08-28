import Chat from "@pages/Chat";
import Category from "@pages/Home/Category";
import Home from "@pages/Home/Home";
import NewProduct from "@pages/Home/NewProduct";
import MyAccount from "@pages/MyAccount";
import Product from "@pages/Product";
import SalesList from "@pages/SalesList";
import WishList from "@pages/WishList";
import GlobalStyle from "@styles/GlobalStyle";
import { theme } from "@styles/designSystem";
import { PATH } from "constants/path";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <StyledApp>
        <BrowserRouter>
          <Routes>
            <Route path={PATH.home} element={<Home />} />
            <Route path="new" element={<NewProduct />} />
            <Route path="category" element={<Category />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path={PATH.sales} element={<SalesList />} />
            <Route path={PATH.wish} element={<WishList />} />
            <Route path={PATH.chat} element={<Chat />} />
            <Route path={PATH.account} element={<MyAccount />} />
          </Routes>
        </BrowserRouter>
      </StyledApp>
    </ThemeProvider>
  );
}

const StyledApp = styled.div`
  margin: 0 auto;
  max-width: 393px;
  min-height: 100vh;
`;
