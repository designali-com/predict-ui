"use client"

import { GlassActionButton } from "@workspace/ui/components/liquid-glass/glass-action-button"

const sizes = ["sm", "md", "lg"] as const
const wait = () => new Promise((resolve) => setTimeout(resolve, 1500))

export function GlassActionButtonSizes() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {sizes.map((size) => (
        <GlassActionButton
          key={size}
          size={size}
          material="tinted"
          className="bg-primary text-primary-foreground"
          resetAfter={2000}
          onAction={wait}
        >
          Continue
        </GlassActionButton>
      ))}
    </div>
  )
}
