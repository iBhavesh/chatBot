import { Transition } from "@headlessui/react";
import React, { Fragment } from "react";

type Props = {
  text: string;
};

function UserResponse(props: Props) {
  return (
    <Transition
      appear
      as={Fragment}
      show={true}
      enter="transition-all duration-200 ease-in "
      enterFrom="translate-x-full"
      enterTo="translate-x-0"
    >
      <div className="max-w-[80%] my-1 p-2 rounded-br-none text-slate-50 bg-slate-500 rounded-md self-end ">
        {props.text}
      </div>
    </Transition>
  );
}

export default UserResponse;
