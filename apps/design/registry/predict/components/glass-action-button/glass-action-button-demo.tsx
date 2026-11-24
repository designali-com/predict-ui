"use client"

import { GlassActionButton } from "@workspace/ui/components/liquid-glass/glass-action-button"

const wait = () => new Promise((resolve) => setTimeout(resolve, 1800))

export function GlassActionButtonDemo() {
  return (
    <GlassActionButton
      material="tinted"
      className="bg-primary text-primary-foreground"
      pendingLabel="Booking"
      successLabel="Booked"
      resetAfter={2500}
      onAction={wait}
    >
      Book test
    </GlassActionButton>
  )
}
