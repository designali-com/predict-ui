"use client"

import type * as React from "react"
import { ArrowUpRightIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

import { AppTabs, AppTabsList, AppTabsTrigger } from "@workspace/ui/predict/app/app-glass"

import { Panel, PatientShell } from "./shared-i"

export const title = "Digital twin · Musculoskeletal"

const ASSETS = "/screens/desktop/doctor"

const systems = [
  "Metabolic",
  "Musculoskeletal",
  "Cardiovascular",
  "Respiratory",
  "Nervous",
  "Digestive",
  "Hormonal",
  "Immune",
]

/* -------------------------------------------------------------------------- */
/* Rows                                                                       */
/* -------------------------------------------------------------------------- */

function CardTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="flex w-full shrink-0 items-start justify-between">
      <div className="flex flex-col gap-3">
        <h3 className="h-5 font-display text-[21px] leading-6 whitespace-nowrap">{title}</h3>
        {subtitle && <p className="text-[10px] leading-2 whitespace-nowrap">{subtitle}</p>}
      </div>
      <button type="button" aria-label={`Open ${title}`} className="shrink-0">
        <ArrowUpRightIcon className="size-6" strokeWidth={1} />
      </button>
    </div>
  )
}

function MetricRow({
  name,
  note,
  value,
}: {
  name: string
  note: string
  value: React.ReactNode
}) {
  return (
    <div className="flex w-full shrink-0 items-start justify-between">
      <div className="flex flex-col gap-3">
        <p className="h-5 font-display text-[21px] leading-6 whitespace-nowrap">{name}</p>
        <p className="text-[10px] leading-2 whitespace-nowrap">{note}</p>
      </div>
      <button
        type="button"
        aria-label={`Open ${name}`}
        className="flex h-[42px] w-[100px] flex-col items-end justify-between"
      >
        <ChevronRightIcon className="size-6" strokeWidth={1} />
        <span className="text-right text-[10px] leading-2 whitespace-nowrap">{value}</span>
      </button>
    </div>
  )
}

const factors = [
  { code: "RFF", name: "Renal Filtration Factor", value: "2.96" },
  { code: "CF", name: "Cardiometabolic Function", value: "2.72" },
  { code: "MHF", name: "Musculoskeletal Health Factor", value: "5.78" },
  { code: "MHF", name: "Musculoskeletal Health Factor", value: "5.78" },
  { code: "MHF", name: "Musculoskeletal Health Factor", value: "5.78" },
  { code: "MHF", name: "Musculoskeletal Health Factor", value: "5.78" },
]

/* -------------------------------------------------------------------------- */
/* Cards                                                                      */
/* -------------------------------------------------------------------------- */

function MuscleHealthCard() {
  return (
    <Panel className="absolute top-[269px] left-[47px] h-[677px] w-[429px] items-center gap-6">
      <CardTitle title="Usha muscle health" />
      <div className="flex flex-col gap-[27.589px]">
        <div className="flex items-end">
          <p className="h-[97.71px] w-[136.794px] font-display text-[110.355px] leading-[0.91]">36</p>
          <p className="h-4 w-[98.86px] text-[16.093px] leading-[9.196px] whitespace-nowrap">9 years older</p>
        </div>
        <div className="relative h-[39.084px] w-[369px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${ASSETS}/doctor-04-age-gauge.svg`}
            alt="Muscle age gauge"
            className="absolute inset-[-6.01%_-2.04%_-19.24%_-1.1%] block size-auto max-w-none"
          />
        </div>
      </div>
      {factors.map((f, i) => (
        <MetricRow key={i} name={f.code} note={f.name} value={<b className="font-bold">{f.value}</b>} />
      ))}
    </Panel>
  )
}

function TwinCard() {
  return (
    <Panel className="absolute top-[269px] left-[520px] h-[677px] w-[879px] items-center gap-6">
      <CardTitle title="Musculoskeletal system" subtitle="2 results are above range." />
      <div className="relative h-[551px] w-[811px] shrink-0 overflow-hidden rounded-[40px] border border-primary/20">
        <div className="absolute top-[-1px] left-1/2 h-[587px] w-[923px] -translate-x-1/2 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${ASSETS}/doctor-04-muscles.png`}
            alt="Musculoskeletal model of the upper body"
            className="absolute top-[-1.96%] left-[0.1%] h-[235.45%] w-[99.8%] max-w-none"
          />
        </div>
        {/* Brand tint over the anatomy render */}
        <div aria-hidden className="absolute top-[-1px] left-1/2 h-[551px] w-[811px] -translate-x-1/2 bg-primary mix-blend-color" />
        {/* Vertical level indicator */}
        <div
          role="progressbar"
          aria-label="Muscle level"
          aria-valuenow={50}
          aria-valuemin={0}
          aria-valuemax={100}
          className="absolute top-[259px] left-[752px] h-[245px] w-3.5 rounded-[7px] bg-secondary"
        >
          <div className="absolute bottom-0 left-0 h-[122px] w-full rounded-[7px] bg-primary" />
        </div>
      </div>
    </Panel>
  )
}

function HeartCard() {
  return (
    <Panel className="absolute top-[269px] left-[1442px] h-[677px] w-[429px] items-center gap-6">
      <CardTitle title="Heart" />
      {Array.from({ length: 9 }, (_, i) => (
        <MetricRow
          key={i}
          name="Blood sugar"
          note="1 result near the limit"
          value={
            <>
              18 <i>ng/mL</i>
            </>
          }
        />
      ))}
    </Panel>
  )
}

// Figma: Slide 16:9 - 54 (2027:7267)
export default function DoctorDesktop04() {
  return (
    <PatientShell eyebrow="Good morning," heading="Usha Sethi" tabs={["today", "twin", "patients"]} active="twin">
      {/* Timeline rule running under the body-system tabs */}
      <div aria-hidden className="absolute top-[198px] left-0 h-[2px] w-[959px] bg-primary" />
      <button
        type="button"
        aria-label="Back"
        className="absolute top-[183px] left-[75px] flex size-8 -translate-x-1/2 items-center justify-center rounded-full bg-secondary text-secondary-foreground"
      >
        <ChevronLeftIcon className="size-4" strokeWidth={1} />
      </button>

      <AppTabs defaultValue="Musculoskeletal" className="absolute top-[179px] left-1/2 -translate-x-1/2">
        <AppTabsList className="gap-1">
          {systems.map((s) => (
            <AppTabsTrigger key={s} value={s} className="h-[31px] flex-none px-4 text-sm leading-6 text-foreground">
              {s}
            </AppTabsTrigger>
          ))}
        </AppTabsList>
      </AppTabs>

      <MuscleHealthCard />
      <TwinCard />
      <HeartCard />
    </PatientShell>
  )
}
