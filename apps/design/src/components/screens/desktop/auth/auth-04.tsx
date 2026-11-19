import { AppGlow } from "@workspace/ui/predict/app/app-glow"
import { PredictMark } from "@workspace/ui/predict/logo"

import { DesktopScreen } from "../desktop-screen"

export const title = "Launch"

// Figma: Slide 16:9 - 5 (1817:4644)
export default function AuthDesktop04() {
  return (
    <DesktopScreen className="items-center justify-center">
      <AppGlow variant="fade" className="h-[289px] mix-blend-multiply dark:mix-blend-normal" />
      <PredictMark aria-label="PREDICT" className="relative h-[107.5px] w-24 text-app-accent" />
    </DesktopScreen>
  )
}
