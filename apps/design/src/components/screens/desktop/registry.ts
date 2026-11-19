import type { ScreenGroup } from "../types"

import { authDesktopScreens } from "./auth"
import { registeredDesktopScreens } from "./registered"
import { onboardingDesktopScreens } from "./onboarding"
import { wearablesDesktopScreens } from "./wearables"
import { bloodTestDesktopScreens } from "./blood-test"
import { homeDesktopScreens } from "./home"
import { doctorDesktopScreens } from "./doctor"

/** Section 9 of the Figma "App Design" page (1815:1240): 1920 × 1080 desktop screens. */
export const desktopScreenGroups: ScreenGroup[] = [
  { slug: "desktop-auth", title: "Login & Sign up", screens: authDesktopScreens },
  { slug: "desktop-registered", title: "Already Registered", screens: registeredDesktopScreens },
  { slug: "desktop-onboarding", title: "Onboarding", screens: onboardingDesktopScreens },
  { slug: "desktop-wearables", title: "Connect Wearables", screens: wearablesDesktopScreens },
  { slug: "desktop-blood-test", title: "Book Blood Test", screens: bloodTestDesktopScreens },
  { slug: "desktop-home", title: "Home Screen", screens: homeDesktopScreens },
  { slug: "desktop-doctor", title: "Doctor Screen", screens: doctorDesktopScreens },
]
