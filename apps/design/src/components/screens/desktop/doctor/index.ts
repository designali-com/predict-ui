import { desktopScreen, type ScreenEntry } from "../../types"

import * as DoctorAuth01 from "./doctor-auth-01"
import * as DoctorAuth02 from "./doctor-auth-02"
import * as DoctorAuth03 from "./doctor-auth-03"
import * as Doctor01 from "./doctor-01"
import * as Doctor02 from "./doctor-02"
import * as Doctor03 from "./doctor-03"
import * as Doctor04 from "./doctor-04"
import * as PatientList from "./patient-list"
import * as AddPatient from "./add-patient"
import * as EditPatient from "./edit-patient"
import * as RemovePatient from "./remove-patient"
import * as PatientDashboard from "./patient-dashboard"
import * as DoctorProfile from "./doctor-profile"
import * as Nutrition from "./nutrition"
import * as Exercises from "./exercises"
import * as Prescriptions from "./prescriptions"
import * as Appointments from "./appointments"
import * as LabInbox from "./lab-inbox"
import * as Messages from "./messages"
import * as Notifications from "./notifications"

/** Doctor section (1993:879): desktop log in and sign up. */
export const doctorAuthDesktopScreens: ScreenEntry[] = [
  desktopScreen("desktop-doctor-auth-01", "1993:4546", DoctorAuth01),
  desktopScreen("desktop-doctor-auth-02", "1993:4665", DoctorAuth02),
  desktopScreen("desktop-doctor-auth-03", "1993:4703", DoctorAuth03),
]

export const doctorDesktopScreens: ScreenEntry[] = [
  desktopScreen("desktop-doctor-01", "1817:5927", Doctor01),
  desktopScreen("desktop-doctor-02", "1824:9135", Doctor02),
  desktopScreen("desktop-doctor-03", "1993:2987", Doctor03),
  desktopScreen("desktop-doctor-04", "2027:7267", Doctor04),
  desktopScreen("desktop-doctor-patient-list", "2009:903", PatientList),
  desktopScreen("desktop-doctor-add-patient", "2010:903", AddPatient),
  desktopScreen("desktop-doctor-edit-patient", "2010:1658", EditPatient),
  desktopScreen("desktop-doctor-remove-patient", "2010:2418", RemovePatient),
  desktopScreen("desktop-doctor-patient-dashboard", "2011:903", PatientDashboard),
  desktopScreen("desktop-doctor-profile", "2011:2081", DoctorProfile),
  desktopScreen("desktop-doctor-nutrition", "2012:903", Nutrition),
  desktopScreen("desktop-doctor-exercises", "2012:1916", Exercises),
  desktopScreen("desktop-doctor-prescriptions", "2012:2964", Prescriptions),
  desktopScreen("desktop-doctor-appointments", "2036:903", Appointments),
  desktopScreen("desktop-doctor-lab-inbox", "2036:1269", LabInbox),
  desktopScreen("desktop-doctor-messages", "2036:1635", Messages),
  desktopScreen("desktop-doctor-notifications", "2036:2001", Notifications),
]
