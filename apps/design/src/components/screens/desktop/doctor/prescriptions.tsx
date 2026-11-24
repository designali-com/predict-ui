"use client"

import * as React from "react"
import { CheckIcon, ChevronDownIcon, PencilIcon, PillIcon, Trash2Icon } from "lucide-react"

import {
  ActionButton,
  Chip,
  ContentRow,
  Panel,
  PanelHeader,
  StatPanel,
  Tag,
  WorkspaceShell,
} from "./shared-j"

export const title = "Prescriptions"

type Kind = "Medicine" | "Supplement"

const prescriptions: { name: string; dose: string; kind: Kind; status: string }[] = [
  { name: "Metformin 500 mg", dose: "1 tablet · twice daily · 30 days", kind: "Medicine", status: "active" },
  { name: "Atorvastatin 10 mg", dose: "1 tablet · night · 60 days", kind: "Medicine", status: "active" },
  { name: "Predict +", dose: "1 scoop · after workout · 90 days", kind: "Supplement", status: "active" },
  { name: "Vitamin D3 60,000 IU", dose: "1 sachet · weekly · 8 weeks", kind: "Supplement", status: "active" },
  { name: "Omega-3 1000 mg", dose: "1 capsule · dinner · 45 days", kind: "Supplement", status: "completed" },
]

const history = [
  { label: "Metformin renewed", date: "12 Nov 2026" },
  { label: "Predict + started", date: "28 Oct 2026" },
  { label: "Atorvastatin added", date: "02 Oct 2026" },
]

function HistoryPanel() {
  return (
    <Panel className="h-[288px] shrink-0 gap-3.5">
      <PanelHeader title="History" />
      {history.map((h) => (
        <div key={h.label} className="flex flex-col whitespace-nowrap">
          <p className="text-lg leading-[22px]">{h.label}</p>
          <p className="text-xs leading-[18px] text-foreground/60">{h.date}</p>
        </div>
      ))}
    </Panel>
  )
}

type Filter = "all" | Kind

function PrescriptionsPanel() {
  const [filter, setFilter] = React.useState<Filter>("all")
  const count = (k: Kind) => prescriptions.filter((p) => p.kind === k).length
  const items = prescriptions.filter((p) => filter === "all" || p.kind === filter)

  return (
    <Panel className="h-full w-[760px] shrink-0 gap-4">
      <PanelHeader
        title="Prescriptions"
        action={
          <div className="flex items-center gap-2.5">
            <Chip active={filter === "all"} onClick={() => setFilter("all")}>
              All {prescriptions.length}
            </Chip>
            <Chip active={filter === "Medicine"} onClick={() => setFilter("Medicine")}>
              Medicines {count("Medicine")}
            </Chip>
            <Chip active={filter === "Supplement"} onClick={() => setFilter("Supplement")}>
              Supplements {count("Supplement")}
            </Chip>
          </div>
        }
      />
      {items.map((p) => (
        <div
          key={p.name}
          className="flex h-[104px] shrink-0 items-center justify-between rounded-[28px] bg-secondary/55 px-5"
        >
          <div className="flex items-center gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-card text-primary">
              <PillIcon className="size-[22px]" strokeWidth={1.5} />
            </span>
            <div className="flex flex-col gap-0.5 whitespace-nowrap">
              <p className="text-[21px] leading-[26px]">{p.name}</p>
              <p className="text-[13px] leading-5 text-foreground/60">{p.dose}</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <Tag className="px-3 leading-4">{p.kind}</Tag>
            <Tag className="px-3 leading-4">{p.status}</Tag>
            <button type="button" aria-label={`Edit ${p.name}`}>
              <PencilIcon className="size-5" strokeWidth={1.5} />
            </button>
            <button type="button" aria-label={`Delete ${p.name}`}>
              <Trash2Icon className="size-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      ))}
    </Panel>
  )
}

const fieldBox =
  "flex h-11 w-full items-center justify-between rounded-full border border-foreground/8 bg-card/70 px-[18px] text-sm leading-5"

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex min-w-0 flex-1 flex-col gap-2">
      <span className="text-xs leading-4 text-foreground/60">{label}</span>
      {children}
    </label>
  )
}

function TextField({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <Field label={label}>
      <input
        type="text"
        placeholder={placeholder}
        className={`${fieldBox} outline-none placeholder:text-foreground/60 focus-visible:border-ring`}
      />
    </Field>
  )
}

function SelectField({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <Field label={label}>
      <button type="button" className={fieldBox}>
        <span className="text-foreground/60">{placeholder}</span>
        <ChevronDownIcon className="size-[18px]" strokeWidth={1.5} />
      </button>
    </Field>
  )
}

function NewPrescriptionPanel() {
  const [kind, setKind] = React.useState<Kind>("Medicine")

  return (
    <Panel className="h-full min-w-0 flex-1 gap-[18px]">
      <PanelHeader title="New prescription" />
      <div className="flex flex-col gap-2">
        <p className="text-xs leading-4 text-foreground/60">Type</p>
        <div className="flex items-center gap-2.5">
          <Chip active={kind === "Medicine"} onClick={() => setKind("Medicine")}>
            Medicine
          </Chip>
          <Chip active={kind === "Supplement"} onClick={() => setKind("Supplement")}>
            Supplement
          </Chip>
        </div>
      </div>
      <SelectField label="Name" placeholder={kind === "Medicine" ? "Search medicine" : "Search supplement"} />
      <div className="flex gap-4">
        <TextField label="Dosage" placeholder="e.g. 500 mg" />
        <SelectField label="Frequency" placeholder="Select" />
      </div>
      <div className="flex gap-4">
        <TextField label="Duration" placeholder="e.g. 30 days" />
        <SelectField label="Start date" placeholder="Pick date" />
      </div>
      <Field label="Instructions">
        <textarea
          placeholder="Take after food, avoid with…"
          className="h-[140px] w-full resize-none rounded-[24px] border border-foreground/8 bg-card/70 px-[18px] pt-3.5 text-sm leading-5 outline-none placeholder:text-foreground/60 focus-visible:border-ring"
        />
      </Field>
      <div className="flex justify-end gap-3 pt-1">
        <ActionButton className="border-primary/12 font-normal text-foreground">Cancel</ActionButton>
        <ActionButton primary className="gap-1 pr-[22px] pl-5 font-normal">
          <CheckIcon className="size-[18px]" strokeWidth={1.5} />
          Issue prescription
        </ActionButton>
      </div>
    </Panel>
  )
}

// Figma: Desktop / Prescriptions (2012:2964)
export default function DoctorPrescriptions() {
  return (
    <WorkspaceShell subtitle="Usha Sethi" title="Prescriptions" tab="patients">
      <ContentRow>
        <div className="flex h-full w-[330px] shrink-0 flex-col gap-6">
          <StatPanel title="Medicines" value="2" />
          <StatPanel title="Supplements" value="3" />
          <StatPanel title="Refills due" value="1" />
          <HistoryPanel />
        </div>
        <PrescriptionsPanel />
        <NewPrescriptionPanel />
      </ContentRow>
    </WorkspaceShell>
  )
}
