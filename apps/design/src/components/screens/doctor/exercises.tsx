import { CheckIcon, DumbbellIcon, PlusIcon } from "lucide-react"
import { cn } from "cn"

import {
  DOCTOR_ASSETS,
  DoctorAppShell,
  DoctorCard,
  DoctorCardHeader,
  HeaderIconButton,
  IconDisc,
  ListItem,
  MaskIcon,
  ProgressTrack,
  Tag,
} from "./shared-f"

export const title = "Exercises"

const week = [
  { id: "mon", label: "M", done: true },
  { id: "tue", label: "T", done: true },
  { id: "wed", label: "W", done: true },
  { id: "thu", label: "T", done: true },
  { id: "fri", label: "F", done: false },
  { id: "sat", label: "S", done: false },
  { id: "sun", label: "S", done: false },
]

const plan: { name: string; detail: string; status: "done" | "pending"; kind: "strength" | "cardio" }[] = [
  { name: "Goblet squat", detail: "3 × 12 · 12 kg", status: "done", kind: "strength" },
  { name: "Romanian deadlift", detail: "3 × 10 · 20 kg", status: "done", kind: "strength" },
  { name: "Glute bridge", detail: "3 × 15 · bodyweight", status: "pending", kind: "cardio" },
  { name: "Plank hold", detail: "3 × 45 sec", status: "pending", kind: "cardio" },
]

// Figma: Mobile / Exercises (2016:2301)
export default function Exercises() {
  return (
    <DoctorAppShell eyebrow="Usha Sethi" title="Exercises">
      <DoctorCard>
        <DoctorCardHeader title="This week" />
        <div className="flex items-end gap-2 whitespace-nowrap">
          <p className="text-5xl leading-[54px]">4</p>
          <p className="text-[13px] leading-7 text-foreground/60">of 6 sessions</p>
        </div>
        <ProgressTrack value={4 / 6} label="Sessions this week" className="h-2.5" />
        <div className="flex items-start justify-between">
          {week.map((d) => (
            <div key={d.id} className="flex flex-col items-center gap-1.5">
              <p className="text-[11px] leading-[14px] text-foreground/60">{d.label}</p>
              <span
                aria-label={d.done ? "Completed" : "Not completed"}
                className={cn(
                  "flex size-8 items-center justify-center rounded-full",
                  d.done ? "bg-primary text-primary-foreground" : "bg-secondary"
                )}
              >
                {d.done && <CheckIcon className="size-3.5" strokeWidth={2} />}
              </span>
            </div>
          ))}
        </div>
      </DoctorCard>

      <DoctorCard className="gap-2.5">
        <DoctorCardHeader
          title="Today's plan"
          action={
            <HeaderIconButton label="Add exercise">
              <PlusIcon className="size-[22px]" strokeWidth={1.5} />
            </HeaderIconButton>
          }
        />
        {plan.map((e) => (
          <ListItem
            key={e.name}
            className="h-[58px]"
            icon={
              <IconDisc>
                {e.kind === "strength" ? (
                  <DumbbellIcon className="size-[19px]" strokeWidth={1.5} />
                ) : (
                  <MaskIcon src={`${DOCTOR_ASSETS}/exercises-run.svg`} />
                )}
              </IconDisc>
            }
            title={e.name}
            subtitle={e.detail}
            trailing={<Tag>{e.status}</Tag>}
          />
        ))}
      </DoctorCard>
    </DoctorAppShell>
  )
}
