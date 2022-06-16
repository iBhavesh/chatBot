import React, { memo } from "react";

type Props = {
  title: string;
  className?: string;
  navigate: (routeName: string) => void;
};

const NavItem = (props: Props) => {

  return (
    <li
      onClick={props.navigate.bind(null, props.title)}
      className={`text-lg pr-8 h-9 align-middle flex items-center cursor-pointer ${props.className}`}
    >
      {props.title}
    </li>
  );
};

export default memo(NavItem);
