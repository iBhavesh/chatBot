import React, { Fragment } from "react";
import { Transition } from "@headlessui/react";

type Props = {
  text: string;
};

function BotResponse(props: Props) {
  return (
    <Transition
      appear
      as={Fragment}
      show={true}
      enter="transition-all duration-100"
      enterFrom="-translate-x-full"
      enterTo="translate-x-0"
    >
      <pre className="max-w-[80%] my-1 p-2 rounded-bl-none bg-white rounded-md self-start text-sm whitespace-pre-wrap">
        {props.text}
      </pre>
    </Transition>
  );
}

export default BotResponse;
