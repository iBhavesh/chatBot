import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Stock } from "../redux/stockSlice";

type Props = {
  stock: Stock;
};

const StockItem = ({ stock }:Props) => {
  const textColor = stock.dayChange > 0 ? "text-green-500" : "text-red-500";
  return (
    <Link href={`/stocks/${stock._id}`}>
      <div className="transition-all hover:scale-[1.02] shadow-sm flex justify-between flex-col w-44 cursor-pointer mr-4 rounded-md bg-white border-2">
        <div className="px-5 items-start flex flex-col py-4">
          <Image src={stock.logoUrl} alt="" height={40} width={40} />
          <p className="mt-2 line-clamp-2 w-3/4 text-sm">{stock.displayName}</p>
        </div>

        <div className="flex flex-col px-5 py-4">
          <span className="font-normal mr-2">₹{stock.ltp}</span>
          <span className={`${textColor}`}>
            {stock.dayChange.toFixed(2)} (
            {Math.round(stock.dayChangePerc).toFixed(2)}%)
          </span>
        </div>
      </div>
    </Link>
  );
};


export default StockItem;
