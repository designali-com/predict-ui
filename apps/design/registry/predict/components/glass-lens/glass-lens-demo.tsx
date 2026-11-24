"use client"

import { Tabs, TabsList, TabsPanel, TabsTab } from "@ui-sdk/react/tabs"
import { useState } from "react"

import { GlassLens } from "@workspace/ui/components/liquid-glass/glass-lens"

const tabs = [
  { value: "overview", label: "Overview", text: "Latest reading is in range." },
  { value: "history", label: "History", text: "Three panels this year." },
  { value: "notes", label: "Notes", text: "Collected after a 10 hour fast." },
]

export function GlassLensDemo() {
  const [value, setValue] = useState("overview")

  return (
    <Tabs
      value={value}
      onValueChange={(next) => setValue(String(next))}
      className="flex flex-col items-center gap-4"
    >
      <TabsList
        aria-label="Report"
        data-glass-host=""
        className="relative isolate inline-flex gap-1 rounded-xl bg-foreground/5 p-1"
      >
        <GlassLens value={value} />
        {tabs.map((tab) => (
          <TabsTab
            key={tab.value}
            value={tab.value}
            className="relative h-9 cursor-pointer rounded-lg px-4 text-sm font-medium text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring data-selected:text-secondary-foreground"
          >
            {tab.value === value && (
              <span
                aria-hidden
                data-glass-highlight=""
                className="absolute inset-0 rounded-lg bg-secondary [[data-glass-moving]_&]:opacity-0"
              />
            )}
            <span className="relative z-20">{tab.label}</span>
          </TabsTab>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsPanel
          key={tab.value}
          value={tab.value}
          className="text-sm text-muted-foreground"
        >
          {tab.text}
        </TabsPanel>
      ))}
    </Tabs>
  )
}
