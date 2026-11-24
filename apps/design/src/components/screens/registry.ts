import type { ScreenGroup } from "./types"

import { splashScreens } from "./splash"
import { authScreens } from "./auth"
import { registeredScreens } from "./registered"
import { onboardingScreens } from "./onboarding"
import { wearablesScreens } from "./wearables"
import { uploadReportScreens } from "./upload-report"
import { bloodTestScreens } from "./blood-test"
import { homeScreens } from "./home"
import { doctorAuthScreens, doctorScreens } from "./doctor"

/** Section 8 of the Figma "App Design" page, in reading order. */
export const screenGroups: ScreenGroup[] = [
  { slug: "splash", title: "Splash", screens: splashScreens },
  { slug: "auth", title: "Log in and sign up", screens: authScreens },
  { slug: "registered", title: "Already registered", screens: registeredScreens },
  { slug: "onboarding", title: "Onboarding", screens: onboardingScreens },
  { slug: "wearables", title: "Connect wearables", screens: wearablesScreens },
  { slug: "upload-report", title: "Upload report", screens: uploadReportScreens },
  { slug: "blood-test", title: "Book blood test", screens: bloodTestScreens },
  { slug: "home", title: "Home screen", screens: homeScreens },
  { slug: "doctor-auth", title: "Doctor · Log in", screens: doctorAuthScreens },
  { slug: "doctor", title: "Doctor screen", screens: doctorScreens },
]
