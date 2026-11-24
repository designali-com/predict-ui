"use client"

import * as React from "react"
import {
  ChevronDownIcon,
  ChevronRightIcon,
  ClockIcon,
  GripIcon,
  PlusIcon,
  SearchIcon,
  UsersIcon,
} from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"

import {
  AppButton as Button,
  AppGlassBar,
  AppGlassCircle,
} from "@workspace/ui/predict/app/app-glass"
import { Input } from "@workspace/ui/components/input"
import { AppCard } from "@workspace/ui/predict/app/app-card"
import { AppGlow } from "@workspace/ui/predict/app/app-glow"
import { PredictMark } from "@workspace/ui/predict/logo"

/* -------------------------------------------------------------------------- */
/* Photos (shared with the desktop doctor screens)                            */
/* -------------------------------------------------------------------------- */

export interface Photo {
  src: string
  /** Crop of the photo layer inside the circle (Figma fill transform). */
  crop?: React.CSSProperties
}

const DESKTOP = "/screens/desktop/doctor"

export const doctorPhoto: Photo = {
  src: "/screens/shared/avatar.png",
  crop: { height: "242.19%", width: "133.91%", left: "-23.11%", top: "-29.69%" },
}

export interface Patient {
  name: string
  initials: string
  meta: string
  status: string
  photo?: Photo
}

export const patients: Patient[] = [
  { name: "Usha Sethi", initials: "US", meta: "39 · F · 2L · 42 days", status: "active", photo: doctorPhoto },
  {
    name: "Suresh Sharma",
    initials: "SS",
    meta: "52 · M · 4L · 21 days",
    status: "active",
    photo: {
      src: `${DESKTOP}/doctor-01-patient-suresh.png`,
      crop: { height: "135.37%", width: "100%", left: 0, top: "-7.03%" },
    },
  },
  {
    name: "Anjali Bansal",
    initials: "AB",
    meta: "48 · F · 2L · 42 days",
    status: "Medicine",
    photo: { src: `${DESKTOP}/doctor-01-patient-anjali.png` },
  },
  {
    name: "Vivaan Mehta",
    initials: "VM",
    meta: "35 · M · 4L · 21 days",
    status: "completed",
    photo: { src: `${DESKTOP}/doctor-01-patient-vivaan.png` },
  },
  { name: "Rakesh Kumar", initials: "RK", meta: "61 · M · 2L · 30 days", status: "active" },
]

/**
 * Round photo on a lavender disc; the photo layer bleeds 1/30 of the size past
 * each edge, as in Figma ("Ellipse" + "image 2712"). Falls back to initials.
 */
export function PhotoAvatar({
  photo,
  alt,
  initials,
  size,
  className,
}: {
  photo?: Photo
  alt: string
  initials?: string
  size: number
  className?: string
}) {
  const bleed = size / 30
  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-secondary",
        !photo && "border border-foreground/10",
        className
      )}
      style={{ width: size, height: size }}
    >
      {photo ? (
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
      ) : (
        <span className="text-[17px] leading-6 text-secondary-foreground">{initials}</span>
      )}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Shell: header, bottom nav, glow                                            */
/* -------------------------------------------------------------------------- */

/** Eyebrow + 36px title on the left, doctor photo on the right (Figma tops 51 / 64). */
export function DoctorHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <header className="absolute top-[51px] right-[39px] left-[47px] flex items-start justify-between">
      <div className="text-foreground">
        <p className="text-base leading-[13px]">{eyebrow}</p>
        <h1 className="mt-px text-4xl leading-[44px] font-normal tracking-tight whitespace-nowrap">
          {title}
        </h1>
      </div>
      <PhotoAvatar photo={doctorPhoto} alt="Dr. Arjun" size={60} />
    </header>
  )
}

/** Doctor-app floating nav: menu · [Today | Patients] · PREDICT assistant (Figma top 794). */
export function DoctorBottomNav() {
  const [tab, setTab] = React.useState<"today" | "patients">("patients")

  return (
    <nav className="absolute top-[794px] left-1/2 z-10 flex w-[325px] -translate-x-1/2 items-center justify-between px-px">
      <AppGlassCircle aria-label="Menu">
        <GripIcon className="size-6" strokeWidth={2} />
      </AppGlassCircle>
      <AppGlassBar className="flex h-[60px] w-[195px] items-center justify-center gap-[5px] rounded-[30px] pr-3.5 pl-3">
        {(
          [
            { id: "today", label: "Today", Icon: ClockIcon },
            { id: "patients", label: "Patients", Icon: UsersIcon },
          ] as const
        ).map(({ id, label, Icon }) => {
          const active = tab === id
          return (
            <Button
              key={id}
              variant={active ? "app" : "ghost"}
              aria-label={label}
              aria-pressed={active}
              onClick={() => setTab(id)}
              className={cn(
                "rounded-full text-base leading-6 font-normal transition-all duration-200",
                active ? "h-12 gap-1 px-[18px]" : "h-10 px-4"
              )}
            >
              {active && label}
              <Icon className="size-5" strokeWidth={1.5} />
            </Button>
          )
        })}
      </AppGlassBar>
      <AppGlassCircle aria-label="PREDICT assistant">
        <PredictMark className="h-5" />
      </AppGlassCircle>
    </nav>
  )
}

/** Violet orb at the bottom of every doctor screen (Figma bottom −513). */
export function DoctorGlow() {
  return <AppGlow variant="blob" className="-bottom-[513px]" />
}

