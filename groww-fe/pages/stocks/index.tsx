import { NextPage } from "next";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import StockItem from "../../components/StockItem";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchStocks } from "../../redux/stockSlice";

import getLayout from "../../utils/getLayout";
import { NextPageWithLayout } from "../../utils/types";

const Stocks: NextPageWithLayout = () => {
  const dispatch = useAppDispatch();
  const stocks = useAppSelector((state) => state.stock.stocks);
  const status = useAppSelector((state) => state.stock.status);

  useEffect(() => {
    dispatch(fetchStocks());
  }, [dispatch]);

  return (
    <div className="max-w-5xl w-full mx-auto mt-3 flex">
      <Head>
        <title>Groww | Stocks</title>
      </Head>
      {stocks.map((stock) => (
        <StockItem key={stock._id} stock={stock} />
      ))}
    </div>
  );
};

Stocks.getLayout = getLayout;

export default Stocks;
