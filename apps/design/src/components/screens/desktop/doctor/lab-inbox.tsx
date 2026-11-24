"use client"

import * as React from "react"
import { ChevronRightIcon, FileTextIcon } from "lucide-react"
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
} from "./shared-j"

export const title = "Lab inbox"

/* -------------------------------------------------------------------------- */
/* Inbox list                                                                 */
/* -------------------------------------------------------------------------- */

const reports: { name: string; test: string; flags: number }[] = [
  { name: "Usha Sethi", test: "CBC · Complete blood count · Today, 08:40", flags: 2 },
  { name: "Suresh Sharma", test: "HbA1c · Today, 07:15", flags: 1 },
  { name: "Anjali Bansal", test: "Lipid panel · Yesterday", flags: 0 },
  { name: "Rajeev Verma", test: "Vitamin D & B12 · Yesterday", flags: 1 },
  { name: "Neha Kapoor", test: "Thyroid profile · 2 days ago", flags: 0 },
  { name: "Ankit Joshi", test: "Kidney function · 3 days ago", flags: 0 },
]

const filters = ["All 12", "Needs review 5", "Flagged 2", "Reviewed"]

function InboxPanel() {
  const [filter, setFilter] = React.useState(filters[1])
  const [selected, setSelected] = React.useState(reports[0]!.name)

  return (
    <Panel className="h-full w-[520px] shrink-0 gap-4">
      <div className="flex w-full items-center justify-between">
        <p className="text-2xl">Lab inbox</p>
        <Tag tone="primary">5 to review</Tag>
      </div>
      <SearchField placeholder="Search patient or test" />
      <div className="flex gap-2">
        {filters.map((f) => (
          <Chip key={f} active={filter === f} onClick={() => setFilter(f)}>
            {f}
          </Chip>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        {reports.map((r) => {
          const on = selected === r.name
          return (
            <button
              key={r.name}
              type="button"
              aria-pressed={on}
              onClick={() => setSelected(r.name)}
              className={cn(
                "flex w-full items-center gap-3.5 rounded-[20px] border px-3.5 py-3 text-left",
                on ? "border-primary/25 bg-card" : "border-transparent"
              )}
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-[14px] bg-card text-primary">
                <FileTextIcon className="size-[22px]" strokeWidth={1.5} />
              </span>
              <span className="flex min-w-0 flex-1 flex-col gap-0.5 whitespace-nowrap">
                <span className="text-[19px]">{r.name}</span>
                <span className="text-xs text-foreground/60">{r.test}</span>
              </span>
              {r.flags > 0 ? (
                <Tag tone="danger">
                  {r.flags} {r.flags === 1 ? "flag" : "flags"}
                </Tag>
              ) : (
                <Tag>Normal</Tag>
              )}
              <ChevronRightIcon className="size-5 shrink-0" strokeWidth={1.5} />
            </button>
          )
        })}
      </div>
    </Panel>
  )
}

/* -------------------------------------------------------------------------- */
/* Report review                                                              */
/* -------------------------------------------------------------------------- */

const stats = [
  { label: "Results", value: "10", note: "in this report" },
  { label: "Out of range", value: "2", note: "Haemoglobin, Haematocrit" },
  { label: "Change since last", value: "−0.6", note: "Haemoglobin g/dL (Aug)" },
]

/** `pos` is the marker position along the 300px bar; the reference band spans 60–240. */
const results: { test: string; value: string; range: string; pos: number; low?: boolean }[] = [
  { test: "Haemoglobin", value: "11.2 g/dL", range: "12.0 – 15.0", pos: 24, low: true },
  { test: "Haematocrit", value: "34.8 %", range: "36 – 46", pos: 42, low: true },
  { test: "RBC count", value: "4.2 M/µL", range: "3.8 – 4.8", pos: 132 },
  { test: "WBC count", value: "7.4 K/µL", range: "4.0 – 10.0", pos: 162.6 },
  { test: "Platelets", value: "245 K/µL", range: "150 – 410", pos: 126.6 },
  { test: "MCV", value: "82 fL", range: "80 – 100", pos: 78 },
  { test: "Neutrophils", value: "62 %", range: "40 – 80", pos: 159 },
  { test: "Lymphocytes", value: "30 %", range: "20 – 40", pos: 150 },
]

const columns = ["Test", "Result", "Reference range", "Range", "Status"]
const colWidth = ["w-[300px]", "w-[160px]", "w-[200px]", "w-[360px]", "w-[140px]"]

/** 300 × 12 range bar: lavender track, tinted reference band, value marker. */
function RangeBar({ pos, low }: { pos: number; low?: boolean }) {
  return (
    <div className="relative h-3 w-[300px] overflow-hidden">
      <div className="absolute top-[3px] left-0 h-1.5 w-full rounded-full bg-secondary" />
      <div className="absolute top-[3px] left-[60px] h-1.5 w-[180px] bg-primary/25" />
      <div
        className={cn(
          "absolute top-0 size-3 -translate-x-1/2 rounded-full border-2 border-card",
          low ? "bg-destructive" : "bg-primary"
        )}
        style={{ left: pos }}
      />
    </div>
  )
}

function ReviewPanel() {
  return (
    <Panel className="h-full min-w-0 flex-1 gap-[22px]">
      <div className="flex w-full items-center gap-4">
        <PersonAvatar person={people.usha} />
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <p className="text-2xl whitespace-nowrap">Usha Sethi · Complete blood count</p>
          <p className="text-[13px] whitespace-pre text-foreground/60">
            {"39 · F  ·  PF-10482  ·  Collected 8 Nov, 09:10  ·  Received 9 Nov, 08:40  ·  Apollo Diagnostics"}
          </p>
        </div>
        <ActionButton>Download PDF</ActionButton>
        <ActionButton>Message patient</ActionButton>
        <ActionButton primary>Mark reviewed</ActionButton>
      </div>

      <div className="flex w-full gap-4 whitespace-nowrap">
        {stats.map((s) => (
          <div
            key={s.label}
            className="flex min-w-0 flex-1 flex-col gap-1.5 rounded-[24px] border border-foreground/6 bg-card/70 p-5"
          >
            <p className="text-[13px] text-foreground/60">{s.label}</p>
            <div className="flex items-baseline gap-2.5">
              <p className="text-4xl">{s.value}</p>
              <p className="text-xs text-foreground/60">{s.note}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex w-full flex-col gap-4">
        <div className="flex">
          {columns.map((c, i) => (
            <p key={c} className={cn("h-4 text-xs text-foreground/60", colWidth[i])}>
              {c}
            </p>
          ))}
        </div>
        <div className="flex flex-col gap-1">
          {results.map((r) => (
            <div
              key={r.test}
              className={cn("flex items-center rounded-xl py-2", r.low && "bg-destructive/5")}
            >
              <p className={cn("text-lg", colWidth[0])}>{r.test}</p>
              <p className={cn("text-sm font-medium", colWidth[1], r.low && "text-destructive")}>{r.value}</p>
              <p className={cn("text-sm text-foreground/60", colWidth[2])}>{r.range}</p>
              <div className={colWidth[3]}>
                <RangeBar pos={r.pos} low={r.low} />
              </div>
              <div className={colWidth[4]}>
                {r.low ? <Tag tone="danger">Low</Tag> : <Tag>Normal</Tag>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex w-full items-center gap-3">
        <SearchField
          placeholder="Add a note for Usha — e.g. start iron supplement, repeat CBC in 6 weeks"
          className="w-auto min-w-0 flex-1"
        />
        <ActionButton>Add to prescription</ActionButton>
        <ActionButton primary>Send note</ActionButton>
      </div>
    </Panel>
  )
}

// Figma: Desktop / Lab inbox (2036:1269)
export default function DoctorLabInbox() {
  return (
    <WorkspaceShell subtitle="Dr. Arjun Vaidya" title="Lab inbox">
      <ContentRow>
        <InboxPanel />
        <ReviewPanel />
      </ContentRow>
    </WorkspaceShell>
  )
}
