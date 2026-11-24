"use client"

import { GlassBadge } from "@workspace/ui/components/liquid-glass/glass-badge"

const speeds = [0.2, 0.4, 0.8]

export function GlassBadgeSpeed() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-8">
      {speeds.map((speed) => (
        <div key={speed} className="relative flex flex-col items-center gap-2">
          <GlassBadge
            speed={speed}
            dotColor="var(--status-mild)"
            className="bg-primary text-primary-foreground"
          >
            Live
          </GlassBadge>
          <span className="text-xs text-muted-foreground tabular-nums">
            {speed}
          </span>
        </div>
      ))}
    </div>
  )
}
