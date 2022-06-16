import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { useEffect } from "react";
import { useAppDispatch } from "../redux/hooks";
import { fetchCategories } from "../redux/categoriesSlice";

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
    </Provider>
  );
}

export default CustomApp;
