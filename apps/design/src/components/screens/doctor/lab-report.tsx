"use client"

import { cn } from "cn"

import { DoctorAppShell, GlassCard, PhotoAvatar, PillButton, patientPhotos } from "./shared-g"

export const title = "Lab report"

/** Bar is 220px; the reference range spans x 44–176, `dot` is the marker centre. */
const results = [
  { name: "Haemoglobin", value: "11.2 g/dL", range: "12.0 – 15.0", dot: 17.6, flag: true },
  { name: "Haematocrit", value: "34.8 %", range: "36 – 46", dot: 30.8, flag: true },
  { name: "RBC count", value: "4.2 M/µL", range: "3.8 – 4.8", dot: 96.8 },
  { name: "WBC count", value: "7.4 K/µL", range: "4.0 – 10.0", dot: 119.24 },
  { name: "Platelets", value: "245 K/µL", range: "150 – 410", dot: 92.84 },
  { name: "MCV", value: "82 fL", range: "80 – 100", dot: 57.2 },
]

const stats = [
  { label: "Results", value: "10" },
  { label: "Out of range", value: "2", flag: true },
  { label: "Hb change", value: "−0.6" },
]

function RangeBar({ dot, flag }: { dot: number; flag?: boolean }) {
  return (
    <div aria-hidden className="relative h-2.5 w-[220px] shrink-0 overflow-hidden">
      <div className="absolute inset-x-0 top-0.5 h-1.5 rounded-full bg-secondary" />
      <div className="absolute top-0.5 left-[44px] h-1.5 w-[132px] bg-primary/25" />
      <div
        className={cn(
          "absolute top-0 size-2.5 -translate-x-1/2 rounded-full",
          flag ? "bg-destructive" : "bg-primary"
        )}
        style={{ left: dot }}
      />
    </div>
  )
}

// Figma: Mobile / Lab report (2072:1348)
export default function LabReport() {
  return (
    <DoctorAppShell eyebrow="Lab inbox" title="CBC report">
      <GlassCard className="shrink-0 gap-2.5 p-[22px]">
        <div className="flex items-center gap-3">
          <PhotoAvatar photo={patientPhotos.usha} alt="Usha Sethi" size={48} />
          <div className="flex min-w-0 flex-1 flex-col gap-0.5 whitespace-nowrap">
            <p className="text-xl leading-[normal]">Usha Sethi</p>
            <p className="text-[11px] leading-[normal] text-foreground/60">
              Collected 8 Nov · Apollo Diagnostics
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex min-w-0 flex-1 flex-col gap-0.5 rounded-2xl bg-card/70 px-3 py-2 whitespace-nowrap"
            >
              <p className="text-[10px] leading-[normal] text-foreground/60">{s.label}</p>
              <p className={cn("text-[22px] leading-[normal]", s.flag && "text-destructive")}>{s.value}</p>
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard className="min-h-0 flex-1 gap-1 p-[18px]">
        {results.map((r) => (
          <div
            key={r.name}
            className={cn(
              "flex w-full shrink-0 flex-col gap-1.5 rounded-2xl px-3 py-2",
              r.flag && "bg-destructive/10"
            )}
          >
            <div className="flex items-center gap-2 leading-[normal]">
              <p className="min-w-0 flex-1 text-base">{r.name}</p>
              <p className={cn("text-[13px] font-medium whitespace-nowrap", r.flag && "text-destructive")}>
                {r.value}
              </p>
            </div>
            <div className="flex items-center gap-2.5">
              <RangeBar dot={r.dot} flag={r.flag} />
              <p className="min-w-0 flex-1 text-[11px] leading-[normal] text-foreground/60">{r.range}</p>
            </div>
          </div>
        ))}
      </GlassCard>

      <div className="flex shrink-0 gap-2">
        <PillButton tone="secondary" className="h-11 flex-1">
          Message
        </PillButton>
        <PillButton className="h-11 flex-1">Mark reviewed</PillButton>
      </div>
    </DoctorAppShell>
  )
}
