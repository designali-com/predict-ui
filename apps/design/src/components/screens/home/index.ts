import { screen, type ScreenEntry } from "../types"

import * as Home01 from "./home-01"
import * as Home02 from "./home-02"
import * as Home03 from "./home-03"
import * as Home04 from "./home-04"
import * as Home05 from "./home-05"
import * as Home06 from "./home-06"
import * as Home07 from "./home-07"
import * as Home08 from "./home-08"
import * as Home09 from "./home-09"
import * as Home10 from "./home-10"
import * as Home11 from "./home-11"
import * as Home12 from "./home-12"

export const homeScreens: ScreenEntry[] = [
  screen("home-01", "1734:4658", Home01),
  screen("home-02", "1871:1574", Home02),
  screen("home-03", "1871:1103", Home03),
  screen("home-04", "1871:1244", Home04),
  screen("home-05", "1871:1380", Home05),
  screen("home-06", "1871:1793", Home06),
  screen("home-07", "1871:1906", Home07),
  screen("home-08", "1871:1997", Home08),
  screen("home-09", "1871:2049", Home09),
  screen("home-10", "1871:2123", Home10),
  screen("home-11", "1871:2216", Home11),
  screen("home-12", "1871:2314", Home12),
]
