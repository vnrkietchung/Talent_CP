import * as React from "react"
import { cn } from "@/src/lib/utils"
import { Search } from "lucide-react"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, ...props }, ref) => {
    return (
      <div className="relative flex items-center">
        {icon && (
          <div className="absolute left-2 flex items-center justify-center text-icon-neutral">
            {icon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            "flex h-[32px] w-full rounded-[8px] border border-border-neutral bg-white px-3 py-1 text-[13px] text-text-primary transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-text-hint focus-visible:outline-none focus-visible:border-brand disabled:cursor-not-allowed disabled:opacity-50",
            icon && "pl-8",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
