"use client"

import * as React from "react"
import {
  ChevronRightIcon,
  CircleDashedIcon,
  ClockIcon,
  GripIcon,
  UsersIcon,
  type LucideIcon,
} from "lucide-react"
import { cn } from "cn"

import {
  AppButton as Button,
  AppGlassBar,
  AppGlassCircle,
} from "@workspace/ui/predict/app/app-glass"
import { AppCard } from "@workspace/ui/predict/app/app-card"
import { PredictMark } from "@workspace/ui/predict/logo"

import { DesktopScreen } from "../desktop-screen"
import { Avatar } from "./shared"

/** Same crop of the shared portrait that the doctor screens use for the signed-in doctor. */
export const portrait = {
  src: "/screens/shared/avatar.png",
  crop: { height: "242.19%", width: "133.91%", left: "-23.11%", top: "-29.69%" },
}

/* -------------------------------------------------------------------------- */
/* Shell                                                                      */
/* -------------------------------------------------------------------------- */

export type NavTab = "today" | "twin" | "patients"

const tabMeta: Record<NavTab, { label: string; icon: LucideIcon }> = {
  today: { label: "Today", icon: ClockIcon },
  twin: { label: "Twin", icon: CircleDashedIcon },
  patients: { label: "Patients", icon: UsersIcon },
}

