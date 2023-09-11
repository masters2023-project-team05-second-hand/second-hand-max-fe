import Toaster from "@components/common/Toaster";
import { router } from "@router/router";
import GlobalStyle from "@styles/GlobalStyle";
import { theme } from "@styles/designSystem";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";

const queryClient = new QueryClient();

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <RouterProvider router={router} />
      </QueryClientProvider>
      <ModalRoot id="modal-root" />
      <Toaster />
    </ThemeProvider>
  );
}

const ModalRoot = styled.div`
  position: fixed;
  top: 0;
  z-index: 100;
`;
