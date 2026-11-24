import { Screen } from "../screen"
import { DoctorBottomNav, DoctorGlow, PatientListBody } from "./shared-e"

export const title = "Patient list"

// Figma: Mobile / Patient list (2015:903)
export default function PatientList() {
  return (
    <Screen>
      <DoctorGlow />
      <PatientListBody />
      <DoctorBottomNav />
    </Screen>
  )
}
