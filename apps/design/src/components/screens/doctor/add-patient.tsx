"use client"

import { CheckIcon, UploadIcon } from "lucide-react"

import { Screen } from "../screen"
import {
  DoctorBottomNav,
  DoctorCard,
  DoctorGlow,
  DoctorHeader,
  FormActions,
  SelectField,
  TextField,
  conditionOptions,
  mutedText,
  planOptions,
  sexOptions,
} from "./shared-e"
import { cn } from "@workspace/ui/lib/utils"

export const title = "Add patient"

// Figma: Mobile / Add patient (2015:1252)
export default function AddPatient() {
  return (
    <Screen>
      <DoctorGlow />
      <DoctorHeader eyebrow="Patients" title="Add patient" />

      {/* Card / New patient */}
      <DoctorCard className="absolute top-[140px] left-[11px] w-[381px]">
        <div className="flex w-full items-center gap-3.5">
          <label
            htmlFor="add-patient-photo"
            className="flex size-16 shrink-0 cursor-pointer items-center justify-center rounded-full border border-foreground/8 bg-secondary text-primary dark:text-secondary-foreground"
          >
            <UploadIcon className="size-6" strokeWidth={1.5} />
            <input id="add-patient-photo" type="file" accept="image/*" className="sr-only" />
          </label>
          <div className="flex flex-col gap-1.5 whitespace-nowrap">
            <p className="text-[22px] leading-[26px] tracking-tight">New patient</p>
            <label htmlFor="add-patient-photo" className={cn("cursor-pointer text-[13px] leading-[18px]", mutedText)}>
              Upload photo
            </label>
          </div>
        </div>

        <TextField id="add-patient-name" label="Full name" placeholder="Enter full name" />
        <div className="flex w-full gap-3">
          <TextField
            id="add-patient-age"
            label="Age"
            placeholder="Years"
            inputMode="numeric"
            className="min-w-0 flex-1"
          />
          <SelectField
            id="add-patient-sex"
            label="Sex"
            placeholder="Select"
            options={sexOptions}
            className="flex-1"
          />
        </div>
        <TextField id="add-patient-phone" label="Phone" type="tel" defaultValue="+91 " />
        <SelectField
          id="add-patient-condition"
          label="Primary condition"
          placeholder="Search condition"
          options={conditionOptions}
        />
        <SelectField
          id="add-patient-plan"
          label="Assigned plan"
          placeholder="Select plan"
          options={planOptions}
        />

        <FormActions primary="Save patient" icon={<CheckIcon className="size-[18px]" strokeWidth={1.5} />} />
      </DoctorCard>

      <DoctorBottomNav />
    </Screen>
  )
}
