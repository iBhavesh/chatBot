import Image from "next/image";
import React, { useState } from "react";
import { createPortal } from "react-dom";
import constants from "../../assets/constants";
import { hideBot } from "../../redux/botSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import MessageContainer from "./MessageContainer";

function ChatBot() {
  const [show, setShow] = useState(false);
  const dispatch = useAppDispatch();
  const showChatbox = useAppSelector((state) => state.bot.showBot);

  if (!show && showChatbox) {
    setShow(true);
  }

  const toggleShow = () => {
    if(showChatbox) dispatch(hideBot());
    setShow(value => !value);
  };

  return (
    <div>
      <MessageContainer show={show} />
      <div
        onClick={toggleShow}
        className="h-12 w-12 rounded-full fixed bottom-4 right-8 cursor-pointer "
      >
        <Image src={constants.ICON} layout="fill" alt="" />
      </div>
    </div>
  );
}

const Portal = () => createPortal(<ChatBot />, document.body);

export default Portal;
