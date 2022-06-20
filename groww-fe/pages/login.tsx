import React, { useEffect } from "react";
import { ErrorMessage, Formik } from "formik";
import * as Yup from "yup";
import { login } from "../redux/userSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import Head from "next/head";
import useAuth from "../hooks/useAuth";

function Login() {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.user.status);
  useAuth("/stocks", true,true);

  return (
    <div className="mx-auto flex justify-center items-center h-screen">
      <Head>
        <title>Groww | Login</title>
      </Head>

      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("A valid email is required")
            .required("Email is required"),
          password: Yup.string()
            .required("Password is required")
            .min(6, "Password must be at least 6 characters"),
        })}
        onSubmit={async (values, formikHelpers) => {
          dispatch(login(values));
        }}
      >
        {(props) => (
          <form
            onSubmit={props.handleSubmit}
            className="bg-white border-2 shadow-sm rounded-md flex flex-col px-8 py-10"
          >
            <h5 className="text-2xl text-center mb-2">Login</h5>
            <div className="flex flex-col">
              <label className="mb-2" htmlFor="email">
                Email
              </label>
              <input
                {...props.getFieldProps("email")}
                className="border outline-none border-gray-500 px-2 rounded-md w-80 h-10"
                type="email"
                name="email"
                id="email"
              />
              <ErrorMessage
                name="email"
                component="span"
                className="text-red-500 mt-1"
              />
            </div>
            <div className="flex flex-col mt-3">
              <label className="mb-2" htmlFor="password">
                Password
              </label>
              <input
                {...props.getFieldProps("password")}
                className="border outline-none border-gray-500 px-2 rounded-md w-80 h-10"
                type="password"
                name="password"
                id="password"
              />
              <ErrorMessage
                name="password"
                component="span"
                className="text-red-500 mt-1"
              />
            </div>
            <div className="mt-2">
              <button
                disabled={status === "loading"}
                className="disabled:cursor-not-allowed disabled:bg-emerald-300 bg-emerald-500 hover:bg-emerald-400 text-white text-md rounded-md w-32 py-3"
              >
                Login
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default Login;
