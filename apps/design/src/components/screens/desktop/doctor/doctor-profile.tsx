"use client"

import * as React from "react"
import { BellIcon, CalendarIcon, LockIcon, LogOutIcon, PencilIcon } from "lucide-react"
import { cn } from "cn"

import { Avatar } from "./shared"
import { InfoRow, ListTile, Panel, PanelHeader, PatientShell, Tag, portrait } from "./shared-i"

export const title = "Doctor profile"

/* -------------------------------------------------------------------------- */
/* Profile                                                                    */
/* -------------------------------------------------------------------------- */

const details = [
  { label: "Clinic", value: "Predict Care, Bandra, Mumbai" },
  { label: "Phone", value: "+91 98200 11234" },
  { label: "Email", value: "doctor@predictc.fit" },
  { label: "Languages", value: "English, Hindi, Marathi" },
]

function ProfileCard() {
  return (
    <Panel className="absolute top-[170px] left-[47px] h-[780px] w-[520px] gap-5">
      <PanelHeader title="Profile" action={PencilIcon} actionLabel="Edit profile" />
      <div className="flex w-full flex-col items-center gap-3 py-2.5">
        <Avatar
          photo={portrait}
          alt="Dr. Arjun Vaidya"
          className="size-[120px] [&>div]:top-[-4px] [&>div]:left-[-4px] [&>div]:h-[128px] [&>div]:w-[130px]"
        />
        <p className="font-display text-[32px] leading-[38px] whitespace-nowrap">Dr. Arjun Vaidya</p>
        <p className="text-sm leading-5 whitespace-nowrap text-foreground/60">
          Sports &amp; Musculoskeletal Medicine
        </p>
        <div className="flex gap-2">
          <Tag>MD · 14 yrs</Tag>
          <Tag>Reg. MH-48217</Tag>
        </div>
      </div>
      {details.map((d) => (
        <InfoRow key={d.label} {...d} />
      ))}
    </Panel>
  )
}

/* -------------------------------------------------------------------------- */
/* Stats + availability                                                       */
/* -------------------------------------------------------------------------- */

const stats = [
  { label: "Total patients", value: "56" },
  { label: "Total reports", value: "88" },
  { label: "Years active", value: "14" },
]

const availability = [
  { day: "Mon", hours: "09:00 – 13:00", mode: "Clinic" },
  { day: "Tue", hours: "10:00 – 16:00", mode: "Clinic" },
  { day: "Wed", hours: "09:00 – 13:00", mode: "Clinic" },
  { day: "Thu", hours: "14:00 – 18:00", mode: "Video" },
  { day: "Fri", hours: "09:00 – 12:00", mode: "Video" },
]

function AvailabilityCard() {
  const [selected, setSelected] = React.useState("Wed")
  return (
    <Panel className="h-[606px] w-full gap-4">
      <PanelHeader title="Weekly availability" action={PencilIcon} actionLabel="Edit availability" />
      {availability.map((a) => {
        const on = a.day === selected
        return (
          <button
            key={a.day}
            type="button"
            aria-pressed={on}
            onClick={() => setSelected(a.day)}
            className={cn(
              "flex h-[62px] w-full shrink-0 items-center justify-between rounded-full px-[22px] whitespace-nowrap transition-colors",
              on ? "bg-primary text-primary-foreground" : "bg-secondary/80 text-foreground"
            )}
          >
            <span className="w-[60px] text-left font-display text-xl leading-6">{a.day}</span>
            <span className="text-sm leading-5">{a.hours}</span>
            <span className="w-[60px] text-right text-[13px] leading-[18px]">{a.mode}</span>
          </button>
        )
      })}
    </Panel>
  )
}

/* -------------------------------------------------------------------------- */
/* Account settings                                                           */
/* -------------------------------------------------------------------------- */

const settings = [
  { icon: PencilIcon, title: "Edit profile" },
  { icon: BellIcon, title: "Notifications" },
  { icon: LockIcon, title: "Privacy & security" },
  { icon: CalendarIcon, title: "Linked clinics" },
  { icon: LogOutIcon, title: "Log out" },
]

function AccountCard() {
  return (
    <Panel className="absolute top-[170px] left-[1255px] h-[780px] w-[618px] gap-3.5">
      <PanelHeader title="Account" />
      {settings.map((s) => (
        <ListTile
          key={s.title}
          icon={s.icon}
          iconDisc={44}
          iconSize={20}
          title={s.title}
          className="h-[84px]"
          titleClassName="text-xl leading-6"
        />
      ))}
    </Panel>
  )
}

// Figma: Desktop / Doctor profile (2011:2081)
export default function DoctorProfile() {
  return (
    <PatientShell eyebrow="Doctor profile" heading="Dr. Arjun Vaidya" active="today">
      <ProfileCard />

      <div className="absolute top-[170px] left-[591px] flex w-[640px] flex-col gap-6">
        <div className="flex w-full gap-6">
          {stats.map((s) => (
            <Panel key={s.label} className="h-[150px] min-w-px flex-1 gap-2 p-[26px]">
              <p className="text-[15px] leading-5 whitespace-nowrap">{s.label}</p>
              <p className="font-display text-5xl leading-[56px] whitespace-nowrap">{s.value}</p>
            </Panel>
          ))}
        </div>
        <AvailabilityCard />
      </div>

      <AccountCard />
    </PatientShell>
  )
}
