import { BellIcon, ChevronRightIcon, LockIcon, PencilIcon } from "lucide-react"

import { AppCard } from "@workspace/ui/predict/app/app-card"

import { DoctorAppShell, DoctorAvatar, DoctorCard, DoctorCardHeader, IconDisc, ListItem, Tag } from "./shared-f"

export const title = "Doctor profile"

const stats = [
  { label: "Patients", value: "56" },
  { label: "Reports", value: "88" },
  { label: "Years", value: "14" },
]

const account = [
  { label: "Edit profile", Icon: PencilIcon },
  { label: "Notifications", Icon: BellIcon },
  { label: "Privacy & security", Icon: LockIcon },
]

// Figma: Mobile / Doctor profile (2016:1400)
export default function DoctorProfile() {
  return (
    <DoctorAppShell eyebrow="Doctor profile" title="Dr. Arjun">
      {/* Identity */}
      <DoctorCard className="items-center gap-2">
        <DoctorAvatar size={90} />
        <p className="text-[26px] leading-[30px] whitespace-nowrap">Dr. Arjun Vaidya</p>
        <p className="text-[13px] leading-[18px] whitespace-nowrap text-foreground/60">
          Sports &amp; Musculoskeletal Medicine
        </p>
        <div className="flex gap-1.5">
          <Tag>MD · 14 yrs</Tag>
          <Tag>Reg. MH-48217</Tag>
        </div>
      </DoctorCard>

      {/* Stats */}
      <div className="flex gap-2.5">
        {stats.map((s) => (
          <AppCard
            key={s.label}
            className="min-w-0 flex-1 gap-0.5 rounded-[40px] p-[18px] shadow-[inset_0_0_30px_rgba(66,0,128,0.2)] dark:shadow-[inset_0_0_30px_rgba(235,230,254,0.15)]"
          >
            <p className="text-[13px] leading-[18px]">{s.label}</p>
            <p className="text-[34px] leading-10">{s.value}</p>
          </AppCard>
        ))}
      </div>

      {/* Account */}
      <DoctorCard className="gap-2.5">
        <DoctorCardHeader title="Account" />
        {account.map(({ label, Icon }) => (
          <button key={label} type="button" className="w-full text-left">
            <ListItem
              icon={
                <IconDisc size={36}>
                  <Icon className="size-[18px]" strokeWidth={1.5} />
                </IconDisc>
              }
              title={label}
              titleClassName="text-[19px] leading-[22px]"
              trailing={<ChevronRightIcon className="size-[18px] shrink-0" strokeWidth={1.5} />}
            />
          </button>
        ))}
      </DoctorCard>
    </DoctorAppShell>
  )
}
