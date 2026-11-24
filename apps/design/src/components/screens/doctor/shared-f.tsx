"use client"

import * as React from "react"
import { ClockIcon, GripIcon, UsersIcon } from "lucide-react"
import { cn } from "cn"

import {
  AppButton as Button,
  AppGlassBar,
  AppGlassCircle,
} from "@workspace/ui/predict/app/app-glass"
import { AppCard } from "@workspace/ui/predict/app/app-card"
import { AppGlow } from "@workspace/ui/predict/app/app-glow"
import { PredictMark } from "@workspace/ui/predict/logo"

import { Screen } from "../screen"

export const DOCTOR_ASSETS = "/screens/doctor"

/* -------------------------------------------------------------------------- */
/* Avatar                                                                     */
/* -------------------------------------------------------------------------- */

/** Round doctor photo on a lavender, outlined disc ("Ellipse 56" + "image 2712"). */
export function DoctorAvatar({ size = 60, className }: { size?: number; className?: string }) {
  // The photo layer overhangs the circle by 1/30 of its size on each side (Figma).
  const bleed = size / 30
  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden rounded-full border border-foreground bg-secondary",
        className
      )}
      style={{ width: size, height: size }}
    >
      <div
        className="absolute overflow-hidden"
        style={{ top: -bleed, left: -bleed, width: size * (65 / 60), height: size * (64 / 60) }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/screens/shared/avatar.png"
          alt="Dr. Arjun Vaidya"
          className="absolute max-w-none"
          style={{ height: "242.19%", width: "133.91%", left: "-23.11%", top: "-29.69%" }}
        />
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Cards, rows, tags                                                          */
/* -------------------------------------------------------------------------- */

/** Frosted 40px card with the violet inner glow ("Card / …"). */
export function DoctorCard({ className, ...props }: React.ComponentProps<typeof AppCard>) {
  return (
    <AppCard
      className={cn(
        "gap-3 rounded-[40px] p-[26px] shadow-[inset_0_0_30px_rgba(66,0,128,0.2)] dark:shadow-[inset_0_0_30px_rgba(235,230,254,0.15)]",
        className
      )}
      {...props}
    />
  )
}

/** Card header: title on the left, optional action on the right. */
export function DoctorCardHeader({
  title,
  action,
  className,
}: {
  title: React.ReactNode
  action?: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("flex w-full items-center justify-between", className)}>
      <h2 className="text-base leading-5 font-normal whitespace-nowrap">{title}</h2>
      {action}
    </div>
  )
}

/** Small round icon button used in card headers (edit, add). */
export function HeaderIconButton({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className="flex size-[22px] shrink-0 items-center justify-center text-foreground"
    >
      {children}
    </button>
  )
}

/** Lavender pill tag ("done", "Medicine", "MD · 14 yrs"). */
export function Tag({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex h-6 shrink-0 items-center justify-center rounded-[40px] bg-secondary px-3 text-xs leading-4 whitespace-nowrap text-secondary-foreground",
        className
      )}
    >
      {children}
    </span>
  )
}

/** White disc holding a violet line icon. */
export function IconDisc({ size = 38, children }: { size?: number; children: React.ReactNode }) {
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-full bg-background text-primary"
      style={{ width: size, height: size }}
    >
      {children}
    </span>
  )
}

/** Violet icon rendered from a downloaded Figma SVG through a CSS mask (theme-aware). */
export function MaskIcon({ src, size = 19, className }: { src: string; size?: number; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("block shrink-0 bg-current", className)}
      style={{
        width: size,
        height: size,
        maskImage: `url(${src})`,
        maskSize: "100% 100%",
        maskRepeat: "no-repeat",
        WebkitMaskImage: `url(${src})`,
        WebkitMaskSize: "100% 100%",
        WebkitMaskRepeat: "no-repeat",
      }}
    />
  )
}

