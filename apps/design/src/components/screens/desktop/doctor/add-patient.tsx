import { UploadIcon } from "lucide-react"

import { DoctorFrame, PanelCard, PatientDetailsCard, SecondaryButton, SelectField, TextField } from "./shared-h"

export const title = "Add patient"

// Figma: Desktop / Add patient (2010:903)
export default function DoctorAddPatient() {
  return (
    <DoctorFrame subtitle="Patients" title="Add patient" tab="patients">
      <PanelCard className="absolute top-[170px] left-[47px] h-[780px] w-[420px] gap-5">
        <h2 className="text-base leading-5">New patient</h2>
        <div className="flex flex-col items-center gap-4 py-2.5">
          <button
            type="button"
            aria-label="Upload a photo"
            className="flex size-[140px] items-center justify-center rounded-full border border-foreground/8 bg-secondary text-primary dark:text-secondary-foreground"
          >
            <UploadIcon className="size-9" strokeWidth={1.5} />
          </button>
          <p className="font-display text-xl leading-6">Add a photo</p>
          <SecondaryButton>
            <UploadIcon strokeWidth={1.5} />
            Upload photo
          </SecondaryButton>
        </div>
        <TextField label="Patient ID" defaultValue="Auto-generated" readOnly />
        <SelectField label="Status" placeholder="Select status" />
        <SelectField label="Assigned plan" placeholder="Select plan" />
      </PanelCard>

      <PatientDetailsCard values={{}} meta="All fields marked are required" submitLabel="Save patient" />
    </DoctorFrame>
  )
}
