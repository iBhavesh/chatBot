import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon, TrashIcon } from "@heroicons/react/outline";
import React from "react";
import { useAppDispatch } from "../redux/hooks";
import { deleteQuestion } from "../redux/questionsSlice";

type Props = {
  question: { [key: string]: any };
};

const QuestionItem = ({ question }: Props) => {
  const dispatch = useAppDispatch();
  const handleDelete = () => {
    dispatch(deleteQuestion(question._id));
  };

  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className="mt-4 flex w-full justify-between rounded-lg bg-emerald-100 px-4 py-4 text-left text-sm font-medium text-emerald-900 hover:bg-emerald-200 focus:outline-none focus-visible:ring focus-visible:ring-emerald-500 focus-visible:ring-opacity-75">
            <span>{question.question}</span>
            <ChevronUpIcon
              className={`${open ? "rotate-180 transform" : ""} h-5 w-5 text-emerald-500`}
            />
          </Disclosure.Button>
          <Disclosure.Panel className="relative px-4 pt-4 pb-2">
            <div className="mb-2 flex">
              <h5 className="mr-3 ">
                <strong>Category:</strong>
              </h5>
              <p>{question.categoryId.path}</p>
            </div>
            {question.answer.replace("'+", "{").replace("+'", "}")}
            <TrashIcon
              onClick={handleDelete}
              className="tranistion-all absolute top-4 right-4 h-9 w-9 cursor-pointer stroke-red-500 p-2 duration-200 hover:h-10 hover:w-10 hover:rounded-full active:bg-red-300"
            />
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default QuestionItem;
