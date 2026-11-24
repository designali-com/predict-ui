"use client"

import { Trash2Icon, UploadIcon } from "lucide-react"

import {
  DoctorFrame,
  PanelCard,
  PatientDetailsCard,
  PhotoAvatar,
  photos,
  SecondaryButton,
  SelectField,
  TextField,
} from "./shared-h"

export const title = "Edit patient"

// Figma: Desktop / Edit patient (2010:1658)
export default function DoctorEditPatient() {
  return (
    <DoctorFrame subtitle="Patients" title="Edit patient" tab="patients">
      <PanelCard className="absolute top-[170px] left-[47px] h-[780px] w-[420px] gap-5">
        <h2 className="text-base leading-5">Edit patient</h2>
        <div className="flex flex-col items-center gap-4 py-2.5">
          <PhotoAvatar photo={photos.usha} alt="Usha Sethi" size={140} />
          <p className="font-display text-2xl leading-7">Usha Sethi</p>
          <SecondaryButton>
            <UploadIcon strokeWidth={1.5} />
            Change photo
          </SecondaryButton>
        </div>
        <TextField label="Patient ID" defaultValue="PF-10482" readOnly />
        <SelectField label="Status" placeholder="Select status" value="active" />
        <SelectField label="Assigned plan" placeholder="Select plan" value="2L · 42 days" />
        <div className="flex justify-center pt-2">
          <SecondaryButton>
            <Trash2Icon strokeWidth={1.5} />
            Remove patient
          </SecondaryButton>
        </div>
      </PanelCard>

      <PatientDetailsCard
        meta="Last updated 12 Dec 2026"
        submitLabel="Save changes"
        values={{
          name: "Usha Sethi",
          age: "39",
          sex: "Female",
          phone: "+91 98765 43210",
          email: "usha.sethi@mail.com",
          condition: "Sarcopenia risk",
          bloodGroup: "B+",
          city: "Mumbai",
          referredBy: "Dr. Kavita Iyer",
          nextAppointment: "Wed 11 Dec · 10:00",
          notes:
            "Reports improving muscle strength. Continue current protein plan and review biomarkers in 6 weeks.",
        }}
      />
    </DoctorFrame>
  )
}
