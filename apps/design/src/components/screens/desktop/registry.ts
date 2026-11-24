import type { ScreenGroup } from "../types"

import { authDesktopScreens } from "./auth"
import { registeredDesktopScreens } from "./registered"
import { onboardingDesktopScreens } from "./onboarding"
import { wearablesDesktopScreens } from "./wearables"
import { bloodTestDesktopScreens } from "./blood-test"
import { homeDesktopScreens } from "./home"
import { doctorAuthDesktopScreens, doctorDesktopScreens } from "./doctor"

/** Section 9 of the Figma "App Design" page (1815:1240): 1920 × 1080 desktop screens. */
export const desktopScreenGroups: ScreenGroup[] = [
  { slug: "desktop-auth", title: "Log in and sign up", screens: authDesktopScreens },
  { slug: "desktop-registered", title: "Already registered", screens: registeredDesktopScreens },
  { slug: "desktop-onboarding", title: "Onboarding", screens: onboardingDesktopScreens },
  { slug: "desktop-wearables", title: "Connect wearables", screens: wearablesDesktopScreens },
  { slug: "desktop-blood-test", title: "Book blood test", screens: bloodTestDesktopScreens },
  { slug: "desktop-home", title: "Home screen", screens: homeDesktopScreens },
  { slug: "desktop-doctor-auth", title: "Doctor · Log in", screens: doctorAuthDesktopScreens },
  { slug: "desktop-doctor", title: "Doctor screen", screens: doctorDesktopScreens },
]
