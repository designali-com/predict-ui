"use client"

import { Trash2Icon } from "lucide-react"

import { AppButton as Button } from "@workspace/ui/predict/app/app-glass"
import { cn } from "@workspace/ui/lib/utils"

import { Screen } from "../screen"
import {
  DoctorBottomNav,
  DoctorCard,
  DoctorGlow,
  PatientListBody,
  PhotoAvatar,
  doctorPhoto,
  mutedText,
} from "./shared-e"

export const title = "Remove patient"

// Figma: Mobile / Remove patient (2015:1711)
export default function RemovePatient() {
  return (
    <Screen>
      <DoctorGlow />
      <PatientListBody />
      <DoctorBottomNav />

      {/* Scrim */}
      <div aria-hidden className="absolute inset-0 z-20 bg-background/35 backdrop-blur-[10px]" />

      {/* Dialog / Remove patient */}
      <DoctorCard
        role="alertdialog"
        aria-modal
        aria-labelledby="remove-patient-title"
        aria-describedby="remove-patient-desc"
        className="absolute top-[250px] left-[28px] z-30 w-[346px] gap-4 bg-background/96 p-7"
      >
        <div className="flex size-[52px] items-center justify-center rounded-full bg-secondary text-primary dark:text-secondary-foreground">
          <Trash2Icon className="size-6" strokeWidth={1.5} />
        </div>
        <h2 id="remove-patient-title" className="text-[28px] leading-[34px] font-normal tracking-tight whitespace-nowrap">
          Remove patient?
        </h2>
        <div className="flex w-full items-center gap-3 rounded-[22px] bg-secondary/60 px-3.5 py-2.5">
          <PhotoAvatar photo={doctorPhoto} alt="Usha Sethi" size={40} />
          <div className="flex flex-col whitespace-nowrap text-secondary-foreground">
            <p className="text-lg leading-[22px] tracking-tight">Usha Sethi</p>
            <p className="text-xs leading-4 opacity-60">39 · F · 2L · 42 days</p>
          </div>
        </div>
        <p id="remove-patient-desc" className={cn("text-[13px] leading-5", mutedText)}>
          She will be removed from My patients. Reports and prescriptions stay archived for 30 days,
          so you can restore her anytime.
        </p>
        <div className="flex w-full gap-2.5 pt-1">
          <Button
            variant="app-secondary"
            className="h-11 flex-1 border-primary/12 px-[22px] text-sm leading-5 font-normal"
          >
            Cancel
          </Button>
          <Button variant="app" className="h-11 flex-1 gap-1 pr-[22px] pl-[18px] text-sm leading-6 font-normal">
            <Trash2Icon className="size-[18px]" strokeWidth={1.5} />
            Remove
          </Button>
        </div>
      </DoctorCard>
    </Screen>
  )
}
