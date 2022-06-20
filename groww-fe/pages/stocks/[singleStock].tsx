import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchStocks, getSingleStock } from "../../redux/stockSlice";
import getLayout from "../../utils/getLayout";
import { NextPageWithLayout } from "../../utils/types";

type Props = {};

const SingleStock: NextPageWithLayout<Props> = (props) => {
  const router = useRouter();
  const stock = useAppSelector((state) =>
    getSingleStock(state, router.query.singleStock as string)
  );
  const dispatch = useAppDispatch();

  if (!stock) dispatch(fetchStocks());

  if (!stock) return null;

  return (
    <div className="max-w-5xl w-full mx-auto mt-3 flex">
      <Head>
        <title>Groww | {stock?.displayName}</title>
      </Head>
      <div className="flex flex-col w-1/2">
        <div>{<Image alt="" src={stock.logoUrl} height={40} width={40} />}</div>
        <div>
          <h5 className="text-lg">{stock.displayName}</h5>
          <h5 className="font-medium mt-1 text-2xl">₹{stock.ltp}</h5>
        </div>
        <div className="flex  mt-4">
          <div className="w-1/2 border-r-2 border-gray-300 mr-1 p-2">
            <div className="flex justify-between mb-2">
              <h4 className="text-gray-600">Market Cap</h4>
              <h4>₹{stock.marketCap.toFixed(2)}</h4>
            </div>
            <div className="flex justify-between mb-2">
              <h4 className="text-gray-600">P/B Ratio</h4>
              <h4>{stock.pbRatio.toFixed(2)}</h4>
            </div>
            <div className="flex justify-between mb-2">
              <h4 className="text-gray-600">Industry PE</h4>
              <h4>{stock.industryPe.toFixed(2)}</h4>
            </div>
          </div>
          <div className="w-1/2 p-2">
            <div className="flex justify-between mb-2">
              <h4 className="text-gray-600">ROE</h4>
              <h4>{stock.roe.toFixed(2)}%</h4>
            </div>
            <div className="flex justify-between mb-2">
              <h4 className="text-gray-600">EPS(TTM)</h4>
              <h4>{stock.epsTtm.toFixed(2)}</h4>
            </div>
            <div className="flex justify-between mb-2">
              <h4 className="text-gray-600">Book Value</h4>
              <h4>{stock.bookValue.toFixed(2)}</h4>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex">
          <label htmlFor="quantity">Quantity</label>
        </div>
      </div>
    </div>
  );
};

SingleStock.getLayout = getLayout;

export default SingleStock;
