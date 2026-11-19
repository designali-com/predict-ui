import { cn } from "@workspace/ui/lib/utils"
import { AppCardTitle } from "@workspace/ui/predict/app/app-card"

import { DesktopScreen } from "../desktop-screen"
import {
  BottomGlow,
  DashCard,
  DashCardHeader,
  DateStrip,
  DesktopNav,
  HomeHeader,
  MetricRow,
} from "./shared"

// Kept local: a plain value imported from a "use client" module is a client
// reference in this server component, not the string.
const ASSETS = "/screens/desktop/home"

export const title = "Home"

const statPill =
  "absolute flex h-10 items-center justify-between rounded-full bg-app-pill px-5 text-sm leading-5 whitespace-nowrap text-app-pill-foreground"

/** 20 vertical bars, the first `filled` in brand colour (58 of 61 in range). */
function RangeBars({ filled, total = 20 }: { filled: number; total?: number }) {
  return (
    <div className="flex h-9 w-[320.5px] gap-[9.5px]" aria-hidden>
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={cn("h-9 w-[7px] shrink-0 rounded-[20px]", i < filled ? "bg-app-brand" : "bg-app-pill/50")}
        />
      ))}
    </div>
  )
}

function BigStat({ value, caption, width }: { value: string; caption: string; width: number }) {
  return (
    <div className="flex items-end gap-2">
      <p className="h-[85px] shrink-0 font-display text-[96px] leading-[0.91]" style={{ minWidth: width }}>
        {value}
      </p>
      <p className="h-3.5 text-sm leading-2 whitespace-nowrap">{caption}</p>
    </div>
  )
}

function Unit({ value, unit }: { value: string; unit: string }) {
  return (
    <>
      {value} <span className="italic">{unit}</span>
    </>
  )
}

const goals = [
  { label: "Walk", value: "40 Min" },
  { label: "Snack", value: "Roasted\nChana" },
  { label: "Walk", value: "40 Min" },
]

function DailyGoalsRing() {
  return (
    <div className="relative h-[204px] w-[158px] shrink-0">
      <div className="absolute top-[55.5px] left-1/2 size-24 -translate-x-1/2 rounded-full bg-app-pill shadow-[inset_0_10px_20px_rgba(255,255,255,0.25)]" />
      <div className="absolute top-[24.5px] left-1/2 size-[158px] -translate-x-1/2 rounded-full border-10 border-dashed border-app-pill" />
      <div className="absolute top-[42.5px] left-1/2 size-[122px] -translate-x-1/2 rounded-full border-[15px] border-app-pill" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${ASSETS}/home-01-goals-arc.svg`}
        alt=""
        className="absolute top-[35px] left-[10.5px] h-[76px] w-[137px] max-w-none"
      />
      <p className="absolute top-[86.5px] left-[calc(50%+0.5px)] -translate-x-1/2 text-4xl leading-5 text-app-accent">
        25
      </p>
      <p className="absolute top-[109.5px] left-1/2 -translate-x-1/2 text-xs leading-5 text-app-accent">/100</p>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${ASSETS}/home-01-goals-ticks.svg`}
        alt=""
        className="absolute top-[19.5px] left-[-5px] h-[89px] w-[168px] max-w-none"
      />
    </div>
  )
}

const goalsCard = "top-[398px] h-[340px] w-[264px] justify-between gap-0 rounded-[32px] p-6"

// Figma: Slide 16:9 - 1 (1815:3162)
export default function HomeDesktop01() {
  return (
    <DesktopScreen>
      {/* Body figure: a soft blurred copy under the sharp render */}
      {["opacity-50 blur-[25px]", ""].map((layer, i) => (
        <div
          key={i}
          aria-hidden
          className={cn(
            "pointer-events-none absolute top-[271px] left-[534.07px] h-[1215px] w-[850.855px] overflow-hidden",
            layer
          )}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/screens/home/home-01-figure.png"
            alt=""
            className="absolute top-[-0.07%] left-[-35.07%] h-[178.51%] w-[169.94%] max-w-none"
          />
        </div>
      ))}

      <BottomGlow />

      <HomeHeader />
      <DateStrip />

      <div className={cn(statPill, "top-[699px] left-[984px] min-w-[135px] gap-3")}>
        <span>Muscle Age</span>
        <span>34</span>
      </div>
      <div className={cn(statPill, "top-[796px] left-[740px] min-w-[134px] gap-3")}>
        <span>Twin Age</span>
        <span>56</span>
      </div>

      {/* Daily goals */}
      <DashCard className={cn(goalsCard, "left-[467px]")}>
        <p className="h-5 text-sm leading-5">Daily Goals</p>
        <DailyGoalsRing />
        <div className="flex items-start gap-6 whitespace-nowrap">
          {goals.map((g, i) => (
            <div key={i} className="flex flex-col">
              <p className="text-xs leading-5">{g.label}</p>
              <p
                className={cn(
                  "text-sm font-medium whitespace-pre",
                  g.value.includes("\n") ? "leading-4" : "-mt-0.5 leading-5"
                )}
              >
                {g.value}
              </p>
            </div>
          ))}
        </div>
      </DashCard>

      {/* Sleep quality */}
      <DashCard className={cn(goalsCard, "left-[1190px]")}>
        <p className="h-5 text-sm leading-5">Daily Goals</p>
        <div className="flex h-[272px] w-40 flex-col items-center justify-center gap-[19px]">
          <div className="relative size-40">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${ASSETS}/home-01-sleep-gauge.svg`} alt="" className="absolute inset-0 size-40 max-w-none" />
            <p className="absolute top-[62px] left-[50px] text-[30px] leading-9 font-medium">84%</p>
          </div>
          <AppCardTitle className="text-2xl leading-5 whitespace-nowrap">Sleep quality</AppCardTitle>
        </div>
      </DashCard>

      {/* Blood report */}
      <DashCard className="top-[398px] left-[47px] h-[473px] w-[381px]">
        <DashCardHeader title="Blood report" description="Apollo Diagnostics · 12 Nov" link />
        <div className="flex flex-col gap-6">
          <BigStat value="58" caption="of 61 in range" width={99} />
          <RangeBars filled={16} />
        </div>
        <MetricRow title="Vitamin D" description="Below range, 30 to 100" value={<Unit value="18" unit="ng/mL" />} />
        <MetricRow title="hs-CRP" description="Above range, under 3" value={<Unit value="3.4" unit="mg/L" />} />
        <MetricRow title="HbA1c" description="Above range, under 5.7" value="5.9%" />
      </DashCard>

      {/* Muscle age */}
      <DashCard className="top-[398px] left-[1493px] h-[473px] w-[381px]">
        <DashCardHeader title="Muscle age" description="Calculated from 7 of 7 body systems." link />
        <div className="flex flex-col gap-6">
          <BigStat value="40" caption="9 years older" width={119} />
          <div className="relative h-[34px] w-[321px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${ASSETS}/home-01-muscle-bar.svg`}
              alt=""
              className="absolute top-[-2.04px] left-[-3.53px] h-[42.58px] w-[331.08px] max-w-none"
            />
          </div>
        </div>
        <MetricRow title="RFF" description="Renal Filtration Factor" value={<b>2.96</b>} />
        <MetricRow title="CF" description="Cardiometabolic Function" value={<b>2.72</b>} />
        <MetricRow title="MHF" description="Musculoskeletal Health Factotor" value={<b>5.78</b>} />
      </DashCard>

      <DesktopNav defaultTab="today" />
    </DesktopScreen>
  )
}
