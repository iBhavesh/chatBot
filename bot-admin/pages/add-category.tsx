import React, { useState } from "react";
import Head from "next/head";
import { ErrorMessage, Formik } from "formik";
import * as Yup from "yup";

import Input from "../components/Input";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import axiosInstance from "../axios.config";
import { addCategory } from "../redux/categoriesSlice";

function AddCategory() {
  const categories = useAppSelector((state) => state.categories.categories);
  const status = useAppSelector((state) => state.categories.status);
  const dispatch = useAppDispatch();

  return (
    <>
      <Head>
        <title>Add Category</title>
      </Head>
      <div className="mx-auto w-full max-w-5xl">
        <Formik
          initialValues={{
            parent: "",
            name: "",
          }}
          validationSchema={Yup.object({
            parent: Yup.string().required("Parent is required"),
            name: Yup.string().required("Category name is required"),
          })}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            await dispatch(addCategory(values));
            resetForm();
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <h1 className="my-4 text-2xl underline ">Add Category</h1>
              <label htmlFor="parent" className="text-gray-700 ">
                Parent Category
              </label>
              <select
                {...props.getFieldProps("parent")}
                name="parent"
                id="parent"
                className="mt-2 h-12 w-full rounded-lg border-2 bg-transparent pl-3 focus:outline-none"
              >
                <option value="">Select Parent Category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.path}
                  </option>
                ))}
              </select>
              <ErrorMessage
                component="div"
                className="text-md mt-2 pl-1 text-red-500"
                name="parent"
              />
              <Input
                label="Category Name"
                inputProps={{
                  ...props.getFieldProps("name"),
                  type: "text",
                  name: "name",
                  id: "name",
                }}
              />
              <ErrorMessage
                component="div"
                className="text-md mt-2 pl-1 text-red-500"
                name="name"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="mt-3 ml-2 h-12 w-32 rounded-md bg-emerald-500 text-white transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-black"
              >
                Add
              </button>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default AddCategory;
