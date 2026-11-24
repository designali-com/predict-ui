"use client"

import * as React from "react"
import { FileTextIcon } from "lucide-react"
import { cn } from "cn"

import { DoctorAppShell, GlassCard, PhotoAvatar, PillButton, Tag, patientPhotos } from "./shared-g"

export const title = "Chat"

type Message = {
  id: number
  from: "patient" | "doctor"
  text: string
  time: string
  /** Bubble text width from Figma. */
  width?: number
  attachment?: { name: string; meta: string }
}

const initialMessages: Message[] = [
  {
    id: 1,
    from: "patient",
    text: "Good morning doctor. I finished this week’s exercise plan, but my legs feel tired after the squats.",
    time: "09:12",
    width: 270,
  },
  {
    id: 2,
    from: "doctor",
    text: "That’s expected in week 3. Keep the squats but drop to 2 sets for a few days.",
    time: "09:20 · Read",
    width: 270,
  },
  {
    id: 3,
    from: "patient",
    text: "I have uploaded the new blood report.",
    time: "09:41",
    width: 244.2,
    attachment: { name: "Blood_Test_Report.pdf", meta: "PDF · 1.2 MB" },
  },
  { id: 4, from: "patient", text: "Is the low haemoglobin a concern?", time: "09:42", width: 217.8 },
]

const suggestions = ["Share lab summary", "Book follow-up", "Send diet plan"]

function Bubble({ m }: { m: Message }) {
  const mine = m.from === "doctor"
  return (
    <div className={cn("flex w-full shrink-0", mine && "justify-end")}>
      <div className={cn("flex max-w-[300px] flex-col gap-[3px]", mine ? "items-end" : "items-start")}>
        <div
          className={cn(
            "flex flex-col gap-2 rounded-[18px] px-3.5 py-2.5 text-[13px] leading-[18px]",
            mine ? "bg-primary text-primary-foreground" : "border border-foreground/6 bg-card"
          )}
        >
          <p style={m.width ? { width: m.width } : undefined}>{m.text}</p>
          {m.attachment && (
            <div className="flex items-center gap-2.5 rounded-xl bg-secondary px-3 py-2">
              <span className="flex size-[42px] shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
                <FileTextIcon className="size-5" strokeWidth={1.5} />
              </span>
              <span className="flex flex-col gap-px leading-[normal] whitespace-nowrap">
                <span className="text-xs font-medium">{m.attachment.name}</span>
                <span className="text-[10px] text-foreground/60">{m.attachment.meta}</span>
              </span>
            </div>
          )}
        </div>
        <p className="text-[10px] leading-[normal] whitespace-nowrap text-foreground/60">{m.time}</p>
      </div>
    </div>
  )
}

// Figma: Mobile / Chat (2073:1125)
export default function Chat() {
  const [messages, setMessages] = React.useState(initialMessages)
  const [draft, setDraft] = React.useState("")

  const send = (text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return
    setMessages((prev) => [...prev, { id: prev.length + 1, from: "doctor", text: trimmed, time: "Now" }])
    setDraft("")
  }

  return (
    <DoctorAppShell
      eyebrow="Messages"
      title="Usha Sethi"
      nav={false}
      contentClassName="h-[620px] overflow-hidden"
      overlay={
        <form
          onSubmit={(e) => {
            e.preventDefault()
            send(draft)
          }}
          className="absolute top-[790px] left-[11px] flex h-14 w-[380px] items-center gap-2 rounded-full bg-card p-1.5 shadow-[0_6px_20px_0_color-mix(in_oklab,var(--color-primary)_12%,transparent)]"
        >
          <PillButton tone="secondary" type="button" aria-label="Attach" className="h-11">
            +
          </PillButton>
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Write a message to Usha…"
            aria-label="Message"
            className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-foreground/60"
          />
          <PillButton type="submit" className="h-11">
            Send
          </PillButton>
        </form>
      }
    >
      <GlassCard className="shrink-0 flex-row items-center gap-2.5 p-4">
        <PhotoAvatar photo={patientPhotos.usha} alt="Usha Sethi" size={44} />
        <div className="flex min-w-0 flex-1 flex-col gap-0.5 leading-[normal] whitespace-nowrap">
          <p className="text-xs font-medium">Sarcopenia risk · Day 18 of 42</p>
          <p className="text-[11px] text-status-normal">online</p>
        </div>
        <PillButton tone="secondary" className="h-[34px]">
          View
        </PillButton>
      </GlassCard>

      <div className="flex min-h-0 flex-1 flex-col gap-2.5 overflow-y-auto">
        <div className="flex w-full shrink-0 justify-center">
          <Tag>Today</Tag>
        </div>
        {messages.map((m) => (
          <Bubble key={m.id} m={m} />
        ))}
      </div>

      <div className="flex shrink-0 gap-1.5">
        {suggestions.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => send(s)}
            className="flex h-[30px] shrink-0 items-center justify-center rounded-full bg-secondary px-[13px] text-xs whitespace-nowrap"
          >
            {s}
          </button>
        ))}
      </div>
    </DoctorAppShell>
  )
}
