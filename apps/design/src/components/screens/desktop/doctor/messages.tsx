"use client"

import * as React from "react"
import { FileTextIcon } from "lucide-react"
import { cn } from "cn"

import {
  ActionButton,
  Chip,
  ContentRow,
  Panel,
  PersonAvatar,
  SearchField,
  Tag,
  WorkspaceShell,
  people,
  type Person,
} from "./shared-j"

export const title = "Messages"

/* -------------------------------------------------------------------------- */
/* Conversations                                                              */
/* -------------------------------------------------------------------------- */

const threads: { person: Person; preview: string; time: string; unread?: number }[] = [
  { person: people.usha, preview: "Thank you doctor, I have uploaded the…", time: "09:42", unread: 2 },
  { person: people.suresh, preview: "Should I continue the same dose?", time: "08:15", unread: 1 },
  { person: people.anjali, preview: "Okay, see you on Friday.", time: "Yesterday" },
  { person: { name: "Care team", initials: "CT" }, preview: "Priya: Diet plan for Rakesh is updated", time: "Yesterday" },
  { person: people.vivaan, preview: "Video link works now 👍", time: "Mon" },
  { person: { name: "Neha Kapoor", initials: "NK" }, preview: "Can we move my appointment?", time: "Sun" },
]

const filters = ["All", "Unread 3", "Patients", "Care team"]

function ConversationsPanel() {
  const [filter, setFilter] = React.useState(filters[0])
  const [selected, setSelected] = React.useState(threads[0]!.person.name)

  return (
    <Panel className="h-full w-[480px] shrink-0 gap-4">
      <div className="flex w-full items-center justify-between">
        <p className="text-2xl">Messages</p>
        <Tag tone="primary">3 unread</Tag>
      </div>
      <SearchField placeholder="Search conversations" />
      <div className="flex gap-2">
        {filters.map((f) => (
          <Chip key={f} active={filter === f} onClick={() => setFilter(f)}>
            {f}
          </Chip>
        ))}
      </div>
      <div className="flex flex-col gap-1.5">
        {threads.map((t) => {
          const on = selected === t.person.name
          return (
            <button
              key={t.person.name}
              type="button"
              aria-pressed={on}
              onClick={() => setSelected(t.person.name)}
              className={cn(
                "flex w-full items-center gap-3.5 rounded-[20px] border px-3.5 py-3 text-left",
                on ? "border-primary/25 bg-card" : "border-transparent"
              )}
            >
              <PersonAvatar person={t.person} />
              <span className="flex min-w-0 flex-1 flex-col gap-[3px] whitespace-nowrap">
                <span className="text-[19px]">{t.person.name}</span>
                <span className={cn("text-[13px]", t.unread ? "font-medium" : "text-foreground/60")}>
                  {t.preview}
                </span>
              </span>
              <span className="flex shrink-0 flex-col items-end gap-1.5">
                <span className="text-xs text-foreground/60">{t.time}</span>
                {t.unread && (
                  <span className="flex size-[22px] items-center justify-center rounded-full bg-primary text-[11px] font-medium text-primary-foreground">
                    {t.unread}
                  </span>
                )}
              </span>
            </button>
          )
        })}
      </div>
    </Panel>
  )
}

/* -------------------------------------------------------------------------- */
/* Chat                                                                       */
/* -------------------------------------------------------------------------- */

function Bubble({
  out,
  time,
  width,
  children,
}: {
  out?: boolean
  time: string
  width: number
  children: React.ReactNode
}) {
  return (
    <div className={cn("flex w-full", out && "justify-end")}>
      <div className={cn("flex flex-col gap-1", out ? "items-end" : "items-start")}>
        <div
          className={cn(
            "flex flex-col gap-2 rounded-[20px] px-[18px] py-3 text-sm leading-5",
            out ? "bg-primary text-primary-foreground" : "border border-foreground/6 bg-card"
          )}
        >
          <p style={{ width }}>{children}</p>
        </div>
        <p className="text-[11px] text-foreground/60">{time}</p>
      </div>
    </div>
  )
}

const quickReplies = ["Share lab summary", "Book follow-up", "Send diet plan", "Start iron supplement"]

function ChatPanel() {
  return (
    <Panel className="h-full min-w-0 flex-1 p-0">
      <div className="flex w-full items-center gap-3.5 border-b border-foreground/6 px-[30px] pt-6 pb-5">
        <PersonAvatar person={people.usha} />
        <div className="flex min-w-0 flex-1 flex-col gap-[3px] whitespace-nowrap">
          <p className="text-[22px]">Usha Sethi</p>
          <p className="text-[13px] text-foreground/60">Sarcopenia risk · 2L · Day 18 of 42 · online</p>
        </div>
        <ActionButton>Video call</ActionButton>
        <ActionButton>View patient</ActionButton>
      </div>

      <div className="flex min-h-0 w-full flex-1 flex-col gap-3.5 overflow-hidden px-[30px] py-6">
        <div className="flex justify-center">
          <Tag>Today</Tag>
        </div>
        <Bubble time="09:12" width={460}>
          Good morning doctor. I finished this week’s exercise plan, but my legs feel tired after the squats.
        </Bubble>
        <Bubble out time="09:20 · Read" width={460}>
          Good morning Usha. That’s expected in week 3. Keep the squats but drop to 2 sets for the next few days.
        </Bubble>
        <div className="flex w-full">
          <div className="flex flex-col items-start gap-1">
            <div className="flex flex-col items-start gap-2 rounded-[20px] border border-foreground/6 bg-card px-[18px] py-3">
              <p className="w-[396px] text-sm leading-5">Thank you doctor, I have uploaded the new blood report.</p>
              <button
                type="button"
                className="flex items-center gap-3 rounded-[14px] bg-secondary px-3.5 py-2.5 text-left whitespace-nowrap"
              >
                <FileTextIcon className="size-[22px] text-primary" strokeWidth={1.5} />
                <span className="flex flex-col gap-0.5">
                  <span className="text-[13px] font-medium">Blood_Test_Report.pdf</span>
                  <span className="text-[11px] text-foreground/60">PDF · 1.2 MB</span>
                </span>
              </button>
            </div>
            <p className="text-[11px] text-foreground/60">09:41</p>
          </div>
        </div>
        <Bubble time="09:42" width={237.6}>
          Is the low haemoglobin a concern?
        </Bubble>
        <p className="self-end text-xs text-foreground/60">Dr. Arjun is typing…</p>
      </div>

      <div className="flex w-full flex-col gap-3 px-[30px] pt-4 pb-6">
        <div className="flex gap-2">
          {quickReplies.map((q) => (
            <Chip key={q}>{q}</Chip>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <SearchField placeholder="Write a message to Usha…" className="w-auto min-w-0 flex-1" />
          <ActionButton>Attach</ActionButton>
          <ActionButton primary>Send</ActionButton>
        </div>
      </div>
    </Panel>
  )
}

// Figma: Desktop / Messages (2036:1635)
export default function DoctorMessages() {
  return (
    <WorkspaceShell subtitle="Dr. Arjun Vaidya" title="Messages">
      <ContentRow>
        <ConversationsPanel />
        <ChatPanel />
      </ContentRow>
    </WorkspaceShell>
  )
}
