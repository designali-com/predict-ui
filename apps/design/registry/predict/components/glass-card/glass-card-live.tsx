"use client"

import { GlassCard } from "@workspace/ui/components/liquid-glass/glass-card"

export function GlassCardLive() {
  return (
    <div className="relative flex h-64 w-full max-w-md items-center justify-center overflow-hidden rounded-2xl border bg-card">
      <div className="absolute top-10 left-10 size-24 animate-bounce rounded-full bg-status-severe motion-reduce:animate-none" />
      <div className="absolute right-10 bottom-6 size-28 animate-pulse rounded-full bg-status-moderate motion-reduce:animate-none" />
      <GlassCard live tint={0.4} className="w-64 p-5">
        <p className="text-sm text-inherit opacity-80">Heart rate</p>
        <p className="text-3xl font-medium text-inherit tabular-nums">
          62 <span className="text-sm">bpm</span>
        </p>
      </GlassCard>
    </div>
  )
}
