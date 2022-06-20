import { useRouter } from "next/router";
import React from "react";
import { getQuestions, selectQuestion } from "../../redux/botSlice";
import { useAppDispatch } from "../../redux/hooks";
import { ROUTEMAP } from "../../utils/constants";

type Props = {
  question: { [key: string]: string };
  index: number;
};

function QuestionItem({ question, index }: Props) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleClick = async () => {
    await dispatch(
      selectQuestion({
        id: question._id,
        index: index,
      })
    );

    dispatch(
      getQuestions({ path: ROUTEMAP[router.pathname as keyof typeof ROUTEMAP],...router.query })
    );
  };

  return (
    <p
      onClick={handleClick}
      className="p-2 cursor-pointer rounded-3xl border-emerald-500 border-2 mt-2 text-emerald-500 max-w-[80%] hover:bg-emerald-50 hover:scale-[1.02] transition-all duration-150"
    >
      {question.question}
    </p>
  );
}

export default QuestionItem;
