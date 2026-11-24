"use client"

import { GlassButton } from "@workspace/ui/components/liquid-glass/glass-button"

const sizes = ["sm", "md", "lg", "xl"] as const

export function GlassButtonSizes() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {sizes.map((size) => (
        <GlassButton
          key={size}
          size={size}
          material="tinted"
          className="bg-primary text-primary-foreground"
        >
          Continue
        </GlassButton>
      ))}
    </div>
  )
}