/* -------------------------------------------------------------------------- */
/* Cards, tags, fields                                                        */
/* -------------------------------------------------------------------------- */

/** "Card / …": lavender glass, 40px corners, soft violet inner glow. */
export function DoctorCard({ className, ...props }: React.ComponentProps<typeof AppCard>) {
  return (
    <AppCard
      className={cn(
        "gap-3.5 rounded-[40px] p-[26px] shadow-[inset_0_0_30px_0_color-mix(in_oklch,var(--primary)_20%,transparent)] dark:shadow-[inset_0_0_30px_0_color-mix(in_oklch,var(--primary)_45%,transparent)]",
        className
      )}
      {...props}
    />
  )
}

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

/** Muted secondary text (Figma #686868). */
export const mutedText = "text-foreground/60"

const fieldSurface =
  "h-[42px] rounded-full border border-foreground/8 bg-background/70 px-4 text-sm leading-5 text-foreground placeholder:text-foreground/60 md:text-sm dark:bg-background/30"

export function FieldLabel({ children, htmlFor }: { children: React.ReactNode; htmlFor: string }) {
  return (
    <label htmlFor={htmlFor} className={cn("text-xs leading-4", mutedText)}>
      {children}
    </label>
  )
}

/** Labelled 42px pill input. */
export function TextField({
  id,
  label,
  className,
  ...props
}: { id: string; label: string } & React.ComponentProps<typeof Input>) {
  return (
    <div className={cn("flex w-full flex-col gap-1.5", className)}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Input id={id} className={fieldSurface} {...props} />
    </div>
  )
}

/** Labelled 42px pill select with a chevron (native select for in-phone use). */
export function SelectField({
  id,
  label,
  placeholder,
  options,
  defaultValue,
  className,
}: {
  id: string
  label: string
  placeholder: string
  options: string[]
  defaultValue?: string
  className?: string
}) {
  const [value, setValue] = React.useState(defaultValue ?? "")
  return (
    <div className={cn("flex w-full min-w-0 flex-col gap-1.5", className)}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={cn(
            fieldSurface,
            "w-full appearance-none pr-10 outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30",
            !value && "text-foreground/60"
          )}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <ChevronDownIcon
          aria-hidden
          className="pointer-events-none absolute top-1/2 right-4 size-[18px] -translate-y-1/2 text-foreground"
          strokeWidth={1.5}
        />
      </div>
    </div>
  )
}

/** Cancel + primary action pair at the foot of the forms / dialog. */
export function FormActions({
  primary,
  icon,
  className,
}: {
  primary: string
  icon: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("flex w-full gap-2.5 pt-1.5", className)}>
      <Button
        variant="app-secondary"
        className="h-11 flex-1 border-primary/12 px-[22px] text-sm leading-5 font-normal"
      >
        Cancel
      </Button>
      <Button variant="app" className="h-11 flex-1 gap-1 pr-[22px] pl-[18px] text-sm leading-6 font-normal">
        {icon}
        {primary}
      </Button>
    </div>
  )
}

export const sexOptions = ["Female", "Male", "Other"]
export const conditionOptions = [
  "Sarcopenia risk",
  "Type 2 diabetes",
  "Hypertension",
  "Obesity",
  "Osteoporosis",
]
export const planOptions = ["2L · 42 days", "4L · 21 days", "2L · 30 days"]

/* -------------------------------------------------------------------------- */
/* Patient list body (used by Patient list and as the Remove patient backdrop) */
/* -------------------------------------------------------------------------- */

export function PatientListBody() {
  return (
    <>
      <DoctorHeader eyebrow="Dr. Arjun" title="Patients" />

      {/* Card / All patients */}
      <DoctorCard className="absolute top-[140px] left-[11px] w-[381px]">
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col whitespace-nowrap">
            <p className="text-base leading-5">All patients</p>
            <p className="text-[44px] leading-[50px]">56</p>
          </div>
          <Button variant="app" className="h-11 gap-1 pr-[22px] pl-4 text-sm leading-6 font-normal">
            <PlusIcon className="size-[18px]" strokeWidth={1.5} />
            Add new
          </Button>
        </div>
        <div className="relative w-full">
          <SearchIcon
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-4 size-[18px] -translate-y-1/2 text-foreground/60"
            strokeWidth={1.5}
          />
          <Input
            type="search"
            aria-label="Search patients"
            placeholder="Search patients"
            className={cn(fieldSurface, "pl-[44px]")}
          />
        </div>
      </DoctorCard>

      {/* Card / My patients */}
      <DoctorCard className="absolute top-[334px] left-[11px] w-[381px]">
        <div className="flex w-full items-center justify-between whitespace-nowrap">
          <p className="text-base leading-5">My patients</p>
          <p className={cn("text-xs leading-4", mutedText)}>Active 38</p>
        </div>
        {patients.map((p) => (
          <button
            key={p.name}
            type="button"
            className="flex h-14 w-full items-center justify-between text-left"
          >
            <span className="flex items-center gap-3">
              <PhotoAvatar photo={p.photo} alt={p.name} initials={p.initials} size={48} />
              <span className="flex flex-col whitespace-nowrap">
                <span className="text-[19px] leading-[22px] tracking-tight">{p.name}</span>
                <span className={cn("text-[11px] leading-4", mutedText)}>{p.meta}</span>
              </span>
            </span>
            <span className="flex items-center gap-1.5">
              <Tag>{p.status}</Tag>
              <ChevronRightIcon className="size-[18px]" strokeWidth={1.5} />
            </span>
          </button>
        ))}
      </DoctorCard>
    </>
  )
}
