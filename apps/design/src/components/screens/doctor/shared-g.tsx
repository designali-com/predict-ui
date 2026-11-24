"use client"

import * as React from "react"
import { ClockIcon, GripIcon, SearchIcon, UsersIcon } from "lucide-react"
import { cn } from "cn"

import {
  AppButton as Button,
  AppGlassBar,
  AppGlassCircle,
} from "@workspace/ui/predict/app/app-glass"
import { AppGlow } from "@workspace/ui/predict/app/app-glow"
import { PredictMark } from "@workspace/ui/predict/logo"

import { Screen } from "../screen"

const DESKTOP_ASSETS = "/screens/desktop/doctor"

/* -------------------------------------------------------------------------- */
/* People                                                                     */
/* -------------------------------------------------------------------------- */

export interface Photo {
  src: string
  /** Crop of the photo layer inside the circle (Figma fill transform). */
  crop?: React.CSSProperties
}

export const doctorPhoto: Photo = {
  src: "/screens/shared/avatar.png",
  crop: { height: "242.19%", width: "133.91%", left: "-23.11%", top: "-29.69%" },
}

/** Patient photos, shared with the desktop doctor screens. */
export const patientPhotos = {
  usha: doctorPhoto,
  suresh: {
    src: `${DESKTOP_ASSETS}/doctor-01-patient-suresh.png`,
    crop: { height: "135.37%", width: "100%", left: 0, top: "-7.03%" },
  },
  anjali: { src: `${DESKTOP_ASSETS}/doctor-01-patient-anjali.png` },
  vivaan: { src: `${DESKTOP_ASSETS}/doctor-01-patient-vivaan.png` },
} satisfies Record<string, Photo>

/**
 * Round photo on a lavender, outlined disc. The photo layer overhangs the
 * circle by 1/30 of its size on each side, as in Figma ("image 2712").
 */
export function PhotoAvatar({
  photo,
  alt,
  size = 60,
  className,
}: {
  photo: Photo
  alt: string
  size?: number
  className?: string
}) {
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
        style={{ top: -bleed, left: -bleed, width: (size * 65) / 60, height: (size * 64) / 60 }}
      >
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

/** Lavender disc with initials ("CT", "NK"). */
export function InitialsAvatar({ initials, className }: { initials: string; className?: string }) {
  return (
    <div
      className={cn(
        "flex size-11 shrink-0 items-center justify-center rounded-full bg-secondary text-[13px] text-primary",
        className
      )}
    >
      {initials}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Surfaces & controls                                                        */
/* -------------------------------------------------------------------------- */

/** Frosted lavender card with a violet inner glow ("Card / …", 36px corners). */
export function GlassCard({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "relative flex w-full flex-col overflow-hidden rounded-[36px] bg-secondary/20 backdrop-blur-md",
        "shadow-[inset_0_0_30px_0_color-mix(in_oklab,var(--color-primary)_20%,transparent)]",
        className
      )}
      {...props}
    />
  )
}

/** Filter chip; the selected chip is filled violet. */
export function Chip({
  selected,
  className,
  ...props
}: { selected?: boolean } & React.ComponentProps<"button">) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      className={cn(
        "flex h-8 shrink-0 items-center justify-center rounded-full px-[13px] text-xs whitespace-nowrap transition-colors",
        selected ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground",
        className
      )}
      {...props}
    />
  )
}

/** Row of single-select filter chips. */
export function ChipFilter({
  options,
  defaultValue,
  className,
  chipClassName,
}: {
  options: string[]
  defaultValue?: string
  className?: string
  chipClassName?: string
}) {
  const [value, setValue] = React.useState(defaultValue ?? options[0])
  return (
    <div className={cn("flex w-full gap-1.5", className)}>
      {options.map((o) => (
        <Chip key={o} selected={value === o} onClick={() => setValue(o)} className={chipClassName}>
          {o}
        </Chip>
      ))}
    </div>
  )
}

