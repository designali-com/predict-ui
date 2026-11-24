"use client"

import * as React from "react"
import {
  CameraIcon,
  CircleDashedIcon,
  ClockIcon,
  GripIcon,
  MessageCircleMoreIcon,
  MicIcon,
  UsersIcon,
} from "lucide-react"

import { cn } from "@workspace/ui/lib/utils"
import {
  AppButton as Button,
  AppGlassBar,
  AppGlassCircle,
  AppTabs,
  AppTabsList,
  AppTabsTrigger,
} from "@workspace/ui/predict/app/app-glass"
import { AppCardTitle } from "@workspace/ui/predict/app/app-card"
import { PredictMark } from "@workspace/ui/predict/logo"

import { DashCard } from "./shared"

/* ------------------------------------------------------------------ */
/* Bottom navigation with an active menu / assistant circle            */
/* ------------------------------------------------------------------ */

export type NavTab = "today" | "twin" | "people"

const navTabs: { id: NavTab; label: string; icon: typeof ClockIcon }[] = [
  { id: "today", label: "Today", icon: ClockIcon },
  { id: "twin", label: "Twin", icon: CircleDashedIcon },
  { id: "people", label: "Family", icon: UsersIcon },
]

function NavCircle({
  label,
  active,
  children,
}: {
  label: string
  active?: boolean
  children: React.ReactNode
}) {
  return (
    <AppGlassCircle aria-label={label} aria-pressed={active}>
      <span
        className={cn(
          "flex items-center justify-center rounded-full",
          active ? "size-12 bg-primary text-primary-foreground shadow-button" : "size-10"
        )}
      >
        {children}
      </span>
    </AppGlassCircle>
  )
}

/**
 * Desktop bottom nav: menu · [Today | Twin | Family] · assistant.
 * `tone` sets the active tab pill (lavender or brand); `highlight` fills the
 * menu or assistant circle.
 */
export function HomeNav({
  defaultTab = "today",
  tone = "secondary",
  highlight,
  className,
}: {
  defaultTab?: NavTab
  tone?: "primary" | "secondary"
  highlight?: "menu" | "assistant"
  className?: string
}) {
  const [active, setActive] = React.useState<NavTab>(defaultTab)

  return (
    <nav
      className={cn(
        "absolute top-[979px] left-[calc(50%-0.5px)] z-10 flex -translate-x-1/2 items-center gap-1 px-px",
        className
      )}
    >
      <NavCircle label="Menu" active={highlight === "menu"}>
        <GripIcon className="size-6" strokeWidth={2} />
      </NavCircle>

      <AppGlassBar className="flex h-[60px] w-[237px] items-center justify-center gap-[5px] rounded-[30px] py-2.5 pr-3.5 pl-3">
        {navTabs.map(({ id, label, icon: Icon }) => {
          const on = active === id
          return (
            <Button
              key={id}
              variant={on ? (tone === "primary" ? "app" : "app-secondary") : "ghost"}
              aria-label={label}
              aria-pressed={on}
              onClick={() => setActive(id)}
              className={cn(
                "shrink-0 rounded-full text-base leading-6 font-normal",
                on ? "h-12 gap-1 px-[18px]" : "h-10 px-4",
                on && tone === "primary" && "min-w-[110px]"
              )}
            >
              {on && label}
              <Icon className="size-5 shrink-0" strokeWidth={on ? 1.5 : 1} />
            </Button>
          )
        })}
      </AppGlassBar>

      <NavCircle label="PREDICT assistant" active={highlight === "assistant"}>
        <PredictMark className="h-[20.166px] w-[18px]" />
      </NavCircle>
    </nav>
  )
}

/* ------------------------------------------------------------------ */
/* Segmented pill tabs under the greeting (Tab List | PREDICT)        */
/* ------------------------------------------------------------------ */

export function PillTabs({
  items,
  defaultValue,
  label,
}: {
  items: { value: string; label: string; icon?: React.ReactNode }[]
  defaultValue: string
  label: string
}) {
  return (
    <AppTabs defaultValue={defaultValue} className="absolute top-[179px] left-1/2 -translate-x-1/2">
      <AppTabsList aria-label={label} className="h-10 gap-1">
        {items.map((item) => (
          <AppTabsTrigger
            key={item.value}
            value={item.value}
            className="h-[31px] flex-none gap-1.5 px-4 text-sm leading-6 text-foreground [&_svg:not([class*='size-'])]:size-[17px]"
          >
            {item.label}
            {item.icon}
          </AppTabsTrigger>
        ))}
      </AppTabsList>
    </AppTabs>
  )
}

