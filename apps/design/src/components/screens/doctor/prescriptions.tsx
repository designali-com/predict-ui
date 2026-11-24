"use client"

import * as React from "react"
import { PlusIcon } from "lucide-react"
import { cn } from "cn"

import { AppButton as Button } from "@workspace/ui/predict/app/app-glass"

import {
  DOCTOR_ASSETS,
  DoctorAppShell,
  DoctorCard,
  DoctorCardHeader,
  IconDisc,
  ListItem,
  MaskIcon,
  Tag,
} from "./shared-f"

export const title = "Prescriptions"

type Kind = "Medicine" | "Supplement"

const prescriptions: { name: string; dose: string; kind: Kind }[] = [
  { name: "Metformin 500 mg", dose: "1 tablet · twice daily · 30 d", kind: "Medicine" },
  { name: "Atorvastatin 10 mg", dose: "1 tablet · night · 60 d", kind: "Medicine" },
  { name: "Predict +", dose: "1 scoop · after workout · 90 d", kind: "Supplement" },
  { name: "Vitamin D3 60,000 IU", dose: "1 sachet · weekly · 8 wk", kind: "Supplement" },
]

/** The "All" count is the plan total in Figma (5), not just the rows shown. */
const filters: { id: "all" | Kind; label: string }[] = [
  { id: "all", label: "All 5" },
  { id: "Medicine", label: "Medicines 2" },
  { id: "Supplement", label: "Supplements 3" },
]

// Figma: Mobile / Prescriptions (2016:2650)
export default function Prescriptions() {
  const [filter, setFilter] = React.useState<"all" | Kind>("all")
  const rows = prescriptions.filter((p) => filter === "all" || p.kind === filter)

  return (
    <DoctorAppShell eyebrow="Usha Sethi" title="Prescriptions">
      <DoctorCard>
        <DoctorCardHeader title="Prescriptions" />
        <div className="flex gap-2">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                "flex h-8 items-center justify-center rounded-full px-3.5 text-xs leading-4 whitespace-nowrap",
                filter === f.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
        {rows.map((p) => (
          <ListItem
            key={p.name}
            className="h-16"
            icon={
              <IconDisc>
                <MaskIcon src={`${DOCTOR_ASSETS}/prescriptions-pill.svg`} />
              </IconDisc>
            }
            title={p.name}
            subtitle={p.dose}
            trailing={<Tag>{p.kind}</Tag>}
          />
        ))}
        <div className="pt-1">
          <Button variant="app" className="h-11 w-full gap-1 rounded-full pr-[22px] pl-[18px] text-sm font-normal">
            <PlusIcon className="size-[18px]" strokeWidth={1.5} />
            New prescription
          </Button>
        </div>
      </DoctorCard>
    </DoctorAppShell>
  )
}
