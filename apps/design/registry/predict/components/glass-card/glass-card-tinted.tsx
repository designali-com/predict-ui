"use client"

import { GlassCard } from "@workspace/ui/components/liquid-glass/glass-card"

export function GlassCardTinted() {
  return (
    <GlassCard
      material="tinted"
      className="w-64 bg-primary p-5 text-primary-foreground"
    >
      <p className="text-sm text-inherit opacity-80">Vitamin D</p>
      <p className="text-3xl font-medium text-inherit tabular-nums">
        42 <span className="text-sm">ng·mL⁻¹</span>
      </p>
      <p className="text-sm text-inherit opacity-80">
        Within the optimal range.
      </p>
    </GlassCard>
  )
}
