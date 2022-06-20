import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useState, useEffect } from "react";
import NavItem from "./NavItem";

const classes = {
  Stocks: "md:left-0 md:w-16",
  "Mutual Funds": "md:left-20 md:w-32",
  "Fixed Deposits": "md:left-56 md:w-32",
};

const Routes = ["Stocks", "Mutual Funds", "Fixed Deposits"];

const NavigationBar = () => {
  const {route,...router} = useRouter();
  const [bottomBarClass, setBottomBarClass] = useState(classes.Stocks);
  const [activeRoute, setActiveRoute] = useState(Routes[0]);

  useEffect(() => {
    const routeName = route.split("/")[1].split("-").map((r) => (r[0].toUpperCase() + r.slice(1))).join(" ");
    setActiveRoute(routeName);
    setBottomBarClass(classes[routeName as keyof typeof classes]);
  },[route]);



  return (
    <nav className="border-b border-b-gray-200" >
      <div className="max-w-5xl w-full mx-auto relative">
        <div
          className={`${bottomBarClass} h-1 bg-emerald-500 absolute left-[23rem] w-24 bottom-0 transition-[left,width] duration-200 ease-linear`}
        />
        <ul className="md:flex md:items-center ">
          {Routes.map((route) => (
            <NavItem
              title={route}
              key={route}
              className={route === activeRoute ? "text-emerald-500" : ""}
            />
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavigationBar;
