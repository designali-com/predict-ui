import * as React from "react"
import { cn } from "cn"

import { AppGlow } from "@workspace/ui/predict/app/app-glow"

import { Screen } from "../screen"
import { DoctorAvatar, DoctorGreeting, DoctorNav, WeekDial, doctorPhoto } from "./shared-d"

export const title = "Home (family & metrics)"

const ASSETS = "/screens/doctor"

/** Stacked notification cards: offset (inset-x, top) back to front. */
const notifications = [
  { inset: 24, top: 15, title: "Your results are ready", body: "Open Predict to see them." },
  { inset: 8, top: 25, title: "Your results are ready", body: "Open Predict to see them." },
  { inset: 0, top: 35, title: "Upcoming appointment", body: "with Dr. Kavita Iyer at today..." },
]

/** SVG drawn through a mask so it takes a theme colour. */
function Masked({ src, className, style }: { src: string; className?: string; style?: React.CSSProperties }) {
  return (
    <div
      aria-hidden
      className={cn("absolute", className)}
      style={{
        maskImage: `url(${src})`,
        maskSize: "100% 100%",
        maskRepeat: "no-repeat",
        WebkitMaskImage: `url(${src})`,
        WebkitMaskSize: "100% 100%",
        WebkitMaskRepeat: "no-repeat",
        ...style,
      }}
    />
  )
}

/** Segmented progress bar ("Studio · Gauge UI"): 72% filled, dividers at each quarter. */
function Gauge() {
  return (
    <div className="absolute top-[120px] left-[22px] h-[62px] w-[319px]">
      <p className="absolute top-[10px] left-0 text-sm leading-normal whitespace-nowrap text-muted-foreground">
        +8 this week
      </p>
      <p className="absolute top-px right-[19px] text-2xl leading-normal whitespace-nowrap">72</p>
      <p className="absolute top-2 right-px text-base leading-normal whitespace-nowrap text-muted-foreground">
        %
      </p>
      <div
        role="meter"
        aria-label="Family progress"
        aria-valuenow={72}
        aria-valuemin={0}
        aria-valuemax={100}
        className="absolute top-10 left-0.5 h-[22px] w-[314px] overflow-hidden rounded-full bg-secondary"
      >
        <div className="absolute inset-y-0 left-0 w-[218px] bg-primary" />
        {[79.6, 159, 238.4].map((x) => (
          <div key={x} className="absolute inset-y-0 w-[3px] bg-card" style={{ left: x - 2 }} />
        ))}
      </div>
    </div>
  )
}

/** Sleep-score sparkline on a dashed grid that fades at both ends. */
function MetricsChart() {
  const fade = "linear-gradient(to right, transparent, black 10%, black 90%, transparent)"
  return (
    <div className="absolute top-[51px] left-2 h-[106px] w-[347px] overflow-hidden">
      <div
        className="absolute top-[55.5px] left-[12.08px] h-[61.92px] w-[315.3px]"
        style={{ maskImage: fade, WebkitMaskImage: fade }}
      >
        <Masked src={`${ASSETS}/home-03-chart-grid.svg`} className="inset-0 bg-border" />
      </div>
      <Masked
        src={`${ASSETS}/home-03-chart-line.svg`}
        className="top-[11px] left-[11.08px] h-[70.89px] w-[317.3px] bg-primary"
      />
      <div className="absolute top-[59px] left-[209px] flex h-8 w-[100px] -translate-y-1/2 items-center justify-center gap-1.5 rounded-full bg-secondary/50 text-xs leading-5 text-secondary-foreground shadow-[inset_0_-1px_8px_rgba(0,0,0,0.1)] backdrop-blur-sm">
        <span className="size-1.5 rounded-full bg-primary" />
        Sleep Score
      </div>
    </div>
  )
}

// Figma: iPhone 18 Pro - 187 (1998:6443)
export default function DoctorHome03() {
  return (
    <Screen>
      <WeekDial />
      <DoctorGreeting />
      <AppGlow variant="blob" className="-bottom-[513px]" />

      {/* Notification stack */}
      <div className="absolute top-[282px] left-[calc(50%+0.5px)] h-[92px] w-[263px] -translate-x-1/2">
        {notifications.map((n, i) => (
          <div
            key={i}
            className="absolute flex items-start gap-[3px] rounded-[24px] bg-secondary/20 px-4 py-3 shadow-[inset_0_-1px_8px_rgba(0,0,0,0.1)] backdrop-blur-md dark:shadow-[inset_0_-1px_8px_rgba(255,255,255,0.2)]"
            style={{ left: n.inset, right: n.inset, top: n.top }}
            aria-hidden={i < notifications.length - 1 || undefined}
          >
            <div className="w-[187px] leading-normal">
              <p className="text-sm font-medium">{n.title}</p>
              <p className="text-xs">{n.body}</p>
            </div>
            <p className="ml-auto text-[11px] leading-normal whitespace-nowrap">6:15 pm</p>
          </div>
        ))}
      </div>

      {/* Cards panel */}
      <div className="absolute top-[384px] left-2.5 h-[405px] w-[382px] rounded-[48px] bg-secondary/20 backdrop-blur-md">
        <section className="absolute top-2.5 left-2.5 h-[205px] w-[362px] rounded-[40px] bg-card">
          <h2 className="absolute top-5 left-[21px] text-xl leading-normal font-normal whitespace-nowrap">
            The Mehtas Family
          </h2>
          <p className="absolute top-[51px] left-[21px] w-[162px] text-sm leading-normal">
            5 people · you hold care access for two
          </p>
          <div className="absolute top-[23px] left-[203px] h-[60px] w-[138px]">
            <DoctorAvatar photo={doctorPhoto} alt="Family member" className="absolute top-0 left-0" />
            <DoctorAvatar
              photo={{
                src: `${ASSETS}/home-03-member.png`,
                crop: { height: "172.4%", width: "254.62%", left: "-122.42%", top: "-2.49%" },
              }}
              alt="Family member"
              className="absolute top-0 left-10"
            />
            <div className="absolute top-0 left-[78px] flex size-[60px] items-center justify-center rounded-full bg-secondary text-xl leading-normal text-secondary-foreground">
              +2
            </div>
          </div>
          <Gauge />
        </section>

        <section className="absolute top-[224px] left-2.5 h-[170px] w-[362px] overflow-hidden rounded-[40px] bg-card">
          <h2 className="absolute top-5 left-[21px] text-xl leading-normal font-normal whitespace-nowrap">
            All metrics
          </h2>
          <p className="absolute top-[51px] left-[21px] w-[182px] text-sm leading-normal">
            Everything your connected sources have written today.
          </p>
          <MetricsChart />
        </section>
      </div>

      <DoctorNav defaultActive="menu" second="twin" />
    </Screen>
  )
}
