import { desktopScreen, type ScreenEntry } from "../../types"

import * as Onboarding01 from "./onboarding-01"
import * as Onboarding02 from "./onboarding-02"
import * as Onboarding03 from "./onboarding-03"
import * as Onboarding04 from "./onboarding-04"

export const onboardingDesktopScreens: ScreenEntry[] = [
  desktopScreen("desktop-onboarding-01", "1817:5250", Onboarding01),
  desktopScreen("desktop-onboarding-02", "1817:5299", Onboarding02),
  desktopScreen("desktop-onboarding-03", "1817:5338", Onboarding03),
  desktopScreen("desktop-onboarding-04", "1817:5358", Onboarding04),
]
