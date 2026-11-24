"use client"

import { CheckIcon, Trash2Icon } from "lucide-react"

import { Screen } from "../screen"
import {
  DoctorBottomNav,
  DoctorCard,
  DoctorGlow,
  DoctorHeader,
  FormActions,
  PhotoAvatar,
  SelectField,
  TextField,
  conditionOptions,
  doctorPhoto,
  mutedText,
  planOptions,
  sexOptions,
} from "./shared-e"
import { cn } from "@workspace/ui/lib/utils"

export const title = "Edit patient"

// Figma: Mobile / Edit patient (2015:1479)
export default function EditPatient() {
  return (
    <Screen>
      <DoctorGlow />
      <DoctorHeader eyebrow="Patients" title="Edit patient" />

      {/* Card / Edit patient */}
      <DoctorCard className="absolute top-[140px] left-[11px] w-[381px]">
        <div className="flex w-full items-center gap-3.5">
          <PhotoAvatar photo={doctorPhoto} alt="Usha Sethi" size={64} />
          <div className="flex flex-col gap-1.5 whitespace-nowrap">
            <p className="text-[22px] leading-[26px] tracking-tight">Usha Sethi</p>
            <label htmlFor="edit-patient-photo" className={cn("cursor-pointer text-[13px] leading-[18px]", mutedText)}>
              Change photo
              <input id="edit-patient-photo" type="file" accept="image/*" className="sr-only" />
            </label>
          </div>
        </div>

        <TextField id="edit-patient-name" label="Full name" defaultValue="Usha Sethi" />
        <div className="flex w-full gap-3">
          <TextField
            id="edit-patient-age"
            label="Age"
            defaultValue="39"
            inputMode="numeric"
            className="min-w-0 flex-1"
          />
          <SelectField
            id="edit-patient-sex"
            label="Sex"
            placeholder="Select"
            options={sexOptions}
            defaultValue="Female"
            className="flex-1"
          />
        </div>
        <TextField id="edit-patient-phone" label="Phone" type="tel" defaultValue="+91 98765 43210" />
        <SelectField
          id="edit-patient-condition"
          label="Primary condition"
          placeholder="Search condition"
          options={conditionOptions}
          defaultValue="Sarcopenia risk"
        />
        <SelectField
          id="edit-patient-plan"
          label="Assigned plan"
          placeholder="Select plan"
          options={planOptions}
          defaultValue="2L · 42 days"
        />

        <FormActions primary="Save changes" icon={<CheckIcon className="size-[18px]" strokeWidth={1.5} />} />

        <div className="flex w-full justify-center pt-0.5">
          <button
            type="button"
            className="flex items-center gap-1.5 text-[13px] leading-5 text-primary dark:text-secondary"
          >
            <Trash2Icon className="size-4" strokeWidth={1.5} />
            Remove patient
          </button>
        </div>
      </DoctorCard>

      <DoctorBottomNav />
    </Screen>
  )
}