/** Small status pill ("2 flags", "Normal", "Today"). */
export function Tag({
  tone = "default",
  className,
  ...props
}: { tone?: "default" | "flag" } & React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex h-6 shrink-0 items-center justify-center rounded-full px-2.5 text-[11px] font-medium whitespace-nowrap",
        tone === "flag" ? "bg-destructive/12 text-destructive" : "bg-secondary text-foreground",
        className
      )}
      {...props}
    />
  )
}

/** Rounded search field ("Input" with icon/search). */
export function SearchField({ placeholder }: { placeholder: string }) {
  return (
    <label className="flex h-[42px] w-full items-center gap-2.5 rounded-full border border-foreground/8 bg-card/70 px-[18px]">
      <SearchIcon className="size-[18px] shrink-0 text-foreground/60" strokeWidth={1.5} />
      <input
        type="search"
        placeholder={placeholder}
        aria-label={placeholder}
        className="min-w-0 flex-1 bg-transparent text-sm leading-5 text-foreground outline-none placeholder:text-foreground/60"
      />
    </label>
  )
}

/** Primary (violet) and secondary (lavender) pill buttons used across the doctor app. */
export function PillButton({
  tone = "primary",
  className,
  ...props
}: { tone?: "primary" | "secondary" } & React.ComponentProps<typeof Button>) {
  return (
    <Button
      variant={tone === "primary" ? "app" : "app-secondary"}
      className={cn(
        "h-[30px] px-4 text-[13px] font-medium",
        tone === "secondary" && "text-primary shadow-none",
        className
      )}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/* Shell                                                                      */
/* -------------------------------------------------------------------------- */

type DoctorAppTab = "today" | "patients"

/** Doctor app bottom nav: menu · [Today | patients] · PREDICT assistant. */
export function DoctorAppNav({ className }: { className?: string }) {
  const [active, setActive] = React.useState<DoctorAppTab>("today")
  const tabs: { id: DoctorAppTab; label: string; icon: React.ReactNode }[] = [
    {
      id: "today",
      label: "Today",
      icon: (
        <ClockIcon
          className={cn("size-5 shrink-0", active === "today" && "fill-primary-foreground stroke-primary")}
          strokeWidth={2}
        />
      ),
    },
    {
      id: "patients",
      label: "Patients",
      icon: <UsersIcon className="size-5 shrink-0" strokeWidth={1.5} />,
    },
  ]

  return (
    <nav
      className={cn(
        "absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1 px-px",
        className
      )}
    >
      <AppGlassCircle aria-label="Menu">
        <GripIcon className="size-6" strokeWidth={2} />
      </AppGlassCircle>
      <AppGlassBar className="flex h-[60px] w-[183px] items-center justify-center gap-[5px] py-2.5 pr-3.5 pl-3">
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
 * Mobile doctor screen frame: violet glow, eyebrow + large title, the doctor's
 * avatar, and (optionally) the bottom nav. Content sits in an 381px column at y=136.
 */
export function DoctorAppShell({
  eyebrow,
  title,
  nav = true,
  contentClassName,
  children,
  overlay,
}: {
  eyebrow: string
  title: string
  nav?: boolean
  contentClassName?: string
  children: React.ReactNode
  /** Extra absolutely-positioned content (e.g. a composer instead of the nav). */
  overlay?: React.ReactNode
}) {
  return (
    <Screen>
      <AppGlow variant="blob" className="-bottom-[513px]" />

      <header className="relative flex items-start justify-between pt-[51px] pr-[47px] pl-[47px]">
        <div className="font-display">
          <p className="text-base leading-[19px]">{eyebrow}</p>
          <h1 className="-mt-1.5 text-4xl leading-[43px] font-normal whitespace-nowrap">{title}</h1>
        </div>
        <PhotoAvatar photo={doctorPhoto} alt="Dr. Arjun" />
      </header>

      <div
        className={cn(
          "absolute top-[136px] left-[11px] flex h-[640px] w-[381px] flex-col gap-3.5",
          contentClassName
        )}
      >
        {children}
      </div>

      {overlay}
      {nav && <DoctorAppNav />}
    </Screen>
  )
}
