import * as React from "react"
import { cn } from "@workspace/ui/lib/utils"
import { PredictMark } from "@workspace/ui/predict/logo"

/*
 * Shared pieces of the auth screens. Positions are absolute because every
 * auth frame in Figma places its layers on fixed y offsets of the 402 × 874
 * canvas; reproducing those offsets keeps each screen pixel-aligned.
 */

/** Places a child horizontally centred at a fixed y offset. */
export function At({
  top,
  className,
  style,
  ...props
}: React.ComponentProps<"div"> & { top: number }) {
  return (
    <div
      className={cn("absolute left-1/2 -translate-x-1/2", className)}
      style={{ top, ...style }}
      {...props}
    />
  )
}

/** The 64 × 72 PREDICT mark at the top of the auth screens (y 82). */
export function AuthMark({ top = 82 }: { top?: number }) {
  return (
    <At top={top} className="h-[72px] w-16">
      <PredictMark aria-label="PREDICT" className="size-full text-primary" />
    </At>
  )
}

/** Figma Glyseric 40px heading, rendered in Inter per the brand rules. */
export function AuthHeading({ className, ...props }: React.ComponentProps<"h1">) {
  return (
    <h1
      className={cn(
        "text-center text-[40px] leading-[52px] font-medium tracking-tight whitespace-nowrap text-foreground",
        className
      )}
      {...props}
    />
  )
}

/** Monochrome Figma icon drawn through a mask so it takes the text colour. */
export function MaskIcon({ src, className }: { src: string; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("inline-block shrink-0 bg-current", className)}
      style={{
        maskImage: `url(${src})`,
        maskSize: "contain",
        maskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskImage: `url(${src})`,
        WebkitMaskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
      }}
    />
  )
}

/** Primary pill (y 579) — 290 × 48, Roboto 16/24 in Figma. */
export const primaryButtonClass = "h-12 w-[290px] gap-1 px-7 text-base leading-6 font-normal"
/** Lavender pill (y 639) — 290 × 48, Roboto 14/20 in Figma. */
export const secondaryButtonClass = "h-12 w-[290px] gap-1 px-6 text-sm leading-5 font-normal"
