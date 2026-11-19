import { ChevronRightIcon, FileTextIcon } from "lucide-react"
import { cn } from "cn"

import { DashCard, DoctorShell, PatientsCard, StatCard } from "./shared"

export const title = "Doctor dashboard"

const ASSETS = "/screens/desktop/doctor"

/* -------------------------------------------------------------------------- */
/* My Appointments: week × time-slot grid                                     */
/* -------------------------------------------------------------------------- */

const weekdays = ["Mon 9", "Tue 10", "Wed 11", "Thu 12", "Fri 13"]

/** null = no slot, "" = open slot, name = booked. */
const schedule: { time: string; slots: (string | null)[] }[] = [
  { time: "09:00", slots: [null, "", "Rakesh", "", ""] },
  { time: "10:00", slots: ["", "Anjali", "", null, ""] },
  { time: "11:00", slots: ["", "", null, "", ""] },
  { time: "13:00", slots: ["Neha", "", "", "Ankit", ""] },
]

function AppointmentsGrid() {
  return (
    <div className="grid h-[158px] w-[626.344px] self-center grid-cols-[44px_repeat(5,110.87px)] grid-rows-[18px_repeat(4,28px)] gap-1 pt-1 pl-1">
      <div />
      {weekdays.map((d) => (
        <p key={d} className="pb-0.5 text-center text-xs leading-4 text-app-foreground/60">
          {d}
        </p>
      ))}
      {schedule.map((row) => (
        <div key={row.time} className="contents">
          <p className="flex items-center text-[11px] leading-[16.5px] text-app-foreground/60">{row.time}</p>
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
                  slot
                    ? "bg-app-brand text-app-brand-foreground"
                    : "border border-app-foreground/8 bg-app-pill"
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
/* Patient Risk Analysis                                                      */
/* -------------------------------------------------------------------------- */

const riskFactors = [
  { code: "RFF", name: "Renal Filtration Factor", value: "2.96" },
  { code: "CF", name: "Cardiometabolic Function", value: "2.72" },
  { code: "MHF", name: "Musculoskeletal Health Factotor", value: "5.78" },
  { code: "MHF", name: "Musculoskeletal Health Factotor", value: "5.78" },
  { code: "MHF", name: "Musculoskeletal Health Factotor", value: "5.78" },
]

function RiskCard() {
  return (
    <DashCard
      title="Patient Risk Analysis"
      className="top-[calc(50%+106px)] left-[calc(50%-0.5px)] h-[596px] w-[381px] -translate-x-1/2 -translate-y-1/2"
    >
      <div className="flex flex-col gap-6">
        <p className="h-[85px] w-[181px] font-display text-[96px] leading-[0.91]">44%</p>
        <div className="relative h-[34px] w-[321px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${ASSETS}/doctor-01-risk-gauge.svg`}
            alt="Risk 44%"
            className="absolute inset-[-6.01%_-2.04%_-19.24%_-1.1%] block size-auto max-w-none"
          />
        </div>
      </div>
      {riskFactors.map((f, i) => (
        <div key={i} className="flex items-start justify-between">
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
/* My Reports / Event Groups                                                  */
/* -------------------------------------------------------------------------- */

const reports = ["Rajeev Verma", "Rekha Malhotra", "Ritu Verma"]

function ReportsCard() {
  return (
    <DashCard
      title="My Reoprts"
      className="top-[calc(50%+250px)] left-[calc(50%+389px)] h-[310px] w-[330px] -translate-x-1/2 -translate-y-1/2"
    >
      {reports.map((name) => (
        <div key={name} className="flex h-[46px] items-center justify-between">
          <div className="flex items-center gap-1.5">
            <FileTextIcon className="size-10 shrink-0" strokeWidth={1} />
            <div className="flex h-[46px] w-[197px] flex-col gap-3">
              <p className="h-5 font-display text-[21px] leading-6 whitespace-nowrap">{name}</p>
              <p className="text-[10px] leading-[14px]">Blood_Test_Report.pdf</p>
            </div>
          </div>
          <ChevronRightIcon className="size-6 shrink-0" strokeWidth={1} />
        </div>
      ))}
    </DashCard>
  )
}

const eventAvatars = ["doctor-01-event-1.jpg", "doctor-01-event-2.jpg", "doctor-01-event-3.jpg"]

function EventGroupsCard() {
  return (
    <DashCard
      title="Event Groups"
      className="top-[calc(50%+333.5px)] left-[calc(50%+747.5px)] w-[333px] -translate-x-1/2 -translate-y-1/2"
    >
      <div className="flex h-[35px] items-start">
        {eventAvatars.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={src}
            src={`${ASSETS}/${src}`}
            alt=""
            className={cn("size-8 shrink-0 rounded-full object-cover", i > 0 && "-ml-[9.6px]")}
          />
        ))}
        <span className="-ml-[9.6px] flex size-8 shrink-0 items-center justify-center rounded-full bg-app-foreground/8 pl-[6.96px] text-xs leading-3 font-medium text-app-foreground/60 backdrop-blur-sm">
          +2
        </span>
      </div>
    </DashCard>
  )
}

// Figma: Slide 16:9 - 15 (1817:5927)
export default function DoctorDesktop01() {
  return (
    <DoctorShell>
      <StatCard
        title="Total Appointments"
        value="56"
        className="top-[calc(50%-117.5px)] left-[calc(50%-748px)] w-[330px] -translate-x-1/2 -translate-y-1/2"
      />
      <StatCard
        title="Total Reports"
        value="88"
        className="top-[calc(50%-117.75px)] left-[calc(50%-389.5px)] w-[333px] -translate-x-1/2 -translate-y-1/2"
      />
      <PatientsCard className="top-[calc(50%+193.75px)] left-[calc(50%-568px)] w-[690px] -translate-x-1/2 -translate-y-1/2" />

      <RiskCard />

      <DashCard
        title="My Appointments"
        className="top-[calc(50%-63.5px)] left-[calc(50%+568.5px)] h-[257px] w-[691px] -translate-x-1/2 -translate-y-1/2"
      >
        <AppointmentsGrid />
      </DashCard>

      <ReportsCard />
      <StatCard
        title="Nutrition & Diet"
        value="12"
        className="top-[calc(50%+166.5px)] left-[calc(50%+747.5px)] w-[333px] -translate-x-1/2 -translate-y-1/2"
      />
      <EventGroupsCard />
    </DoctorShell>
  )
}
