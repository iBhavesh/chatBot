import Head from "next/head";
import React, { useEffect } from "react";
import MFItem from "../../components/MFItem";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchMFS } from "../../redux/mfSlice";
import getLayout from "../../utils/getLayout";
import { NextPageWithLayout } from "../../utils/types";

const MutualFunds: NextPageWithLayout = () => {
  const dispatch = useAppDispatch();
  const mfs = useAppSelector((state) => state.mf.mfs);
  const status = useAppSelector((state) => state.mf.status);

  useEffect(() => {
    dispatch(fetchMFS());
  }, [dispatch]);
  
  return (
    <div className="max-w-5xl w-full mx-auto mt-3 flex">
      <Head>
        <title>Groww | Mutual Funds</title>
      </Head>
      {mfs.map((mf) => (
        <MFItem key={mf._id} mf={mf} />
      ))}
    </div>
  );
};

MutualFunds.getLayout = getLayout;

export default MutualFunds;
