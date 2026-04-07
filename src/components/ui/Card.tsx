import * as React from "react"
import { cn } from "@/src/lib/utils"

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-[12px] border-2 border-white bg-white/80 misa-shadow p-5",
        className
      )}
      {...props}
    />
  )
)
Card.displayName = "Card"

export { Card }
