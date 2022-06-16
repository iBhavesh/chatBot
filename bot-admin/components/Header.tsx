import Image from "next/image";
import React from "react";
import { GROWW_ICON, USER_LOGO } from "../utils/constants";

function Header() {
  return (
    <div className="md:flex md:h-20 items-center justify-between mx-auto max-w-5xl">
      <div className="flex items-center" >
        <Image
          src={GROWW_ICON}
          alt=""
          width={40}
          height={40}
          className="cursor-pointer"
        />
        <h2 className="pl-2 text-2xl">Groww Bot Admin</h2>
      </div>
      <Image
        src={USER_LOGO}
        alt=""
        width={40}
        height={40}
        className="cursor-pointer"
      />
    </div>
  );
}

export default Header;
