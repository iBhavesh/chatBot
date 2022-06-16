import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useState, useEffect } from "react";
import NavItem from "./NavItem";

const classes = {
  Categories: "md:left-0 md:w-24",
  "Questions": "md:left-28 md:w-24",
  "Add Category": "md:left-56 md:w-32",
  "Add Question": "md:left-[23rem] md:w-32",
};

const Routes = ["Categories", "Questions", "Add Category", "Add Question"];
let isInitial = true;

const NavigationBar = () => {
  const {route,...router} = useRouter();
  const [bottomBarClass, setBottomBarClass] = useState(classes['Categories']);
  const [activeRoute, setActiveRoute] = useState(Routes[0]);


  useEffect(() => {
    const routeName = route.slice(1).split("-").map((r) => (r[0].toUpperCase() + r.slice(1))).join(" ");
    setActiveRoute(routeName);
    setBottomBarClass(classes[routeName as keyof typeof classes]);
  },[route]);


  const navigate = useCallback(
    (routeName: string) => {
      router.push(routeName.toLowerCase().replace(" ", "-"));
    },
    [router]
  );

  return (
    <nav className="border-b border-b-gray-200">
      <div className="relative max-w-5xl w-full mx-auto">
        <div
          className={`${bottomBarClass} h-1 bg-emerald-500 absolute left-[23rem] w-24 bottom-0 transition-[left,width] duration-200 ease-linear`}
        />
        <ul className="md:flex md:items-center ">
          {Routes.map((route) => (
            <NavItem
              title={route}
              key={route}
              className={route === activeRoute ? "text-emerald-500" : ""}
              navigate={navigate}
            />
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavigationBar;
