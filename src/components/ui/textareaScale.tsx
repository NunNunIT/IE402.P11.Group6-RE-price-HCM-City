import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  maxLength?: number; // Optional maxLength prop
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, maxLength, ...props }, ref) => {
    const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);

    // Auto-resize function
    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const target = e.target;
      target.style.height = "auto"; // Reset the height
      const newHeight = Math.min(target.scrollHeight, 200); // Calculate height but max 200px
      target.style.height = `${newHeight}px`; // Set the new height
    };

    React.useEffect(() => {
      if (textareaRef.current) {
        const textarea = textareaRef.current;
        textarea.style.height = "auto"; // Reset height on mount
        textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`; // Adjust height based on content
      }
    }, [props.value]);

    return (
      <div className="relative">
        <textarea
          className={cn(
            "relative flex items-center h-12 w-full mxs:!max-w-none mm:!max-w-none ml:!max-w-none rounded-md border border-zinc-200 bg-white px-4 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:ring-offset-zinc-950 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300",
            className,
            maxLength ? "pr-16" : "",
            "h-12 max-h-[200px] overflow-y-auto resize-none" // Initial height of h-12, scales to max 200px
          )}
          ref={ref}
          onInput={handleInput}
          {...props}
        />

        {maxLength && typeof props.value === "string" && (
          <div className="w-fit h-full absolute right-2 inset-y-0 flex items-center">
            <div className="h-[80%] px-1 flex items-center text-sm text-zinc-500 dark:text-zinc-400 bg-white dark:bg-zinc-900">
              {props.value.length}/{maxLength}
            </div>
          </div>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
