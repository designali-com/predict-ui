"use client"

import { GlassSelect } from "@workspace/ui/components/liquid-glass/glass-select"

const options = [
  { value: "home", label: "Home collection" },
  { value: "lab", label: "Lab visit" },
  { value: "clinic", label: "Clinic visit (full)", disabled: true },
]

export function GlassSelectDisabled() {
  return (
    <div className="flex flex-wrap justify-center gap-6">
      <GlassSelect label="Collection" defaultValue="home" options={options} />
      <GlassSelect
        disabled
        label="Phlebotomist"
        placeholder="Assigned later"
        options={[]}
      />
    </div>
  )
}
