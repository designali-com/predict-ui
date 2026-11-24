"use client"

import {
  ArrowUpRightIcon,
  CalendarIcon,
  ChevronRightIcon,
  FileTextIcon,
  LeafIcon,
  MailIcon,
  PencilIcon,
  PersonStandingIcon,
  PillIcon,
} from "lucide-react"

import { AppButton as Button } from "@workspace/ui/predict/app/app-glass"

import { Avatar } from "./shared"
import { InfoRow, ListTile, Panel, PanelHeader, PatientShell, Tag, Track, portrait } from "./shared-i"

export const title = "Patient dashboard"

const ASSETS = "/screens/desktop/doctor"

/* -------------------------------------------------------------------------- */
/* Patient profile                                                            */
/* -------------------------------------------------------------------------- */

const details = [
  { label: "Age · Sex", value: "39 · F" },
  { label: "Patient ID", value: "PF-10482" },
  { label: "Condition", value: "Sarcopenia risk" },
  { label: "Blood group", value: "B+" },
  { label: "Phone", value: "+91 98765 43210" },
  { label: "Email", value: "usha.sethi@mail.com" },
]

function ProfileCard() {
  return (
    <Panel className="absolute top-[170px] left-[47px] h-[780px] w-[420px] gap-[18px]">
      <PanelHeader title="Patient" action={PencilIcon} actionLabel="Edit patient" />
      <div className="flex w-full flex-col items-center gap-3 py-1.5">
        <Avatar photo={portrait} alt="Usha Sethi" className="size-[110px] [&>div]:top-[-3.67px] [&>div]:left-[-3.67px] [&>div]:h-[117.333px] [&>div]:w-[119.167px]" />
        <p className="font-display text-[28px] leading-8 whitespace-nowrap">Usha Sethi</p>
        <div className="flex gap-2">
          <Tag>active</Tag>
          <Tag>2L · 42 days</Tag>
        </div>
      </div>
      {details.map((d) => (
        <InfoRow key={d.label} {...d} />
      ))}
      <div className="flex w-full justify-center gap-2.5 pt-2">
        <Button variant="secondary" className="h-11 gap-1.5 border-primary/12 px-[22px] text-sm">
          <MailIcon className="size-[18px]" strokeWidth={1.5} />
          Message
        </Button>
        <Button variant="app" className="h-11 gap-1 pr-[22px] pl-5 text-sm">
          <CalendarIcon className="size-[18px]" strokeWidth={1.5} />
          Book visit
        </Button>
      </div>
    </Panel>
  )
}

/* -------------------------------------------------------------------------- */
/* Middle column                                                              */
/* -------------------------------------------------------------------------- */

function ScoreCard({ title, value, fill }: { title: string; value: string; fill: number }) {
  return (
    <Panel className="h-[236px] min-w-px flex-1 gap-2.5">
      <PanelHeader title={title} action={ArrowUpRightIcon} actionLabel={`Open ${title}`} />
      <p className="font-display text-[72px] leading-[80px] whitespace-nowrap">{value}</p>
      <Track value={fill} label={title} className="w-[270px]" />
    </Panel>
  )
}

const biomarkers = [
  { code: "RFF", name: "Renal Filtration Factor", value: "2.96" },
  { code: "CF", name: "Cardiometabolic Function", value: "2.72" },
  { code: "MHF", name: "Musculoskeletal Health Factor", value: "5.78" },
  { code: "IMF", name: "Inflammation & Metabolic Factor", value: "4.10" },
  { code: "HGF", name: "Hormonal & Growth Factor", value: "3.35" },
]

function BiomarkersCard() {
  return (
    <Panel className="h-[520px] w-full gap-3.5">
      <PanelHeader title="Biomarkers" action={ArrowUpRightIcon} actionLabel="Open biomarkers" />
      {biomarkers.map((b) => (
        <button key={b.code} type="button" className="flex h-[54px] w-full shrink-0 items-center justify-between text-left">
          <span className="flex flex-col whitespace-nowrap">
            <span className="font-display text-xl leading-6">{b.code}</span>
            <span className="text-[11px] leading-4 text-foreground/60">{b.name}</span>
          </span>
          <span className="flex items-center gap-4">
            <span className="text-sm leading-5 font-medium">{b.value}</span>
            <ChevronRightIcon className="size-5" strokeWidth={1.25} />
          </span>
        </button>
      ))}
      {/* Trend line, tinted with the theme primary */}
      <div
        role="img"
        aria-label="Biomarker trend, rising"
        className="h-[90px] w-[630px] shrink-0 bg-primary"
        style={{
          maskImage: `url(${ASSETS}/patient-dashboard-trend.svg)`,
          maskSize: "630px 90px",
          maskRepeat: "no-repeat",
        }}
      />
    </Panel>
  )
}

/* -------------------------------------------------------------------------- */
/* Right column                                                               */
/* -------------------------------------------------------------------------- */

function NextAppointmentCard() {
  return (
    <Panel className="h-[150px] w-full gap-3.5">
      <PanelHeader title="Next appointment" action={ArrowUpRightIcon} actionLabel="Open appointment" />
      <div className="flex items-center gap-3.5 whitespace-nowrap">
        <div className="flex size-14 shrink-0 flex-col items-center justify-center rounded-[20px] bg-primary text-primary-foreground">
          <span className="text-[22px] leading-6">11</span>
          <span className="text-[10px] leading-3">Dec</span>
        </div>
        <div className="flex flex-col">
          <p className="font-display text-xl leading-6">Follow-up · Wed 11 Dec</p>
          <p className="text-[13px] leading-5 text-foreground/60">10:00 – 10:30 · In clinic</p>
        </div>
      </div>
    </Panel>
  )
}

const carePlan = [
  { icon: LeafIcon, title: "Nutrition & diet", subtitle: "Protein 86 / 120 g today" },
  { icon: PersonStandingIcon, title: "Exercises", subtitle: "4 of 6 sessions this week" },
  { icon: PillIcon, title: "Prescriptions", subtitle: "2 medicines · 3 supplements" },
  { icon: FileTextIcon, title: "Reports", subtitle: "Blood_Test_Report.pdf" },
]

function CarePlanCard() {
  return (
    <Panel className="h-[606px] w-full gap-3">
      <PanelHeader title="Care plan" />
      {carePlan.map((c) => (
        <ListTile key={c.title} {...c} />
      ))}
    </Panel>
  )
}

// Figma: Desktop / Patient dashboard (2011:903)
export default function DoctorPatientDashboard() {
  return (
    <PatientShell eyebrow="Patients" heading="Usha Sethi">
      <ProfileCard />

      <div className="absolute top-[170px] left-[491px] flex w-[690px] flex-col gap-6">
        <div className="flex w-full gap-6">
          <ScoreCard title="Patient risk" value="44%" fill={119 / 270} />
          <ScoreCard title="Form score" value="72" fill={194 / 270} />
        </div>
        <BiomarkersCard />
      </div>

      <div className="absolute top-[170px] left-[1213px] flex w-[660px] flex-col gap-6">
        <NextAppointmentCard />
        <CarePlanCard />
      </div>
    </PatientShell>
  )
}
