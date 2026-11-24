"use client"

import * as React from "react"
import {
  ArrowUpRightIcon,
  CheckIcon,
  ChevronDownIcon,
  DumbbellIcon,
  PencilIcon,
  PersonStandingIcon,
  PlusIcon,
  SunIcon,
} from "lucide-react"
import { cn } from "cn"

import { AppButton as Button } from "@workspace/ui/predict/app/app-glass"
import { Input } from "@workspace/ui/components/input"
import { Textarea } from "@workspace/ui/components/textarea"

import { Chip, ListTile, Panel, PanelHeader, PatientShell, Tag, Track } from "./shared-i"

export const title = "Exercises"

/* -------------------------------------------------------------------------- */
/* This week / goals                                                          */
/* -------------------------------------------------------------------------- */

const week = [
  { d: "M", done: true },
  { d: "T", done: true },
  { d: "W", done: true },
  { d: "T", done: true },
  { d: "F", done: false },
  { d: "S", done: false },
  { d: "S", done: false },
]

function ThisWeekCard() {
  return (
    <Panel className="h-[360px] w-full gap-4">
      <PanelHeader title="This week" action={ArrowUpRightIcon} actionLabel="Open this week" />
      <div className="flex items-end gap-2 whitespace-nowrap">
        <p className="font-display text-[72px] leading-[80px]">4</p>
        <p className="text-sm leading-9 text-foreground/60">of 6 sessions</p>
      </div>
      <Track value={241 / 360} label="Sessions this week" className="h-3 w-[360px]" />
      <div className="flex w-full items-start justify-between">
        {week.map((w, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <p className="text-xs leading-4 text-foreground/60">{w.d}</p>
            <span
              className={cn(
                "flex size-9 items-center justify-center rounded-full",
                w.done ? "bg-primary text-primary-foreground" : "bg-secondary"
              )}
            >
              {w.done && <CheckIcon className="size-4" strokeWidth={2} aria-label="Done" />}
            </span>
          </div>
        ))}
      </div>
    </Panel>
  )
}

const goals = [
  { name: "Muscle strength", value: "+8% in 6 weeks", fill: 223 / 360 },
  { name: "Mobility score", value: "72 / 100", fill: 259 / 360 },
  { name: "Weekly volume", value: "11.4 / 14 h", fill: 292 / 360 },
]

function GoalsCard() {
  return (
    <Panel className="h-[396px] w-full gap-4">
      <PanelHeader title="Goals" />
      {goals.map((g) => (
        <div key={g.name} className="flex w-full flex-col gap-2">
          <div className="flex w-full items-center justify-between whitespace-nowrap">
            <p className="font-display text-xl leading-6">{g.name}</p>
            <p className="text-[13px] leading-5">{g.value}</p>
          </div>
          <Track value={g.fill} label={g.name} className="w-[360px]" />
        </div>
      ))}
    </Panel>
  )
}

/* -------------------------------------------------------------------------- */
/* Today's plan                                                               */
/* -------------------------------------------------------------------------- */

const plan = [
  { icon: DumbbellIcon, title: "Goblet squat", detail: "3 × 12 · 12 kg", status: "done" },
  { icon: DumbbellIcon, title: "Romanian deadlift", detail: "3 × 10 · 20 kg", status: "done" },
  { icon: DumbbellIcon, title: "Dumbbell row", detail: "3 × 12 · 10 kg", status: "done" },
  { icon: PersonStandingIcon, title: "Glute bridge", detail: "3 × 15 · bodyweight", status: "pending" },
  { icon: PersonStandingIcon, title: "Plank hold", detail: "3 × 45 sec", status: "pending" },
  { icon: SunIcon, title: "Cool-down stretch", detail: "10 min", status: "pending" },
]

