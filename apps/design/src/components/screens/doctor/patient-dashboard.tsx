import { ChevronRightIcon } from "lucide-react"

import { cn } from "@workspace/ui/lib/utils"

import { Screen } from "../screen"
import {
  DoctorBottomNav,
  DoctorCard,
  DoctorGlow,
  DoctorHeader,
  PhotoAvatar,
  Tag,
  doctorPhoto,
  mutedText,
} from "./shared-e"

export const title = "Patient dashboard"

const ASSETS = "/screens/doctor"

const scores = [
  { label: "Patient risk", value: "44%", fill: 56 },
  { label: "Form score", value: "72", fill: 92 },
]

const carePlan = [
  { label: "Nutrition & diet", detail: "Protein 86 / 120 g", icon: `${ASSETS}/patient-dashboard-leaf.svg` },
  { label: "Exercises", detail: "4 of 6 sessions", icon: `${ASSETS}/patient-dashboard-run.svg` },
  { label: "Prescriptions", detail: "2 medicines · 3 supplements", icon: `${ASSETS}/patient-dashboard-pill.svg` },
]

/** Figma icon (drawn in #420080) used as a mask so it follows the theme's primary. */
function MaskIcon({ src }: { src: string }) {
  return (
    <span
      aria-hidden
      className="block size-[22px] shrink-0 bg-primary dark:bg-secondary"
      style={{ mask: `url(${src}) center / contain no-repeat` }}
    />
  )
}

// Figma: Mobile / Patient dashboard (2016:903)
export default function PatientDashboard() {
  return (
    <Screen>
      <DoctorGlow />
      <DoctorHeader eyebrow="Patients" title="Usha Sethi" />

      {/* Card / Patient profile */}
      <DoctorCard className="absolute top-[140px] left-[11px] w-[381px] gap-3">
        <div className="flex w-full items-center gap-3.5">
          <PhotoAvatar photo={doctorPhoto} alt="Usha Sethi" size={64} />
          <div className="flex flex-col gap-1.5">
            <p className={cn("text-[13px] leading-[18px] whitespace-nowrap", mutedText)}>
              39 · F · Sarcopenia risk
            </p>
            <div className="flex gap-1.5">
              <Tag>active</Tag>
              <Tag>2L · 42 days</Tag>
            </div>
          </div>
        </div>
        <p className={cn("text-[13px] leading-[18px] whitespace-nowrap", mutedText)}>
          Next visit · Wed 11 Dec · 10:00
        </p>
      </DoctorCard>

      {/* Scores */}
      <div className="absolute top-[302px] left-[11px] flex w-[381px] gap-3">
        {scores.map((s) => (
          <DoctorCard key={s.label} className="min-w-0 flex-1 gap-2 p-[22px]">
            <p className="text-[15px] leading-5 whitespace-nowrap">{s.label}</p>
            <p className="text-[44px] leading-[50px] whitespace-nowrap">{s.value}</p>
            <div
              role="meter"
              aria-label={s.label}
              aria-valuemin={0}
              aria-valuemax={128}
              aria-valuenow={s.fill}
              className="h-2.5 w-32 overflow-hidden rounded-full bg-secondary/70"
            >
              <div className="h-full rounded-full bg-primary" style={{ width: s.fill }} />
            </div>
          </DoctorCard>
        ))}
      </div>

      {/* Card / Care plan */}
      <DoctorCard className="absolute top-[458px] left-[11px] w-[381px] gap-2.5">
        <p className="text-base leading-5">Care plan</p>
        {carePlan.map((item) => (
          <button
            key={item.label}
            type="button"
            className="flex h-[68px] w-full items-center justify-between rounded-[24px] bg-secondary/55 px-3.5 text-left text-secondary-foreground"
          >
            <span className="flex items-center gap-3">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-background">
                <MaskIcon src={item.icon} />
              </span>
              <span className="flex flex-col whitespace-nowrap">
                <span className="text-[19px] leading-[22px] tracking-tight">{item.label}</span>
                <span className="text-[11px] leading-4 opacity-60">{item.detail}</span>
              </span>
            </span>
            <ChevronRightIcon className="size-[18px]" strokeWidth={1.5} />
          </button>
        ))}
      </DoctorCard>

      <DoctorBottomNav />
    </Screen>
  )
}
