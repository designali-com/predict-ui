import { desktopScreen, type ScreenEntry } from "../../types"

import * as Doctor01 from "./doctor-01"
import * as Doctor02 from "./doctor-02"

export const doctorDesktopScreens: ScreenEntry[] = [
  desktopScreen("desktop-doctor-01", "1817:5927", Doctor01),
  desktopScreen("desktop-doctor-02", "1824:9135", Doctor02),
]
