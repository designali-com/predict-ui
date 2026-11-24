"use client"

import * as React from "react"
import { FileTextIcon } from "lucide-react"
import { cn } from "cn"

import { ChipFilter, DoctorAppShell, GlassCard, SearchField, Tag } from "./shared-g"

export const title = "Lab inbox"

const reports = [
  { name: "Usha Sethi", test: "CBC · Today, 08:40", flags: 2 },
  { name: "Suresh Sharma", test: "HbA1c · Today, 07:15", flags: 1 },
  { name: "Anjali Bansal", test: "Lipid panel · Yesterday", flags: 0 },
  { name: "Rajeev Verma", test: "Vitamin D & B12 · Yesterday", flags: 1 },
  { name: "Neha Kapoor", test: "Thyroid profile · 2 days ago", flags: 0 },
  { name: "Ankit Joshi", test: "Kidney function · 3 days ago", flags: 0 },
]

// Figma: Mobile / Lab inbox (2072:1122)
export default function LabInbox() {
  const [selected, setSelected] = React.useState("Usha Sethi")

  return (
    <DoctorAppShell eyebrow="Dr. Arjun" title="Lab inbox">
      <GlassCard className="shrink-0 gap-3 p-[22px]">
        <SearchField placeholder="Search patient or test" />
        <ChipFilter options={["All 12", "Review 5", "Flagged 2"]} defaultValue="Review 5" />
      </GlassCard>

      <GlassCard className="min-h-0 flex-1 gap-1.5 p-4">
        {reports.map((r) => {
          const on = selected === r.name
          return (
            <button
              key={r.name}
              type="button"
              aria-pressed={on}
              onClick={() => setSelected(r.name)}
              className={cn(
                "flex w-full shrink-0 items-center gap-3 rounded-[20px] border px-3 py-2.5 text-left transition-colors",
                on ? "border-primary/25 bg-card" : "border-transparent"
              )}
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-[14px] bg-card text-primary">
                <FileTextIcon className="size-5" strokeWidth={1.5} />
              </span>
              <span className="flex min-w-0 flex-1 flex-col gap-0.5 whitespace-nowrap">
                <span className="text-[17px] leading-[normal]">{r.name}</span>
                <span className="text-[11px] leading-[normal] text-foreground/60">{r.test}</span>
              </span>
              {r.flags > 0 ? (
                <Tag tone="flag">
                  {r.flags} {r.flags === 1 ? "flag" : "flags"}
                </Tag>
              ) : (
                <Tag>Normal</Tag>
              )}
            </button>
          )
        })}
      </GlassCard>
    </DoctorAppShell>
  )
}
