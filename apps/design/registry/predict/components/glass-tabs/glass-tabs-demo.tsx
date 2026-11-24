"use client"

import { useState } from "react"

import { GlassTabs } from "@workspace/ui/components/liquid-glass/glass-tabs"

const options = [
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
  { value: "year", label: "Year" },
]

export function GlassTabsDemo() {
  const [range, setRange] = useState("month")

  return (
    <GlassTabs
      aria-label="Date range"
      value={range}
      onValueChange={setRange}
      options={options}
    />
  )
}
