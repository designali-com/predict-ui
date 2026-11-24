"use client"

import { ArrowRightIcon } from "lucide-react"

import { GlassButton } from "@workspace/ui/components/liquid-glass/glass-button"

export function GlassButtonDemo() {
  return (
    <div className="relative flex w-full max-w-md flex-wrap items-center justify-center gap-4 overflow-hidden rounded-2xl bg-chart-2 p-12">
      <div
        aria-hidden
        className="absolute -top-8 left-1/4 size-32 rounded-full bg-chart-4 dark:bg-chart-3"
      />
      <div
        aria-hidden
        className="absolute right-1/4 -bottom-10 size-32 rounded-full bg-chart-4 dark:bg-chart-3"
      />
      <GlassButton tint={0.35} icon={<ArrowRightIcon />}>
        View report
      </GlassButton>
    </div>
  )
}
