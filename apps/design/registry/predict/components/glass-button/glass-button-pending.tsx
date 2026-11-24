"use client"

import { useState } from "react"

import { GlassButton } from "@workspace/ui/components/liquid-glass/glass-button"

export function GlassButtonPending() {
  const [saves, setSaves] = useState(0)

  return (
    <div className="flex flex-col items-center gap-4">
      <GlassButton
        material="tinted"
        className="bg-primary text-primary-foreground data-pending:opacity-60"
        onClick={async () => {
          await new Promise((resolve) => setTimeout(resolve, 1500))
          setSaves((count) => count + 1)
        }}
      >
        Save results
      </GlassButton>
      <p className="text-sm text-muted-foreground tabular-nums">
        Saved {saves} times
      </p>
    </div>
  )
}
