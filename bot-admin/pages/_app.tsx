import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";

import Layout from "../components/Layout";
import Toast from "../components/Toast";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { useEffect } from "react";
import { useAppDispatch } from "../redux/hooks";
import { fetchCategories } from "../redux/categoriesSlice";

import "react-toastify/dist/ReactToastify.min.css";

function MyApp({ Component, pageProps }: AppProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <MyApp Component={Component} {...pageProps} />
      <Toast />
      <ToastContainer />
    </Provider>
  );
}

export default CustomApp;
