import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import "react-toastify/dist/ReactToastify.min.css";
import "../styles/globals.css";

import ChatBot from "../components/ChatBot";
import { NextPageWithLayout } from "../utils/types";
import { ToastContainer } from "react-toastify";
import { useAppDispatch } from "../redux/hooks";
import { useEffect } from "react";
import { setAccessToken } from "../redux/userSlice";

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    dispatch(setAccessToken({ accessToken, refreshToken }));
  }, [dispatch]);

  return (
    <Provider store={store}>
      {getLayout(
        <>
          <Component {...pageProps} />
          <ChatBot />
          <ToastContainer />
        </>
      )}
    </Provider>
  );
}

function CustomApp({ Component, pageProps }: AppPropsWithLayout) {
  return (
    <Provider store={store}>
      <MyApp Component={Component} {...pageProps} />
    </Provider>
  );
}

export default CustomApp;
