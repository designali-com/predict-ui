"use client"

import * as React from "react"
import {
  ArrowUpRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CircleDashedIcon,
  ClockIcon,
  GripIcon,
  UsersIcon,
} from "lucide-react"

import { cn } from "@workspace/ui/lib/utils"
import {
  AppButton as Button,
  AppGlassBar,
  AppGlassCircle,
} from "@workspace/ui/predict/app/app-glass"
import { AppCard, AppCardTitle } from "@workspace/ui/predict/app/app-card"
import { AppGlow } from "@workspace/ui/predict/app/app-glow"
import { PredictMark } from "@workspace/ui/predict/logo"

const ASSETS = "/screens/desktop/home"

/* ------------------------------------------------------------------ */
/* Header: PREDICT mark · greeting · avatar                           */
/* ------------------------------------------------------------------ */

export function HomeHeader({ name = "Arjun Vaidya" }: { name?: string }) {
  return (
    <>
      <AppGlassCircle
        tone="primary"
        aria-label="PREDICT"
        className="absolute top-[43px] left-[47px]"
      >
        <PredictMark className="h-[20.166px] w-[18px]" />
      </AppGlassCircle>

      <div className="absolute top-[43px] left-[1811px] size-[60px] overflow-hidden rounded-full border border-foreground bg-secondary">
        <div className="absolute top-[-2px] left-[-2px] h-[64px] w-[65px] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/screens/shared/avatar.png"
            alt={name}
            className="absolute top-[-29.69%] left-[-23.11%] h-[242.19%] w-[133.91%] max-w-none"
          />
        </div>
      </div>

      <p className="absolute top-[51px] left-[calc(50%-52px)] font-display text-base whitespace-nowrap">
        Good morning,
      </p>
      <h1 className="absolute top-[77px] left-[calc(50%-0.5px)] -translate-x-1/2 text-center font-display text-4xl font-normal whitespace-nowrap">
        {name}
      </h1>
    </>
  )
}

/* ------------------------------------------------------------------ */
/* Week strip: line + day pills + tick ruler                          */
/* ------------------------------------------------------------------ */

const datePill =
  "absolute top-[183px] flex h-8 -translate-x-1/2 items-center justify-center rounded-full bg-secondary text-[10.5px] leading-[21px] whitespace-nowrap text-secondary-foreground"

const days = [
  { label: "S", offset: -683 },
  { label: "M", offset: -481 },
  { label: "T", offset: -279 },
]

export function DateStrip() {
  return (
    <>
      <div aria-hidden className="absolute top-[199px] left-0 h-0.5 w-[959px] bg-primary" />
      <div
        aria-hidden
        className="absolute top-[224px] left-0 h-[50px] w-full bg-repeat-x"
        style={{ backgroundImage: `url(${ASSETS}/home-01-date-ruler.svg)`, backgroundSize: "959px 50px" }}
      />

      <button
        type="button"
        aria-label="Previous week"
        className={cn(datePill, "left-[calc(50%-885px)] size-8")}
      >
        <ChevronLeftIcon className="size-4" strokeWidth={1} />
      </button>
      {days.map((d) => (
        <button
          key={d.offset}
          type="button"
          className={cn(datePill, "size-8")}
          style={{ left: `calc(50% + ${d.offset}px)` }}
        >
          {d.label}
        </button>
      ))}
      <div className={cn(datePill, "left-[calc(50%+1px)] px-5")}>Sunday, 27 December 2026</div>
    </>
  )
}

/* ------------------------------------------------------------------ */
/* Bottom navigation: menu · [Today | Twin | People] · assistant       */
/* ------------------------------------------------------------------ */

export type HomeTab = "today" | "twin" | "people"

const tabs: { id: HomeTab; label: string; icon: typeof ClockIcon }[] = [
  { id: "today", label: "Today", icon: ClockIcon },
  { id: "twin", label: "Twin", icon: CircleDashedIcon },
  { id: "people", label: "People", icon: UsersIcon },
]

export function DesktopNav({ defaultTab = "today" }: { defaultTab?: HomeTab }) {
  const [active, setActive] = React.useState<HomeTab>(defaultTab)

  return (
    <nav className="absolute top-[979px] left-[calc(50%-0.5px)] z-10 flex -translate-x-1/2 items-center gap-1 px-px">
      <AppGlassCircle aria-label="Menu">
        <GripIcon className="size-6" strokeWidth={2} />
      </AppGlassCircle>

      <AppGlassBar className="flex h-[60px] w-[237px] items-center justify-center gap-[5px] rounded-[30px] py-2.5 pr-3.5 pl-3">
        {tabs.map(({ id, label, icon: Icon }) => {
          const on = active === id
          return (
            <Button
              key={id}
              variant={on ? "app" : "ghost"}
              aria-label={label}
              aria-pressed={on}
              onClick={() => setActive(id)}
              className={cn(
                "shrink-0 rounded-full text-base leading-6 font-normal",
                on ? "h-12 min-w-[110px] gap-1 px-[18px]" : "h-10 px-4"
              )}
            >
              {on && label}
              <Icon
                className={cn(
                  "size-5 shrink-0",
                  on && id === "today" && "fill-primary-foreground stroke-primary"
                )}
                strokeWidth={on ? 2 : 1}
              />
            </Button>
          )
        })}
      </AppGlassBar>

      <AppGlassCircle aria-label="PREDICT assistant">
        <PredictMark className="h-[20.166px] w-[18px]" />
      </AppGlassCircle>
    </nav>
  )
}

/** Violet fade along the bottom edge (multiplied over the content). */
export function BottomGlow() {
  return <AppGlow variant="fade" className="h-[289px] mix-blend-multiply" />
}

/* ------------------------------------------------------------------ */
/* Cards                                                              */
/* ------------------------------------------------------------------ */

/** Desktop dashboard card: the frosted AppCard, absolutely placed. */
export function DashCard({ className, ...props }: React.ComponentProps<"div">) {
  return <AppCard className={cn("absolute items-center", className)} {...props} />
}

export function DashCardHeader({
  title,
  description,
  link = false,
}: {
  title: string
  description?: string
  link?: boolean
}) {
  return (
    <div className="flex w-full items-start justify-between">
      <div className="flex flex-col gap-3">
        <AppCardTitle className="h-5 whitespace-nowrap">{title}</AppCardTitle>
        {description && <p className="h-2.5 text-[10px] leading-2 whitespace-nowrap">{description}</p>}
      </div>
      {link && <ArrowUpRightIcon className="size-6 shrink-0" strokeWidth={1} />}
    </div>
  )
}

/** Marker row: name + description on the left, chevron + value on the right. */
export function MetricRow({
  title,
  description,
  value,
}: {
  title: string
  description: string
  value: React.ReactNode
}) {
  return (
    <div className="flex w-full items-start justify-between">
      <div className="flex flex-col gap-3">
        <AppCardTitle className="h-5 whitespace-nowrap">{title}</AppCardTitle>
        <p className="h-2.5 text-[10px] leading-2 whitespace-nowrap">{description}</p>
      </div>
      <div className="flex h-[42px] w-[100px] flex-col items-end justify-between">
        <ChevronRightIcon className="size-6" strokeWidth={1} />
        <p className="text-right text-[10px] leading-2 whitespace-nowrap">{value}</p>
      </div>
    </div>
  )
}

