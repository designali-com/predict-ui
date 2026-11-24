"use client"

import { useState } from "react"

import { GlassTabs } from "@workspace/ui/components/liquid-glass/glass-tabs"

const sizes = ["sm", "md", "lg"] as const
const options = [
  { value: "overview", label: "Overview" },
  { value: "history", label: "History" },
  { value: "notes", label: "Notes" },
]

export function GlassTabsSizes() {
  const [value, setValue] = useState("overview")

  return (
    <div className="flex flex-col items-center gap-6">
      {sizes.map((size) => (
        <GlassTabs
          key={size}
          size={size}
          aria-label={`Report section, ${size}`}
          value={value}
          onValueChange={setValue}
          options={options}
        />
      ))}
    </div>
  )
}
