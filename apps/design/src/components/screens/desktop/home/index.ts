import { desktopScreen, type ScreenEntry } from "../../types"

import * as Home01 from "./home-01"
import * as Home02 from "./home-02"

export const homeDesktopScreens: ScreenEntry[] = [
  desktopScreen("desktop-home-01", "1815:3162", Home01),
  desktopScreen("desktop-home-02", "1818:8516", Home02),
]
