import * as React from "react";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  error?: boolean
}

export const inputStyle = cva(
  "flex h-12 w-full mxs:!max-w-none mm:!max-w-none ml:!max-w-none rounded-md border border-zinc-200 bg-white px-4 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:ring-offset-zinc-950 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300"
);

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, startIcon, endIcon, error, ...props }, ref) => {
    const { maxLength, value } = props;
    // console.log("valuevaluevaluevalue", value);

    return (
      <div className="relative w-full">
        {startIcon
          && <div className="w-6 h-6 absolute left-2 top-1/2 -translate-y-1/2 inset-y-0 flex justify-center items-center text-zinc-500">
            {startIcon}
          </div>}

        <input
          className={cn(
            inputStyle(),
            maxLength && "pr-14",
            startIcon && "pl-10",
            endIcon && "pr-10",
            error && "border-red-600 dark:border-red-500",
            className,
          )}
          ref={ref}
          {...props}
        />

        {maxLength
          && typeof value == "string"
          && <div className="w-fit h-full absolute right-2 inset-y-0 flex items-center">
            <div className="h-[80%] px-1 flex items-center text-sm text-zinc-500 dark:text-zinc-400 bg-transparent">
              {value.length}/{maxLength}
            </div>
          </div>}

        {endIcon
          && <div className="w-fit h-full absolute right-2 inset-y-0 flex items-center text-zinc-500 dark:text-zinc-500">
            {endIcon}
          </div>}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
