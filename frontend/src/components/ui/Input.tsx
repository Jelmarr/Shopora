import { forwardRef, InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, type = "text", error, ...rest }, ref) => {
    const id = label.toLowerCase().replace(/\s+/g, "-");

    return (
      <>
        <div className="bg-white rounded-lg w-full group">
          <div className="relative bg-inherit">
            <input
              ref={ref}
              type={type}
              id={id}
              {...rest}
              className={`peer h-10 w-full bg-transparent rounded-lg text-black placeholder-transparent ring-1 px-2 ${
                error ? "ring-red-400" : "ring-gray-400"
              }`}
              placeholder={label}
            />

            <label
              htmlFor={id}
              className="absolute cursor-text select-none pointer-events-none left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sm transition-all"
            >
              {label}
            </label>
          </div>
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
      </>
    );
  },
);

Input.displayName = "Input";

export default Input;
