"use client"

import { ChevronRightIcon, FileTextIcon } from "lucide-react"
import { cn } from "cn"

import { DashCard, StatCard } from "./shared"
import { DoctorFrame, PhotoAvatar, photos, type Photo } from "./shared-h"

export const title = "Doctor dashboard (today)"

const ASSETS = "/screens/desktop/doctor"

/* -------------------------------------------------------------------------- */
/* Today's patients                                                           */
/* -------------------------------------------------------------------------- */

const todaysPatients: { name: string; age: string; status: string; time: string; photo: Photo }[] = [
  { name: "Usha Sethi", age: "39 · F", status: "Waiting", time: "09:00 AM", photo: photos.usha },
  { name: "Suresh Sharma", age: "74 · M", status: "In visit", time: "09:30 AM", photo: photos.suresh },
  { name: "Anjali Bansal", age: "48 · F", status: "Follow-up", time: "10:00 AM", photo: photos.anjali },
  { name: "Vivaan Mehta", age: "35 · M", status: "Booked", time: "10:30 AM", photo: photos.vivaan },
]

/** Chip widths from Figma. */
const statusWidth: Record<string, number> = { "Follow-up": 77, Booked: 86 }

function TodaysPatientsCard() {
  return (
    <DashCard
      title="Today's patients"
      className="top-[calc(50%+193.75px)] left-[calc(50%-568px)] w-[690px] -translate-x-1/2 -translate-y-1/2"
    >
      {todaysPatients.map((p) => (
        <div key={p.name} className="flex h-[60px] items-center justify-between">
          <PhotoAvatar photo={p.photo} alt={p.name} size={60} />
          <p className="w-[159px] font-display text-[21px] leading-6 whitespace-nowrap">{p.name}</p>
          <p className="w-[88px] text-sm leading-6 whitespace-nowrap">{p.age}</p>
          <div className="w-[89px]">
            <span
              className="inline-flex h-[23px] items-center justify-center rounded-[40px] bg-secondary text-xs leading-6 whitespace-nowrap text-secondary-foreground"
              style={{ width: statusWidth[p.status] ?? 66 }}
            >
              {p.status}
            </span>
          </div>
          <p className="w-[103px] text-sm leading-6 whitespace-nowrap">{p.time}</p>
          <button type="button" aria-label={`Open ${p.name}`} className="flex w-[47px] items-center justify-end">
            <ChevronRightIcon className="size-6" strokeWidth={1} />
          </button>
        </div>
      ))}
    </DashCard>
  )
}

/* -------------------------------------------------------------------------- */
/* Today's overview                                                           */
/* -------------------------------------------------------------------------- */

const overview = [
  { code: "New", name: "New consultations", value: "10" },
  { code: "F/U", name: "Follow-up visits", value: "8" },
  { code: "Lab", name: "Reports to review", value: "12" },
  { code: "Rx", name: "Prescription renewals", value: "5" },
  { code: "Ref", name: "Specialist referrals", value: "3" },
]

function OverviewCard() {
  return (
    <DashCard
      title="Today's overview"
      className="top-[calc(50%+106px)] left-[calc(50%-0.5px)] h-[596px] w-[381px] -translate-x-1/2 -translate-y-1/2"
    >
      <div className="flex flex-col gap-6">
        <p className="h-[85px] w-[181px] font-display text-[96px] leading-[0.91]">18</p>
        <div className="relative h-[34px] w-[321px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${ASSETS}/doctor-01-risk-gauge.svg`}
            alt="18 visits today"
            className="absolute inset-[-6.01%_-2.04%_-19.24%_-1.1%] block size-auto max-w-none"
          />
        </div>
      </div>
      {overview.map((f) => (
        <div key={f.code} className="flex items-start justify-between">
          <div className="flex flex-col gap-3">
            <p className="font-display text-[21px] leading-6">{f.code}</p>
            <p className="text-[10px] leading-2 whitespace-nowrap">{f.name}</p>
          </div>
          <div className="flex h-[42px] w-[100px] flex-col items-end justify-between">
            <ChevronRightIcon className="size-6" strokeWidth={1} />
            <p className="text-right text-[10px] leading-2 font-bold">{f.value}</p>
          </div>
        </div>
      ))}
    </DashCard>
  )
}

/* -------------------------------------------------------------------------- */
/* My appointments                                                            */
/* -------------------------------------------------------------------------- */

const weekdays = ["Mon 9", "Tue 10", "Wed 11", "Thu 12", "Fri 13"]

/** null = no slot, "" = open slot, label = booked. */
const schedule: { time: string; slots: (string | null)[] }[] = [
  { time: "09:00", slots: [null, "", "New", "", ""] },
  { time: "10:00", slots: ["", "Follow-up", "", null, ""] },
  { time: "11:00", slots: ["", "", null, "", ""] },
  { time: "13:00", slots: ["Review", "", "", "New", ""] },
]

