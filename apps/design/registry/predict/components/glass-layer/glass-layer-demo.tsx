"use client"

import { ArrowUpRightIcon } from "lucide-react"
import Link from "next/link"

import { GlassLayer } from "@workspace/ui/components/liquid-glass/glass-layer"

export function GlassLayerDemo() {
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
      <Link
        href="/docs"
        data-glass-host=""
        className="inline-flex h-12 items-center gap-2 rounded-full border border-foreground/10 bg-background/40 px-6 text-sm font-semibold text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <GlassLayer tint={0.35} />
        Read the docs
        <ArrowUpRightIcon className="size-4" />
      </Link>
    </div>
  )
}
