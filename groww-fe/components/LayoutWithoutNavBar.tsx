import React, { ReactNode } from "react";
import Header from "./Header";
import NavigationBar from "./NavigationBar";

type LayoutWithoutNavBarProps = {
  children: ReactNode;
};

const LayoutWithoutNavBar = ({ children }: LayoutWithoutNavBarProps) => {
  return (
    <>
      <Header />
      <div className="border-b border-b-gray-200" />
      {children}
    </>
  );
};

export default LayoutWithoutNavBar;
