"use client"

import * as React from "react"
import { ArrowUpRightIcon, ChevronRightIcon } from "lucide-react"
import { cn } from "cn"

import {
  AppGlassCircle,
  AppTabs,
  AppTabsList,
  AppTabsTrigger,
} from "@workspace/ui/predict/app/app-glass"
import { AppCard } from "@workspace/ui/predict/app/app-card"

/** Shared pieces of the Home frames 166–171 (home-02 … home-07). */

/** Violet inner glow used by the large Home cards in Figma. */
export const homeCardShadow =
  "shadow-[inset_0_0_30px_0_color-mix(in_oklab,var(--glow)_20%,transparent)]"

/** "Good Morning, Rohan" + avatar. */
export function HomeHeader({ name = "Rohan" }: { name?: string }) {
  return (
    <header className="relative z-10 flex items-start justify-between px-[47px] pt-[51px]">
      <div className="font-display text-foreground">
        <p className="text-base leading-[19px]">Good Morning,</p>
        <h1 className="mt-[-6px] text-4xl leading-[43px] font-normal">{name}</h1>
      </div>
      <div className="relative size-[60px] shrink-0 overflow-hidden rounded-full bg-secondary">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/screens/shared/avatar.png"
          alt={name}
          className="absolute top-[-21px] left-[-17.02px] h-[155px] w-[87.04px] max-w-none"
        />
      </div>
    </header>
  )
}

