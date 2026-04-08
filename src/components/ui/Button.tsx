import * as React from "react"
import { cn } from "@/src/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "default" | "sm" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-[8px] text-[13px] font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
          size === "default" && "h-[32px] min-w-[84px] px-3",
          size === "sm" && "h-[28px] px-3 text-[12px] min-w-[70px]",
          size === "icon" && "h-[32px] w-[32px] p-0",
          variant === "primary" && "bg-brand text-white hover:bg-brand/90",
          variant === "secondary" && "bg-white border border-border-neutral text-text-primary hover:bg-brand-light hover:text-brand hover:border-brand",
          variant === "ghost" && "bg-transparent text-text-primary hover:bg-brand-light hover:text-brand",
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button }
