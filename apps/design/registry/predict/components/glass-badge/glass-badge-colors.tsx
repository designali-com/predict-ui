"use client"

import { GlassBadge } from "@workspace/ui/components/liquid-glass/glass-badge"

const badges = [
  { label: "Normal", className: "w-20 bg-status-normal text-black" },
  { label: "Mild", className: "w-20 bg-status-mild text-black" },
  { label: "Severe", className: "w-20 bg-status-severe text-black" },
  { label: "Extreme", className: "w-20 bg-status-extreme text-black" },
]

export function GlassBadgeColors() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {badges.map((badge) => (
        <span key={badge.label} className="relative inline-flex">
          <GlassBadge className={badge.className}>{badge.label}</GlassBadge>
        </span>
      ))}
    </div>
  )
}
