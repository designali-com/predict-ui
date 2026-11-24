"use client"

import { ActivityIcon, DropletIcon, HeartPulseIcon } from "lucide-react"
import { useState } from "react"

import { GlassTabs } from "@workspace/ui/components/liquid-glass/glass-tabs"

const options = [
  { value: "heart", label: "Heart", icon: <HeartPulseIcon /> },
  { value: "blood", label: "Blood", icon: <DropletIcon /> },
  { value: "muscle", label: "Muscle", icon: <ActivityIcon /> },
]

export function GlassTabsIcons() {
  const [area, setArea] = useState("heart")
  const [view, setView] = useState("heart")

  return (
    <div className="flex flex-col items-center gap-6">
      <GlassTabs
        aria-label="Health area"
        value={area}
        onValueChange={setArea}
        options={options}
      />
      <GlassTabs
        aria-label="Health area, icons only"
        value={view}
        onValueChange={setView}
        options={options.map(({ value, label, icon }) => ({
          value,
          icon,
          label: null,
          "aria-label": label,
        }))}
      />
    </div>
  )
}