/** The rendered body figure: a soft blurred copy under the sharp render. */
export function HomeFigure({ top, blurTop = top }: { top: number; blurTop?: number }) {
  return (
    <>
      {[
        { layer: "opacity-50 blur-[25px]", y: blurTop },
        { layer: "", y: top },
      ].map(({ layer, y }, i) => (
        <div
          key={i}
          aria-hidden
          className={cn(
            "pointer-events-none absolute left-[-38px] h-[684px] w-[479px] overflow-hidden",
            layer
          )}
          style={{ top: y }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/screens/home/home-01-figure.png"
            alt=""
            className="absolute top-[-0.07%] left-[-35.07%] h-[178.51%] w-[169.94%] max-w-none"
          />
        </div>
      ))}
    </>
  )
}

/** Weekday pills along the dial arc, positioned as in Figma (centre x, top, rotation). */
const days = [
  { id: "sun-prev", label: "S", x: -206.6, top: 102.51, box: 44.624, rotate: -54.58 },
  { id: "mon", label: "M", x: -147.95, top: 41.73, box: 44.322, rotate: -33.35 },
  { id: "tue", label: "T", x: -79.1, top: 7.22, box: 39.192, rotate: -15 },
  { id: "wed", label: "W", x: 4.04, top: 0.34, box: 32, rotate: 0 },
  { id: "thu", label: "T", x: 82.48, top: 8.4, box: 39.192, rotate: 15 },
  { id: "fri", label: "F", x: 153.93, top: 44.1, box: 43.713, rotate: 30 },
  { id: "sat", label: "S", x: 207.3, top: 102.91, box: 43.713, rotate: 60 },
]

/**
 * Week dial: tick-mark ring (gradient through an SVG mask) + day pills.
 * `featured` enlarges the selected day into a 60px violet button (frame 166).
 */
export function WeekDial({ featured = false }: { featured?: boolean }) {
  const [day, setDay] = React.useState("wed")

  return (
    <div className="absolute top-[137px] left-[-50px] h-[518.75px] w-[503px]">
      <div
        aria-hidden
        className="absolute top-[-8.4px] left-[1.05px] h-[376.99px] w-[501.95px] bg-gradient-to-b from-primary to-primary/0"
        style={{
          maskImage: "url(/screens/home/home-01-dial-mask.svg)",
          maskPosition: "-2.05px 23.151px",
          maskSize: "505px 505px",
          maskRepeat: "no-repeat",
          maskMode: "alpha",
        }}
      />
      <div className="absolute top-0 left-[22.05px] h-[146.84px] w-[457.83px]">
        {days.map((d) => {
          const selected = day === d.id
          if (featured && selected) {
            return (
              <div
                key={d.id}
                className="absolute top-[-20px] left-[calc(50%+0.04px)] flex size-[60px] -translate-x-1/2 items-center justify-center rounded-full bg-secondary"
              >
                <AppGlassCircle
                  tone="primary"
                  aria-pressed
                  className="size-12 text-2xl leading-[21px]"
                >
                  {d.label}
                </AppGlassCircle>
              </div>
            )
          }
          return (
            <div
              key={d.id}
              className="absolute flex -translate-x-1/2 items-center justify-center"
              style={{ left: `calc(50% + ${d.x}px)`, top: d.top, width: d.box, height: d.box }}
            >
              <button
                type="button"
                aria-pressed={selected}
                onClick={() => setDay(d.id)}
                style={{ rotate: `${d.rotate}deg` }}
                className={cn(
                  "flex size-8 items-center justify-center rounded-full text-[10.5px] leading-[21px] text-foreground",
                  selected ? "bg-secondary" : "border border-border bg-card"
                )}
              >
                {d.label}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/** Large frosted Home card (Container · Card | PREDICT, 381px wide, 40px corners). */
export function HomeCard({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <AppCard
      className={cn(
        "absolute left-1/2 w-[381px] -translate-x-1/2 items-center gap-6 rounded-[40px] p-[30px]",
        homeCardShadow,
        className
      )}
      {...props}
    />
  )
}

/** Card title row: 21px title, 10px caption, and an ↗ link. */
export function HomeCardHeader({ title, caption }: { title: string; caption: string }) {
  return (
    <div className="flex w-full items-start justify-between">
      <div className="flex flex-col gap-3">
        <h2 className="text-[21px] leading-6 font-normal">{title}</h2>
        <p className="text-[10px] leading-2">{caption}</p>
      </div>
      <button type="button" aria-label={`Open ${title}`} className="text-foreground">
        <ArrowUpRightIcon className="size-6" strokeWidth={1} />
      </button>
    </div>
  )
}

/** A result row: name + caption on the left, chevron + value on the right. */
export function HomeResultRow({
  title,
  caption,
  value,
  valueClassName,
}: {
  title: string
  caption: string
  value: React.ReactNode
  valueClassName?: string
}) {
  return (
    <button type="button" className="flex w-full items-start justify-between text-left">
      <span className="flex flex-col gap-3">
        <span className="text-[21px] leading-6">{title}</span>
        <span className="text-[10px] leading-2 whitespace-nowrap">{caption}</span>
      </span>
      <span className="flex h-[42px] w-[100px] flex-col items-end justify-between">
        <ChevronRightIcon className="size-6" strokeWidth={1} />
        <span className={cn("text-right text-[10px] leading-2 whitespace-nowrap", valueClassName)}>
          {value}
        </span>
      </span>
    </button>
  )
}

/** "18 ng/mL"-style reading with an italic unit. */
export function Reading({ value, unit }: { value: string; unit?: string }) {
  return (
    <>
      {value}
      {unit ? (
        <>
          {" "}
          <i>{unit}</i>
        </>
      ) : null}
    </>
  )
}

/** The violet heart render used on the Twin screens. */
export function HeartIllustration() {
  return (
    <div className="flex h-[317px] w-full items-center justify-center rounded-[40px] border border-primary/20">
      <div className="relative isolate size-[222px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/screens/home/home-06-heart.png"
          alt="Heart and blood vessels"
          className="absolute inset-0 left-[0.44px] size-full object-cover"
        />
        <div aria-hidden className="absolute inset-0 bg-glow mix-blend-color" />
      </div>
    </div>
  )
}

const systemWidths: Record<string, number> = {
  heart: 87,
  immune: 82.83,
  bones: 74,
  brain: 82.83,
}

/** Body-system tabs (Tab List · Tabs | PREDICT), clipped at 311px like the frame. */
export function SystemTabs({
  order,
  className,
}: {
  order: Array<"heart" | "immune" | "bones" | "brain">
  className?: string
}) {
  return (
    <AppTabs defaultValue="heart" className={cn("absolute left-[46px] w-[311px]", className)}>
      <AppTabsList className="w-full justify-start gap-1 overflow-hidden">
        {order.map((id) => (
          <AppTabsTrigger
            key={id}
            value={id}
            className="h-[31px] flex-none capitalize"
            style={{ width: systemWidths[id] }}
          >
            {id}
          </AppTabsTrigger>
        ))}
      </AppTabsList>
    </AppTabs>
  )
}
