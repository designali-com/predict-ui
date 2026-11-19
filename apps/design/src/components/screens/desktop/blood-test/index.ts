import { desktopScreen, type ScreenEntry } from "../../types"

import * as BloodTest01 from "./blood-test-01"
import * as BloodTest02 from "./blood-test-02"
import * as BloodTest03 from "./blood-test-03"

export const bloodTestDesktopScreens: ScreenEntry[] = [
  desktopScreen("desktop-blood-test-01", "1818:7765", BloodTest01),
  desktopScreen("desktop-blood-test-02", "1818:8137", BloodTest02),
  desktopScreen("desktop-blood-test-03", "1818:8331", BloodTest03),
]
