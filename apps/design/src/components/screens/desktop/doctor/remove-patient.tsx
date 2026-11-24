"use client"

import { Trash2Icon } from "lucide-react"

import {
  DoctorFrame,
  PatientListContent,
  PhotoAvatar,
  photos,
  PrimaryButton,
  SecondaryButton,
} from "./shared-h"

export const title = "Remove patient"

function RemovePatientDialog() {
  return (
    <>
      {/* Scrim */}
      <div aria-hidden className="absolute inset-0 z-20 bg-background/35 backdrop-blur-[10px]" />

      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="remove-patient-title"
        aria-describedby="remove-patient-desc"
        className="absolute top-1/2 left-1/2 z-30 flex w-[560px] -translate-x-1/2 -translate-y-1/2 flex-col items-start gap-5 overflow-hidden rounded-[40px] bg-card/96 p-9 text-foreground shadow-[inset_0_0_30px_rgba(66,0,128,0.2)]"
      >
        <div className="flex size-14 items-center justify-center rounded-full bg-secondary text-primary dark:text-secondary-foreground">
          <Trash2Icon className="size-[26px]" strokeWidth={1.5} />
        </div>
        <h2 id="remove-patient-title" className="font-display text-[32px] leading-[38px] font-normal">
          Remove patient?
        </h2>
        <div className="flex w-full items-center gap-3.5 rounded-[24px] bg-secondary/60 px-4 py-3">
          <PhotoAvatar photo={photos.usha} alt="" size={44} />
          <div className="flex flex-col whitespace-nowrap">
            <p className="font-display text-xl leading-6">Usha Sethi</p>
            <p className="text-[13px] leading-[18px] text-foreground/60">39 · F · 2L · 42 days</p>
          </div>
        </div>
        <p id="remove-patient-desc" className="text-sm leading-[22px] text-foreground/60">
          She will be removed from My patients and will no longer receive plan updates. Her reports and
          prescriptions stay archived for 30 days, so you can restore her anytime in that window.
        </p>
        <div className="flex w-full justify-end gap-3 pt-2">
          <SecondaryButton>Cancel</SecondaryButton>
          <PrimaryButton>
            <Trash2Icon strokeWidth={1.5} />
            Remove patient
          </PrimaryButton>
        </div>
      </div>
    </>
  )
}

// Figma: Desktop / Remove patient (2010:2418)
export default function DoctorRemovePatient() {
  return (
    <DoctorFrame
      subtitle="Dr. Arjun Vaidya"
      title="Patients"
      tab="patients"
      overlay={<RemovePatientDialog />}
    >
      <PatientListContent />
    </DoctorFrame>
  )
}
