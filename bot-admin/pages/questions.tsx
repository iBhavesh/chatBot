import Head from "next/head";
import React, { useEffect } from "react";
import QuestionItem from "../components/QuestionItem";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchQuestions } from "../redux/questionsSlice";

function Questions() {
  const dispatch = useAppDispatch();
  const questions = useAppSelector((state) => state.questions.questions);

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);
  return (
    <div className="mx-auto max-w-5xl flex-col pt-4 md:flex md:h-20">
      <Head>
        <title>Questions</title>
      </Head>
      {questions.map((question) => (
        <QuestionItem key={question._id} question={question} />
      ))}
    </div>
  );
}

export default Questions;
