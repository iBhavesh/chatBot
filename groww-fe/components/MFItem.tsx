import React from "react";
import Image from "next/image";
import { MF } from "../redux/mfSlice";
import { useAppDispatch } from "../redux/hooks";
import { showCustomMessage } from "../redux/botSlice";

type Props = {
    mf:MF
}

function MFItem({mf}:Props) {
  const dispatch = useAppDispatch();
  return (
    <div onClick={() => {
      dispatch(showCustomMessage("You can't order more products"))
    }} className="transition-all hover:scale-[1.02] shadow-sm flex flex-col w-44 cursor-pointer rounded-md bg-white border-2 mr-2">
      <div className="px-5 items-start flex flex-col py-4">
        <Image
          src={mf.logoUrl}
          alt=""
          height={40}
          width={40}
        />
        <p className="mt-2 line-clamp-2 w-3/4 text-sm">
          {mf.schemeName}
        </p>
      </div>

      <div className="flex px-5 py-4">
        <span className="mr-2">{mf.return3Y}%</span>
        <span className="text-gray-400">(3Y)</span>
      </div>
    </div>
  );
}

export default MFItem;
