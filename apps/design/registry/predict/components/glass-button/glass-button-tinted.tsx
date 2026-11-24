"use client"

import { GlassButton } from "@workspace/ui/components/liquid-glass/glass-button"

export function GlassButtonTinted() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <GlassButton
        material="tinted"
        className="bg-primary text-primary-foreground"
      >
        Book test
      </GlassButton>
      <GlassButton
        material="tinted"
        className="bg-secondary text-secondary-foreground"
      >
        Save draft
      </GlassButton>
      <GlassButton material="tinted" className="bg-destructive text-white">
        Delete report
      </GlassButton>
    </div>
  )
}
