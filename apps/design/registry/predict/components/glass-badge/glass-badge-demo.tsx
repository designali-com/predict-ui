"use client"

import { GlassBadge } from "@workspace/ui/components/liquid-glass/glass-badge"

export function GlassBadgeDemo() {
  return (
    <div className="relative w-full max-w-xs rounded-2xl border bg-card p-6">
      <GlassBadge className="absolute -top-2.5 -right-3 bg-primary text-primary-foreground">
        New
      </GlassBadge>
      <p className="text-sm text-muted-foreground">Biological age</p>
      <p className="text-3xl font-medium text-foreground tabular-nums">34.2</p>
    </div>
  )
}
