import { GetStaticProps, NextPage } from "next";
import React from "react";

const SSR: NextPage = (props) => {
  return <div className="text-3xl" >SSR{JSON.stringify(props)}</div>;
};

export const getStaticProps: GetStaticProps = (context) => {
  return {
    props: {
      date: new Date().toISOString(),
    },
    revalidate: 10,
  };
};

export default SSR;
