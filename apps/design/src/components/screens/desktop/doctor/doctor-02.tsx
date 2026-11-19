import { DoctorShell, PatientsCard } from "./shared"

export const title = "My patients"

// Figma: Slide 16:9 - 20 (1824:9135)
export default function DoctorDesktop02() {
  return (
    <DoctorShell>
      <PatientsCard className="top-[calc(50%+21px)] left-[calc(50%+0.5px)] w-[1827px] -translate-x-1/2 -translate-y-1/2" />
    </DoctorShell>
  )
}
