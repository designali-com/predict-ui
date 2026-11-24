"use client"

import { GlassButton } from "@workspace/ui/components/liquid-glass/glass-button"

export function GlassButtonDisabled() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <GlassButton
        disabled
        material="tinted"
        className="bg-primary text-primary-foreground"
      >
        Book test
      </GlassButton>
      <GlassButton disabled>View report</GlassButton>
    </div>
  )
}
