import * as React from "react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  childLeft?: React.ReactNode
  childRight?: React.ReactNode
}

const CustomizeInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, childLeft, childRight, ...props }, ref) => {
    return (
      <div className={cn("relative flex items-center w-full")}>
        {childLeft && (
          <div className="absolute left-2 flex items-center pointer-events-none">
            {childLeft}
          </div>
        )}
        <Input
          ref={ref}
          className={cn(
            childLeft && "pl-8",
            childRight && "pr-8",
            className
          )}
          {...props}
        />
        {childRight && (
          <div className="absolute right-2 flex items-center pointer-events-none">
            {childRight}
          </div>
        )}
      </div>
    )
  }
)
CustomizeInput.displayName = "Input"

export { CustomizeInput as Input }