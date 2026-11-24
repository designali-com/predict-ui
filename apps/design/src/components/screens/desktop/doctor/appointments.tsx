"use client"

import * as React from "react"
import { ChevronLeftIcon, ChevronRightIcon, PlusIcon } from "lucide-react"
import { cn } from "cn"

import {
  ActionButton,
  Chip,
  ContentRow,
  Panel,
  PanelHeader,
  PersonAvatar,
  StatPanel,
  WorkspaceShell,
  people,
} from "./shared-j"

export const title = "Appointments"

/* -------------------------------------------------------------------------- */
/* Up next                                                                    */
/* -------------------------------------------------------------------------- */

function UpNextPanel() {
  return (
    <Panel className="min-h-0 w-full flex-1 gap-[18px]">
      <PanelHeader title="Up next" />
      <div className="flex items-center gap-3.5">
        <PersonAvatar person={people.usha} />
        <div className="flex flex-col gap-0.5 whitespace-nowrap">
          <p className="text-[21px]">Usha Sethi</p>
          <p className="text-[13px] text-foreground/60">Follow-up · 10:00 – 10:30</p>
        </div>
      </div>
      <div className="flex gap-2.5">
        <ActionButton primary>Start visit</ActionButton>
        <ActionButton>Reschedule</ActionButton>
      </div>
    </Panel>
  )
}

/* -------------------------------------------------------------------------- */
/* Week calendar                                                              */
/* -------------------------------------------------------------------------- */

type EventKind = "new" | "follow" | "review" | "meeting"

const eventStyle: Record<EventKind, { box: string; name: string; meta: string }> = {
  new: { box: "bg-primary text-primary-foreground", name: "", meta: "" },
  follow: { box: "bg-secondary", name: "text-primary", meta: "text-foreground/60" },
  review: { box: "border border-primary/35 bg-card", name: "text-primary", meta: "text-foreground/60" },
  meeting: { box: "bg-foreground/5", name: "text-foreground", meta: "text-foreground/60" },
}

const legend: { kind: EventKind; label: string; swatch: string }[] = [
  { kind: "new", label: "New consultation", swatch: "bg-primary" },
  { kind: "follow", label: "Follow-up / Video", swatch: "bg-secondary" },
  { kind: "review", label: "Review", swatch: "border border-primary/50 bg-card" },
  { kind: "meeting", label: "Meeting", swatch: "bg-foreground/5" },
]

const days = [
  { name: "Mon", date: "9" },
  { name: "Tue", date: "10" },
  { name: "Wed", date: "11" },
  { name: "Thu", date: "12" },
  { name: "Fri", date: "13" },
]

const hours = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"]

const COL = 268
const HOUR = 64

/** `tall` events are 58px two-line blocks; the rest are 26px pills. */
const events: { day: number; top: number; kind: EventKind; name: string; meta: string; tall?: boolean }[] = [
  { day: 0, top: 51, kind: "follow", name: "Usha Sethi", meta: "09:00" },
  { day: 0, top: 115, kind: "new", name: "Suresh Sharma", meta: "10:00" },
  { day: 0, top: 179, kind: "review", name: "Anjali Bansal", meta: "11:00 – 12:00 · Review", tall: true },
  { day: 0, top: 339, kind: "follow", name: "Vivaan Mehta", meta: "13:30 · Video" },
  { day: 0, top: 435, kind: "follow", name: "Rakesh Kumar", meta: "15:00" },
  { day: 1, top: 83, kind: "new", name: "Neha Kapoor", meta: "09:30 – 10:30 · New", tall: true },
  { day: 1, top: 243, kind: "follow", name: "Ankit Joshi", meta: "12:00 · Video" },
  { day: 1, top: 371, kind: "review", name: "Rajeev Verma", meta: "14:00 – 15:00 · Review", tall: true },
  { day: 2, top: 51, kind: "review", name: "Usha Sethi", meta: "09:00" },
  { day: 2, top: 147, kind: "new", name: "Meera Iyer", meta: "10:30" },
  { day: 2, top: 307, kind: "meeting", name: "Care team sync", meta: "13:00 – 14:00 · Meeting", tall: true },
  { day: 3, top: 115, kind: "follow", name: "Suresh Sharma", meta: "10:00" },
  { day: 3, top: 211, kind: "new", name: "Kavya Rao", meta: "11:30 – 12:30 · New", tall: true },
  { day: 3, top: 403, kind: "follow", name: "Anjali Bansal", meta: "14:30 · Video" },
  { day: 4, top: 51, kind: "review", name: "Vivaan Mehta", meta: "09:00 – 10:00 · Review", tall: true },
  { day: 4, top: 243, kind: "follow", name: "Neha Kapoor", meta: "12:00" },
  { day: 4, top: 307, kind: "follow", name: "Rakesh Kumar", meta: "13:00 · Video" },
]

