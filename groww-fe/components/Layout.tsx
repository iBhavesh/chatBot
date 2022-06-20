import React, { ReactNode } from "react";
import Header from "./Header";
import NavigationBar from "./NavigationBar";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <NavigationBar />
      {children}
    </>
  );
};

export default Layout;
