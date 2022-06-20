import Image from "next/image";
import Link from "next/link";
import React from "react";
import constants from "../assets/constants";
import useAuth from "../hooks/useAuth";
import { USER_LOGO } from "../utils/constants";
import HeaderMenu from "./HeaderMenu";

const Header = () => {
  const authenticated = useAuth();
  return (
    <div
      className="md:flex md:h-20 justify-between items-center
     mx-auto max-w-5xl "
    >
      <div>
        <Image src={constants.LOGO} width="150" height="40" alt="" />
      </div>
      {authenticated && <HeaderMenu />}
      {!authenticated && (
        <Link href="/login">
          <div className="bg-emerald-500 w-40 cursor-pointer py-4 rounded-md text-white text-center">
            Login
          </div>
        </Link>
      )}
    </div>
  );
};

export default Header;