/** Bottom nav: menu · [tabs] · PREDICT assistant. The tab set varies per Figma frame. */
function ShellNav({ tabs, initial }: { tabs: NavTab[]; initial: NavTab }) {
  const [active, setActive] = React.useState<NavTab>(initial)
  return (
    <nav className="absolute top-[979px] left-1/2 z-10 flex -translate-x-1/2 items-center gap-1 px-px">
      <AppGlassCircle aria-label="Menu">
        <GripIcon className="size-6" strokeWidth={2} />
      </AppGlassCircle>
      <AppGlassBar className="flex h-[60px] items-center justify-center gap-[5px] py-2.5 pr-3.5 pl-3">
        {tabs.map((id) => {
          const { label, icon: Icon } = tabMeta[id]
          const on = active === id
          return (
            <Button
              key={id}
              variant={on ? "app" : "ghost"}
              aria-label={label}
              aria-pressed={on}
              onClick={() => setActive(id)}
              className={cn(
                "rounded-full text-base font-normal transition-all duration-200",
                on ? "h-12 gap-1 px-[18px]" : "h-10 px-4"
              )}
            >
              {on && label}
              <Icon className="size-5 shrink-0" strokeWidth={on ? 2 : 1} />
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
 * Doctor-side desktop frame with a configurable header and nav: PREDICT button,
 * small eyebrow + large heading, avatar, brand wash and the bottom nav.
 */
export function PatientShell({
  eyebrow,
  heading,
  tabs = ["today", "patients"],
  active = "patients",
  children,
}: {
  eyebrow: string
  heading: string
  tabs?: NavTab[]
  active?: NavTab
  children: React.ReactNode
}) {
  return (
    <DesktopScreen>
      {/* Brand wash along the bottom edge */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 h-[289px] w-[1920px] bg-gradient-to-t from-primary to-transparent mix-blend-multiply blur-[0.5px] dark:mix-blend-normal"
      />

      {children}

      <AppGlassCircle
        tone="primary"
        aria-label="PREDICT"
        className="absolute top-[43px] left-[47px]"
      >
        <PredictMark className="h-[20.166px] w-[18px]" />
      </AppGlassCircle>

      <p className="absolute top-[51px] left-1/2 -translate-x-1/2 font-display text-base whitespace-nowrap">
        {eyebrow}
      </p>
      <h1 className="absolute top-[77px] left-1/2 -translate-x-1/2 font-display text-4xl leading-normal font-normal whitespace-nowrap">
        {heading}
      </h1>

      <Avatar photo={portrait} alt="Your profile" className="absolute top-[43px] left-[1811px]" />

      <ShellNav tabs={tabs} initial={active} />
    </DesktopScreen>
  )
}

/* -------------------------------------------------------------------------- */
/* Cards                                                                      */
/* -------------------------------------------------------------------------- */

/** "Card | PREDICT": frosted lavender panel, 40px corners, soft violet inner glow. */
export function Panel({ className, ...props }: React.ComponentProps<typeof AppCard>) {
  return (
    <AppCard
      className={cn(
        "rounded-[40px] p-[30px] shadow-[inset_0_0_30px_0_color-mix(in_oklch,var(--primary)_20%,transparent)] dark:shadow-[inset_0_0_30px_0_color-mix(in_oklch,var(--primary)_20%,transparent)]",
        className
      )}
      {...props}
    />
  )
}

/** Panel header: 16px title with an optional trailing action icon. */
export function PanelHeader({
  title,
  action,
  actionLabel,
}: {
  title: string
  action?: LucideIcon
  actionLabel?: string
}) {
  const Icon = action
  return (
    <div className="flex w-full shrink-0 items-center justify-between">
      <h3 className="text-base leading-5 whitespace-nowrap">{title}</h3>
      {Icon && (
        <button type="button" aria-label={actionLabel ?? title} className="shrink-0">
          <Icon className="size-6" strokeWidth={1.25} />
        </button>
      )}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Small parts                                                                */
/* -------------------------------------------------------------------------- */

/** Lavender pill tag ("active", "daily", "done"). */
export function Tag({ children, className }: { children: React.ReactNode; className?: string }) {
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

/** Muted label on the left, value on the right. */
export function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex w-full items-center justify-between leading-5 whitespace-nowrap">
      <p className="text-[13px] text-foreground/60">{label}</p>
      <p className="text-sm">{value}</p>
    </div>
  )
}

/** Rounded progress track; `value` is 0–1. */
export function Track({
  value,
  className,
  label,
}: {
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
      className={cn("h-2.5 w-full shrink-0 overflow-hidden rounded-full bg-secondary", className)}
    >
      <div className="h-full rounded-full bg-primary" style={{ width: `${value * 100}%` }} />
    </div>
  )
}

/** Day / filter chip; `on` paints it primary. */
export function Chip({
  on,
  children,
  ...props
}: { on?: boolean } & React.ComponentProps<"button">) {
  return (
    <button
      type="button"
      aria-pressed={on}
      className={cn(
        "flex h-9 shrink-0 items-center justify-center rounded-full px-4 text-[13px] leading-[18px] whitespace-nowrap transition-colors",
        on ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
      )}
      {...props}
    />
  )
}

/** Round white disc holding a primary line icon. */
export function IconDisc({
  icon: Icon,
  size = 48,
  iconSize = 22,
}: {
  icon: LucideIcon
  size?: number
  iconSize?: number
}) {
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-full bg-card text-primary"
      style={{ width: size, height: size }}
    >
      <Icon style={{ width: iconSize, height: iconSize }} strokeWidth={1.5} />
    </span>
  )
}

/** Lavender list tile: icon disc + title/subtitle on the left, trailing content on the right. */
export function ListTile({
  icon,
  iconDisc = 48,
  iconSize = 22,
  title,
  titleExtra,
  subtitle,
  trailing = <ChevronRightIcon className="size-[22px]" strokeWidth={1.25} />,
  className,
  titleClassName,
  subtitleClassName,
}: {
  icon: LucideIcon
  iconDisc?: number
  iconSize?: number
  title: string
  titleExtra?: React.ReactNode
  subtitle?: string
  trailing?: React.ReactNode
  className?: string
  titleClassName?: string
  subtitleClassName?: string
}) {
  return (
    <div
      className={cn(
        "flex h-24 w-full shrink-0 items-center justify-between rounded-[28px] bg-secondary/55 px-5",
        className
      )}
    >
      <div className="flex items-center gap-4">
        <IconDisc icon={icon} size={iconDisc} iconSize={iconSize} />
        <div className="flex flex-col gap-0.5 whitespace-nowrap">
          <div className="flex items-center gap-2.5">
            <p className={cn("font-display text-[21px] leading-[26px]", titleClassName)}>{title}</p>
            {titleExtra}
          </div>
          {subtitle && (
            <p className={cn("text-[13px] leading-5 text-foreground/60", subtitleClassName)}>{subtitle}</p>
          )}
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-3.5">{trailing}</div>
    </div>
  )
}
