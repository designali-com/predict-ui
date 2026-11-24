"use client"

import { cn } from "cn"

import {
  ChipFilter,
  DoctorAppShell,
  GlassCard,
  InitialsAvatar,
  PhotoAvatar,
  SearchField,
  patientPhotos,
  type Photo,
} from "./shared-g"

export const title = "Messages"

const threads: {
  name: string
  preview: string
  time: string
  unread?: number
  photo?: Photo
  initials?: string
}[] = [
  { name: "Usha Sethi", preview: "Thank you doctor, I have upl…", time: "09:42", unread: 2, photo: patientPhotos.usha },
  {
    name: "Suresh Sharma",
    preview: "Should I continue the same dose?",
    time: "08:15",
    unread: 1,
    photo: patientPhotos.suresh,
  },
  { name: "Anjali Bansal", preview: "Okay, see you on Friday.", time: "Yesterday", photo: patientPhotos.anjali },
  { name: "Care team", preview: "Priya: Diet plan for Rakesh is up…", time: "Yesterday", initials: "CT" },
  { name: "Vivaan Mehta", preview: "Video link works now 👍", time: "Mon", photo: patientPhotos.vivaan },
  { name: "Neha Kapoor", preview: "Can we move my appointment?", time: "Sun", initials: "NK" },
]

// Figma: Mobile / Messages (2073:903)
export default function Messages() {
  return (
    <DoctorAppShell eyebrow="Dr. Arjun" title="Messages" contentClassName="overflow-hidden">
      <GlassCard className="shrink-0 gap-3 p-[22px]">
        <SearchField placeholder="Search conversations" />
        <ChipFilter options={["All", "Unread 3", "Care team"]} />
      </GlassCard>

      <GlassCard className="min-h-0 flex-1 gap-1 p-3.5">
        {threads.map((t) => (
          <button
            key={t.name}
            type="button"
            className="flex w-full shrink-0 items-center gap-3 rounded-[20px] p-2.5 text-left transition-colors hover:bg-card/60"
          >
            {t.photo ? (
              <PhotoAvatar photo={t.photo} alt={t.name} size={44} />
            ) : (
              <InitialsAvatar initials={t.initials ?? ""} />
            )}
            <span className="flex min-w-0 flex-1 flex-col gap-0.5 leading-[normal] whitespace-nowrap">
              <span className="text-[17px]">{t.name}</span>
              <span className={cn("text-xs", t.unread ? "font-medium" : "text-foreground/60")}>
                {t.preview}
              </span>
            </span>
            <span className="flex shrink-0 flex-col items-end gap-1.5">
              <span className="text-[11px] leading-[normal] whitespace-nowrap text-foreground/60">{t.time}</span>
              {t.unread ? (
                <span className="flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                  {t.unread}
                </span>
              ) : null}
            </span>
          </button>
        ))}
      </GlassCard>
    </DoctorAppShell>
  )
}
