"use client"

import * as React from "react"
import {
  CalendarIcon,
  FileTextIcon,
  MessageCircleIcon,
  PillIcon,
  TriangleAlertIcon,
  UserIcon,
  type LucideIcon,
} from "lucide-react"
import { cn } from "cn"

import { ActionButton, ContentRow, Panel, StatPanel, WorkspaceShell } from "./shared-j"

export const title = "Notifications"

/* -------------------------------------------------------------------------- */
/* Filter column                                                              */
/* -------------------------------------------------------------------------- */

const filters = [
  { label: "All", count: 14 },
  { label: "Lab results", count: 5 },
  { label: "Appointments", count: 4 },
  { label: "Messages", count: 3 },
  { label: "Prescriptions", count: 2 },
]

function FilterPanel() {
  const [active, setActive] = React.useState("All")
  return (
    <Panel className="min-h-0 w-full flex-1 gap-2">
      <p className="text-base">Show</p>
      {filters.map((f) => {
        const on = active === f.label
        return (
          <button
            key={f.label}
            type="button"
            aria-pressed={on}
            onClick={() => setActive(f.label)}
            className={cn(
              "flex w-full items-center gap-3 rounded-full px-4 py-3 text-left transition-colors",
              on ? "bg-primary text-primary-foreground" : "hover:bg-secondary/60"
            )}
          >
            <span className={cn("min-w-0 flex-1 text-sm", on && "font-medium")}>{f.label}</span>
            <span className={cn("text-[13px]", !on && "text-foreground/60")}>{f.count}</span>
          </button>
        )
      })}
      <div className="flex-1" />
      <button type="button" className="self-start text-[13px] font-medium text-primary">
        Notification settings →
      </button>
    </Panel>
  )
}

/* -------------------------------------------------------------------------- */
/* Notifications list                                                         */
/* -------------------------------------------------------------------------- */

interface Notice {
  Icon: LucideIcon
  danger?: boolean
  title: string
  body: string
  time: string
  action: string
  primary?: boolean
}

const groups: { label: string; unread?: boolean; items: Notice[] }[] = [
  {
    label: "Today",
    unread: true,
    items: [
      {
        Icon: FileTextIcon,
        danger: true,
        title: "Usha Sethi’s CBC is ready",
        body: "Haemoglobin 11.2 g/dL and haematocrit 34.8% are below range.",
        time: "08:40",
        action: "Review",
        primary: true,
      },
      {
        Icon: TriangleAlertIcon,
        danger: true,
        title: "Risk score went up for Rajeev Verma",
        body: "Patient risk rose from 49% to 56% after this week’s check-in.",
        time: "08:05",
        action: "Open patient",
      },
      {
        Icon: MessageCircleIcon,
        title: "2 new messages from Usha Sethi",
        body: "“Is the low haemoglobin a concern?”",
        time: "09:42",
        action: "Reply",
      },
      {
        Icon: PillIcon,
        title: "Suresh Sharma asked for a prescription renewal",
        body: "Metformin 500 mg · last renewed 28 days ago.",
        time: "07:30",
        action: "Approve",
        primary: true,
      },
    ],
  },
  {
    label: "Yesterday",
    items: [
      {
        Icon: CalendarIcon,
        title: "Neha Kapoor asked to reschedule",
        body: "Tue 10 Nov, 10:30 → Thu 12 Nov, 15:00",
        time: "17:20",
        action: "Accept",
      },
      {
        Icon: UserIcon,
        title: "New patient assigned: Meera Iyer",
        body: "Referred by Dr. Rao · first consultation booked for Wed 11 Nov.",
        time: "11:05",
        action: "View",
      },
    ],
  },
  {
    label: "Earlier this week",
    items: [
      {
        Icon: FileTextIcon,
        title: "Anjali Bansal’s lipid panel was reviewed",
        body: "Reviewed by you · shared with patient.",
        time: "Mon",
        action: "View",
      },
    ],
  },
]

function NotificationRow({ n, unread }: { n: Notice; unread?: boolean }) {
  return (
    <div
      className={cn(
        "flex w-full items-center gap-4 rounded-[24px] border py-3 pr-[18px] pl-4",
        unread ? "border-foreground/5 bg-card/85" : "border-transparent"
      )}
    >
      <span
        aria-label={unread ? "Unread" : undefined}
        className={cn("size-2 shrink-0 rounded-full", unread ? "bg-primary" : "bg-transparent")}
      />
      <span
        className={cn(
          "flex size-12 shrink-0 items-center justify-center rounded-full",
          n.danger ? "bg-destructive/10 text-destructive" : "bg-secondary text-primary"
        )}
      >
        <n.Icon className="size-[22px]" strokeWidth={1.5} />
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-[3px] whitespace-nowrap">
        <p className="text-lg">{n.title}</p>
        <p className="text-[13px] text-foreground/60">{n.body}</p>
      </div>
      <p className="shrink-0 text-xs text-foreground/60">{n.time}</p>
      <ActionButton primary={n.primary} className="h-9 px-4 text-[13px]">
        {n.action}
      </ActionButton>
    </div>
  )
}

function NotificationsPanel() {
  return (
    <Panel className="h-full min-w-0 flex-1 gap-4">
      <div className="flex w-full items-center gap-2.5">
        <p className="min-w-0 flex-1 text-2xl">All notifications</p>
        <ActionButton>Mark all as read</ActionButton>
      </div>
      {groups.map((g) => (
        <React.Fragment key={g.label}>
          <p className="text-xs font-medium text-foreground/60">{g.label}</p>
          <div className="flex flex-col gap-1.5">
            {g.items.map((n) => (
              <NotificationRow key={n.title} n={n} unread={g.unread} />
            ))}
          </div>
        </React.Fragment>
      ))}
    </Panel>
  )
}

// Figma: Desktop / Notifications (2036:2001)
export default function DoctorNotifications() {
  return (
    <WorkspaceShell subtitle="Dr. Arjun Vaidya" title="Notifications">
      <ContentRow>
        <div className="flex h-full w-[330px] shrink-0 flex-col gap-6">
          <StatPanel title="Unread" value="7" note="of 14 today" />
          <FilterPanel />
        </div>
        <NotificationsPanel />
      </ContentRow>
    </WorkspaceShell>
  )
}
