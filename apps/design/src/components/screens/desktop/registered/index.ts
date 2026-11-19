import { desktopScreen, type ScreenEntry } from "../../types"

import * as Registered01 from "./registered-01"
import * as Registered02 from "./registered-02"

export const registeredDesktopScreens: ScreenEntry[] = [
  desktopScreen("desktop-registered-01", "1817:5133", Registered01),
  desktopScreen("desktop-registered-02", "1817:5188", Registered02),
]
