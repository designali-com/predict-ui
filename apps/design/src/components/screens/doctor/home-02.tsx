import { AppGlow } from "@workspace/ui/predict/app/app-glow"

import { Screen } from "../screen"
import { DoctorGreeting, DoctorNav, WeekDial } from "./shared-d"

export const title = "Home (empty)"

// Figma: iPhone 18 Pro - 188 (1998:6818)
export default function DoctorHome02() {
  return (
    <Screen>
      <AppGlow variant="blob" className="-bottom-[513px]" />
      <WeekDial />
      <DoctorGreeting />
      <DoctorNav />
    </Screen>
  )
}
