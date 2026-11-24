"use client"

import * as React from "react"

import { AppBottomNav } from "@workspace/ui/predict/app/app-bottom-nav"
import { AppGlow } from "@workspace/ui/predict/app/app-glow"

import { Screen } from "../screen"
import {
  HeartIllustration,
  HomeCard,
  HomeCardHeader,
  HomeHeader,
  HomeResultRow,
  Reading,
  SystemTabs,
} from "./shared-a"

export const title = "Twin · Age clock"

/** Twin age clock, laid out on Figma's 284.85 × 301 box. */
function AgeClock() {
  return (
    <div
      role="img"
      aria-label="Twin age 38 of 44, 7 years younger, 76.8%"
      className="absolute top-[140px] left-[59px] h-[301px] w-[284.85px]"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/screens/home/home-06-clock-ticks.png"
        alt=""
        className="absolute top-[48.69px] left-[50.63px] h-[175.25px] w-[184.22px] max-w-none opacity-20 dark:invert"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/screens/home/home-06-clock-arcs.svg"
        alt=""
        className="absolute top-0 left-0 h-[269.18px] w-[284.86px] max-w-none"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/screens/home/home-06-clock-dots.svg"
        alt=""
        className="absolute top-[30.25px] left-[32.07px] size-[221.34px] max-w-none"
      />

      {/* Hands: hour, minute, and the dashed calendar-age hand */}
      <svg
        aria-hidden
        viewBox="0 0 284.85 301"
        fill="none"
        className="absolute inset-0 size-full overflow-visible text-primary"
      >
        <line x1={140.8} y1={93.5} x2={146.3} y2={138.5} stroke="currentColor" strokeWidth={8.17} strokeLinecap="round" />
        <line x1={14.1} y1={140.9} x2={143.15} y2={140.12} stroke="currentColor" strokeWidth={4.08} strokeLinecap="round" />
      </svg>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/screens/home/home-06-clock-hand-dashed.png"
        alt=""
        className="absolute top-[169.1px] left-[132.12px] h-[4.08px] w-[111.09px] max-w-none rotate-[-143.97deg]"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/screens/home/home-06-clock-pivot.png"
        alt=""
        className="absolute top-[129.36px] left-[131.3px] size-[22.87px] max-w-none"
      />

      <p className="absolute top-[198.09px] left-[142.27px] -translate-x-1/2 text-[13.07px] whitespace-nowrap">38/44</p>
      <span className="absolute top-[216.87px] left-[calc(50%+0.31px)] -translate-x-1/2 rounded-full bg-primary px-[6.27px] py-[3.76px] text-[6.41px] font-medium whitespace-nowrap text-primary-foreground">
        -7 YEARS
      </span>
      <p className="absolute top-[269.96px] left-[142.5px] -translate-x-1/2 text-[26.14px] whitespace-nowrap">76.8%</p>
    </div>
  )
}

// Figma: iPhone 18 Pro - 170 (1871:1793)
export default function Home06() {
  return (
    <Screen>
      <HomeHeader />
      <AgeClock />

      <p className="absolute top-[463px] left-1/2 w-[270px] -translate-x-1/2 text-center text-xl leading-6">
        3.6 years younger than your calendar age
      </p>
      <span className="absolute top-[533px] left-[calc(50%+0.5px)] -translate-x-1/2 rounded-full bg-secondary px-3.5 py-1.5 text-xs leading-5 whitespace-nowrap text-secondary-foreground shadow-button-soft">
        0.87× ageing pace
      </span>

      <SystemTabs order={["heart", "immune", "bones", "brain"]} className="top-[591px]" />

      <HomeCard className="top-[642px] h-[576px]">
        <HomeCardHeader title="Heart and blood vessels" caption="2 results here are above range." />
        <HeartIllustration />
        <HomeResultRow
          title="Blood sugar"
          caption="1 result near the limit"
          value={<Reading value="18" unit="ng/mL" />}
        />
        <HomeResultRow
          title="Vitamins and minerals"
          caption="1 result below range"
          value={<Reading value="3.4" unit="mg/L" />}
        />
      </HomeCard>

      <AppGlow variant="fade" />
      <AppBottomNav active="explore" />
    </Screen>
  )
}
