import * as React from "react"
import { cn } from "cn"

/**
 * Card used throughout the PREDICT mobile app ("PREDICT / Surface / Card" in
 * Figma): a white surface, 24px corners, and a soft inner shadow at the base.
 */
function AppCard({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="app-card"
      className={cn(
        "relative flex w-full flex-col gap-4 overflow-hidden rounded-[30px] backdrop-blur-md bg-secondary/20 p-8 text-foreground dark:shadow-[inset_0_-1px_8px_rgba(255,255,255,0.2)] shadow-[inset_0_-1px_8px_rgba(0,0,0,0.1)]",
        className
      )}
      {...props}
    />
  )
}

function AppCardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="app-card-header"
      className={cn("flex items-start justify-between gap-3", className)}
      {...props}
    />
  )
}

function AppCardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="app-card-title"
      className={cn(
        "text-xl leading-6 font-medium tracking-tight text-foreground",
        className
      )}
      {...props}
    />
  )
}

function AppCardDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="app-card-description"
      className={cn("mt-3 max-w-60 text-[10px] leading-[14px] text-foreground", className)}
      {...props}
    />
  )
}

export { AppCard, AppCardHeader, AppCardTitle, AppCardDescription }
