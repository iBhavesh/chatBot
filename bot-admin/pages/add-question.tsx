import React, { Fragment, useEffect, useMemo, useRef, useState } from "react";
import Head from "next/head";
import { ErrorMessage, Formik } from "formik";
import * as Yup from "yup";
import { Dialog, Switch, Transition } from "@headlessui/react";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import Input from "../components/Input";
import { getLeafNodes } from "../redux/categoriesSlice";
import axiosInstance from "../axios.config";

function AddQuestions() {
  const dispatch = useAppDispatch();
  const fieldValueRef = useRef<any>();
  const categories = useAppSelector(getLeafNodes);

  const [filters, setFilters] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [dynamicOptions, setDynamicOptions] = useState([]);

  const categoriesMap = useMemo(() => {
    const map: { [key: string]: any } = {};
    categories.forEach((category) => {
      map[category._id] = category.path;
    });
    return map;
  }, [categories]);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    (async () => {
      const response = await axiosInstance.get("/questions/filters");
      setFilters(response.data.data);
    })();
  }, []);

  const handleDynamicOptions = async (category: string, evalCondition: string) => {
    try {
      const response = await axiosInstance.get("/category/dynamic-options", {
        params: {
          path: categoriesMap[category],
          evalCondition,
        },
      });
      setDynamicOptions(response.data);
    } catch (error) {
      console.log(error);
      setDynamicOptions([]);
    }
  };

  const handleDynamicOptionClick: React.MouseEventHandler<HTMLParagraphElement> = (e) => {
    if (fieldValueRef.current)
      fieldValueRef.current.setFieldValue(
        "answer",
        `${fieldValueRef.current.values.answer} {${e.currentTarget.innerText}}`
      );
  };

  return (
    <div className="relative mx-auto w-full max-w-5xl">
      <Head>
        <title>Add Question</title>
      </Head>
      <Formik
        initialValues={{
          categoryId: "",
          evalCondition: "",
          question: "",
          isDynamic: false,
          answer: "",
        }}
        validationSchema={Yup.object({
          categoryId: Yup.string().required("Category is required"),
          question: Yup.string().required("Question is required"),
          isDynamic: Yup.boolean(),
          answer: Yup.string().required("Answer is required"),
        })}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          // resetForm();
          try {
            axiosInstance.post("/question", values);
          } catch (error) {
            console.log("ERROR", error);
          }
        }}
      >
        {(props) => {
          fieldValueRef.current = props;
          return (
            <>
              <form onSubmit={props.handleSubmit}>
                <h1 className="my-4 text-2xl underline ">Add Category</h1>
                <label htmlFor="category" className="text-gray-700 ">
                  Category
                </label>
                <select
                  {...props.getFieldProps("categoryId")}
                  onChange={(e) => {
                    handleDynamicOptions(e.target.value, props.values.evalCondition);
                    props.handleChange(e);
                  }}
                  name="categoryId"
                  id="categoryId"
                  className="mt-2 h-12 w-full rounded-lg border-2 bg-transparent pl-3 focus:outline-none"
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.path}
                    </option>
                  ))}
                </select>
                <ErrorMessage
                  component="div"
                  className="text-md mt-2 pl-1 text-red-500"
                  name="category"
                />
                <Input
                  label="Question"
                  inputProps={{
                    ...props.getFieldProps("question"),
                    type: "text",
                    name: "question",
                    id: "question",
                  }}
                />
                <ErrorMessage
                  component="div"
                  className="text-md mt-2 pl-1 text-red-500"
                  name="question"
                />
                <div className="my-2 flex items-center">
                  <label htmlFor="isDynamic" className="text-gray-700">
                    Dynamic
                  </label>
                  <Switch
                    name="isDynamic"
                    id="isDynamic"
                    checked={props.values.isDynamic}
                    onChange={(value: boolean) => props.setFieldValue("isDynamic", value)}
                    className={`${props.values.isDynamic ? "bg-emerald-500" : "bg-emerald-300"}
                relative
          ml-2 inline-flex h-7 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                  >
                    <span className="sr-only">Use setting</span>
                    <span
                      aria-hidden="true"
                      className={`${props.values.isDynamic ? "translate-x-7" : "translate-x-0"}
            pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                    />
                  </Switch>
                </div>
                <label htmlFor="evalCondition" className="text-gray-700 ">
                  Eval Condition
                </label>
                <select
                  {...props.getFieldProps("evalCondition")}
                  onChange={(e) => {
                    handleDynamicOptions(props.values.categoryId, e.target.value);
                    props.handleChange(e);
                  }}
                  name="evalCondition"
                  id="evalCondition"
                  className="mt-2 h-12 w-full rounded-lg border-2 bg-transparent pl-3 focus:outline-none"
                >
                  <option value="">Select Condition</option>
                  {filters.map((filter) => (
                    <option key={filter} value={filter}>
                      {filter}
                    </option>
                  ))}
                </select>
                <Input
                  label="Answer"
                  ref={fieldValueRef}
                  inputProps={{
                    ...props.getFieldProps("answer"),
                    type: "text",
                    name: "answer",
                    id: "answer",
                  }}
                />
                <ErrorMessage
                  component="div"
                  className="text-md mt-2 pl-1 text-red-500"
                  name="answer"
                />
                <div>
                  <button
                    type="button"
                    onClick={openModal}
                    className="mt-3 ml-2 h-12 rounded-md bg-emerald-500 px-2 text-white transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-black"
                  >
                    Show Dynamic Options
                  </button>
                  <button
                    type="submit"
                    className="mt-3 ml-2 h-12 w-32 rounded-md bg-emerald-500 text-white transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-black"
                  >
                    Add
                  </button>
                </div>
              </form>
              <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                  </Transition.Child>

                  <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                      <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                      >
                        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                          <Dialog.Title
                            as="h3"
                            className="text-lg font-medium leading-6 text-gray-900"
                          >
                            Dynamic Options
                          </Dialog.Title>
                          <div className="mt-2">
                            {dynamicOptions.length === 0 && (
                              <p
                                onClick={handleDynamicOptionClick}
                                className="text-md text-gray-500"
                              >
                                No dynamic options available.
                              </p>
                            )}
                            {dynamicOptions.map((option) => (
                              <p
                                onClick={handleDynamicOptionClick}
                                key={option}
                                className="cursor-pointer"
                              >
                                {option}
                              </p>
                            ))}
                          </div>

                          <div className="mt-4">
                            <button
                              type="button"
                              className="inline-flex justify-center rounded-md border border-transparent bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-900 hover:bg-emerald-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                              onClick={closeModal}
                            >
                              Close
                            </button>
                          </div>
                        </Dialog.Panel>
                      </Transition.Child>
                    </div>
                  </div>
                </Dialog>
              </Transition>
            </>
          );
        }}
      </Formik>
    </div>
  );
}

export default AddQuestions;
