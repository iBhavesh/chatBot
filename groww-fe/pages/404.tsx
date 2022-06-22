import Head from "next/head";
import Link from "next/link";
import React, { ReactElement } from "react";
import LayoutWithoutNavBar from "../components/LayoutWithoutNavBar";
import { NextPageWithLayout } from "../utils/types";

const NotFound: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Groww</title>
      </Head>
      <div className="flex justify-center items-center h-96">
        <div className="flex flex-col items-center">
        <h2 className="text-4xl mb-10">Page not found</h2>
        <Link href="/stocks">
          <a className="text-2xl mb-10 text-">Back to Home</a>
        </Link>
        </div>
      </div>
    </>
  );
};

NotFound.getLayout = (page: ReactElement) => (
  <LayoutWithoutNavBar>{page}</LayoutWithoutNavBar>
);

export default NotFound;