/* ------------------------------------------------------------------ */
/* Cards                                                              */
/* ------------------------------------------------------------------ */

/** Large dashboard card (40px corners, 30px padding, 24px gap). */
export function PanelCard({ className, ...props }: React.ComponentProps<"div">) {
  return <DashCard className={cn("gap-6 rounded-[40px] p-[30px]", className)} {...props} />
}

/** Card title at 21px, as used by the list rows and headers. */
export function RowTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return <AppCardTitle className={cn("text-[21px] leading-6 font-normal whitespace-nowrap", className)} {...props} />
}

/** 20 vertical bars, the first `filled` in brand colour. */
export function RangeBars({ filled, total = 20 }: { filled: number; total?: number }) {
  return (
    <div className="flex h-9 w-[320.5px] gap-[9.5px]" aria-hidden>
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={cn("h-9 w-[7px] shrink-0 rounded-[20px]", i < filled ? "bg-primary" : "bg-secondary/50")}
        />
      ))}
    </div>
  )
}

export function BigStat({
  value,
  caption,
  width,
  size = 96,
}: {
  value: string
  caption: string
  width: number
  size?: number
}) {
  return (
    <div className="flex items-end gap-2">
      <p
        className="shrink-0 font-display leading-[0.91]"
        style={{ minWidth: width, fontSize: size, height: size * 0.885 }}
      >
        {value}
      </p>
      <p className="text-sm leading-2 whitespace-nowrap" style={{ fontSize: size * 0.1458 }}>
        {caption}
      </p>
    </div>
  )
}

export function Unit({ value, unit }: { value: string; unit: string }) {
  return (
    <>
      {value} <span className="italic">{unit}</span>
    </>
  )
}

/* ------------------------------------------------------------------ */
/* People: avatar stacks and chat rows                                 */
/* ------------------------------------------------------------------ */

export function PhotoAvatar({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className={cn("size-8 shrink-0 rounded-full object-cover", className)} />
  )
}

/** Overlapping 32px avatars with a trailing "+n" chip. */
export function AvatarStack({ photos, more }: { photos: { src: string; alt: string }[]; more?: number }) {
  return (
    <div className="flex shrink-0 items-center">
      {photos.map((p, i) => (
        <PhotoAvatar key={p.src} src={p.src} alt={p.alt} className={cn(i > 0 && "-ml-[9.6px]")} />
      ))}
      {more ? (
        <span className="-ml-[9.6px] flex size-8 items-center justify-center rounded-full bg-foreground/8 pl-[7px] text-xs leading-3 font-medium text-muted-foreground">
          +{more}
        </span>
      ) : null}
    </div>
  )
}

/** One row of "My chats": avatar(s) · name · time, with a hairline below. */
export function ChatRow({ avatar, name, time }: { avatar: React.ReactNode; name: string; time: string }) {
  return (
    <button
      type="button"
      className="flex h-14 w-full shrink-0 items-start gap-3 border-b border-foreground/20 pb-6 text-left"
    >
      <span className="flex h-8 items-center gap-3">
        {avatar}
        <RowTitle>{name}</RowTitle>
      </span>
      <span className="ml-auto text-xs leading-8">{time}</span>
    </button>
  )
}

/* ------------------------------------------------------------------ */
/* Assistant: Chat · Voice · Log tabs and the voice orb               */
/* ------------------------------------------------------------------ */

export function AssistantTabs({ defaultValue }: { defaultValue: "chat" | "voice" | "log" }) {
  return (
    <PillTabs
      label="Assistant mode"
      defaultValue={defaultValue}
      items={[
        { value: "chat", label: "Chat", icon: <MessageCircleMoreIcon strokeWidth={1.5} /> },
        { value: "voice", label: "Voice", icon: <MicIcon strokeWidth={1.5} /> },
        { value: "log", label: "Log", icon: <CameraIcon strokeWidth={1.5} /> },
      ]}
    />
  )
}

/** Iridescent orb (422 × 339) with the PREDICT mark, centred on the canvas. */
export function VoiceOrb() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div className="absolute top-[356px] left-[749px] h-[339px] w-[422px] overflow-hidden mix-blend-darken dark:mix-blend-lighten dark:hue-rotate-180 dark:invert">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/screens/home/home-09-orb.png"
          alt=""
          className="absolute top-[-21.85%] left-[-27.48%] h-[145.92%] w-[156.29%] max-w-none"
        />
      </div>
      <PredictMark className="absolute top-[497.1px] left-[930.6px] h-[65.67px] w-[58.62px] text-primary dark:text-primary-foreground" />
    </div>
  )
}
