"use client"

import * as React from "react"
import { ArrowUpRightIcon } from "lucide-react"
import { cn } from "cn"

import { AppCard } from "@workspace/ui/predict/app/app-card"
import { AppBottomNav } from "@workspace/ui/predict/app/app-bottom-nav"
import { AppGlow } from "@workspace/ui/predict/app/app-glow"

import { Screen } from "../screen"
import { HomeFigure, HomeHeader, WeekDial } from "./shared-a"

export const title = "Home · Family"

const notifications = [
  { inset: "inset-x-6 top-[15px]", title: "Your results are ready", body: "Open Predict to see them." },
  { inset: "inset-x-2 top-[25px]", title: "Your results are ready", body: "Open Predict to see them." },
  { inset: "inset-x-0 top-[35px]", title: "Upcoming appointment", body: "with Dr. Kavita Iyer at today..." },
]

/** Family care-access progress, split into weekly segments. */
const segmentDividers = [68, 147.6, 227]

function Avatar({ src, alt, className }: { src: string; alt: string; className: string }) {
  return (
    <div className="absolute top-0 size-[60px] overflow-hidden rounded-full bg-secondary ring-2 ring-card">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className={cn("absolute max-w-none", className)} />
    </div>
  )
}

// Figma: iPhone 18 Pro - 169 (1871:1574)
export default function Home02() {
  return (
    <Screen>
      <HomeFigure top={240.34} />
      <WeekDial />

      <HomeHeader />

      {/* Readiness card peeking out below the family stack */}
      <AppCard className="absolute top-[761px] left-1/2 w-[311px] -translate-x-1/2 gap-0 rounded-[24px] p-4 text-white">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1.5">
            <p className="h-5 text-sm leading-6">Readiness</p>
            <p className="h-2.5 text-[10px] leading-2">You&apos;re well recovered.</p>
          </div>
          <ArrowUpRightIcon className="size-6" strokeWidth={1} />
        </div>
        <div className="flex w-[90px] flex-col">
          <p className="text-sm leading-5">Slept</p>
          <p className="text-2xl leading-7 font-medium">7 h 40m</p>
          <p className="text-xs leading-4">HRV 62 ms</p>
        </div>
      </AppCard>

      <AppGlow variant="blob" />

      {/* Stacked notifications */}
      <div className="absolute top-[282px] left-[calc(50%+0.5px)] h-[92px] w-[263px] -translate-x-1/2">
        {notifications.map((n, i) => (
          <AppCard
            key={i}
            className={cn("absolute w-auto flex-row gap-[3px] rounded-[24px] px-4 py-3", n.inset)}
          >
            <div className="w-[187px] shrink-0">
              <p className="text-sm leading-[17px] font-medium">{n.title}</p>
              <p className="mt-0.5 truncate text-xs leading-[14px]">{n.body}</p>
            </div>
            <p className="flex-1 text-right text-[11px] leading-[13px]">6:15 pm</p>
          </AppCard>
        ))}
      </div>

      {/* Family + metrics stack */}
      <div className="absolute top-[384px] left-[10px] flex h-[405px] w-[382px] flex-col gap-[9px] rounded-[48px] bg-secondary/20 p-2.5 backdrop-blur-md">
        {/* The Mehtas Family */}
        <section className="relative h-[205px] shrink-0 rounded-[40px] bg-card text-card-foreground">
          <h2 className="absolute top-5 left-[21px] text-xl leading-6 font-normal">The Mehtas Family</h2>
          <p className="absolute top-[51px] left-[21px] w-[162px] text-sm leading-[17px]">
            5 people · you hold care access for two
          </p>

          <div className="absolute top-[23px] left-[203px] h-[60px] w-[138px]">
            <div className="absolute left-0">
              <Avatar
                src="/screens/shared/avatar.png"
                alt="Rohan"
                className="top-[-21px] left-[-17.02px] h-[155px] w-[87.04px]"
              />
            </div>
            <div className="absolute left-10">
              <Avatar
                src="/screens/home/home-02-member.png"
                alt="Family member"
                className="top-[-3.6px] left-[-81.57px] h-[110.34px] w-[165.5px]"
              />
            </div>
            <div className="absolute top-0 left-[78px] flex size-[60px] items-center justify-center rounded-full bg-secondary text-xl text-secondary-foreground ring-2 ring-card">
              +2
            </div>
          </div>

          <p className="absolute top-[130px] left-[22px] text-sm leading-[17px] text-foreground/40">+8 this week</p>
          <p className="absolute top-[121px] right-10 text-2xl leading-[29px]">72</p>
          <p className="absolute top-[128px] right-[22px] text-base leading-[19px] text-foreground/40">%</p>

          <div
            role="progressbar"
            aria-valuenow={72}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Care access this week"
            className="absolute top-[160px] left-[35px] h-[22px] w-[292px] overflow-hidden rounded-full bg-secondary"
          >
            <div className="absolute inset-y-0 left-0 w-[218px] rounded-l-full bg-primary" />
            {segmentDividers.map((x) => (
              <div key={x} className="absolute inset-y-0 w-[3px] bg-card" style={{ left: x }} />
            ))}
          </div>
        </section>

        {/* All metrics */}
        <section className="relative h-[170px] shrink-0 overflow-hidden rounded-[40px] bg-card text-card-foreground">
          <h2 className="absolute top-5 left-[21px] text-xl leading-6 font-normal">All metrics</h2>
          <p className="absolute top-[51px] left-[21px] w-[182px] text-sm leading-[17px]">
            Everything your connected sources have written today.
          </p>

          <div className="absolute top-[51px] left-2 h-[106px] w-[347px] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/screens/home/home-02-metrics-grid.svg"
              alt=""
              className="absolute top-[55.5px] left-[12.08px] h-[61.92px] w-[315.3px] max-w-none dark:opacity-40"
              style={{
                maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
              }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/screens/home/home-02-metrics-line.svg"
              alt=""
              className="absolute top-[11.02px] left-[11.08px] h-[70.89px] w-[317.3px] max-w-none"
            />
            <button
              type="button"
              className="absolute top-[40px] left-[209px] flex h-8 w-[100px] items-center justify-center gap-1.5 rounded-full bg-secondary/50 text-xs leading-5 shadow-button-soft"
            >
              <span className="size-1.5 rounded-full bg-primary" />
              Sleep Score
            </button>
          </div>
        </section>
      </div>

      <AppBottomNav />
    </Screen>
  )
}
