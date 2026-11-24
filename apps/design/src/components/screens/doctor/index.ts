import { screen, type ScreenEntry } from "../types"

import * as Auth01 from "./auth-01"
import * as Auth02 from "./auth-02"
import * as Auth03 from "./auth-03"
import * as Auth04 from "./auth-04"
import * as Home01 from "./home-01"
import * as Home02 from "./home-02"
import * as Home03 from "./home-03"
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
import * as LabReport from "./lab-report"
import * as Messages from "./messages"
import * as Chat from "./chat"
import * as Notifications from "./notifications"

/** Doctor section (1993:879): doctor-app log in and sign up. */
export const doctorAuthScreens: ScreenEntry[] = [
  screen("doctor-auth-01", "1996:4708", Auth01),
  screen("doctor-auth-02", "1996:4712", Auth02),
  screen("doctor-auth-03", "1996:4781", Auth03),
  screen("doctor-auth-04", "1996:4831", Auth04),
]

/** Doctor section (1993:879): doctor-app home and patient care. */
export const doctorScreens: ScreenEntry[] = [
  screen("doctor-home-01", "1996:4923", Home01),
  screen("doctor-home-02", "1998:6818", Home02),
  screen("doctor-home-03", "1998:6443", Home03),
  screen("doctor-patient-list", "2015:903", PatientList),
  screen("doctor-add-patient", "2015:1252", AddPatient),
  screen("doctor-edit-patient", "2015:1479", EditPatient),
  screen("doctor-remove-patient", "2015:1711", RemovePatient),
  screen("doctor-patient-dashboard", "2016:903", PatientDashboard),
  screen("doctor-profile", "2016:1400", DoctorProfile),
  screen("doctor-nutrition", "2016:1976", Nutrition),
  screen("doctor-exercises", "2016:2301", Exercises),
  screen("doctor-prescriptions", "2016:2650", Prescriptions),
  screen("doctor-appointments", "2072:903", Appointments),
  screen("doctor-lab-inbox", "2072:1122", LabInbox),
  screen("doctor-lab-report", "2072:1348", LabReport),
  screen("doctor-messages", "2073:903", Messages),
  screen("doctor-chat", "2073:1125", Chat),
  screen("doctor-notifications", "2073:1300", Notifications),
]