function AppointmentsGrid() {
  return (
    <div className="grid h-[158px] w-[626.344px] grid-cols-[44px_repeat(5,110.87px)] grid-rows-[18px_repeat(4,28px)] gap-1 self-center pt-1 pl-1">
      <div />
      {weekdays.map((d) => (
        <p key={d} className="pb-0.5 text-center text-xs leading-4 text-foreground/60">
          {d}
        </p>
      ))}
      {schedule.map((row) => (
        <div key={row.time} className="contents">
          <p className="flex items-center text-[11px] leading-[16.5px] text-foreground/60">{row.time}</p>
          {row.slots.map((slot, i) =>
            slot === null ? (
              <div key={i} />
            ) : (
              <button
                key={i}
                type="button"
                aria-label={slot ? `${slot}, ${weekdays[i]} ${row.time}` : `Book ${weekdays[i]} ${row.time}`}
                className={cn(
                  "flex h-7 items-center justify-center rounded-[64px] text-[11px] leading-[11px] font-medium",
                  slot ? "bg-primary text-primary-foreground" : "border border-foreground/8 bg-secondary"
                )}
              >
                {slot}
              </button>
            )
          )}
        </div>
      ))}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Lab inbox / Care team                                                      */
/* -------------------------------------------------------------------------- */

const labInbox = [
  { name: "Usha Sethi", test: "CBC" },
  { name: "Suresh Sharma", test: "HbA1c" },
  { name: "Anjali Bansal", test: "Lipid panel" },
]

function LabInboxCard() {
  return (
    <DashCard
      title="Lab inbox"
      className="top-[calc(50%+250px)] left-[calc(50%+389px)] h-[310px] w-[330px] -translate-x-1/2 -translate-y-1/2"
    >
      {labInbox.map((r) => (
        <div key={r.name} className="flex h-[46px] items-center justify-between">
          <div className="flex items-center gap-1.5">
            <FileTextIcon className="size-10 shrink-0" strokeWidth={1} />
            <div className="flex h-[46px] w-[197px] flex-col gap-3">
              <p className="h-5 font-display text-[21px] leading-6 whitespace-nowrap">{r.name}</p>
              <p className="text-[10px] leading-[14px]">{r.test} · Ready for review</p>
            </div>
          </div>
          <ChevronRightIcon className="size-6 shrink-0" strokeWidth={1} />
        </div>
      ))}
    </DashCard>
  )
}

const careTeam = ["doctor-01-event-1.jpg", "doctor-01-event-2.jpg", "doctor-01-event-3.jpg"]

function CareTeamCard() {
  return (
    <DashCard
      title="Care team"
      className="top-[calc(50%+333.5px)] left-[calc(50%+747.5px)] w-[333px] -translate-x-1/2 -translate-y-1/2"
    >
      <div className="flex h-[35px] items-start">
        {careTeam.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={src}
            src={`${ASSETS}/${src}`}
            alt=""
            className={cn("size-8 shrink-0 rounded-full object-cover", i > 0 && "-ml-[9.6px]")}
          />
        ))}
        <span className="-ml-[9.6px] flex size-8 shrink-0 items-center justify-center rounded-full bg-foreground/8 pl-[6.96px] text-xs leading-3 font-medium text-foreground/60 backdrop-blur-sm">
          +2
        </span>
      </div>
    </DashCard>
  )
}

// Figma: Slide 16:9 - 36 (1993:2987)
export default function DoctorDesktop03() {
  return (
    <DoctorFrame
      subtitle="Good morning,"
      title="Dr. Arjun Vaidya"
      tab="today"
      weekDate="Monday, 9 November 2026"
    >
      <StatCard
        title="Active patients"
        value="56"
        className="top-[calc(50%-117.5px)] left-[calc(50%-748px)] w-[330px] -translate-x-1/2 -translate-y-1/2"
      />
      <StatCard
        title="Pending reports"
        value="12"
        className="top-[calc(50%-117.75px)] left-[calc(50%-389.5px)] w-[333px] -translate-x-1/2 -translate-y-1/2"
      />
      <TodaysPatientsCard />

      <OverviewCard />

      <DashCard
        title="My appointments"
        className="top-[calc(50%-63.5px)] left-[calc(50%+568.5px)] h-[257px] w-[691px] -translate-x-1/2 -translate-y-1/2"
      >
        <AppointmentsGrid />
      </DashCard>

      <LabInboxCard />
      <StatCard
        title="Rx renewals"
        value="5"
        className="top-[calc(50%+166.5px)] left-[calc(50%+747.5px)] w-[333px] -translate-x-1/2 -translate-y-1/2"
      />
      <CareTeamCard />
    </DoctorFrame>
  )
}
