import { desktopScreen, type ScreenEntry } from "../../types"

import * as Auth01 from "./auth-01"
import * as Auth02 from "./auth-02"
import * as Auth03 from "./auth-03"
import * as Auth04 from "./auth-04"
import * as Auth05 from "./auth-05"
import * as Auth06 from "./auth-06"

export const authDesktopScreens: ScreenEntry[] = [
  desktopScreen("desktop-auth-01", "1815:4073", Auth01),
  desktopScreen("desktop-auth-02", "1817:4528", Auth02),
  desktopScreen("desktop-auth-03", "1817:4582", Auth03),
  desktopScreen("desktop-auth-04", "1817:4644", Auth04),
  desktopScreen("desktop-auth-05", "1817:4713", Auth05),
  desktopScreen("desktop-auth-06", "1817:4758", Auth06),
]