/** Lavender list row: icon · title/subtitle · trailing element. */
export function ListItem({
  icon,
  title,
  subtitle,
  trailing,
  className,
  titleClassName,
}: {
  icon: React.ReactNode
  title: string
  subtitle?: string
  trailing?: React.ReactNode
  className?: string
  titleClassName?: string
}) {
  return (
    <div
      className={cn(
        "flex h-14 w-full shrink-0 items-center justify-between gap-2 rounded-[24px] bg-secondary/55 px-3.5",
        className
      )}
    >
      <div className="flex min-w-0 items-center gap-3">
        {icon}
        <div className="flex min-w-0 flex-col whitespace-nowrap">
          <p className={cn("text-lg leading-[21px]", titleClassName)}>{title}</p>
          {subtitle && <p className="text-[11px] leading-[15px] text-foreground/60">{subtitle}</p>}
        </div>
      </div>
      {trailing}
    </div>
  )
}

/** Rounded progress track with a violet fill. */
export function ProgressTrack({
  value,
  className,
  label,
}: {
  /** 0–1 */
  value: number
  className?: string
  label?: string
}) {
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(value * 100)}
      className={cn("h-2 w-full overflow-hidden rounded-full bg-secondary", className)}
    >
      <div className="h-full rounded-full bg-primary" style={{ width: `${value * 100}%` }} />
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Shell                                                                      */
/* -------------------------------------------------------------------------- */

type DoctorTab = "today" | "patients"

/** Doctor app bottom nav: menu · [Today | Patients] · PREDICT assistant. */
export function DoctorAppNav({ initial = "patients" }: { initial?: DoctorTab }) {
  const [active, setActive] = React.useState<DoctorTab>(initial)
  const tabs: { id: DoctorTab; label: string; icon: React.ReactNode }[] = [
    {
      id: "today",
      label: "Today",
      icon: (
        <ClockIcon
          className={cn("size-5 shrink-0", active === "today" && "fill-primary-foreground stroke-primary")}
          strokeWidth={active === "today" ? 2 : 1.5}
        />
      ),
    },
    { id: "patients", label: "Patients", icon: <UsersIcon className="size-5 shrink-0" strokeWidth={1.5} /> },
  ]

  return (
    <nav className="absolute top-[794px] left-1/2 z-10 flex -translate-x-1/2 items-center gap-1 px-px">
      <AppGlassCircle aria-label="Menu">
        <GripIcon className="size-6" strokeWidth={2} />
      </AppGlassCircle>
      <AppGlassBar className="flex h-[60px] items-center justify-center gap-[5px] py-2.5 pr-3.5 pl-3">
        {tabs.map((t) => {
          const on = active === t.id
          return (
            <Button
              key={t.id}
              variant={on ? "app" : "ghost"}
              aria-label={t.label}
              aria-pressed={on}
              onClick={() => setActive(t.id)}
              className={cn(
                "rounded-full text-base font-normal transition-all duration-200",
                on ? "h-12 gap-1 px-[18px]" : "h-10 px-4"
              )}
            >
              {on && t.label}
              {t.icon}
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

/**
 * Doctor app frame: violet glow, "eyebrow / Title" greeting with the doctor
 * avatar, content area from y = 140, and the bottom nav.
 */
export function DoctorAppShell({
  eyebrow,
  title,
  tab = "patients",
  contentClassName,
  children,
}: {
  eyebrow: string
  title: string
  tab?: DoctorTab
  contentClassName?: string
  children: React.ReactNode
}) {
  return (
    <Screen>
      <AppGlow variant="blob" className="-bottom-[513px]" />

      <header className="relative flex items-start justify-between px-[47px] pt-[51px]">
        <div className="font-display">
          <p className="text-base leading-[13px]">{eyebrow}</p>
          <h1 className="text-4xl leading-[44px] font-normal whitespace-nowrap">{title}</h1>
        </div>
        <DoctorAvatar />
      </header>

      <div className={cn("relative mt-[29px] flex flex-col gap-4 px-[11px]", contentClassName)}>
        {children}
      </div>

      <DoctorAppNav initial={tab} />
    </Screen>
  )
}
