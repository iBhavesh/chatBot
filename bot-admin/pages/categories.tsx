import Head from "next/head";
import React from "react";
import CategoryItem from "../components/CategoryItem";
import { useAppSelector } from "../redux/hooks";

function Categories() {
  const categories = useAppSelector((state) => state.categories.categories);
  return (
    <div className="md:flex md:h-20 flex-col items-center mx-auto max-w-5xl pt-4">
      <Head>
        <title>Categories</title>
      </Head>
      {categories.map((category) => (
        <CategoryItem key={category._id} id={category._id} name={category.path} />
      ))}
    </div>
  );
}

export default Categories;
