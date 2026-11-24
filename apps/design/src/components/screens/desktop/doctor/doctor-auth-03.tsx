import { AppGlow } from "@workspace/ui/predict/app/app-glow"
import { PredictMark } from "@workspace/ui/predict/logo"

import { DesktopScreen } from "../desktop-screen"

export const title = "Doctor splash"

// Figma: Slide 16:9 - 53 (1993:4703)
export default function DoctorAuth03() {
  return (
    <DesktopScreen className="items-center justify-center">
      <AppGlow variant="fade" className="h-[289px]" />
      <PredictMark
        role="img"
        aria-label="PREDICT"
        className="relative h-[107.54px] w-[96px] text-primary dark:text-foreground"
      />
    </DesktopScreen>
  )
}
