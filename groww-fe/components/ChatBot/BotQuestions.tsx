import React from "react";
import QuestionItem from "./QuestionItem";

type Props = {
  question: { [key: string]: string }[];
};

function BotResponse(props: Props) {
  return (
    <>
      {props.question.map((question, index) => (
        <QuestionItem key={question._id} question={question} index={index} />
      ))}
    </>
  );
}

export default BotResponse;
