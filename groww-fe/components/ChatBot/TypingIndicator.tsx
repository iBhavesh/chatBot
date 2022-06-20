import React from "react";

function TypingIndicator() {
  return (
    <div className="bg-white flex rounded-md px-2 mt-2 py-4 w-16 justify-around">
      <div className="bg-slate-300 h-2 w-2 rounded-full ti-animate" />
      <div className="bg-slate-300 h-2 w-2 rounded-full ti-animate" />
      <div className="bg-slate-300 h-2 w-2 rounded-full ti-animate" />
    </div>
  );
}

export default TypingIndicator;
