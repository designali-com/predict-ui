"use client"

import * as React from "react"
import { CalendarIcon, FileTextIcon, PillIcon, TriangleAlertIcon, UserIcon, type LucideIcon } from "lucide-react"
import { cn } from "cn"

import { ChipFilter, DoctorAppShell, GlassCard, PillButton } from "./shared-g"

export const title = "Notifications"

type Notice = {
  id: string
  icon: LucideIcon
  alert?: boolean
  title: string
  body: string
  time: string
  action?: { label: string; tone: "primary" | "secondary" }
}

const today: Notice[] = [
  {
    id: "cbc",
    icon: FileTextIcon,
    alert: true,
    title: "Usha Sethi’s CBC is ready",
    body: "Haemoglobin and haematocrit below range.",
    time: "08:40",
    action: { label: "Review", tone: "primary" },
  },
  {
    id: "risk",
    icon: TriangleAlertIcon,
    alert: true,
    title: "Risk up for Rajeev Verma",
    body: "49% → 56% after this week’s check-in.",
    time: "08:05",
    action: { label: "Open patient", tone: "secondary" },
  },
  {
    id: "rx",
    icon: PillIcon,
    title: "Renewal: Suresh Sharma",
    body: "Metformin 500 mg · last renewed 28 days ago.",
    time: "07:30",
    action: { label: "Approve", tone: "primary" },
  },
]

const yesterday: Notice[] = [
  {
    id: "reschedule",
    icon: CalendarIcon,
    title: "Neha Kapoor asked to reschedule",
    body: "Tue 10:30 → Thu 12 Nov, 15:00",
    time: "17:20",
  },
  { id: "new", icon: UserIcon, title: "New patient: Meera Iyer", body: "Referred by Dr. Rao.", time: "11:05" },
]

function NoticeRow({ n, unread }: { n: Notice; unread: boolean }) {
  const Icon = n.icon
  return (
    <div
      className={cn(
        "flex w-full shrink-0 items-start gap-2.5 rounded-[20px] p-2.5 transition-colors",
        unread && "bg-card/85"
      )}
    >
      <span
        className={cn(
          "flex size-[42px] shrink-0 items-center justify-center rounded-full",
          n.alert ? "bg-destructive/12 text-destructive" : "bg-secondary text-primary"
        )}
      >
        <Icon className="size-5" strokeWidth={1.5} />
      </span>
      <div className="flex min-w-0 flex-1 flex-col items-start gap-[3px]">
        <div className="flex w-full items-center gap-1.5 leading-[normal]">
          <p className="min-w-0 flex-1 text-[15px]">{n.title}</p>
          <p className="shrink-0 text-[10px] whitespace-nowrap text-foreground/60">{n.time}</p>
        </div>
        <p className="w-full text-[11px] leading-[15px] text-foreground/60">{n.body}</p>
        {n.action && <PillButton tone={n.action.tone}>{n.action.label}</PillButton>}
      </div>
    </div>
  )
}

// Figma: Mobile / Notifications (2073:1300)
export default function Notifications() {
  const [allRead, setAllRead] = React.useState(false)

  return (
    <DoctorAppShell eyebrow="Dr. Arjun" title="Notifications" contentClassName="overflow-hidden">
      <ChipFilter options={["All 14", "Lab 5", "Appts 4", "Messages 3"]} className="shrink-0" />

      <GlassCard className="min-h-0 flex-1 gap-1.5 p-4">
        <div className="flex w-full items-center text-xs leading-[normal] font-medium">
          <p className="min-w-0 flex-1 text-foreground/60">Today</p>
          <button type="button" onClick={() => setAllRead(true)} className="shrink-0 text-primary">
            Mark all read
          </button>
        </div>
        {today.map((n) => (
          <NoticeRow key={n.id} n={n} unread={!allRead} />
        ))}
        <p className="text-xs leading-[normal] font-medium text-foreground/60">Yesterday</p>
        {yesterday.map((n) => (
          <NoticeRow key={n.id} n={n} unread={false} />
        ))}
      </GlassCard>
    </DoctorAppShell>
  )
}
