"use client"

import * as React from "react"
import { ArrowUpRightIcon, ClockIcon, GripIcon, SearchIcon, UsersIcon } from "lucide-react"
import { cn } from "cn"

import {
  AppButton as Button,
  AppGlassBar,
  AppGlassCircle,
} from "@workspace/ui/predict/app/app-glass"
import { AppCard, AppCardHeader, AppCardTitle } from "@workspace/ui/predict/app/app-card"
import { PredictMark } from "@workspace/ui/predict/logo"

import { DesktopScreen } from "../desktop-screen"
import { Avatar } from "./shared"

/*
 * Shared pieces for the doctor "workspace" desktop screens (Prescriptions,
 * Appointments, Lab inbox, Messages, Notifications): a page shell with a
 * subtitle + title header and a two-tab bottom nav, frosted panels, chips,
 * tags, search fields and round person avatars.
 */

const ASSETS = "/screens/desktop/doctor"

/* -------------------------------------------------------------------------- */
/* People                                                                     */
/* -------------------------------------------------------------------------- */

export interface Person {
  name: string
  /** Photo + crop of the photo layer (Figma fill transform); omit for initials. */
  src?: string
  crop?: React.CSSProperties
  initials?: string
}

export const people = {
  usha: {
    name: "Usha Sethi",
    src: "/screens/shared/avatar.png",
    crop: { height: "242.19%", width: "133.91%", left: "-23.11%", top: "-29.69%" },
  },
  suresh: {
    name: "Suresh Sharma",
    src: `${ASSETS}/doctor-01-patient-suresh.png`,
    crop: { height: "135.37%", width: "100%", left: 0, top: "-7.03%" },
  },
  anjali: { name: "Anjali Bansal", src: `${ASSETS}/doctor-01-patient-anjali.png` },
  vivaan: { name: "Vivaan Mehta", src: `${ASSETS}/doctor-01-patient-vivaan.png` },
} satisfies Record<string, Person>

/**
 * Round person avatar: photo on a lavender, outlined disc, or initials on
 * lavender. The photo layer overhangs the circle by 1/30 like in Figma.
 */
export function PersonAvatar({ person, className }: { person: Person; className?: string }) {
  if (!person.src) {
    return (
      <div
        className={cn(
          "flex size-12 shrink-0 items-center justify-center rounded-full bg-secondary text-sm text-primary",
          className
        )}
      >
        {person.initials}
      </div>
    )
  }
  return (
    <div
      className={cn(
        "relative size-12 shrink-0 overflow-hidden rounded-full border border-foreground bg-secondary",
        className
      )}
    >
      <div className="absolute top-[-3.33%] left-[-3.33%] h-[106.67%] w-[108.33%] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={person.src}
          alt={person.name}
          className={cn("absolute max-w-none", !person.crop && "inset-0 size-full object-cover")}
          style={person.crop}
        />
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Panels                                                                     */
/* -------------------------------------------------------------------------- */

/** Frosted 40px-radius card with the brand inner glow ("Card / …" in Figma). */
export function Panel({ className, ...props }: React.ComponentProps<typeof AppCard>) {
  return (
    <AppCard
      className={cn(
        "gap-0 rounded-[40px] p-[30px] shadow-[inset_0_0_30px_0_color-mix(in_oklab,var(--primary)_20%,transparent)] dark:shadow-[inset_0_0_30px_0_color-mix(in_oklab,var(--primary)_20%,transparent)]",
        className
      )}
      {...props}
    />
  )
}

/** Card header row: title on the left, optional action on the right. */
export function PanelHeader({
  title,
  action,
  className,
  titleClassName,
}: {
  title: React.ReactNode
  action?: React.ReactNode
  className?: string
  titleClassName?: string
}) {
  return (
    <AppCardHeader className={cn("w-full items-center", className)}>
      <AppCardTitle className={cn("text-base leading-5 font-normal tracking-normal", titleClassName)}>
        {title}
      </AppCardTitle>
      {action}
    </AppCardHeader>
  )
}

/** The ↗ "open" affordance in small cards. */
export function OpenArrow({ label }: { label: string }) {
  return (
    <button type="button" aria-label={`Open ${label}`} className="shrink-0">
      <ArrowUpRightIcon className="size-6" strokeWidth={1} />
    </button>
  )
}

/** 140px summary card: title + ↗, big number and an optional muted note. */
export function StatPanel({
  title,
  value,
  note,
  className,
}: {
  title: string
  value: string
  note?: string
  className?: string
}) {
  return (
    <Panel className={cn("h-[140px] shrink-0 gap-2.5", className)}>
      <PanelHeader title={title} action={<OpenArrow label={title} />} />
      <div className="flex items-baseline gap-3 whitespace-nowrap">
        <p className="text-5xl leading-[56px]">{value}</p>
        {note && <p className="text-[13px] text-foreground/60">{note}</p>}
      </div>
    </Panel>
  )
}

/* -------------------------------------------------------------------------- */
/* Small controls                                                             */
/* -------------------------------------------------------------------------- */

/** 36px filter chip; the selected one is filled with the brand colour. */
export function Chip({
  active,
  className,
  ...props
}: { active?: boolean } & React.ComponentProps<"button">) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={cn(
        "inline-flex h-9 shrink-0 items-center justify-center rounded-full px-4 text-[13px] leading-[18px] whitespace-nowrap transition-colors",
        active
          ? "bg-primary text-primary-foreground"
          : "bg-secondary text-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)]",
        className
      )}
      {...props}
    />
  )
}

