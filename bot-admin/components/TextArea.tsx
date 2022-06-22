import React, { forwardRef } from "react";

type Props = {
  textAreaProps?: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  labelProps?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  >;
  label: string;
};

const TextArea = forwardRef<HTMLInputElement, Props>((props, ref) => {
  return (
    <div>
      <div className="relative mt-8 border-2 rounded-lg pl-3 focus-within:border-emerald-500">
        <textarea
          className={`custom-input block w-full h-12 focus:outline-none appearance-none bg-transparent ${props.textAreaProps?.className}`}
          {...props.textAreaProps}
          rows={4}
          autoComplete="off"
          placeholder=" "
          ref={ref}
        />
        <label
          htmlFor={props.textAreaProps?.id ?? ""}
          className="text-gray-500 absolute m-auto left-2 right-0 top-0 bottom-0 h-6 duration-200 z-[-1] origin-[0] "
        >
          {props.label}
        </label>
      </div>
    </div>
  );
});

TextArea.displayName = "TextArea";

export default TextArea;
