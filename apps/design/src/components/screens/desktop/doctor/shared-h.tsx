"use client"

import * as React from "react"
import {
  ArrowUpRightIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  FilterIcon,
  GripIcon,
  PencilIcon,
  PlusIcon,
  SearchIcon,
  Trash2Icon,
  UsersIcon,
} from "lucide-react"
import { cn } from "cn"

import {
  AppButton as Button,
  AppGlassBar,
  AppGlassCircle,
} from "@workspace/ui/predict/app/app-glass"
import { Input } from "@workspace/ui/components/input"
import { AppCard } from "@workspace/ui/predict/app/app-card"
import { PredictMark } from "@workspace/ui/predict/logo"

import { DesktopScreen } from "../desktop-screen"

/**
 * Helpers for the doctor desktop screens doctor-03, patient-list, add-patient,
 * edit-patient and remove-patient (the "Dr. Arjun Vaidya" set). They differ
 * from `DoctorShell` in shared.tsx by a configurable header, a two-tab nav
 * (Today · Patients) and an optional week strip.
 */

const ASSETS = "/screens/desktop/doctor"

/* -------------------------------------------------------------------------- */
/* Photos & avatars                                                           */
/* -------------------------------------------------------------------------- */

export interface Photo {
  src: string
  /** Crop of the photo layer inside the circle (Figma fill transform). */
  crop?: React.CSSProperties
}

export const photos = {
  usha: {
    src: "/screens/shared/avatar.png",
    crop: { height: "242.19%", width: "133.91%", left: "-23.11%", top: "-29.69%" },
  },
  suresh: {
    src: `${ASSETS}/doctor-01-patient-suresh.png`,
    crop: { height: "135.37%", width: "100%", left: 0, top: "-7.03%" },
  },
  anjali: { src: `${ASSETS}/doctor-01-patient-anjali.png` },
  vivaan: { src: `${ASSETS}/doctor-01-patient-vivaan.png` },
} satisfies Record<string, Photo>

/**
 * Round photo on a lavender, outlined disc. The photo layer is ~108% of the
 * circle and offset by 1/30 of its size, as in Figma ("image 2712").
 */
