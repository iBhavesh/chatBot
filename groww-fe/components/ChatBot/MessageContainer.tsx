import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { getQuestions, setMessage } from "../../redux/botSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import BotResponse from "./BotResponse";
import BotQuestions from "./BotQuestions";
import UserResponse from "./UserResponse";
import { ROUTEMAP } from "../../utils/constants";
import TypingIndicator from "./TypingIndicator";

type Props = {
  show: boolean;
};

function MessageContainer(props: Props) {
  const router = useRouter();
  const [show, setShow] = useState(props.show);
  const botData = useAppSelector((state) => state.bot);
  const dispatch = useAppDispatch();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (props.show) {
      timeout = setTimeout(() => {
        setShow(props.show);
      }, 10);
    } else {
      timeout = setTimeout(() => {
        setShow(props.show);
      }, 110);
    }
    return () => clearTimeout(timeout);
  }, [props.show]);

  useEffect(() => {
    dispatch(
      getQuestions({
        path: ROUTEMAP[router.pathname as keyof typeof ROUTEMAP],
        ...router.query,
      })
    );
  }, [router.pathname, router.query, dispatch]);

  const handleKeyPress: React.KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.key === "Enter") {
      dispatch(setMessage(event.currentTarget.value));
      event.currentTarget.value = "";
      dispatch(
        getQuestions({
          path: ROUTEMAP[router.pathname as keyof typeof ROUTEMAP],
          ...router.query,
        })
      );
    }
  };

  useEffect(() => {
    containerRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [botData]);

  const className =
    props.show && show ? "opacity-100 bottom-20" : "opacity-0 bottom-0";

  return props.show || show ? (
    <div
      className={`flex flex-col w-96 h-4/6 fixed right-8 shadow-md rounded-md transition-all ease-linear duration-100 ${className}`}
    >
      <div className="bg-emerald-500 px-2 h-14 rounded-t-md flex items-center text-neutral-800">
        <p className="text-white">Groww Bot</p>
      </div>
      <div
        className={`scrollbar overflow-y-auto grow flex flex-col px-1 py-1 bg-gray-100 border-2 border-slate-50`}
      >
        <BotResponse text="Hello User! I am groww bot and I am here to assist you in yout queries." />
        {botData.messages.map((message, index) =>
          message.fromUser ? (
            <UserResponse text={message.message} key={index} />
          ) : (
            <BotResponse text={message.message} key={index} />
          )
        )}
        <BotQuestions question={botData.questions} />
        {botData.status === "loading" && <TypingIndicator />}
        <div ref={containerRef} className="invisible" />
      </div>
      <input
        type="text"
        name="message"
        id="message"
        placeholder="Ask your question..."
        className="outline-none px-1 py-2"
        onKeyPress={handleKeyPress}
      />
    </div>
  ) : null;
}

export default MessageContainer;
