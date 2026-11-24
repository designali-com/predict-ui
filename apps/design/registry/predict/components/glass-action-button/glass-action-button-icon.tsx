"use client"

import { DownloadIcon } from "lucide-react"

import { GlassActionButton } from "@workspace/ui/components/liquid-glass/glass-action-button"

const wait = () => new Promise((resolve) => setTimeout(resolve, 1800))

export function GlassActionButtonIcon() {
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
      <GlassActionButton
        tint={0.35}
        icon={<DownloadIcon />}
        pendingLabel="Preparing"
        successLabel="Downloaded"
        resetAfter={2500}
        onAction={wait}
      >
        Download report
      </GlassActionButton>
    </div>
  )
}
