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
import { cn } from "cn"

import { Button } from "@workspace/ui/components/button"
import { AppCard, AppCardHeader, AppCardTitle } from "@workspace/ui/predict/app/app-card"
import { PredictMark } from "@workspace/ui/predict/logo"

import { DesktopScreen } from "../desktop-screen"

const ASSETS = "/screens/desktop/doctor"

/* -------------------------------------------------------------------------- */
/* Avatars                                                                    */
/* -------------------------------------------------------------------------- */

interface Photo {
  src: string
  /** Crop of the 65 × 64 photo layer inside the 60px circle (Figma fill transform). */
  crop?: React.CSSProperties
}

const doctorPhoto: Photo = {
  src: "/screens/shared/avatar.png",
  crop: { height: "242.19%", width: "133.91%", left: "-23.11%", top: "-29.69%" },
}

/** 60px round photo on a lavender, outlined disc ("Ellipse 56" + "image 2712"). */
export function Avatar({ photo, alt, className }: { photo: Photo; alt: string; className?: string }) {
  return (
    <div
      className={cn(
        "relative size-[60px] shrink-0 overflow-hidden rounded-full border border-app-foreground bg-app-pill",
        className
      )}
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
/* Cards                                                                      */
/* -------------------------------------------------------------------------- */

/** Frosted dashboard card with a title and the ↗ "open" affordance. */
export function DashCard({
  title,
  className,
  children,
  ...props
}: { title: string } & React.ComponentProps<typeof AppCard>) {
  return (
    <AppCard className={cn("absolute", className)} {...props}>
      <AppCardHeader>
        <AppCardTitle>{title}</AppCardTitle>
        <button type="button" aria-label={`Open ${title}`} className="shrink-0">
          <ArrowUpRightIcon className="size-6" strokeWidth={1} />
        </button>
      </AppCardHeader>
      {children}
    </AppCard>
  )
}

/** Card with a single large count ("Total Appointments 56"). */
export function StatCard({ title, value, className }: { title: string; value: string; className?: string }) {
  return (
    <DashCard title={title} className={className}>
      <p className="h-[35px] font-display text-5xl leading-6">{value}</p>
    </DashCard>
  )
}

/* -------------------------------------------------------------------------- */
/* My Patients                                                                */
/* -------------------------------------------------------------------------- */

const patients: {
  name: string
  age: string
  status: string
  plan: string
  photo: Photo
}[] = [
  { name: "Usha Sethi", age: "39 · F", status: "active", plan: "2L · 42 Day", photo: doctorPhoto },
  {
    name: "Suresh Sharma",
    age: "74 · F",
    status: "active",
    plan: "4L · 21 Day",
    photo: {
      src: `${ASSETS}/doctor-01-patient-suresh.png`,
      crop: { height: "135.37%", width: "100%", left: 0, top: "-7.03%" },
    },
  },
  {
    name: "Anjali Bansal",
    age: "48 · M",
    status: "Medicine",
    plan: "2L · 42 Day",
    photo: { src: `${ASSETS}/doctor-01-patient-anjali.png` },
  },
  {
    name: "Vivaan Mehta",
    age: "35 · F",
    status: "completed",
    plan: "4L · 21 Day",
    photo: { src: `${ASSETS}/doctor-01-patient-vivaan.png` },
  },
]

/** Chip widths from Figma. */
const statusWidth: Record<string, number> = { active: 66, Medicine: 77, completed: 86 }

/** Patient table; columns spread with justify-between so it fits any card width. */
export function PatientsCard({ className }: { className?: string }) {
  return (
    <DashCard title="My Patients" className={className}>
      {patients.map((p) => (
        <div key={p.name} className="flex h-[60px] items-center justify-between">
          <Avatar photo={p.photo} alt={p.name} />
          <p className="w-[159px] font-display text-[21px] leading-6 whitespace-nowrap">{p.name}</p>
          <p className="w-[88px] text-sm leading-6 whitespace-nowrap">{p.age}</p>
          <div className="w-[89px]">
            <span
              className="inline-flex h-[23px] items-center justify-center rounded-[40px] bg-app-pill text-xs leading-6 whitespace-nowrap text-app-pill-foreground"
              style={{ width: statusWidth[p.status] ?? 66 }}
            >
              {p.status}
            </span>
          </div>
          <p className="w-[103px] text-sm leading-6 whitespace-nowrap">{p.plan}</p>
          <button
            type="button"
            aria-label={`Open ${p.name}`}
            className="flex w-[47px] items-center justify-end"
          >
            <ChevronRightIcon className="size-6" strokeWidth={1} />
          </button>
        </div>
      ))}
    </DashCard>
  )
}

/* -------------------------------------------------------------------------- */
/* Shell: greeting, week strip, bottom nav                                    */
/* -------------------------------------------------------------------------- */

const dayPill =
  "absolute top-[183px] flex h-8 min-w-8 -translate-x-1/2 items-center justify-center rounded-full bg-app-pill text-[10.5px] leading-[21px] text-app-pill-foreground"

function WeekStrip() {
  return (
    <>
      {/* Timeline rule + tick marks fading downwards */}
      <div aria-hidden className="absolute top-[198px] left-0 h-[2px] w-[959px] bg-app-brand" />
      <div
        aria-hidden
        className="absolute top-[224px] left-0 h-[50px] w-full bg-app-foreground"
        style={{
          maskImage: `url(${ASSETS}/doctor-01-ticks.svg)`,
          maskSize: "959px 50px",
          maskRepeat: "repeat-x",
          maskMode: "alpha",
        }}
      />
      <button type="button" aria-label="Previous week" className={cn(dayPill, "left-[75px]")}>
        <ChevronLeftIcon className="size-4" strokeWidth={1} />
      </button>
      {[
        { label: "S", left: "left-[277px]" },
        { label: "M", left: "left-[479px]" },
        { label: "T", left: "left-[681px]" },
      ].map((d) => (
        <button key={d.left} type="button" className={cn(dayPill, d.left)}>
          {d.label}
        </button>
      ))}
      <div className={cn(dayPill, "left-[961px] px-5 whitespace-nowrap")}>
        Wednesday, 27 December, 2026
      </div>
    </>
  )
}

type DoctorTab = "today" | "twin" | "patients"

const navCircle =
  "flex size-[60px] shrink-0 items-center justify-center rounded-full bg-app-field text-app-foreground"

/** Desktop bottom nav: menu · [Today | twin | patients] · PREDICT assistant. */
function DoctorNav() {
  const [active, setActive] = React.useState<DoctorTab>("today")
  const tabs: { id: DoctorTab; label: string; icon: React.ReactNode }[] = [
    {
      id: "today",
      label: "Today",
      icon: (
        <ClockIcon
          className={cn("size-5 shrink-0", active === "today" && "fill-app-brand-foreground stroke-app-brand")}
          strokeWidth={2}
        />
      ),
    },
    { id: "twin", label: "Twin", icon: <CircleDashedIcon className="size-5 shrink-0" strokeWidth={1} /> },
    { id: "patients", label: "Patients", icon: <UsersIcon className="size-5 shrink-0" strokeWidth={1} /> },
  ]

  return (
    <nav className="absolute top-[979px] left-1/2 z-10 flex -translate-x-1/2 items-center gap-1 px-px">
      <button type="button" aria-label="Menu" className={navCircle}>
        <GripIcon className="size-6" strokeWidth={2} />
      </button>
      <div className="flex h-[60px] items-center justify-center gap-[5px] rounded-full bg-app-field py-2.5 pr-3.5 pl-3">
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
      </div>
      <button type="button" aria-label="PREDICT assistant" className={navCircle}>
        <PredictMark className="h-[20.166px] w-[18px]" />
      </button>
    </nav>
  )
}

/** Doctor dashboard frame shared by every doctor desktop screen. */
export function DoctorShell({ children }: { children: React.ReactNode }) {
  return (
    <DesktopScreen>
      {/* Brand wash along the bottom edge */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 h-[289px] w-[1920px] bg-gradient-to-t from-app-brand to-transparent mix-blend-multiply blur-[0.5px] dark:mix-blend-normal"
      />

      <WeekStrip />

      {children}

      {/* PREDICT button */}
      <button
        type="button"
        aria-label="PREDICT"
        className="absolute top-[43px] left-[47px] flex size-[60px] items-center justify-center rounded-full bg-app-brand text-app-brand-foreground"
      >
        <PredictMark className="h-[20.166px] w-[18px]" />
      </button>

      {/* Greeting */}
      <p className="absolute top-[51px] left-[908px] font-display text-base whitespace-nowrap">
        Good Morning,
      </p>
      <h1 className="absolute top-[77px] left-[calc(50%-0.5px)] -translate-x-1/2 font-display text-4xl leading-normal font-normal whitespace-nowrap">
        Dr. Arjun Vaidya
      </h1>

      <Avatar photo={doctorPhoto} alt="Dr. Arjun Vaidya" className="absolute top-[43px] left-[1811px]" />

      <DoctorNav />
    </DesktopScreen>
  )
}
