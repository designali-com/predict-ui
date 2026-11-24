"use client"

import { useState } from "react"

import { GlassTabs } from "@workspace/ui/components/liquid-glass/glass-tabs"

const options = [
  { value: "metric", label: "Metric" },
  { value: "imperial", label: "Imperial" },
]

export function GlassTabsColor() {
  const [units, setUnits] = useState("metric")

  return (
    <GlassTabs
      aria-label="Units"
      size="lg"
      value={units}
      onValueChange={setUnits}
      options={options}
      highlightClassName="bg-secondary"
    />
  )
}