export function PhotoAvatar({
  photo,
  alt,
  size,
  className,
}: {
  photo: Photo
  alt: string
  size: number
  className?: string
}) {
  const inset = size / 30
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
        style={{ top: -inset, left: -inset, width: (size * 65) / 60, height: (size * 64) / 60 }}
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

/** Lavender disc with initials, used for patients without a photo. */
export function InitialsAvatar({ name, className }: { name: string; className?: string }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
  return (
    <div
      aria-hidden
      className={cn(
        "flex size-12 shrink-0 items-center justify-center rounded-full border border-foreground/8 bg-secondary text-[17px] leading-6 text-secondary-foreground",
        className
      )}
    >
      {initials}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Cards                                                                      */
/* -------------------------------------------------------------------------- */

/** Frosted 40px-radius card ("Card / …" frames on the patient screens). */
export function PanelCard({ className, ...props }: React.ComponentProps<typeof AppCard>) {
  return <AppCard className={cn("gap-0 rounded-[40px] p-[30px]", className)} {...props} />
}

/** Small summary card: label + ↗ and a large count. */
export function CountCard({ title, value }: { title: string; value: string }) {
  return (
    <PanelCard className="h-[140px] gap-2.5">
      <div className="flex items-center justify-between">
        <p className="text-base leading-5">{title}</p>
        <button type="button" aria-label={`Open ${title}`}>
          <ArrowUpRightIcon className="size-6" strokeWidth={1} />
        </button>
      </div>
      <p className="font-display text-5xl leading-[56px]">{value}</p>
    </PanelCard>
  )
}

/* -------------------------------------------------------------------------- */
/* Week strip                                                                 */
/* -------------------------------------------------------------------------- */

const dayPill =
  "absolute top-[183px] flex h-8 min-w-8 -translate-x-1/2 items-center justify-center rounded-full bg-secondary text-[10.5px] leading-[21px] text-secondary-foreground"

function WeekStrip({ date }: { date: string }) {
  return (
    <>
      <div aria-hidden className="absolute top-[198px] left-0 h-[2px] w-[959px] bg-primary" />
      <div
        aria-hidden
        className="absolute top-[224px] left-0 h-[50px] w-full bg-foreground"
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
      <div className={cn(dayPill, "left-[961px] px-5 whitespace-nowrap")}>{date}</div>
    </>
  )
}

/* -------------------------------------------------------------------------- */
/* Bottom nav                                                                 */
/* -------------------------------------------------------------------------- */

export type DoctorTab = "today" | "patients"

/** Menu · [Today | Patients] · PREDICT assistant. */
function DoctorNav({ initial }: { initial: DoctorTab }) {
  const [active, setActive] = React.useState<DoctorTab>(initial)
  const tabs: { id: DoctorTab; label: string; icon: React.ReactNode }[] = [
    {
      id: "today",
      label: "Today",
      icon: (
        <ClockIcon
          className={cn("size-5 shrink-0", active === "today" && "fill-primary-foreground stroke-primary")}
          strokeWidth={active === "today" ? 2 : 1}
        />
      ),
    },
    { id: "patients", label: "Patients", icon: <UsersIcon className="size-5 shrink-0" strokeWidth={1} /> },
  ]

  return (
    <nav className="absolute top-[979px] left-1/2 z-10 flex -translate-x-1/2 items-center gap-1 px-px">
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

/* -------------------------------------------------------------------------- */
/* Frame                                                                      */
/* -------------------------------------------------------------------------- */

/**
 * 1920 × 1080 doctor frame: violet wash, PREDICT button, centred
 * subtitle/title, the doctor's avatar, an optional week strip and the nav.
 * `overlay` renders above everything (dialogs).
 */
export function DoctorFrame({
  subtitle,
  title,
  tab,
  weekDate,
  overlay,
  children,
}: {
  subtitle: string
  title: string
  tab: DoctorTab
  weekDate?: string
  overlay?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <DesktopScreen>
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 h-[289px] w-[1920px] bg-gradient-to-t from-primary to-transparent mix-blend-multiply blur-[0.5px] dark:mix-blend-normal"
      />

      {weekDate && <WeekStrip date={weekDate} />}

      {children}

      <AppGlassCircle
        tone="primary"
        aria-label="PREDICT"
        className="absolute top-[43px] left-[47px]"
      >
        <PredictMark className="h-[20.166px] w-[18px]" />
      </AppGlassCircle>

      <div className="absolute top-[51px] left-1/2 flex -translate-x-1/2 flex-col items-center text-center whitespace-nowrap">
        <p className="font-display text-base leading-[19px]">{subtitle}</p>
        <h1 className="mt-[7px] font-display text-4xl leading-normal font-normal">{title}</h1>
      </div>

      <PhotoAvatar
        photo={photos.usha}
        alt="Dr. Arjun Vaidya"
        size={60}
        className="absolute top-[43px] left-[1811px]"
      />

      <DoctorNav initial={tab} />

      {overlay}
    </DesktopScreen>
  )
}

/* -------------------------------------------------------------------------- */
/* Buttons                                                                    */
/* -------------------------------------------------------------------------- */

/** 44px lavender pill ("Button | Secondary"). */
export function SecondaryButton({ className, ...props }: React.ComponentProps<typeof Button>) {
  return (
    <Button
      variant="app-secondary"
      className={cn("h-11 gap-1.5 border-primary/12 px-[22px] text-sm leading-5 [&_svg]:size-[18px]", className)}
      {...props}
    />
  )
}

/** 44px violet pill ("Button | Primary"). */
export function PrimaryButton({ className, ...props }: React.ComponentProps<typeof Button>) {
  return (
    <Button
      variant="app"
      className={cn("h-11 gap-1 pr-[22px] pl-5 text-sm leading-6 [&_svg]:size-[18px]", className)}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/* Form fields                                                                */
/* -------------------------------------------------------------------------- */

const fieldBox =
  "h-11 w-full rounded-full border border-foreground/8 bg-card/70 px-[18px] text-sm leading-5 text-foreground"

function FieldLabel({ htmlFor, children }: { htmlFor?: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="text-xs leading-4 text-foreground/60">
      {children}
    </label>
  )
}

/** Label + pill text input. */
export function TextField({
  label,
  className,
  ...props
}: { label: string } & Omit<React.ComponentProps<typeof Input>, "size">) {
  const id = React.useId()
  return (
    <div className={cn("flex min-w-0 flex-1 flex-col gap-2", className)}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Input
        id={id}
        className={cn(fieldBox, "placeholder:text-foreground/60 md:text-sm")}
        {...props}
      />
    </div>
  )
}

/** Label + pill select trigger with a chevron. */
export function SelectField({
  label,
  value,
  placeholder,
  className,
}: {
  label: string
  value?: string
  placeholder: string
  className?: string
}) {
  const id = React.useId()
  return (
    <div className={cn("flex min-w-0 flex-1 flex-col gap-2", className)}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <button
        id={id}
        type="button"
        aria-haspopup="listbox"
        className={cn(
          fieldBox,
          "flex items-center justify-between text-left outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30",
          !value && "text-foreground/60"
        )}
      >
        <span className="truncate">{value ?? placeholder}</span>
        <ChevronDownIcon className="size-[18px] shrink-0 text-foreground" strokeWidth={1.5} />
      </button>
    </div>
  )
}

/** Label + rounded multi-line notes field. */
export function NotesField({
  label,
  ...props
}: { label: string } & React.ComponentProps<"textarea">) {
  const id = React.useId()
  return (
    <div className="flex flex-col gap-2">
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <textarea
        id={id}
        className="h-[120px] w-full resize-none rounded-[24px] border border-foreground/8 bg-card/70 px-[18px] pt-3.5 text-sm leading-5 text-foreground outline-none placeholder:text-foreground/60 focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
        {...props}
      />
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Patient form (Add / Edit patient)                                          */
/* -------------------------------------------------------------------------- */

export interface PatientFormValues {
  name?: string
  age?: string
  sex?: string
  phone?: string
  email?: string
  condition?: string
  bloodGroup?: string
  city?: string
  referredBy?: string
  nextAppointment?: string
  notes?: string
}

/** "Card / Patient details": the 4-row form + notes + actions. */
export function PatientDetailsCard({
  values,
  meta,
  submitLabel,
}: {
  values: PatientFormValues
  meta: string
  submitLabel: string
}) {
  return (
    <PanelCard className="absolute top-[170px] left-[491px] h-[780px] w-[1382px] gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-base leading-5">Patient details</h2>
        <p className="text-xs leading-4 text-foreground/60">{meta}</p>
      </div>
      <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
        <div className="flex gap-5">
          <TextField label="Full name" placeholder="Enter full name" defaultValue={values.name} />
          <TextField label="Age" placeholder="Years" inputMode="numeric" defaultValue={values.age} />
          <SelectField label="Sex" placeholder="Select" value={values.sex} />
        </div>
        <div className="flex gap-5">
          <TextField label="Phone" type="tel" placeholder="+91" defaultValue={values.phone} />
          <TextField label="Email" type="email" placeholder="name@email.com" defaultValue={values.email} />
        </div>
        <div className="flex gap-5">
          <SelectField label="Primary condition" placeholder="Search condition" value={values.condition} />
          <SelectField label="Blood group" placeholder="Select" value={values.bloodGroup} />
          <TextField label="City" placeholder="City" defaultValue={values.city} />
        </div>
        <div className="flex gap-5">
          <TextField label="Referred by" placeholder="Doctor name" defaultValue={values.referredBy} />
          <SelectField label="Next appointment" placeholder="Pick date" value={values.nextAppointment} />
        </div>
        <NotesField
          label="Clinical notes"
          placeholder="Add history, allergies or anything the care team should know"
          defaultValue={values.notes}
        />
        <div className="flex justify-end gap-3 pt-1">
          <SecondaryButton type="button">Cancel</SecondaryButton>
          <PrimaryButton type="submit">
            <CheckIcon strokeWidth={1.5} />
            {submitLabel}
          </PrimaryButton>
        </div>
      </form>
    </PanelCard>
  )
}

/* -------------------------------------------------------------------------- */
/* Patient list (Patient list / Remove patient)                               */
/* -------------------------------------------------------------------------- */

interface PatientRow {
  name: string
  photo?: Photo
  age: string
  status: string
  plan: string
  lastVisit: string
  risk: string
}

const patientRows: PatientRow[] = [
  { name: "Usha Sethi", photo: photos.usha, age: "39 · F", status: "active", plan: "2L · 42 days", lastVisit: "Today", risk: "44%" },
  { name: "Suresh Sharma", photo: photos.suresh, age: "52 · M", status: "active", plan: "4L · 21 days", lastVisit: "Yesterday", risk: "38%" },
  { name: "Anjali Bansal", photo: photos.anjali, age: "48 · F", status: "Medicine", plan: "2L · 42 days", lastVisit: "2 days ago", risk: "51%" },
  { name: "Vivaan Mehta", photo: photos.vivaan, age: "35 · M", status: "completed", plan: "4L · 21 days", lastVisit: "1 week ago", risk: "22%" },
  { name: "Rakesh Kumar", age: "61 · M", status: "active", plan: "2L · 30 days", lastVisit: "Today", risk: "47%" },
  { name: "Neha Kapoor", age: "44 · F", status: "Medicine", plan: "4L · 14 days", lastVisit: "3 days ago", risk: "33%" },
  { name: "Ankit Joshi", age: "29 · M", status: "active", plan: "2L · 42 days", lastVisit: "Yesterday", risk: "18%" },
  { name: "Rajeev Verma", age: "57 · M", status: "active", plan: "4L · 28 days", lastVisit: "5 days ago", risk: "56%" },
]

const statusSplit = [
  { label: "Active", value: 38, fill: 182 },
  { label: "Medicine", value: 12, fill: 56 },
  { label: "Completed", value: 6, fill: 29 },
]

function SummaryColumn() {
  return (
    <div className="absolute top-[170px] left-[47px] flex w-[330px] flex-col gap-6">
      <CountCard title="All patients" value="56" />
      <CountCard title="Active" value="38" />
      <CountCard title="New this month" value="6" />
      <PanelCard className="h-[288px] gap-[18px]">
        <p className="text-base leading-5">By status</p>
        {statusSplit.map((s) => (
          <div key={s.label} className="flex flex-col gap-2">
            <div className="flex justify-between text-sm leading-5">
              <span>{s.label}</span>
              <span>{s.value}</span>
            </div>
            <div
              role="meter"
              aria-label={s.label}
              aria-valuenow={s.value}
              aria-valuemin={0}
              aria-valuemax={56}
              className="h-2.5 w-full overflow-hidden rounded-full bg-secondary"
            >
              <div className="h-full rounded-full bg-primary" style={{ width: s.fill }} />
            </div>
          </div>
        ))}
      </PanelCard>
    </div>
  )
}

const filters = ["All 56", "Active 38", "Medicine 12", "Completed 6"]
const pages = ["1", "2", "3", "…", "7"]

/** Column widths (Figma): Patient · Age · Status · Plan · Last visit · Risk · Actions. */
const cols = ["w-[340px]", "w-[110px]", "w-[150px]", "w-[170px]", "w-[170px]", "w-[130px]"]

function MyPatientsCard() {
  const [filter, setFilter] = React.useState(filters[0])
  const [page, setPage] = React.useState("1")

  return (
    <PanelCard className="absolute top-[170px] left-[401px] h-[780px] w-[1472px] gap-5">
      <div className="flex items-center justify-between">
        <h2 className="text-base leading-5">My patients</h2>
        <PrimaryButton className="pr-[22px] pl-[18px]">
          <PlusIcon strokeWidth={1.5} />
          Add new
        </PrimaryButton>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative w-[380px]">
          <SearchIcon
            className="pointer-events-none absolute top-1/2 left-[18px] size-[18px] -translate-y-1/2 text-foreground"
            strokeWidth={1.5}
          />
          <Input
            type="search"
            aria-label="Search patients"
            placeholder="Search by name, ID or condition"
            className={cn(fieldBox, "pl-[46px] placeholder:text-foreground/60 md:text-sm")}
          />
        </div>
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={cn(
              "h-9 rounded-full px-4 text-[13px] leading-[18px] whitespace-nowrap transition-colors",
              filter === f ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
            )}
          >
            {f}
          </button>
        ))}
        <div className="flex-1" />
        <button
          type="button"
          className="flex h-9 items-center gap-1.5 rounded-full bg-secondary px-3.5 text-[13px] leading-[18px] text-secondary-foreground"
        >
          <FilterIcon className="size-4" strokeWidth={1.5} />
          Filters
        </button>
      </div>

      <div className="flex items-center text-xs leading-4 text-foreground/60">
        {["Patient", "Age · Sex", "Status", "Plan", "Last visit", "Risk"].map((h, i) => (
          <p key={h} className={cols[i]}>
            {h}
          </p>
        ))}
        <p className="flex-1 text-right">Actions</p>
      </div>

      <ul className="flex flex-col gap-2">
        {patientRows.map((p) => (
          <li key={p.name} className="flex h-[52px] items-center text-sm leading-6">
            <div className={cn(cols[0], "flex items-center gap-3.5")}>
              {p.photo ? <PhotoAvatar photo={p.photo} alt="" size={48} /> : <InitialsAvatar name={p.name} />}
              <p className="font-display text-[21px] leading-6 whitespace-nowrap">{p.name}</p>
            </div>
            <p className={cols[1]}>{p.age}</p>
            <div className={cols[2]}>
              <span className="inline-flex h-6 items-center rounded-[40px] bg-secondary px-3 text-xs leading-4 text-secondary-foreground">
                {p.status}
              </span>
            </div>
            <p className={cols[3]}>{p.plan}</p>
            <p className={cols[4]}>{p.lastVisit}</p>
            <p className={cols[5]}>{p.risk}</p>
            <div className="flex flex-1 items-center justify-end gap-[18px]">
              <button type="button" aria-label={`Edit ${p.name}`}>
                <PencilIcon className="size-5" strokeWidth={1.5} />
              </button>
              <button type="button" aria-label={`Remove ${p.name}`}>
                <Trash2Icon className="size-5" strokeWidth={1.5} />
              </button>
              <button type="button" aria-label={`Open ${p.name}`}>
                <ChevronRightIcon className="size-5" strokeWidth={1.5} />
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between">
        <p className="text-[13px] leading-[18px] text-foreground/60">Showing 1–8 of 56</p>
        <nav aria-label="Pagination" className="flex gap-2">
          {pages.map((n) => (
            <button
              key={n}
              type="button"
              disabled={n === "…"}
              aria-current={page === n ? "page" : undefined}
              onClick={() => setPage(n)}
              className={cn(
                "flex size-8 items-center justify-center rounded-full text-[13px] leading-[18px]",
                page === n ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
              )}
            >
              {n}
            </button>
          ))}
        </nav>
      </div>
    </PanelCard>
  )
}

/** Summary column + "My patients" table of the Patients screen. */
export function PatientListContent() {
  return (
    <>
      <SummaryColumn />
      <MyPatientsCard />
    </>
  )
}
