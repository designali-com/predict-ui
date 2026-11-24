"use client"

import { GlassSelect } from "@workspace/ui/components/liquid-glass/glass-select"

const options = [
  { value: "full-body", label: "Full body" },
  { value: "cardiac", label: "Cardiac" },
  { value: "metabolic", label: "Metabolic" },
  { value: "thyroid", label: "Thyroid" },
]

export function GlassSelectDemo() {
  return (
    <GlassSelect
      label="Test panel"
      placeholder="Choose a panel"
      options={options}
    />
  )
}
