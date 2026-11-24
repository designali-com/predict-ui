"use client"

import * as React from "react"
import { cn } from "cn"

import { AppBottomNav } from "@workspace/ui/predict/app/app-bottom-nav"
import { AppGlow } from "@workspace/ui/predict/app/app-glow"

import { Screen } from "../screen"
import {
  HomeCard,
  HomeCardHeader,
  HomeFigure,
  HomeHeader,
  HomeResultRow,
  Reading,
  WeekDial,
} from "./shared-a"

export const title = "Home · Blood report"

const BARS = 20
const IN_RANGE_BARS = 16

const results = [
  { title: "Vitamin D", caption: "Below range, 30 to 100", value: "18", unit: "ng/mL" },
  { title: "hs-CRP", caption: "Above range, under 3", value: "3.4", unit: "mg/L" },
  { title: "HbA1c", caption: "Above range, under 5.7", value: "5.9%" },
]

// Figma: iPhone 18 Pro - 167 (1871:1244)
export default function Home04() {
  return (
    <Screen>
      <HomeFigure top={605} blurTop={628} />
      <AppGlow variant="blob" className="-bottom-[513px]" />
      <HomeHeader />
      <WeekDial />

      <HomeCard className="top-[289px] h-[473px]">
        <HomeCardHeader title="Blood report" caption="Apollo Diagnostics · 12 Nov" />

        <div className="flex flex-col gap-6">
          <div className="flex items-end">
            <p className="h-[85px] w-[99px] text-8xl leading-[0.91] whitespace-nowrap">58</p>
            <p className="h-3.5 text-sm leading-2 whitespace-nowrap">of 61 in range</p>
          </div>
          <div
            role="meter"
            aria-label="Results in range"
            aria-valuenow={58}
            aria-valuemin={0}
            aria-valuemax={61}
            className="flex h-9 w-[320.5px] gap-[9.5px]"
          >
            {Array.from({ length: BARS }, (_, i) => (
              <span
                key={i}
                className={cn(
                  "h-9 w-[7px] shrink-0 rounded-[20px]",
                  i < IN_RANGE_BARS ? "bg-primary" : "bg-secondary/50"
                )}
              />
            ))}
          </div>
        </div>

        {results.map((r) => (
          <HomeResultRow
            key={r.title}
            title={r.title}
            caption={r.caption}
            value={<Reading value={r.value} unit={r.unit} />}
          />
        ))}
      </HomeCard>

      <AppBottomNav />
    </Screen>
  )
}
