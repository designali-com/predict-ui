import { ArrowUpRightIcon } from "lucide-react"

import { AppCard, AppCardHeader } from "@workspace/ui/predict/app/app-card"
import { AppGlow } from "@workspace/ui/predict/app/app-glow"

import { Screen } from "../screen"
import { DoctorAvatar, DoctorGreeting, DoctorNav, WeekDial, doctorPhoto, type Photo } from "./shared-d"

export const title = "Home"

const patients: { name: string; plan: string; photo: Photo }[] = [
  { name: "Usha Sethi", plan: "4L · 21 days", photo: doctorPhoto },
  {
    name: "Suresh Sharma",
    plan: "4L · 21 days",
    photo: {
      src: "/screens/desktop/doctor/doctor-01-patient-suresh.png",
      crop: { height: "135.37%", width: "100%", left: 0, top: "-7.03%" },
    },
  },
  {
    name: "Anjali Bansal",
    plan: "4L · 21 days",
    photo: { src: "/screens/desktop/doctor/doctor-01-patient-anjali.png" },
  },
]

// Figma: iPhone 18 Pro - 185 (1996:4923)
export default function DoctorHome01() {
  return (
    <Screen>
      <WeekDial />

      <AppCard className="absolute top-[320px] left-[calc(50%+0.5px)] h-[336px] w-[381px] -translate-x-1/2 gap-6 rounded-[40px] p-[30px] shadow-[inset_0_0_30px_rgba(66,0,128,0.2)] dark:shadow-[inset_0_0_30px_rgba(66,0,128,0.2)]">
        <AppCardHeader>
          <h2 className="font-display text-[21px] leading-6 font-normal">My Patients</h2>
          <button type="button" aria-label="Open my patients" className="shrink-0">
            <ArrowUpRightIcon className="size-6" strokeWidth={1} />
          </button>
        </AppCardHeader>
        {patients.map((p) => (
          <div key={p.name} className="flex h-[60px] items-center justify-between">
            <DoctorAvatar photo={p.photo} alt={p.name} />
            <p className="w-[145px] font-display text-[21px] leading-6 whitespace-nowrap">{p.name}</p>
            <p className="w-[103px] text-right text-sm leading-6 whitespace-nowrap">{p.plan}</p>
          </div>
        ))}
      </AppCard>

      <AppGlow variant="blob" className="-bottom-[513px]" />
      <DoctorGreeting />
      <DoctorNav />
    </Screen>
  )
}
