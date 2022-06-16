import React, { ReactNode } from "react";
import Header from "./Header";
import NavBar from "./NavBar";

type Props = {
  children: ReactNode;
};

function Layout(props: Props) {
  return (
    <>
      <Header />
      <NavBar />
      {props.children}
    </>
  );
}

export default Layout;
