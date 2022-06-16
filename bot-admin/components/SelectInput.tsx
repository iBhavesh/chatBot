import React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

function Input({ className, placeholder, ...props }: Props) {
  return (
    <div>
      <div className="relative my-14 border-2 h-12 rounded-lg pl-3 focus-within:border-emerald-500">
        <input
          className={`block w-full h-12 focus:outline-none appearance-none bg-transparent ${className}`}
          {...props}
          autoComplete="off"
          placeholder=" "
        />
        <label htmlFor={props.id ?? ""} className="text-gray-500 absolute m-auto left-2 right-0 top-0 bottom-0 h-6 duration-200 z-[-1] origin-[0] ">
          {props.label}
        </label>
      </div>
    </div>
  );
}

export default Input;
