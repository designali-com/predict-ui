"use client"

import * as React from "react"

import { AppBottomNav } from "@workspace/ui/predict/app/app-bottom-nav"
import { AppGlow } from "@workspace/ui/predict/app/app-glow"

import { Screen } from "../screen"
import {
  HomeCard,
  HomeCardHeader,
  HomeFigure,
  HomeHeader,
  HomeResultRow,
  WeekDial,
} from "./shared-a"

export const title = "Home · Muscle age"

/** Ruler geometry from Figma (331 × 42.6 drawing box). */
const MINOR_STEP = 5.35
const MINOR_TICKS = 61
const MAJOR_EVERY = 5
const MAJOR_FILLED = 7
const TRACK_END = 324.54
const FILL_END = 164.54

const systems = [
  { title: "RFF", caption: "Renal Filtration Factor", value: "2.96" },
  { title: "CF", caption: "Cardiometabolic Function", value: "2.72" },
  { title: "MHF", caption: "Musculoskeletal Health Factotor", value: "5.78" },
]

function AgeRuler() {
  const ticks = Array.from({ length: MINOR_TICKS }, (_, i) => 3.54 + i * MINOR_STEP)

  return (
    <div className="relative h-[34px] w-[321px] shrink-0">
      <svg
        role="img"
        aria-label="Muscle age compared with calendar age"
        viewBox="0 0 331.081 42.5846"
        fill="none"
        className="absolute top-[-2.04px] left-[-3.53px] h-[42.58px] w-[331.08px] overflow-visible"
      >
        <path
          d={`M6.54 36.04H${TRACK_END}`}
          strokeWidth={13.08}
          strokeLinecap="round"
          className="stroke-foreground/15"
        />
        <path
          d={`M6.54 36.04H${FILL_END}`}
          strokeWidth={13.08}
          strokeLinecap="round"
          className="stroke-primary"
        />
        {ticks.map((x, i) =>
          i % MAJOR_EVERY === 0 ? (
            <path
              key={x}
              d={`M${x} 16.92V2.04`}
              strokeWidth={4.09}
              strokeLinecap="round"
              className={i / MAJOR_EVERY < MAJOR_FILLED ? "stroke-primary" : "stroke-foreground/15"}
            />
          ) : (
            <path
              key={x}
              d={`M${x} 16.17V8.74`}
              strokeWidth={2.45}
              strokeLinecap="round"
              className="stroke-muted-foreground/30"
            />
          )
        )}
      </svg>
    </div>
  )
}

// Figma: iPhone 18 Pro - 168 (1871:1380)
export default function Home05() {
  return (
    <Screen>
      <HomeFigure top={605} blurTop={628} />
      <AppGlow variant="blob" className="-bottom-[513px]" />
      <HomeHeader />
      <WeekDial />

      <HomeCard className="top-[289px] h-[473px]">
        <HomeCardHeader title="Muscle age" caption="Calculated from 7 of 7 body systems." />

        <div className="flex flex-col gap-6">
          <div className="flex items-end">
            <p className="h-[85px] w-[119px] text-8xl leading-[0.91]">40</p>
            <p className="h-3.5 text-sm leading-2 whitespace-nowrap">9 years older</p>
          </div>
          <AgeRuler />
        </div>

        {systems.map((s) => (
          <HomeResultRow
            key={s.title}
            title={s.title}
            caption={s.caption}
            value={s.value}
            valueClassName="font-bold"
          />
        ))}
      </HomeCard>

      <AppBottomNav />
    </Screen>
  )
}
