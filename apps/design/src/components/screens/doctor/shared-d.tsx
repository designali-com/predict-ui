"use client"

import * as React from "react"
import { CircleDashedIcon, ClockIcon, GripIcon, UsersIcon } from "lucide-react"
import { cn } from "cn"

import {
  AppButton as Button,
  AppGlassBar,
  AppGlassCircle,
} from "@workspace/ui/predict/app/app-glass"
import { PredictMark } from "@workspace/ui/predict/logo"

/*
 * Shared pieces of the doctor-app home screens (Figma "iPhone 18 Pro - 185/187/188"):
 * greeting, week dial, avatars and the bottom nav. Positions follow the 402 × 874 frame.
 */

/* -------------------------------------------------------------------------- */
/* Avatars                                                                    */
/* -------------------------------------------------------------------------- */

export interface Photo {
  src: string
  /** Crop of the 65 × 64 photo layer inside the 60px circle (Figma fill transform). */
  crop?: React.CSSProperties
}

export const doctorPhoto: Photo = {
  src: "/screens/shared/avatar.png",
  crop: { height: "242.19%", width: "133.91%", left: "-23.11%", top: "-29.69%" },
}

/** 60px round photo on a lavender, outlined disc ("Ellipse 56" + "image 2712"). */
export function DoctorAvatar({
  photo,
  alt,
  className,
  style,
}: {
  photo: Photo
  alt: string
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <div
      className={cn(
        "relative size-[60px] shrink-0 overflow-hidden rounded-full border border-foreground bg-secondary",
        className
      )}
      style={style}
    >
      <div className="absolute top-[-2px] left-[-2px] h-[64px] w-[65px] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo.src}
          alt={alt}
          className={cn("absolute max-w-none", !photo.crop && "inset-0 size-full object-cover")}
          style={photo.crop}
        />
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Greeting                                                                   */
/* -------------------------------------------------------------------------- */

export function DoctorGreeting({ name = "Dr. Arjun" }: { name?: string }) {
  return (
    <>
      <p className="absolute top-[51px] left-[47px] text-base leading-normal whitespace-nowrap">
        Good Morning,
      </p>
      <h1 className="absolute top-[64px] left-[47px] font-display text-4xl leading-normal font-normal whitespace-nowrap">
        {name}
      </h1>
      <DoctorAvatar photo={doctorPhoto} alt={name} className="absolute top-[51px] left-[295px]" />
    </>
  )
}

/* -------------------------------------------------------------------------- */
/* Week dial                                                                  */
/* -------------------------------------------------------------------------- */

/** Weekday pills along the dial arc (centre x, top, rotated box, rotation) — as in Figma. */
const days = [
  { id: "sun", label: "S", x: -206.6, top: 102.51, box: 44.624, rotate: -54.58 },
  { id: "mon", label: "M", x: -147.95, top: 41.73, box: 44.322, rotate: -33.35 },
  { id: "tue", label: "T", x: -79.1, top: 7.22, box: 39.192, rotate: -15 },
  { id: "wed", label: "W", x: 4.04, top: 0.34, box: 32, rotate: 0 },
  { id: "thu", label: "T", x: 82.48, top: 8.4, box: 39.192, rotate: 15 },
  { id: "fri", label: "F", x: 153.93, top: 44.1, box: 43.713, rotate: 30 },
  { id: "sat", label: "S", x: 207.3, top: 102.91, box: 43.713, rotate: 60 },
]

/** Tick-mark ring (gradient through an SVG mask) with selectable day pills. */
export function WeekDial() {
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
        {days.map((d) => (
          <div
            key={d.id}
            className="absolute flex -translate-x-1/2 items-center justify-center"
            style={{ left: `calc(50% + ${d.x}px)`, top: d.top, width: d.box, height: d.box }}
          >
            <button
              type="button"
              aria-pressed={day === d.id}
              onClick={() => setDay(d.id)}
              style={{ rotate: `${d.rotate}deg` }}
              className={cn(
                "flex size-8 items-center justify-center rounded-full text-[10.5px] leading-[21px] text-foreground",
                day === d.id ? "bg-secondary" : "border border-border bg-card"
              )}
            >
              {d.label}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Bottom nav                                                                 */
/* -------------------------------------------------------------------------- */

type DoctorNavItem = "menu" | "today" | "second"

/**
 * Doctor-app bottom nav (y 794): menu · [Today | patients] · PREDICT assistant.
 * `second` picks the icon of the second tab ("patients" or "twin").
 */
export function DoctorNav({
  defaultActive = "today",
  second = "patients",
}: {
  defaultActive?: DoctorNavItem
  second?: "patients" | "twin"
}) {
  const [active, setActive] = React.useState<DoctorNavItem>(defaultActive)
  const SecondIcon = second === "patients" ? UsersIcon : CircleDashedIcon
  const secondLabel = second === "patients" ? "Patients" : "Twin"
  const today = active === "today"

  return (
    <nav className="absolute top-[794px] left-[calc(50%+0.5px)] z-10 flex w-[311px] -translate-x-1/2 items-center justify-between px-px">
      <AppGlassCircle
        aria-label="Menu"
        aria-pressed={active === "menu"}
        onClick={() => setActive("menu")}
      >
        <span
          className={cn(
            "flex items-center justify-center rounded-full",
            active === "menu"
              ? "size-12 bg-primary text-primary-foreground shadow-[inset_0_4px_6px_rgba(255,255,255,0.4),inset_0_-1px_8px_rgba(255,255,255,0.2)]"
              : "size-10"
          )}
        >
          <GripIcon className="size-6" strokeWidth={2} />
        </span>
      </AppGlassCircle>

      <AppGlassBar className="flex h-[60px] w-[181px] items-center justify-center gap-[5px] py-2.5 pr-3.5 pl-3">
        <Button
          variant={today ? "app" : "app-secondary"}
          aria-pressed={today}
          onClick={() => setActive("today")}
          className="h-12 gap-1 rounded-full px-[18px] text-base font-normal"
        >
          Today
          <ClockIcon
            className={cn("size-5 shrink-0", today ? "fill-primary-foreground stroke-primary" : "fill-foreground stroke-secondary")}
            strokeWidth={2}
          />
        </Button>
        <Button
          variant="ghost"
          aria-label={secondLabel}
          aria-pressed={active === "second"}
          onClick={() => setActive("second")}
          className="h-10 rounded-full px-4"
        >
          <SecondIcon className="size-5 shrink-0" strokeWidth={1} />
        </Button>
      </AppGlassBar>

      <AppGlassCircle aria-label="PREDICT assistant">
        <PredictMark className="h-[20.164px] w-[18px]" />
      </AppGlassCircle>
    </nav>
  )
}
