import { cn } from "@workspace/ui/lib/utils"
import { AppCardTitle } from "@workspace/ui/predict/app/app-card"

import { DesktopScreen } from "../desktop-screen"
import { BottomGlow, DashCard, DashCardHeader, DateStrip, HomeHeader, MetricRow } from "./shared"
import { BigStat, HomeNav, RangeBars, Unit } from "./shared-c"

// Kept local: a plain value imported from a "use client" module is a client
// reference in this server component, not the string.
const ASSETS = "/screens/desktop/home"

export const title = "Home with family"

const statPill =
  "absolute flex h-10 items-center justify-between rounded-full bg-secondary px-5 text-sm leading-5 whitespace-nowrap text-secondary-foreground"

const goals = [
  { label: "Walk", value: "40 min" },
  { label: "Snack", value: "Roasted\nchana" },
  { label: "Walk", value: "40 min" },
]

function DailyGoalsRing() {
  return (
    <div className="relative h-[204px] w-[158px] shrink-0">
      <div className="absolute top-[55.5px] left-1/2 size-24 -translate-x-1/2 rounded-full bg-secondary shadow-[inset_0_10px_20px_rgba(255,255,255,0.25)]" />
      <div className="absolute top-[24.5px] left-1/2 size-[158px] -translate-x-1/2 rounded-full border-10 border-dashed border-secondary" />
      <div className="absolute top-[42.5px] left-1/2 size-[122px] -translate-x-1/2 rounded-full border-[15px] border-secondary" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${ASSETS}/home-01-goals-arc.svg`}
        alt=""
        className="absolute top-[35px] left-[10.5px] h-[76px] w-[137px] max-w-none"
      />
      <p className="absolute top-[86.5px] left-1/2 -translate-x-1/2 text-4xl leading-5 text-primary">25</p>
      <p className="absolute top-[109.5px] left-1/2 -translate-x-1/2 text-xs leading-5 text-primary">/100</p>
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

/** 60px round photo, cropped like the Figma frame (64 × 65 image box at -2, -2). */
function RoundPhoto({ src, alt, crop, className }: { src: string; alt: string; crop: string; className?: string }) {
  return (
    <div className={cn("absolute top-0 size-[60px] overflow-hidden rounded-full border border-foreground bg-secondary", className)}>
      <div className="absolute top-[-2px] left-[-2px] h-[64px] w-[65px] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className={cn("absolute max-w-none", crop)} />
      </div>
    </div>
  )
}

/** "The Mehta family" + "All metrics" stack in the middle of the figure. */
function FamilyPanel() {
  return (
    <div className="absolute top-[565px] left-1/2 h-[405px] w-[382px] -translate-x-1/2 rounded-[48px] bg-secondary/20 backdrop-blur-md">
      {/* The Mehta family */}
      <div className="absolute top-2.5 left-2.5 h-[205px] w-[362px] rounded-[40px] bg-card">
        <p className="absolute top-5 left-[21px] text-xl whitespace-nowrap">The Mehta family</p>
        <p className="absolute top-[51px] left-[21px] w-[162px] text-sm">5 members · care access for 2</p>

        <div className="absolute top-[23px] left-[203px] h-[60px] w-[138px]">
          <RoundPhoto
            src="/screens/shared/avatar.png"
            alt="Arjun Vaidya"
            crop="top-[-29.69%] left-[-23.11%] h-[242.19%] w-[133.91%]"
            className="left-0"
          />
          <RoundPhoto
            src={`${ASSETS}/home-03-avatar-2.png`}
            alt="Priya Mehta"
            crop="top-[-2.49%] left-[-122.42%] h-[172.4%] w-[254.62%]"
            className="left-10"
          />
          <div className="absolute top-0 left-[78px] flex size-[60px] items-center justify-center rounded-full bg-secondary text-xl text-secondary-foreground">
            +2
          </div>
        </div>

        {/* Family score: segmented progress bar */}
        <div className="absolute top-[120px] left-[22px] h-[62px] w-[319px]">
          <p className="absolute top-2.5 left-0 text-sm whitespace-nowrap text-foreground/40">+8 this week</p>
          <p className="absolute top-px right-[18.85px] text-2xl whitespace-nowrap">72</p>
          <p className="absolute top-2 right-[0.83px] text-base whitespace-nowrap text-foreground/40">%</p>
          <div className="absolute top-[39.9px] left-[1.9px] h-[22.23px] w-[314.23px] rounded-full bg-secondary" />
          <div className="absolute top-[39.9px] left-[1.9px] h-[22.23px] w-[218.11px] rounded-l-full bg-primary" />
          {[78.03, 157.41, 236.8].map((x) => (
            <div key={x} className="absolute top-[39.9px] h-[22.23px] w-[3.18px] bg-card" style={{ left: x }} />
          ))}
        </div>
      </div>

      {/* All metrics */}
      <div className="absolute top-[224px] left-2.5 h-[170px] w-[362px] rounded-[40px] bg-card">
        <p className="absolute top-5 left-[21px] text-xl whitespace-nowrap">All metrics</p>
        <p className="absolute top-[51px] left-[21px] w-[182px] text-sm">Today’s data from your connected sources.</p>

        <div className="absolute top-[51px] left-2 h-[106px] w-[347px] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${ASSETS}/home-03-metrics-baseline.svg`}
            alt=""
            className="absolute top-[55px] left-[12.08px] h-[61.92px] w-[315.3px] max-w-none"
            style={{
              maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${ASSETS}/home-03-metrics-line.svg`}
            alt=""
            className="absolute top-[11.02px] left-[11.08px] h-[70.89px] w-[317.3px] max-w-none"
          />
          <button
            type="button"
            className="absolute top-14 left-[209px] flex w-[100px] -translate-y-1/2 items-center justify-center gap-1.5 rounded-full bg-secondary/50 py-1.5 text-xs leading-5 text-secondary-foreground shadow-[inset_0_-1px_8px_rgba(0,0,0,0.1)]"
          >
            <span className="size-1.5 rounded-full bg-primary" />
            Sleep score
          </button>
        </div>
      </div>
    </div>
  )
}

const notifications = [
  { title: "Your results are ready", body: "Open Predict to see them.", inset: "inset-x-6 top-[15px]" },
  { title: "Your results are ready", body: "Open Predict to see them.", inset: "inset-x-2 top-[25px]" },
  { title: "Upcoming appointment", body: "With Dr. Kavita Iyer today", inset: "inset-x-0 top-[35px]" },
]

/** Stacked notification toasts above the family panel. */
function NotificationStack() {
  return (
    <div className="absolute top-[455px] left-[calc(50%-0.5px)] h-[92px] w-[263px] -translate-x-1/2">
      {notifications.map((n, i) => (
        <div
          key={i}
          className={cn(
            "absolute flex items-start gap-[3px] rounded-3xl bg-secondary/20 px-4 py-3 backdrop-blur-md",
            n.inset
          )}
        >
          <div className="flex w-[187px] shrink-0 flex-col">
            <p className="text-sm font-medium">{n.title}</p>
            <p className="text-xs">{n.body}</p>
          </div>
          <p className="ml-auto text-[11px] whitespace-nowrap">6:15 pm</p>
        </div>
      ))}
    </div>
  )
}

// Figma: Slide 16:9 - 26 (1871:2432)
export default function HomeDesktop03() {
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
        <span>Muscle age</span>
        <span>34</span>
      </div>
      <div className={cn(statPill, "top-[796px] left-[740px] min-w-[134px] gap-3")}>
        <span>Twin age</span>
        <span>56</span>
      </div>

      {/* Daily goals */}
      <DashCard className={cn(goalsCard, "left-[467px]")}>
        <p className="h-5 text-sm leading-5">Daily goals</p>
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
        <p className="h-5 text-sm leading-5">Daily goals</p>
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
        <MetricRow title="Vitamin D" description="Below range · 30–100" value={<Unit value="18" unit="ng/mL" />} />
        <MetricRow title="hs-CRP" description="Above range · under 3" value={<Unit value="3.4" unit="mg/L" />} />
        <MetricRow title="HbA1c" description="Above range · under 5.7" value="5.9%" />
      </DashCard>

      {/* Muscle age */}
      <DashCard className="top-[398px] left-[1493px] h-[473px] w-[381px]">
        <DashCardHeader title="Muscle age" description="Based on all 7 body systems." link />
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
        <MetricRow title="MHF" description="Musculoskeletal Health Factor" value={<b>5.78</b>} />
      </DashCard>

      <NotificationStack />
      <FamilyPanel />

      <HomeNav defaultTab="today" tone="secondary" highlight="menu" />
    </DesktopScreen>
  )
}
