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
import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="new" element={<NewProduct />} />
        <Route path="category" element={<Category />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/sales" element={<SalesList />} />
        <Route path="/wish" element={<WishList />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/account" element={<MyAccount />} />
      </Routes>
    </ThemeProvider>
  );
}
