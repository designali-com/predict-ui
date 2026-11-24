"use client"

import { useState } from "react"

import { GlassSelect } from "@workspace/ui/components/liquid-glass/glass-select"

const options = [
  { value: "mg/dL", label: "mg/dL" },
  { value: "mmol/L", label: "mmol/L" },
]

export function GlassSelectControlled() {
  const [unit, setUnit] = useState<string | null>("mg/dL")

  return (
    <div className="flex flex-col gap-4">
      <GlassSelect
        label="Glucose unit"
        value={unit}
        onValueChange={setUnit}
        options={options}
      />
      <p className="text-sm text-muted-foreground">
        Results are shown in {unit}.
      </p>
    </div>
  )
}
