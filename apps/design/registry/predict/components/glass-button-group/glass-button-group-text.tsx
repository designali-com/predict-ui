"use client"

import { MinusIcon, PlusIcon } from "lucide-react"
import { useState } from "react"

import {
  GlassButtonGroup,
  GlassButtonGroupItem,
  GlassButtonGroupText,
} from "@workspace/ui/components/liquid-glass/glass-button-group"

export function GlassButtonGroupWithText() {
  const [glasses, setGlasses] = useState(4)

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
      <GlassButtonGroup aria-label="Water intake" material="clear" tint={0.35}>
        <GlassButtonGroupItem
          aria-label="Remove a glass"
          disabled={glasses === 0}
          onClick={() => setGlasses((count) => count - 1)}
        >
          <MinusIcon />
        </GlassButtonGroupItem>
        <GlassButtonGroupText className="min-w-24 tabular-nums">
          {glasses} glasses
        </GlassButtonGroupText>
        <GlassButtonGroupItem
          aria-label="Add a glass"
          onClick={() => setGlasses((count) => count + 1)}
        >
          <PlusIcon />
        </GlassButtonGroupItem>
      </GlassButtonGroup>
    </div>
  )
}
