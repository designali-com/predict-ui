"use client"

import { GlassCard } from "@workspace/ui/components/liquid-glass/glass-card"

export function GlassCardDemo() {
  return (
    <div className="relative flex w-full max-w-md items-center justify-center overflow-hidden rounded-2xl bg-chart-2 p-12">
      <div
        aria-hidden
        className="absolute -top-8 left-1/4 size-32 rounded-full bg-chart-4 dark:bg-chart-3"
      />
      <div
        aria-hidden
        className="absolute right-1/4 -bottom-10 size-32 rounded-full bg-chart-4 dark:bg-chart-3"
      />
      <GlassCard className="w-64 p-5">
        <p className="text-sm text-inherit opacity-80">Biological age</p>
        <p className="text-3xl font-medium text-inherit tabular-nums">34.2</p>
        <p className="text-sm text-inherit opacity-80">
          2.8 years younger than your calendar age.
        </p>
      </GlassCard>
    </div>
  )
}
