"use client"

import { GlassSlideToConfirm } from "@workspace/ui/components/liquid-glass/glass-slide-to-confirm"

const wait = () => new Promise((resolve) => setTimeout(resolve, 1800))

export function GlassSlideToConfirmDemo() {
  return (
    <GlassSlideToConfirm
      className="max-w-xs"
      fillClassName="bg-primary text-primary-foreground"
      pendingLabel="Booking"
      successLabel="Booked"
      resetAfter={2500}
      onConfirm={wait}
    >
      Slide to book test
    </GlassSlideToConfirm>
  )
}
