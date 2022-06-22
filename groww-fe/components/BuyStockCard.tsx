import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { showCustomMessage } from "../redux/botSlice";
import { useAppDispatch } from "../redux/hooks";

type Props = {
  price: number;
};

function BuyStockCard({ price }: Props) {
  const [total, setTotal] = useState(price);
  const dispatch = useAppDispatch();

  const auth = useAuth();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setTotal(
      Number(
        (Number(event.target.value) * price).toString().padEnd(2, "0")
      ).toFixed(2)
    );
  };

  const handleBuy = () => {
    if (!auth) dispatch(showCustomMessage("Please login to buy stocks"));
  };

  return (
    <div className="flex justify-between flex-col border shadow-md px-3 py-2 w-1/2">
      <h4 className="text-2xl mb-20 border-b w-full pb-2">Buy Stock</h4>
      <div className="flex justify-between items-center mb-6">
        <label htmlFor="quantity" className="text-md">
          Quantity
        </label>
        <input
          onChange={handleChange}
          type="number"
          name="quantity"
          id="quantity"
          className="outline-none border rounded-sm py-2 text-md"
          defaultValue={1}
          min={1}
        />
      </div>
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-md">Market Price</h4>
        <h4 className="text-2xl">₹{price}</h4>
      </div>
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-md">Total</h4>
        <h4 className="text-2xl">₹{total}</h4>
      </div>
      <button
        onClick={handleBuy}
        className="bg-emerald-500  text-white text-xl w-full rounded-md h-12 mt-4"
      >
        Buy
      </button>
    </div>
  );
}

export default BuyStockCard;