function PlanCard() {
  return (
    <Panel className="absolute top-[170px] left-[491px] h-[780px] w-[690px] gap-3.5">
      <PanelHeader title="Today's plan · Wed" action={PlusIcon} actionLabel="Add exercise" />
      {plan.map((p) => (
        <ListTile
          key={p.title}
          icon={p.icon}
          title={p.title}
          subtitle={p.detail}
          className="h-[92px]"
          trailing={
            <>
              <Tag>{p.status}</Tag>
              <button type="button" aria-label={`Edit ${p.title}`}>
                <PencilIcon className="size-5" strokeWidth={1.25} />
              </button>
            </>
          }
        />
      ))}
    </Panel>
  )
}

/* -------------------------------------------------------------------------- */
/* Add exercise form                                                          */
/* -------------------------------------------------------------------------- */

const field = "h-11 rounded-full border-foreground/8 bg-background/70 px-[18px] text-sm dark:bg-background/70"

function Field({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={cn("flex min-w-px flex-col gap-2", className)}>
      <span className="text-xs leading-4 text-foreground/60">{label}</span>
      {children}
    </label>
  )
}

const repeatDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

function AddExerciseCard() {
  const [repeat, setRepeat] = React.useState<string[]>(["Mon"])
  const toggle = (d: string) =>
    setRepeat((r) => (r.includes(d) ? r.filter((x) => x !== d) : [...r, d]))

  return (
    <Panel className="absolute top-[170px] left-[1213px] h-[780px] w-[660px] gap-[18px]">
      <PanelHeader title="Add exercise" />
      <Field label="Exercise">
        <button
          type="button"
          className={cn(
            "flex w-full items-center justify-between border text-foreground/60",
            field
          )}
        >
          Search exercise library
          <ChevronDownIcon className="size-[18px]" strokeWidth={1.25} />
        </button>
      </Field>
      <div className="flex w-full gap-4">
        <Field label="Sets" className="flex-1">
          <Input defaultValue="3" className={field} />
        </Field>
        <Field label="Reps" className="flex-1">
          <Input defaultValue="12" className={field} />
        </Field>
        <Field label="Load" className="flex-1">
          <Input defaultValue="10 kg" className={field} />
        </Field>
      </div>
      <div className="flex w-full gap-4">
        <Field label="Rest" className="flex-1">
          <Input defaultValue="60 sec" className={field} />
        </Field>
        <Field label="Duration" className="flex-1">
          <Input defaultValue="15 min" className={field} />
        </Field>
      </div>
      <div className="flex w-full flex-col gap-2">
        <p className="text-xs leading-4 text-foreground/60">Repeat on</p>
        <div className="flex items-center gap-2.5">
          {repeatDays.map((d) => (
            <Chip key={d} on={repeat.includes(d)} onClick={() => toggle(d)}>
              {d}
            </Chip>
          ))}
        </div>
      </div>
      <Field label="Instructions" className="w-full">
        <Textarea
          placeholder="Form cues, tempo or safety notes"
          className="h-[120px] rounded-[24px] border-foreground/8 bg-background/70 px-[18px] pt-3.5 text-sm leading-5 placeholder:text-foreground/60 md:text-sm dark:bg-background/70"
        />
      </Field>
      <div className="flex w-full justify-end gap-3 pt-1">
        <Button variant="secondary" className="h-11 border-primary/12 px-[22px] text-sm">
          Cancel
        </Button>
        <Button variant="app" className="h-11 gap-1 pr-[22px] pl-5 text-sm">
          <PlusIcon className="size-[18px]" strokeWidth={1.5} />
          Add to plan
        </Button>
      </div>
    </Panel>
  )
}

// Figma: Desktop / Exercises (2012:1916)
export default function DoctorExercises() {
  return (
    <PatientShell eyebrow="Usha Sethi" heading="Exercises">
      <div className="absolute top-[170px] left-[47px] flex w-[420px] flex-col gap-6">
        <ThisWeekCard />
        <GoalsCard />
      </div>
      <PlanCard />
      <AddExerciseCard />
    </PatientShell>
  )
}
