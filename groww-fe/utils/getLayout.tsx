import React, { ReactElement } from "react";
import Layout from "../components/Layout";

function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
}

export default getLayout;
