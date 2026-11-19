"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"

import { OnboardingDesktopShell } from "./shared"

export const title = "Date of birth"

const formatDate = (value: string) =>
  new Date(`${value}T00:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

// Figma: Slide 16:9 - 10 (1817:5250)
export default function OnboardingDesktop01() {
  const [dob, setDob] = React.useState("")
  const inputRef = React.useRef<HTMLInputElement>(null)

  return (
    <OnboardingDesktopShell step={0} showBack={false} className="items-center pt-[165px]">
      <h1 className="font-display text-2xl leading-[29px] font-normal text-app-foreground">
        Date of Birth
      </h1>

      <label className="relative mt-[18px] flex h-12 w-full cursor-pointer items-center justify-between rounded-full border border-app-border px-6 text-sm leading-5 text-app-foreground">
        <span className={dob ? undefined : "opacity-40"}>{dob ? formatDate(dob) : "Pick a date"}</span>
        <CalendarIcon className="size-[21px] opacity-40" strokeWidth={1.5} />
        <input
          ref={inputRef}
          type="date"
          aria-label="Date of birth"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          onClick={() => inputRef.current?.showPicker?.()}
          className="absolute inset-0 cursor-pointer opacity-0"
        />
      </label>
    </OnboardingDesktopShell>
  )
}
