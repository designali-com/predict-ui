import { desktopScreen, type ScreenEntry } from "../../types"

import * as Home01 from "./home-01"
import * as Home02 from "./home-02"
import * as Home03 from "./home-03"
import * as Home04 from "./home-04"
import * as Home05 from "./home-05"
import * as Home06 from "./home-06"
import * as Home07 from "./home-07"
import * as Home08 from "./home-08"

export const homeDesktopScreens: ScreenEntry[] = [
  desktopScreen("desktop-home-01", "1815:3162", Home01),
  desktopScreen("desktop-home-02", "1818:8516", Home02),
  desktopScreen("desktop-home-03", "1871:2432", Home03),
  desktopScreen("desktop-home-04", "1874:2875", Home04),
  desktopScreen("desktop-home-05", "1855:1769", Home05),
  desktopScreen("desktop-home-06", "1855:2468", Home06),
  desktopScreen("desktop-home-07", "1855:2284", Home07),
  desktopScreen("desktop-home-08", "1855:2194", Home08),
]