/** 24px status tag. */
export function Tag({
  tone = "default",
  className,
  ...props
}: { tone?: "default" | "primary" | "danger" } & React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex h-6 shrink-0 items-center justify-center rounded-full px-2.5 text-xs whitespace-nowrap",
        tone === "default" && "bg-secondary text-foreground",
        tone === "primary" && "bg-primary text-primary-foreground",
        tone === "danger" && "bg-destructive/10 text-destructive",
        className
      )}
      {...props}
    />
  )
}

/** 44px pill action button ("Button | Primary" / "Button | Secondary"). */
export function ActionButton({
  primary,
  className,
  ...props
}: { primary?: boolean } & React.ComponentProps<typeof Button>) {
  return (
    <Button
      variant={primary ? "app" : "app-secondary"}
      className={cn(
        "h-11 px-[22px] text-sm font-medium",
        !primary && "text-primary",
        className
      )}
      {...props}
    />
  )
}

/** Pill field with a leading search icon. */
export function SearchField({
  placeholder,
  className,
}: {
  placeholder: string
  className?: string
}) {
  return (
    <label
      className={cn(
        "flex h-11 w-full items-center gap-2.5 rounded-full border border-foreground/8 bg-card/70 px-[18px]",
        className
      )}
    >
      <SearchIcon className="size-[18px] shrink-0 text-foreground/60" strokeWidth={1.5} />
      <input
        type="text"
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent text-sm leading-5 outline-none placeholder:text-foreground/60"
      />
    </label>
  )
}

/* -------------------------------------------------------------------------- */
/* Shell                                                                      */
/* -------------------------------------------------------------------------- */

type NavTab = "today" | "patients"

/** Bottom nav: menu · [Today | Patients] · PREDICT assistant. */
function WorkspaceNav({ initial }: { initial: NavTab }) {
  const [active, setActive] = React.useState<NavTab>(initial)
  const tabs: { id: NavTab; label: string; Icon: typeof ClockIcon }[] = [
    { id: "today", label: "Today", Icon: ClockIcon },
    { id: "patients", label: "Patients", Icon: UsersIcon },
  ]

  return (
    <nav className="absolute top-[979px] left-[calc(50%-0.5px)] z-10 flex -translate-x-1/2 items-center gap-1 px-px">
      <AppGlassCircle aria-label="Menu">
        <GripIcon className="size-6" strokeWidth={2} />
      </AppGlassCircle>
      <AppGlassBar className="flex h-[60px] items-center justify-center gap-[5px] py-2.5 pr-3.5 pl-3">
        {tabs.map(({ id, label, Icon }) => {
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
              <Icon
                className={cn("size-5 shrink-0", on && id === "today" && "fill-primary-foreground stroke-primary")}
                strokeWidth={on && id === "today" ? 2 : 1.25}
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

/** Page frame: brand wash, PREDICT button, centred subtitle + title, avatar, bottom nav. */
export function WorkspaceShell({
  subtitle,
  title,
  tab = "today",
  children,
}: {
  subtitle: string
  title: string
  tab?: NavTab
  children: React.ReactNode
}) {
  return (
    <DesktopScreen>
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
        {subtitle}
      </p>
      <h1 className="absolute top-[77px] left-1/2 -translate-x-1/2 font-display text-4xl leading-normal font-normal whitespace-nowrap">
        {title}
      </h1>

      <Avatar
        photo={{ src: people.usha.src, crop: people.usha.crop }}
        alt="Your profile"
        className="absolute top-[43px] left-[1811px]"
      />

      <WorkspaceNav initial={tab} />
    </DesktopScreen>
  )
}

/** The 1826 × 780 content row under the header. */
export function ContentRow({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("absolute top-[170px] left-[47px] flex h-[780px] w-[1826px] items-start gap-6", className)}
      {...props}
    />
  )
}