function WeekGrid() {
  const today = 0
  return (
    <div className="relative h-[580px] w-full shrink-0">
      {/* Today column */}
      <div
        className="absolute top-12 h-[512px] w-[260px] rounded-2xl bg-secondary/45"
        style={{ left: 76 + today * COL }}
      />

      {days.map((d, i) => (
        <div key={d.name} className="absolute top-0.5 flex items-center gap-2" style={{ left: 84 + i * COL }}>
          <p className="text-[13px] text-foreground/60">{d.name}</p>
          <span
            className={cn(
              "flex size-8 items-center justify-center rounded-full text-sm font-medium",
              i === today && "bg-primary text-primary-foreground"
            )}
          >
            {d.date}
          </span>
        </div>
      ))}

      {hours.map((h, i) => (
        <React.Fragment key={h}>
          <p className="absolute left-0 text-xs text-foreground/60" style={{ top: 40 + i * HOUR }}>
            {h}
          </p>
          <div className="absolute left-[72px] h-px w-[1340px] bg-foreground/6" style={{ top: 48 + i * HOUR }} />
        </React.Fragment>
      ))}

      {events.map((e) => {
        const s = eventStyle[e.kind]
        return (
          <button
            key={`${e.day}-${e.top}`}
            type="button"
            className={cn(
              "absolute flex w-[252px] overflow-hidden rounded-[14px] px-3.5 text-left whitespace-nowrap",
              e.tall ? "h-[58px] flex-col gap-0.5 pt-2.5" : "h-[26px] items-center gap-2",
              s.box
            )}
            style={{ left: 80 + e.day * COL, top: e.top }}
          >
            <span className={cn("text-[13px] font-medium", s.name)}>{e.name}</span>
            <span className={cn("text-xs", s.meta)}>{e.meta}</span>
          </button>
        )
      })}

      {/* Current time */}
      <div aria-hidden className="absolute top-[160px] left-[76px] h-0.5 w-[260px] bg-primary" />
      <div aria-hidden className="absolute top-[156px] left-[72px] size-2.5 rounded-full bg-primary" />
    </div>
  )
}

type View = "Day" | "Week" | "Month"

function CalendarPanel() {
  const [view, setView] = React.useState<View>("Week")
  return (
    <Panel className="h-full min-w-0 flex-1 gap-5">
      <div className="flex w-full items-center gap-2.5">
        <p className="text-2xl whitespace-nowrap">9 – 13 November 2026</p>
        <div className="flex gap-1.5">
          <Chip aria-label="Previous week">
            <ChevronLeftIcon className="size-3.5" strokeWidth={1.5} />
          </Chip>
          <Chip aria-label="Next week">
            <ChevronRightIcon className="size-3.5" strokeWidth={1.5} />
          </Chip>
          <Chip>Today</Chip>
        </div>
        <div className="flex-1" />
        <div className="flex gap-1.5">
          {(["Day", "Week", "Month"] as const).map((v) => (
            <Chip key={v} active={view === v} onClick={() => setView(v)}>
              {v}
            </Chip>
          ))}
        </div>
        <ActionButton primary className="gap-1.5">
          <PlusIcon className="size-4" strokeWidth={1.5} />
          New appointment
        </ActionButton>
      </div>

      <WeekGrid />

      <div className="flex items-center gap-5">
        {legend.map((l) => (
          <div key={l.kind} className="flex items-center gap-2">
            <span className={cn("size-3.5 rounded-[4px]", l.swatch)} />
            <p className="text-xs text-foreground/60">{l.label}</p>
          </div>
        ))}
      </div>
    </Panel>
  )
}

// Figma: Desktop / Appointments (2036:903)
export default function DoctorAppointments() {
  return (
    <WorkspaceShell subtitle="Dr. Arjun Vaidya" title="Appointments">
      <ContentRow>
        <div className="flex h-full w-[330px] shrink-0 flex-col gap-6">
          <StatPanel title="Today" value="8" note="3 remaining" />
          <StatPanel title="This week" value="32" note="5 days" />
          <StatPanel title="Video visits" value="9" note="this week" />
          <UpNextPanel />
        </div>
        <CalendarPanel />
      </ContentRow>
    </WorkspaceShell>
  )
}
