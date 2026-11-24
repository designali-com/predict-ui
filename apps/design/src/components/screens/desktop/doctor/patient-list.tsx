import { DoctorFrame, PatientListContent } from "./shared-h"

export const title = "Patient list"

// Figma: Desktop / Patient list (2009:903)
export default function DoctorPatientList() {
  return (
    <DoctorFrame subtitle="Dr. Arjun Vaidya" title="Patients" tab="patients">
      <PatientListContent />
    </DoctorFrame>
  )
}
