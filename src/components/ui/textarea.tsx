import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  maxLength?: number; // Optional maxLength prop
  error?: boolean; // Optional error prop
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, maxLength, error, ...props }, ref) => {
    const { value } = props;
    // console.log("valuevaluevaluevalue", value);

    return (
      <div className="relative">
        <textarea
          className={cn(
            "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800",
            className,
            maxLength ? "pr-16" : "",
            error && "border-red-600 dark:border-red-500",
          )}
          value={value}
          ref={ref}
          {...props}
        />

        {maxLength && typeof value == "string" && (
          <div className="w-fit h-full absolute right-2 inset-y-0 flex items-center">
            <div className="h-[80%] px-1 flex items-center text-sm text-zinc-500 dark:text-zinc-400 bg-white dark:bg-zinc-900">
              {value.length}/{maxLength}
            </div>
          </div>
        )}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
