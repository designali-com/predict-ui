"use client"

import * as React from "react"
import { cn } from "cn"

import { AppCard } from "@workspace/ui/predict/app/app-card"
import { AppBottomNav } from "@workspace/ui/predict/app/app-bottom-nav"
import { AppGlow } from "@workspace/ui/predict/app/app-glow"

import { Screen } from "../screen"
import { HomeFigure, HomeHeader, WeekDial, homeCardShadow } from "./shared-a"

export const title = "Home · Day score"

const plan = [
  { label: "Walk", value: "40 Min" },
  { label: "Snack", value: ["Roasted", "Chana"] },
  { label: "Walk", value: "40 Min" },
]

/** Day score dial: lavender rings, a violet half-arc and dashed segments over the top. */
function DayScore({ score }: { score: number }) {
  return (
    <div className="relative h-[204px] w-[158px] shrink-0">
      <div className="absolute top-[55.5px] left-1/2 size-24 -translate-x-1/2 rounded-full bg-secondary shadow-[inset_0_10px_20px_0_rgb(255_255_255/0.25)]" />
      <div className="absolute top-[24.5px] left-1/2 size-[158px] -translate-x-1/2 rounded-full border-10 border-dashed border-secondary" />
      <div className="absolute top-[42.5px] left-1/2 size-[122px] -translate-x-1/2 rounded-full border-[15px] border-secondary" />

      <svg
        aria-hidden
        viewBox="0 0 137 76"
        className="absolute top-[35px] left-[10.5px] h-[76px] w-[137px] overflow-visible text-primary"
        fill="none"
      >
        <path
          d="M7.5 68.5C7.5 34.8106 34.8106 7.5 68.5 7.5C102.189 7.5 129.5 34.8106 129.5 68.5"
          stroke="currentColor"
          strokeWidth={15}
          strokeLinecap="round"
        />
      </svg>
      <svg
        aria-hidden
        viewBox="0 0 168 89"
        className="absolute top-[19.5px] left-[-5px] h-[89px] w-[168px] overflow-visible text-primary"
        fill="none"
      >
        <path
          d="M163 84C163 80.5029 162.773 77.0589 162.332 73.6819M5 84C5 80.5029 5.22723 77.0589 5.66773 73.6819M10.9946 53.7598C13.6579 47.3373 17.144 41.3422 21.3214 35.9061M35.9061 21.3214C41.3422 17.144 47.3373 13.6579 53.7598 10.9946M73.6819 5.66773C77.0589 5.22723 80.5029 5 84 5C87.4971 5 90.9411 5.22723 94.3181 5.66773M114.24 10.9946C120.663 13.6579 126.658 17.144 132.094 21.3214M146.679 35.9061C150.856 41.3422 154.342 47.3373 157.005 53.7598"
          stroke="currentColor"
          strokeWidth={10}
          strokeLinecap="round"
        />
      </svg>

      <p className="absolute top-[86.5px] left-1/2 -translate-x-1/2 text-4xl leading-5 text-primary">{score}</p>
      <p className="absolute top-[109.5px] left-1/2 -translate-x-1/2 text-xs leading-5 text-primary">/100</p>
    </div>
  )
}

function DayCard({ className }: { className?: string }) {
  return (
    <AppCard
      className={cn(
        "absolute w-[264px] items-center justify-between gap-0 rounded-[32px] p-6",
        homeCardShadow,
        className
      )}
    >
      <p className="text-sm leading-5 whitespace-nowrap">Wednesday, 27 December, 2026</p>
      <DayScore score={25} />
      <div className="flex items-start gap-6 whitespace-nowrap">
        {plan.map((item, i) => (
          <div key={i} className="flex flex-col">
            <span className="text-xs leading-5">{item.label}</span>
            <span className="text-sm font-medium">
              {Array.isArray(item.value) ? (
                <span className="block leading-4">
                  {item.value.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              ) : (
                <span className="leading-5">{item.value}</span>
              )}
            </span>
          </div>
        ))}
      </div>
    </AppCard>
  )
}

const statPill =
  "absolute flex h-8 items-center justify-between rounded-full bg-secondary px-3 text-sm leading-5 whitespace-nowrap text-secondary-foreground"

// Figma: iPhone 18 Pro - 166 (1871:1103)
export default function Home03() {
  return (
    <Screen>
      <HomeFigure top={605} blurTop={628} />
      <WeekDial featured />
      <AppGlow variant="blob" className="-bottom-[513px]" />

      <HomeHeader />

      <div className={cn(statPill, "top-[644px] left-[209px] w-[135px]")}>
        <span>Muscle Age</span>
        <span>34</span>
      </div>
      <div className={cn(statPill, "top-[715px] left-[53px] w-[134px]")}>
        <span>Twin Age</span>
        <span>56</span>
      </div>

      {/* Day carousel: yesterday · today · tomorrow */}
      <DayCard className="top-[320px] left-[-217px] h-[296px]" />
      <DayCard className="top-[320px] left-[355px] h-[296px]" />
      <DayCard className="top-[243px] left-[69px] h-[340px]" />

      <AppBottomNav />
    </Screen>
  )
}
