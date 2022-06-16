import React, { forwardRef } from "react";

type Props = {
  inputProps?: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  labelProps?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  >;
  label: string;
};

const Input = forwardRef<HTMLInputElement, Props>((props, ref) => {
  return (
    <div>
      <div className="relative mt-8 border-2 h-12 rounded-lg pl-3 focus-within:border-emerald-500">
        <input
          className={`custom-input block w-full h-12 focus:outline-none appearance-none bg-transparent ${props.inputProps?.className}`}
          {...props.inputProps}
          autoComplete="off"
          placeholder=" "
          ref={ref}
        />
        <label
          htmlFor={props.inputProps?.id ?? ""}
          className="text-gray-500 absolute m-auto left-2 right-0 top-0 bottom-0 h-6 duration-200 z-[-1] origin-[0] "
        >
          {props.label}
        </label>
      </div>
    </div>
  );
});

Input.displayName = "Input";

export default Input;
