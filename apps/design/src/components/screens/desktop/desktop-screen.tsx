import * as React from "react"
import { cn } from "@workspace/ui/lib/utils"

/**
 * Root of every desktop screen: a 1920 × 1080 canvas (the "Slide 16:9" frames
 * in Figma Section 9) painted with the --app-* theme, so it renders in light
 * or dark mode. Children lay out inside it; decorative layers can be absolute.
 */
export function DesktopScreen({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="desktop-screen"
      className={cn(
        "relative flex h-[1080px] w-[1920px] flex-col overflow-hidden bg-background font-sans text-foreground",
        className
      )}
      {...props}
    />
  )
}
