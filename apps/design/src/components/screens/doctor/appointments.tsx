"use client"

import * as React from "react"
import { ChevronLeftIcon, ChevronRightIcon, PlusIcon } from "lucide-react"
import { cn } from "cn"

import { AppButton as Button } from "@workspace/ui/predict/app/app-glass"

import { DoctorAppShell, DoctorCard, Tag } from "./shared-f"

export const title = "Appointments"

const days = [
  { id: "mon", day: "Mon", date: "9", count: 5 },
  { id: "tue", day: "Tue", date: "10", count: 3 },
  { id: "wed", day: "Wed", date: "11", count: 3 },
  { id: "thu", day: "Thu", date: "12", count: 3 },
  { id: "fri", day: "Fri", date: "13", count: 3 },
]

type SlotState = "past" | "current" | "next" | "upcoming"

const agenda: { time: string; name: string; detail: string; state: SlotState }[] = [
  { time: "09:00", name: "Usha Sethi", detail: "09:00 – 09:30 · Follow-up", state: "past" },
  { time: "10:00", name: "Suresh Sharma", detail: "10:00 – 10:30 · New", state: "current" },
  { time: "11:00", name: "Anjali Bansal", detail: "11:00 – 12:00 · Review", state: "next" },
  { time: "13:30", name: "Vivaan Mehta", detail: "13:30 – 14:00 · Video", state: "upcoming" },
  { time: "15:00", name: "Rakesh Kumar", detail: "15:00 – 15:30 · Follow-up", state: "upcoming" },
]

const slotStyle: Record<SlotState, string> = {
  past: "bg-secondary opacity-50",
  current: "bg-primary text-primary-foreground",
  next: "border border-primary/35 bg-background",
  upcoming: "bg-secondary",
}

const roundChip =
  "flex h-[30px] w-[30px] items-center justify-center rounded-full bg-secondary text-secondary-foreground"

// Figma: Mobile / Appointments (2072:903)
export default function Appointments() {
  const [selected, setSelected] = React.useState("mon")

  return (
    <DoctorAppShell
      eyebrow="Dr. Arjun"
      title="Appointments"
      tab="today"
      contentClassName="mt-[25px] h-[640px] gap-3.5"
    >
      {/* Week */}
      <DoctorCard className="shrink-0 rounded-[36px] p-[22px]">
        <div className="flex items-center gap-2">
          <p className="flex-1 text-xl whitespace-nowrap">9 – 13 Nov</p>
          <button type="button" aria-label="Previous week" className={roundChip}>
            <ChevronLeftIcon className="size-3" strokeWidth={1.5} />
          </button>
          <button type="button" aria-label="Next week" className={roundChip}>
            <ChevronRightIcon className="size-3" strokeWidth={1.5} />
          </button>
          <Button variant="app" className="h-[34px] gap-0.5 rounded-full px-4 text-[13px] font-medium">
            <PlusIcon className="size-3.5" strokeWidth={2} />
            New
          </Button>
        </div>
        <div className="flex gap-1.5">
          {days.map((d) => {
            const on = selected === d.id
            return (
              <button
                key={d.id}
                type="button"
                aria-pressed={on}
                onClick={() => setSelected(d.id)}
                className={cn(
                  "flex min-w-0 flex-1 flex-col items-center gap-0.5 rounded-[20px] py-2.5 whitespace-nowrap",
                  on ? "bg-primary text-primary-foreground" : "bg-background/70"
                )}
              >
                <span className={cn("text-[11px]", !on && "text-foreground/60")}>{d.day}</span>
                <span className="text-xl leading-6">{d.date}</span>
                <span className={cn("text-[10px]", !on && "text-foreground/60")}>{d.count} appts</span>
              </button>
            )
          })}
        </div>
      </DoctorCard>

      {/* Agenda */}
      <DoctorCard className="min-h-0 flex-1 gap-2 rounded-[36px] p-[22px]">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-normal">Today</h2>
          <Tag className="px-2.5 text-[11px] font-medium">3 remaining</Tag>
        </div>
        {agenda.map((a) => (
          <div key={a.time} className="flex items-center gap-3">
            <p className="w-10 shrink-0 text-xs font-medium text-foreground/60">{a.time}</p>
            <button
              type="button"
              className={cn(
                "flex min-w-0 flex-1 flex-col items-start gap-0.5 rounded-[18px] px-3.5 py-2.5 text-left whitespace-nowrap",
                slotStyle[a.state]
              )}
            >
              <span className={cn("text-sm font-medium", a.state !== "current" && "text-primary")}>
                {a.name}
              </span>
              <span className={cn("text-[11px]", a.state !== "current" && "text-foreground/60")}>
                {a.detail}
              </span>
            </button>
          </div>
        ))}
        <div className="flex gap-2">
          <Button variant="app" className="h-10 flex-1 rounded-full text-[13px] font-medium">
            Start visit
          </Button>
          <Button
            variant="ghost"
            className="h-10 flex-1 rounded-full bg-secondary text-[13px] font-medium text-primary hover:bg-secondary/80"
          >
            Reschedule
          </Button>
        </div>
      </DoctorCard>
    </DoctorAppShell>
  )
}
