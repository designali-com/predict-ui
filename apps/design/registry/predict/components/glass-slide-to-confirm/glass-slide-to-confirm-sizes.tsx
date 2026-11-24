"use client"

import { GlassSlideToConfirm } from "@workspace/ui/components/liquid-glass/glass-slide-to-confirm"

const sizes = ["sm", "md", "lg", "xl"] as const
const wait = () => new Promise((resolve) => setTimeout(resolve, 1200))

export function GlassSlideToConfirmSizes() {
  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-6">
      {sizes.map((size) => (
        <GlassSlideToConfirm
          key={size}
          size={size}
          hint={false}
          fillClassName="bg-primary text-primary-foreground"
          resetAfter={2000}
          onConfirm={wait}
        >
          Slide to confirm
        </GlassSlideToConfirm>
      ))}
    </div>
  )
}
