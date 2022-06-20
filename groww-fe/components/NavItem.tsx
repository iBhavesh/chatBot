import Link from "next/link";
import React, { memo, useMemo } from "react";

type Props = {
  title: string;
  className?: string;
};

const NavItem = (props: Props) => {
  const route = useMemo(
    () => props.title.toLowerCase().replace(" ", "-"),
    [props.title]
  );

  return (
    <Link href={`/${route}`}>
      <li
        className={`text-lg pr-8 h-9 align-middle flex items-center cursor-pointer ${props.className}`}
      >
        {props.title}
      </li>
    </Link>
  );
};

export default memo(NavItem);
